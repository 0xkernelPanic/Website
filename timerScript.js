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