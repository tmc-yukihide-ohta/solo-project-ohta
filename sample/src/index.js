const onClickAdd = () => {
    // テキストボックスの値を取得し、初期化する
    const inputText = document.getElementById("add-text").value;
    document.getElementById("add-text").value = "";

    createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
    document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに追加する関数
const createIncompleteList = (argText) => {
    // liタグ生成
    const li = document.createElement("li");

    // div生成
    const div = document.createElement("div");
    div.className = "list-row";

    // p要素を生成
    const pText = document.createElement("p");
    pText.className = "text";
    pText.innerText = argText;

    // button(完了)タグ生成
    const completeButton = document.createElement("button");
    completeButton.innerText = "完了";
    completeButton.addEventListener("click", () => {
        // 完了リストに追加する要素
        const addTarget = completeButton.parentNode;

        // 押された完了ボタンの親タグ(div)を未完了リストから削除
        deleteFromIncompleteList(div.parentNode);

        // li以下を初期化
        const addTarget2 = addTarget.parentNode;
        addTarget2.textContent = null;
        div.textContent = null;

        //p要素を生成
        pText.innerText = argText;

        //戻すボタン生成
        const backButton = document.createElement("button");
        backButton.innerText = "戻す";
        backButton.addEventListener("click", () => {
            // 押された戻すボタンの親タグを完了リストから削除
            const deleteTarget = div.parentNode;
            document.getElementById("complete-list").removeChild(deleteTarget);

            //テキストを取得
            const text = backButton.parentNode.firstElementChild.innerText;
            createIncompleteList(text);
        });

        // liタグの子要素に各要素を設定
        addTarget2.appendChild(div);
        div.appendChild(pText);
        div.appendChild(backButton);

        //完了リストに追加
        document.getElementById("complete-list").appendChild(addTarget2);
    });

    // button(削除)タグ生成
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "削除";
    deleteButton.addEventListener("click", () => {
        // 押された削除ボタンの親タグ(div)を未完了リストから削除
        deleteFromIncompleteList(div.parentNode);
    });

    // divタグの子要素に各要素を設定
    div.appendChild(pText);
    div.appendChild(completeButton);
    div.appendChild(deleteButton);
    li.appendChild(div);
    console.log(li);

    // 未完了リストに追加
    document.getElementById("incomplete-list").appendChild(li);
};

document
    .getElementById("add-button")
    .addEventListener("click", () => onClickAdd());
