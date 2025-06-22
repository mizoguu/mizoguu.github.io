function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

let pvpTurn = 0;
let pvpChoices = [];

function startPvP() {
  showScreen('pvp');
  pvpTurn = 0;
  pvpChoices = [];
  document.getElementById('pvpStatus').innerText = `プレイヤー1の選択`;
  document.getElementById('playerInput').innerHTML = generateChoiceButtons('pvpSelect');
  document.getElementById('confirmBtn').style.display = 'block';
}

function pvpSelect(choice) {
  pvpChoices.push(choice);
  if (pvpChoices.length === 1) {
    document.getElementById('pvpStatus').innerText = `プレイヤー2の選択`;
    document.getElementById('playerInput').innerHTML = generateChoiceButtons('pvpSelect');
  } else {
    document.getElementById('pvpStatus').innerText = `確認を押してください`;
    document.getElementById('playerInput').innerHTML = '';
  }
}

function confirmChoices() {
  const [p1, p2] = pvpChoices;
  let result = `P1：${p1} vs P2：${p2} → `;
  if (p1 === p2) result += '引き分け';
  else if (
    (p1 === '攻撃' && p2 === '投げ') ||
    (p1 === '投げ' && p2 === '防御') ||
    (p1 === '防御' && p2 === '攻撃')
  ) result += 'P1の勝ち';
  else result += 'P2の勝ち';

  document.getElementById('pvpStatus').innerText = result;
  document.getElementById('confirmBtn').style.display = 'none';
}

function generateChoiceButtons(fnName) {
  return ['攻撃', '防御', '投げ'].map(action =>
    `<button onclick="${fnName}('${action}')">${action}</button>`
  ).join('');
}

function startCPU() {
  showScreen('cpu');
  document.getElementById('cpuStatus').innerText = 'あなたの選択';
  document.getElementById('cpuInput').innerHTML = generateChoiceButtons('cpuSelect');
}

let userChoice = '';

function cpuSelect(choice) {
  userChoice = choice;
  document.getElementById('cpuStatus').innerText = '確認を押してください';
  document.getElementById('cpuInput').innerHTML = '';
  document.getElementById('cpuConfirmBtn').style.display = 'block';
}

function confirmCPU() {
  const cpuChoice = ['攻撃', '防御', '投げ'][Math.floor(Math.random() * 3)];
  let result = `あなた：${userChoice} vs CPU：${cpuChoice} → `;

  if (userChoice === cpuChoice) result += '引き分け';
  else if (
    (userChoice === '攻撃' && cpuChoice === '投げ') ||
    (userChoice === '投げ' && cpuChoice === '防御') ||
    (userChoice === '防御' && cpuChoice === '攻撃')
  ) result += 'あなたの勝ち';
  else result += 'CPUの勝ち';

  document.getElementById('cpuStatus').innerText = result;
  document.getElementById('cpuConfirmBtn').style.display = 'none';
}
