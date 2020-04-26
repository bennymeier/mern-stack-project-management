import React from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import moment from "moment";
import { getLocale } from "./utils/helpers";
import { Provider } from "react-redux";
import configureStore from "./redux/index";
moment.locale(getLocale());

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Sidebar />
      <Main />
    </Provider>
  );
};

export default App;
