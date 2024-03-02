import { createStore, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension"; // Optional for development

import rootReducer from "./rootReducer"; // Replace with the correct path

// Create a browser history
export const history = createBrowserHistory();

// Create the root reducer with history
const rootReducersWithHistory = rootReducer(history);

// Create the store with middleware
const store = createStore(
  rootReducersWithHistory,
  composeWithDevTools(applyMiddleware(routerMiddleware(history)))
);

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
