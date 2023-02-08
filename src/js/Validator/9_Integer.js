/**
 * 
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 */
TransformAndTest_Integer = function( validatorAction, currentValue, originalValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return true;
    };
    // https://ginpen.com/2011/12/07/rounding/
    //   実数を整数に丸める4パターン（JavaScript おれおれ Advent Calendar 2011 – 7日目）
    return 0 <= currentValue ? Math.floor( currentValue ) : - Math.floor( - currentValue ); // <= Math.trunc
};