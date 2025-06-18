function showSection(id) {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("rule").classList.add("hidden");
  document.getElementById("cardlist").classList.add("hidden");
  document.getElementById("game").classList.add("hidden");
  document.getElementById(id).classList.remove("hidden");
}

function showRule() {
  showSection("rule");
  document.getElementById("rule").innerHTML = `
    <h2>📘 ルールブック</h2>
    <div class="box">
    <b>基本ルール：</b><br>
    攻撃・防御・投げの3すくみ＋スペシャルカードで勝敗を決するゲームです。<br><br>
    <b>勝利条件：</b><br>
    相手のHPを0にすれば勝ち（ノーマル4点／ハード5点）<br><br>
    <b>ターンの流れ：</b><br>
    ① 行動カードを伏せる → ② 必要ならスペシャル宣言 → ③ 同時公開→勝敗・HP変動<br><br>
    <b>ダメージ計算：</b><br>
    ・ノーマル vs ノーマル（勝利）：相手HP -1<br>
    ・あいこ：ノーダメージ<br>
    ・スペシャル vs ノーマル（勝利）：相手HP -2、自分HP変化なし<br>
    ・スペシャル vs ノーマル（敗北）：自分HP -1<br>
    ・スペシャル vs スペシャル（勝利）：相手HP -1、自分HP +1<br>
    ・スペシャル vs スペシャル（あいこ）：お互いHP -1<br>
    </div>
    <button class="return-btn" onclick="showSection('home')">← ホームに戻る</button>
  `;
}

function showCardList() {
  showSection("cardlist");
  document.getElementById("cardlist").innerHTML = `
    <h2>🃏 カード一覧説明</h2>
    <div class="box">
    <b>▶ 行動カード</b><br>
    👊攻撃：投げ・フェイントに勝ち／防御・カウンターに負け<br>
    🛡防御：攻撃・スマッシュに勝ち／投げ・フェイントに負け<br>
    🤼‍♂️投げ：防御・カウンターに勝ち／攻撃・スマッシュに負け<br><br>
    <b>▶ スペシャルカード</b><br>
    ★フェイント：防御・カウンターに勝ち<br>
    ★スマッシュ：投げ・フェイントに勝ち<br>
    ★カウンター：攻撃・スマッシュに勝ち<br><br>
    ※ 各スペシャルは1回のみ使用可
    </div>
    <button class="return-btn" onclick="showSection('home')">← ホームに戻る</button>
  `;
}

function startMode(mode) {
  showSection("game");
  document.getElementById("game").innerHTML = `
    <h2>${mode === 'cpu' ? '🖥️ CPU対戦' : '👥 対人対戦'}（準備中）</h2>
    <div class="box">
      現在このモードは開発中です。<br>近日実装予定です。<br>
    </div>
    <button class="return-btn" onclick="showSection('home')">← ホームに戻る</button>
  `;
}
