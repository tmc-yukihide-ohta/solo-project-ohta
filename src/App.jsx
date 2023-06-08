import React, { useState, useEffect } from "react";
import { InputItem } from "./components/InputItem";
import { BuyList } from "./components/BuyList";
import "./components/styles/styles.css";

export const App = () => {
  const [itemText, setItemText] = useState("");
  const [itemList, setItemList] = useState([]);

  // 商品名の値を取得
  const onChangeItemText = (event) => {
    setItemText(event.target.value);
  };

  // タイムスタンプを生成
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
      prevItems.map((item) => {
        if (item.timestamp === timestamp) {
          const body = {
            timestamp: timestamp,
            itemName: item.Content,
            isStriked: !item.isStriked,
          };
          fetch(`${URL}/api/itemedit`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          return { ...item, isStriked: !item.isStriked }; // ...itemでオブジェクトを複製してisStrikedの値を反転した値に変更
        } else {
          return item;
        }
      })
    );
    console.log(`id:${timestamp} の取消線変更、DB変更完了`);
  };

  // 取消線が入ったオブジェクトの配列または取消線のないオブジェクトの配列を生成
  function isStrikedItemsList(isStriked) {
    const newItemList = [...itemList];
    let result = [];
    if (isStriked === true) {
      //取消線のある配列
      result = newItemList.filter((item) => {
        return item.isStriked === true;
      });
    } else {
      // 取消線のない配列
      result = newItemList.filter((item) => {
        return item.isStriked === false;
      });
    }
    return result;
  }

  //購入ボタン実行時のアクション
  const onClickPurchasedItems = () => {
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
    console.log("購入品(取消線の商品):", purchasedItems);
    console.log("これらの商品は、買物リストから除外されました");
  };

  // 削除ボタンを押した時に、dbの行を削除する
  const onClickDeleteItem = (item) => {
    const body = { timestamp: item };
    fetch(`${URL}/api/purchaseitems`, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      console.log(`${item} の商品をDBから削除しました`);
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
        console.log("GETで未購入リストを表示");
      });
  };

  // 商品をDBに登録してgetPurchaseItemsを実行
  const postPurchaseItem = (item) => {
    const body = {
      timestamp: item.timestamp,
      itemName: item.content,
      strikeLine: item.isStriked,
    };
    console.log("POSTデータ:", body);
    fetch(`${URL}/api/purchaseitems`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      console.log("この商品をDBに登録しました");
      getPurchaseItems();
    });
  };

  useEffect(() => {
    getPurchaseItems();
  }, []); // eslint-disable-line

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
        onClickDeleteItem={onClickDeleteItem}
      />
    </div>
  );
};
