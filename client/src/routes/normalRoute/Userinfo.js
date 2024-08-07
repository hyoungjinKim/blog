import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Row,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import { FigureImage } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  USER_NAME_EDIT_REQUEST,
  USER_EMAIL_EDIT_REQUEST,
  USER_PASSWORD_EDIT_REQUEST,
  USER_DELETE_REQUEST,
  USER_PROFILEURL_EDIT_REQUEST,
  USER_PROFILEURL_DELETE_REQUEST,
} from "../../redux/type";

const Userinfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameToggle, setNameToggle] = useState(true);
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [emailToggle, setEmailToggle] = useState(true);
  const [modal, setModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [profile_Url, setProfileUrl] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setProfileUrl(user.profile_imgUrl);
    }
  }, [user, useState]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const imgToggle = () => {
    setModal(!modal);
  };

  const onSubmitImg = async (e) => {
    e.preventDefault();
    const fileInput = e.target.imgUrl.files[0];

    if (!fileInput) {
      alert("프로필 이미지를 변경해주세요");
      return;
    }

    const formData = new FormData();
    formData.append("upload", fileInput);
    console.log(formData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASIC_SERVER_URL}/api/user/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imgUrl = response.data.url[0];
      console.log(imgUrl);
      setProfileUrl(imgUrl);

      const token = localStorage.getItem("token");
      const id = user._id;
      const body = { profile_Url: imgUrl, id, token };

      dispatch({
        type: USER_PROFILEURL_EDIT_REQUEST,
        payload: body,
      });

      imgToggle();
    } catch (error) {
      console.error(error);
      alert("이미지 업로드 실패");
    }
  };

  const onDeleteProfile = (e) => {
    e.preventDefault();
    const deleteUrl = process.env.REACT_APP_BASIC_PROFILE_URL;

    setProfileUrl(deleteUrl);
    const token = localStorage.getItem("token");
    const id = user._id;
    const body = { profile_Url: deleteUrl, id, token };
    dispatch({
      type: USER_PROFILEURL_DELETE_REQUEST,
      payload: body,
    });
  };

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
            src={profile_Url}
            style={{ width: "10rem", height: "10rem" }}
            alt="프로필 이미지"
          />
          <Button
            color="success"
            className="rounded-pill mt-4"
            onClick={imgToggle}
          >
            이미지 업로드
          </Button>
          <Modal isOpen={modal}>
            <ModalHeader toggle={imgToggle}>프로필 업로드</ModalHeader>
            <Form onSubmit={onSubmitImg}>
              <ModalBody>
                <Input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  name="imgUrl"
                />
                {imageSrc && (
                  <FigureImage
                    src={imageSrc}
                    alt="userImg"
                    className="rounded-circle"
                    style={{ objectFit: "scale-down" }}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary">이미지 업로드</Button>
              </ModalFooter>
            </Form>
          </Modal>
          <Button
            color="success"
            outline
            className="rounded-pill mt-4"
            onClick={onDeleteProfile}
          >
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
