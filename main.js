// ルール表示
function openRule() {
  document.getElementById("modeSelect").style.display = "none";
  document.getElementById("overlay").style.display = "block";
  document.getElementById("overlayContent").innerHTML = `
    <h2>📘 ルールブック（Rev.A）</h2>
    <p><b>基本ルール：</b> 攻撃・防御・投げの3すくみ＋1枚のスペシャルカードで相手のHPを0にしたら勝利！</p>
    <p><b>勝利条件：</b> ノーマルモード：4点／ハードモード：5点（スキルあり）</p>
    <p><b>ターンの流れ：</b><br>
    ① 行動カードを伏せる → ② 必要ならスペシャル宣言 → ③ 同時公開→勝敗・HP変動</p>
    <button onclick="closeOverlay()">✖ 閉じる</button>
  `;
}

// カード一覧表示
function openCardList() {
  document.getElementById("modeSelect").style.display = "none";
  document.getElementById("overlay").style.display = "block";
  document.getElementById("overlayContent").innerHTML = `
    <h2>🃏 カード一覧説明</h2>
    <h3>▶ 行動カード</h3>
    👊攻撃：投げ・フェイントに勝ち／防御・カウンターに負け<br>
    🛡防御：攻撃・スマッシュに勝ち／投げ・フェイントに負け<br>
    🤼‍♂️投げ：防御・カウンターに勝ち／攻撃・スマッシュに負け
    <h3>▶ スペシャルカード</h3>
    ★フェイント：防御・カウンターに勝ち<br>
    ★スマッシュ：投げ・フェイントに勝ち<br>
    ★カウンター：攻撃・スマッシュに勝ち
    <p><b>※ 使用は1回のみ。勝てば大きなダメージ！</b></p>
    <button onclick="closeOverlay()">✖ 閉じる</button>
  `;
}

// オーバーレイ閉じる
function closeOverlay() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("modeSelect").style.display = "block";
}

// モード選択
function selectMode(mode) {
  document.getElementById("modeSelect").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
  if (mode === 'cpu') initGame("cpu");
  else if (mode === 'vs') initGame("vs");
}

let myHP = 4;
let oppHP = 4;
let mySpecial = null;
let specialUsed = false;

function initGame(mode) {
  const specials = ['フェイント', 'カウンター', 'スマッシュ'];
  mySpecial = specials[Math.floor(Math.random() * specials.length)];
  specialUsed = false;
  myHP = 4;
  oppHP = 4;
  document.getElementById("specialInfo").innerText = `スペシャルカード：${mySpecial}（1回）`;
  document.getElementById("log").innerText = "ゲーム開始！";
  renderHP();
}

function startGame() {
  document.getElementById("log").innerText = "行動を選んでください。";
  document.getElementById("specialBtn").style.display = "inline-block";
  document.getElementById("actionArea").style.display = "block";
  renderHP();
}

function chooseAction(playerMove) {
  const moves = ['攻撃', '防御', '投げ'];
  const enemyMove = moves[Math.floor(Math.random() * moves.length)];
  let result = '';
  let damageToEnemy = 0;
  let damageToPlayer = 0;
  const special = specialUsed ? mySpecial : null;

  if (special) {
    if (isWinSpecial(special, enemyMove)) {
      damageToEnemy = 2;
      result = `★${special}で勝利！相手に2ダメージ！`;
    } else if (isLoseSpecial(special, enemyMove)) {
      damageToPlayer = 1;
      result = `★${special}は外れた！あなたが1ダメージ`;
    } else if (isSpecialDraw(special, enemyMove)) {
      damageToEnemy = 1;
      damageToPlayer = 1;
      result = `★スペシャル同士があいこ！両者1ダメージ`;
    }
  } else {
    if (playerMove === enemyMove) {
      result = 'あいこ！';
    } else if (
      (playerMove === '攻撃' && enemyMove === '投げ') ||
      (playerMove === '防御' && enemyMove === '攻撃') ||
      (playerMove === '投げ' && enemyMove === '防御')
    ) {
      damageToEnemy = 1;
      result = 'あなたの勝ち！相手に1ダメージ！';
    } else {
      damageToPlayer = 1;
      result = 'あなたの負け！1ダメージ';
    }
  }

  myHP -= damageToPlayer;
  oppHP -= damageToEnemy;
  renderHP();

  if (myHP <= 0 || oppHP <= 0) {
    document.getElementById("log").innerText =
      myHP <= 0 ? "あなたの負け！ゲーム終了！" : "あなたの勝ち！ゲーム終了！";
    disableAll();
    return;
  }

  document.getElementById("log").innerText =
    `あなた: ${playerMove} ／ 相手: ${enemyMove}\n${result}`;
}

function useSpecial() {
  if (specialUsed) {
    alert("もう使えません！");
    return;
  }
  specialUsed = true;
  document.getElementById("specialBtn").style.display = "none";
  document.getElementById("specialInfo").innerText =
    `スペシャルカード：${mySpecial}（使用済）`;
}

function renderHP() {
  const myHearts = '❤️'.repeat(myHP);
  const oppHearts = '❤️'.repeat(oppHP);
  document.getElementById("hpArea").innerText =
    `あなた：${myHearts} ／ 相手：${oppHearts}`;
}

function disableAll() {
  document.getElementById("actionArea").style.display = "none";
  document.getElementById("specialBtn").style.display = "none";
}

// スペシャル判定
function isWinSpecial(special, move) {
  const winMap = {
    フェイント: ['防御', 'カウンター'],
    スマッシュ: ['投げ', 'フェイント'],
    カウンター: ['攻撃', 'スマッシュ']
  };
  return winMap[special].includes(move);
}

function isLoseSpecial(special, move) {
  const loseMap = {
    フェイント: ['攻撃', 'スマッシュ'],
    スマッシュ: ['防御', 'カウンター'],
    カウンター: ['投げ', 'フェイント']
  };
  return loseMap[special].includes(move);
}

function isSpecialDraw(special, move) {
  return move === special;
}
