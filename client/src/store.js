import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

/*createStore() creates a Redux store that holds the complete state tree of your app.
 There should only be a single store in your app. (you can find this used in routes)*/
const store = createStore(rootReducer, initialState, compose(
	applyMiddleware(...middleware),
	window.__REDUX_DEVTOOLS_EXTENSION__
		? window.__REDUX_DEVTOOLS_EXTENSION__()
		: f => f
	)
);

export default store;
