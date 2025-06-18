function showScreen(html) {
  document.getElementById("home").style.display = "none";
  const content = document.getElementById("content");
  content.innerHTML = html;
  content.style.display = "block";
}

function goHome() {
  document.getElementById("home").style.display = "block";
  document.getElementById("content").style.display = "none";
}

// -------------------- ルールブック --------------------
function showRules() {
  showScreen(`
    <h2>📘 ルールブック</h2>
    <p><strong>基本ルール：</strong> 攻撃・防御・投げの3すくみ＋スペシャルカードで勝敗を決めます。</p>
    <p><strong>勝利条件：</strong> 相手のHPを0にすれば勝ち（ノーマル：4点／ハード：5点）</p>
    <p><strong>ターンの流れ：</strong><br>
    ① 行動カードを伏せる → ② 必要ならスペシャル宣言 → ③ 同時公開→勝敗・HP変動</p>
    <p><strong>ダメージ計算：</strong></p>
    <ul>
      <li>ノーマル vs ノーマル：勝利で相手HP-1</li>
      <li>あいこ：お互いノーダメージ</li>
      <li>スペシャル vs ノーマル（勝利）：相手HP-2</li>
      <li>スペシャル vs ノーマル（敗北）：自分HP-1</li>
      <li>スペシャル vs スペシャル（勝利）：相手HP-1、自分HP+1</li>
      <li>スペシャル vs スペシャル（あいこ）：お互いHP-1</li>
    </ul>
    <button class="back-button" onclick="goHome()">← ホームに戻る</button>
  `);
}

// -------------------- カード説明 --------------------
function showCardList() {
  showScreen(`
    <h2>🃏 カード一覧説明</h2>
    <p><strong>▶ 行動カード</strong></p>
    <p>👊攻撃：投げ・フェイントに勝つ／防御・カウンターに負け</p>
    <p>🛡防御：攻撃・スマッシュに勝つ／投げ・フェイントに負け</p>
    <p>🤼‍♂️投げ：防御・カウンターに勝つ／攻撃・スマッシュに負け</p>
    <p><strong>▶ スペシャルカード</strong></p>
    <p>★フェイント：防御・カウンターに勝つ</p>
    <p>★スマッシュ：投げ・フェイントに勝つ</p>
    <p>★カウンター：攻撃・スマッシュに勝つ</p>
    <button class="back-button" onclick="goHome()">← ホームに戻る</button>
  `);
}

// -------------------- CPU対戦（仮） --------------------
function startCPU() {
  showScreen(`
    <h2>CPU対戦モード（簡易）</h2>
    <p>あなたの行動：</p>
    <button onclick="choose('攻撃')">👊 攻撃</button>
    <button onclick="choose('防御')">🛡 防御</button
