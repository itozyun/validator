/**
 * 数字だけを残す. 先頭の - と最初の . も残す
 * 
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 */
TransformAndTest_cleanupForNumber = function( validatorAction, currentValue, originalValue ){
    var str = m_isString( currentValue ) ?  currentValue : m_isString( originalValue ) ? originalValue : '';
    var NUMBER_CHARS = '.0123456789';

    if( str ){
        currentValue = '';
        for( var i = 0, l = str.length, chr; i < l; ++i ){
            chr = str.charAt( i );
            if( i === 0 && chr === '-' ){
                currentValue = '-';
            } else {
                if( NUMBER_CHARS.indexOf( chr ) !== -1 ){
                    currentValue += chr;
                    if( chr === '.' ){
                        NUMBER_CHARS = NUMBER_CHARS.substr( 1 );
                    };
                };
            };
        };
    };

    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return !!currentValue;
    };
    return currentValue;
};

/**
 * 0~9だけを残す
 * 
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 */
TransformAndTest_cleanupForUINT = function( validatorAction, currentValue, originalValue ){
    var str = m_isString( currentValue ) ?  currentValue : m_isString( originalValue ) ? originalValue : '';
    var NUMBER_CHARS = '0123456789';

    if( str ){
        currentValue = '';
        for( var i = 0, l = str.length, chr; i < l; ++i ){
            chr = str.charAt( i );
            if( NUMBER_CHARS.indexOf( chr ) !== -1 ){
                currentValue += chr;
            };
        };
    };

    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return !!currentValue;
    };
    return currentValue;
};