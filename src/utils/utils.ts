export const random_range = (lo: number, hi: number): number => {
    if (hi < lo) {
        [hi, lo] = [lo, hi];
    }

    return Math.floor(Math.random() * (hi - lo + 1) + lo);
}

export const sleep = async (ms: number): Promise<void> => {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

export const degToRad = (degrees: number): number => {
    return Math.PI * degrees / 180
}

export const radToDeg = (radians: number): number => {
    return radians * 180 / Math.PI;
}

export const clamp = (min: number, val: number, max: number): number => {
    return Math.min(Math.max(min, val), max);
}

export function setImmediate(callback: (...any) => any): NodeJS.Timeout {
    return setTimeout(callback, 0);
}

export const lerp = (current: number, target: number, fraction: number): number => {
    const diff = target - current;
    const change = diff * fraction;
    return current + change;
}