/**
 * original
 *   https://gist.github.com/kawanet/5553478
 *   カタカナをひらがなに変換する JavaScript 関数、 ひらがなをカタカナに変換する JavaScript 関数 
 * 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 * @return {string|number|!Date}
 */
Normalizer_HiraToKataKana = function( currentValue, stringValue ){
    var str = m_isString( currentValue ) ? currentValue : stringValue;

    return str.replace(
        /[\u3041-\u3096]/g,
        function( match ){
            var chr = match.charCodeAt( 0 ) + 0x60;
            return m_String_fromCharCode( chr );
        }
    );
};

/**
 * original
 *   https://gist.github.com/kawanet/5553478
 *   カタカナをひらがなに変換する JavaScript 関数、 ひらがなをカタカナに変換する JavaScript 関数 
 * 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 * @return {string|number|!Date}
 */
Normalizer_KataToHiraKana = function( currentValue, stringValue ){
    var str = m_isString( currentValue ) ? currentValue : stringValue;

    return str.replace(
        /[\u30a1-\u30f6]/g,
        function( match ){
            var chr = match.charCodeAt( 0 ) - 0x60;
            return m_String_fromCharCode( chr );
        }
    );
};