let mode = '';
let myHP = 4;
let oppHP = 4;
let mySpecial = "フェイント";
let specialUsed = false;
let player1Move = '';
let player2Move = '';

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function startGame(selectedMode) {
  mode = selectedMode;
  myHP = 4;
  oppHP = 4;
  specialUsed = false;
  showScreen('gameScreen');
  document.getElementById('status').textContent = "スペシャルカード: " + mySpecial + "（1回）";
}

function makeMove(move) {
  if (mode === 'cpu') {
    const options = ['攻撃', '防御', '投げ'];
    const oppMove = options[Math.floor(Math.random() * options.length)];
    processResult(move, oppMove);
  } else {
    if (player1Move === '') {
      player1Move = move;
      document.getElementById('status').textContent = "1Pが選択しました。2Pの入力を待っています。";
    } else {
      player2Move = move;
      processResult(player1Move, player2Move);
      player1Move = '';
      player2Move = '';
    }
  }
}

function useSpecial() {
  if (specialUsed) {
    alert("もう使えません！");
    return;
  }
  specialUsed = true;
  alert("スペシャルカード「" + mySpecial + "」を使用しました！");
}

function processResult(my, opp) {
  let result = `あなた: ${my} ／ 相手: ${opp} → `;

  if (my === opp) {
    result += "あいこ！";
  } else if (
    (my === '攻撃' && opp === '投げ') ||
    (my === '投げ' && opp === '防御') ||
    (my === '防御' && opp === '攻撃')
  ) {
    result += "あなたの勝ち！";
    oppHP--;
  } else {
    result += "あなたの負け！";
    myHP--;
  }

  result += ` あなた: ${myHP} / 相手: ${oppHP}`;

  document.getElementById('status').textContent = result;

  if (myHP <= 0 || oppHP <= 0) {
    setTimeout(() => {
      alert(myHP <= 0 ? "あなたの負け！" : "あなたの勝ち！");
      showScreen('homeScreen');
    }, 300);
  }
}
