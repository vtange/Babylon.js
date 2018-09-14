export function add(a: i32, b: i32): i32 {
    //store<i32>(0,a + b);
    //store<i32>(1,c + d);
    return a + b;
}
export function addstore(a: i32, b: i32): void {
    store<i32>(0,a + b);
}

/*------------------------*/
export const ToGammaSpace = <f64>(1 / 2.2);
export const ToLinearSpace: f64 = 2.2;
export const Epsilon: f64 = 0.001;
/*

                  888    888    888                   888       .d8888b.                888
                  888    888    888                   888      d88P  Y88b               888
                  888    888    888                   888      888    888               888
 .d88b.   .d88b.  888888 8888888888  8888b.  .d8888b  88888b.  888         .d88b.   .d88888  .d88b.
d88P"88b d8P  Y8b 888    888    888     "88b 88K      888 "88b 888        d88""88b d88" 888 d8P  Y8b
888  888 88888888 888    888    888 .d888888 "Y8888b. 888  888 888    888 888  888 888  888 88888888
Y88b 888 Y8b.     Y88b.  888    888 888  888      X88 888  888 Y88b  d88P Y88..88P Y88b 888 Y8b.
 "Y88888  "Y8888   "Y888 888    888 "Y888888  88888P' 888  888  "Y8888P"   "Y88P"   "Y88888  "Y8888
     888
Y8b d88P
 "Y88P"


*/
/**
 * Compute the Color3 hash code
 * @returns an unique number that can be used to hash Color3 objects
 */
export function getHashCode3Params(r: i32, g: i32, b: i32): i32 {
    let hash = r || 0;
    hash = (hash * 397) ^ (g || 0);
    hash = (hash * 397) ^ (b || 0);
    return hash;
}

/**
 * Compute the Color4 hash code
 * @returns an unique number that can be used to hash Color4 objects
 */
export function getHashCode4Params(r: i32, g: i32, b: i32, a: i32): i32 {
    let hash = r || 0;
    hash = (hash * 397) ^ (g || 0);
    hash = (hash * 397) ^ (b || 0);
    hash = (hash * 397) ^ (a || 0);
    return hash;
}
/**
 * Gets current vector hash code
 * @returns the Vector2 hash code as a number
 */
export function getHashCode2Params(x: i32, y: i32): i32 {
    let hash = x || 0;
    hash = (hash * 397) ^ (y || 0);
    return hash;
}

//use RGB
/**
 * Creates the Vector3 hash code
 * @returns a number which tends to be unique between Vector3 instances
 */
/*
public getHashCode(): i32 {
    var hash = <i32>this.x || 0;
    hash = (hash * 397) ^ (<i32>this.y || 0);
    hash = (hash * 397) ^ (<i32>this.z || 0);
    return hash;
}*/

//use RGBA
/**
 * Returns the Vector4 hash code.
 */
/*
public getHashCode(): i32 {
    let hash = <i32>this.x || 0;
    hash = (hash * 397) ^ (<i32>this.y || 0);
    hash = (hash * 397) ^ (<i32>this.z || 0);
    hash = (hash * 397) ^ (<i32>this.w || 0);
    return hash;
}
*/

//use XY
/**
 * Returns the Size hash code.
 */
/*
public getHashCode(): i32 {
    let hash = <i32>this.width || 0;
    hash = (hash * 397) ^ (<i32>this.height || 0);
    return hash;
}*/

//user RGBA
/**
 * Gets a hash code for this quaternion
 * @returns the quaternion hash code
 */
/*
public getHashCode(): i32 {
    let hash = <i32>this.x || 0;
    hash = (hash * 397) ^ (<i32>this.y || 0);
    hash = (hash * 397) ^ (<i32>this.z || 0);
    hash = (hash * 397) ^ (<i32>this.w || 0);
    return hash;
}*/

/**
 * Gets the hash code of the current matrix
 * @returns the hash code
 */
export function getHashCodeMatrix(m: i32[]): i32 {
    let hash = m[0] || 0;
    for (let i = 1; i < 16; i++) {
        hash = (hash * 397) ^ (m[i] || 0);
    }
    return hash;
}


/**
 * Returns the Plane hash code.
 * //this.normal is a vector3
 */
export function getHashCodePlane(x: i32, y: i32, z: i32, d: i32): i32 {
    let hash = getHashCode3Params(x,y,z);
    hash = (hash * 397) ^ (d || 0);
    return hash;
}


//toArray SKIP


/**
 * Color3
 * Returns the luminance value
 * @returns a float value
 */
export function toLuminance(r: f64, g: f64, b: f64): f64 {
    return r * 0.3 + g * 0.59 + b * 0.11;
}

/*


                       888 888    d8b          888
                       888 888    Y8P          888
                       888 888                 888
88888b.d88b.  888  888 888 888888 888 88888b.  888 888  888
888 "888 "88b 888  888 888 888    888 888 "88b 888 888  888
888  888  888 888  888 888 888    888 888  888 888 888  888
888  888  888 Y88b 888 888 Y88b.  888 888 d88P 888 Y88b 888
888  888  888  "Y88888 888  "Y888 888 88888P"  888  "Y88888
                                      888               888
                                      888          Y8b d88P
                                      888           "Y88P"

*/
export function multiply3PairsFAKE(r: f64, r2: f64, g: f64, g2: f64, b: f64, b2: f64): f64[] {
    return [r*r2, g*g2, b*b2];
}

/**
 * Multiply each Color3 rgb values by the given Color3 rgb values in a new Color3 object
 * @param otherColor defines the second operand
 * @returns the new Color3 object
 */
export function multiply3Pairs(r: f64, r2: f64, g: f64, g2: f64, b: f64, b2: f64): void {
    //store<f64>(0,r * r2);
    //store<f64>(1,g * g2);
    //store<f64>(2,b * b2);
}

/**
 * Multiply the rgb values of the Color3 and the given Color3 and stores the result in the object "result"
 * @param otherColor defines the second operand
 * @param result defines the Color3 object where to store the result
 * @returns the current Color3
 */
/*
export function multiplyToRef(otherColor: Color3, result: Color3): this {
    var arr = multiply(this.r, othercolor.r, this.g, othercolo...);
    result.r = arr[0];
    result.g = arr[1];
    result.b = arr[2];
    return this;
}
*/

/**
 * Multipy an Color4 value by another and return a new Color4 object
 * @param color defines the Color4 value to multiply by
 * @returns a new Color4 object
 */
export function multiply4Pairs(r: f64, r2: f64, g: f64, g2: f64, b: f64, b2: f64, a: f64, a2: f64): void {
    //store<f64>(0,r * r2);
    //store<f64>(1,g * g2);
    //store<f64>(2,b * b2);
    //store<f64>(3,a * a2);
}