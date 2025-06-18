function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function showRules() {
  const html = `
    <h2>📘 ルールブック</h2>
    <p><b>基本ルール：</b>攻撃・防御・投げ＋1枚のスペシャルカードでHPを削る。</p>
    <p><b>勝利条件：</b> 先に相手のHPを0にした方が勝ち。</p>
    <p><b>ターンの流れ：</b><br>① カードを伏せる → ② 同時公開 → ③ 勝敗判定</p>
    <button onclick="goHome()">← ホームへ</button>
  `;
  document.getElementById('infoScreen').innerHTML = html;
  showScreen('infoScreen');
}

function showCardList() {
  const html = `
    <h2>🃏 カード一覧</h2>
    <p><b>攻撃：</b>投げに勝ち、防御に負け</p>
    <p><b>防御：</b>攻撃に勝ち、投げに負け</p>
    <p><b>投げ：</b>防御に勝ち、攻撃に負け</p>
    <p><b>スペシャル：</b>フェイント・カウンター・スマッシュ（1回だけ使用可）</p>
    <button onclick="goHome()">← ホームへ</button>
  `;
  document.getElementById('infoScreen').innerHTML = html;
  showScreen('infoScreen');
}

function startGame(mode) {
  document.getElementById('modeTitle').innerText = (mode === 'cpu') ? "CPU対戦モード" : "対人対戦モード";
  showScreen('gameScreen');
}

function goHome() {
  showScreen('homeScreen');
}
