// ゲーム状態管理用
let mode = null;
let myHP = 4;
let oppHP = 4;
let mySpecial = null;
let specialUsed = false;
let playerAAction = null;
let playerASpecial = false;
let playerBAction = null;
let playerBSpecial = false;
let currentPlayer = 'A';

// 初期画面表示
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(div => div.classList.remove('visible'));
  document.getElementById(screenId).classList.add('visible');
}

// ルールブック表示
function openRule() {
  showScreen('ruleScreen');
}

// カード一覧表示
function openCardList() {
  showScreen('cardScreen');
}

// モード選択
function selectMode(selected) {
  mode = selected;
  showScreen('gameScreen');
  resetGame();
}

// ホームに戻る
function backToHome() {
  showScreen('modeSelect');
}

// ゲーム初期化
function resetGame() {
  myHP = 4;
  oppHP = 4;
  specialUsed = false;
  mySpecial = ['フェイント', 'スマッシュ', 'カウンター'][Math.floor(Math.random() * 3)];
  document.getElementById('specialInfo').innerText = `スペシャルカード：${mySpecial}（1回）`;
  renderHP();
  document.getElementById('log').innerText = "ゲーム開始！";
  document.getElementById('specialBtn').style.display = "inline-block";
  document.getElementById('actionArea').style.display = "block";
  document.getElementById('confirmBtn').style.display = "none";
  currentPlayer = 'A';
  playerAAction = null;
  playerASpecial = false;
  playerBAction = null;
  playerBSpecial = false;
}

// スペシャル使用
function useSpecial() {
  if (specialUsed) {
    alert("スペシャルは1回まで！");
    return;
  }
  specialUsed = true;
  document.getElementById("specialInfo").innerText = `スペシャルカード：${mySpecial}（使用済）`;
  document.getElementById("specialBtn").style.display = "none";
  if (mode === 'vs' && currentPlayer === 'A') {
    playerASpecial = true;
  } else if (mode === 'vs') {
    playerBSpecial = true;
  }
}

// 行動選択
function chooseAction(action) {
  if (mode === 'cpu') {
    const cpuMove = ['攻撃', '防御', '投げ'][Math.floor(Math.random() * 3)];
    resolveTurn(action, cpuMove, specialUsed, false);
  } else if (mode === 'vs') {
    if (currentPlayer === 'A') {
      playerAAction = action;
      currentPlayer = 'B';
      document.getElementById('log').innerText = "プレイヤーBの入力に切り替えてください。";
      document.getElementById('actionArea').style.display = "none";
      document.getElementById('confirmBtn').style.display = "inline-block";
    } else {
      playerBAction = action;
      document.getElementById('confirmBtn').style.display = "none";
      resolveTurn(playerAAction, playerBAction, playerASpecial, playerBSpecial);
    }
  }
}

// 確認ボタン処理
function confirmSwitch() {
  document.getElementById('actionArea').style.display = "block";
  document.getElementById('log').innerText = "プレイヤーB：行動を選んでください。";
}

// ターン解決
function resolveTurn(playerMove, enemyMove, special1, special2) {
  let result = '';
  let damageToEnemy = 0;
  let damageToPlayer = 0;

  const useSpecial = special1 ? mySpecial : null;

  if (special1 && !special2) {
    if (isWinSpecial(useSpecial, enemyMove)) {
      damageToEnemy = 2;
      result = `★${useSpecial}で勝利！相手に2ダメージ！`;
    } else if (isLoseSpecial(useSpecial, enemyMove)) {
      damageToPlayer = 1;
      result = `★${useSpecial}失敗！あなたが1ダメージ`;
    } else if (useSpecial === enemyMove) {
      damageToEnemy = 1;
      damageToPlayer = 1;
      result = `スペシャル同士があいこ！お互い1ダメージ`;
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
    result += (myHP <= 0) ? "\nあなたの負け！" : "\nあなたの勝ち！";
    disableAll();
  }

  document.getElementById("log").innerText =
    `あなた: ${playerMove} ／ 相手: ${enemyMove}\n${result}`;
}

// HP表示更新
function renderHP() {
  const myHearts = '❤️'.repeat(Math.max(0, myHP));
  const oppHearts = '❤️'.repeat(Math.max(0, oppHP));
  document.getElementById("hpArea").innerText = `あなた：${myHearts} ／ 相手：${oppHearts}`;
}

function disableAll() {
  document.getElementById("actionArea").style.display = "none";
  document.getElementById("specialBtn").style.display = "none";
  document.getElementById("confirmBtn").style.display = "none";
}

// スペシャル勝敗判定
function isWinSpecial(card, move) {
  const winMap = {
    フェイント: ['防御', 'カウンター'],
    スマッシュ: ['投げ', 'フェイント'],
    カウンター: ['攻撃', 'スマッシュ']
  };
  return winMap[card].includes(move);
}

function isLoseSpecial(card, move) {
  const loseMap = {
    フェイント: ['攻撃', 'スマッシュ'],
    スマッシュ: ['防御', 'カウンター'],
    カウンター: ['投げ', 'フェイント']
  };
  return loseMap[card].includes(move);
}
