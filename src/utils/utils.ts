export const random_range = (lo: number, hi: number): number => {
    if (hi < lo) {
        [hi, lo] = [lo, hi];
    }

    return Math.floor(Math.random() * (hi - lo + 1) + lo);
}

export const sleep = async (ms: number): Promise<void> => {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

export function setImmediate(callback: (...any) => any): NodeJS.Timeout {
    return setTimeout(callback, 0);
}