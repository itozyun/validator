/**
 * original
 *   https://minory.org/js-full-half-width.html
 *   半角数字を全角数字に変換
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 */
TransformAndTest_HalfToFull = function( validatorAction, currentValue, originalValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return true;
    };
    var str = m_isString( currentValue ) ?  currentValue : m_isString( originalValue ) ? originalValue : '';

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
 * @param {string} originalValue 
 */
TransformAndTest_FullToHalf = function( validatorAction, currentValue, originalValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return true;
    };
    var str = m_isString( currentValue ) ?  currentValue : m_isString( originalValue ) ? originalValue : '';

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