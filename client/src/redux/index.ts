import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { chatReducer } from "./chat/reducers";
import { authReducer } from "./auth/reducers";
import { errorReducer } from "./error/reducers";
import { usersReducer } from "./users/reducers";
import { projectReducer } from "./project/reducers";
import { issueTypeReducer } from "./issuetype/reducers";
import { kanbanTypeReducer } from "./kanbantype/reducers";
import { priorityReducer } from "./priority/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  errors: errorReducer,
  users: usersReducer,
  currentProject: projectReducer,
  issueTypes: issueTypeReducer,
  kanbanTypes: kanbanTypeReducer,
  priorities: priorityReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const configureStore = () => {
  const middlewares = [thunkMiddleware, createLogger()];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );
  return store;
};
