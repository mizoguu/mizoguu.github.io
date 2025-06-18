/* 共通：指定した HTML を content に表示し home を隠す */
function showScreen(html) {
  document.getElementById('home').style.display = 'none';
  const box = document.getElementById('content');
  box.innerHTML = html;
  box.style.display = 'block';
}

/* ホームに戻る */
function goHome() {
  document.getElementById('content').style.display = 'none';
  document.getElementById('home').style.display = 'block';
}

/* ルールブック */
function showRules() {
  showScreen(`
    <h2>📘 ルールブック</h2>
    <p><b>基本ルール：</b>攻撃・防御・投げ＋スペシャルカードで HP を削り合う読み合いバトル。</p>
    <p><b>勝利条件：</b> 相手 HP を 0 にすれば１ゲーム勝利（ノーマル4／ハード5）。</p>
    <p><b>ターンの流れ：</b><br>
      ① 行動カードを伏せる → ② スペシャル宣言 (任意) → ③ 同時公開 → 判定・HP変動
    </p>
    <h3>📊 ダメージ計算</h3>
    <ul style="text-align:left;max-width:360px;margin:auto;">
      <li>通常勝利 : 相手 -1</li>
      <li>スペシャル勝利(vsノーマル) : 相手 -2</li>
      <li>スペシャル勝利(vsスペシャル) : 相手 -1 / 自分 +1</li>
      <li>スペシャル同士あいこ : お互い -1</li>
      <li>スペシャル負け(vsノーマル) : 自分 -1</li>
    </ul>
    <button class="back" onclick="goHome()">← ホームに戻る</button>
  `);
}

/* カード一覧説明 */
function showCardList() {
  showScreen(`
    <h2>🃏 カード一覧説明</h2>
    <h3>▶ 行動カード</h3>
    👊攻撃：投げ／フェイントに勝ち・防御／カウンターに負け<br>
    🛡防御：攻撃／スマッシュに勝ち・投げ／フェイントに負け<br>
    🤼投げ：防御／カウンターに勝ち・攻撃／スマッシュに負け
    <h3>▶ スペシャルカード</h3>
    ★フェイント：防御・カウンターに勝ち<br>
    ★スマッシュ：投げ・フェイントに勝ち<br>
    ★カウンター：攻撃・スマッシュに勝ち
    <p>※ 各スペシャルは１ゲームにつき１回だけ使用可</p>
    <button class="back" onclick="goHome()">← ホームに戻る</button>
  `);
}

/* CPU対戦（仮実装） */
function startCPU() {
  showScreen(`
    <h2>🖥️ CPU対戦モード（仮）</h2>
    <p>ここに CPU ロジックを追加予定です。</p>
    <button class="back" onclick="goHome()">← ホームに戻る</button>
  `);
}

/* 交互入力の対人戦（仮実装） */
function startPvP() {
  showScreen(`
    <h2>👥 対人対戦モード（仮）</h2>
    <p>ここに対人戦ロジックを追加予定です。</p>
    <button class="back" onclick="goHome()">← ホームに戻る</button>
  `);
}
