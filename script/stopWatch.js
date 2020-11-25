var seconds = 0;
var minutes = 0;
var miliSec = 0;

var displayTime = 0; // stop watch time to be displayed after update
var intervalFunction = 0;
var blinkingFunction = 0;

var count = 1;
var STATE = false;

var lapList = [];

function getTime() {
  var displayMS = 0;
  var displaySec = 0;
  var displayMin = 0;

  //Creating Display Time
  if (miliSec < 10) displayMS = "0" + miliSec.toString();
  else displayMS = miliSec;
  if (seconds < 10) displaySec = "0" + seconds.toString();
  else displaySec = seconds;
  if (minutes < 10) displayMin = "0" + minutes.toString();
  else displayMin = minutes;

  displayTime = displayMin + ":" + displaySec + "." + displayMS;
  return displayTime;
}

function timer() {
  miliSec++;

  if (miliSec / 100 == 1) {
    miliSec = 0;
    seconds++;
  }
  if (seconds / 60 == 1) {
    seconds = 0;
    minutes++;
  }

  document.querySelector(".displayTimer").innerHTML = getTime();
}

function startButton() {
  STATE = true;
  console.log("start");

  document.querySelector("#startButton").style.display = "none";
  document.querySelector("#stopButton").style.display = "block";
  document.querySelector("#lapButton").style.display = "block";
  document.querySelector("#resetButton").style.display = "block";

  intervalFunction = window.setInterval(timer, 10);

  document.querySelector(".displayTimer").style.visibility = "visible";
  window.clearInterval(blinkingFunction);
}

function stopButton() {
  STATE = false;
  console.log("stop");

  document.querySelector("#startButton").style.display = "block";
  document.querySelector("#stopButton").style.display = "none";
  document.querySelector("#lapButton").style.display = "none";
  document.querySelector("#lapButton").style.display = "block";

  window.clearInterval(intervalFunction);

  var blink = true;
  blinkingFunction = window.setInterval(() => {
    console.log("blinking " + blink);

    if (blink)
      document.querySelector(".displayTimer").style.visibility = "hidden";
    else document.querySelector(".displayTimer").style.visibility = "visible";

    blink = !blink;
  }, 700);
}

function resetButton() {
  console.log("Reset");
  STATE = false;
  window.clearInterval(intervalFunction);

  document.querySelector("#startButton").style.display = "block";
  document.querySelector("#stopButton").style.display = "none";
  document.querySelector("#lapButton").style.display = "none";
  document.querySelector("#resetButton").style.display = "none";

  minutes = seconds = miliSec = 0;
  window.clearInterval(blinkingFunction);

  document.querySelector(".displayTimer").style.visibility = "visible";
  document.querySelector(".displayTimer").innerHTML = getTime();

  document.querySelector(".lapTime").innerHTML = "";
  document.querySelector(".lapTimerDiv").style.visibility = "hidden";
  document.querySelector(".buttons").style.bottom = "100px";
  document.querySelector(".timer").style.marginTop = "var(--topMargin)";

  count = 1;
}

function lapButton() {
  if (STATE == false) return;
  document.querySelector(".lapTimerDiv").style.visibility = "visible";
  document.querySelector(".timer").style.marginTop = "100px";
  document.querySelector(".buttons").style.bottom = "70px";

  var p = document.createElement("h4");
  p.innerHTML = count + "." + getTime();
  count++;
  document.querySelector(".lapTime").appendChild(p);
}

//Event listener for keyBoard functionality
document.addEventListener("keypress", (e) => {
  console.log(`key=${e.key},code=${e.code}`);
  if (e.code === "Space") STATE ? stopButton() : startButton();
  if (e.code === "KeyL") lapButton();
  if (e.code === "KeyR") resetButton();
});
