
function showRule() {
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("ruleScreen").style.display = "block";
}
function showCards() {
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("cardScreen").style.display = "block";
}
function returnHome() {
  document.getElementById("homeScreen").style.display = "block";
  document.getElementById("ruleScreen").style.display = "none";
  document.getElementById("cardScreen").style.display = "none";
}
function startCPU() {
  alert("CPU対戦は現在準備中です");
}
function startVS() {
  alert("対人対戦は現在準備中です");
}
