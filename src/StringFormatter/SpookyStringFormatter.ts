import {IStringFormatter} from "./abstract/StringFormatter";
import {random_range} from "../utils/utils";

export class SpookyStringFormatter implements IStringFormatter {
    format(s: string): HTMLElement[] {
        const toReturn: HTMLElement[] = [];
        for (let i = 0; i < s.length; i++) {
            // give each letter its own weird little offset
            const nextLetterSpan = document.createElement('span');
            nextLetterSpan.style.transform = `translate(${random_range(-1, 1)}px, ${random_range(-2, 2)}px)`;
            nextLetterSpan.style.display = 'inline-block';
            if (s[i].trim()) {
                nextLetterSpan.appendChild(document.createTextNode(s[i]));
            } else {
                // assume we're dealing with a space
                nextLetterSpan.innerHTML = '&nbsp;';
            }
            toReturn.push(nextLetterSpan);
        }

        return toReturn;
    }
}