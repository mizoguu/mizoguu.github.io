function openRule() {
  document.getElementById("home").style.display = "none";
  document.getElementById("cardList").style.display = "none";
  document.getElementById("rule").style.display = "block";
  document.getElementById("rule").innerHTML = `
    <h2>📘 ルールブック</h2>
    <p><b>基本ルール：</b> 攻撃・防御・投げの3すくみ＋スペシャルカードで勝敗を決するゲームです。</p>
    <p><b>勝利条件：</b> 相手のHPを0にすれば勝ち（ノーマル4点／ハード5点）</p>
    <p><b>ターンの流れ：</b><br>
    ① 行動カードを伏せる → ② 必要ならスペシャル宣言 → ③ 同時公開→勝敗・HP変動</p>
    <button onclick="goHome()">← ホームに戻る</button>
  `;
}

function openCardList() {
  document.getElementById("home").style.display = "none";
  document.getElementById("rule").style.display = "none";
  document.getElementById("cardList").style.display = "block";
  document.getElementById("cardList").innerHTML = `
    <h2>🃏 カード一覧説明</h2>
    <h3>▶ 行動カード</h3>
    👊攻撃：投げ・フェイントに勝ち／防御・カウンターに負け<br>
    🛡防御：攻撃・スマッシュに勝ち／投げ・フェイントに負け<br>
    🤼‍♂️投げ：防御・カウンターに勝ち／攻撃・スマッシュに負け
    <h3>▶ スペシャルカード</h3>
    ★フェイント：防御・カウンターに勝ち<br>
    ★スマッシュ：投げ・フェイントに勝ち<br>
    ★カウンター：攻撃・スマッシュに勝ち
    <p><b>※ 使用は1回のみ。勝てば大ダメージ！</b></p>
    <button onclick="goHome()">← ホームに戻る</button>
  `;
}

function selectMode(mode) {
  alert(mode === 'cpu' ? "CPU対戦を開始します（未実装）" : "対人対戦を開始します（未実装）");
}

function goHome() {
  document.getElementById("home").style.display = "block";
  document.getElementById("rule").style.display = "none";
  document.getElementById("cardList").style.display = "none";
}
