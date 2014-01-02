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
	now = new Date();
	
	seconds = Math.floor(diffSeconds(now, firstJan));
	minutes =  Math.floor(diffMinutes(now, firstJan));
	hours = Math.floor(diffHours(now, firstJan));
	days = Math.floor(diffDays(now, firstJan));
	
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
  firstJan = new Date(lastYear + 1, 0, 1)
  
  __('lastyear').innerHTML = lastYear;
  
  display();
  window.setInterval(display, 1000);
};