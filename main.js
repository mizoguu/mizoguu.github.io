let myHP = 4;
let oppHP = 4;

let mySpecial = null;
let specialUsed = false;

function startGame() {
  const specials = ['フェイント', 'カウンター', 'スマッシュ'];
  mySpecial = specials[Math.floor(Math.random() * specials.length)];
  specialUsed = false;
  myHP = 4;
  oppHP = 4;

  // スペシャルカードの常時表示
  document.getElementById("specialInfo").innerText =
    `★カード：${mySpecial}（未使用）`;

  // 初期ログ表示
  document.getElementById("log").innerText = "ゲームスタート！";

  document.getElementById("actionArea").style.display = "block";
  document.getElementById("specialBtn").style.display = "inline-block";

  renderHP();
}

function renderHP() {
  document.getElementById("hpDisplay").innerText =
    `あなた: ${myHP} / 相手: ${oppHP}`;
}

function chooseAction(playerMove) {
  const moves = ['攻撃', '防御', '投げ'];
  const enemyMove = moves[Math.floor(Math.random() * moves.length)];

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

  // 勝敗判定
  if (myHP <= 0) {
    document.getElementById("log").innerText = "あなたの負け！ゲーム終了！";
    disableButtons();
    return;
  } else if (oppHP <= 0) {
    document.getElementById("log").innerText = "あなたの勝ち！ゲーム終了！";
    disableButtons();
    return;
  }

  // ログに追加で表示（ここがポイント）
  document.getElementById("log").innerText =
    `あなた: ${playerMove} ／ 相手: ${enemyMove} → ${outcome}`;
}

function useSpecial() {
  if (specialUsed) {
    alert("もう使えません！");
    return;
  }

  specialUsed = true;
  document.getElementById("specialBtn").style.display = "none";

  // ★カード使用ログは追記表示
  document.getElementById("log").innerText +=
    `\n★カード「${mySpecial}」を使用！（効果は未実装）`;

  // スペシャルカード状態も更新
  document.getElementById("specialInfo").innerText =
    `★カード：${mySpecial}（使用済）`;
}

function disableButtons() {
  document.getElementById("actionArea").style.display = "none";
  document.getElementById("specialBtn").style.display = "none";
}
