import React, { Fragment, useState } from "react";
import { Button, Row, Input, Label } from "reactstrap";
import profilImg from "../../assets/img/KakaoTalk_20240104_150512518.jpg";

const Userinfo = () => {
  const [name, setName] = useState("김형진");
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("1234");

  const [nameToggle, setNameToggle] = useState(true);
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [emailToggle, setEmailToggle] = useState(true);

  const onSubmitName = (event) => {
    event.preventDefault(); // Form의 기본 동작 방지
    setName(event.target.Name.value);
    setNameToggle(true); // 이름 수정 모드 종료
  };

  const onSubmitEmail = (event) => {
    event.preventDefault(); // Form의 기본 동작 방지
    setEmail(event.target.email.value);
    setEmailToggle(true); // 이름 수정 모드 종료
  };

  const onSubmitPassword = (event) => {
    event.preventDefault(); // Form의 기본 동작 방지
    setPassword(event.target.password.value);
    setPasswordToggle(true); // 이름 수정 모드 종료
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

  const NameComponent = () => {
    if (nameToggle) {
      return (
        <Fragment>
          <h1>{name || "김형진"}</h1>
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
          <Label for="email" className="mr-2">
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
          <Label for="email" className="mr-2">
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
        <Button color="danger">회원 탈퇴</Button>
      </Row>
    </Fragment>
  );
};

export default Userinfo;
