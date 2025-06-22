let playerHP = 4;
let cpuHP = 4;

function startGame() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  updateHP();
}

function playerSelect(playerCard) {
  const cards = ['攻撃', '防御', '投げ'];
  const cpuCard = cards[Math.floor(Math.random() * 3)];
  const result = judge(playerCard, cpuCard);
  applyResult(result);
  showResult(playerCard, cpuCard, result);
  updateHP();
  checkWin();
}

function judge(p, c) {
  if (p === c) return 'draw';
  if (
    (p === '攻撃' && c === '投げ') ||
    (p === '防御' && c === '攻撃') ||
    (p === '投げ' && c === '防御')
  ) {
    return 'win';
  }
  return 'lose';
}

function applyResult(result) {
  if (result === 'win') cpuHP--;
  else if (result === 'lose') playerHP--;
}

function showResult(p, c, result) {
  const msg = {
    win: "あなたの勝ち！",
    lose: "CPUの勝ち！",
    draw: "あいこ！"
  };
  document.getElementById('resultArea').innerHTML = 
    `あなた：${p} ／ CPU：${c} → ${msg[result]}`;
}

function updateHP() {
  document.getElementById('playerHP').textContent = `あなたの体力: ${playerHP}`;
  document.getElementById('cpuHP').textContent = `CPUの体力: ${cpuHP}`;
}

function checkWin() {
  if (playerHP <= 0) {
    alert("CPUの勝ち！");
    resetGame();
  } else if (cpuHP <= 0) {
    alert("あなたの勝ち！");
    resetGame();
  }
}

function resetGame() {
  playerHP = 4;
  cpuHP = 4;
  document.getElementById('resultArea').textContent = '';
  document.getElementById('home').style.display = 'block';
  document.getElementById('game').style.display = 'none';
}
