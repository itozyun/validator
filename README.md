# バリデーター

JavaScript minifier での minify にフォーカスしたコンパクトなバリデーターです。

フォーム部品から受け取った value について、検証、エラーメッセージ、正規化した値を返します。

~~~js
validator.isValid(formValue); // true or false
validator.getErrorMessage(formValue); // 
validator.getTransformedValue(formValue);
~~~

## イニシャライズ

`StringValidator`, `NumberValidator`, `DateValidator` 各クラスをインスタンス化して個別のバリデーションに使用します。

~~~js
var validator = new StringValidator(
    [
        StringValidatorHanToZen  , '', // '', は省略できます
        StringValidatorKataToHira, '', // '', は省略できます
        { gte : 1, lte : 256 }   , '文字列は1文字以上256文字未満です'
    ]
);
var validator = new StringValidator(
    [
        /**
         * https://github.com/jquense/yup/blob/5b94eb135581e93b0f02d842885f9f97e8010bb2/src/string.ts#L20
         */
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, '有効なEmailではありません',
        /[@gmail.com|@yahoo.com]/, '#{$1}は非対応です'
    ]
);
~~~

引数には `TransformAndTest` 関数、`RegExp`, `Object` (文字列の最大長や数値や日付けの範囲を指定する), `Array`（入力可能な値のリスト）と invalid な場合のエラーメッセージを交互に指定します。

エラーメッセージは省略出来ます。invalid にならない `TransformAndTest` 関数では積極的に省略します。

各ルールは、最初のものから適用されます。

## VALIDATOR_ACTION

## `TransformAndTest` 関数

第一引数は VALIDATOR_ACTION を示す数値です。TEST, TRANSFORM があります。

TEST の場合は、currentValue または、トランスフォームした originalValue を検証します。全角文字の入力を全て半角に直したいだけの関数でしたら、常に `true` を返して構いません。この場合にだけ続くエラー文字列を省略できます。

TRANSFORM の場合は、currentValue または originalValue を変換して返します。

~~~js
function( validatorAction, currentValue, originalValue ){
    if( validatorAction === VALIDATOR_ACTION.TEST ){
        return 0 <= currentValue
    };
    return currentValue;
};
~~~

## 組み込みの `TransformAndTest` 関数

組み込み済の関数には次があります。

1. 全角英数字と半角英数字の相互変換
   * TransformAndTest_HalfToFull, TransformAndTest_FullToHalf
2. 半角カナと全角カナの相互変換
   * TransformAndTest_HanToZen, TransformAndTest_ZenToHan
3. 全角ひらがなと全角カタカナの相互変換
   * TransformAndTest_HiraToKataKana, TransformAndTest_KataToHiraKana
4. 漢数字を数字にする、これには大字(`零壱弐参伍拾`)を含む
   * TransformAndTest_KansuujiToSuuji
5. 数字だけを残す
   * TransformAndTest_cleanupForNumber, TransformAndTest_cleanupForUINT
6. 正数と負数
   * TransformAndTest_PositiveNumber, TransformAndTest_NegativeNumber
7. 整数化(Math.trunc です)
   * TransformAndTest_Integer

## エラー文字列

`RegExp` に続く文字列に `#{$1}` ... `#{$n}` を含めると match に置き換えます。

また `*Validator` クラスの引数を正しく設定した上で `DEFINE_VALIDATOR__UNKNOWN_ERROR_MESSAGE` を空文字列にしておくと、minify 済のコードがほんの少し短くなります。