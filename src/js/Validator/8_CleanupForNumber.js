/**
 * 数字だけを残す. 先頭の - と最初の . も残す
 * 
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 */
TransformAndTest_cleanupForNumber = function( validatorAction, currentValue, stringValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return true;
    };

    var str = m_isString( currentValue ) ?  currentValue : stringValue;
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
        if( currentValue === '-' || currentValue === '.' ){
            currentValue = '';
        };
    };
    return currentValue;
};

/**
 * 0~9だけを残す
 * 
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 */
TransformAndTest_cleanupForUINT = function( validatorAction, currentValue, stringValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return true;
    };

    var str = m_isString( currentValue ) ?  currentValue : stringValue;
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
    return currentValue;
};