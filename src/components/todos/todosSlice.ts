// import {
//   MonsterType,
//   MONSTER_LOADING,
//   MONSTER_FAIL,
//   MONSTER_SUCCESS,
//   MONSTER_FILTER,
//   MonsterSingle,
// } from "../actions/monsterActionTypes";
// import axios from "axios";

// interface IDefaultState {
//   loading: boolean;
//   monster?: MonsterType;
//   selectedMonster?: MonsterSingle;
// }

// const defaultState: IDefaultState = {
//   loading: false,
// };

// const monsterReducer = (
//   state: IDefaultState = defaultState,
//   action: any
// ): IDefaultState => {
//   switch (action.type) {
//     case MONSTER_FAIL:
//       return {
//         loading: false,
//       };
//     case MONSTER_LOADING:
//       return {
//         loading: true,
//       };
//     case MONSTER_SUCCESS:
//       return {
//         loading: false,
//         monster: action.payload,
//       };
//     case MONSTER_FILTER:
//       return {
//         ...state,
//         selectedMonster: action.selectedMonster,
//       };
//   }
//   return state;
// };

// export default monsterReducer;

import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";
import { AppDispatch, RootState } from "../../app/store";

const todoAdapter = createEntityAdapter<TodoType>();

const initialState = todoAdapter.getInitialState({
  status: "idle",
});

export type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const todos = new schema.Entity("todos");
const todoschema = { todos: new schema.Array(todos) };

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos"
  ).then((res) => res.json());
  console.log(res);
  const norm = normalize<
    any,
    {
      todos: { [key: number]: TodoType };
    }
  >(res, todoschema);
  console.log(norm);
  return norm.result;
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoDeleted: todoAdapter.removeOne,
    todoToggle(state, action: PayloadAction<TodoType>) {
      const todoId = action.payload.id;
      const todo = state.entities[todoId];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todoAdapter.upsertMany(state, action.payload);
        state.status = "idle";
      });
  },
});

export const { todoToggle, todoDeleted } = todosSlice.actions;

export const {
  selectAll: selectTodos,
  selectById: selectTodoById,
} = todoAdapter.getSelectors((state: RootState) => state.todos);

export const selectTodoIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectTodos,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (todos) => todos.map((todo) => todo.id)
);

export const selectAllUncompletedTodos = createSelector(
  // First input selector: all todos
  selectTodos,
  // Second input selector: all filter values
  // Output selector: receives both values
  (todos) => {
    return todos.filter((todo) => {
      return todo.completed === false;
    });
  }
);

export default todosSlice.reducer;
