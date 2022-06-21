import {IStringFormatter} from "./abstract/StringFormatter";

export class PlainStringFormatter implements IStringFormatter {
    format(s: string): HTMLElement[] {
        const toReturn = document.createElement('span');
        toReturn.appendChild(document.createTextNode(s));
        return [toReturn];
    }
}