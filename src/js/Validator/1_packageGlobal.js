var StringValidator, NumberValidator, DateValidator;

/**
 * @typedef {!function((string|number|!Date)):(boolean)}
 */
var ValidatorFunction;

/**
 * @typedef {{
 *     gt  : (!Date|number|undefined),
 *     gte : (!Date|number|undefined),
 *     lt  : (!Date|number|undefined),
 *     lte : (!Date|number|undefined)
 * }}
 */
var RangeObject;

/**
 * @typedef {!function((string|number|!Date), string):(string|number|!Date)}
 */
var Normalizer;

/** @type {!Normalizer|undefined} */
var Normalizer_HalfToFull;
/** @type {!Normalizer|undefined} */
var Normalizer_FullToHalf;
/** @type {!Normalizer|undefined} */
var Normalizer_HanKakuKanaToZen;
/** @type {!Normalizer|undefined} */
var Normalizer_ZenKakuKanaToHan;
/** @type {!Normalizer|undefined} */
var Normalizer_HiraToKataKana;
/** @type {!Normalizer|undefined} */
var Normalizer_KataToHiraKana;
/** @type {!Normalizer|undefined} */
var Normalizer_Trimming;
/** @type {!Normalizer|undefined} */
var Normalizer_KansuujiToSuuji;
/** @type {!Normalizer|undefined} */
var Normalizer_ToNumberString;
/** @type {!Normalizer|undefined} */
var Normalizer_ToIntegerString;
/** @type {!Normalizer|undefined} */
var Normalizer_ToUINTString;
/** @type {!Normalizer|undefined} */
var Normalizer_Trunc;