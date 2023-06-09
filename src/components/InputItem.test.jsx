import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { InputItem } from "./InputItem";

test("入力フィールドの値が正しく取得される", () => {
  render(<InputItem onClickAdd={() => {}} />);

  // テキスト入力フィールドに値を入力
  const inputElement = screen.getByLabelText("商品名");
  fireEvent.change(inputElement, { target: { value: "テストアイテム" } });

  // 入力値が正しく取得されることを検証
  expect(inputElement.value).toBe("テストアイテム");
});
