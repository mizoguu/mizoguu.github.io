function showHome() {
  hideAll();
  document.getElementById("home").style.display = "block";
}

function showRule() {
  hideAll();
  document.getElementById("rule").style.display = "block";
}

function showCards() {
  hideAll();
  document.getElementById("cards").style.display = "block";
}

function startCPU() {
  hideAll();
  document.getElementById("gameArea").style.display = "block";
  // CPU対戦ロジックをここに実装予定
}

function startPvP() {
  hideAll();
  document.getElementById("gameArea").style.display = "block";
  // 対人戦ロジックをここに実装予定
}

function hideAll() {
  document.getElementById("home").style.display = "none";
  document.getElementById("rule").style.display = "none";
  document.getElementById("cards").style.display = "none";
  document.getElementById("gameArea").style.display = "none";
}
