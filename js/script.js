function diffMilliseconds(date1, date2) {
  return date1.getTime() - date2.getTime();
}

function diffSeconds(date1, date2) {
  return diffMilliseconds(date1, date2)/1000;
}

function diffMinutes(date1, date2) {
  return diffSeconds(date1, date2)/60;
}

function diffHours(date1, date2) {
  return diffMinutes(date1, date2)/60;
}

function diffDays(date1, date2) {
  return diffHours(date1, date2)/24;
}