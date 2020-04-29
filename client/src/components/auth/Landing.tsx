import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import Login from "./Login";
import Register from "./Register";

const Landing = () => {
  const [page, setPage] = useState("login");
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {page === "login" ? (
          <Login handleRegister={() => setPage("register")} />
        ) : (
          <Register handleRegister={() => setPage("login")} />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Landing;
