
/**
 * @constructor
 * @param {Array.<!TransformAndTest|!RegExp|!Object|!Array|string>} transformAndTests
 */
StringValidator = function( transformAndTests ){
    this._castBy = String;
    this._transformAndTests = transformAndTests;
};
StringValidator.prototype.isValid             = ValidatorBase_isValid;
StringValidator.prototype.getErrorMessage     = ValidatorBase_getErrorMessage;
StringValidator.prototype.getTransformedValue = ValidatorBase_getTransformedValue;
StringValidator.prototype.isTransformed       = ValidatorBase_isTransformed;

/**
 * @constructor
 * @param {Array.<!TransformAndTest|!RegExp|!Object|!Array|string>} transformAndTests
 */
NumberValidator = function( transformAndTests ){
    this._castBy = Number;
    this._transformAndTests = transformAndTests;
};
NumberValidator.prototype.isValid             = ValidatorBase_isValid;
NumberValidator.prototype.getErrorMessage     = ValidatorBase_getErrorMessage;
NumberValidator.prototype.getTransformedValue = ValidatorBase_getTransformedValue;
NumberValidator.prototype.isTransformed       = ValidatorBase_isTransformed;

/**
 * @constructor
 * @param {Array.<!TransformAndTest|!RegExp|!Object|!Array|string>} transformAndTests
 */
DateValidator = function( transformAndTests ){
    this._castBy = Date;
    this._transformAndTests = transformAndTests;
};
DateValidator.prototype.isValid             = ValidatorBase_isValid;
DateValidator.prototype.getErrorMessage     = ValidatorBase_getErrorMessage;
DateValidator.prototype.getTransformedValue = ValidatorBase_getTransformedValue;
DateValidator.prototype.isTransformed       = ValidatorBase_isTransformed;

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

/**
 * @private
 * @param {!TransformAndTest|!RegExp|!Object|!Array} transformAndTest 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 * @return {boolean}
 */
function _isValid( transformAndTest, currentValue, originalValue ){
    if( m_isRegExp( transformAndTest ) ){
        return ( '' + currentValue ).search( /** @type {RegExp} */ (transformAndTest) ) !== -1;
    } else if( m_isArray( transformAndTest ) ){
        return /** @type {Array} */ (transformAndTest).indexOf( currentValue ) !== -1;
    } else if( typeof transformAndTest === 'object' ){
        if( m_isString( currentValue ) ){
            currentValue = /** @type {string} */ (currentValue);
            transformAndTest = /** @type {{textMin:number, textMax:number}} */ (transformAndTest);
            return !( currentValue.length < transformAndTest.textMin || transformAndTest.textMax < currentValue.length );
        } else if( m_isNumber( currentValue ) ){
            currentValue = /** @type {number} */ (currentValue);
            transformAndTest = /** @type {{numMin:number, numMax:number}} */ (transformAndTest);
            return !( currentValue < transformAndTest.numMin || transformAndTest.numMax < currentValue );
        } else if( m_isDate( currentValue ) ){
            currentValue = /** @type {Date} */ (currentValue);
            transformAndTest = /** @type {{dateMin:number, dateMax:number}} */ (transformAndTest);
            return !( currentValue < new Date( transformAndTest.dateMin ) || new Date( transformAndTest.dateMax ) < currentValue );
        };
        if( DEFINE_VALIDATOR__DEBUG ){
            // error
        };
    };
    return !!/** @type {!TransformAndTest} */ (transformAndTest)( VALIDATOR_ACTION.TEST, currentValue, originalValue );
};

/**
 * @private
 * @param {!TransformAndTest|!RegExp|!Object|!Array} transformAndTest 
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

/**
 * @param {string} originalValue 
 * @return {boolean}
 */
function ValidatorBase_isValid( originalValue ){
    var currentValue = /** @type {string|number|!Date} */ (this._castBy( originalValue )),
        transformAndTests = this._transformAndTests;

    for( var i = 0, l = transformAndTests.length, transformAndTest; i < l; i += 2 ){
        transformAndTest = /** @type {!TransformAndTest|!RegExp|!Object|!Array} */ (transformAndTests[ i ]);
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

    for( var i = 0, l = transformAndTests.length, transformAndTest, isErrorMessage; i < l; i += 2 ){
        transformAndTest = /** @type {!TransformAndTest|!RegExp|!Object|!Array} */ (transformAndTests[ i ]);
        isErrorMessage = m_isString( transformAndTests[ i + 1 ] );
        if( !_isValid( transformAndTest, currentValue, originalValue ) ){
            return isErrorMessage ? transformAndTests[ i + 1 ] : VALIDATOR_DEFAULT_ERROR_MESSAGE;
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
        transformAndTest = /** @type {!TransformAndTest|!RegExp|!Object|!Array} */ (transformAndTests[ i ]);
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

/**
 * @param {string} originalValue 
 * @return {boolean}
 */
function ValidatorBase_isTransformed( originalValue ){
    return originalValue !== this.getTransformedValue( originalValue );
};