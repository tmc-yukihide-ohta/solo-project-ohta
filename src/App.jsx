import React, { useState, useEffect } from "react";

import { InputItem } from "./components/InputItem";
import { BuyList } from "./components/BuyList";
import "./components/styles/styles.css";

export const App = () => {
  const [itemText, setItemText] = useState("");
  const [itemList, setItemList] = useState([
    // { timestamp: 1, content: "りんご", isStriked: false },
    // { timestamp: 2, content: "バナナ", isStriked: false },
    // { timestamp: 3, content: "玉ねぎ", isStriked: false },
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
  };

  const onClickPurchasedItems = () => {
    console.log("購入されたよー");
    const newItemList = [...itemList];
    const purchasedItems = newItemList.filter((item) => {
      return item.isStriked === true;
    });
    const unpurchasedItems = newItemList.filter((item) => {
      return item.isStriked === false;
    });
    setItemList(unpurchasedItems);
    console.log(purchasedItems);
    console.log(unpurchasedItems);
  };

  const URL =
    process.env.NODE_ENV === "production"
      ? "https://.com"
      : "http://localhost:8080";

  const getPurchaseItems = () => {
    fetch(`${URL}/api/purchaseitems`, { method: "GET" })
      .then((res) => res.json())
      .then((getData) => {
        console.log("getData:", getData);
        // getData.sort((a, b) => {
        //   if (a.isWaiting === b.isWaiting) {
        //     return a.id - b.id;
        //   }
        //   return b.isWaiting - a.isWaiting;
        // });
        console.log(getData);
        setItemList(getData);
      });
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
