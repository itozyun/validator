# バリデーター

minify を重視する

値の変形（トランスフォーム）　大文字⇔小文字, カナ⇔かな, 半角⇔全角, 漢数字⇒数字
値のバリデーション　エラーメッセージ
キャスト?

~~~js
validator.isValid(formValue) // true or false
validator.getErrorMessage(formValue) // 
validator.getTransformedValue(formValue)
validator.isTransformed(formValue)
~~~

~~~js
var validator = new StringValidator(
    StringValidatorHanToZen, '',
    StringValidatorKataToHira, '',
    { textMin : 1, textMax : 256 }, '文字列は1文字以上256文字未満です'
);
var validator = new StringValidator(
    EMailValidator, '有効なEmailではありません',
    /@gmail.|@yahoo.co.jp/, 'そのドメインは非対応です'
)
~~~
