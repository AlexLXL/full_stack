import {parserHTML} from "./parser";
import {generate} from "./generate";

export function compilerToFunction(template) {
    console.log("template:", template);

    let ast = parserHTML(template);
    console.log("ast:", ast);

    let code = generate(ast);
    console.log("code:", code);

    let render = new Function(`with(this) {return ${code}}`);
    console.log("render:", render.toString());

    return render;
}

/*
示例:AST格式

{
parent: undefined
tag: "div"
type: 1
attrs: Array(2)
    0: {name: "id", value: "app"}
    1: {name: "style", value: "font-size: 18px; color: #ccc"}
    length: 2
    __proto__: Array(0)
children: Array(2)
    0: {type: 2, text: " aa {{name}} bb "}
    1: {tag: "span", attrs: Array(0), parent: {…}, type: 1, children: Array(1)}
    length: 2
    __proto__: Array(0)
}
*/