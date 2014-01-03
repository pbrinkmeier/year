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

function myRound(number, places) {
	return Math.round(number*Math.pow(10, places))/Math.pow(10, places);
}

function isLeapYear(year) {
	var isLeapYear = false;
	
	if (year % 4 == 0) {
		isLeapYear = true;
	}
	if (year % 100 == 0) {
		isLeapYear = false;
	}
	if (year % 400 == 0) {
		isLeapYear = true;
	}
	
	return isLeapYear;
}

function getYearLength(year) {
	var days = 365;
	
	if (isLeapYear(year)) {
		days++;
	}
	
	return days * 24 * 60 * 60 * 1000;
}

function withS(number) {
	if (Math.floor(number) == 1) {
		return false;
	} else {
		return true;
	}
}

function __(id) {
	return document.getElementById(id);
}

function display() {
	var now = new Date();
	
	var percentage = myRound(100 * (diffMilliseconds(now, firstJan)/getYearLength(lastYear + 1)), 2) + '%';
	
	var seconds = Math.floor(diffSeconds(now, firstJan));
	var minutes =  Math.floor(diffMinutes(now, firstJan));
	var hours = Math.floor(diffHours(now, firstJan));
	var days = myRound(diffDays(now, firstJan), 1);
	
	__('percentage').innerHTML = percentage;
	__('bar').style.width = percentage;
	
	__('seconds').innerHTML = seconds;
	__('label-seconds').innerHTML = 'second' + (withS(seconds)?'s':'') + ' or';
	
	__('minutes').innerHTML = minutes;
	__('label-minutes').innerHTML = 'minute' + (withS(minutes)?'s':'') + ' or';
	
	__('hours').innerHTML = hours;
	__('label-hours').innerHTML = 'hour' + (withS(hours)?'s':'') + ' or';
	
	__('days').innerHTML = days;
	__('label-days').innerHTML = 'day' + (withS(days)?'s':'') + ' since';
	
}

window.onload = function() {
  lastYear = (new Date()).getFullYear() - 1;
  firstJan = new Date(lastYear + 1, 0, 1);
  
  __('lastyear').innerHTML = lastYear;
  __('nextyear').innerHTML = lastYear + 2;
  
  display();
  window.setInterval(display, 1000);
};