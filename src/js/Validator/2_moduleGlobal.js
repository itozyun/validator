/*=============================================================================
 * 1. Class Definitions
 */

/**
 * @constructor
 * @param {!Array.<!TransformAndTest|!RegExp|!RangeObject|!Array|string>} positiveRules
 * @param {!Array.<!RegExp|!Array|string>=} opt_negativeRules
 */
StringValidator = function( positiveRules, opt_negativeRules ){
    this._checkType     = m_isString;
    this._castBy        = String;
    this._positiveRules = positiveRules;
    this._negativeRules = opt_negativeRules;
};
StringValidator.prototype.isValid             = ValidatorBase_isValid;
StringValidator.prototype.getErrorMessage     = ValidatorBase_getErrorMessage;
StringValidator.prototype.getTransformedValue = ValidatorBase_getTransformedValue;

/**
 * @constructor
 * @param {!Array.<!TransformAndTest|!RegExp|!RangeObject|!Array|string>} positiveRules
 * @param {!Array.<!RegExp|!Array|string>=} opt_negativeRules
 */
NumberValidator = function( positiveRules, opt_negativeRules ){
    this._checkType     = m_isNumber;
    this._castBy        = m_toNumber;
    this._positiveRules = positiveRules;
    this._negativeRules = opt_negativeRules;
};
NumberValidator.prototype.isValid             = ValidatorBase_isValid;
NumberValidator.prototype.getErrorMessage     = ValidatorBase_getErrorMessage;
NumberValidator.prototype.getTransformedValue = ValidatorBase_getTransformedValue;

/**
 * @constructor
 * @param {!Array.<!TransformAndTest|!RegExp|!RangeObject|!Array|string>} positiveRules
 * @param {!Array.<!RegExp|!Array|string>=} opt_negativeRules
 */
DateValidator = function( positiveRules, opt_negativeRules ){
    this._checkType     = m_isDate;
    this._castBy        = Date;
    this._positiveRules = positiveRules;
    this._negativeRules = opt_negativeRules;
};
DateValidator.prototype.isValid             = ValidatorBase_isValid;
DateValidator.prototype.getErrorMessage     = ValidatorBase_getErrorMessage;
DateValidator.prototype.getTransformedValue = ValidatorBase_getTransformedValue;

/*=============================================================================
 * 2. Methods
 */

/**
 * @param {string} originalValue 
 * @return {boolean}
 */
function ValidatorBase_isValid( originalValue ){
    var stringValue  = originalValue,
        currentValue = /** @type {string|number|!Date} */ (this._castBy( stringValue )),
        positiveRules = this._positiveRules,
        negativeRules = this._negativeRules,
        i = 0, l = positiveRules.length, rule;

    for( ; i < l; i += 2 ){
        rule = /** @type {!TransformAndTest|!RegExp|!RangeObject|!Array} */ (positiveRules[ i ]);
        if( !_isValid( rule, currentValue, stringValue ) ){
            return false;
        };
        currentValue = _getTransformedValue( rule, currentValue, stringValue );
        if( !this._checkType( currentValue ) ){
            stringValue  = '' + currentValue;
            currentValue = this._castBy( currentValue );
        };
        if( !m_isString( positiveRules[ i + 1 ] ) ){
            --i;
        };
    };
    if( negativeRules ){
        for( i = 0, l = negativeRules.length; i < l; i += 2 ){
            rule = /** @type {!RegExp|!Array} */ (negativeRules[ i ]);
            if( _isValid( rule, currentValue, stringValue ) ){
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
    var stringValue  = originalValue,
        currentValue = /** @type {string|number|!Date} */ (this._castBy( stringValue )),
        positiveRules = this._positiveRules,
        negativeRules = this._negativeRules,
        i = 0, l = positiveRules.length, rule, maybeErrorMessage, isErrorMessage, errorMessage, found;

    for( ; i < l; i += 2 ){
        rule  = /** @type {!TransformAndTest|!RegExp|!RangeObject|!Array} */ (positiveRules[ i ]);
        maybeErrorMessage = /** @type {!TransformAndTest|!RegExp|!RangeObject|!Array|string|undefined} */ (positiveRules[ i + 1 ]);
        isErrorMessage    = m_isString( maybeErrorMessage );
        if( !_isValid( rule, currentValue, stringValue ) ){
            if( isErrorMessage ){
                maybeErrorMessage = /** @type {string} */ (maybeErrorMessage);
                return maybeErrorMessage;
            };
            if( DEFINE_VALIDATOR__UNKNOWN_ERROR_MESSAGE ){
                return DEFINE_VALIDATOR__UNKNOWN_ERROR_MESSAGE;
            };
        };
        currentValue = _getTransformedValue( rule, currentValue, stringValue );
        if( !this._checkType( currentValue ) ){
            stringValue  = '' + currentValue;
            currentValue = this._castBy( currentValue );
        };
        if( !isErrorMessage ){
            --i;
        };
    };
    if( negativeRules ){
        for( i = 0, l = negativeRules.length; i < l; i += 2 ){
            rule = /** @type {!RegExp|!Array} */ (negativeRules[ i ]);
            errorMessage = /** @type {string} */ (negativeRules[ i + 1 ]);
            if( _isValid( rule, currentValue, stringValue ) ){
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
function ValidatorBase_getTransformedValue( originalValue ){
    var stringValue  = originalValue,
        currentValue = /** @type {string|number|!Date} */ (this._castBy( stringValue )),
        positiveRules = this._positiveRules,
        i = 0, l = positiveRules.length, rule;

    for( ; i < l; i += 2 ){
        rule = /** @type {!TransformAndTest|!RegExp|!RangeObject|!Array} */ (positiveRules[ i ]);
        if( !_isValid( rule, currentValue, stringValue ) ){
            return;
        };
        currentValue = _getTransformedValue( rule, currentValue, stringValue );
        if( !this._checkType( currentValue ) ){
            stringValue  = '' + currentValue;
            currentValue = this._castBy( currentValue );
        };
        if( !m_isString( positiveRules[ i + 1 ] ) ){
            --i;
        };
    };
    return /** @type {string|number|!Date} */ (this._castBy( currentValue ));
};

/*=============================================================================
 * 3. module global
 */

function m_isString( str ){
    return str === '' + str;
};

function m_isArray( array ){
    return array.pop === [].pop;
};

function m_isRegExp( regexp ){
    return regexp.constructor === RegExp;
};

function m_isNumber( num ){
    return num - 0 === num;
};

function m_isDate( date ){
    return date.constructor === Date;
};

var m_String_fromCharCode = String.fromCharCode;

function m_toNumber( val ){
    // Number("") === 0, parseFloat("0a") === 0 なので、ダブルチェックで数値文字列かを判断する
    if( Number( val ) === parseFloat( val ) ){
        return val - 0;
    };
    return NaN;
};

/*=============================================================================
 * 4. private
 */

/**
 * @private
 * @param {!TransformAndTest|!RegExp|!RangeObject|!Array} rule 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 * @return {boolean}
 */
function _isValid( rule, currentValue, stringValue ){
    if( m_isRegExp( rule ) ){
        return !!( '' + currentValue ).match( /** @type {RegExp} */ (rule) );
    } else if( m_isArray( rule ) ){
        return 0 <= /** @type {Array} */ (rule).indexOf( currentValue );
    } else if( typeof rule === 'object' ){
        if( m_isString( currentValue ) ){
            currentValue = /** @type {string} */ (currentValue).length;
        };
        currentValue = /** @type {!Date|number} */ (currentValue);
        rule = /** @type {!RangeObject} */ (rule);
        return !( currentValue <= rule.gt || currentValue < rule.gte || rule.lt <= currentValue || rule.lte < currentValue );
    };
    return !!/** @type {!TransformAndTest} */ (rule)( VALIDATOR_ACTION.TEST, currentValue, stringValue );
};

/**
 * @private
 * @param {!TransformAndTest|!RegExp|!RangeObject|!Array} rule 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 * @return {string|number|!Date}
 */
function _getTransformedValue( rule, currentValue, stringValue ){
    if( typeof rule === 'function' ){
        return rule( VALIDATOR_ACTION.TRANSFORM, currentValue, stringValue );
    };
    return currentValue;
};