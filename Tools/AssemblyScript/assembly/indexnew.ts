export function add(a: i32, b: i32): void {
    store<i32>(0,a + b);
}
export function getSizeI32(): usize {
    return sizeof<i32>();
}
export function getSizeF64(): usize {
    return sizeof<f64>();
}
/*------------------------*/

export function add1Pair(r: f64, r2: f64): void {
    store<f64>(0,r + r2);
}

export function add2Pairs(r: f64, r2: f64, g: f64, g2: f64): void {
    store<f64>(0,r + r2);
    store<f64>(8,g + g2);
}

export function add3Pairs(r: f64, r2: f64, g: f64, g2: f64, b: f64, b2: f64): void {
    store<f64>(0,r + r2);
    store<f64>(8,g + g2);
    store<f64>(16,b + b2);
}

export function add4Pairs(r: f64, r2: f64, g: f64, g2: f64, b: f64, b2: f64, a: f64, a2: f64): void {
    store<f64>(0,r + r2);
    store<f64>(8,g + g2);
    store<f64>(16,b + b2);
    store<f64>(24,a + a2);
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
export function getHashCode2Params(x: i32, y: i32): i32 {
    let hash = x || 0;
    hash = (hash * 397) ^ (y || 0);
    return hash;
}
export function getHashCode3Params(r: i32, g: i32, b: i32): i32 {
    let hash = r || 0;
    hash = (hash * 397) ^ (g || 0);
    hash = (hash * 397) ^ (b || 0);
    return hash;
}

export function getHashCode4Params(r: i32, g: i32, b: i32, a: i32): i32 {
    let hash = r || 0;
    hash = (hash * 397) ^ (g || 0);
    hash = (hash * 397) ^ (b || 0);
    hash = (hash * 397) ^ (a || 0);
    return hash;
}
export function getHashCodeMatrix(m: i32[]): i32 {
    let hash = m[0] || 0;
    //m must be length 16
    for (let i = 1; i < 16; i++) {
        hash = (hash * 397) ^ (m[i] || 0);
    }
    return hash;
}
export function getHashCodePlane(x: i32, y: i32, z: i32, d: i32): i32 {
    let hash = getHashCode3Params(x,y,z);
    hash = (hash * 397) ^ (d || 0);
    return hash;
}
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

//MUST KEEP SO MEMORY WORKS WHEN WE BUILD
export function multiply3PairsFAKE(r: f64, r2: f64, g: f64, g2: f64, b: f64, b2: f64): f64[] {
    return [r*r2, g*g2, b*b2];
}

export function multiply1Pair(r: f64, r2: f64): void {
    store<f64>(0,r * r2);
}

export function multiply2Pairs(r: f64, r2: f64, g: f64, g2: f64): void {
    store<f64>(0,r * r2);
    store<f64>(8,g * g2);
}

export function multiply3Pairs(r: f64, r2: f64, g: f64, g2: f64, b: f64, b2: f64): void {
    store<f64>(0,r * r2);
    store<f64>(8,g * g2);
    store<f64>(16,b * b2);
}

export function multiply4Pairs(r: f64, r2: f64, g: f64, g2: f64, b: f64, b2: f64, a: f64, a2: f64): void {
    store<f64>(0,r * r2);
    store<f64>(8,g * g2);
    store<f64>(16,b * b2);
    store<f64>(24,a * a2);
}

/**
 * Sets the given "result" as the the multiplication result of the current one with the given one "q1"
 * @param q1 defines the second operand
 * @param result defines the target quaternion
 * @returns the current quaternion
 */
public multiplyToRef(q1: Quaternion, result: Quaternion): this {
    var x = this.x * q1.w + this.y * q1.z - this.z * q1.y + this.w * q1.x;
    var y = -this.x * q1.z + this.y * q1.w + this.z * q1.x + this.w * q1.y;
    var z = this.x * q1.y - this.y * q1.x + this.z * q1.w + this.w * q1.z;
    var w = -this.x * q1.x - this.y * q1.y - this.z * q1.z + this.w * q1.w;
    result.copyFromFloats(x, y, z, w);
    return this;
}

/**
 * Updates the current quaternion with the multiplication of itself with the given one "q1"
 * @param q1 defines the second operand
 * @returns the currentupdated quaternion
 */
public multiplyInPlace(q1: Quaternion): this {
    this.multiplyToRef(q1, this);
    return this;
}

/**
 * Multiply two matrices
 * @param other defines the second operand
 * @returns a new matrix set with the multiplication result of the current Matrix and the given one
 */
public multiply(other: Matrix): Matrix {
    var result = new Matrix();
    this.multiplyToRef(other, result);
    return result;
}

/**
 * Sets the given matrix "result" with the multiplication result of the current Matrix and the given one
 * @param other defines the second operand
 * @param result defines the matrix where to store the multiplication
 * @returns the current matrix
 */
public multiplyToRef(other: Matrix, result: Matrix): Matrix {
    this.multiplyToArray(other, result.m, 0);

    result._markAsUpdated();
    return this;
}

/**
 * Sets the Float32Array "result" from the given index "offset" with the multiplication of the current matrix and the given one
 * @param other defines the second operand
 * @param result defines the array where to store the multiplication
 * @param offset defines the offset in the target array where to start storing values
 * @returns the current matrix
 */
public multiplyToArray(other: Matrix, result: f64[], offset: f64): Matrix {
    var tm0 = this.m[0];
    var tm1 = this.m[1];
    var tm2 = this.m[2];
    var tm3 = this.m[3];
    var tm4 = this.m[4];
    var tm5 = this.m[5];
    var tm6 = this.m[6];
    var tm7 = this.m[7];
    var tm8 = this.m[8];
    var tm9 = this.m[9];
    var tm10 = this.m[10];
    var tm11 = this.m[11];
    var tm12 = this.m[12];
    var tm13 = this.m[13];
    var tm14 = this.m[14];
    var tm15 = this.m[15];

    var om0 = other.m[0];
    var om1 = other.m[1];
    var om2 = other.m[2];
    var om3 = other.m[3];
    var om4 = other.m[4];
    var om5 = other.m[5];
    var om6 = other.m[6];
    var om7 = other.m[7];
    var om8 = other.m[8];
    var om9 = other.m[9];
    var om10 = other.m[10];
    var om11 = other.m[11];
    var om12 = other.m[12];
    var om13 = other.m[13];
    var om14 = other.m[14];
    var om15 = other.m[15];

    result[offset] = tm0 * om0 + tm1 * om4 + tm2 * om8 + tm3 * om12;
    result[offset + 1] = tm0 * om1 + tm1 * om5 + tm2 * om9 + tm3 * om13;
    result[offset + 2] = tm0 * om2 + tm1 * om6 + tm2 * om10 + tm3 * om14;
    result[offset + 3] = tm0 * om3 + tm1 * om7 + tm2 * om11 + tm3 * om15;

    result[offset + 4] = tm4 * om0 + tm5 * om4 + tm6 * om8 + tm7 * om12;
    result[offset + 5] = tm4 * om1 + tm5 * om5 + tm6 * om9 + tm7 * om13;
    result[offset + 6] = tm4 * om2 + tm5 * om6 + tm6 * om10 + tm7 * om14;
    result[offset + 7] = tm4 * om3 + tm5 * om7 + tm6 * om11 + tm7 * om15;

    result[offset + 8] = tm8 * om0 + tm9 * om4 + tm10 * om8 + tm11 * om12;
    result[offset + 9] = tm8 * om1 + tm9 * om5 + tm10 * om9 + tm11 * om13;
    result[offset + 10] = tm8 * om2 + tm9 * om6 + tm10 * om10 + tm11 * om14;
    result[offset + 11] = tm8 * om3 + tm9 * om7 + tm10 * om11 + tm11 * om15;

    result[offset + 12] = tm12 * om0 + tm13 * om4 + tm14 * om8 + tm15 * om12;
    result[offset + 13] = tm12 * om1 + tm13 * om5 + tm14 * om9 + tm15 * om13;
    result[offset + 14] = tm12 * om2 + tm13 * om6 + tm14 * om10 + tm15 * om14;
    result[offset + 15] = tm12 * om3 + tm13 * om7 + tm14 * om11 + tm15 * om15;
    return this;
}

/*

                           888
                           888
                           888
.d8888b   .d8888b  8888b.  888  .d88b.
88K      d88P"        "88b 888 d8P  Y8b
"Y8888b. 888      .d888888 888 88888888
     X88 Y88b.    888  888 888 Y8b.
 88888P'  "Y8888P "Y888888 888  "Y8888




*/


export function scale3Values(r: f64, g: f64, b: f64, scale: f64): void {
    store<f64>(0,r * scale);
    store<f64>(8,g * scale);
    store<f64>(16,b * scale);
}

export function scale4Values(r: f64, g: f64, b: f64, a: f64, scale: f64): void {
    store<f64>(0,r * scale);
    store<f64>(8,g * scale);
    store<f64>(16,b * scale);
    store<f64>(24,a * scale);
}

export function scaleAndAdd3Values(r: f64, g: f64, b: f64, r2: f64, g2: f64, b2: f64, gscale: f64): void {
    store<f64>(0,(r * scale)+r2);
    store<f64>(8,(g * scale)+g2);
    store<f64>(16,(b * scale)+b2);
}

export function scaleAndAdd4Values(r: f64, g: f64, b: f64, a:f64, r2: f64, g2: f64, b2: f64, a2: f64, gscale: f64): void {
    store<f64>(0,(r * scale)+r2);
    store<f64>(8,(g * scale)+g2);
    store<f64>(16,(b * scale)+b2);
}
/**
 * Multiplies in place each rgb value by scale
 * @param scale defines the scaling factor
 * @returns the updated Color3
 */
public scale(scale: f64): Color3 {
    return new Color3(this.r * scale, this.g * scale, this.b * scale);
}

/**
 * Multiplies the rgb values by scale and stores the result into "result"
 * @param scale defines the scaling factor
 * @param result defines the Color3 object where to store the result
 * @returns the unmodified current Color3
 */
public scaleToRef(scale: f64, result: Color3): this {
    result.r = this.r * scale;
    result.g = this.g * scale;
    result.b = this.b * scale;
    return this;
}

/**
 * Scale the current Color3 values by a factor and add the result to a given Color3
 * @param scale defines the scale factor
 * @param result defines color to store the result into
 * @returns the unmodified current Color3
 */
public scaleAndAddToRef(scale: f64, result: Color3): this {
    result.r += this.r * scale;
    result.g += this.g * scale;
    result.b += this.b * scale;
    return this;
}


/**
 * Creates a new Color4 with the current Color4 values multiplied by scale
 * @param scale defines the scaling factor to apply
 * @returns a new Color4 object
 */
public scale(scale: f64): Color4 {
    return new Color4(this.r * scale, this.g * scale, this.b * scale, this.a * scale);
}

/**
 * Multiplies the current Color4 values by scale and stores the result in "result"
 * @param scale defines the scaling factor to apply
 * @param result defines the Color4 object where to store the result
 * @returns the current unmodified Color4
 */
public scaleToRef(scale: f64, result: Color4): this {
    result.r = this.r * scale;
    result.g = this.g * scale;
    result.b = this.b * scale;
    result.a = this.a * scale;
    return this;
}

/**
 * Scale the current Color4 values by a factor and add the result to a given Color4
 * @param scale defines the scale factor
 * @param result defines the Color4 object where to store the result
 * @returns the unmodified current Color4
 */
public scaleAndAddToRef(scale: f64, result: Color4): this {
    result.r += this.r * scale;
    result.g += this.g * scale;
    result.b += this.b * scale;
    result.a += this.a * scale;
    return this;
}

/**
 * Multiply the Vector2 coordinates by scale
 * @param scale defines the scaling factor
 * @returns the current updated Vector2
 */
public scaleInPlace(scale: f64): this {
    this.x *= scale;
    this.y *= scale;
    return this;
}

/**
 * Returns a new Vector2 scaled by "scale" from the current Vector2
 * @param scale defines the scaling factor
 * @returns a new Vector2
 */
public scale(scale: f64): Vector2 {
    var result = new Vector2(0, 0);
    this.scaleToRef(scale, result);
    return result;
}

/**
 * Scale the current Vector2 values by a factor to a given Vector2
 * @param scale defines the scale factor
 * @param result defines the Vector2 object where to store the result
 * @returns the unmodified current Vector2
 */
public scaleToRef(scale: f64, result: Vector2): this {
    result.x = this.x * scale;
    result.y = this.y * scale;
    return this;
}

/**
 * Scale the current Vector2 values by a factor and add the result to a given Vector2
 * @param scale defines the scale factor
 * @param result defines the Vector2 object where to store the result
 * @returns the unmodified current Vector2
 */
public scaleAndAddToRef(scale: f64, result: Vector2): this {
    result.x += this.x * scale;
    result.y += this.y * scale;
    return this;
}


/**
 * Multiplies the Vector3 coordinates by the float "scale"
 * @param scale defines the multiplier factor
 * @returns the current updated Vector3
 */
public scaleInPlace(scale: f64): this {
    this.x *= scale;
    this.y *= scale;
    this.z *= scale;
    return this;
}

/**
 * Returns a new Vector3 set with the current Vector3 coordinates multiplied by the float "scale"
 * @param scale defines the multiplier factor
 * @returns a new Vector3
 */
public scale(scale: f64): Vector3 {
    return new Vector3(this.x * scale, this.y * scale, this.z * scale);
}

/**
 * Multiplies the current Vector3 coordinates by the float "scale" and stores the result in the given vector "result" coordinates
 * @param scale defines the multiplier factor
 * @param result defines the Vector3 object where to store the result
 * @returns the current Vector3
 */
public scaleToRef(scale: f64, result: Vector3): this {
    result.x = this.x * scale;
    result.y = this.y * scale;
    result.z = this.z * scale;
    return this;
}

/**
 * Scale the current Vector3 values by a factor and add the result to a given Vector3
 * @param scale defines the scale factor
 * @param result defines the Vector3 object where to store the result
 * @returns the unmodified current Vector3
 */
public scaleAndAddToRef(scale: f64, result: Vector3): this {
    result.x += this.x * scale;
    result.y += this.y * scale;
    result.z += this.z * scale;
    return this;
}

/**
 * Multiplies the current Vector4 coordinates by scale (float).
 * Returns the updated Vector4.
 */
public scaleInPlace(scale: f64): Vector4 {
    this.x *= scale;
    this.y *= scale;
    this.z *= scale;
    this.w *= scale;
    return this;
}

/**
 * Returns a new Vector4 set with the current Vector4 coordinates multiplied by scale (float).
 */
public scale(scale: f64): Vector4 {
    return new Vector4(this.x * scale, this.y * scale, this.z * scale, this.w * scale);
}

/**
 * Sets the given vector "result" with the current Vector4 coordinates multiplied by scale (float).
 * Returns the current Vector4.
 */
public scaleToRef(scale: f64, result: Vector4): this {
    result.x = this.x * scale;
    result.y = this.y * scale;
    result.z = this.z * scale;
    result.w = this.w * scale;
    return this;
}

/**
 * Scale the current Vector4 values by a factor and add the result to a given Vector4
 * @param scale defines the scale factor
 * @param result defines the Vector4 object where to store the result
 * @returns the unmodified current Vector4
 */
public scaleAndAddToRef(scale: f64, result: Vector4): this {
    result.x += this.x * scale;
    result.y += this.y * scale;
    result.z += this.z * scale;
    result.w += this.w * scale;
    return this;
}

/**
 * Multiplies the current quaternion by a scale factor
 * @param value defines the scale factor
 * @returns a new quaternion set by multiplying the current quaternion coordinates by the float "scale"
 */
public scale(value: f64): Quaternion {
    return new Quaternion(this.x * value, this.y * value, this.z * value, this.w * value);
}

/**
 * Scale the current quaternion values by a factor and stores the result to a given quaternion
 * @param scale defines the scale factor
 * @param result defines the Quaternion object where to store the result
 * @returns the unmodified current quaternion
 */
public scaleToRef(scale: f64, result: Quaternion): this {
    result.x = this.x * scale;
    result.y = this.y * scale;
    result.z = this.z * scale;
    result.w = this.w * scale;
    return this;
}

/**
 * Multiplies in place the current quaternion by a scale factor
 * @param value defines the scale factor
 * @returns the current modified quaternion
 */
public scaleInPlace(value: f64): this {
    this.x *= value;
    this.y *= value;
    this.z *= value;
    this.w *= value;
    return this;
}

/**
 * Scale the current quaternion values by a factor and add the result to a given quaternion
 * @param scale defines the scale factor
 * @param result defines the Quaternion object where to store the result
 * @returns the unmodified current quaternion
 */
public scaleAndAddToRef(scale: f64, result: Quaternion): this {
    result.x += this.x * scale;
    result.y += this.y * scale;
    result.z += this.z * scale;
    result.w += this.w * scale;
    return this;
}

/**
 * Compute a new matrix set with the current matrix values multiplied by scale (float)
 * @param scale defines the scale factor
 * @returns a new matrix
 */
public scale(scale: f64): Matrix {
    var result = new Matrix();
    this.scaleToRef(scale, result);
    return result;
}

/**
 * Scale the current matrix values by a factor to a given result matrix
 * @param scale defines the scale factor
 * @param result defines the matrix to store the result
 * @returns the current matrix
 */
public scaleToRef(scale: f64, result: Matrix): this {
    for (var index:i32 = 0; index < 16; index++) {
        result.m[index] = this.m[index] * scale;
    }
    result._markAsUpdated();
    return this;
}

/**
 * Scale the current matrix values by a factor and add the result to a given matrix
 * @param scale defines the scale factor
 * @param result defines the Matrix to store the result
 * @returns the current matrix
 */
public scaleAndAddToRef(scale: f64, result: Matrix): this {
    for (var index:i32 = 0; index < 16; index++) {
        result.m[index] += this.m[index] * scale;
    }
    result._markAsUpdated();
    return this;
}
/*
88888888888       888      d8b                                         88888888888        .d8888b.
    888           888      Y8P                                             888           d88P  Y88b
    888           888                                                      888           888    888
    888   .d88b.  888      888 88888b.   .d88b.   8888b.  888d888          888   .d88b.  888         8888b.  88888b.d88b.  88888b.d88b.   8888b.
    888  d88""88b 888      888 888 "88b d8P  Y8b     "88b 888P"            888  d88""88b 888  88888     "88b 888 "888 "88b 888 "888 "88b     "88b
    888  888  888 888      888 888  888 88888888 .d888888 888              888  888  888 888    888 .d888888 888  888  888 888  888  888 .d888888
    888  Y88..88P 888      888 888  888 Y8b.     888  888 888              888  Y88..88P Y88b  d88P 888  888 888  888  888 888  888  888 888  888
    888   "Y88P"  88888888 888 888  888  "Y8888  "Y888888 888              888   "Y88P"   "Y8888P88 "Y888888 888  888  888 888  888  888 "Y888888

*/
/**
 * Computes a new Color3 converted from the current one to linear space
 * @returns a new Color3 object
 */
public toLinearSpace(): Color3 {
    var convertedColor = new Color3();
    return this.toLinearSpaceToRef(convertedColor);
}

/**
 * Converts the Color3 values to linear space and stores the result in "convertedColor"
 * @param convertedColor defines the Color3 object where to store the linear space version
 * @returns the unmodified Color3
 */
public toLinearSpaceToRef(convertedColor: Color3): this {
    convertedColor.r = Math.pow(this.r, ToLinearSpace);
    convertedColor.g = Math.pow(this.g, ToLinearSpace);
    convertedColor.b = Math.pow(this.b, ToLinearSpace);
    return this;
}

/**
 * Computes a new Color3 converted from the current one to gamma space
 * @returns a new Color3 object
 */
public toGammaSpace(): Color3 {
    var convertedColor = new Color3();
    return this.toGammaSpaceToRef(convertedColor);
}

/**
 * Converts the Color3 values to gamma space and stores the result in "convertedColor"
 * @param convertedColor defines the Color3 object where to store the gamma space version
 * @returns the unmodified Color3
 */
public toGammaSpaceToRef(convertedColor: Color3): this {
    convertedColor.r = Math.pow(this.r, ToGammaSpace);
    convertedColor.g = Math.pow(this.g, ToGammaSpace);
    convertedColor.b = Math.pow(this.b, ToGammaSpace);
    return this;
}

/**
 * Computes a new Color4 converted from the current one to linear space
 * @returns a new Color4 object
 */
public toLinearSpace(): Color4 {
    var convertedColor = new Color4();
    return this.toLinearSpaceToRef(convertedColor);
}

/**
 * Converts the Color4 values to linear space and stores the result in "convertedColor"
 * @param convertedColor defines the Color4 object where to store the linear space version
 * @returns the unmodified Color4
 */
public toLinearSpaceToRef(convertedColor: Color4): this {
    convertedColor.r = Math.pow(this.r, ToLinearSpace);
    convertedColor.g = Math.pow(this.g, ToLinearSpace);
    convertedColor.b = Math.pow(this.b, ToLinearSpace);
    convertedColor.a = this.a;
    return this;
}

/**
 * Computes a new Color4 converted from the current one to gamma space
 * @returns a new Color4 object
 */
public toGammaSpace(): Color4 {
    var convertedColor = new Color4();
    return this.toGammaSpaceToRef(convertedColor);
}

/**
 * Converts the Color4 values to gamma space and stores the result in "convertedColor"
 * @param convertedColor defines the Color4 object where to store the gamma space version
 * @returns the unmodified Color4
 */
public toGammaSpaceToRef(convertedColor: Color4): this {
    convertedColor.r = Math.pow(this.r, ToGammaSpace);
    convertedColor.g = Math.pow(this.g, ToGammaSpace);
    convertedColor.b = Math.pow(this.b, ToGammaSpace);
    convertedColor.a = this.a;
    return this;
}

/*
888
888
888
888      .d88b.  888d888 88888b.
888     d8P  Y8b 888P"   888 "88b
888     88888888 888     888  888
888     Y8b.     888     888 d88P
88888888 "Y8888  888     88888P"
                         888
                         888
                         888
*/


/**
 * Creates a new Color3 with values linearly interpolated of "amount" between the start Color3 and the end Color3
 * @param start defines the start Color3 value
 * @param end defines the end Color3 value
 * @param amount defines the gradient value between start and end
 * @returns a new Color3 object
 */
public static Lerp(start: Color3, end: Color3, amount: f64): Color3 {
    var r = start.r + ((end.r - start.r) * amount);
    var g = start.g + ((end.g - start.g) * amount);
    var b = start.b + ((end.b - start.b) * amount);
    return new Color3(r, g, b);
}

/**
 * Creates a new Color4 object set with the linearly interpolated values of "amount" between the left Color4 object and the right Color4 object
 * @param left defines the start value
 * @param right defines the end value
 * @param amount defines the gradient factor
 * @returns a new Color4 object
 */
public static Lerp(left: Color4, right: Color4, amount: f64): Color4 {
    var result = new Color4(0.0, 0.0, 0.0, 0.0);
    Color4.LerpToRef(left, right, amount, result);
    return result;
}
/**
 * Set the given "result" with the linearly interpolated values of "amount" between the left Color4 object and the right Color4 object
 * @param left defines the start value
 * @param right defines the end value
 * @param amount defines the gradient factor
 * @param result defines the Color4 object where to store data
 */
public static LerpToRef(left: Color4, right: Color4, amount: f64, result: Color4): void {
    result.r = left.r + (right.r - left.r) * amount;
    result.g = left.g + (right.g - left.g) * amount;
    result.b = left.b + (right.b - left.b) * amount;
    result.a = left.a + (right.a - left.a) * amount;
}
/**
 * Returns a new Vector2 located for "amount" (float) on the linear interpolation between the vector "start" adn the vector "end".
 * @param start defines the start vector
 * @param end defines the end vector
 * @param amount defines the interpolation factor
 * @returns a new Vector2
 */
public static Lerp(start: Vector2, end: Vector2, amount: f64): Vector2 {
    var x = start.x + ((end.x - start.x) * amount);
    var y = start.y + ((end.y - start.y) * amount);
    return new Vector2(x, y);
}
/**
 * Returns a new Vector3 located for "amount" (float) on the linear interpolation between the vectors "start" and "end"
 * @param start defines the start value
 * @param end defines the end value
 * @param amount max defines amount between both (between 0 and 1)
 * @returns the new Vector3
 */
public static Lerp(start: Vector3, end: Vector3, amount: f64): Vector3 {
    var result = new Vector3(0, 0, 0);
    Vector3.LerpToRef(start, end, amount, result);
    return result;
}

/**
 * Sets the given vector "result" with the result of the linear interpolation from the vector "start" for "amount" to the vector "end"
 * @param start defines the start value
 * @param end defines the end value
 * @param amount max defines amount between both (between 0 and 1)
 * @param result defines the Vector3 where to store the result
 */
public static LerpToRef(start: Vector3, end: Vector3, amount: f64, result: Vector3): void {
    result.x = start.x + ((end.x - start.x) * amount);
    result.y = start.y + ((end.y - start.y) * amount);
    result.z = start.z + ((end.z - start.z) * amount);
}
/**
 * Returns a new Size set at the linear interpolation "amount" between "start" and "end".
 */
public static Lerp(start: Size, end: Size, amount: f64): Size {
    var w = start.width + ((end.width - start.width) * amount);
    var h = start.height + ((end.height - start.height) * amount);

    return new Size(w, h);
}
/**
 * Returns a new Matrix whose values are the interpolated values for "gradient" (float) between the ones of the matrices "startValue" and "endValue".
 * @param startValue defines the start value
 * @param endValue defines the end value
 * @param gradient defines the gradient factor
 * @returns the new matrix
 */
public static Lerp(startValue: Matrix, endValue: Matrix, gradient: f64): Matrix {
    var result = Matrix.Zero();
    Matrix.LerpToRef(startValue, endValue, gradient, result);
    return result;
}

/**
 * Set the given matrix "result" as the interpolated values for "gradient" (float) between the ones of the matrices "startValue" and "endValue".
 * @param startValue defines the start value
 * @param endValue defines the end value
 * @param gradient defines the gradient factor
 * @param result defines the Matrix object where to store data
 */
public static LerpToRef(startValue: Matrix, endValue: Matrix, gradient: f64, result: Matrix): void {
    for (var index:i32 = 0; index < 16; index++) {
        result.m[index] = startValue.m[index] * (1.0 - gradient) + endValue.m[index] * gradient;
    }
    result._markAsUpdated();
}

/**
 * Builds a new matrix whose values are computed by:
 * * decomposing the the "startValue" and "endValue" matrices into their respective scale, rotation and translation matrices
 * * interpolating for "gradient" (float) the values between each of these decomposed matrices between the start and the end
 * * recomposing a new matrix from these 3 interpolated scale, rotation and translation matrices
 * @param startValue defines the first matrix
 * @param endValue defines the second matrix
 * @param gradient defines the gradient between the two matrices
 * @returns the new matrix
 */
public static DecomposeLerp(startValue: Matrix, endValue: Matrix, gradient: f64): Matrix {
    var result = Matrix.Zero();
    Matrix.DecomposeLerpToRef(startValue, endValue, gradient, result);
    return result;
}

/**
 * Update a matrix to values which are computed by:
 * * decomposing the the "startValue" and "endValue" matrices into their respective scale, rotation and translation matrices
 * * interpolating for "gradient" (float) the values between each of these decomposed matrices between the start and the end
 * * recomposing a new matrix from these 3 interpolated scale, rotation and translation matrices
 * @param startValue defines the first matrix
 * @param endValue defines the second matrix
 * @param gradient defines the gradient between the two matrices
 * @param result defines the target matrix
 */
public static DecomposeLerpToRef(startValue: Matrix, endValue: Matrix, gradient: f64, result: Matrix) {
    var startScale = MathTmp.Vector3[0];
    var startRotation = MathTmp.Quaternion[0];
    var startTranslation = MathTmp.Vector3[1];
    startValue.decompose(startScale, startRotation, startTranslation);

    var endScale = MathTmp.Vector3[2];
    var endRotation = MathTmp.Quaternion[1];
    var endTranslation = MathTmp.Vector3[3];
    endValue.decompose(endScale, endRotation, endTranslation);

    var resultScale = MathTmp.Vector3[4];
    Vector3.LerpToRef(startScale, endScale, gradient, resultScale);
    var resultRotation = MathTmp.Quaternion[2];
    Quaternion.SlerpToRef(startRotation, endRotation, gradient, resultRotation);

    var resultTranslation = MathTmp.Vector3[5];
    Vector3.LerpToRef(startTranslation, endTranslation, gradient, resultTranslation);

    Matrix.ComposeToRef(resultScale, resultRotation, resultTranslation, result);
}

/*

     888 d8b          d8b      888
     888 Y8P          Y8P      888
     888                       888
 .d88888 888 888  888 888  .d88888  .d88b.
d88" 888 888 888  888 888 d88" 888 d8P  Y8b
888  888 888 Y88  88P 888 888  888 88888888
Y88b 888 888  Y8bd8P  888 Y88b 888 Y8b.
 "Y88888 888   Y88P   888  "Y88888  "Y8888

*/


/**
 * Returns a new Vector2 set with the Vector2 coordinates divided by the given one coordinates
 * @param otherVector defines the other vector
 * @returns a new Vector2
 */
public divide(otherVector: Vector2): Vector2 {
    return new Vector2(this.x / otherVector.x, this.y / otherVector.y);
}

/**
 * Sets the "result" coordinates with the Vector2 divided by the given one coordinates
 * @param otherVector defines the other vector
 * @param result defines the target vector
 * @returns the unmodified current Vector2
 */
public divideToRef(otherVector: Vector2, result: Vector2): this {
    result.x = this.x / otherVector.x;
    result.y = this.y / otherVector.y;
    return this;
}

/**
 * Divides the current Vector2 coordinates by the given ones
 * @param otherVector defines the other vector
 * @returns the current updated Vector2
 */
public divideInPlace(otherVector: Vector2): this {
    return this.divideToRef(otherVector, this);
}
/**
 * Returns a new Vector3 set with the result of the division of the current Vector3 coordinates by the given ones
 * @param otherVector defines the second operand
 * @returns the new Vector3
 */
public divide(otherVector: Vector3): Vector3 {
    return new Vector3(this.x / otherVector.x, this.y / otherVector.y, this.z / otherVector.z);
}

/**
 * Divides the current Vector3 coordinates by the given ones and stores the result in the given vector "result"
 * @param otherVector defines the second operand
 * @param result defines the Vector3 object where to store the result
 * @returns the current Vector3
 */
public divideToRef(otherVector: Vector3, result: Vector3): this {
    result.x = this.x / otherVector.x;
    result.y = this.y / otherVector.y;
    result.z = this.z / otherVector.z;
    return this;
}

/**
 * Divides the current Vector3 coordinates by the given ones.
 * @param otherVector defines the second operand
 * @returns the current updated Vector3
 */
public divideInPlace(otherVector: Vector3): this {
    return this.divideToRef(otherVector, this);
}
/**
* Returns a new Vector4 set with the division result of the current Vector4 by the given one.
*/
public divide(otherVector: Vector4): Vector4 {
   return new Vector4(this.x / otherVector.x, this.y / otherVector.y, this.z / otherVector.z, this.w / otherVector.w);
}
/**
* Updates the given vector "result" with the division result of the current Vector4 by the given one.
* Returns the current Vector4.
*/
public divideToRef(otherVector: Vector4, result: Vector4): this {
   result.x = this.x / otherVector.x;
   result.y = this.y / otherVector.y;
   result.z = this.z / otherVector.z;
   result.w = this.w / otherVector.w;
   return this;
}

/**
* Divides the current Vector4 coordinates by the given ones.
* @returns the updated Vector4.
*/
public divideInPlace(otherVector: Vector4): this {
   return this.divideToRef(otherVector, this);
}

/*
888                            888    888                                                            888 d8b
888                            888    888                                                            888 Y8P
888                            888    888                                                            888
888  .d88b.  88888b.   .d88b.  888888 88888b.       88888b.   .d88b.  888d888 88888b.d88b.   8888b.  888 888 88888888  .d88b.
888 d8P  Y8b 888 "88b d88P"88b 888    888 "88b      888 "88b d88""88b 888P"   888 "888 "88b     "88b 888 888    d88P  d8P  Y8b
888 88888888 888  888 888  888 888    888  888      888  888 888  888 888     888  888  888 .d888888 888 888   d88P   88888888
888 Y8b.     888  888 Y88b 888 Y88b.  888  888      888  888 Y88..88P 888     888  888  888 888  888 888 888  d88P    Y8b.
888  "Y8888  888  888  "Y88888  "Y888 888  888      888  888  "Y88P"  888     888  888  888 "Y888888 888 888 88888888  "Y8888
                           888
                      Y8b d88P
                       "Y88P"
*/

/**
 * Gets the length of the vector2
 * @returns the vector length (float)
 */
public length(): f64 {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

/**
 * Gets the vector2 squared length
 * @returns the vector2 squared length (float)
 */
public lengthSquared(): f64 {
    return (this.x * this.x + this.y * this.y);
}

// Methods

/**
 * Normalize the vector2
 * @returns the current updated Vector2
 */
public normalize(): this {
    var len = this.length();

    if (len === 0)
        return this;

    var num = 1.0 / len;

    this.x *= num;
    this.y *= num;

    return this;
}
// Properties
/**
 * Gets the length of the Vector3
 * @returns the length of the Vecto3
 */
public length(): f64 {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

/**
 * Gets the squared length of the Vector3
 * @returns squared length of the Vector3
 */
public lengthSquared(): f64 {
    return (this.x * this.x + this.y * this.y + this.z * this.z);
}

/**
 * Normalize the current Vector3.
 * Please note that this is an in place operation.
 * @returns the current updated Vector3
 */
public normalize(): this {
    var len = this.length();
    if (len === 0 || len === 1.0)
        return this;

    var num = 1.0 / len;
    this.x *= num;
    this.y *= num;
    this.z *= num;
    return this;
}

/**
 * Normalize the current Vector3 to a new vector
 * @returns the new Vector3
 */
public normalizeToNew(): Vector3 {
    const normalized = new Vector3(0, 0, 0);
    return this.normalizeToRef(normalized);
}

/**
 * Normalize the current Vector3 to the reference
 * @param reference define the Vector3 to update
 * @returns the updated Vector3
 */
public normalizeToRef(reference: Vector3): Vector3 {
    var len = this.length();
    if (len === 0 || len === 1.0) {
        reference.set(this.x, this.y, this.z);
        return reference;
    }

    const scale = 1.0 / len;
    this.scaleToRef(scale, reference);
    return reference;
}
// Properties
/**
 * Returns the Vector4 length (float).
 */
public length(): f64 {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
}
/**
 * Returns the Vector4 squared length (float).
 */
public lengthSquared(): f64 {
    return (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
}

// Methods
/**
 * Normalizes in place the Vector4.
 * Returns the updated Vector4.
 */
public normalize(): this {
    var len = this.length();

    if (len === 0)
        return this;

    var num = 1.0 / len;

    this.x *= num;
    this.y *= num;
    this.z *= num;
    this.w *= num;

    return this;
}


/**
 * Gets length of current quaternion
 * @returns the quaternion length (float)
 */
public length(): f64 {
    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
}

/**
 * Normalize in place the current quaternion
 * @returns the current updated quaternion
 */
public normalize(): this {
    var length = 1.0 / this.length();
    this.x *= length;
    this.y *= length;
    this.z *= length;
    this.w *= length;
    return this;
}


/**
 * Returns the Path2 total length (float).
 */
public length(): number {
    var result = this._length;

    if (!this.closed) {
        var lastPoint = this._points[this._points.length - 1];
        var firstPoint = this._points[0];
        result += (firstPoint.subtract(lastPoint).length());
    }
    return result;
}
/**
 * Normalize the current Plane in place.
 * Returns the updated Plane.
 */
public normalize(): this {
    var norm = (Math.sqrt((this.normal.x * this.normal.x) + (this.normal.y * this.normal.y) + (this.normal.z * this.normal.z)));
    var magnitude = 0.0;

    if (norm !== 0) {
        magnitude = 1.0 / norm;
    }
    this.normal.x *= magnitude;
    this.normal.y *= magnitude;
    this.normal.z *= magnitude;
    this.d *= magnitude;
    return this;
}

/*

                  888                           888 888
                  888                           888 888
                  888                           888 888
 .d8888b  8888b.  888888 88888b.d88b.  888  888 888 888 888d888 .d88b.  88888b.d88b.
d88P"        "88b 888    888 "888 "88b 888  888 888 888 888P"  d88""88b 888 "888 "88b
888      .d888888 888    888  888  888 888  888 888 888 888    888  888 888  888  888
Y88b.    888  888 Y88b.  888  888  888 Y88b 888 888 888 888    Y88..88P 888  888  888
 "Y8888P "Y888888  "Y888 888  888  888  "Y88888 888 888 888     "Y88P"  888  888  888

*/



/**
 * Gets a new Vector2 located for "amount" (float) on the CatmullRom spline defined by the given four Vector2
 * @param value1 defines 1st point of control
 * @param value2 defines 2nd point of control
 * @param value3 defines 3rd point of control
 * @param value4 defines 4th point of control
 * @param amount defines the interpolation factor
 * @returns a new Vector2
 */
public static CatmullRom(value1: Vector2, value2: Vector2, value3: Vector2, value4: Vector2, amount: f64): Vector2 {
    var squared = amount * amount;
    var cubed = amount * squared;

    var x = 0.5 * ((((2.0 * value2.x) + ((-value1.x + value3.x) * amount)) +
        (((((2.0 * value1.x) - (5.0 * value2.x)) + (4.0 * value3.x)) - value4.x) * squared)) +
        ((((-value1.x + (3.0 * value2.x)) - (3.0 * value3.x)) + value4.x) * cubed));

    var y = 0.5 * ((((2.0 * value2.y) + ((-value1.y + value3.y) * amount)) +
        (((((2.0 * value1.y) - (5.0 * value2.y)) + (4.0 * value3.y)) - value4.y) * squared)) +
        ((((-value1.y + (3.0 * value2.y)) - (3.0 * value3.y)) + value4.y) * cubed));

    return new Vector2(x, y);
}

/**
 * Returns a new Vector3 located for "amount" on the CatmullRom interpolation spline defined by the vectors "value1", "value2", "value3", "value4"
 * @param value1 defines the first control point
 * @param value2 defines the second control point
 * @param value3 defines the third control point
 * @param value4 defines the fourth control point
 * @param amount defines the amount on the spline to use
 * @returns the new Vector3
 */
public static CatmullRom(value1: Vector3, value2: Vector3, value3: Vector3, value4: Vector3, amount: f64): Vector3 {
    var squared = amount * amount;
    var cubed = amount * squared;

    var x = 0.5 * ((((2.0 * value2.x) + ((-value1.x + value3.x) * amount)) +
        (((((2.0 * value1.x) - (5.0 * value2.x)) + (4.0 * value3.x)) - value4.x) * squared)) +
        ((((-value1.x + (3.0 * value2.x)) - (3.0 * value3.x)) + value4.x) * cubed));

    var y = 0.5 * ((((2.0 * value2.y) + ((-value1.y + value3.y) * amount)) +
        (((((2.0 * value1.y) - (5.0 * value2.y)) + (4.0 * value3.y)) - value4.y) * squared)) +
        ((((-value1.y + (3.0 * value2.y)) - (3.0 * value3.y)) + value4.y) * cubed));

    var z = 0.5 * ((((2.0 * value2.z) + ((-value1.z + value3.z) * amount)) +
        (((((2.0 * value1.z) - (5.0 * value2.z)) + (4.0 * value3.z)) - value4.z) * squared)) +
        ((((-value1.z + (3.0 * value2.z)) - (3.0 * value3.z)) + value4.z) * cubed));

    return new Vector3(x, y, z);
}

/**
 * Returns a Curve3 object along a CatmullRom Spline curve :
 * @param points (array of Vector3) the points the spline must pass through. At least, four points required
 * @param nbPoints (integer) the wanted number of points between each curve control points
 * @param closed (boolean) optional with default false, when true forms a closed loop from the points
 */
public static CreateCatmullRomSpline(points: Vector3[], nbPoints: number, closed?: boolean): Curve3 {
    var catmullRom = new Array<Vector3>();
    var step = 1.0 / nbPoints;
    var amount = 0.0;
    if(closed) {
        var pointsCount = points.length;
        for (var i = 0; i < pointsCount; i++) {
            amount = 0;
            for (var c = 0; c < nbPoints; c++) {
                catmullRom.push(Vector3.CatmullRom(points[i % pointsCount], points[(i + 1) % pointsCount], points[(i + 2) % pointsCount], points[(i + 3) % pointsCount], amount));
                amount += step;
            }
        }
        catmullRom.push(catmullRom[0]);
    }
    else {
        var totalPoints = new Array<Vector3>();
        totalPoints.push(points[0].clone());
        Array.prototype.push.apply(totalPoints, points);
        totalPoints.push(points[points.length - 1].clone());
        for (var i = 0; i < totalPoints.length - 3; i++) {
            amount = 0;
            for (var c = 0; c < nbPoints; c++) {
                catmullRom.push(Vector3.CatmullRom(totalPoints[i], totalPoints[i + 1], totalPoints[i + 2], totalPoints[i + 3], amount));
                amount += step
            }
        }
        i--;
        catmullRom.push(Vector3.CatmullRom(totalPoints[i], totalPoints[i + 1], totalPoints[i + 2], totalPoints[i + 3], amount));
    }
    return new Curve3(catmullRom);
}


/*
888    888                                d8b 888
888    888                                Y8P 888
888    888                                    888
8888888888  .d88b.  888d888 88888b.d88b.  888 888888 .d88b.
888    888 d8P  Y8b 888P"   888 "888 "88b 888 888   d8P  Y8b
888    888 88888888 888     888  888  888 888 888   88888888
888    888 Y8b.     888     888  888  888 888 Y88b. Y8b.
888    888  "Y8888  888     888  888  888 888  "Y888 "Y8888




*/

/**
 * Returns a new Vector2 located for "amount" (float) on the Hermite spline defined by the vectors "value1", "value3", "tangent1", "tangent2"
 * @param value1 defines the 1st control point
 * @param tangent1 defines the outgoing tangent
 * @param value2 defines the 2nd control point
 * @param tangent2 defines the incoming tangent
 * @param amount defines the interpolation factor
 * @returns a new Vector2
 */
public static Hermite(value1: Vector2, tangent1: Vector2, value2: Vector2, tangent2: Vector2, amount: f64): Vector2 {
    var squared = amount * amount;
    var cubed = amount * squared;
    var part1 = ((2.0 * cubed) - (3.0 * squared)) + 1.0;
    var part2 = (-2.0 * cubed) + (3.0 * squared);
    var part3 = (cubed - (2.0 * squared)) + amount;
    var part4 = cubed - squared;

    var x = (((value1.x * part1) + (value2.x * part2)) + (tangent1.x * part3)) + (tangent2.x * part4);
    var y = (((value1.y * part1) + (value2.y * part2)) + (tangent1.y * part3)) + (tangent2.y * part4);

    return new Vector2(x, y);
}

/**
 * Returns a new Vector3 located for "amount" (float) on the Hermite interpolation spline defined by the vectors "value1", "tangent1", "value2", "tangent2"
 * @param value1 defines the first control point
 * @param tangent1 defines the first tangent vector
 * @param value2 defines the second control point
 * @param tangent2 defines the second tangent vector
 * @param amount defines the amount on the interpolation spline (between 0 and 1)
 * @returns the new Vector3
 */
public static Hermite(value1: Vector3, tangent1: Vector3, value2: Vector3, tangent2: Vector3, amount: f64): Vector3 {
    var squared = amount * amount;
    var cubed = amount * squared;
    var part1 = ((2.0 * cubed) - (3.0 * squared)) + 1.0;
    var part2 = (-2.0 * cubed) + (3.0 * squared);
    var part3 = (cubed - (2.0 * squared)) + amount;
    var part4 = cubed - squared;

    var x = (((value1.x * part1) + (value2.x * part2)) + (tangent1.x * part3)) + (tangent2.x * part4);
    var y = (((value1.y * part1) + (value2.y * part2)) + (tangent1.y * part3)) + (tangent2.y * part4);
    var z = (((value1.z * part1) + (value2.z * part2)) + (tangent1.z * part3)) + (tangent2.z * part4);
    return new Vector3(x, y, z);
}
/**
 * Interpolate between two quaternions using Hermite interpolation
 * @param value1 defines first quaternion
 * @param tangent1 defines the incoming tangent
 * @param value2 defines second quaternion
 * @param tangent2 defines the outgoing tangent
 * @param amount defines the target quaternion
 * @returns the new interpolated quaternion
 */
public static Hermite(value1: Quaternion, tangent1: Quaternion, value2: Quaternion, tangent2: Quaternion, amount: f64): Quaternion {
    var squared = amount * amount;
    var cubed = amount * squared;
    var part1 = ((2.0 * cubed) - (3.0 * squared)) + 1.0;
    var part2 = (-2.0 * cubed) + (3.0 * squared);
    var part3 = (cubed - (2.0 * squared)) + amount;
    var part4 = cubed - squared;

    var x = (((value1.x * part1) + (value2.x * part2)) + (tangent1.x * part3)) + (tangent2.x * part4);
    var y = (((value1.y * part1) + (value2.y * part2)) + (tangent1.y * part3)) + (tangent2.y * part4);
    var z = (((value1.z * part1) + (value2.z * part2)) + (tangent1.z * part3)) + (tangent2.z * part4);
    var w = (((value1.w * part1) + (value2.w * part2)) + (tangent1.w * part3)) + (tangent2.w * part4);
    return new Quaternion(x, y, z, w);
}
/*

8888888b.           888
888  "Y88b          888
888    888          888
888    888  .d88b.  888888
888    888 d88""88b 888
888    888 888  888 888
888  .d88P Y88..88P Y88b.
8888888P"   "Y88P"   "Y888



*/

/**
 * Gets the dot product of the vector "left" and the vector "right"
 * @param left defines first vector
 * @param right defines second vector
 * @returns the dot product (float)
 */
public static Dot(left: Vector2, right: Vector2): f64 {
    return left.x * right.x + left.y * right.y;
}
/**
 * Returns the dot product (float) between the vectors "left" and "right"
 * @param left defines the left operand
 * @param right defines the right operand
 * @returns the dot product
 */
public static Dot(left: Vector3, right: Vector3): f64 {
    return (left.x * right.x + left.y * right.y + left.z * right.z);
}
/**
 * Returns the dot product (float) between the quaternions "left" and "right"
 * @param left defines the left operand
 * @param right defines the right operand
 * @returns the dot product
 */
public static Dot(left: Quaternion, right: Quaternion): f64 {
    return (left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w);
}
/**
 * Returns the dot product (float) of the point coordinates and the plane normal.
 */
public dotCoordinate(point: Vector3): f64 {
    return ((((this.normal.x * point.x) + (this.normal.y * point.y)) + (this.normal.z * point.z)) + this.d);
}


/*
888     888          d8b                                 88888888888                                 .d888
888     888          Y8P                                     888                                    d88P"
888     888                                                  888                                    888
888     888 88888b.  888  .d88888 888  888  .d88b.           888  888d888 8888b.  88888b.  .d8888b  888888 .d88b.  888d888 88888b.d88b.  .d8888b
888     888 888 "88b 888 d88" 888 888  888 d8P  Y8b          888  888P"      "88b 888 "88b 88K      888   d88""88b 888P"   888 "888 "88b 88K
888     888 888  888 888 888  888 888  888 88888888          888  888    .d888888 888  888 "Y8888b. 888   888  888 888     888  888  888 "Y8888b.
Y88b. .d88P 888  888 888 Y88b 888 Y88b 888 Y8b.              888  888    888  888 888  888      X88 888   Y88..88P 888     888  888  888      X88
 "Y88888P"  888  888 888  "Y88888  "Y88888  "Y8888           888  888    "Y888888 888  888  88888P' 888    "Y88P"  888     888  888  888  88888P'
                              888
                              888
                              888

*/


/**
 * Transforms the given vector coordinates by the given transformation matrix and stores the result in the vector "result" coordinates
 * @param vector defines the vector to transform
 * @param transformation defines the matrix to apply
 * @param result defines the target vector
 */
public static TransformToRef(vector: Vector2, transformation: Matrix, result: Vector2): void {
    var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + transformation.m[12];
    var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + transformation.m[13];
    result.x = x;
    result.y = y;
}

/**
 * Determines if a given vector is included in a triangle
 * @param p defines the vector to test
 * @param p0 defines 1st triangle point
 * @param p1 defines 2nd triangle point
 * @param p2 defines 3rd triangle point
 * @returns true if the point "p" is in the triangle defined by the vertors "p0", "p1", "p2"
 */
public static PointInTriangle(p: Vector2, p0: Vector2, p1: Vector2, p2: Vector2) : bool {
    var a = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
    var sign = a < 0 ? -1 : 1;
    var s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
    var t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;

    return s > 0 && t > 0 && (s + t) < 2 * a * sign;
}


/**
 * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given vector
 * This method computes tranformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
 * @param vector defines the Vector3 to transform
 * @param transformation defines the transformation matrix
 * @param result defines the Vector3 where to store the result
 */
public static TransformCoordinatesToRef(vector: Vector3, transformation: Matrix, result: Vector3): void {
    var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]) + transformation.m[12];
    var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]) + transformation.m[13];
    var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]) + transformation.m[14];
    var w = (vector.x * transformation.m[3]) + (vector.y * transformation.m[7]) + (vector.z * transformation.m[11]) + transformation.m[15];

    result.x = x / w;
    result.y = y / w;
    result.z = z / w;
}

/**
 * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given floats (x, y, z)
 * This method computes tranformed coordinates only, not transformed direction vectors
 * @param x define the x coordinate of the source vector
 * @param y define the y coordinate of the source vector
 * @param z define the z coordinate of the source vector
 * @param transformation defines the transformation matrix
 * @param result defines the Vector3 where to store the result
 */
public static TransformCoordinatesFromFloatsToRef(x: f64, y: f64, z: f64, transformation: Matrix, result: Vector3): void {
    var rx = (x * transformation.m[0]) + (y * transformation.m[4]) + (z * transformation.m[8]) + transformation.m[12];
    var ry = (x * transformation.m[1]) + (y * transformation.m[5]) + (z * transformation.m[9]) + transformation.m[13];
    var rz = (x * transformation.m[2]) + (y * transformation.m[6]) + (z * transformation.m[10]) + transformation.m[14];
    var rw = (x * transformation.m[3]) + (y * transformation.m[7]) + (z * transformation.m[11]) + transformation.m[15];

    result.x = rx / rw;
    result.y = ry / rw;
    result.z = rz / rw;
}
/**
 * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given vector
 * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
 * @param vector defines the Vector3 to transform
 * @param transformation defines the transformation matrix
 * @param result defines the Vector3 where to store the result
 */
public static TransformNormalToRef(vector: Vector3, transformation: Matrix, result: Vector3): void {
    var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]);
    var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]);
    var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]);
    result.x = x;
    result.y = y;
    result.z = z;
}
/**
 * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given floats (x, y, z)
 * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
 * @param x define the x coordinate of the source vector
 * @param y define the y coordinate of the source vector
 * @param z define the z coordinate of the source vector
 * @param transformation defines the transformation matrix
 * @param result defines the Vector3 where to store the result
 */
public static TransformNormalFromFloatsToRef(x: f64, y: f64, z: f64, transformation: Matrix, result: Vector3): void {
    result.x = (x * transformation.m[0]) + (y * transformation.m[4]) + (z * transformation.m[8]);
    result.y = (x * transformation.m[1]) + (y * transformation.m[5]) + (z * transformation.m[9]);
    result.z = (x * transformation.m[2]) + (y * transformation.m[6]) + (z * transformation.m[10]);
}
/**
 * Sets the given vector "result" with the cross product of "left" and "right"
 * The cross product is then orthogonal to both "left" and "right"
 * @param left defines the left operand
 * @param right defines the right operand
 * @param result defines the Vector3 where to store the result
 */
public static CrossToRef(left: Vector3, right: Vector3, result: Vector3): void {
    MathTmp.Vector3[0].x = left.y * right.z - left.z * right.y;
    MathTmp.Vector3[0].y = left.z * right.x - left.x * right.z;
    MathTmp.Vector3[0].z = left.x * right.y - left.y * right.x;
    result.copyFrom(MathTmp.Vector3[0]);
}

/**
 * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given vector.
 * This methods computes transformed normalized direction vectors only.
 */
public static TransformNormalToRef(vector: Vector4, transformation: Matrix, result: Vector4): void {
    var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]);
    var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]);
    var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]);
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = vector.w;
}

/**
 * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given floats (x, y, z, w).
 * This methods computes transformed normalized direction vectors only.
 */
public static TransformNormalFromFloatsToRef(x: f64, y: f64, z: f64, w: f64, transformation: Matrix, result: Vector4): void {
    result.x = (x * transformation.m[0]) + (y * transformation.m[4]) + (z * transformation.m[8]);
    result.y = (x * transformation.m[1]) + (y * transformation.m[5]) + (z * transformation.m[9]);
    result.z = (x * transformation.m[2]) + (y * transformation.m[6]) + (z * transformation.m[10]);
    result.w = w;
}
/*
8888888b.  d8b          888
888  "Y88b Y8P          888
888    888              888
888    888 888 .d8888b  888888  8888b.  88888b.   .d8888b .d88b.
888    888 888 88K      888        "88b 888 "88b d88P"   d8P  Y8b
888    888 888 "Y8888b. 888    .d888888 888  888 888     88888888
888  .d88P 888      X88 Y88b.  888  888 888  888 Y88b.   Y8b.
8888888P"  888  88888P'  "Y888 "Y888888 888  888  "Y8888P "Y8888


*/





/**
 * Gets the distance between the vectors "value1" and "value2"
 * @param value1 defines first vector
 * @param value2 defines second vector
 * @returns the distance between vectors
 */
public static Distance(value1: Vector2, value2: Vector2): f64 {
    return Math.sqrt(Vector2.DistanceSquared(value1, value2));
}

/**
 * Returns the squared distance between the vectors "value1" and "value2"
 * @param value1 defines first vector
 * @param value2 defines second vector
 * @returns the squared distance between vectors
 */
public static DistanceSquared(value1: Vector2, value2: Vector2): f64 {
    var x = value1.x - value2.x;
    var y = value1.y - value2.y;
    return (x * x) + (y * y);
}
/**
 * Returns the distance between the vectors "value1" and "value2"
 * @param value1 defines the first operand
 * @param value2 defines the second operand
 * @returns the distance
 */
public static Distance(value1: Vector3, value2: Vector3): f64 {
    return Math.sqrt(Vector3.DistanceSquared(value1, value2));
}

/**
 * Returns the squared distance between the vectors "value1" and "value2"
 * @param value1 defines the first operand
 * @param value2 defines the second operand
 * @returns the squared distance
 */
public static DistanceSquared(value1: Vector3, value2: Vector3): f64 {
    var x = value1.x - value2.x;
    var y = value1.y - value2.y;
    var z = value1.z - value2.z;

    return (x * x) + (y * y) + (z * z);
}
/**
* Returns the distance (float) between the vectors "value1" and "value2".
*/
public static Distance(value1: Vector4, value2: Vector4): f64 {
   return Math.sqrt(Vector4.DistanceSquared(value1, value2));
}
/**
* Returns the squared distance (float) between the vectors "value1" and "value2".
*/
public static DistanceSquared(value1: Vector4, value2: Vector4): f64 {
   var x = value1.x - value2.x;
   var y = value1.y - value2.y;
   var z = value1.z - value2.z;
   var w = value1.w - value2.w;

   return (x * x) + (y * y) + (z * z) + (w * w);
}



/*
8888888888                   d8b 888
888                          Y8P 888
888                              888
8888888    88888b.  .d8888b  888 888  .d88b.  88888b.
888        888 "88b 88K      888 888 d88""88b 888 "88b
888        888  888 "Y8888b. 888 888 888  888 888  888
888        888 d88P      X88 888 888 Y88..88P 888  888
8888888888 88888P"   88888P' 888 888  "Y88P"  888  888
           888
           888
           888

*/
/**
 * Gets a boolean if two vectors are equals (using an epsilon value)
 * @param otherVector defines the other vector
 * @param epsilon defines the minimal distance to consider equality
 * @returns true if the given vector coordinates are close to the current ones by a distance of epsilon.
 */
public equalsWithEpsilon(otherVector: Vector2, epsilon: f64 = Epsilon): bool {
    otherVector = otherVector || new Vector2(this.x-1,this.y-1);
    return Scalar.WithinEpsilon(this.x, otherVector.x, epsilon) && Scalar.WithinEpsilon(this.y, otherVector.y, epsilon);
}
/**
 * Returns true if the current Vector3 and the given vector coordinates are distant less than epsilon
 * @param otherVector defines the second operand
 * @param epsilon defines the minimal distance to define values as equals
 * @returns true if both vectors are distant less than epsilon
 */
public equalsWithEpsilon(otherVector: Vector3, epsilon: f64 = Epsilon): bool {
    return otherVector && Scalar.WithinEpsilon(this.x, otherVector.x, epsilon) && Scalar.WithinEpsilon(this.y, otherVector.y, epsilon) && Scalar.WithinEpsilon(this.z, otherVector.z, epsilon);
}
/**
 * Boolean : True if the current Vector4 coordinates are each beneath the distance "epsilon" from the given vector ones.
 */
public equalsWithEpsilon(otherVector: Vector4, epsilon: f64 = Epsilon): bool {
    otherVector = otherVector || new Vector4(this.x-1,this.y,this.z,this.w);
    return Scalar.WithinEpsilon(this.x, otherVector.x, epsilon)
        && Scalar.WithinEpsilon(this.y, otherVector.y, epsilon)
        && Scalar.WithinEpsilon(this.z, otherVector.z, epsilon)
        && Scalar.WithinEpsilon(this.w, otherVector.w, epsilon);
}

/*
 .d88888b.                    888                         888b     d888          888    888
d88P" "Y88b                   888                         8888b   d8888          888    888
888     888                   888                         88888b.d88888          888    888
888     888 888  888  8888b.  888888 .d88b.  888d888      888Y88888P888  8888b.  888888 88888b.
888     888 888  888     "88b 888   d8P  Y8b 888P"        888 Y888P 888     "88b 888    888 "88b
888 Y8b 888 888  888 .d888888 888   88888888 888          888  Y8P  888 .d888888 888    888  888
Y88b.Y8b88P Y88b 888 888  888 Y88b. Y8b.     888          888   "   888 888  888 Y88b.  888  888
 "Y888888"   "Y88888 "Y888888  "Y888 "Y8888  888          888       888 "Y888888  "Y888 888  888
       Y8b



*/



/**
 * Sets the given vector3 "result" with the Euler angles translated from the current quaternion
 * @param result defines the vector which will be filled with the Euler angles
 * @param order is a reserved parameter and is ignore for now
 * @returns the current unchanged quaternion
 */
public toEulerAnglesToRef(result: Vector3, order = "YZX"): this {

    var qz = this.z;
    var qx = this.x;
    var qy = this.y;
    var qw = this.w;

    var sqw = qw * qw;
    var sqz = qz * qz;
    var sqx = qx * qx;
    var sqy = qy * qy;

    var zAxisY = qy * qz - qx * qw;
    var limit = .4999999;

    if (zAxisY < -limit) {
        result.y = 2 * Math.atan2(qy, qw);
        result.x = Math.PI / 2;
        result.z = 0;
    } else if (zAxisY > limit) {
        result.y = 2 * Math.atan2(qy, qw);
        result.x = -Math.PI / 2;
        result.z = 0;
    } else {
        result.z = Math.atan2(2.0 * (qx * qy + qz * qw), (-sqz - sqx + sqy + sqw));
        result.x = Math.asin(-2.0 * (qz * qy - qx * qw));
        result.y = Math.atan2(2.0 * (qz * qx + qy * qw), (sqz - sqx - sqy + sqw));
    }

    return this;

}

/**
 * Updates the given rotation matrix with the current quaternion values
 * @param result defines the target matrix
 * @returns the current unchanged quaternion
 */
public toRotationMatrix(result: Matrix): this {
    var xx = this.x * this.x;
    var yy = this.y * this.y;
    var zz = this.z * this.z;
    var xy = this.x * this.y;
    var zw = this.z * this.w;
    var zx = this.z * this.x;
    var yw = this.y * this.w;
    var yz = this.y * this.z;
    var xw = this.x * this.w;

    result.m[0] = 1.0 - (2.0 * (yy + zz));
    result.m[1] = 2.0 * (xy + zw);
    result.m[2] = 2.0 * (zx - yw);
    result.m[3] = 0;
    result.m[4] = 2.0 * (xy - zw);
    result.m[5] = 1.0 - (2.0 * (zz + xx));
    result.m[6] = 2.0 * (yz + xw);
    result.m[7] = 0;
    result.m[8] = 2.0 * (zx + yw);
    result.m[9] = 2.0 * (yz - xw);
    result.m[10] = 1.0 - (2.0 * (yy + xx));
    result.m[11] = 0;
    result.m[12] = 0;
    result.m[13] = 0;
    result.m[14] = 0;
    result.m[15] = 1.0;

    result._markAsUpdated();
    return this;
}
/**
 * Updates the given quaternion with the given rotation matrix values
 * @param matrix defines the source matrix
 * @param result defines the target quaternion
 */
public static FromRotationMatrixToRef(matrix: Matrix, result: Quaternion): void {
    var data = matrix.m;
    var m11 = data[0], m12 = data[4], m13 = data[8];
    var m21 = data[1], m22 = data[5], m23 = data[9];
    var m31 = data[2], m32 = data[6], m33 = data[10];
    var trace = m11 + m22 + m33;
    var s;

    if (trace > 0) {

        s = 0.5 / Math.sqrt(trace + 1.0);

        result.w = 0.25 / s;
        result.x = (m32 - m23) * s;
        result.y = (m13 - m31) * s;
        result.z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {

        s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

        result.w = (m32 - m23) / s;
        result.x = 0.25 * s;
        result.y = (m12 + m21) / s;
        result.z = (m13 + m31) / s;
    } else if (m22 > m33) {

        s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

        result.w = (m13 - m31) / s;
        result.x = (m12 + m21) / s;
        result.y = 0.25 * s;
        result.z = (m23 + m32) / s;
    } else {

        s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

        result.w = (m21 - m12) / s;
        result.x = (m13 + m31) / s;
        result.y = (m23 + m32) / s;
        result.z = 0.25 * s;
    }
}

/**
* Creates a new rotation from the given Euler float angles (y, x, z) and stores it in the target quaternion
* @param yaw defines the rotation around Y axis
* @param pitch defines the rotation around X axis
* @param roll defines the rotation around Z axis
* @param result defines the target quaternion
*/
public static RotationYawPitchRollToRef(yaw: f64, pitch: f64, roll: f64, result: Quaternion): void {
   // Produces a quaternion from Euler angles in the z-y-x orientation (Tait-Bryan angles)
   var halfRoll = roll * 0.5;
   var halfPitch = pitch * 0.5;
   var halfYaw = yaw * 0.5;

   var sinRoll = Math.sin(halfRoll);
   var cosRoll = Math.cos(halfRoll);
   var sinPitch = Math.sin(halfPitch);
   var cosPitch = Math.cos(halfPitch);
   var sinYaw = Math.sin(halfYaw);
   var cosYaw = Math.cos(halfYaw);

   result.x = (cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll);
   result.y = (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll);
   result.z = (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll);
   result.w = (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll);
}

/**
* Creates a new quaternion from the given Euler float angles expressed in z-x-z orientation and stores it in the target quaternion
* @param alpha defines the rotation around first axis
* @param beta defines the rotation around second axis
* @param gamma defines the rotation around third axis
* @param result defines the target quaternion
*/
public static RotationAlphaBetaGammaToRef(alpha: f64, beta: f64, gamma: f64, result: Quaternion): void {
   // Produces a quaternion from Euler angles in the z-x-z orientation
   var halfGammaPlusAlpha = (gamma + alpha) * 0.5;
   var halfGammaMinusAlpha = (gamma - alpha) * 0.5;
   var halfBeta = beta * 0.5;

   result.x = Math.cos(halfGammaMinusAlpha) * Math.sin(halfBeta);
   result.y = Math.sin(halfGammaMinusAlpha) * Math.sin(halfBeta);
   result.z = Math.sin(halfGammaPlusAlpha) * Math.cos(halfBeta);
   result.w = Math.cos(halfGammaPlusAlpha) * Math.cos(halfBeta);
}


/**
 * Interpolates between two quaternions and stores it into a target quaternion
 * @param left defines first quaternion
 * @param right defines second quaternion
 * @param amount defines the gradient to use
 * @param result defines the target quaternion
 */
public static SlerpToRef(left: Quaternion, right: Quaternion, amount: f64, result: Quaternion): void {
    var num2;
    var num3;
    var num4 = (((left.x * right.x) + (left.y * right.y)) + (left.z * right.z)) + (left.w * right.w);
    var flag = false;

    if (num4 < 0) {
        flag = true;
        num4 = -num4;
    }

    if (num4 > 0.999999) {
        num3 = 1 - amount;
        num2 = flag ? -amount : amount;
    }
    else {
        var num5 = Math.acos(num4);
        var num6 = (1.0 / Math.sin(num5));
        num3 = (Math.sin((1.0 - amount) * num5)) * num6;
        num2 = flag ? ((-Math.sin(amount * num5)) * num6) : ((Math.sin(amount * num5)) * num6);
    }

    result.x = (num3 * left.x) + (num2 * right.x);
    result.y = (num3 * left.y) + (num2 * right.y);
    result.z = (num3 * left.z) + (num2 * right.z);
    result.w = (num3 * left.w) + (num2 * right.w);
}




/*
888b     d888          888            d8b               888b     d888          888    888
8888b   d8888          888            Y8P               8888b   d8888          888    888
88888b.d88888          888                              88888b.d88888          888    888
888Y88888P888  8888b.  888888 888d888 888 888  888      888Y88888P888  8888b.  888888 88888b.
888 Y888P 888     "88b 888    888P"   888 `Y8bd8P'      888 Y888P 888     "88b 888    888 "88b
888  Y8P  888 .d888888 888    888     888   X88K        888  Y8P  888 .d888888 888    888  888
888   "   888 888  888 Y88b.  888     888 .d8""8b.      888   "   888 888  888 Y88b.  888  888
888       888 "Y888888  "Y888 888     888 888  888      888       888 "Y888888  "Y888 888  888

*/




/**
 * Gets the determinant of the matrix
 * @returns the matrix determinant
 */
public determinant(): f64 {
    var temp1 = (this.m[10] * this.m[15]) - (this.m[11] * this.m[14]);
    var temp2 = (this.m[9] * this.m[15]) - (this.m[11] * this.m[13]);
    var temp3 = (this.m[9] * this.m[14]) - (this.m[10] * this.m[13]);
    var temp4 = (this.m[8] * this.m[15]) - (this.m[11] * this.m[12]);
    var temp5 = (this.m[8] * this.m[14]) - (this.m[10] * this.m[12]);
    var temp6 = (this.m[8] * this.m[13]) - (this.m[9] * this.m[12]);

    return ((((this.m[0] * (((this.m[5] * temp1) - (this.m[6] * temp2)) + (this.m[7] * temp3))) - (this.m[1] * (((this.m[4] * temp1) -
        (this.m[6] * temp4)) + (this.m[7] * temp5)))) + (this.m[2] * (((this.m[4] * temp2) - (this.m[5] * temp4)) + (this.m[7] * temp6)))) -
        (this.m[3] * (((this.m[4] * temp3) - (this.m[5] * temp5)) + (this.m[6] * temp6))));
}
/**
 * Sets the given matrix to the current inverted Matrix
 * @param other defines the target matrix
 * @returns the unmodified current matrix
 */
public invertToRef(other: Matrix): this {
    var l1 = this.m[0];
    var l2 = this.m[1];
    var l3 = this.m[2];
    var l4 = this.m[3];
    var l5 = this.m[4];
    var l6 = this.m[5];
    var l7 = this.m[6];
    var l8 = this.m[7];
    var l9 = this.m[8];
    var l10 = this.m[9];
    var l11 = this.m[10];
    var l12 = this.m[11];
    var l13 = this.m[12];
    var l14 = this.m[13];
    var l15 = this.m[14];
    var l16 = this.m[15];
    var l17 = (l11 * l16) - (l12 * l15);
    var l18 = (l10 * l16) - (l12 * l14);
    var l19 = (l10 * l15) - (l11 * l14);
    var l20 = (l9 * l16) - (l12 * l13);
    var l21 = (l9 * l15) - (l11 * l13);
    var l22 = (l9 * l14) - (l10 * l13);
    var l23 = ((l6 * l17) - (l7 * l18)) + (l8 * l19);
    var l24 = -(((l5 * l17) - (l7 * l20)) + (l8 * l21));
    var l25 = ((l5 * l18) - (l6 * l20)) + (l8 * l22);
    var l26 = -(((l5 * l19) - (l6 * l21)) + (l7 * l22));
    var l27 = 1.0 / ((((l1 * l23) + (l2 * l24)) + (l3 * l25)) + (l4 * l26));
    var l28 = (l7 * l16) - (l8 * l15);
    var l29 = (l6 * l16) - (l8 * l14);
    var l30 = (l6 * l15) - (l7 * l14);
    var l31 = (l5 * l16) - (l8 * l13);
    var l32 = (l5 * l15) - (l7 * l13);
    var l33 = (l5 * l14) - (l6 * l13);
    var l34 = (l7 * l12) - (l8 * l11);
    var l35 = (l6 * l12) - (l8 * l10);
    var l36 = (l6 * l11) - (l7 * l10);
    var l37 = (l5 * l12) - (l8 * l9);
    var l38 = (l5 * l11) - (l7 * l9);
    var l39 = (l5 * l10) - (l6 * l9);

    other.m[0] = l23 * l27;
    other.m[4] = l24 * l27;
    other.m[8] = l25 * l27;
    other.m[12] = l26 * l27;
    other.m[1] = -(((l2 * l17) - (l3 * l18)) + (l4 * l19)) * l27;
    other.m[5] = (((l1 * l17) - (l3 * l20)) + (l4 * l21)) * l27;
    other.m[9] = -(((l1 * l18) - (l2 * l20)) + (l4 * l22)) * l27;
    other.m[13] = (((l1 * l19) - (l2 * l21)) + (l3 * l22)) * l27;
    other.m[2] = (((l2 * l28) - (l3 * l29)) + (l4 * l30)) * l27;
    other.m[6] = -(((l1 * l28) - (l3 * l31)) + (l4 * l32)) * l27;
    other.m[10] = (((l1 * l29) - (l2 * l31)) + (l4 * l33)) * l27;
    other.m[14] = -(((l1 * l30) - (l2 * l32)) + (l3 * l33)) * l27;
    other.m[3] = -(((l2 * l34) - (l3 * l35)) + (l4 * l36)) * l27;
    other.m[7] = (((l1 * l34) - (l3 * l37)) + (l4 * l38)) * l27;
    other.m[11] = -(((l1 * l35) - (l2 * l37)) + (l4 * l39)) * l27;
    other.m[15] = (((l1 * l36) - (l2 * l38)) + (l3 * l39)) * l27;

    other._markAsUpdated();
    return this;
}


/**
 * Sets the Float32Array "result" from the given index "offset" with the multiplication of the current matrix and the given one
 * @param other defines the second operand
 * @param result defines the array where to store the multiplication
 * @param offset defines the offset in the target array where to start storing values
 * @returns the current matrix
 */
public multiplyToArray(other: Matrix, result: f64[], offset: f64): Matrix {
    var tm0 = this.m[0];
    var tm1 = this.m[1];
    var tm2 = this.m[2];
    var tm3 = this.m[3];
    var tm4 = this.m[4];
    var tm5 = this.m[5];
    var tm6 = this.m[6];
    var tm7 = this.m[7];
    var tm8 = this.m[8];
    var tm9 = this.m[9];
    var tm10 = this.m[10];
    var tm11 = this.m[11];
    var tm12 = this.m[12];
    var tm13 = this.m[13];
    var tm14 = this.m[14];
    var tm15 = this.m[15];

    var om0 = other.m[0];
    var om1 = other.m[1];
    var om2 = other.m[2];
    var om3 = other.m[3];
    var om4 = other.m[4];
    var om5 = other.m[5];
    var om6 = other.m[6];
    var om7 = other.m[7];
    var om8 = other.m[8];
    var om9 = other.m[9];
    var om10 = other.m[10];
    var om11 = other.m[11];
    var om12 = other.m[12];
    var om13 = other.m[13];
    var om14 = other.m[14];
    var om15 = other.m[15];

    result[offset] = tm0 * om0 + tm1 * om4 + tm2 * om8 + tm3 * om12;
    result[offset + 1] = tm0 * om1 + tm1 * om5 + tm2 * om9 + tm3 * om13;
    result[offset + 2] = tm0 * om2 + tm1 * om6 + tm2 * om10 + tm3 * om14;
    result[offset + 3] = tm0 * om3 + tm1 * om7 + tm2 * om11 + tm3 * om15;

    result[offset + 4] = tm4 * om0 + tm5 * om4 + tm6 * om8 + tm7 * om12;
    result[offset + 5] = tm4 * om1 + tm5 * om5 + tm6 * om9 + tm7 * om13;
    result[offset + 6] = tm4 * om2 + tm5 * om6 + tm6 * om10 + tm7 * om14;
    result[offset + 7] = tm4 * om3 + tm5 * om7 + tm6 * om11 + tm7 * om15;

    result[offset + 8] = tm8 * om0 + tm9 * om4 + tm10 * om8 + tm11 * om12;
    result[offset + 9] = tm8 * om1 + tm9 * om5 + tm10 * om9 + tm11 * om13;
    result[offset + 10] = tm8 * om2 + tm9 * om6 + tm10 * om10 + tm11 * om14;
    result[offset + 11] = tm8 * om3 + tm9 * om7 + tm10 * om11 + tm11 * om15;

    result[offset + 12] = tm12 * om0 + tm13 * om4 + tm14 * om8 + tm15 * om12;
    result[offset + 13] = tm12 * om1 + tm13 * om5 + tm14 * om9 + tm15 * om13;
    result[offset + 14] = tm12 * om2 + tm13 * om6 + tm14 * om10 + tm15 * om14;
    result[offset + 15] = tm12 * om3 + tm13 * om7 + tm14 * om11 + tm15 * om15;
    return this;
}

/**
 * Decomposes the current Matrix into a translation, rotation and scaling components
 * @param scale defines the scale vector3 given as a reference to update
 * @param rotation defines the rotation quaternion given as a reference to update
 * @param translation defines the translation vector3 given as a reference to update
 * @returns true if operation was successful
 */
public decompose(scale: Vector3 | null = null, rotation: Quaternion | null = null, translation: Vector3 | null = null): bool {
    if (translation) {
        translation.x = this.m[12];
        translation.y = this.m[13];
        translation.z = this.m[14];
    }

    scale = scale || MathTmp.Vector3[0];
    scale.x = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1] + this.m[2] * this.m[2]);
    scale.y = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5] + this.m[6] * this.m[6]);
    scale.z = Math.sqrt(this.m[8] * this.m[8] + this.m[9] * this.m[9] + this.m[10] * this.m[10]);

    if (this.determinant() <= 0) {
        scale.y *= -1;
    }

    if (scale.x === 0 || scale.y === 0 || scale.z === 0) {
        if (rotation) {
            rotation.x = 0;
            rotation.y = 0;
            rotation.z = 0;
            rotation.w = 1;
        }

        return false;
    }

    if (rotation) {
        Matrix.FromValuesToRef(
            this.m[0] / scale.x, this.m[1] / scale.x, this.m[2] / scale.x, 0,
            this.m[4] / scale.y, this.m[5] / scale.y, this.m[6] / scale.y, 0,
            this.m[8] / scale.z, this.m[9] / scale.z, this.m[10] / scale.z, 0,
            0, 0, 0, 1, MathTmp.Matrix[0]);

        Quaternion.FromRotationMatrixToRef(MathTmp.Matrix[0], rotation);
    }

    return true;
}
/**
 * Extracts the rotation matrix from the current one and sets it as the given "result"
 * @param result defines the target matrix to store data to
 * @returns the current matrix
 */
public getRotationMatrixToRef(result: Matrix): this {
    var m = this.m;

    var sx = Math.sqrt(m[0] * m[0] + m[1] * m[1] + m[2] * m[2]);
    var sy = Math.sqrt(m[4] * m[4] + m[5] * m[5] + m[6] * m[6]);
    var sz = Math.sqrt(m[8] * m[8] + m[9] * m[9] + m[10] * m[10]);

    if (this.determinant() <= 0) {
        sy *= -1;
    }

    if (sx === 0 || sy === 0 || sz === 0) {
        Matrix.IdentityToRef(result);
    }
    else {
        Matrix.FromValuesToRef(
            m[0] / sx, m[1] / sx, m[2] / sx, 0,
            m[4] / sy, m[5] / sy, m[6] / sy, 0,
            m[8] / sz, m[9] / sz, m[10] / sz, 0,
            0, 0, 0, 1, result);
    }

    return this;
}
/**
 * Stores an array into a matrix after having multiplied each component by a given factor
 * @param array defines the source array
 * @param offset defines the offset in the source array
 * @param scale defines the scaling factor
 * @param result defines the target matrix
 */
public static FromFloat32ArrayToRefScaled(array: Float32Array, offset: i32, scale: f64, result: Matrix) {
    for (var index:i32 = 0; index < 16; index++) {
        result.m[index] = array[index + offset] * scale;
    }

    result._markAsUpdated();
}


/**
 * Creates a new rotation matrix for "angle" radians around the given axis and stores it in a given matrix
 * @param axis defines the axis to use
 * @param angle defines the angle (in radians) to use
 * @param result defines the target matrix
 */
public static RotationAxisToRef(axis: Vector3, angle: f64, result: Matrix): void {
    var s = Math.sin(-angle);
    var c = Math.cos(-angle);
    var c1 = 1 - c;

    axis.normalize();

    result.m[0] = (axis.x * axis.x) * c1 + c;
    result.m[1] = (axis.x * axis.y) * c1 - (axis.z * s);
    result.m[2] = (axis.x * axis.z) * c1 + (axis.y * s);
    result.m[3] = 0.0;

    result.m[4] = (axis.y * axis.x) * c1 + (axis.z * s);
    result.m[5] = (axis.y * axis.y) * c1 + c;
    result.m[6] = (axis.y * axis.z) * c1 - (axis.x * s);
    result.m[7] = 0.0;

    result.m[8] = (axis.z * axis.x) * c1 - (axis.y * s);
    result.m[9] = (axis.z * axis.y) * c1 + (axis.x * s);
    result.m[10] = (axis.z * axis.z) * c1 + c;
    result.m[11] = 0.0;

    result.m[15] = 1.0;

    result._markAsUpdated();
}

/**
* Store a left-handed orthographic projection to a given matrix
* @param width defines the viewport width
* @param height defines the viewport height
* @param znear defines the near clip plane
* @param zfar defines the far clip plane
* @param result defines the target matrix
*/
public static OrthoLHToRef(width: f64, height: f64, znear: f64, zfar: f64, result: Matrix): void {
   let n = znear;
   let f = zfar;

   let a = 2.0 / width;
   let b = 2.0 / height;
   let c = 2.0 / (f - n);
   let d = -(f + n) / (f - n);

   Matrix.FromValuesToRef(
       a, 0.0, 0.0, 0.0,
       0.0, b, 0.0, 0.0,
       0.0, 0.0, c, 0.0,
       0.0, 0.0, d, 1.0,
       result
   );
}

/**
 * Stores a left-handed orthographic projection into a given matrix
 * @param left defines the viewport left coordinate
 * @param right defines the viewport right coordinate
 * @param bottom defines the viewport bottom coordinate
 * @param top defines the viewport top coordinate
 * @param znear defines the near clip plane
 * @param zfar defines the far clip plane
 * @param result defines the target matrix
 */
public static OrthoOffCenterLHToRef(left: f64, right: f64, bottom: f64, top: f64, znear: f64, zfar: f64, result: Matrix): void {
    let n = znear;
    let f = zfar;

    let a = 2.0 / (right - left);
    let b = 2.0 / (top - bottom);
    let c = 2.0 / (f - n);
    let d = -(f + n) / (f - n);
    let i0 = (left + right) / (left - right);
    let i1 = (top + bottom) / (bottom - top);

    Matrix.FromValuesToRef(
        a, 0.0, 0.0, 0.0,
        0.0, b, 0.0, 0.0,
        0.0, 0.0, c, 0.0,
        i0, i1, d, 1.0,
        result
    );
}

/**
* Creates a left-handed perspective projection matrix
* @param width defines the viewport width
* @param height defines the viewport height
* @param znear defines the near clip plane
* @param zfar defines the far clip plane
* @returns a new matrix as a left-handed perspective projection matrix
*/
public static PerspectiveLH(width: f64, height: f64, znear: f64, zfar: f64): Matrix {
   var matrix = Matrix.Zero();

   let n = znear;
   let f = zfar;

   let a = 2.0 * n / width;
   let b = 2.0 * n / height;
   let c = (f + n) / (f - n);
   let d = -2.0 * f * n / (f - n);

   Matrix.FromValuesToRef(
       a, 0.0, 0.0, 0.0,
       0.0, b, 0.0, 0.0,
       0.0, 0.0, c, 1.0,
       0.0, 0.0, d, 0.0,
       matrix
   );

   return matrix;
}


/**
* Stores a left-handed perspective projection into a given matrix
* @param fov defines the horizontal field of view
* @param aspect defines the aspect ratio
* @param znear defines the near clip plane
* @param zfar defines the far clip plane
* @param result defines the target matrix
* @param isVerticalFovFixed defines it the fov is vertically fixed (default) or horizontally
*/
public static PerspectiveFovLHToRef(fov: f64, aspect: f64, znear: f64, zfar: f64, result: Matrix, isVerticalFovFixed = true): void {
   let n = znear;
   let f = zfar;

   let t = 1.0 / (Math.tan(fov * 0.5));
   let a = isVerticalFovFixed ? (t / aspect) : t;
   let b = isVerticalFovFixed ? t : (t * aspect);
   let c = (f + n) / (f - n);
   let d = -2.0 * f * n / (f - n);

   Matrix.FromValuesToRef(
       a, 0.0, 0.0, 0.0,
       0.0, b, 0.0, 0.0,
       0.0, 0.0, c, 1.0,
       0.0, 0.0, d, 0.0,
       result
   );
}

/**
 * Stores a right-handed perspective projection into a given matrix
 * @param fov defines the horizontal field of view
 * @param aspect defines the aspect ratio
 * @param znear defines the near clip plane
 * @param zfar defines the far clip plane
 * @param result defines the target matrix
 * @param isVerticalFovFixed defines it the fov is vertically fixed (default) or horizontally
 */
public static PerspectiveFovRHToRef(fov: f64, aspect: f64, znear: f64, zfar: f64, result: Matrix, isVerticalFovFixed = true): void {
    //alternatively this could be expressed as:
    //    m = PerspectiveFovLHToRef
    //    m[10] *= -1.0;
    //    m[11] *= -1.0;

    let n = znear;
    let f = zfar;

    let t = 1.0 / (Math.tan(fov * 0.5));
    let a = isVerticalFovFixed ? (t / aspect) : t;
    let b = isVerticalFovFixed ? t : (t * aspect);
    let c = -(f + n) / (f - n);
    let d = -2 * f * n / (f - n);

    Matrix.FromValuesToRef(
        a, 0.0, 0.0, 0.0,
        0.0, b, 0.0, 0.0,
        0.0, 0.0, c, -1.0,
        0.0, 0.0, d, 0.0,
        result
    );
}
/**
 * Stores a perspective projection for WebVR info a given matrix
 * @param fov defines the field of view
 * @param znear defines the near clip plane
 * @param zfar defines the far clip plane
 * @param result defines the target matrix
 * @param rightHanded defines if the matrix must be in right-handed mode (false by default)
 */
public static PerspectiveFovWebVRToRef(fov: { upDegrees: f64, downDegrees: f64, leftDegrees: f64, rightDegrees: f64 }, znear: f64, zfar: f64, result: Matrix, rightHanded = false): void {

    var rightHandedFactor = rightHanded ? -1 : 1;

    var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
    var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
    var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
    var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
    var xScale = 2.0 / (leftTan + rightTan);
    var yScale = 2.0 / (upTan + downTan);
    result.m[0] = xScale;
    result.m[1] = result.m[2] = result.m[3] = result.m[4] = 0.0;
    result.m[5] = yScale;
    result.m[6] = result.m[7] = 0.0;
    result.m[8] = ((leftTan - rightTan) * xScale * 0.5);
    result.m[9] = -((upTan - downTan) * yScale * 0.5);
    result.m[10] = -zfar / (znear - zfar);
    result.m[11] = 1.0 * rightHandedFactor;
    result.m[12] = result.m[13] = result.m[15] = 0.0;
    result.m[14] = -(2.0 * zfar * znear) / (zfar - znear);

    result._markAsUpdated();
}

/**
 * Computes a complete transformation matrix
 * @param viewport defines the viewport to use
 * @param world defines the world matrix
 * @param view defines the view matrix
 * @param projection defines the projection matrix
 * @param zmin defines the near clip plane
 * @param zmax defines the far clip plane
 * @returns the transformation matrix
 */
public static GetFinalMatrix(viewport: Viewport, world: Matrix, view: Matrix, projection: Matrix, zmin: f64, zmax: f64): Matrix {
    var cw = viewport.width;
    var ch = viewport.height;
    var cx = viewport.x;
    var cy = viewport.y;

    var viewportMatrix = Matrix.FromValues(cw / 2.0, 0.0, 0.0, 0.0,
        0.0, -ch / 2.0, 0.0, 0.0,
        0.0, 0.0, zmax - zmin, 0.0,
        cx + cw / 2.0, ch / 2.0 + cy, zmin, 1);

    return world.multiply(view).multiply(projection).multiply(viewportMatrix);
}
/**
 * Creates a rotation matrix from a quaternion and stores it in a target matrix
 * @param quat defines the quaternion to use
 * @param result defines the target matrix
 */
public static FromQuaternionToRef(quat: Quaternion, result: Matrix) {

    var xx = quat.x * quat.x;
    var yy = quat.y * quat.y;
    var zz = quat.z * quat.z;
    var xy = quat.x * quat.y;
    var zw = quat.z * quat.w;
    var zx = quat.z * quat.x;
    var yw = quat.y * quat.w;
    var yz = quat.y * quat.z;
    var xw = quat.x * quat.w;

    result.m[0] = 1.0 - (2.0 * (yy + zz));
    result.m[1] = 2.0 * (xy + zw);
    result.m[2] = 2.0 * (zx - yw);
    result.m[3] = 0.0;
    result.m[4] = 2.0 * (xy - zw);
    result.m[5] = 1.0 - (2.0 * (zz + xx));
    result.m[6] = 2.0 * (yz + xw);
    result.m[7] = 0.0;
    result.m[8] = 2.0 * (zx + yw);
    result.m[9] = 2.0 * (yz - xw);
    result.m[10] = 1.0 - (2.0 * (yy + xx));
    result.m[11] = 0.0;

    result.m[12] = 0.0;
    result.m[13] = 0.0;
    result.m[14] = 0.0;

    result.m[15] = 1.0;

    result._markAsUpdated();
}
/*
8888888b.  888                                 888b     d888          888    888
888   Y88b 888                                 8888b   d8888          888    888
888    888 888                                 88888b.d88888          888    888
888   d88P 888  8888b.  88888b.   .d88b.       888Y88888P888  8888b.  888888 88888b.
8888888P"  888     "88b 888 "88b d8P  Y8b      888 Y888P 888     "88b 888    888 "88b
888        888 .d888888 888  888 88888888      888  Y8P  888 .d888888 888    888  888
888        888 888  888 888  888 Y8b.          888   "   888 888  888 Y88b.  888  888
888        888 "Y888888 888  888  "Y8888       888       888 "Y888888  "Y888 888  888


*/


/**
 * Returns a new Plane as the result of the transformation of the current Plane by the given matrix.
 */
public transform(transformation: Matrix): Plane {
    var transposedMatrix = Matrix.Transpose(transformation);
    var x = this.normal.x;
    var y = this.normal.y;
    var z = this.normal.z;
    var d = this.d;

    var normalX = (((x * transposedMatrix.m[0]) + (y * transposedMatrix.m[1])) + (z * transposedMatrix.m[2])) + (d * transposedMatrix.m[3]);
    var normalY = (((x * transposedMatrix.m[4]) + (y * transposedMatrix.m[5])) + (z * transposedMatrix.m[6])) + (d * transposedMatrix.m[7]);
    var normalZ = (((x * transposedMatrix.m[8]) + (y * transposedMatrix.m[9])) + (z * transposedMatrix.m[10])) + (d * transposedMatrix.m[11]);
    var finalD = (((x * transposedMatrix.m[12]) + (y * transposedMatrix.m[13])) + (z * transposedMatrix.m[14])) + (d * transposedMatrix.m[15]);

    return new Plane(normalX, normalY, normalZ, finalD);
}

/**
 * Returns the dot product (float) of the point coordinates and the plane normal.
 */
public dotCoordinate(point: Vector3): f64 {
    return ((((this.normal.x * point.x) + (this.normal.y * point.y)) + (this.normal.z * point.z)) + this.d);
}

/**
 * Updates the current Plane from the plane defined by the three given points.
 * Returns the updated Plane.
 */
public copyFromPoints(point1: Vector3, point2: Vector3, point3: Vector3): this {
    var x1 = point2.x - point1.x;
    var y1 = point2.y - point1.y;
    var z1 = point2.z - point1.z;
    var x2 = point3.x - point1.x;
    var y2 = point3.y - point1.y;
    var z2 = point3.z - point1.z;
    var yz = (y1 * z2) - (z1 * y2);
    var xz = (z1 * x2) - (x1 * z2);
    var xy = (x1 * y2) - (y1 * x2);
    var pyth = (Math.sqrt((yz * yz) + (xz * xz) + (xy * xy)));
    var invPyth;

    if (pyth !== 0) {
        invPyth = 1.0 / pyth;
    }
    else {
        invPyth = 0.0;
    }

    this.normal.x = yz * invPyth;
    this.normal.y = xz * invPyth;
    this.normal.z = xy * invPyth;
    this.d = -((this.normal.x * point1.x) + (this.normal.y * point1.y) + (this.normal.z * point1.z));

    return this;
}

/**
 * Returns a new Plane the normal vector to this plane at the given origin point.
 * Note : the vector "normal" is updated because normalized.
 */
static FromPositionAndNormal(origin: Vector3, normal: Vector3): Plane {
    var result = new Plane(0.0, 0.0, 0.0, 0.0);
    normal.normalize();
    result.normal = normal;
    result.d = -(normal.x * origin.x + normal.y * origin.y + normal.z * origin.z);
    return result;
}
/**
 * Returns the signed distance between the plane defined by the normal vector at the "origin"" point and the given other point.
 */
static SignedDistanceToPlaneFromPositionAndNormal(origin: Vector3, normal: Vector3, point: Vector3): f64 {
    var d = -(normal.x * origin.x + normal.y * origin.y + normal.z * origin.z);
    return Vector3.Dot(point, normal) + d;
}