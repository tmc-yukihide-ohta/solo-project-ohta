import React, { useState, useEffect } from "react";

import { InputItem } from "./components/InputItem";
import { BuyList } from "./components/BuyList";
import "./components/styles/styles.css";

export const App = () => {
  const [itemText, setItemText] = useState("");
  const [itemList, setItemList] = useState([
    // { timestamp: 1, content: "りんご", isStriked: false },
  ]);

  // 商品名の値を取得
  const onChangeItemText = (event) => {
    setItemText(event.target.value);
  };

  // キーとなるタイムスタンプを取得
  const getTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2); //末尾から2文字抽出
    const day = ("0" + now.getDate()).slice(-2);
    const hours = ("0" + now.getHours()).slice(-2);
    const minutes = ("0" + now.getMinutes()).slice(-2);
    const seconds = ("0" + now.getSeconds()).slice(-2);
    const timestamp = year + month + day + hours + minutes + seconds;
    return timestamp;
  };

  // 追加ボタンを押した時に、お買い物リストに追加
  const onClickAdd = () => {
    if (itemText === "") return;
    const timestamp = getTimestamp();
    const newItem = {
      timestamp: timestamp,
      content: itemText,
      isStriked: false,
    };
    postPurchaseItem(newItem);
    const newItems = [...itemList, newItem];

    setItemList(newItems);
    setItemText("");
  };

  // クリックしたら取り消し線のon/offをする関数
  const handleItemTextClick = (timestamp) => {
    setItemList((prevItems) =>
      prevItems.map(
        (item) =>
          item.timestamp === timestamp
            ? { ...item, isStriked: !item.isStriked }
            : item // ...itemでオブジェクトを複製してisStrikedの値を逆転したオブジェクトになる
      )
    );
    console.log("取消線が切り替わりました");
  };

  function isStrikedItemsList(isStriked) {
    const newItemList = [...itemList];
    let result = [];
    if (isStriked === true) {
      result = newItemList.filter((item) => {
        return item.isStriked === true;
      });
    } else {
      result = newItemList.filter((item) => {
        return item.isStriked === false;
      });
    }
    return result;
  }

  //購入ボタン実行時のアクション
  const onClickPurchasedItems = () => {
    console.log("購入されたよー");
    const purchasedItems = isStrikedItemsList(true);
    const unpurchasedItems = isStrikedItemsList(false);
    const body = purchasedItems;
    fetch(`${URL}/api/purchaseitems`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => getPurchaseItems());

    setItemList(unpurchasedItems);
  };

  const onClickDeleteItem = (item) => {
    console.log("削除するよー");
    const body = { timestamp: item };
    fetch(`${URL}/api/purchaseitems`, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      getPurchaseItems();
    });
  };
  // 開発環境とプロダクションでのURLの切り替え
  const URL =
    process.env.NODE_ENV === "production"
      ? "https://shopping-support-apps.onrender.com"
      : "http://localhost:8080";

  // purchaseテーブルの情報を取得してsetItemListにセット
  const getPurchaseItems = () => {
    fetch(`${URL}/api/purchaseitems`, { method: "GET" })
      .then((res) => res.json())
      .then((getData) => {
        const filterData = getData.filter((obj) => {
          return obj.purchaseDate === null;
        });
        setItemList(filterData);
        console.log("getで未購入リストを表示します");
      });
  };

  // 商品をDBに登録してpurchaseテーブルの情報を取得してsetItemListにセット
  const postPurchaseItem = (item) => {
    const body = {
      timestamp: item.timestamp,
      itemName: item.content,
      strikeLine: item.isStriked,
    };
    console.log("追加情報:", body);
    fetch(`${URL}/api/purchaseitems`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => getPurchaseItems());
  };

  useEffect(() => {
    console.log("----------useEffect 動作---------");
    getPurchaseItems();
  }, []);

  return (
    <div className="container">
      {console.log("----------App_return配下 読込み---------")}
      <InputItem
        itemText={itemText}
        setItemText={setItemText}
        onChangeItemText={onChangeItemText}
        onClickAdd={onClickAdd}
      />
      <BuyList
        itemList={itemList}
        handleItemTextClick={handleItemTextClick}
        onClickPurchasedItems={onClickPurchasedItems}
        onClickDeleteItem={onClickDeleteItem}
      />
    </div>
  );
};
