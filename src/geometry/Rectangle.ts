import {Vector2} from "./Vector2";

export class Rectangle {
    private _x = 0;
    private _y = 0;
    private _w = 0;
    private _h = 0;

    constructor(left: number, top: number, width: number, height: number) {
        this.x = left;
        this.y = top;
        this.width = width;
        this.height = height;
    }

    get x(): number {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y(): number {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }

    get width(): number {
        return this._w;
    }

    set width(w) {
        this._w = w;
    }

    get height(): number {
        return this._h;
    }

    set height(h) {
        this._h = h;
    }

    get left(): number {
        return this.x;
    }

    set left(left) {
        this.x = left;
    }

    get top(): number {
        return this.y;
    }

    set top(top) {
        this.y = top;
    }

    get right(): number {
        return this.x + this.width;
    }

    set right(right) {
        this.x = right - this.width;
    }

    get bottom(): number {
        return this.y + this.height;
    }

    set bottom(bottom) {
        this.y = bottom - this.height;
    }

    get centerX(): number {
        return (this.left + this.right) / 2;
    }

    set centerX(centerX) {
        this.left = centerX - (this.width / 2);
    }

    get centerY(): number {
        return (this.top + this.bottom) / 2;
    }

    set centerY(centerY) {
        this.top = centerY - (this.height / 2);
    }


    get topleft(): Vector2 {
        return new Vector2(this.left, this.top);
    }
    set topleft(v: Vector2) {
        this.left = v.x;
        this.top = v.y;
    }

    get midtop(): Vector2 {
        return new Vector2(this.centerX, this.top);
    }
    set midtop(v: Vector2) {
        this.centerX = v.x;
        this.top = v.y;
    }

    get topright(): Vector2 {
        return new Vector2(this.right, this.top);
    }
    set topright(v: Vector2) {
        this.right = v.x;
        this.top = v.y;
    }


    get midleft(): Vector2 {
        return new Vector2(this.left, this.centerY);
    }
    set midleft(v: Vector2) {
        this.left = v.x;
        this.centerY = v.y;
    }

    get center(): Vector2 {
        return new Vector2(this.centerX, this.centerY);
    }
    set center(v: Vector2) {
        this.centerX = v.x;
        this.centerY = v.y;
    }

    get midright(): Vector2 {
        return new Vector2(this.right, this.centerY);
    }
    set midright(v: Vector2) {
        this.right = v.x;
        this.centerY = v.y;
    }


    get bottomleft(): Vector2 {
        return new Vector2(this.left, this.bottom);
    }
    set bottomleft(v: Vector2) {
        this.left = v.x;
        this.bottom = v.y;
    }

    get midbottom(): Vector2 {
        return new Vector2(this.centerX, this.bottom);
    }
    set midbottom(v: Vector2) {
        this.centerX = v.x;
        this.bottom = v.y;
    }

    get bottomright(): Vector2 {
        return new Vector2(this.right, this.bottom);
    }
    set bottomright(v: Vector2) {
        this.right = v.x;
        this.bottom = v.y;
    }
}