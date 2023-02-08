/**
 * original
 *   https://gist.github.com/kawanet/5553478
 *   カタカナをひらがなに変換する JavaScript 関数、 ひらがなをカタカナに変換する JavaScript 関数 
 *   
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 */
TransformAndTest_HiraToKataKana = function( validatorAction, currentValue, originalValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return true;
    };
    return currentValue.replace(
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
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 */
TransformAndTest_KataToHiraKana = function( validatorAction, currentValue, originalValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return true;
    };
    return currentValue.replace(
        /[\u30a1-\u30f6]/g,
        function( match ){
            var chr = match.charCodeAt( 0 ) - 0x60;
            return m_String_fromCharCode( chr );
        }
    );
};