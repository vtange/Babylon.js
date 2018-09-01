// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

/*------------------------*/


export class Scalar {

    /**
     * Two pi constants convenient for computation.
     */
    public static TwoPi: f64 = Math.PI * 2;

    /**
     * Boolean : true if the absolute difference between a and b is lower than epsilon (default = 1.401298E-45)
     */
    public static WithinEpsilon(a: f64, b: f64, epsilon: f64 = 1.401298E-45): bool {
        let num = a - b;
        return -epsilon <= num && num <= epsilon;
    }

    /**
     * Returns a string : the upper case translation of the number i to hexadecimal.
     */
    /*
    public static ToHex(i: number): string {
        let str = i.toString(16);

        if (i <= 15) {
            return ("0" + str).toUpperCase();
        }

        return str.toUpperCase();
    }
    */
    /**
     * Returns -1 if value is negative and +1 is value is positive.
     * Returns the value itself if it's equal to zero.
     */
    public static Sign(value: f64): i32 {
        value = +value; // convert to a number

        if (value === 0 || isNaN(value))
            return value;

        return value > 0 ? 1 : -1;
    }

    /**
     * Returns the value itself if it's between min and max.
     * Returns min if the value is lower than min.
     * Returns max if the value is greater than max.
     */
    public static Clamp(value: f64, min: f64 = 0, max: f64 = 1): f64 {
        return Math.min(max, Math.max(min, value));
    }

    /**
     * Returns the log2 of value.
     */
    public static Log2(value: f64): f64 {
        return Math.log(value) * Math.LOG2E;
    }

    /**
    * Loops the value, so that it is never larger than length and never smaller than 0.
    *
    * This is similar to the modulo operator but it works with floating point numbers.
    * For example, using 3.0 for t and 2.5 for length, the result would be 0.5.
    * With t = 5 and length = 2.5, the result would be 0.0.
    * Note, however, that the behaviour is not defined for negative numbers as it is for the modulo operator
    */
    public static Repeat(value: f64, length: f64): f64 {
        return value - Math.floor(value / length) * length;
    }

    /**
    * Normalize the value between 0.0 and 1.0 using min and max values
    */
    public static Normalize(value: f64, min: f64, max: f64): f64 {
        return (value - min) / (max - min);
    }

    /**
    * Denormalize the value from 0.0 and 1.0 using min and max values
    */
    public static Denormalize(normalized: f64, min: f64, max: f64): f64 {
        return (normalized * (max - min) + min);
    }

    /**
    * Calculates the shortest difference between two given angles given in degrees.
    */
    public static DeltaAngle(current: f64, target: f64): f64 {
        var num: number = Scalar.Repeat(target - current, 360.0);
        if (num > 180.0) {
            num -= 360.0;
        }
        return num;
    }

    /**
    * PingPongs the value t, so that it is never larger than length and never smaller than 0.
    *
    * The returned value will move back and forth between 0 and length
    */
    public static PingPong(tx: f64, length: f64): f64 {
        var t: f64 = Scalar.Repeat(tx, length * 2.0);
        return length - Math.abs(t - length);
    }

    /**
    * Interpolates between min and max with smoothing at the limits.
    *
    * This function interpolates between min and max in a similar way to Lerp. However, the interpolation will gradually speed up
    * from the start and slow down toward the end. This is useful for creating natural-looking animation, fading and other transitions.
    */
    public static SmoothStep(from: f64, to: f64, tx: f64): f64 {
        var t: f64 = Scalar.Clamp(tx);
        t = -2.0 * t * t * t + 3.0 * t * t;
        return to * t + from * (1.0 - t);
    }

    /**
    * Moves a value current towards target.
    *
    * This is essentially the same as Mathf.Lerp but instead the function will ensure that the speed never exceeds maxDelta.
    * Negative values of maxDelta pushes the value away from target.
    */
    public static MoveTowards(current: f64, target: f64, maxDelta: f64): f64 {
        var result: f64 = 0;
        if (Math.abs(target - current) <= maxDelta) {
            result = target;
        } else {
            result = current + Scalar.Sign(target - current) * maxDelta;
        }
        return result;
    }

    /**
    * Same as MoveTowards but makes sure the values interpolate correctly when they wrap around 360 degrees.
    *
    * Variables current and target are assumed to be in degrees. For optimization reasons, negative values of maxDelta
    *  are not supported and may cause oscillation. To push current away from a target angle, add 180 to that angle instead.
    */
    public static MoveTowardsAngle(current: f64, target: f64, maxDelta: f64): f64 {
        var num: f64 = Scalar.DeltaAngle(current, target);
        var result: f64 = 0;
        if (-maxDelta < num && num < maxDelta) {
            result = target;
        } else {
            target = current + num;
            result = Scalar.MoveTowards(current, target, maxDelta);
        }
        return result;
    }

 /**
     * Creates a new scalar with values linearly interpolated of "amount" between the start scalar and the end scalar.
     */
    public static Lerp(start: f64, end: f64, amount: f64): f64 {
        return start + ((end - start) * amount);
    }

    /**
    * Same as Lerp but makes sure the values interpolate correctly when they wrap around 360 degrees.
    * The parameter t is clamped to the range [0, 1]. Variables a and b are assumed to be in degrees.
    */
    public static LerpAngle(start: f64, end: f64, amount: f64): f64 {
        var num: f64 = Scalar.Repeat(end - start, 360.0);
        if (num > 180.0) {
            num -= 360.0;
        }
        return start + num * Scalar.Clamp(amount);
    }

    /**
    * Calculates the linear parameter t that produces the interpolant value within the range [a, b].
    */
    public static InverseLerp(a: f64, b: f64, value: f64): f64 {
        var result: f64 = 0;
        if (a != b) {
            result = Scalar.Clamp((value - a) / (b - a));
        } else {
            result = 0.0;
        }
        return result;
    }

    /**
     * Returns a new scalar located for "amount" (float) on the Hermite spline defined by the scalars "value1", "value3", "tangent1", "tangent2".
     */
    public static Hermite(value1: f64, tangent1: f64, value2: f64, tangent2: f64, amount: f64): f64 {
        var squared = amount * amount;
        var cubed = amount * squared;
        var part1 = ((2.0 * cubed) - (3.0 * squared)) + 1.0;
        var part2 = (-2.0 * cubed) + (3.0 * squared);
        var part3 = (cubed - (2.0 * squared)) + amount;
        var part4 = cubed - squared;

        return (((value1 * part1) + (value2 * part2)) + (tangent1 * part3)) + (tangent2 * part4);
    }

    /**
    * Returns a random float number between and min and max values
    */
    public static RandomRange(min: f64, max: f64): f64 {
        if (min === max) return min;
        return ((Math.random() * (max - min)) + min);
    }

    /**
    * This function returns percentage of a number in a given range.
    *
    * RangeToPercent(40,20,60) will return 0.5 (50%)
    * RangeToPercent(34,0,100) will return 0.34 (34%)
    */
    public static RangeToPercent(number: f64, min: f64, max: f64): f64 {
        return ((number - min) / (max - min));
    }

    /**
    * This function returns number that corresponds to the percentage in a given range.
    *
    * PercentToRange(0.34,0,100) will return 34.
    */
    public static PercentToRange(percent: f64, min: f64, max: f64): f64 {
        return ((max - min) * percent + min);
    }

    /**
     * Returns the angle converted to equivalent value between -Math.PI and Math.PI radians.
     * @param angle The angle to normalize in radian.
     * @return The converted angle.
     */
    public static NormalizeRadians(angle: f64): f64 {
        // More precise but slower version kept for reference.
        // angle = angle % Tools.TwoPi;
        // angle = (angle + Tools.TwoPi) % Tools.TwoPi;

        //if (angle > Math.PI) {
        //	angle -= Tools.TwoPi;
        //}

        angle -= (Scalar.TwoPi * Math.floor((angle + Math.PI) / Scalar.TwoPi));

        return angle;
    }
}