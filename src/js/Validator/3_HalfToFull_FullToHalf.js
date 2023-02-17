/**
 * original
 *   https://minory.org/js-full-half-width.html
 *   半角数字を全角数字に変換
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 */
TransformAndTest_HalfToFull = function( validatorAction, currentValue, stringValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return true;
    };
    var str = m_isString( currentValue ) ?  currentValue : stringValue;

    if( str ){
        return str.replace(
            /[A-Za-z0-9!-~]/g,
            function( s ){
                return m_String_fromCharCode( s.charCodeAt( 0 ) + 0xFEE0 );
            }
        );
    };
    return currentValue;
};

/**
 * original
 *   https://minory.org/js-full-half-width.html
 *   全角英数字を半角英数字に変換
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 */
TransformAndTest_FullToHalf = function( validatorAction, currentValue, stringValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return true;
    };
    var str = m_isString( currentValue ) ?  currentValue : stringValue;

    if( str ){
        return str.replace(
            /[Ａ-Ｚａ-ｚ０-９！-～]/g,
            function(s){
                return m_String_fromCharCode( s.charCodeAt( 0 ) - 0xFEE0 );
            }
        );
    };
    return currentValue;
};