let players = [
  { hp: 4, move: null, special: null, used: false },
  { hp: 4, move: null, special: null, used: false }
];
let turn = 0; // 0: A, 1: B
let phase = "A選択"; // A入力 → B入力 → 結果

function startGame() {
  // ランダムにスペシャルカード配布
  const specials = ['フェイント', 'カウンター', 'スマッシュ'];
  players[0].special = specials[Math.floor(Math.random() * specials.length)];
  players[1].special = specials[Math.floor(Math.random() * specials.length)];
  players[0].hp = players[1].hp = 4;
  players[0].used = players[1].used = false;

  phase = "A選択";
  turn = 0;
  updateUI();
  showLog("プレイヤーAの入力です");
}

function updateUI() {
  const player = players[turn];
  document.getElementById("specialDisplay").innerText =
    `★カード：${player.special}${player.used ? "（使用済）" : "（未使用）"}`;
  document.getElementById("hpArea").innerText =
    `あなた：${"❤️".repeat(players[0].hp)} ／ 相手：${"❤️".repeat(players[1].hp)}`;
  document.getElementById("specialBtn").style.display = player.used ? "none" : "inline-block";
  document.getElementById("actionArea").style.display = "block";
  document.getElementById("confirmArea").style.display = "block";
}

function chooseAction(move) {
  players[turn].move = move;
  showLog(`あなたの選択：${move}`);
}

function useSpecial() {
  if (players[turn].used) return;
  players[turn].used = true;
  showLog(`★スペシャルカード「${players[turn].special}」を使用！`);
  updateUI();
}

function confirmTurn() {
  if (!players[turn].move) {
    alert("行動を選択してください");
    return;
  }
  if (phase === "A選択") {
    turn = 1;
    phase = "B選択";
    showLog("プレイヤーBの入力です");
    updateUI();
  } else if (phase === "B選択") {
    resolveBattle();
    phase = "A選択";
    turn = 0;
    players[0].move = players[1].move = null;
    updateUI();
  }
}

function resolveBattle() {
  const p1 = players[0], p2 = players[1];
  let result = `A：${p1.move}${p1.used ? `＋${p1.special}` : ""}\n`;
  result += `B：${p2.move}${p2.used ? `＋${p2.special}` : ""}\n`;

  const p1type = p1.used ? "special" : "normal";
  const p2type = p2.used ? "special" : "normal";
  const winner = determineWinner(p1.move, p2.move, p1.special, p2.special, p1type, p2type);

  if (winner === "draw") {
    result += "結果：あいこ（両者HP変動なし）";
  } else if (winner === "A") {
    const damage = getDamage(p1type, p2type);
    p2.hp -= damage[0];
    p1.hp += damage[1];
    if (p1.hp > 4) p1.hp = 4;
    result += `Aの勝ち！ → BのHP-${damage[0]} / AのHP+${damage[1]}`;
  } else {
    const damage = getDamage(p2type, p1type);
    p1.hp -= damage[0];
    p2.hp += damage[1];
    if (p2.hp > 4) p2.hp = 4;
    result += `Bの勝ち！ → AのHP-${damage[0]} / BのHP+${damage[1]}`;
  }

  if (p1.hp <= 0) result += "\n🎉 Bの勝利！";
  else if (p2.hp <= 0) result += "\n🎉 Aの勝利！";

  showLog(result);
}

function determineWinner(a, b, sa, sb, ta, tb) {
  if (ta === "normal" && tb === "normal") {
    if (a === b) return "draw";
    if (
      (a === '攻撃' && b === '投げ') ||
      (a === '防御' && b === '攻撃') ||
      (a === '投げ' && b === '防御')
    ) return "A";
    return "B";
  }

  if (ta === "special" && tb === "normal") {
    if (specialWins(sa, b)) return "A";
    return "B";
  }

  if (ta === "normal" && tb === "special") {
    if (specialWins(sb, a)) return "B";
    return "A";
  }

  if (ta === "special" && tb === "special") {
    if (sa === sb) return "draw";
    if (specialWins(sa, sb)) return "A";
    return "B";
  }
  return "draw";
}

function specialWins(card, target) {
  const chart = {
    フェイント: ['防御', 'カウンター'],
    スマッシュ: ['投げ', 'フェイント'],
    カウンター: ['攻撃', 'スマッシュ']
  };
  return chart[card]?.includes(target);
}

function getDamage(typeWin, typeLose) {
  if (typeWin === "special" && typeLose === "normal") return [2, 0];
  if (typeWin === "special" && typeLose === "special") return [1, 1];
  if (typeWin === "normal" && typeLose === "normal") return [1, 0];
  return [0, 0];
}

function showLog(text) {
  document.getElementById("log").innerText = text;
}
