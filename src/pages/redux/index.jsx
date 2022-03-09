import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import Count from "./count";
const store = createStore(reducers);
const ReduxDemo = (props) => {
  return (
    <Provider store={store}>
      <Count />
    </Provider>
  );
};

export default ReduxDemo;
