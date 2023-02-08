/**
 * original
 *   https://minory.org/js-full-half-width.html
 *   半角カナを全角カナに変換
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 */
TransformAndTest_HanToZen = function( validatorAction, currentValue, originalValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return true;
    };
    var str = m_isString( currentValue ) ?  currentValue : m_isString( originalValue ) ? originalValue : '';

    if( str ){
        for( var i = 0, l = HANKAKU_KANA_LIST.length; i < l; ++i ){
            str = str.split( HANKAKU_KANA_LIST[ i ] ).join( ZENKAKU_KANA_LIST[ i ] );
        };
        return str;
    };
    return currentValue;
};

/**
 * original
 *   https://minory.org/js-full-half-width.html
 *   全角カナを半角カナに変換
 * @param {number} validatorAction 
 * @param {string|number|!Date} currentValue 
 * @param {string} originalValue 
 */
TransformAndTest_ZenToHan = function( validatorAction, currentValue, originalValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return true;
    };
    var str = m_isString( currentValue ) ?  currentValue : m_isString( originalValue ) ? originalValue : '';

    if( str ){
        for( var i = 0, l = ZENKAKU_KANA_LIST.length; i < l; ++i ){
            str = str.split( ZENKAKU_KANA_LIST[ i ] ).join( HANKAKU_KANA_LIST[ i ] );
        };
        return str;
    };
    return currentValue;
};

var HANKAKU_KANA_LIST = ['ｧ','ｨ','ｩ','ｪ','ｫ','ｬ','ｭ','ｮ','ｯ','ｰ','ｳﾞ','ｶﾞ','ｷﾞ','ｸﾞ','ｹﾞ','ｺﾞ','ｻﾞ','ｼﾞ','ｽﾞ','ｾﾞ','ｿﾞ','ﾀﾞ','ﾁﾞ','ﾂﾞ','ﾃﾞ','ﾄﾞ','ﾊﾞ','ﾋﾞ','ﾌﾞ','ﾍﾞ','ﾎﾞ','ﾊﾟ','ﾋﾟ','ﾌﾟ','ﾍﾟ','ﾎﾟ','ｱ','ｲ','ｳ','ｴ','ｵ','ｶ','ｷ','ｸ','ｹ','ｺ','ｻ','ｼ','ｽ','ｾ','ｿ','ﾀ','ﾁ','ﾂ','ﾃ','ﾄ','ﾅ','ﾆ','ﾇ','ﾈ','ﾉ','ﾊ','ﾋ','ﾌ','ﾍ','ﾎ','ﾏ','ﾐ','ﾑ','ﾒ','ﾓ','ﾔ','ﾕ','ﾖ','ﾗ','ﾘ','ﾙ','ﾚ','ﾛ','ﾜ','ｦ','ﾝ' ];
var ZENKAKU_KANA_LIST = ['ァ','ィ','ゥ','ェ','ォ','ャ','ュ','ョ','ッ','ー','ヴ','ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ','ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン' ];
