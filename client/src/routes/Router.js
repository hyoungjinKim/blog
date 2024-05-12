import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AppNavbar from "../components/AppNavbar";
import { Container } from "reactstrap";
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import CategoryResult from "./normalRoute/PostWrite";
import Profile from "./normalRoute/Profile";
import Userinfo from "./normalRoute/Userinfo";
import UserFallo from "./normalRoute/UserFallo";
const MyRouter = () => (
  <Router>
    <Fragment>
      <AppNavbar />
      <Header />
      <Container id="main-body">
        <Switch>
          <Route path="/" exact component={PostCardList} />
          <Route path="/posts" exact component={PostWrite} />
          <Route path="/posts/:id" exact component={PostDetail} />
          <Route path="/user" exact component={Profile} />
          <Route path="/user/info" exact component={Userinfo} />
          <Route path="/search" exact component={Search} />
          <Route path="/user/follo" exact component={UserFallo} />
          <Route path="/search/:searchterm" exact component={Search} />
          <Route
            path="/posts/category/:categoryName"
            exact
            component={CategoryResult}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <Footer />
    </Fragment>
  </Router>
);

export default MyRouter;
