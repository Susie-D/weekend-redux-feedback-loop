import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";

const feedbackList = (state = [], action) => {
    if (action.type === 'SET_FEEDBACK') {
        return action.payload;
    }
    return state;
}

const feedbackSchema = (state = [
    { key: "feeling", route: "", header: "How are you feeling today?", topic: "Feeling?", value: "" },
    { key: "understanding", route: "understanding", header: "How well are you understanding the content?", topic: "Understanding?", value: "" },
    { key: "support", route: "support", header: "How well are you being supported?", topic: "Support?", value: "" },
    { key: "comments", route: "comments", header: "Any comments you want to leave?", topic: "Comments", value: "" }
], action) => {
    return state;
}

const store = createStore(
    combineReducers({
        feedbackList,
        feedbackSchema,
    }),
    applyMiddleware(logger)
)

export default store;