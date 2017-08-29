import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { MineSweeper } from "./components/MineSweeper";

ReactDOM.render(
    <div>
        <Hello />
        <MineSweeper />
    </div>,
    document.getElementById("example")
);