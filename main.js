window.onload = function () {
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
    document.getElementById(id).style.display = 'block';
  }

  function showRules() {
    const html = `
      <h2>📘 ルールブック</h2>
      <p><b>基本ルール：</b>攻撃・防御・投げの三すくみとスペシャルカード1枚で戦います。</p>
      <p><b>勝利条件：</b> 相手のHPを0にしたら勝ち（ノーマル4点／ハード5点）</p>
      <p><b>ターンの流れ：</b><br>
        ① 行動カードを伏せる<br>
        ② 必要ならスペシャルカードを宣言<br>
        ③ 同時公開 → 勝敗 → HP変動
      </p>
      <h3>📊 ダメージ計算</h3>
      <ul>
        <li>通常勝利：相手 -1</li>
        <li>スペシャル勝利（vsノーマル）：相手 -2</li>
        <li>スペシャル勝利（vsスペシャル）：相手 -1、自分 +1</li>
        <li>スペシャル同士のあいこ：両者 -1</li>
        <li>スペシャル負け（vsノーマル）：自分 -1</li>
      </ul>
      <button onclick="goHome()">← ホームに戻る</button>
    `;
    document.getElementById('ruleScreen').innerHTML = html;
    showScreen('ruleScreen');
  }

  function showCardList() {
    const html = `
      <h2>🃏 カード一覧</h2>
      <h3>▶ 行動カード</h3>
      👊攻撃：投げ・フェイントに勝ち／防御・カウンターに負け<br>
      🛡防御：攻撃・スマッシュに勝ち／投げ・フェイントに負け<br>
      🤼投げ：防御・カウンターに勝ち／攻撃・スマッシュに負け
      <h3>▶ スペシャルカード</h3>
      ★フェイント：防御・カウンターに勝ち<br>
