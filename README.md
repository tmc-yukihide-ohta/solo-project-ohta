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

# 使用テクノロジー

Express
PostgreSQL
Knex
React

# アプリ説明

買物リストを作成し買い忘れを支援するアプリです。

#　使い方

1. 商品入力欄に、商品名を記入し「追加」ボタンで買い物リストに追加
2. お店で商品をカートに入れた際に、商品名をクリックすることで取消線が入る
3. お店で支払いが完了したら、「買ったよー」ボタンを押して、買い物リストから除外
4. 不要になった商品は、「削除」ボタンを押す

# 直面した課題

・配列を map で react 上に書いて、ボタンに関連するデータを参照する方法を探すのに苦労した
　　解決策：
{itemList.map((item) => (

<div className="list-row" key={item.timestamp}>
{/_ <button>修正</button> _/}
<button onClick={() => onClickDeleteItem(item.timestamp)}>
削除
</button>
　・ローカルで正常に動いていたのに、render 上では動作しなかった。
　　　解決策：

# 学び

・react の基本的な動きの理解
　・スプレッド構文：配列やオブジェクトの要素を展開する構文
　　https://qiita.com/akisx/items/682a4283c13fe336c547
　　 useState の値をセットするのに役に立った
　・分割代入：オブジェクトの値の書き方を簡略化できる
　　例：const test = {aaa:あああ, bbb:いいい}　
　　　　 const {aaa, bbb} = test
　　実例
　　 export const BuyList = (props) => {
　 const {
　 itemList,
　 handleItemTextClick,
　 onClickPurchasedItems,
　 onClickDeleteItem,
　} = props;
この後、props を書かなくても
ok

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
