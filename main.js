function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function startCpu() {
  showScreen('cpu');
  console.log("CPU対戦モード開始");
}

function startPvP() {
  showScreen('pvp');
  console.log("対人戦モード開始");
}
