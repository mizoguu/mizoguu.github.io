function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}
function goHome() {
  document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
  document.getElementById('home-screen').style.display = 'block';
}
