function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function showRules() {
  showScreen('ruleScreen');
  document.getElementById('ruleScreen').innerHTML = `
    <h2>📘 ルールブック</h2>
    <p><b>基本ルール：</b> 攻撃・防御・投げの三すくみとスペシャルカードで戦うゲームです。</p>
    <p><b>ターンの流れ：</b> カードを伏せて → 同時公開 → 勝敗判定</p>
    <button onclick="goHome()">← ホームに戻る</button>
  `;
}

function showCardList() {
  showScreen('cardScreen');
  document.getElementById('cardScreen').innerHTML = `
    <h2>🃏 カード一覧</h2>
    <p>攻撃▶投げ／防御▶攻撃／投げ▶防御</p>
    <p>スペシャルカード：フェイント・カウンター・スマッシュ</p>
    <button onclick="goHome()">← ホームに戻る</button>
  `;
}

function startCPU() {
  showScreen('gameScreen');
  document.getElementById('modeInfo').innerText = "CPU対戦モード（準備中）";
}

function startPvP() {
  showScreen('gameScreen');
  document.getElementById('modeInfo').innerText = "対人対戦モード（準備中）";
}

function goHome() {
  showScreen('homeScreen');
}
