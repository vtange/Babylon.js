var BABYLON;
(function (BABYLON) {
    /**
     * Class representing spherical polynomial coefficients to the 3rd degree
     */
    var SphericalPolynomial = /** @class */ (function () {
        function SphericalPolynomial() {
            /**
             * The x coefficients of the spherical polynomial
             */
            this.x = BABYLON.Vector3.Zero();
            /**
             * The y coefficients of the spherical polynomial
             */
            this.y = BABYLON.Vector3.Zero();
            /**
             * The z coefficients of the spherical polynomial
             */
            this.z = BABYLON.Vector3.Zero();
            /**
             * The xx coefficients of the spherical polynomial
             */
            this.xx = BABYLON.Vector3.Zero();
            /**
             * The yy coefficients of the spherical polynomial
             */
            this.yy = BABYLON.Vector3.Zero();
            /**
             * The zz coefficients of the spherical polynomial
             */
            this.zz = BABYLON.Vector3.Zero();
            /**
             * The xy coefficients of the spherical polynomial
             */
            this.xy = BABYLON.Vector3.Zero();
            /**
             * The yz coefficients of the spherical polynomial
             */
            this.yz = BABYLON.Vector3.Zero();
            /**
             * The zx coefficients of the spherical polynomial
             */
            this.zx = BABYLON.Vector3.Zero();
        }
        /**
         * Adds an ambient color to the spherical polynomial
         * @param color the color to add
         */
        SphericalPolynomial.prototype.addAmbient = function (color) {
            var colorVector = new BABYLON.Vector3(color.r, color.g, color.b);
            this.xx = this.xx.add(colorVector);
            this.yy = this.yy.add(colorVector);
            this.zz = this.zz.add(colorVector);
        };
        /**
         * Scales the spherical polynomial by the given amount
         * @param scale the amount to scale
         */
        SphericalPolynomial.prototype.scale = function (scale) {
            this.x = this.x.scale(scale);
            this.y = this.y.scale(scale);
            this.z = this.z.scale(scale);
            this.xx = this.xx.scale(scale);
            this.yy = this.yy.scale(scale);
            this.zz = this.zz.scale(scale);
            this.yz = this.yz.scale(scale);
            this.zx = this.zx.scale(scale);
            this.xy = this.xy.scale(scale);
        };
        /**
         * Gets the spherical polynomial from harmonics
         * @param harmonics the spherical harmonics
         * @returns the spherical polynomial
         */
        SphericalPolynomial.FromHarmonics = function (harmonics) {
            var result = new SphericalPolynomial();
            result.x = harmonics.l11.scale(1.02333);
            result.y = harmonics.l1_1.scale(1.02333);
            result.z = harmonics.l10.scale(1.02333);
            result.xx = harmonics.l00.scale(0.886277).subtract(harmonics.l20.scale(0.247708)).add(harmonics.lL22.scale(0.429043));
            result.yy = harmonics.l00.scale(0.886277).subtract(harmonics.l20.scale(0.247708)).subtract(harmonics.lL22.scale(0.429043));
            result.zz = harmonics.l00.scale(0.886277).add(harmonics.l20.scale(0.495417));
            result.yz = harmonics.l2_1.scale(0.858086);
            result.zx = harmonics.l21.scale(0.858086);
            result.xy = harmonics.l2_2.scale(0.858086);
            result.scale(1.0 / Math.PI);
            return result;
        };
        /**
         * Constructs a spherical polynomial from an array.
         * @param data defines the 9x3 coefficients (x, y, z, xx, yy, zz, yz, zx, xy)
         * @returns the spherical polynomial
         */
        SphericalPolynomial.FromArray = function (data) {
            var sp = new SphericalPolynomial();
            BABYLON.Vector3.FromArrayToRef(data[0], 0, sp.x);
            BABYLON.Vector3.FromArrayToRef(data[1], 0, sp.y);
            BABYLON.Vector3.FromArrayToRef(data[2], 0, sp.z);
            BABYLON.Vector3.FromArrayToRef(data[3], 0, sp.xx);
            BABYLON.Vector3.FromArrayToRef(data[4], 0, sp.yy);
            BABYLON.Vector3.FromArrayToRef(data[5], 0, sp.zz);
            BABYLON.Vector3.FromArrayToRef(data[6], 0, sp.yz);
            BABYLON.Vector3.FromArrayToRef(data[7], 0, sp.zx);
            BABYLON.Vector3.FromArrayToRef(data[8], 0, sp.xy);
            return sp;
        };
        return SphericalPolynomial;
    }());
    BABYLON.SphericalPolynomial = SphericalPolynomial;
    /**
     * Class representing spherical harmonics coefficients to the 3rd degree
     */
    var SphericalHarmonics = /** @class */ (function () {
        function SphericalHarmonics() {
            /**
             * The l0,0 coefficients of the spherical harmonics
             */
            this.l00 = BABYLON.Vector3.Zero();
            /**
             * The l1,-1 coefficients of the spherical harmonics
             */
            this.l1_1 = BABYLON.Vector3.Zero();
            /**
             * The l1,0 coefficients of the spherical harmonics
             */
            this.l10 = BABYLON.Vector3.Zero();
            /**
             * The l1,1 coefficients of the spherical harmonics
             */
            this.l11 = BABYLON.Vector3.Zero();
            /**
             * The l2,-2 coefficients of the spherical harmonics
             */
            this.l2_2 = BABYLON.Vector3.Zero();
            /**
             * The l2,-1 coefficients of the spherical harmonics
             */
            this.l2_1 = BABYLON.Vector3.Zero();
            /**
             * The l2,0 coefficients of the spherical harmonics
             */
            this.l20 = BABYLON.Vector3.Zero();
            /**
             * The l2,1 coefficients of the spherical harmonics
             */
            this.l21 = BABYLON.Vector3.Zero();
            /**
             * The l2,2 coefficients of the spherical harmonics
             */
            this.lL22 = BABYLON.Vector3.Zero();
        }
        /**
         * Adds a light to the spherical harmonics
         * @param direction the direction of the light
         * @param color the color of the light
         * @param deltaSolidAngle the delta solid angle of the light
         */
        SphericalHarmonics.prototype.addLight = function (direction, color, deltaSolidAngle) {
            var colorVector = new BABYLON.Vector3(color.r, color.g, color.b);
            var c = colorVector.scale(deltaSolidAngle);
            this.l00 = this.l00.add(c.scale(0.282095));
            this.l1_1 = this.l1_1.add(c.scale(0.488603 * direction.y));
            this.l10 = this.l10.add(c.scale(0.488603 * direction.z));
            this.l11 = this.l11.add(c.scale(0.488603 * direction.x));
            this.l2_2 = this.l2_2.add(c.scale(1.092548 * direction.x * direction.y));
            this.l2_1 = this.l2_1.add(c.scale(1.092548 * direction.y * direction.z));
            this.l21 = this.l21.add(c.scale(1.092548 * direction.x * direction.z));
            this.l20 = this.l20.add(c.scale(0.315392 * (3.0 * direction.z * direction.z - 1.0)));
            this.lL22 = this.lL22.add(c.scale(0.546274 * (direction.x * direction.x - direction.y * direction.y)));
        };
        /**
         * Scales the spherical harmonics by the given amount
         * @param scale the amount to scale
         */
        SphericalHarmonics.prototype.scale = function (scale) {
            this.l00 = this.l00.scale(scale);
            this.l1_1 = this.l1_1.scale(scale);
            this.l10 = this.l10.scale(scale);
            this.l11 = this.l11.scale(scale);
            this.l2_2 = this.l2_2.scale(scale);
            this.l2_1 = this.l2_1.scale(scale);
            this.l20 = this.l20.scale(scale);
            this.l21 = this.l21.scale(scale);
            this.lL22 = this.lL22.scale(scale);
        };
        /**
         * Convert from incident radiance (Li) to irradiance (E) by applying convolution with the cosine-weighted hemisphere.
         *
         * ```
         * E_lm = A_l * L_lm
         * ```
         *
         * In spherical harmonics this convolution amounts to scaling factors for each frequency band.
         * This corresponds to equation 5 in "An Efficient Representation for Irradiance Environment Maps", where
         * the scaling factors are given in equation 9.
         */
        SphericalHarmonics.prototype.convertIncidentRadianceToIrradiance = function () {
            // Constant (Band 0)
            this.l00 = this.l00.scale(3.141593);
            // Linear (Band 1)
            this.l1_1 = this.l1_1.scale(2.094395);
            this.l10 = this.l10.scale(2.094395);
            this.l11 = this.l11.scale(2.094395);
            // Quadratic (Band 2)
            this.l2_2 = this.l2_2.scale(0.785398);
            this.l2_1 = this.l2_1.scale(0.785398);
            this.l20 = this.l20.scale(0.785398);
            this.l21 = this.l21.scale(0.785398);
            this.lL22 = this.lL22.scale(0.785398);
        };
        /**
         * Convert from irradiance to outgoing radiance for Lambertian BDRF, suitable for efficient shader evaluation.
         *
         * ```
         * L = (1/pi) * E * rho
         * ```
         *
         * This is done by an additional scale by 1/pi, so is a fairly trivial operation but important conceptually.
         */
        SphericalHarmonics.prototype.convertIrradianceToLambertianRadiance = function () {
            this.scale(1.0 / Math.PI);
            // The resultant SH now represents outgoing radiance, so includes the Lambert 1/pi normalisation factor but without albedo (rho) applied
            // (The pixel shader must apply albedo after texture fetches, etc).
        };
        /**
         * Gets the spherical harmonics from polynomial
         * @param polynomial the spherical polynomial
         * @returns the spherical harmonics
         */
        SphericalHarmonics.FromPolynomial = function (polynomial) {
            var result = new SphericalHarmonics();
            result.l00 = polynomial.xx.scale(0.376127).add(polynomial.yy.scale(0.376127)).add(polynomial.zz.scale(0.376126));
            result.l1_1 = polynomial.y.scale(0.977204);
            result.l10 = polynomial.z.scale(0.977204);
            result.l11 = polynomial.x.scale(0.977204);
            result.l2_2 = polynomial.xy.scale(1.16538);
            result.l2_1 = polynomial.yz.scale(1.16538);
            result.l20 = polynomial.zz.scale(1.34567).subtract(polynomial.xx.scale(0.672834)).subtract(polynomial.yy.scale(0.672834));
            result.l21 = polynomial.zx.scale(1.16538);
            result.lL22 = polynomial.xx.scale(1.16538).subtract(polynomial.yy.scale(1.16538));
            result.scale(Math.PI);
            return result;
        };
        /**
         * Constructs a spherical harmonics from an array.
         * @param data defines the 9x3 coefficients (l00, l1-1, l10, l11, l2-2, l2-1, l20, l21, l22)
         * @returns the spherical harmonics
         */
        SphericalHarmonics.FromArray = function (data) {
            var sh = new SphericalHarmonics();
            BABYLON.Vector3.FromArrayToRef(data[0], 0, sh.l00);
            BABYLON.Vector3.FromArrayToRef(data[1], 0, sh.l1_1);
            BABYLON.Vector3.FromArrayToRef(data[2], 0, sh.l10);
            BABYLON.Vector3.FromArrayToRef(data[3], 0, sh.l11);
            BABYLON.Vector3.FromArrayToRef(data[4], 0, sh.l2_2);
            BABYLON.Vector3.FromArrayToRef(data[5], 0, sh.l2_1);
            BABYLON.Vector3.FromArrayToRef(data[6], 0, sh.l20);
            BABYLON.Vector3.FromArrayToRef(data[7], 0, sh.l21);
            BABYLON.Vector3.FromArrayToRef(data[8], 0, sh.lL22);
            return sh;
        };
        return SphericalHarmonics;
    }());
    BABYLON.SphericalHarmonics = SphericalHarmonics;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.sphericalPolynomial.js.map
