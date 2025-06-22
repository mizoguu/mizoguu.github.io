const actions = ["攻撃","防御","投げ"];
let playerHP = 4, cpuHP = 4;

function show(id) {
  document.querySelectorAll('.screen').forEach(e => e.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function startCpu() {
  playerHP = cpuHP = 4;
  updateHP();
  document.getElementById('cpuLog').innerHTML = '';
  show('cpu');
}

function playerAction(choice) {
  const cpuChoice = actions[Math.floor(Math.random() * 3)];
  const res = judge(choice, cpuChoice);
  applyResult(res);
  log(`${choice} vs ${cpuChoice} → ${res==='win'?'あなたの勝ち':res==='lose'?'CPUの勝ち':'あいこ'}`);
  updateHP();
  checkGameOver();
}

function judge(p, c) {
  if(p===c) return "draw";
  if((p==="攻撃"&&c==="投げ")||(p==="防御"&&c==="攻撃")||(p==="投げ"&&c==="防御")) return "win";
  return "lose";
}

function applyResult(res) {
  if(res==="win") cpuHP--;
  else if(res==="lose") playerHP--;
}

function log(txt) {
  const el = document.getElementById('cpuLog');
  el.innerText += txt + "\n";
  el.scrollTop = el.scrollHeight;
}

function updateHP() {
  document.getElementById('playerHP').textContent = `あなたの体力: ${playerHP}`;
  document.getElementById('cpuHP').textContent = `CPUの体力: ${cpuHP}`;
}

function checkGameOver() {
  if(playerHP<=0) {
    alert("CPUの勝ち！");
    show('home');
  } else if(cpuHP<=0) {
    alert("あなたの勝ち！");
    show('home');
  }
}
