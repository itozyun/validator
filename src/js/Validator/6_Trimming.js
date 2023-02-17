/**
 * 文字列の前後の空白文字を削除する
 * 
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 */
TransformAndTest_Trimming = function( validatorAction, currentValue, stringValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return true;
    };

    var str = m_isString( currentValue ) ? currentValue : stringValue;

    if( str ){
        return str.trim();
    };
    return currentValue;
};