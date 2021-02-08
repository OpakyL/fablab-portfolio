import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/scss/main.scss";
import App from "./ts/app";
import store from "./ts/redux/store/store";

import "./../node_modules/slick-carousel/slick/slick.scss";
import "./../node_modules/slick-carousel/slick/slick-theme.scss";

const Index = () => (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(<Index />, document.getElementById("root"));
