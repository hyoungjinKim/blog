import React, { useState, useRef, Fragment } from "react";
import { Form, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SEARCH_REQUEST } from "../../redux/type";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [form, setValues] = useState({ searchBy: "" });
  const resetValue = useRef(null);

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { searchBy } = form;
    dispatch({
      type: SEARCH_REQUEST,
      payload: searchBy,
    });
    resetValue.current.value = "";
  };

  return (
    <Fragment>
      <Form onSubmit={onSubmit} className="col mt-2">
        <Input
          name="searchBy"
          onChange={onChange}
          innerRef={resetValue}
          placeholder="제목 검색"
        />
      </Form>
    </Fragment>
  );
};

export default SearchInput;
