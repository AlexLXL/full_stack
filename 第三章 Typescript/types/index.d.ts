declare module "jquery"
declare module "*.png"
declare let myDeclare: string
declare module "myurl" {
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }
    export function parse(
        urlStr: string,
        parseQueryString?: string,
        slashesDenoteHost?: string
    ): Url;
}