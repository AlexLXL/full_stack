import React from "./core/react";
import ReactDOM from "react-dom";

let element1 = (
    <h1 className="title" style={{ color: "red" }}>
        hello-world1
    </h1>
);
let element2 = React.createElement("h1", {
    className: "title",
    style: {
        color: 'red'
    }
}, "hello", React.createElement('span', null, 'world2'));
// 上面两个方式是等价的

console.log(element2)

ReactDOM.render(element2, document.getElementById("root"));
