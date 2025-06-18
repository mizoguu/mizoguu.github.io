/* ---------- ルールブック & カード説明 ---------- */
function showRules() {
  document.getElementById('content').innerHTML = `
    <h2>📘 ルールブック（Rev.A）</h2>
    <h3>基本ルール</h3>
    <p>3つの行動カードと1枚のスペシャルカードを使い、
       相手のHPを0にした方が勝ちです。</p>
    <h3>ターンの流れ</h3>
    <ol><li>行動カードを伏せる</li>
        <li>必要ならスペシャル宣言</li>
        <li>同時公開→勝敗判定＆HP変動</li></ol>`;
}

function showCards() {
  document.getElementById('content').innerHTML = `
    <h2>🃏 カード一覧</h2>
    <h3>行動カード</h3>
    攻撃▶投げ　防御▶攻撃　投げ▶防御<br><br>
    <h3>スペシャルカード</h3>
    フェイント▶防御/カウンター<br>
    スマッシュ▶投げ/フェイント<br>
    カウンター▶攻撃/スマッシュ`;
}

/* ---------- ゲーム起動プレースホルダ ---------- */
function startCPU() {
  document.getElementById('content').innerHTML =
    '<h2>CPU対戦モード</h2><p>（現在実装中です）</p>';
}
function startPvP() {
  document.getElementById('content').innerHTML =
    '<h2>対人戦モード</h2><p>（現在実装中です）</p>';
}
