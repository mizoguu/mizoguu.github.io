let gameMode = ''; // 'cpu' or 'pvp'
let turn = 'A'; // P1→P2→表示へ
let myHP = 5, oppHP = 5;
let specialA = '', specialB = '';
let specialUsedA = false, specialUsedB = false;
let moveA = null, moveB = null;
let usedSpecialA = false, usedSpecialB = false;

const moves = ['攻撃', '防御', '投げ'];
const specials = ['フェイント', 'カウンター', 'スマッシュ'];

function selectMode(mode) {
  gameMode = mode;
  document.getElementById("modeSelection").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
}

function startGame() {
  myHP = 5;
  oppHP = 5;
  moveA = null;
  moveB = null;
  specialA = specials[Math.floor(Math.random() * 3)];
  specialB = specials[Math.floor(Math.random() * 3)];
  specialUsedA = false;
  specialUsedB = false;
  turn = 'A';

  updateHP();
  updateSpecialDisplay();
  setLog('');
  document.getElementById("specialBtn").style.display = "inline-block";
  document.getElementById("actionArea").style.display = "block";

  if (gameMode === 'cpu') {
    setLog(`あなたのスペシャルカード: ${specialA}（1回のみ）`);
  } else {
    setLog("プレイヤーAの番です");
  }
}

function updateHP() {
  document.getElementById("myHP").innerText = "❤️".repeat(myHP);
  document.getElementById("oppHP").innerText = "❤️".repeat(oppHP);
}

function updateSpecialDisplay() {
  if (gameMode === 'cpu') {
    document.getElementById("specialDisplay").innerText =
      `スペシャルカード: ${specialA} ${specialUsedA ? "（使用済）" : "（1回）"}`;
  } else {
    const sp = (turn === 'A') ? specialA : specialB;
    const used = (turn === 'A') ? specialUsedA : specialUsedB;
    document.getElementById("specialDisplay").innerText =
      `スペシャルカード: ${sp} ${used ? "（使用済）" : "（1回）"}`;
    document.getElementById("playerTurn").innerText =
      `プレイヤー${turn}の番`;
  }
}

function setLog(text) {
  document.getElementById("log").innerText = text;
}

function useSpecial() {
  if (gameMode === 'cpu' && specialUsedA) return alert("もう使えません！");
  if (gameMode === 'pvp') {
    if ((turn === 'A' && specialUsedA) || (turn === 'B' && specialUsedB)) {
      return alert("もう使えません！");
    }
  }
  if (turn === 'A') specialUsedA = true;
  else specialUsedB = true;
  document.getElementById("specialBtn").style.display = "none";
  updateSpecialDisplay();
}

function chooseAction(playerMove) {
  if (gameMode === 'cpu') {
    const cpuMove = moves[Math.floor(Math.random() * 3)];
    const result = judge(playerMove, cpuMove, specialUsedA, false, specialA, null);
    applyDamage(result);
    setLog(`あなた: ${playerMove} ／ 相手: ${cpuMove}\n${result.log}`);
  } else {
    if (turn === 'A') {
      moveA = playerMove;
      document.getElementById("actionArea").style.display = "none";
      document.getElementById("specialBtn").style.display = "none";
      turn = 'B';
      updateSpecialDisplay();
      setLog("プレイヤーBの番です");
      document.getElementById("actionArea").style.display = "block";
      document.getElementById("specialBtn").style.display = specialUsedB ? "none" : "inline-block";
    } else {
      moveB = playerMove;
      document.getElementById("actionArea").style.display = "none";
      document.getElementById("specialBtn").style.display = "none";
      const result = judge(moveA, moveB, specialUsedA, specialUsedB, specialA, specialB);
      applyDamage(result);
      setLog(`A: ${moveA} ／ B: ${moveB}\n${result.log}`);
      turn = 'A';
      moveA = null;
      moveB = null;
      specialUsedA = false;
      specialUsedB = false;
      updateSpecialDisplay();
      document.getElementById("actionArea").style.display = "block";
      document.getElementById("specialBtn").style.display = "inline-block";
    }
  }
  updateHP();
}

function applyDamage({ damageToA, damageToB }) {
  myHP -= damageToA;
  oppHP -= damageToB;
  if (myHP <= 0 || oppHP <= 0) {
    const msg = myHP <= 0 && oppHP <= 0 ? "引き分け！" :
                myHP <= 0 ? "あなたの負け！" : "あなたの勝ち！";
    setLog(msg);
    document.getElementById("actionArea").style.display = "none";
    document.getElementById("specialBtn").style.display = "none";
  }
}

// 勝敗判定（Rev.Aルール対応）
function judge(p1, p2, sp1, sp2, card1, card2) {
  let dmgA = 0, dmgB = 0, log = '';
  const s1 = sp1 ? card1 : null;
  const s2 = sp2 ? card2 : null;

  // スペシャル vs スペシャル
  if (s1 && s2) {
    if (wins(s1, s2)) {
      dmgB = 1;
      log = `スペシャル同士！${s1}が勝利（相手-1 自分+1）`;
      myHP++; // 回復
    } else if (wins(s2, s1)) {
      dmgA = 1;
      log = `スペシャル同士！${s2}が勝利（相手-1 自分+1）`;
      oppHP++;
    } else {
      dmgA = 1;
      dmgB = 1;
      log = `スペシャル同士のあいこ！（両者-1）`;
    }
  }
  // スペシャル vs ノーマル
  else if (s1 && !s2) {
    if (wins(card1, p2)) {
      dmgB = 2;
      log = `スペシャル成功！（相手-2）`;
    } else {
      dmgA = 1;
      log = `スペシャル失敗（自分-1）`;
    }
  }
  else if (!s1 && s2) {
    if (wins(card2, p1)) {
      dmgA = 2;
      log = `相手スペシャル成功！（あなた-2）`;
    } else {
      dmgB = 1;
      log = `相手スペシャル失敗（相手-1）`;
    }
  }
  // ノーマル vs ノーマル
  else {
    if (p1 === p2) {
      log = 'あいこ！';
    } else if (wins(p1, p2)) {
      dmgB = 1;
      log = 'あなたの勝ち！';
    } else {
      dmgA = 1;
      log = 'あなたの負け！';
    }
  }

  return { damageToA: dmgA, damageToB: dmgB, log };
}

// 勝ち判定ロジック（行動とスペシャル両方）
function wins(a, b) {
  const winMap = {
    '攻撃': ['投げ', 'フェイント'],
    '防御': ['攻撃', 'スマッシュ'],
    '投げ': ['防御', 'カウンター'],
    'フェイント': ['防御', 'カウンター'],
    'カウンター': ['攻撃', 'スマッシュ'],
    'スマッシュ': ['投げ', 'フェイント'],
  };
  return winMap[a]?.includes(b);
}
