/**
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 */
TransformAndTest_PositiveNumber = function( validatorAction, currentValue, originalValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return 0 <= currentValue
    };
    return currentValue;
};

/**
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 */
TransformAndTest_NegativeNumber = function( validatorAction, currentValue, originalValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return currentValue <= 0;
    };
    return currentValue;
};