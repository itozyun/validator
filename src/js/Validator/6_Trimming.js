/**
 * 文字列の前後の空白文字を削除する
 * 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 * @return {string|number|!Date}
 */
Normalizer_Trimming = function( currentValue, stringValue ){
    var str = m_isString( currentValue ) ? currentValue : stringValue;

    if( str ){
        return str.trim();
    };
    return currentValue;
};