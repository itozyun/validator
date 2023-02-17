var StringValidator, NumberValidator, DateValidator;

/**
 * @typedef {!function(number, *, *):*}
 */
var TransformAndTest;

/**
 * @typedef {{
 *     gt  : (!Date|number|undefined),
 *     gte : (!Date|number|undefined),
 *     lt  : (!Date|number|undefined),
 *     lte : (!Date|number|undefined)
 * }}
 */
var RangeObject;

var TransformAndTest_HalfToFull, TransformAndTest_FullToHalf,
    TransformAndTest_HanToZen, TransformAndTest_ZenToHan,
    TransformAndTest_HiraToKataKana, TransformAndTest_KataToHiraKana,
    TransformAndTest_Trimming,
    TransformAndTest_KansuujiToSuuji,
    TransformAndTest_ToNumberString, TransformAndTest_ToIntegerString, TransformAndTest_ToUINTString,
    TransformAndTest_Trunc;