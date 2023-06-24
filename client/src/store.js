import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";

const store = configureStore({
    reducer: {
        authreducer: authReducer,
    }
});

export default store;