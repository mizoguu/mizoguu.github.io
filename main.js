// showRules → openRule に改名
function openRule() { /* ここの中身は showRules と同じ */ }

// showCards → openCardList に改名
function openCardList() { /* 中身は showCards と同じ */ }

// CPU / PvP 起動用のラッパーを用意
function selectMode(mode){
  if(mode==='cpu'){ startCPU(); }
  else{ startPvP(); }
}
