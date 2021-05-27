
//Cookie Handling
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//Scramble Generation
const moves = ["R", "L", "U","D","F","B","R'","U'", "D'", "F'", "B'", "L'"];
function genScramble() {
var i;
var scramble = "";
for (i = 0; i < 21; i++) {
  var randint = Math.floor(Math.random() * moves.length);
  scramble += moves[randint] + " ";
}
document.getElementById("scramblearea").innerHTML = scramble
TTk.TwistyPuzzle(3)
	.alg("M2 E2 S2")
	('#tp');
}

//Timer function
var running = false;
var interval;
var decimal = 0;
var sec = 0;
var min = 0;
var cs = 0;
var decimalOut = document.getElementById("decimal");
var secOut = document.getElementById("sec");
var minOut = document.getElementById("min");
var colon = document.getElementById("colon");
var timesOut = document.getElementById("timeOut");
var timesList = document.getElementById("timeList");
var clearAll = document.getElementById("clear");
var timesDisplay = new Array();
var csTimes = new Array();
var avAll = 0;
var avAllOut = document.getElementById("overallAv");
var best = 999999999999999999;
var bestOut = document.getElementById("fastest");
var worst = 0;
var numSolves = 0;
var total = 0;

function timer() {
  decimal++;
  cs++; //counts time in centiseconds
  decimalOut.innerHTML = decimal;
  if (decimal >= 100) {
    decimal = 0;
    sec++;

    if (sec > 59) {
      sec = 0;
      min++;
      colon.innerHTML = ":";
      minOut.innerHTML = min;
    }
    if (sec <= 9 && min > 0) {
      sec = "0" + sec;
    }
    secOut.innerHTML = sec;
  }

  if (decimal <= 9) {
    decimal = '0' + decimal;
    decimalOut.innerHTML = decimal;
  }

}
window.onkeyup = run;

function run() {
  if (!running) {
    decimal = 0;
    sec = 0;
    min = 0;
    cs = 0;
    secOut.innerHTML = "0";
    minOut.innerHTML = "";
    colon.innerHTML = "";
    running = true;
    scramble = "";
    interval = setInterval(timer, 10);
  } else if (running) {
    running = false;
    clearInterval(interval);
    timesDisplay.push(" " + timesOut.innerHTML);
    csTimes.push(cs);
    timesList.innerHTML = timesDisplay;
    calculateStats();
    setCookie("timesList", timesDisplay, 10000)
  }
}
function clearTimes() {
  numSolves = 0;
  numSolvesOut.innerHTML = numSolves;
  best = 99999999999;
  bestOut.innerHTML = "Best: ";
  worst = 0;
  avAll = 0;
  total = 0;
  avAllOut.innerHTML = "Average: ";
  timesDisplay = [];
  csTimes = [];
  timesList.innerHTML = timesDisplay;
}

function calculateStats() {
  numSolves++;
  total = 0;
  numSolvesOut = document.getElementById("numSolvesOut")
  numSolvesOut.innerHTML = numSolves;
  for (var x = 0; x < csTimes.length; x++) {
    if (csTimes[x] < best) {
      best = csTimes[x];
    }
    if (csTimes[x] > worst) {
      worst = csTimes[x];
    }
    total += csTimes[x];
  }
  avAll = total / numSolves;
  avAllOut.innerHTML = formatTime(avAll);
  bestOut.innerHTML =  formatTime(best);
}

function formatTime(t) {
  //m = minute, s = second, c = centisecond
  var m = 0,
    s = 0,
    c = 0,
    out = "";
  m = Math.floor(t / 6000);
  t = t % 6000;
  s = Math.floor(t / 100);
  t = t % 100;
  c = Math.floor(t);
  if (m < 1) {
    m = "";
  } else {
    m = m + ":";
    if (s < 10) {
      s = "0" + s;
    }
  }
  if (c < 10) {
    c = "0" + c;
  }

  out = "" + m + s + "." + c;
  return out;
}

//Inspection
window.onIns = false
function startIns() {
  if (window.onIns == false) {
  window.tiVar = setInterval(insTimer, 1000);
  window.t = 15;
  window.onIns = true
  }
}
function insTimer() {
  if (window.t > 0) {
  document.getElementById("insOut").innerHTML = window.t;
  window.t -= 1;
}
else {
  t = 15
  clearInterval(window.tiVar);
  window.onIns = false;
}
}
