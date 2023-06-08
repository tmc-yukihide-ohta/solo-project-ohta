# スキーマ

# テーブル構成

purchase：購入予定と購入済みアイテムが格納される
　キー：id
　 html 内のキー：timestamp
　登録日：registration_date
　商品名：item_name
　個数：quantity
　単位：unit
　購入予定店舗：shop_candidate
　購入日：purchase_date
　取消線:strike_line

category:カテゴリの情報・・・未実装
キー：id
分類：category

categorization:カテゴリと商品の情報が格納される・・・未実装
キー：id
紐付けキー：category の id
商品名：items

shop：お店の名前・・・未実装
キー：id
店舗名：shop_name

precedence：店名と category の並び順が格納される・・・未実装
キー：id
紐付けキー：shop の id
並び順：route
