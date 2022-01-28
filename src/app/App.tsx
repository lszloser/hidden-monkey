import React, { useState } from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, useAppDispatch } from "./store";
import { Container, Row, Col } from "react-bootstrap";
import { TodoList } from "../components/todos/TodoList";

const App = () => {
  return (
    <Container className="App">
      <Row className="justify-content-md-center">
        <TodoList />
      </Row>
    </Container>
  );
};

export default App;
