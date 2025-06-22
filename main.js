/* 画面切替 */
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

/* ── CPU対戦ロジック ───────────────── */
const actions = ['攻撃', '防御', '投げ'];
let playerHP, cpuHP;

function startCpu() {
  playerHP = 4;
  cpuHP   = 4;
  updateHP();
  document.getElementById('log').textContent = '';
  show('cpu');
}

function playerMove(playerAct) {
  const cpuAct = actions[Math.floor(Math.random() * actions.length)];
  const result = judge(playerAct, cpuAct);
  applyResult(result);
  log(`${playerAct} vs ${cpuAct} → ${resultText(result)}`);
  updateHP();
  checkGameOver();
}

function judge(p, c) {
  if (p === c) return 'draw';
  if (
    (p === '攻撃' && c === '投げ') ||
    (p === '防御' && c === '攻撃') ||
    (p === '投げ' && c === '防御')
  ) return 'win';
  return 'lose';
}

function applyResult(res) {
  if (res === 'win')  cpuHP--;
  if (res === 'lose') playerHP--;
}

function resultText(res) {
  return res === 'win' ? 'あなたの勝ち！'
       : res === 'lose' ? 'CPUの勝ち！'
       : 'あいこ！';
}

function updateHP() {
  document.getElementById('playerHP').textContent = `あなたの体力: ${playerHP}`;
  document.getElementById('cpuHP').textContent    = `CPUの体力: ${cpuHP}`;
}

function log(text) {
  const el = document.getElementById('log');
  el.textContent += text + '\n';
  el.scrollTop = el.scrollHeight;
}

function checkGameOver() {
  if (playerHP <= 0 || cpuHP <= 0) {
    alert(playerHP <= 0 ? 'CPUの勝ち！' : 'あなたの勝ち！');
    show('home');
  }
}

/* 起動時ホーム */
show('home');
