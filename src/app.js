import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import Header from "./Header";

import IsLoadingAndError from "./IsLoadingAndError";
import Footer from "./footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Login";
import MyFavoriteBooks from "./myFavoriteBooks";
import Profile from "./Profile";

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route path="/">
              {this.props.auth0.isAuthenticated ? ( <MyFavoriteBooks />) : (<Login />)}
            </Route>
          </Switch>

          <Switch>
            <Route path="/profile">
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              {this.props.auth0.isAuthenticated && <Profile />}
            </Route>
          </Switch>

          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
