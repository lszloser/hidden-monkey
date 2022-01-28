import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import React, { useEffect } from "react";
import {
  fetchTodos,
  selectAllUncompletedTodos,
  selectTodoIds,
  TodoType,
} from "./todosSlice";
import { TodoListItem } from "./TodoListItem";

export const TodoList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  const todos = useSelector(selectAllUncompletedTodos);
  const loadingStatus = useSelector((state: RootState) => state.todos.status);

  if (loadingStatus === "loading") {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <ul className="list-group">
        {todos.map((todo: TodoType) => {
          return <TodoListItem {...todo} />;
        })}
      </ul>
    );
  }
};
