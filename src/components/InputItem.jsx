import React from "react";

export const InputItem = (props) => {
  const { itemText, onChangeItemText, onClickAdd } = props;
  return (
    <>
      <div className="input-area">
        <input
          id="add-text"
          placeholder="買いたい商品を入力"
          value={itemText}
          onChange={onChangeItemText}
        />
        <button id="add-button" onClick={onClickAdd}>
          追加
        </button>
      </div>
    </>
  );
};
