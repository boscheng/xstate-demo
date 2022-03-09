import { combineReducers } from "redux";

//设置一个初始值
const initialState = {
  count: 0,
};
const counter = (state = initialState, action) => {
  switch (action.type) {
    case "add":
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    case "sub":
      return Object.assign({}, state, {
        count: state.count - 1,
      });
    default:
      return state;
  }
};

const reducers = combineReducers({
  counter,
});

export default reducers;
