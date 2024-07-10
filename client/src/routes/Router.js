import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AppNavbar from "../components/AppNavbar";
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import CategoryResult from "./normalRoute/CategoryResult";
import Profile from "./normalRoute/Profile";
import Userinfo from "./normalRoute/Userinfo";
import PostEdit from "./normalRoute/PostEdit";

const MyRouter = () => (
  <>
    <AppNavbar />
    <Header />
    <Container id="main-body">
      <Switch>
        <Route path="/" exact component={PostCardList} />
        <Route path="/posts" exact component={PostWrite} />
        <Route path="/posts/:id" exact component={PostDetail} />
        <Route path="/user/:info/profile" exact component={Profile} />
        <Route path="/userinfo" exact component={Userinfo} />
        <Route path="/search" exact component={Search} />
        <Route path="/search/:searchTerm" exact component={Search} />
        <Route
          path="/posts/category/:categoryName"
          exact
          component={CategoryResult}
        />
        <Route path="/post/:id/edit" exact component={PostEdit} />
        <Route path="*" element={<Redirect to="/" />} />
      </Switch>
    </Container>
    <Footer />
  </>
);

export default MyRouter;
