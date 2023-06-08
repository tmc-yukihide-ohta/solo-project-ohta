# solo-project-ohta

# 環境構築

1. GitHub からフォーク
2. クローンの実施・・・git clone <SSH>
3. VSC でクローンしたフォルダを開く
4. 各種モジュールのインストール・・・npm install
5. データベースの準備・・・echo "CREATE DATABASE cc_shopping_apps;" | psql
6. マイグレーション・・・npm run migrate
7. (任意)シード・・・npm run seed
8. サーバー起動・・・npm run server
9. react 起動・・・npm start

# アプリ説明

買物リストを作成し買い忘れを支援するアプリです。

#　使い方

1. 商品入力欄に、商品名を記入し「追加」ボタンで買い物リストに追加
2. お店で商品をカートに入れた際に、商品名をクリックすることで取消線が入る
3. お店で支払いが完了したら、「買ったよー」ボタンを押して、買い物リストから除外
4. 不要になった商品は、「削除」ボタンを押す
