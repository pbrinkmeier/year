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

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function __(id) {
	return document.getElementById(id);
}

function display() {
	var now = new Date();
	
	var percentage = myRound(100 * (diffMilliseconds(now, firstJan)/yearLengthMilliseconds), 2) + '%';
	
	var seconds = Math.floor(diffSeconds(now, firstJan));
	var minutes =  Math.floor(diffMinutes(now, firstJan));
	var hours = Math.floor(diffHours(now, firstJan));
	var days = myRound(diffDays(now, firstJan), 1);
	
	if (which == 'remaining') {
		seconds = yearLengthSeconds - seconds;
		minutes = yearLengthMinutes - minutes;
		hours = yearLengthHours - hours;
		days = yearLengthDays - days;
	}
	
	__('percentage').innerHTML = percentage;
	__('bar').style.width = percentage;
	
	__('seconds').innerHTML = addCommas(seconds);
	
	__('minutes').innerHTML = addCommas(minutes);
	
	__('hours').innerHTML = addCommas(hours);
	
	__('days').innerHTML = days;
	
	//clear on nye
	if (diffMilliseconds(now, firstJan) > yearLengthMilliseconds) {
		window.clearInterval(running);
	}
}

window.onload = function() {
	which = 'elapsed';
	__('switch').innerHTML = 'show remaining';

	thisYear = (new Date()).getFullYear();
	firstJan = new Date(thisYear, 0, 1);
	yearLengthMilliseconds = getYearLength(thisYear);
	yearLengthSeconds = Math.round(yearLengthMilliseconds/1000);
	yearLengthMinutes = Math.round(yearLengthSeconds/60);
	yearLengthHours = Math.round(yearLengthMinutes/60);
	yearLengthDays = Math.round(yearLengthHours/24);

	__('lastyear').innerHTML = thisYear - 1;
	__('thisyear').innerHTML = thisYear;

	__('label-seconds').innerHTML = 'of ' + addCommas(yearLengthSeconds) + ' seconds or';
	__('label-minutes').innerHTML = 'of ' + addCommas(yearLengthMinutes) + ' minutes or';
	__('label-hours').innerHTML = 'of ' + addCommas(yearLengthHours) + ' hours or';
	__('label-days').innerHTML = 'of ' + yearLengthDays + ' days since';

	display();
	running = window.setInterval(display, 1000);
};

__('switch').onclick = function() {
	switch(which) {
		case 'elapsed':
			which = 'remaining';
			__('switch').innerHTML = 'show elapsed';
			__('label-days').innerHTML = 'of ' + yearLengthDays + ' days to';
			__('lastyear').innerHTML = thisYear + 1;
		break;
		case 'remaining':
			which = 'elapsed';
			__('switch').innerHTML = 'show remaining';
			__('label-days').innerHTML = 'of ' + yearLengthDays + ' days since';
			__('lastyear').innerHTML = thisYear - 1;
		break;
	}
	
	ids = ['seconds', 'minutes', 'hours', 'days', 'lastyear'];
	
	for (key in ids) {
		__(ids[key]).style.opacity = 0;
		__(ids[key]).style.transform = 'translateY(-0.5em)';
		__(ids[key]).style.transition = '';
	}
	
	window.setTimeout(function() {
		for (key in ids) {
			__(ids[key]).style.opacity = 1;
			__(ids[key]).style.transform = 'translateY(0)';
			__(ids[key]).style.transition = '0.3s';
		}
	}, 100);
	
	display();
};