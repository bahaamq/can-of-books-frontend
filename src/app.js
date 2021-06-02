import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import Header from "./Header";
import AddBook from "./AddBook";

import IsLoadingAndError from "./IsLoadingAndError";
import Footer from "./footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./login";
import MyFavoriteBooks from "./myFavoriteBooks";
import Profile from "./Profile";

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route path="/">
                {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}

          
                {isAuthenticated && <MyFavoriteBooks />}

                {!isAuthenticated && <Login />}

              </Route>
            </Switch>

            <Switch>
              <Route path="/profile">
                {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
                <Profile />
              </Route>
            </Switch>

            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
