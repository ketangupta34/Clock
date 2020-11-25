var interval;
var blinkingFunction;
var mn;

function startCDB() {
  //making sure if fields are visible on restart and BLINK is off
  document.querySelector("#hrInputField").style.visibility = "visible";
  document.querySelector("#mnInputField").style.visibility = "visible";
  document.querySelector("#scInputField").style.visibility = "visible";
  clearInterval(blinkingFunction);

  const hrVal = document.getElementById("hrInputField");
  const mnVal = document.getElementById("mnInputField");
  const scVal = document.getElementById("scInputField");

  //Get input time
  var hr = hrVal.value;
  mn = mnVal.value;
  var sc = scVal.value;

  // Validate Time
  if (hr > 60 || mn > 60 || sc > 60) {
    window.alert("Enter Correct Time");
    return;
  }
  if (hr === "00" && mn === "00" && sc === "00") {
    window.alert("Enter Time");
    return;
  }

  //removing 'enter time' heading
  document.querySelector(".timeHeading").style.visibility = "hidden";

  //button toggle on start
  document.querySelector("#startCDB").style.display = "none";
  document.querySelector("#stopCDB").style.display = "block";
  document.querySelector("#deleteCDB").style.display = "block";
  document.querySelector("#addMinuteCDB").style.display = "block";

  //convert string time to integer
  sc = Number(sc);
  hr = Number(hr);
  mn = Number(mn);

  console.log(hr, mn, sc); // debug

  interval = window.setInterval(() => {
    sc--;

    if (sc == -1) {
      mn--;
      sc = 59;
    }
    if (mn == -1 && hr != 0) {
      hr--;
      mn = 59;
    }

    if (sc == 0 && hr == 0 && mn == 0) {
      hrVal.value = "00";
      mnVal.value = "00";
      scVal.value = "00";
      console.log("finished");
      window.clearInterval(interval);

      partyMode();

      return;
    }

    var displayHr = 0;
    var displayMn = 0;
    var displaySc = 0;

    if (hr < 10) displayHr = "0" + hr.toString();
    else displayHr = hr;
    if (mn < 10) displayMn = "0" + mn.toString();
    else displayMn = mn;
    if (sc < 10) displaySc = "0" + sc.toString();
    else displaySc = sc;

    hrVal.value = displayHr;
    mnVal.value = displayMn;
    scVal.value = displaySc;
  }, 1000);
}

function stopCDB() {
  clearInterval(interval); // stop decrementing time

  //BLINk function
  var blink = true;
  blinkingFunction = window.setInterval(() => {
    console.log("blinking 2 " + blink);

    if (blink) {
      document.querySelector("#hrInputField").style.visibility = "hidden";
      document.querySelector("#mnInputField").style.visibility = "hidden";
      document.querySelector("#scInputField").style.visibility = "hidden";
    } else {
      document.querySelector("#hrInputField").style.visibility = "visible";
      document.querySelector("#mnInputField").style.visibility = "visible";
      document.querySelector("#scInputField").style.visibility = "visible";
    }

    blink = !blink;
  }, 700);

  // button toggle on pause
  document.querySelector("#startCDB").style.display = "block";
  document.querySelector("#stopCDB").style.display = "none";
}

function deleteCDB() {
  //Resetting every field on delete
  document.querySelector("#hrInputField").style.visibility = "visible";
  document.querySelector("#mnInputField").style.visibility = "visible";
  document.querySelector("#scInputField").style.visibility = "visible";
  document.querySelector(".timeHeading").style.visibility = "visible";

  document.querySelector("#startCDB").style.display = "block";
  document.querySelector("#stopCDB").style.display = "none";
  document.querySelector("#deleteCDB").style.display = "none";
  document.querySelector("#addMinuteCDB").style.display = "none";

  document.getElementById("hrInputField").value = "00";
  document.getElementById("mnInputField").value = "00";
  document.getElementById("scInputField").value = "00";

  clearInterval(blinkingFunction);
  clearInterval(interval);
}

function addMinuteCDB() {
  mn++; // adding 1 minute to global variable
}

function partyMode() {
  console.log("partyMode");
  document.querySelector(".overCD").style.display = "flex";
}

function partyModeOff() {
  document.querySelector(".overCD").style.display = "none";
}
