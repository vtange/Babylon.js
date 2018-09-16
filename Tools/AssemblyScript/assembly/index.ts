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

export function superAdd(r: f64, r2: f64, g: f64, g2: f64, b: f64, b2: f64, a: f64, a2: f64): void {
    store<f64>(0,r + r2 + g + g2 + b + b2 + a + a2);
}

export function superMultiply(r: f64, r2: f64, g: f64, g2: f64, b: f64, b2: f64, a: f64, a2: f64): void {
    store<f64>(0,r * r2 * g * g2 * b * b2 * a * a2);
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

export function scaleAndAdd3Values(r: f64, g: f64, b: f64, r2: f64, g2: f64, b2: f64, scale: f64): void {
    store<f64>(0,(r * scale)+r2);
    store<f64>(8,(g * scale)+g2);
    store<f64>(16,(b * scale)+b2);
}

export function scaleAndAdd4Values(r: f64, g: f64, b: f64, a:f64, r2: f64, g2: f64, b2: f64, a2: f64, scale: f64): void {
    store<f64>(0,(r * scale)+r2);
    store<f64>(8,(g * scale)+g2);
    store<f64>(16,(b * scale)+b2);
    store<f64>(24,(a * scale)+a2);
}