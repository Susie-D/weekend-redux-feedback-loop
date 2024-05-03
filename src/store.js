import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";

const feedbackList = (state = [], action) => {
    if (action.type === 'SET_FEEDBACK') {
        return action.payload;
    }
    return state;
}

const store = createStore(
    combineReducers({
        feedbackList,
    }),
    applyMiddleware(logger)
)

export default store;