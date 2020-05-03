const User = require("../db/models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const secretKey = require("../db/secretKey");

const createUser = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .json({ success: false, error: "Email already exists" });
  } else {
    const newUser = new User(req.body);
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  }
};

const updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    // const user = await User.findOne({ email: req.params.email });
    // if (user && body.favoriteProjects) {
    //   console.log(body.favoriteProjects);
    //   const favoriteProjects = user.favoriteProjects.filter(
    //     favoriteProject !== body.favoriteProjects
    //   );
    // }
    // console.log("OK");
    await User.updateOne({ email: req.params.email }, body);
    return res.status(200).json({
      success: true,
      message: "User updated!",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
      message: "User not updated!",
    });
  }
};

const getUserByMail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).json({ success: true, id: user._id });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          _id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          status: user.status,
          avatar: user.avatar,
          role: user.role,
        };

        // Sign token
        jwt.sign(
          payload,
          secretKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              data: payload,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};

module.exports = {
  createUser,
  getUserByMail,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
};
