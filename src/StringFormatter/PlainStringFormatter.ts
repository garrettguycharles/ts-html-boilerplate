import {IStringFormatter} from "./abstract/IStringFormatter";

export class PlainStringFormatter implements IStringFormatter {
    format(s: string): HTMLElement[] {
        const toReturn = document.createElement('span');
        toReturn.appendChild(document.createTextNode(s));
        return [toReturn];
    }
}