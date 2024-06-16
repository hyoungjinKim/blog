import React, { Fragment, useState, useEffect } from "react";
import { Button, Row, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import profilImg from "../../assets/img/KakaoTalk_20240104_150512518.jpg";
import {
  USER_NAME_EDIT_REQUEST,
  USER_EMAIL_EDIT_REQUEST,
  USER_PASSWORD_EDIT_REQUEST,
  USER_DELETE_REQUEST,
} from "../../redux/type";

const Userinfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [user]);
  const [nameToggle, setNameToggle] = useState(true);
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [emailToggle, setEmailToggle] = useState(true);

  const onSubmitName = (event) => {
    event.preventDefault();
    setName(event.target.Name.value);
    setNameToggle(true);
    const name1 = event.target.Name.value;
    const token = localStorage.getItem("token");
    const id = user._id;
    const body = { name1, id, token };
    dispatch({
      type: USER_NAME_EDIT_REQUEST,
      payload: body,
    });
  };

  const onSubmitEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.email.value);
    setEmailToggle(true);
    const email1 = event.target.email.value;
    const token = localStorage.getItem("token");
    const id = user._id;
    const body = { email1, id, token };
    dispatch({
      type: USER_EMAIL_EDIT_REQUEST,
      payload: body,
    });
  };

  const onSubmitPassword = (event) => {
    event.preventDefault();
    setPassword(event.target.password.value);
    setPasswordToggle(true);
    const password1 = event.target.password.value;
    const token = localStorage.getItem("token");
    const id = user._id;
    const body = { password1, id, token };
    dispatch({
      type: USER_PASSWORD_EDIT_REQUEST,
      payload: body,
    });
  };

  const onChangenameToggle = () => {
    setNameToggle(!nameToggle);
  };

  const onChangeEmailToggle = () => {
    setEmailToggle(!emailToggle);
  };

  const onChangePasswordToggle = () => {
    setPasswordToggle(!passwordToggle);
  };

  const Userdelete = () => {
    const id = user._id;
    const token = localStorage.getItem("token");
    const body = { id, token };
    dispatch({
      type: USER_DELETE_REQUEST,
      payload: body,
    });
  };
  const NameComponent = () => {
    if (nameToggle) {
      return (
        <Fragment>
          <h1>{name}</h1>
          <Button
            color="success"
            outline
            style={{ border: "none" }}
            onClick={onChangenameToggle}
          >
            이름 수정
          </Button>
        </Fragment>
      );
    } else {
      return (
        <form onSubmit={onSubmitName}>
          <Input
            type="text"
            name="Name"
            placeholder="이름을 입력하세요"
            defaultValue={name}
          />
          <div className="mt-3">
            <Button type="submit">완료</Button>{" "}
            <Button onClick={onChangenameToggle}>취소</Button>
          </div>
        </form>
      );
    }
  };

  const EmailComponent = () => {
    if (emailToggle) {
      return (
        <Fragment>
          <Label className="mr-2">
            <h3>이메일 변경</h3>
          </Label>
          <span className="ml-4">{email}</span>
          <Button
            color="success"
            outline
            style={{ border: "none" }}
            onClick={onChangeEmailToggle}
            className="ml-5 mb-3"
          >
            수정
          </Button>
        </Fragment>
      );
    } else {
      return (
        <form onSubmit={onSubmitEmail}>
          <Label for="email" className="mr-2">
            <h3>이메일 변경</h3>
          </Label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={email}
          />
          <div className="mt-3">
            <Button type="submit">완료</Button>{" "}
            <Button onClick={onChangeEmailToggle}>취소</Button>
          </div>
        </form>
      );
    }
  };

  const PasswordComponent = () => {
    if (passwordToggle) {
      return (
        <Fragment>
          <Label className="mr-2">
            <h3>비밀번호 변경</h3>
          </Label>
          <span className="ml-4">{password}</span>
          <Button
            color="success"
            outline
            style={{ border: "none" }}
            onClick={onChangePasswordToggle}
            className="ml-5 mb-3"
          >
            수정
          </Button>
        </Fragment>
      );
    } else {
      return (
        <form onSubmit={onSubmitPassword}>
          <Label for="password" className="mr-2">
            <h3>비밀번호 변경</h3>
          </Label>
          <Input
            type="password"
            name="password"
            placeholder="password"
            defaultValue={password}
          />
          <div className="mt-3">
            <Button type="submit">완료</Button>{" "}
            <Button onClick={onChangePasswordToggle}>취소</Button>
          </div>
        </form>
      );
    }
  };

  return (
    <Fragment>
      <Row
        style={{
          display: "flex",
        }}
        className="mb-5"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            className="rounded-circle"
            src={profilImg}
            style={{ width: "10rem", height: "10rem" }}
            alt="프로필 이미지"
          />
          <Button color="success" className="rounded-pill mt-4">
            이미지 업로드
          </Button>
          <Button color="success" outline className="rounded-pill mt-4">
            이미지 제거
          </Button>
        </div>
        <div className="mt-4" style={{ marginLeft: "15em" }}>
          <NameComponent />
        </div>
      </Row>
      <Row
        className="mb-5"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Row className="mb-3">
          <EmailComponent />
        </Row>
        <Row className="mb-3">
          <PasswordComponent />
        </Row>
      </Row>

      <Row className="mb-5">
        <Button color="danger" onClick={Userdelete}>
          회원 탈퇴
        </Button>
      </Row>
    </Fragment>
  );
};

export default Userinfo;
