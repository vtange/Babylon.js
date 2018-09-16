module BABYLON {

    /**
     * Class representing a vector containing 2 coordinates
     */
    export class Vector2 {
        /**
         * Creates a new Vector2 from the given x and y coordinates
         * @param x defines the first coordinate
         * @param y defines the second coordinate
         */
        constructor(
            /** defines the first coordinate */
            public x: number = 0,
            /** defines the second coordinate */
            public y: number = 0) {
        }

        /**
         * Gets a new Vector2 located for "amount" (float) on the CatmullRom spline defined by the given four Vector2
         * @param value1 defines 1st point of control
         * @param value2 defines 2nd point of control
         * @param value3 defines 3rd point of control
         * @param value4 defines 4th point of control
         * @param amount defines the interpolation factor
         * @returns a new Vector2
         */
        public static CatmullRom(value1: Vector2, value2: Vector2, value3: Vector2, value4: Vector2, amount: number): Vector2 {
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
         * Returns a new Vector2 located for "amount" (float) on the Hermite spline defined by the vectors "value1", "value3", "tangent1", "tangent2"
         * @param value1 defines the 1st control point
         * @param tangent1 defines the outgoing tangent
         * @param value2 defines the 2nd control point
         * @param tangent2 defines the incoming tangent
         * @param amount defines the interpolation factor
         * @returns a new Vector2
         */
        public static Hermite(value1: Vector2, tangent1: Vector2, value2: Vector2, tangent2: Vector2, amount: number): Vector2 {
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
         * Determines if a given vector is included in a triangle
         * @param p defines the vector to test
         * @param p0 defines 1st triangle point
         * @param p1 defines 2nd triangle point
         * @param p2 defines 3rd triangle point
         * @returns true if the point "p" is in the triangle defined by the vertors "p0", "p1", "p2"
         */
        public static PointInTriangle(p: Vector2, p0: Vector2, p1: Vector2, p2: Vector2) {
            let a = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
            let sign = a < 0 ? -1 : 1;
            let s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
            let t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;

            return s > 0 && t > 0 && (s + t) < 2 * a * sign;
        }
    }

    /**
     * Classed used to store (x,y,z) vector representation
     * A Vector3 is the main object used in 3D geometry
     * It can represent etiher the coordinates of a point the space, either a direction
     * Reminder: Babylon.js uses a left handed forward facing system
     */
    export class Vector3 {
        /**
         * Creates a new Vector3 object from the given x, y, z (floats) coordinates.
         * @param x defines the first coordinates (on X axis)
         * @param y defines the second coordinates (on Y axis)
         * @param z defines the third coordinates (on Z axis)
         */
        constructor(
            /**
             * Defines the first coordinates (on X axis)
             */
            public x: number = 0,
            /**
             * Defines the second coordinates (on Y axis)
             */
            public y: number = 0,
            /**
             * Defines the third coordinates (on Z axis)
             */
            public z: number = 0
        ) {
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
        public static TransformCoordinatesFromFloatsToRef(x: number, y: number, z: number, transformation: Matrix, result: Vector3): void {
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
        public static TransformNormalFromFloatsToRef(x: number, y: number, z: number, transformation: Matrix, result: Vector3): void {
            result.x = (x * transformation.m[0]) + (y * transformation.m[4]) + (z * transformation.m[8]);
            result.y = (x * transformation.m[1]) + (y * transformation.m[5]) + (z * transformation.m[9]);
            result.z = (x * transformation.m[2]) + (y * transformation.m[6]) + (z * transformation.m[10]);
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
        public static CatmullRom(value1: Vector3, value2: Vector3, value3: Vector3, value4: Vector3, amount: number): Vector3 {
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
         * Returns a new Vector3 located for "amount" (float) on the Hermite interpolation spline defined by the vectors "value1", "tangent1", "value2", "tangent2"
         * @param value1 defines the first control point
         * @param tangent1 defines the first tangent vector
         * @param value2 defines the second control point
         * @param tangent2 defines the second tangent vector
         * @param amount defines the amount on the interpolation spline (between 0 and 1)
         * @returns the new Vector3
         */
        public static Hermite(value1: Vector3, tangent1: Vector3, value2: Vector3, tangent2: Vector3, amount: number): Vector3 {
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
         * Returns the squared distance between the vectors "value1" and "value2"
         * @param value1 defines the first operand
         * @param value2 defines the second operand
         * @returns the squared distance
         */
        public static DistanceSquared(value1: Vector3, value2: Vector3): number {
            var x = value1.x - value2.x;
            var y = value1.y - value2.y;
            var z = value1.z - value2.z;

            return (x * x) + (y * y) + (z * z);
        }
    }

    /**
     * Class used to store quaternion data
     * @see https://en.wikipedia.org/wiki/Quaternion
     * @see http://doc.babylonjs.com/features/position,_rotation,_scaling
     */
    export class Quaternion {

        /**
         * Creates a new Quaternion from the given floats
         * @param x defines the first component (0 by default)
         * @param y defines the second component (0 by default)
         * @param z defines the third component (0 by default)
         * @param w defines the fourth component (1.0 by default)
         */
        constructor(
            /** defines the first component (0 by default) */
            public x: number = 0.0,
            /** defines the second component (0 by default) */
            public y: number = 0.0,
            /** defines the third component (0 by default) */
            public z: number = 0.0,
            /** defines the fourth component (1.0 by default) */
            public w: number = 1.0) {
        }

        /**
         * Sets the given "result" as the the multiplication result of the current one with the given one "q1"
         * @param q1 defines the second operand
         * @param result defines the target quaternion
         * @returns the current quaternion
         */
        public multiplyToRef(q1: Quaternion, result: Quaternion): Quaternion {
            var x = this.x * q1.w + this.y * q1.z - this.z * q1.y + this.w * q1.x;
            var y = -this.x * q1.z + this.y * q1.w + this.z * q1.x + this.w * q1.y;
            var z = this.x * q1.y - this.y * q1.x + this.z * q1.w + this.w * q1.z;
            var w = -this.x * q1.x - this.y * q1.y - this.z * q1.z + this.w * q1.w;
            result.copyFromFloats(x, y, z, w);
            return this;
        }

        /**
         * Sets the given vector3 "result" with the Euler angles translated from the current quaternion
         * @param result defines the vector which will be filled with the Euler angles
         * @param order is a reserved parameter and is ignore for now
         * @returns the current unchanged quaternion
         */
        public toEulerAnglesToRef(result: Vector3, order = "YZX"): Quaternion {

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
         * Creates a new rotation from the given Euler float angles (y, x, z) and stores it in the target quaternion
         * @param yaw defines the rotation around Y axis
         * @param pitch defines the rotation around X axis
         * @param roll defines the rotation around Z axis
         * @param result defines the target quaternion
         */
        public static RotationYawPitchRollToRef(yaw: number, pitch: number, roll: number, result: Quaternion): void {
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
        public static RotationAlphaBetaGammaToRef(alpha: number, beta: number, gamma: number, result: Quaternion): void {
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
        public static SlerpToRef(left: Quaternion, right: Quaternion, amount: number, result: Quaternion): void {
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

        /**
         * Interpolate between two quaternions using Hermite interpolation
         * @param value1 defines first quaternion
         * @param tangent1 defines the incoming tangent
         * @param value2 defines second quaternion
         * @param tangent2 defines the outgoing tangent
         * @param amount defines the target quaternion
         * @returns the new interpolated quaternion
         */
        public static Hermite(value1: Quaternion, tangent1: Quaternion, value2: Quaternion, tangent2: Quaternion, amount: number): Quaternion {
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
    }

    /**
     * Class used to store matrix data (4x4)
     */
    export class Matrix {
        private static _tempQuaternion: Quaternion = new Quaternion();
        private static _xAxis: Vector3 = Vector3.Zero();
        private static _yAxis: Vector3 = Vector3.Zero();
        private static _zAxis: Vector3 = Vector3.Zero();
        private static _updateFlagSeed = 0;
        private static _identityReadOnly = Matrix.Identity();

        private _isIdentity = false;
        private _isIdentityDirty = true;
        /**
         * Gets the update flag of the matrix which is an unique number for the matrix.
         * It will be incremented every time the matrix data change.
         * You can use it to speed the comparison between two versions of the same matrix.
         */
        public updateFlag: number;

        /**
         * Gets or sets the internal data of the matrix
         */
        public m: Float32Array = new Float32Array(16);

        /** @hidden */
        public _markAsUpdated() {
            this.updateFlag = Matrix._updateFlagSeed++;
            this._isIdentityDirty = true;
        }

        /**
         * Creates an empty matrix (filled with zeros)
         */
        public constructor() {
            this._markAsUpdated();
        }

        /**
         * Gets the determinant of the matrix
         * @returns the matrix determinant
         */
        public determinant(): number {
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
        public invertToRef(other: Matrix): Matrix {
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
        public multiplyToArray(other: Matrix, result: Float32Array, offset: number): Matrix {
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
        public decompose(scale?: Vector3, rotation?: Quaternion, translation?: Vector3): boolean {
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
        public getRotationMatrixToRef(result: Matrix): Matrix {
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
         * Stores a perspective projection for WebVR info a given matrix
         * @param fov defines the field of view
         * @param znear defines the near clip plane
         * @param zfar defines the far clip plane
         * @param result defines the target matrix
         * @param rightHanded defines if the matrix must be in right-handed mode (false by default)
         */
        public static PerspectiveFovWebVRToRef(fov: { upDegrees: number, downDegrees: number, leftDegrees: number, rightDegrees: number }, znear: number, zfar: number, result: Matrix, rightHanded = false): void {

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
    }



















































































    export class Plane {
        public normal: Vector3;
        public d: number;
        /**
         * Creates a Plane object according to the given floats a, b, c, d and the plane equation : ax + by + cz + d = 0
         */
        constructor(a: number, b: number, c: number, d: number) {
            this.normal = new Vector3(a, b, c);
            this.d = d;
        }

        /**
         * Returns the plane coordinates as a new array of 4 elements [a, b, c, d].
         */
        public asArray(): number[] {
            return [this.normal.x, this.normal.y, this.normal.z, this.d];
        }

        // Methods
        /**
         * Returns a new plane copied from the current Plane.
         */
        public clone(): Plane {
            return new Plane(this.normal.x, this.normal.y, this.normal.z, this.d);
        }
        /**
         * Returns the string "Plane".
         */
        public getClassName(): string {
            return "Plane";
        }
        /**
         * Returns the Plane hash code.
         */
        public getHashCode(): number {
            let hash = this.normal.getHashCode();
            hash = (hash * 397) ^ (this.d || 0);
            return hash;
        }
        /**
         * Normalize the current Plane in place.
         * Returns the updated Plane.
         */
        public normalize(): Plane {
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
        public dotCoordinate(point: Vector3): number {
            return ((((this.normal.x * point.x) + (this.normal.y * point.y)) + (this.normal.z * point.z)) + this.d);
        }

        /**
         * Updates the current Plane from the plane defined by the three given points.
         * Returns the updated Plane.
         */
        public copyFromPoints(point1: Vector3, point2: Vector3, point3: Vector3): Plane {
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
         * Boolean : True is the vector "direction"  is the same side than the plane normal.
         */
        public isFrontFacingTo(direction: Vector3, epsilon: number): boolean {
            var dot = Vector3.Dot(this.normal, direction);
            return (dot <= epsilon);
        }

        /**
         * Returns the signed distance (float) from the given point to the Plane.
         */
        public signedDistanceTo(point: Vector3): number {
            return Vector3.Dot(point, this.normal) + this.d;
        }

        // Statics
        /**
         * Returns a new Plane from the given array.
         */
        static FromArray(array: ArrayLike<number>): Plane {
            return new Plane(array[0], array[1], array[2], array[3]);
        }
        /**
         * Returns a new Plane defined by the three given points.
         */
        static FromPoints(point1: Vector3, point2: Vector3, point3: Vector3): Plane {
            var result = new Plane(0.0, 0.0, 0.0, 0.0);
            result.copyFromPoints(point1, point2, point3);
            return result;
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
        static SignedDistanceToPlaneFromPositionAndNormal(origin: Vector3, normal: Vector3, point: Vector3): number {
            var d = -(normal.x * origin.x + normal.y * origin.y + normal.z * origin.z);
            return Vector3.Dot(point, normal) + d;
        }
    }

    export class Viewport {
        /**
         * Creates a Viewport object located at (x, y) and sized (width, height).
         */
        constructor(public x: number, public y: number, public width: number, public height: number) {
        }

        public toGlobal(renderWidthOrEngine: number | Engine, renderHeight: number): Viewport {
            if ((<Engine>renderWidthOrEngine).getRenderWidth) {
                var engine = (<Engine>renderWidthOrEngine);
                return this.toGlobal(engine.getRenderWidth(), engine.getRenderHeight());
            }
            let renderWidth = <number>renderWidthOrEngine;
            return new Viewport(this.x * renderWidth, this.y * renderHeight, this.width * renderWidth, this.height * renderHeight);
        }
        /**
         * Returns a new Viewport copied from the current one.
         */
        public clone(): Viewport {
            return new Viewport(this.x, this.y, this.width, this.height);
        }
    }

    export class Frustum {
        /**
         * Returns a new array of 6 Frustum planes computed by the given transformation matrix.
         */
        public static GetPlanes(transform: Matrix): Plane[] {
            var frustumPlanes = [];
            for (var index = 0; index < 6; index++) {
                frustumPlanes.push(new Plane(0.0, 0.0, 0.0, 0.0));
            }
            Frustum.GetPlanesToRef(transform, frustumPlanes);
            return frustumPlanes;
        }

        public static GetNearPlaneToRef(transform: Matrix, frustumPlane: Plane): void {
            frustumPlane.normal.x = transform.m[3] + transform.m[2];
            frustumPlane.normal.y = transform.m[7] + transform.m[6];
            frustumPlane.normal.z = transform.m[11] + transform.m[10];
            frustumPlane.d = transform.m[15] + transform.m[14];
            frustumPlane.normalize();
        }

        public static GetFarPlaneToRef(transform: Matrix, frustumPlane: Plane): void {
            frustumPlane.normal.x = transform.m[3] - transform.m[2];
            frustumPlane.normal.y = transform.m[7] - transform.m[6];
            frustumPlane.normal.z = transform.m[11] - transform.m[10];
            frustumPlane.d = transform.m[15] - transform.m[14];
            frustumPlane.normalize();
        }

        public static GetLeftPlaneToRef(transform: Matrix, frustumPlane: Plane): void {
            frustumPlane.normal.x = transform.m[3] + transform.m[0];
            frustumPlane.normal.y = transform.m[7] + transform.m[4];
            frustumPlane.normal.z = transform.m[11] + transform.m[8];
            frustumPlane.d = transform.m[15] + transform.m[12];
            frustumPlane.normalize();
        }

        public static GetRightPlaneToRef(transform: Matrix, frustumPlane: Plane): void {
            frustumPlane.normal.x = transform.m[3] - transform.m[0];
            frustumPlane.normal.y = transform.m[7] - transform.m[4];
            frustumPlane.normal.z = transform.m[11] - transform.m[8];
            frustumPlane.d = transform.m[15] - transform.m[12];
            frustumPlane.normalize();
        }

        public static GetTopPlaneToRef(transform: Matrix, frustumPlane: Plane): void {
            frustumPlane.normal.x = transform.m[3] - transform.m[1];
            frustumPlane.normal.y = transform.m[7] - transform.m[5];
            frustumPlane.normal.z = transform.m[11] - transform.m[9];
            frustumPlane.d = transform.m[15] - transform.m[13];
            frustumPlane.normalize();
        }

        public static GetBottomPlaneToRef(transform: Matrix, frustumPlane: Plane): void {
            frustumPlane.normal.x = transform.m[3] + transform.m[1];
            frustumPlane.normal.y = transform.m[7] + transform.m[5];
            frustumPlane.normal.z = transform.m[11] + transform.m[9];
            frustumPlane.d = transform.m[15] + transform.m[13];
            frustumPlane.normalize();
        }

        /**
         * Sets the given array "frustumPlanes" with the 6 Frustum planes computed by the given transformation matrix.
         */
        public static GetPlanesToRef(transform: Matrix, frustumPlanes: Plane[]): void {
            // Near
            Frustum.GetNearPlaneToRef(transform, frustumPlanes[0]);

            // Far
            Frustum.GetFarPlaneToRef(transform, frustumPlanes[1]);

            // Left
            Frustum.GetLeftPlaneToRef(transform, frustumPlanes[2]);

            // Right
            Frustum.GetRightPlaneToRef(transform, frustumPlanes[3]);

            // Top
            Frustum.GetTopPlaneToRef(transform, frustumPlanes[4]);

            // Bottom
            Frustum.GetBottomPlaneToRef(transform, frustumPlanes[5]);
        }
    }

    /** Defines supported spaces */
    export enum Space {
        /** Local (object) space */
        LOCAL = 0,
        /** World space */
        WORLD = 1,
        /** Bone space */
        BONE = 2
    }

    /** Defines the 3 main axes */
    export class Axis {
        /** X axis */
        public static X: Vector3 = new Vector3(1.0, 0.0, 0.0);
        /** Y axis */
        public static Y: Vector3 = new Vector3(0.0, 1.0, 0.0);
        /** Z axis */
        public static Z: Vector3 = new Vector3(0.0, 0.0, 1.0);
    };

    export class BezierCurve {
        /**
         * Returns the cubic Bezier interpolated value (float) at "t" (float) from the given x1, y1, x2, y2 floats.
         */
        public static interpolate(t: number, x1: number, y1: number, x2: number, y2: number): number {

            // Extract X (which is equal to time here)
            var f0 = 1 - 3 * x2 + 3 * x1;
            var f1 = 3 * x2 - 6 * x1;
            var f2 = 3 * x1;

            var refinedT = t;
            for (var i = 0; i < 5; i++) {
                var refinedT2 = refinedT * refinedT;
                var refinedT3 = refinedT2 * refinedT;

                var x = f0 * refinedT3 + f1 * refinedT2 + f2 * refinedT;
                var slope = 1.0 / (3.0 * f0 * refinedT2 + 2.0 * f1 * refinedT + f2);
                refinedT -= (x - t) * slope;
                refinedT = Math.min(1, Math.max(0, refinedT));

            }

            // Resolve cubic bezier for the given x
            return 3 * Math.pow(1 - refinedT, 2) * refinedT * y1 +
                3 * (1 - refinedT) * Math.pow(refinedT, 2) * y2 +
                Math.pow(refinedT, 3);
        }
    }

    /**
     * Defines potential orientation for back face culling
     */
    export enum Orientation {
        /**
         * Clockwise
         */
        CW = 0,
        /** Counter clockwise */
        CCW = 1
    }

    /**
     * Defines angle representation
     */
    export class Angle {
        private _radians: number;

        /**
         * Creates an Angle object of "radians" radians (float).
         */
        constructor(radians: number) {
            this._radians = radians;
            if (this._radians < 0.0) this._radians += (2.0 * Math.PI);
        }

        /**
         * Get value in degrees
         * @returns the Angle value in degrees (float)
         */
        public degrees() {
            return this._radians * 180.0 / Math.PI;
        }

        /**
         * Get value in radians
         * @returns the Angle value in radians (float)
         */
        public radians() {
            return this._radians;
        }

        /**
         * Gets a new Angle object valued with the angle value in radians between the two given vectors
         * @param a defines first vector
         * @param b defines second vector
         * @returns a new Angle
         */
        public static BetweenTwoPoints(a: Vector2, b: Vector2): Angle {
            var delta = b.subtract(a);
            var theta = Math.atan2(delta.y, delta.x);
            return new Angle(theta);
        }

        /**
         * Gets a new Angle object from the given float in radians
         * @param radians defines the angle value in radians
         * @returns a new Angle
         */
        public static FromRadians(radians: number): Angle {
            return new Angle(radians);
        }
        /**
         * Gets a new Angle object from the given float in degrees
         * @param degrees defines the angle value in degrees
         * @returns a new Angle
         */
        public static FromDegrees(degrees: number): Angle {
            return new Angle(degrees * Math.PI / 180.0);
        }
    }

    export class Arc2 {
        centerPoint: Vector2;
        radius: number;
        angle: Angle;
        startAngle: Angle;
        orientation: Orientation;

        /**
         * Creates an Arc object from the three given points : start, middle and end.
         */
        constructor(public startPoint: Vector2, public midPoint: Vector2, public endPoint: Vector2) {

            var temp = Math.pow(midPoint.x, 2) + Math.pow(midPoint.y, 2);
            var startToMid = (Math.pow(startPoint.x, 2) + Math.pow(startPoint.y, 2) - temp) / 2.;
            var midToEnd = (temp - Math.pow(endPoint.x, 2) - Math.pow(endPoint.y, 2)) / 2.;
            var det = (startPoint.x - midPoint.x) * (midPoint.y - endPoint.y) - (midPoint.x - endPoint.x) * (startPoint.y - midPoint.y);

            this.centerPoint = new Vector2(
                (startToMid * (midPoint.y - endPoint.y) - midToEnd * (startPoint.y - midPoint.y)) / det,
                ((startPoint.x - midPoint.x) * midToEnd - (midPoint.x - endPoint.x) * startToMid) / det
            );

            this.radius = this.centerPoint.subtract(this.startPoint).length();

            this.startAngle = Angle.BetweenTwoPoints(this.centerPoint, this.startPoint);

            var a1 = this.startAngle.degrees();
            var a2 = Angle.BetweenTwoPoints(this.centerPoint, this.midPoint).degrees();
            var a3 = Angle.BetweenTwoPoints(this.centerPoint, this.endPoint).degrees();

            // angles correction
            if (a2 - a1 > +180.0) a2 -= 360.0;
            if (a2 - a1 < -180.0) a2 += 360.0;
            if (a3 - a2 > +180.0) a3 -= 360.0;
            if (a3 - a2 < -180.0) a3 += 360.0;

            this.orientation = (a2 - a1) < 0 ? Orientation.CW : Orientation.CCW;
            this.angle = Angle.FromDegrees(this.orientation === Orientation.CW ? a1 - a3 : a3 - a1);
        }
    }

    export class Path2 {
        private _points = new Array<Vector2>();
        private _length = 0.0;

        public closed = false;

        /**
         * Creates a Path2 object from the starting 2D coordinates x and y.
         */
        constructor(x: number, y: number) {
            this._points.push(new Vector2(x, y));
        }

        /**
         * Adds a new segment until the given coordinates (x, y) to the current Path2.
         * Returns the updated Path2.
         */
        public addLineTo(x: number, y: number): Path2 {
            if (this.closed) {
                return this;
            }
            var newPoint = new Vector2(x, y);
            var previousPoint = this._points[this._points.length - 1];
            this._points.push(newPoint);
            this._length += newPoint.subtract(previousPoint).length();
            return this;
        }

        /**
         * Adds _numberOfSegments_ segments according to the arc definition (middle point coordinates, end point coordinates, the arc start point being the current Path2 last point) to the current Path2.
         * Returns the updated Path2.
         */
        public addArcTo(midX: number, midY: number, endX: number, endY: number, numberOfSegments = 36): Path2 {
            if (this.closed) {
                return this;
            }
            var startPoint = this._points[this._points.length - 1];
            var midPoint = new Vector2(midX, midY);
            var endPoint = new Vector2(endX, endY);

            var arc = new Arc2(startPoint, midPoint, endPoint);

            var increment = arc.angle.radians() / numberOfSegments;
            if (arc.orientation === Orientation.CW) increment *= -1;
            var currentAngle = arc.startAngle.radians() + increment;

            for (var i = 0; i < numberOfSegments; i++) {
                var x = Math.cos(currentAngle) * arc.radius + arc.centerPoint.x;
                var y = Math.sin(currentAngle) * arc.radius + arc.centerPoint.y;
                this.addLineTo(x, y);
                currentAngle += increment;
            }
            return this;
        }
        /**
         * Closes the Path2.
         * Returns the Path2.
         */
        public close(): Path2 {
            this.closed = true;
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
         * Returns the Path2 internal array of points.
         */
        public getPoints(): Vector2[] {
            return this._points;
        }

        /**
         * Returns a new Vector2 located at a percentage of the Path2 total length on this path.
         */
        public getPointAtLengthPosition(normalizedLengthPosition: number): Vector2 {
            if (normalizedLengthPosition < 0 || normalizedLengthPosition > 1) {
                return Vector2.Zero();
            }

            var lengthPosition = normalizedLengthPosition * this.length();

            var previousOffset = 0;
            for (var i = 0; i < this._points.length; i++) {
                var j = (i + 1) % this._points.length;

                var a = this._points[i];
                var b = this._points[j];
                var bToA = b.subtract(a);

                var nextOffset = (bToA.length() + previousOffset);
                if (lengthPosition >= previousOffset && lengthPosition <= nextOffset) {
                    var dir = bToA.normalize();
                    var localOffset = lengthPosition - previousOffset;

                    return new Vector2(
                        a.x + (dir.x * localOffset),
                        a.y + (dir.y * localOffset)
                    );
                }
                previousOffset = nextOffset;
            }

            return Vector2.Zero();
        }

        /**
         * Returns a new Path2 starting at the coordinates (x, y).
         */
        public static StartingAt(x: number, y: number): Path2 {
            return new Path2(x, y);
        }
    }

    export class Path3D {
        private _curve = new Array<Vector3>();
        private _distances = new Array<number>();
        private _tangents = new Array<Vector3>();
        private _normals = new Array<Vector3>();
        private _binormals = new Array<Vector3>();
        private _raw: boolean;

        /**
        * new Path3D(path, normal, raw)
        * Creates a Path3D. A Path3D is a logical math object, so not a mesh.
        * please read the description in the tutorial :  http://doc.babylonjs.com/tutorials/How_to_use_Path3D
        * path : an array of Vector3, the curve axis of the Path3D
        * normal (optional) : Vector3, the first wanted normal to the curve. Ex (0, 1, 0) for a vertical normal.
        * raw (optional, default false) : boolean, if true the returned Path3D isn't normalized. Useful to depict path acceleration or speed.
        */
        constructor(public path: Vector3[], firstNormal: Nullable<Vector3> = null, raw?: boolean) {
            for (var p = 0; p < path.length; p++) {
                this._curve[p] = path[p].clone(); // hard copy
            }
            this._raw = raw || false;
            this._compute(firstNormal);
        }

        /**
         * Returns the Path3D array of successive Vector3 designing its curve.
         */
        public getCurve(): Vector3[] {
            return this._curve;
        }

        /**
         * Returns an array populated with tangent vectors on each Path3D curve point.
         */
        public getTangents(): Vector3[] {
            return this._tangents;
        }


        /**
         * Returns an array populated with normal vectors on each Path3D curve point.
         */
        public getNormals(): Vector3[] {
            return this._normals;
        }


        /**
         * Returns an array populated with binormal vectors on each Path3D curve point.
         */
        public getBinormals(): Vector3[] {
            return this._binormals;
        }


        /**
         * Returns an array populated with distances (float) of the i-th point from the first curve point.
         */
        public getDistances(): number[] {
            return this._distances;
        }


        /**
         * Forces the Path3D tangent, normal, binormal and distance recomputation.
         * Returns the same object updated.
         */
        public update(path: Vector3[], firstNormal: Nullable<Vector3> = null): Path3D {
            for (var p = 0; p < path.length; p++) {
                this._curve[p].x = path[p].x;
                this._curve[p].y = path[p].y;
                this._curve[p].z = path[p].z;
            }
            this._compute(firstNormal);
            return this;
        }

        // private function compute() : computes tangents, normals and binormals
        private _compute(firstNormal: Nullable<Vector3>): void {
            var l = this._curve.length;

            // first and last tangents
            this._tangents[0] = this._getFirstNonNullVector(0);
            if (!this._raw) {
                this._tangents[0].normalize();
            }
            this._tangents[l - 1] = this._curve[l - 1].subtract(this._curve[l - 2]);
            if (!this._raw) {
                this._tangents[l - 1].normalize();
            }

            // normals and binormals at first point : arbitrary vector with _normalVector()
            var tg0 = this._tangents[0];
            var pp0 = this._normalVector(this._curve[0], tg0, firstNormal);
            this._normals[0] = pp0;
            if (!this._raw) {
                this._normals[0].normalize();
            }
            this._binormals[0] = Vector3.Cross(tg0, this._normals[0]);
            if (!this._raw) {
                this._binormals[0].normalize();
            }
            this._distances[0] = 0.0;

            // normals and binormals : next points
            var prev: Vector3;        // previous vector (segment)
            var cur: Vector3;         // current vector (segment)
            var curTang: Vector3;     // current tangent
            // previous normal
            var prevBinor: Vector3;   // previous binormal

            for (var i = 1; i < l; i++) {
                // tangents
                prev = this._getLastNonNullVector(i);
                if (i < l - 1) {
                    cur = this._getFirstNonNullVector(i);
                    this._tangents[i] = prev.add(cur);
                    this._tangents[i].normalize();
                }
                this._distances[i] = this._distances[i - 1] + prev.length();

                // normals and binormals
                // http://www.cs.cmu.edu/afs/andrew/scs/cs/15-462/web/old/asst2camera.html
                curTang = this._tangents[i];
                prevBinor = this._binormals[i - 1];
                this._normals[i] = Vector3.Cross(prevBinor, curTang);
                if (!this._raw) {
                    this._normals[i].normalize();
                }
                this._binormals[i] = Vector3.Cross(curTang, this._normals[i]);
                if (!this._raw) {
                    this._binormals[i].normalize();
                }
            }
        }

        // private function getFirstNonNullVector(index)
        // returns the first non null vector from index : curve[index + N].subtract(curve[index])
        private _getFirstNonNullVector(index: number): Vector3 {
            var i = 1;
            var nNVector: Vector3 = this._curve[index + i].subtract(this._curve[index]);
            while (nNVector.length() === 0 && index + i + 1 < this._curve.length) {
                i++;
                nNVector = this._curve[index + i].subtract(this._curve[index]);
            }
            return nNVector;
        }

        // private function getLastNonNullVector(index)
        // returns the last non null vector from index : curve[index].subtract(curve[index - N])
        private _getLastNonNullVector(index: number): Vector3 {
            var i = 1;
            var nLVector: Vector3 = this._curve[index].subtract(this._curve[index - i]);
            while (nLVector.length() === 0 && index > i + 1) {
                i++;
                nLVector = this._curve[index].subtract(this._curve[index - i]);
            }
            return nLVector;
        }

        // private function normalVector(v0, vt, va) :
        // returns an arbitrary point in the plane defined by the point v0 and the vector vt orthogonal to this plane
        // if va is passed, it returns the va projection on the plane orthogonal to vt at the point v0
        private _normalVector(v0: Vector3, vt: Vector3, va: Nullable<Vector3>): Vector3 {
            var normal0: Vector3;
            var tgl = vt.length();
            if (tgl === 0.0) {
                tgl = 1.0;
            }

            if (va === undefined || va === null) {
                var point: Vector3;
                if (!Scalar.WithinEpsilon(Math.abs(vt.y) / tgl, 1.0, Epsilon)) {     // search for a point in the plane
                    point = new Vector3(0.0, -1.0, 0.0);
                }
                else if (!Scalar.WithinEpsilon(Math.abs(vt.x) / tgl, 1.0, Epsilon)) {
                    point = new Vector3(1.0, 0.0, 0.0);
                }
                else if (!Scalar.WithinEpsilon(Math.abs(vt.z) / tgl, 1.0, Epsilon)) {
                    point = new Vector3(0.0, 0.0, 1.0);
                }
                else {
                    point = Vector3.Zero();
                }
                normal0 = Vector3.Cross(vt, point);
            }
            else {
                normal0 = Vector3.Cross(vt, va);
                Vector3.CrossToRef(normal0, vt, normal0);
            }
            normal0.normalize();
            return normal0;
        }
    }

    export class Curve3 {
        private _points: Vector3[];
        private _length: number = 0.0;

        /**
         * Returns a Curve3 object along a Quadratic Bezier curve : http://doc.babylonjs.com/tutorials/How_to_use_Curve3#quadratic-bezier-curve
         * @param v0 (Vector3) the origin point of the Quadratic Bezier
         * @param v1 (Vector3) the control point
         * @param v2 (Vector3) the end point of the Quadratic Bezier
         * @param nbPoints (integer) the wanted number of points in the curve
         */
        public static CreateQuadraticBezier(v0: Vector3, v1: Vector3, v2: Vector3, nbPoints: number): Curve3 {
            nbPoints = nbPoints > 2 ? nbPoints : 3;
            var bez = new Array<Vector3>();
            var equation = (t: number, val0: number, val1: number, val2: number) => {
                var res = (1.0 - t) * (1.0 - t) * val0 + 2.0 * t * (1.0 - t) * val1 + t * t * val2;
                return res;
            }
            for (var i = 0; i <= nbPoints; i++) {
                bez.push(new Vector3(equation(i / nbPoints, v0.x, v1.x, v2.x), equation(i / nbPoints, v0.y, v1.y, v2.y), equation(i / nbPoints, v0.z, v1.z, v2.z)));
            }
            return new Curve3(bez);
        }

        /**
         * Returns a Curve3 object along a Cubic Bezier curve : http://doc.babylonjs.com/tutorials/How_to_use_Curve3#cubic-bezier-curve
         * @param v0 (Vector3) the origin point of the Cubic Bezier
         * @param v1 (Vector3) the first control point
         * @param v2 (Vector3) the second control point
         * @param v3 (Vector3) the end point of the Cubic Bezier
         * @param nbPoints (integer) the wanted number of points in the curve
         */
        public static CreateCubicBezier(v0: Vector3, v1: Vector3, v2: Vector3, v3: Vector3, nbPoints: number): Curve3 {
            nbPoints = nbPoints > 3 ? nbPoints : 4;
            var bez = new Array<Vector3>();
            var equation = (t: number, val0: number, val1: number, val2: number, val3: number) => {
                var res = (1.0 - t) * (1.0 - t) * (1.0 - t) * val0 + 3.0 * t * (1.0 - t) * (1.0 - t) * val1 + 3.0 * t * t * (1.0 - t) * val2 + t * t * t * val3;
                return res;
            }
            for (var i = 0; i <= nbPoints; i++) {
                bez.push(new Vector3(equation(i / nbPoints, v0.x, v1.x, v2.x, v3.x), equation(i / nbPoints, v0.y, v1.y, v2.y, v3.y), equation(i / nbPoints, v0.z, v1.z, v2.z, v3.z)));
            }
            return new Curve3(bez);
        }

        /**
         * Returns a Curve3 object along a Hermite Spline curve : http://doc.babylonjs.com/tutorials/How_to_use_Curve3#hermite-spline
         * @param p1 (Vector3) the origin point of the Hermite Spline
         * @param t1 (Vector3) the tangent vector at the origin point
         * @param p2 (Vector3) the end point of the Hermite Spline
         * @param t2 (Vector3) the tangent vector at the end point
         * @param nbPoints (integer) the wanted number of points in the curve
         */
        public static CreateHermiteSpline(p1: Vector3, t1: Vector3, p2: Vector3, t2: Vector3, nbPoints: number): Curve3 {
            var hermite = new Array<Vector3>();
            var step = 1.0 / nbPoints;
            for (var i = 0; i <= nbPoints; i++) {
                hermite.push(Vector3.Hermite(p1, t1, p2, t2, i * step));
            }
            return new Curve3(hermite);
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

        /**
         * A Curve3 object is a logical object, so not a mesh, to handle curves in the 3D geometric space.
         * A Curve3 is designed from a series of successive Vector3.
         * Tuto : http://doc.babylonjs.com/tutorials/How_to_use_Curve3#curve3-object
         */
        constructor(points: Vector3[]) {
            this._points = points;
            this._length = this._computeLength(points);
        }

        /**
         * Returns the Curve3 stored array of successive Vector3
         */
        public getPoints() {
            return this._points;
        }

        /**
         * Returns the computed length (float) of the curve.
         */
        public length() {
            return this._length;
        }

        /**
         * Returns a new instance of Curve3 object : var curve = curveA.continue(curveB);
         * This new Curve3 is built by translating and sticking the curveB at the end of the curveA.
         * curveA and curveB keep unchanged.
         */
        public continue(curve: Curve3): Curve3 {
            var lastPoint = this._points[this._points.length - 1];
            var continuedPoints = this._points.slice();
            var curvePoints = curve.getPoints();
            for (var i = 1; i < curvePoints.length; i++) {
                continuedPoints.push(curvePoints[i].subtract(curvePoints[0]).add(lastPoint));
            }
            var continuedCurve = new Curve3(continuedPoints);
            return continuedCurve;
        }

        private _computeLength(path: Vector3[]): number {
            var l = 0;
            for (var i = 1; i < path.length; i++) {
                l += (path[i].subtract(path[i - 1])).length();
            }
            return l;
        }
    }

    // Vertex formats
    export class PositionNormalVertex {
        constructor(public position: Vector3 = Vector3.Zero(), public normal: Vector3 = Vector3.Up()) {

        }

        public clone(): PositionNormalVertex {
            return new PositionNormalVertex(this.position.clone(), this.normal.clone());
        }
    }

    export class PositionNormalTextureVertex {
        constructor(public position: Vector3 = Vector3.Zero(), public normal: Vector3 = Vector3.Up(), public uv: Vector2 = Vector2.Zero()) {

        }

        public clone(): PositionNormalTextureVertex {
            return new PositionNormalTextureVertex(this.position.clone(), this.normal.clone(), this.uv.clone());
        }
    }

    // Temporary pre-allocated objects for engine internal use
    // usage in any internal function :
    // var tmp = Tmp.Vector3[0];   <= gets access to the first pre-created Vector3
    // There's a Tmp array per object type : int, float, Vector2, Vector3, Vector4, Quaternion, Matrix
    export class Tmp {
        public static Color3: Color3[] = [Color3.Black(), Color3.Black(), Color3.Black()];
        public static Color4: Color4[] = [new Color4(0, 0, 0, 0), new Color4(0, 0, 0, 0)];
        public static Vector2: Vector2[] = [Vector2.Zero(), Vector2.Zero(), Vector2.Zero()];  // 3 temp Vector2 at once should be enough
        public static Vector3: Vector3[] = [Vector3.Zero(), Vector3.Zero(), Vector3.Zero(),
        Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero()];    // 9 temp Vector3 at once should be enough
        public static Vector4: Vector4[] = [Vector4.Zero(), Vector4.Zero(), Vector4.Zero()];  // 3 temp Vector4 at once should be enough
        public static Quaternion: Quaternion[] = [Quaternion.Zero(), Quaternion.Zero()];                // 2 temp Quaternion at once should be enough
        public static Matrix: Matrix[] = [Matrix.Zero(), Matrix.Zero(),
        Matrix.Zero(), Matrix.Zero(),
        Matrix.Zero(), Matrix.Zero(),
        Matrix.Zero(), Matrix.Zero()];                      // 6 temp Matrices at once should be enough
    }
    // Same as Tmp but not exported to keep it only for math functions to avoid conflicts
    class MathTmp {
        public static Vector3: Vector3[] = [Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero()];
        public static Matrix: Matrix[] = [Matrix.Zero(), Matrix.Zero()];
        public static Quaternion: Quaternion[] = [Quaternion.Zero(), Quaternion.Zero(), Quaternion.Zero()];
    }
}
