let mySpecial = null;
let specialUsed = false;

function startGame() {
  const specials = ['フェイント', 'カウンター', 'スマッシュ'];
  mySpecial = specials[Math.floor(Math.random() * specials.length)];
  specialUsed = false;

  document.getElementById("log").innerText =
    "あなたのスペシャルカード: " + mySpecial + "（1回のみ）";

  document.getElementById("actionArea").style.display = "block";
  document.getElementById("specialBtn").style.display = "inline-block";
}

// 行動を選んだときの処理
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
  } else {
    outcome = 'あなたの負け！';
  }

  document.getElementById("log").innerText =
    `あなた: ${playerMove} ／ 相手: ${enemyMove} → ${outcome}`;
}

// ★カードを使用（1回だけ）
function useSpecial() {
  if (specialUsed) {
    alert("もう使えません！");
    return;
  }

  specialUsed = true;
  document.getElementById("specialBtn").style.display = "none";
  document.getElementById("log").innerText += `\n★カード「${mySpecial}」を使用！（効果は未実装）`;
}
