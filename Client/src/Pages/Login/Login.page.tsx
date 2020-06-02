import React, { useState, useContext } from "react";
import { match } from "react-router";
import * as H from "history";
import googleSignIn from "../../Assets/Icons/google-logo.svg";
import { firebaseService, authService } from "@services";
import Button from "@material-ui/core/Button";
import { ProgressLoader } from "@components";
import { AppContext } from "../../App";
import "./Login.page.scss";
import { Grid } from "@material-ui/core";

type Props = {
  history: H.History;
  location: H.Location;
  match: match;
};

const LoginPage = (props: Props) => {
  const Auth = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);

  if (Auth.isLoggedIn) {
    props.history.push("/dashboard");
  }

  const signInWithGoogle = async () => {
    setIsLoading(true);

    const signInToken = await firebaseService.signInWithGoogle();

    if (signInToken) {

      const response = await authService.loginWithGoogle(signInToken);

      if (response) {
        setIsLoading(false);
        Auth.setLoggedIn(true);
        props.history.push("/dashboard");
      }
    }

  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      {isLoading && <ProgressLoader />}
      <h1>Welcome to ToDo App</h1>
      <h2>Please login to get started</h2>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => signInWithGoogle()}
        startIcon={<img src={googleSignIn} alt="logo" height="40" />}
      >
        Login With Google
      </Button>
    </Grid>
  );
};

export default LoginPage;
