import React, { Fragment } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AppNavbar from "../components/AppNavbar";
import { Container } from "reactstrap";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import CategoryResult from "./normalRoute/PostWrite";
const MyRouter = () => (
  <Fragment>
    <AppNavbar />
    <Header />
    <Container id="main-body">
      <Switch>
        <Route path="/" exact component={PostCardList} />
        <Route path="/posts" exact component={PostWrite} />
        <Route path="/posts/:id" exact component={PostDetail} />
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
);

export default MyRouter;
