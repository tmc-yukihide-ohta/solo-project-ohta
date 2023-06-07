import React, { useState } from "react";

import { InputItem } from "./components/InputItem";
import { BuyList } from "./components/BuyList";
import "./components/styles/styles.css";

export const App = () => {
  const [itemText, setItemText] = useState("");
  const [itemList, setItemList] = useState([
    { id: 1, content: "りんご", isStriked: false },
    { id: 2, content: "バナナ", isStriked: false },
    { id: 3, content: "玉ねぎ", isStriked: false },
  ]);

  // 商品名の値を取得
  const onChangeItemText = (event) => {
    setItemText(event.target.value);
  };

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
      id: timestamp,
      content: itemText,
      isStriked: false,
    };
    const newItems = [...itemList, newItem];
    setItemList(newItems);
    setItemText("");
  };

  // クリックしたら取り消し線のon/offをする関数
  const handleItemTextClick = (id) => {
    setItemList((prevItems) =>
      prevItems.map(
        (item) =>
          item.id === id ? { ...item, isStriked: !item.isStriked } : item // ...itemでオブジェクトを複製してisStrikedの値を逆転したオブジェクトになる
      )
    );
  };

  return (
    <>
      <InputItem
        itemText={itemText}
        setItemText={setItemText}
        onChangeItemText={onChangeItemText}
        onClickAdd={onClickAdd}
      />
      <BuyList itemList={itemList} handleItemTextClick={handleItemTextClick} />
    </>
  );
};
