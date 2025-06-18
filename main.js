let myHP = 4;
let oppHP = 4;
let mySpecial = '';
let specialUsed = false;

function startGame() {
  const specials = ['フェイント', 'カウンター', 'スマッシュ'];
  mySpecial = specials[Math.floor(Math.random() * specials.length)];
  specialUsed = false;
  myHP = 4;
  oppHP = 4;
  updateSpecialInfo();
  renderHP();
  setLog('');
  document.getElementById("actionArea").style.display = "block";
  document.getElementById("specialBtn").style.display = "inline-block";
}

function updateSpecialInfo() {
  const info = specialUsed ? '使用済み' : ` ${mySpecial}（1回）`;
  document.getElementById("specialInfo").innerText = `スペシャルカード：${info}`;
}

function renderHP() {
  const hearts = (n) => '❤️'.repeat(n);
  document.getElementById("hpArea").innerText = `あなた：${hearts(myHP)}／ 相手：${hearts(oppHP)}`;
}

function setLog(text) {
  document.getElementById("log").innerText = text;
}

function useSpecial() {
  if (specialUsed) return;
  specialUsed = true;
  updateSpecialInfo();
  setLog("★カード「" + mySpecial + "」を使用！（効果は未実装）");
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

  if (myHP <= 0 || oppHP <= 0) {
    const result = myHP <= 0 ? "あなたの負け！ゲーム終了！" : "あなたの勝ち！ゲーム終了！";
    setLog(result);
    document.getElementById("actionArea").style.display = "none";
    document.getElementById("specialBtn").style.display = "none";
    return;
  }

  setLog(`あなた: ${playerMove} ／ 相手: ${enemyMove} → ${outcome}`);
}
