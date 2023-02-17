/*=============================================================================
 * 1. Class Definitions
 */

/**
 * @constructor
 * @param {Array.<!Normalizer>} normalizeList
 * @param {!Array.<!RegExp|!RangeObject|!Array|!ValidatorFunction|string>} positiveRules
 * @param {!Array.<!RegExp|!Array|string>=} opt_negativeRules
 */
StringValidator = function( normalizeList, positiveRules, opt_negativeRules ){
    this._checkType     = m_isString;
    this._castBy        = String;
    this._normalizeList = normalizeList;
    this._positiveRules = positiveRules;
    this._negativeRules = opt_negativeRules;
};
StringValidator.prototype.isValid            = ValidatorBase_isValid;
StringValidator.prototype.getErrorMessage    = ValidatorBase_getErrorMessage;
StringValidator.prototype.getNormalizedValue = ValidatorBase_getNormalizedValue;

/**
 * @constructor
 * @param {Array.<!Normalizer>} normalizeList
 * @param {!Array.<!RegExp|!RangeObject|!Array|!ValidatorFunction|string>} positiveRules
 * @param {!Array.<!RegExp|!Array|string>=} opt_negativeRules
 */
NumberValidator = function( normalizeList, positiveRules, opt_negativeRules ){
    this._checkType     = m_isNumber;
    this._castBy        = m_toNumber;
    this._normalizeList = normalizeList;
    this._positiveRules = positiveRules;
    this._negativeRules = opt_negativeRules;
};
NumberValidator.prototype.isValid            = ValidatorBase_isValid;
NumberValidator.prototype.getErrorMessage    = ValidatorBase_getErrorMessage;
NumberValidator.prototype.getNormalizedValue = ValidatorBase_getNormalizedValue;

/**
 * @constructor
 * @param {Array.<!Normalizer>} normalizeList
 * @param {!Array.<!RegExp|!RangeObject|!Array|!ValidatorFunction|string>} positiveRules
 * @param {!Array.<!RegExp|!Array|string>=} opt_negativeRules
 */
DateValidator = function( normalizeList, positiveRules, opt_negativeRules ){
    this._checkType     = m_isDate;
    this._castBy        = Date;
    this._normalizeList = normalizeList;
    this._positiveRules = positiveRules;
    this._negativeRules = opt_negativeRules;
};
DateValidator.prototype.isValid            = ValidatorBase_isValid;
DateValidator.prototype.getErrorMessage    = ValidatorBase_getErrorMessage;
DateValidator.prototype.getNormalizedValue = ValidatorBase_getNormalizedValue;

/*=============================================================================
 * 2. Methods
 */

/**
 * @param {string} originalValue 
 * @return {boolean}
 */
function ValidatorBase_isValid( originalValue ){
    var currentValue  = /** @type {string|number|!Date} */ (this.getNormalizedValue( originalValue )),
        positiveRules = this._positiveRules,
        negativeRules = this._negativeRules,
        i = 0, l = positiveRules.length, rule;

    for( i = 0, l = positiveRules.length; i < l; i += 2 ){
        rule = /** @type {!RegExp|!RangeObject|!Array|!ValidatorFunction} */ (positiveRules[ i ]);
        if( !_isValid( rule, currentValue ) ){
            return false;
        };
    };
    if( negativeRules ){
        for( i = 0, l = negativeRules.length; i < l; i += 2 ){
            rule = /** @type {!RegExp|!Array} */ (negativeRules[ i ]);
            if( _isValid( rule, currentValue ) ){
                return false;
            };
        };
    };
    return true;
};

/**
 * @param {string} originalValue 
 * @return {string}
 */
function ValidatorBase_getErrorMessage( originalValue ){
    var currentValue  = /** @type {string|number|!Date} */ (this.getNormalizedValue( originalValue )),
        positiveRules = this._positiveRules,
        negativeRules = this._negativeRules,
        i = 0, l = positiveRules.length, rule, errorMessage, found;

    for( ; i < l; i += 2 ){
        rule = /** @type {!RegExp|!RangeObject|!Array|!ValidatorFunction} */ (positiveRules[ i ]);
        errorMessage = /** @type {string} */ (positiveRules[ i + 1 ]);
        if( !_isValid( rule, currentValue ) ){
            return errorMessage;
        };
    };
    if( negativeRules ){
        for( i = 0, l = negativeRules.length; i < l; i += 2 ){
            rule = /** @type {!RegExp|!Array} */ (negativeRules[ i ]);
            errorMessage = /** @type {string} */ (negativeRules[ i + 1 ]);
            if( _isValid( rule, currentValue ) ){
                if( m_isRegExp( rule ) ){
                    found = ( '' + currentValue ).match( rule );
                    for( i = 0, l = found.length; i < l; ++i ){
                        errorMessage = errorMessage.split( '#{$' + ( i + 1 ) + '}' ).join( found[ i ] );
                    };
                };
                return errorMessage;
            };
        };
    };
    return '';
};

/**
 * undefined を返した場合、invalid です
 * @param {string} originalValue 
 * @return {string|number|!Date|undefined}
 */
function ValidatorBase_getNormalizedValue( originalValue ){
    var stringValue   = originalValue,
        currentValue  = /** @type {string|number|!Date} */ (this._castBy( stringValue )),
        normalizeList = this._normalizeList,
        i = 0, l, normalize;

    if( normalizeList ){
        for( l = normalizeList.length; i < l; ++i ){
            normalize = /** @type {!Normalizer} */ (normalizeList[ i ]);
            currentValue = normalize( currentValue, stringValue );
            if( !this._checkType( currentValue ) ){
                stringValue  = '' + currentValue;
                currentValue = this._castBy( currentValue );
            };
        };
    };
    return /** @type {string|number|!Date} */ (currentValue);
};

/*=============================================================================
 * 3. module global
 */

/**
 * @param {*} str 
 * @return {boolean}
 */
function m_isString( str ){
    return str === '' + str;
};

/**
 * @param {*} array 
 * @return {boolean}
 */
function m_isArray( array ){
    return array.pop === [].pop;
};

/**
 * @param {*} regexp 
 * @return {boolean}
 */
function m_isRegExp( regexp ){
    return regexp.constructor === RegExp;
};

/**
 * @param {*} num 
 * @return {boolean}
 */
function m_isNumber( num ){
    return /** @type {number} */ (num) - 0 === num;
};

/**
 * @param {*} date 
 * @return {boolean}
 */
function m_isDate( date ){
    return date.constructor === Date;
};

var m_String_fromCharCode = String.fromCharCode;

/**
 * @param {*} val 
 * @return {number}
 */
function m_toNumber( val ){
    // Number("") === 0, parseFloat("0a") === 0 なので、ダブルチェックで数値文字列かを判断する
    if( Number( val ) === parseFloat( val ) ){
        return /** @type {number} */ (val) - 0;
    };
    return NaN;
};

/*=============================================================================
 * 4. private
 */

/**
 * @private
 * @param {!RegExp|!RangeObject|!Array|!ValidatorFunction} rule 
 * @param {string|number|!Date} currentValue 
 * @return {boolean}
 */
function _isValid( rule, currentValue ){
    if( m_isRegExp( rule ) ){
        return !!( '' + currentValue ).match( /** @type {!RegExp} */ (rule) );
    } else if( m_isArray( rule ) ){
        return 0 <= /** @type {!Array} */ (rule).indexOf( currentValue );
    } else if( typeof rule === 'function' ){
        return /** @type {!ValidatorFunction} */ (rule)( currentValue );
    };
    // RangeObject ---
    if( m_isString( currentValue ) ){
        currentValue = /** @type {string} */ (currentValue).length;
    };
    currentValue = /** @type {!Date|number} */ (currentValue);
    rule = /** @type {!RangeObject} */ (rule);
    return !( currentValue <= rule.gt || currentValue < rule.gte || rule.lt <= currentValue || rule.lte < currentValue );
};
