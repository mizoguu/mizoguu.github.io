function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function showRules() {
  showScreen('ruleScreen');
  document.getElementById('ruleScreen').innerHTML = `
    <h2>📘 ルールブック</h2>
    <p><b>基本ルール：</b> 攻撃・防御・投げの三すくみとスペシャルカードで戦う読み合いバトル。</p>
    <p><b>勝利条件：</b> 相手のHPを0にすれば勝ち（ノーマル：HP4／ハード：HP5）</p>
    <p><b>ターンの流れ：</b></p>
    <ol>
      <li>行動カードを伏せる</li>
      <li>必要に応じてスペシャル宣言</li>
      <li>同時公開→勝敗判定→HP変動</li>
    </ol>
    <h3>【ダメージ計算】</h3>
    <ul>
      <li>ノーマル vs ノーマル：勝者が相手HP-1</li>
      <li>スペシャル vs ノーマル：勝てば相手HP-2、負けたら自分HP-1</li>
      <li>スペシャル vs スペシャル：勝てばHP-1＋自分+1、あいこなら両者-1</li>
    </ul>
    <button onclick="goHome()">← ホームに戻る</button>
  `;
}

function showCardList() {
  showScreen('cardScreen');
  document.getElementById('cardScreen').innerHTML = `
    <h2>🃏 カード一覧</h2>
    <h3>行動カード</h3>
    攻撃▶投げ／防御▶攻撃／投げ▶防御<br><br>
    <h3>スペシャルカード</h3>
    フェイント▶防御・カウンター<br>
    スマッシュ▶投げ・フェイント<br>
    カウンター▶攻撃・スマッシュ
    <p><b>※ スペシャルカードは1回限定！</b></p>
    <button onclick="goHome()">← ホームに戻る</button>
  `;
}

function startCPU() {
  showScreen('gameScreen');
  document.getElementById('modeInfo').innerText = "CPU対戦モード（簡易）";
  initGame("cpu");
}

function startPvP() {
  showScreen('gameScreen');
  document.getElementById('modeInfo').innerText = "対人対戦モード（簡易）";
  initGame("pvp");
}

function goHome() {
  showScreen('homeScreen');
}

// 以下、initGame() や chooseAction() などのロジックは別途必要ですが、
// 最低限これがあれば画面切り替えは正常に動きます。
