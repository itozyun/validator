/**
 * 漢数字を数字にする
 * 
 * @param {string|number|!Date} currentValue 
 * @param {string} stringValue 
 * @return {string|number|!Date}
 */
Normalizer_KansuujiToSuuji = function( currentValue, stringValue ){
    var str = m_isString( currentValue ) ?  currentValue : stringValue;
    var DAIJI_LIST = '零壱弐参四伍六七八九拾'.split( '' );
    var KANSUUJI_LIST = '〇一二三四五六七八九十'.split( '' );

    if( str ){
        for( var i = 0, l = DAIJI_LIST.length; i < l; ++i ){
            str = str.split( DAIJI_LIST[ i ] ).join( i );
        };
        for( i = 0, l = KANSUUJI_LIST.length; i < l; ++i ){
            str = str.split( KANSUUJI_LIST[ i ] ).join( i );
        };
        return str;
    };
    return currentValue;
};