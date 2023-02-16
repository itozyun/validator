/*=============================================================================
 * 1. Class Definitions
 */

/**
 * @constructor
 * @param {Array.<!TransformAndTest|!RegExp|!RangeDefinitions|!Array|string>} transformAndTests
 */
StringValidator = function( transformAndTests ){
    this._castBy = String;
    this._transformAndTests = transformAndTests;
};
StringValidator.prototype.isValid             = ValidatorBase_isValid;
StringValidator.prototype.getErrorMessage     = ValidatorBase_getErrorMessage;
StringValidator.prototype.getTransformedValue = ValidatorBase_getTransformedValue;

/**
 * @constructor
 * @param {Array.<!TransformAndTest|!RegExp|!RangeDefinitions|!Array|string>} transformAndTests
 */
NumberValidator = function( transformAndTests ){
    this._castBy = Number;
    this._transformAndTests = transformAndTests;
};
NumberValidator.prototype.isValid             = ValidatorBase_isValid;
NumberValidator.prototype.getErrorMessage     = ValidatorBase_getErrorMessage;
NumberValidator.prototype.getTransformedValue = ValidatorBase_getTransformedValue;

/**
 * @constructor
 * @param {Array.<!TransformAndTest|!RegExp|!RangeDefinitions|!Array|string>} transformAndTests
 */
DateValidator = function( transformAndTests ){
    this._castBy = Date;
    this._transformAndTests = transformAndTests;
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
    var currentValue = /** @type {string|number|!Date} */ (this._castBy( originalValue )),
        transformAndTests = this._transformAndTests;

    for( var i = 0, l = transformAndTests.length, transformAndTest; i < l; i += 2 ){
        transformAndTest = /** @type {!TransformAndTest|!RegExp|!RangeDefinitions|!Array} */ (transformAndTests[ i ]);
        if( !_isValid( transformAndTest, currentValue, originalValue ) ){
            return false;
        };
        currentValue = _getTransformedValue( transformAndTest, currentValue, originalValue );
        if( !m_isString( transformAndTests[ i + 1 ] ) ){
            --i;
        };
    };
    return true;
};

/**
 * @param {string} originalValue 
 * @return {string}
 */
function ValidatorBase_getErrorMessage( originalValue ){
    var currentValue = /** @type {string|number|!Date} */ (this._castBy( originalValue )),
        transformAndTests = this._transformAndTests;

    for( var i = 0, l = transformAndTests.length, transformAndTest, maybeErrorMessage, isErrorMessage, found; i < l; i += 2 ){
        transformAndTest  = /** @type {!TransformAndTest|!RegExp|!RangeDefinitions|!Array} */ (transformAndTests[ i ]);
        maybeErrorMessage = /** @type {!TransformAndTest|!RegExp|!RangeDefinitions|!Array|string|undefined} */ (transformAndTests[ i + 1 ]);
        isErrorMessage    = m_isString( maybeErrorMessage );
        if( !_isValid( transformAndTest, currentValue, originalValue ) ){
            if( isErrorMessage ){
                maybeErrorMessage = /** @type {string} */ (maybeErrorMessage);
                if( m_isRegExp( transformAndTest ) ){
                    found = ( '' + currentValue ).match( transformAndTest );
                    for( i = 0, l = found.length; i < l; ++i ){
                        maybeErrorMessage = maybeErrorMessage.split( '#{$' + ( i + 1 ) + '}' ).join( found[ i ] );
                    };
                };
                return maybeErrorMessage;
            };
            if( DEFINE_VALIDATOR__UNKNOWN_ERROR_MESSAGE ){
                return DEFINE_VALIDATOR__UNKNOWN_ERROR_MESSAGE;
            };
        };
        currentValue = _getTransformedValue( transformAndTest, currentValue, originalValue );
        if( !isErrorMessage ){
            --i;
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
    var currentValue = /** @type {string|number|!Date} */ (this._castBy( originalValue )),
        transformAndTests = this._transformAndTests;

    for( var i = 0, l = transformAndTests.length, transformAndTest; i < l; i += 2 ){
        transformAndTest = /** @type {!TransformAndTest|!RegExp|!RangeDefinitions|!Array} */ (transformAndTests[ i ]);
        if( !_isValid( transformAndTest, currentValue, originalValue ) ){
            return;
        };
        currentValue = _getTransformedValue( transformAndTest, currentValue, originalValue );
        if( !m_isString( transformAndTests[ i + 1 ] ) ){
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

/*=============================================================================
 * 4. private
 */

/**
 * @private
 * @param {!TransformAndTest|!RegExp|!RangeDefinitions|!Array} transformAndTest 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 * @return {boolean}
 */
function _isValid( transformAndTest, currentValue, originalValue ){
    if( m_isRegExp( transformAndTest ) ){
        return ( '' + currentValue ).match( /** @type {RegExp} */ (transformAndTest) );
    } else if( m_isArray( transformAndTest ) ){
        return 0 <= /** @type {Array} */ (transformAndTest).indexOf( currentValue );
    } else if( typeof transformAndTest === 'object' ){
        if( m_isString( currentValue ) ){
            currentValue = /** @type {string} */ (currentValue);
            transformAndTest = /** @type {{gt:(number|undefined), gte:(number|undefined), lt:(number|undefined), lte:(number|undefined)}} */ (transformAndTest);
            return !( currentValue.length <= transformAndTest.gt || currentValue.length < transformAndTest.gte || transformAndTest.lt <= currentValue.length || transformAndTest.lte < currentValue.length );
        } else if( m_isNumber( currentValue ) ){
            currentValue = /** @type {number} */ (currentValue);
            transformAndTest = /** @type {{gt:(number|undefined), gte:(number|undefined), lt:(number|undefined), lte:(number|undefined)}} */ (transformAndTest);
            return !( currentValue <= transformAndTest.gt || currentValue < transformAndTest.gte || transformAndTest.lt <= currentValue || transformAndTest.lte < currentValue );
        } else if( m_isDate( currentValue ) ){
            currentValue = /** @type {Date} */ (currentValue);
            transformAndTest = /** @type {{gt:(Date|undefined), gte:(Date|undefined), lt:(Date|undefined), lte:(Date|undefined)}} */ (transformAndTest);
            return !( currentValue <= transformAndTest.gt || currentValue < transformAndTest.gte || transformAndTest.lt <= currentValue || transformAndTest.lte < currentValue );
        };
        if( DEFINE_VALIDATOR__DEBUG ){
            // error
        };
    };
    return !!/** @type {!TransformAndTest} */ (transformAndTest)( VALIDATOR_ACTION.TEST, currentValue, originalValue );
};

/**
 * @private
 * @param {!TransformAndTest|!RegExp|!RangeDefinitions|!Array} transformAndTest 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 * @return {string|number|!Date}
 */
function _getTransformedValue( transformAndTest, currentValue, originalValue ){
    if( typeof transformAndTest === 'function' ){
        return transformAndTest( VALIDATOR_ACTION.TRANSFORM, currentValue, originalValue );
    };
    return currentValue;
};