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
    console.log(timestamp);
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

  //購入ボタン実行時のアクション
  const onClickPurchasedItems = () => {
    console.log("購入されたよー");
    const newItemList = [...itemList];
    const purchasedItems = newItemList.filter((item) => {
      return item.isStriked === true;
    });
    patchPurchasedItems(purchasedItems);
    const unpurchasedItems = newItemList.filter((item) => {
      return item.isStriked === false;
    });
    setItemList(unpurchasedItems);
    console.log(purchasedItems);
    console.log(unpurchasedItems);
  };

  // 開発環境とプロダクションでのURLの切り替え
  const URL =
    process.env.NODE_ENV === "production"
      ? "https://shopping-support-apps.onrender.com"
      : "http://localhost:8080";

  // purchaseテーブルの情報を取得
  const getPurchaseItems = () => {
    fetch(`${URL}/api/purchaseitems`, { method: "GET" })
      .then((res) => res.json())
      .then((getData) => {
        const filterData = getData.filter((obj) => {
          return obj.purchaseDate === null;
        });
        setItemList(filterData);
      });
  };

  // purchaseテーブルの情報を取得してsetItemListにセット
  const postPurchaseItem = (item) => {
    const body = {
      timestamp: item.timestamp,
      itemName: item.content,
      strikeLine: item.isStriked,
    };
    console.log(body);
    fetch(`${URL}/api/purchaseitems`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => getPurchaseItems());
    // .then((res) => res.json())
    // .then((getData) => {
    //   console.log("getData:", getData);
    //   setItemList(getData);
    // });
    console.log("post受信:", itemList);
  };

  // purchaseテーブルの情報を取得してsetItemListにセット
  const patchPurchasedItems = (item) => {
    const body = {
      timestamp: item.timestamp,
      strikeLine: item.isStriked,
    };
    console.log(body);
    fetch(`${URL}/api/purchaseitems`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => getPurchaseItems());
  };

  useEffect(() => {
    getPurchaseItems();
  }, []);

  return (
    <div className="container">
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
      />
    </div>
  );
};
