function getDayName(day) {
  var dayList = ["Mon", "Tue", "Wed", "Fri", "Sat", "Sun"];
  return dayList[day];
}

function getFullDate(date, month, year) {
  var monthList = [
    "jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date} ${monthList[month]}, ${year}`;
}

function getFullTime(hr, mn, sc) {
  var post = "";
  if (hr > 12) {
    post = "PM";
    hr = hr - 12;
  } else {
    hr = 12 + hr;
    post = "AM";
  }

  if (hr < 10) hr = "0" + hr.toString();
  if (mn < 10) mn = "0" + mn.toString();
  if (sc < 10) sc = "0" + sc.toString();

  return `${hr}:${mn}:${sc} ${post}`;
}

window.setInterval(() => {
  let date = new Date();

  let day = getDayName(date.getDay());
  let fullDate = getFullDate(
    date.getDate(),
    date.getMonth(),
    date.getFullYear()
  );
  let fullTime = getFullTime(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );

  let hh = date.getHours() * 30;
  let mm = date.getMinutes() * 6;
  let ss = date.getSeconds() * 6;

  document.querySelector("#hr").style.transform = `rotateZ(${hh + mm / 12}deg)`;
  document.querySelector("#mn").style.transform = `rotateZ(${mm}deg)`;
  document.querySelector("#sc").style.transform = `rotateZ(${ss}deg)`;

  document.querySelector("#date").innerHTML = `${day} ${fullDate}`;
  document.querySelector("#time").innerHTML = fullTime;
});
