localStorage.setItem("move", "X");
var bordGame = {};
const user1 = {};
const user2 = {};
const GameTypes = {
	PlayerVsPlayer: 0,
	PlayerVsComputer: 1
}
 // gametype:GameTypes =GameTypes.PlayerVsPlayer;
 
function presentGame() {
  document.getElementById("mainBoard").className = "enAbleDiv";
  checkPlayerData();
  document.getElementById("winnerLable").innerHTML = "";
  bordGame = {};
  document.getElementById("playPage").className = "show";
  for (var x = 1; x < 10; x++) {
    document.getElementById("box" + x).innerHTML = "";
    document.getElementById("box" + x).classList.remove("strikeout");
    document.getElementById("box" + x).classList.remove("strikoutColumn");
    document.getElementById("box" + x).classList.remove("strikethrough");
    document.getElementById("box" + x).classList.remove("green-player");
    document.getElementById("box" + x).classList.remove("red-player");
    document.getElementById("box" + x).classList.remove("strikethroughUpSideDown");
    document.getElementById("box" + x).className = "box";
    localStorage.setItem("move", "X");
  }
}

function checkGameType(gameType) {
  if (gameType == 'player') {
    const computerB = document.getElementById('vsComputer');
    gameType=GameTypes.PlayerVsPlayer;
    computerB.checked = false;
  }
  if(gameType == 'comp') {
    const playerB = document.getElementById('vsPlayer');
    gameType=GameTypes.PlayerVsComputer;
    playerB.checked = false;
  }
  presentGame();
}

function isDraw() {
  var counter = 0;
  for (var x = 1; x < 10; x++) {
    if (document.getElementById("box" + x).innerHTML == "") {
      counter += 1;
    }
  }
  if (counter == 0) {
    return true;
  }
  return false;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function checkPlayerData() {
  if (isEmpty(user1)) {
    user1.user = "X";
    user1.movePlay = "X";
  }
  if (isEmpty(user2)) {
    user2.user = "O";
    user2.movePlay = "O";
  }
}

function checkWinner(index, item) {
  bordGame[index] = item;
  var winLine = checkRows();
  var winColumn = checkColumns();
  var winSlunt = checkSlant();
  if (winLine != null) {
    draWinLine(winLine);
    disableBoard();
    return true;
  } else if (winColumn != null) {
    draWinColumn(winColumn);
    disableBoard();
    return true;
  } else if (winSlunt != null) {
    draWinSlunt(winSlunt);
    disableBoard();
    return true;
  }
  return false;
}

function draWinLine(winLine) {
  switch (winLine) {
    case 1:
      document.getElementById("box1").classList.add("strikeout");
      document.getElementById("box2").classList.add("strikeout");
      document.getElementById("box3").classList.add("strikeout");
      break;
    case 2:
      document.getElementById("box4").classList.add("strikeout");
      document.getElementById("box5").classList.add("strikeout");
      document.getElementById("box6").classList.add("strikeout");
      break;
    case 3:
      document.getElementById("box7").classList.add("strikeout");
      document.getElementById("box8").classList.add("strikeout");
      document.getElementById("box9").classList.add("strikeout");
      break;
  }
}

function draWinColumn(winColumn) {
  switch (winColumn) {
    case 4:
      document.getElementById("box1").classList.add("strikoutColumn");
      document.getElementById("box4").classList.add("strikoutColumn");
      document.getElementById("box7").classList.add("strikoutColumn");
      break;
    case 5:
      document.getElementById("box2").classList.add("strikoutColumn");
      document.getElementById("box5").classList.add("strikoutColumn");
      document.getElementById("box8").classList.add("strikoutColumn");
      break;
    case 6:
      document.getElementById("box3").classList.add("strikoutColumn");
      document.getElementById("box6").classList.add("strikoutColumn");
      document.getElementById("box9").classList.add("strikoutColumn");
      break;
  }
}

function draWinSlunt(winSlunt) {
  switch (winSlunt) {
    case 8:
      document.getElementById("box3").classList.add("strikethrough");
      document.getElementById("box5").classList.add("strikethrough");
      document.getElementById("box7").classList.add("strikethrough");
      break;
    case 7:
      document.getElementById("box1").classList.add("strikethroughUpSideDown");
      document.getElementById("box5").classList.add("strikethroughUpSideDown");
      document.getElementById("box9").classList.add("strikethroughUpSideDown");
      break;
  }
}

function checkRows() {
  if (isSplashEmpty(bordGame[1], bordGame[2], bordGame[3])) {
    if (checkSplash(bordGame[1], bordGame[2], bordGame[3])) {
      return 1;
    }
  }
  if (isSplashEmpty(bordGame[4], bordGame[5], bordGame[6])) {
    if (checkSplash(bordGame[4], bordGame[5], bordGame[6])) {
      return 2;
    }
  }
  if (isSplashEmpty(bordGame[7], bordGame[8], bordGame[9])) {
    if (checkSplash(bordGame[7], bordGame[8], bordGame[9])) {
      return 3;
    }
  }
  return null;
}

function checkColumns() {
  if (isSplashEmpty(bordGame[1], bordGame[4], bordGame[7])) {
    if (checkSplash(bordGame[1], bordGame[4], bordGame[7])) {
      return 4;
    }
  }

  if (isSplashEmpty(bordGame[2], bordGame[5], bordGame[8])) {
    if (checkSplash(bordGame[2], bordGame[5], bordGame[8])) {
      return 5;
    }
  }

  if (isSplashEmpty(bordGame[3], bordGame[6], bordGame[9])) {
    if (checkSplash(bordGame[3], bordGame[6], bordGame[9])) {
      return 6;
    }
  }
}

function checkSlant() {
  if (isSplashEmpty(bordGame[1], bordGame[5], bordGame[9])) {
    if (checkSplash(bordGame[1], bordGame[5], bordGame[9])) {
      return 7;
    }
  }

  if (isSplashEmpty(bordGame[3], bordGame[5], bordGame[7])) {
    if (checkSplash(bordGame[3], bordGame[5], bordGame[7])) {
      return 8;
    }
  }
}

function isSplashEmpty(num1, num2, num3) {
  if (num1 != null && num2 != null && num3 != null) {
    return true;
  }
  return false;
}

function checkSplash(num1, num2, num3) {
  if (num1 == num2 && num1 == num3 && num2 == num3) {
    console.log(user1.movePlay);
    if (num1 == user1.movePlay) {
      printWinner(user1.user);
    }
    if (num1 == user2.movePlay) {
      printWinner(user2.user);
    }

    return true;
  }
  return false;
}

function updateResult(winner) {
  var xWins = localStorage.getItem("xWins");
  var oWins = localStorage.getItem("oWins");
  if (winner == "X") {
    if (xWins) {
      var currentRes=Number(xWins);
      localStorage.setItem("xWins", currentRes+1);
      document.getElementById("xWins").innerHTML = currentRes+1;
    }
    else {
      localStorage.setItem("xWins", 1);
      document.getElementById("xWins").innerHTML = 1;
    }
  }
  else {
    if (oWins) {
      var currentRes=Number(oWins);
      localStorage.setItem("oWins", currentRes+1);
      document.getElementById("oWins").innerHTML = currentRes+1;
    }
    else {
      localStorage.setItem("oWins", 1);
      document.getElementById("oWins").innerHTML = 1;
    }
  }
}

function printWinner(name) {
  updateResult(name);
  document.getElementById("winnerLable").innerHTML =
    "well done " + name + " !!!";
}

function resetScore() {
  localStorage.setItem("xWins", "");
  document.getElementById("xWins").innerHTML = 0;
  localStorage.setItem("oWins", "");
  document.getElementById("oWins").innerHTML = 0;
}

function draw(boxId) {
  var move = localStorage.getItem("move");

 // if(gametype == GameTypes.PlayerVsComputer) {
   // localStorage.setItem("move", "X");
   // document.getElementById(boxId).innerHTML = "X";
   // document.getElementById(boxId).className = "red-player";
   // checkWinner(boxId.substr(3, 1), move);
    //compueter turn:
    //var boxToPaint = makeComputerMove()

 // }  
// else{

  const isWin = false;
  if (!document.getElementById(boxId).innerHTML) {
    if (move == "X") {
      document.getElementById(boxId).innerHTML = "X";
      document.getElementById(boxId).className = "red-player";
      localStorage.setItem("move", "O");
    } else {
      document.getElementById(boxId).innerHTML = "O";
      document.getElementById(boxId).className = "green-player";
      localStorage.setItem("move", "X");
    }
    isWin=checkWinner(boxId.substr(3, 1), move);
    move = localStorage.getItem("move");
  }

  if (!isWin) {
  if (isDraw()) {
    document.getElementById("winnerLable").innerHTML = "Its a DRAW !"
    return;
  }
}
//}
}

function disableBoard() { 
    document.getElementById("mainBoard").className = "disableDiv";
}
