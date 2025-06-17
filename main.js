// Rev.A対応 main.js - 2025-06-17 15:15:07

let myHP = 4;
let oppHP = 4;

let mySpecial = null;
let specialUsed = false;
let specialActive = false;

function startGame() {
  const specials = ['フェイント', 'カウンター', 'スマッシュ'];
  mySpecial = specials[Math.floor(Math.random() * specials.length)];
  specialUsed = false;
  specialActive = false;
  myHP = 4;
  oppHP = 4;

  updateSpecialInfo();
  renderHP();
  document.getElementById("log").innerText = "";
  document.getElementById("actionArea").style.display = "block";
  document.getElementById("specialBtn").style.display = "inline-block";
}

function renderHP() {
  document.getElementById("myHearts").innerText = "❤️".repeat(myHP);
  document.getElementById("oppHearts").innerText = "❤️".repeat(oppHP);
}

function updateSpecialInfo() {
  const status = specialUsed ? "使用済" : mySpecial ? `${mySpecial}（未使用）` : "未使用";
  document.getElementById("specialInfo").innerText = `★カード：${status}`;
}

function useSpecial() {
  if (specialUsed) {
    alert("★カードは1回しか使えません！");
    return;
  }
  specialActive = true;
  specialUsed = true;
  updateSpecialInfo();
  document.getElementById("specialBtn").style.display = "none";
}

function chooseAction(playerMove) {
  const moves = ['攻撃', '防御', '投げ'];
  const enemyMove = moves[Math.floor(Math.random() * moves.length)];
  const enemySpecial = null; // CPUは使わない

  let outcome = "";
  let playerUsedSpecial = specialActive;
  let enemyUsedSpecial = false;

  // 勝敗判定
  if (playerUsedSpecial) {
    outcome = resolveSpecial(playerMove, mySpecial, enemyMove, null);
    specialActive = false;
  } else {
    outcome = resolveNormal(playerMove, enemyMove);
  }

  // 勝敗結果ログ
  let log = `あなた: ${playerMove} ／ 相手: ${enemyMove}\n→ ${outcome}`;
  document.getElementById("log").innerText = log;
  renderHP();
  updateSpecialInfo();

  // 勝敗チェック
  if (myHP <= 0 || oppHP <= 0) {
    const result = myHP <= 0 ? "あなたの負け！" : "あなたの勝ち！";
    document.getElementById("log").innerText += `\n${result} ゲーム終了！`;
    disableButtons();
  }
}

function resolveNormal(player, enemy) {
  if (player === enemy) return "あいこ！";

  const winMap = {
    "攻撃": ["投げ", "フェイント"],
    "防御": ["攻撃", "スマッシュ"],
    "投げ": ["防御", "カウンター"]
  };

  if (winMap[player]?.includes(enemy)) {
    oppHP--;
    return "あなたの勝ち！（相手 -1）";
  } else {
    myHP--;
    return "あなたの負け！（自分 -1）";
  }
}

function resolveSpecial(playerMove, specialType, enemyMove, enemySpecial) {
  // 勝利条件マップ
  const specialWins = {
    "フェイント": ["防御", "カウンター"],
    "カウンター": ["攻撃", "スマッシュ"],
    "スマッシュ": ["投げ", "フェイント"]
  };

  const playerIsSpecial = true;
  const enemyIsSpecial = false;

  if (!enemyIsSpecial) {
    if (specialWins[specialType].includes(enemyMove)) {
      oppHP -= 2;
      return `★${specialType}成功！ 相手HP -2`;
    } else {
      myHP -= 1;
      return `★${specialType}失敗… 自分HP -1`;
    }
  }

  // 将来：スペシャル同士処理（今は未使用）
  return "あいこ！（スペシャル同士）";
}

function disableButtons() {
  document.getElementById("actionArea").style.display = "none";
  document.getElementById("specialBtn").style.display = "none";
}
