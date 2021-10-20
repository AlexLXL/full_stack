import {parserHTML} from "./parserHTML";
import {astGenerateCode} from "./astGenerateCode";

export function compilerToFunction(html) {
    let ast = parserHTML(html)

    let code = astGenerateCode(ast)

    let render = new Function(`with(this) { return ${code} }`)

    return render
}