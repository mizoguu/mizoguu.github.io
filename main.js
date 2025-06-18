// 表示切り替え関数
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// ホームに戻る
function goHome() {
  showPage("home");
}

// ルール・カード説明
function openRule() {
  showPage("rule");
}
function openCardList() {
  showPage("cardList");
}

// 状態管理
let myHP = 4;
let oppHP = 4;
let mySpecial = null;
let specialUsed = false;

// スペシャルの種類
const specials = ['フェイント', 'カウンター', 'スマッシュ'];

// ゲーム初期化
function initGame(mode) {
  myHP = 4;
  oppHP = 4;
  mySpecial = specials[Math.floor(Math.random() * specials.length)];
  specialUsed = false;

  document.getElementById("specialInfo").innerText = `スペシャルカード： ${mySpecial}（1回）`;
  document.getElementById("log").innerText = "ゲーム開始！行動を選んでください。";
  document.getElementById("specialBtn").style.display = "inline-block";
  document.getElementById("actionArea").style.display = "block";
  renderHP();

  showPage("game");
}

// HP表示更新
function renderHP() {
  document.getElementById("hpArea").innerText =
    `あなた：${"❤️".repeat(myHP)} ／ 相手：${"❤️".repeat(oppHP)}`;
}

// スペシャルカード使用
function useSpecial() {
  if (specialUsed) {
    alert("もう使えません！");
    return;
  }
  specialUsed = true;
  document.getElementById("specialBtn").style.display = "none";
  document.getElementById("specialInfo").innerText =
    `スペシャルカード： ${mySpecial}（使用済）`;
}

// 行動選択
function chooseAction(playerMove) {
  const enemyMove = ['攻撃', '防御', '投げ'][Math.floor(Math.random() * 3)];
  let result = "";
  let damageToEnemy = 0;
  let damageToPlayer = 0;

  if (specialUsed) {
    if (isWinSpecial(mySpecial, enemyMove)) {
      result = `★${mySpecial}で勝利！相手に2ダメージ`;
      damageToEnemy = 2;
    } else if (isLoseSpecial(mySpecial, enemyMove)) {
      result = `★${mySpecial}失敗！あなたに1ダメージ`;
      damageToPlayer = 1;
    } else if (mySpecial === enemyMove) {
      result = `スペシャル同士のあいこ！双方1ダメージ`;
      damageToEnemy = 1;
      damageToPlayer = 1;
    }
  } else {
    if (playerMove === enemyMove) {
      result = "あいこ！";
    } else if (
      (playerMove === '攻撃' && enemyMove === '投げ') ||
      (playerMove === '防御' && enemyMove === '攻撃') ||
      (playerMove === '投げ' && enemyMove === '防御')
    ) {
      result = "あなたの勝ち！相手に1ダメージ";
      damageToEnemy = 1;
    } else {
      result = "あなたの負け！あなたに1ダメージ";
      damageToPlayer = 1;
    }
  }

  myHP -= damageToPlayer;
  oppHP -= damageToEnemy;
  renderHP();

  if (myHP <= 0) {
    document.getElementById("log").innerText = "あなたの負け！ゲーム終了！";
    disableButtons();
  } else if (oppHP <= 0) {
    document.getElementById("log").innerText = "あなたの勝ち！ゲーム終了！";
    disableButtons();
  } else {
    document.getElementById("log").innerText =
      `あなた：${playerMove} ／ 相手：${enemyMove}\n${result}`;
  }
}

// 判定処理
function isWinSpecial(s, move) {
  return {
    フェイント: ['防御', 'カウンター'],
    スマッシュ: ['投げ', 'フェイント'],
    カウンター: ['攻撃', 'スマッシュ']
  }[s].includes(move);
}

function isLoseSpecial(s, move) {
  return {
    フェイント: ['攻撃', 'スマッシュ'],
    スマッシュ: ['防御', 'カウンター'],
    カウンター: ['投げ', 'フェイント']
  }[s].includes(move);
}

// ボタン無効化
function disableButtons() {
  document.getElementById("actionArea").style.display = "none";
  document.getElementById("specialBtn").style.display = "none";
}
