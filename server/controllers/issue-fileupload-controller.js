const IssueFileupload = require("../db/models/issue-fileupload-model");

const uploadFile = async (req, res) => {
  const newIssueFile = new IssueFileupload();
  newIssueFile.data = fs.readFileSync(req.files.userPhoto.path);
  newIssueFile.contentType = "image/png";
  newIssueFile.issueId = "";
  newIssueFile.save();
};

module.exports = {
  uploadFile,
};
