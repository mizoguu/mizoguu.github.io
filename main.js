let mode = '';
let myHP = 4;
let oppHP = 4;
let mySpecial = null;
let specialUsed = false;
let player1Move = '';
let player2Move = '';

function setMode(selectedMode) {
  mode = selectedMode;
  startGame();
}

function startGame() {
  const specials = ['フェイント', 'カウンター', 'スマッシュ'];
  mySpecial = specials[Math.floor(Math.random() * specials.length)];
  specialUsed = false;
  myHP = 4;
  oppHP = 4;
  player1Move = '';
  player2Move = '';
  document.getElementById("specialDisplay").innerText = `スペシャルカード: ${mySpecial}（1回）`;
  document.getElementById("actionArea").style.display = "block";
  document.getElementById("specialBtn").style.display = "inline-block";
  renderHP();
  document.getElementById("log").innerText = "行動を選んでください";
}

function renderHP() {
  document.getElementById("hpDisplay").innerText = `あなた: ${myHP} / 相手: ${oppHP}`;
}

function chooseAction(move) {
  if (mode === 'cpu') {
    playCpuMode(move);
  } else if (mode === 'pvp') {
    playPvpMode(move);
  }
}

function playCpuMode(playerMove) {
  const moves = ['攻撃', '防御', '投げ'];
  const enemyMove = moves[Math.floor(Math.random() * moves.length)];
  resolveBattle(playerMove, enemyMove);
}

function playPvpMode(move) {
  if (!player1Move) {
    player1Move = move;
    document.getElementById("log").innerText = "プレイヤー2の番です";
  } else {
    player2Move = move;
    resolveBattle(player1Move, player2Move);
    player1Move = '';
    player2Move = '';
  }
}

function resolveBattle(playerMove, enemyMove) {
  let outcome = '';
  if (playerMove === enemyMove) {
    outcome = 'あいこ！';
  } else if (
    (playerMove === '攻撃' && enemyMove === '投げ') ||
    (playerMove === '防御' && enemyMove === '攻撃') ||
    (playerMove === '投げ' && enemyMove === '防御')
  ) {
    outcome = 'あなたの勝ち！';
    oppHP--;
  } else {
    outcome = 'あなたの負け！';
    myHP--;
  }

  renderHP();
  document.getElementById("log").innerText =
    `あなた: ${playerMove} ／ 相手: ${enemyMove} → ${outcome}`;

  if (myHP <= 0 || oppHP <= 0) {
    document.getElementById("log").innerText += myHP <= 0 ? "\nあなたの負け！" : "\nあなたの勝ち！";
    disableButtons();
  }
}

function useSpecial() {
  if (specialUsed) {
    alert("もう使えません！");
    return;
  }
  specialUsed = true;
  document.getElementById("specialBtn").style.display = "none";
  document.getElementById("log").innerText += `\n★カード「${mySpecial}」を使用！（効果未実装）`;
}

function disableButtons() {
  document.getElementById("actionArea").style.display = "none";
  document.getElementById("specialBtn").style.display = "none";
}
