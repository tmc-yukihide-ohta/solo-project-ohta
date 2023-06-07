import React from "react";

export const BuyList = (props) => {
  const { itemList, handleItemTextClick, onClickPurchasedItems } = props;
  return (
    <div className="shopping-area">
      <p className="title">
        🛒お買い物リスト{" "}
        <button onClick={onClickPurchasedItems}>買ったよ〜</button>
      </p>
      <div id="shopping-list">
        {itemList.map((item) => (
          <div className="list-row" key={item.timestamp}>
            <button>修正</button>
            <button>削除</button>
            <div
              className="item-text"
              // 1つ目の{はJSX内でJavaScriptの式を評価し、その結果を埋め込むために使用。2つ目の{は、JavaScriptのオブジェクトリテラルを作成している
              style={{
                textDecoration: item.isStriked ? "line-through" : "none",
              }}
              onClick={() => handleItemTextClick(item.timestamp)}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
