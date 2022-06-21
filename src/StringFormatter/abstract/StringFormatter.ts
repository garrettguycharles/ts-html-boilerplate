export interface IStringFormatter {
    /**
     * Formats a string to present it to the user.
     *
     * @param s the string to format
     * @returns an array of HTMLElements. These elements will be placed on the page
     *          to display the string to the user.
     */
    format(s: string): HTMLElement[];
}