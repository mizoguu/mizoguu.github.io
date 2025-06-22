function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function startPvp() {
  showScreen('pvp');
  console.log("対人戦モード開始");
}
