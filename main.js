function showRules() {
  const content = document.getElementById("content");
  content.style.display = "block";
  content.innerHTML = `
    <h2>📘 ルールブック</h2>
    <p><b>基本ルール：</b> 攻撃・防御・投げの三すくみとスペシャルカードで戦うゲームです。</p>
    <p><b>ターンの流れ：</b> カードを伏せて → 同時公開 → 勝敗判定</p>
    <button onclick="goHome()">← ホームに戻る</button>
  `;
}

function showCardList() {
  const content = document.getElementById("content");
  content.style.display = "block";
  content.innerHTML = `
    <h2>🃏 カード一覧</h2>
    <p>攻撃▶投げ／防御▶攻撃／投げ▶防御</p>
    <p>スペシャルカード：フェイント・カウンター・スマッシュ</p>
    <button onclick="goHome()">← ホームに戻る</button>
  `;
}

function startCPU() {
  const content = document.getElementById("content");
  content.style.display = "block";
  content.innerHTML = `
    <h2>CPU対戦モード（準備中）</h2>
    <p>ここにCPUロジックを追加予定です。</p>
