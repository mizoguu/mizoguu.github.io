function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function startGame(mode) {
  showScreen('game');
  const title = document.getElementById('modeTitle');
  const content = document.getElementById('gameContent');

  if (mode === 'cpu') {
    title.textContent = "CPU対戦モード";
    content.innerHTML = `
      <p>あなたの行動を選んでください：</p>
      <button onclick="playerMove('攻撃')">攻撃</button>
      <button onclick="playerMove('防御')">防御</button>
      <button onclick="playerMove('投げ')">投げ</button>
      <div id="result"></div>
    `;
  } else {
    title.textContent = "対人戦モード";
    content.innerHTML = `
      <p>プレイヤーAの行動を選んでください：</p>
      <button onclick="setPlayerMove('A', '攻撃')">攻撃</button>
      <button onclick="setPlayerMove('A', '防御')">防御</button>
      <button onclick="setPlayerMove('A', '投げ')">投げ</button>
      <div id="confirmButton" style="display:none;">
        <p>プレイヤーBの行動を選んでください：</p>
        <button onclick="setPlayerMove('B', '攻撃')">攻撃</button>
        <button onclick="setPlayerMove('B', '防御')">防御</button>
        <button onclick="setPlayerMove('B', '投げ')">投げ</button>
      </div>
      <div id="pvpResult"></div>
    `;
  }
}

function playerMove(playerAction) {
  const actions = ['攻撃', '防御', '投げ'];
  const cpuAction = actions[Math.floor(Math.random() * actions.length)];
  const result = judge(playerAction, cpuAction);
  document.getElementById('result').innerHTML = `
    あなた：${playerAction}／CPU：${cpuAction} → 結果：${result}
  `;
}

let playerAMove = "";

function setPlayerMove(player, action) {
  if (player === 'A') {
    playerAMove = action;
    document.getElementById('confirmButton').style.display = 'block';
  } else {
    const playerBMove = action;
    const result = judge(playerAMove, playerBMove);
    document.getElementById('pvpResult').innerText =
      `A：${playerAMove}／B：${playerBMove} → 結果：${result}`;
    document.getElementById('confirmButton').style.display = 'none';
  }
}

function judge(p1, p2) {
  if (p1 === p2) return "あいこ";
  if (
    (p1 === "攻撃" && p2 === "投げ") ||
    (p1 === "防御" && p2 === "攻撃") ||
    (p1 === "投げ" && p2 === "防御")
  ) {
    return "勝ち";
  } else {
    return "負け";
  }
}
