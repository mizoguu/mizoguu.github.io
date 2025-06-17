
function startGame() {
  const specials = ['フェイント', 'カウンター', 'スマッシュ'];
  const randomCard = specials[Math.floor(Math.random() * specials.length)];
  document.getElementById("log").innerText = "あなたのスペシャルカード: " + randomCard + "（1回のみ）";
}
