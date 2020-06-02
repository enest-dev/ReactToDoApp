import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from "./ErrorBoundary";
import { MainPage, LoginPage } from "@pages";
import { OuterTheme } from "@themes";
import { authService, dataService, firebaseService } from "@services";
import { PrivateRoute } from "@shared";
import "./Assets/Sass/index.scss";
import 'react-toastify/dist/ReactToastify.css';

export const AppContext = React.createContext(null);

function App() {
  const isUserLoggedIn = authService.isLoggedIn();
  const [isLoggedIn, setLoggedIn] = useState(isUserLoggedIn);
  const [userProfile, setUserProfile] = useState({});
  const getUserProfile = async () => {
    if (!isUserLoggedIn) {
      return
    }
    const profile = await dataService.getUserProfile();
    setUserProfile(profile);
  }

  useEffect(() => { getUserProfile(); firebaseService.askForPermissionsToReceiveNotifications() }, []);

  return (
    <AppContext.Provider value={{ isLoggedIn, setLoggedIn, userProfile, setUserProfile }}>
      <ErrorBoundary>
        <MuiThemeProvider theme={OuterTheme}>
          <CssBaseline />
          <BrowserRouter>
            <Switch>
              <PrivateRoute exact path="/dashboard" authenticated={isLoggedIn} component={MainPage} />
              <Route exact to="/login" component={LoginPage} />
              <Redirect to="/dashboard" />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick />
      </ErrorBoundary>
    </AppContext.Provider>
  );
}
export default App;
