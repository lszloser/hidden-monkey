import { useDispatch } from "react-redux";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import React from "react";
import { todoToggle, TodoType } from "./todosSlice";

export const TodoListItem = (todo: TodoType) => {
  const dispatch = useDispatch();
  const handleCompletedChanged = () => {
    dispatch(todoToggle(todo));
  };
  return (
    <>
      <li className="list-group-item">
        <div className="col-mail col-mail-1">
          <div className="checkbox-wrapper-mail">
            <input
              type="checkbox"
              onChange={handleCompletedChanged}
              id="chk1"
            />
          </div>
          <a className="title">{todo.title} </a>
        </div>
      </li>
    </>
  );
};
