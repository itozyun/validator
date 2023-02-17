# バリデーター

JavaScript minifier での minify にフォーカスしたコンパクトなバリデーターです。

フォーム部品から受け取った value について、検証、エラーメッセージ、正規化した値を返します。

~~~js
validator.isValid(formValue); // true or false
validator.getErrorMessage(formValue); // 
validator.getNormalizedValue(formValue);
~~~

## インスタンス化

`StringValidator`, `NumberValidator`, `DateValidator` 各クラスをインスタンス化して個別のバリデーションに使用します。

引数には、ノーマライズ関数の配列、ポジティブルール配列、オプションでネガティブルール配列を与えます。

~~~js
var validator = new StringValidator(
    [
        StringValidatorHanToZen,
        StringValidatorKataToHira
    ],
    [
        { gte : 1, lte : 256 }   , '文字列は1文字以上256文字未満です'
    ]
);
var validator = new StringValidator(
    null,
    [
        /**
         * https://github.com/jquense/yup/blob/5b94eb135581e93b0f02d842885f9f97e8010bb2/src/string.ts#L20
         */
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, '有効なEmailではありません'
    ],
    [
        /(@gmail.com|@yahoo.com)/, 'メールサービス #{$1} は非対応です'
    ]
);
~~~
### 引数

| name             | required | data type                                       | deacription                                                                                                 |
|:-----------------|:---------|:------------------------------------------------|:------------------------------------------------------------------------------------------------------------|
| `normalizerList` | ✔       | `Normaizer` の配列 または `null`                |                                                                                                             |
| `positiveRules`  | ✔       | `RangeObject\|RegExp\|Array` と `string` の配列 | RegExp は `regExp.exec(currentValue) != null` で valid. Array は `0<=array.indexOf(currentValue)` で valid. |
| `negativeRules`  |          | `RegExp\|Array` と `string` の配列              | 上記の場合 invalid. RegExp では続くエラー文字列に `#{$1}` ... `#{$n}` を含めると `match` に置き換えます。   |

* 最初にノーマライズが行われます。ノーマライズリストの最初から順番に実施します。
* ルール配列は、最初のものからテストされます。`positiveRules` ⇒ `negativeRules` の順でテストされます。
* `string` は直前のルール(`RegExp`, `RangeObject`(文字列の最大長や数値や日付けの範囲を指定する), `Array`(入力可能な値のリスト))に不一致の場合のエラーメッセージ。必ずルールからはじまる。

## `Normalizer` 関数

currentValue(`string|number|Date`)と、stringValue(現在までのノーマライズされた文字列)から、ノーマライズした値を返します。

~~~js
function( currentValue, stringValue ){
    return currentValue;
};
~~~

## 組み込みの `Normalizer` 関数

組み込み済の関数には次があります。

1. 全角英数字と半角英数字の相互変換
   * Normalizer_HalfToFull, Normalizer_FullToHalf
2. 半角カナと全角カナの相互変換
   * Normalizer_HanToZen, Normalizer_ZenToHan
3. 全角ひらがなと全角カタカナの相互変換
   * Normalizer_HiraToKataKana, Normalizer_KataToHiraKana
4. 前後の空白文字の削除
   * Normalizer_Trimming
5. 漢数字を数字にする、これには大字(`零壱弐参伍拾`)を含む
   * Normalizer_KansuujiToSuuji
6. 数字だけを残す
   * Normalizer_ToNumberString, Normalizer_ToIntegerString, Normalizer_ToUINTString (Integer, UINT は `.` を外して巨大な整数を作る点に注意！)
7. 整数化(`Math.trunc` です)
   * Normalizer_Trunc


## `RangeObject` タイプ

`gt`, `gte`, `lt`, `lte` を1つ以上メンバーに持つオブジェクト。

`StringValidator` の引数の場合、文字列の長さ。`NumberValidator` の引数の場合、数値。`DateValidator` の引数の場合、`Date`。
