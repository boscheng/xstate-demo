import { Provider } from "react-redux";
import store from "./store";
import Count from "./tk-count";
const ReduxDemo = (props) => {
  return (
    <Provider store={store}>
      <Count />
    </Provider>
  );
};

export default ReduxDemo;
