/**
 * 数字だけを残す. 先頭の - と最初の . も残す
 * 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 * @return {string|number|!Date}
 */
Normalizer_ToNumberString = function( currentValue, stringValue ){
    var str = m_isString( currentValue ) ?  currentValue : stringValue;
    var NUMBER_CHARS = '.0123456789';

    if( str ){
        currentValue = '';
        for( var i = 0, l = str.length, chr; i < l; ++i ){
            chr = str.charAt( i );
            if( !currentValue && chr === '-' ){
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
        if( currentValue === '-' || currentValue === '.' || currentValue === '-.' ){
            currentValue = '';
        };
        if( currentValue.charAt( currentValue.length - 1 ) === '.' ){
            currentValue = currentValue.substr( 0, currentValue.length - 1 );
        };
    };
    return currentValue;
};

/**
 * 数字だけを残す. 先頭の - も残す. 1.414 => 1414 になる点に注意
 * 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 * @return {string|number|!Date}
 */
Normalizer_ToIntegerString = function( currentValue, stringValue ){
    var str = m_isString( currentValue ) ?  currentValue : stringValue;
    var NUMBER_CHARS = '0123456789';

    if( str ){
        currentValue = '';
        for( var i = 0, l = str.length, chr; i < l; ++i ){
            chr = str.charAt( i );
            if( !currentValue && chr === '-' ){
                currentValue = '-';
            } else {
                if( NUMBER_CHARS.indexOf( chr ) !== -1 ){
                    currentValue += chr;
                };
            };
        };
        if( currentValue === '-' ){
            currentValue = '';
        };
    };
    return currentValue;
};

/**
 * 0~9だけを残す. 1.414 => 1414 になる点に注意
 * 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 * @return {string|number|!Date}
 */
Normalizer_ToUINTString = function( currentValue, stringValue ){
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