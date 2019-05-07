//шапка
const mainTitle 			= 	document.getElementById('mainTitle');
const calendarsWrapper 		= 	document.getElementById('calendarsWrapper');

//стрелки
let prevYear 				= 	document.getElementById('prevYear');
let prevMonth 				= 	document.getElementById('prevMonth');
let nextMonth 				= 	document.getElementById('nextMonth');
let nextYear 				= 	document.getElementById('nextYear');

//кнопки создания и удаления календаря
let creatingACalendarButton = document.getElementById('creatingACalendar');
let deletingACalendar		= document.getElementById('deletingACalendar');

//выпадающие списки
let YearList 				= 	document.getElementById('year');
let MonthList 				= 	document.getElementById('month');


let year,  					  
	month; 							


let allMonths = {
	0 : 'Январь',
	1 : 'Февраль',
	2 : 'Март',
	3 : 'Апрель',
	4 : 'Май',
	5 : 'Июнь',
	6 : 'Июль',
	7 : 'Август',
	8 : 'Сентябрь',
	9 : 'Октябрь',
	10 : 'Ноябрь',
	11 : 'Декабрь'
};


//==========================//
// Making lists for year and month
//==========================//
createYearsList();		
createMonthList();		


//==========================//
// Without calendars both buttons are disabled
//==========================//
creatingACalendarButton.disabled = 'true';
deletingACalendar.disabled = 'true';


//==========================//
// Acts for lists and all buttons
//==========================//
creatingACalendarButton.addEventListener('click', function() {
	let newCalendar = new Calendar(year, month);
	newCalendar.createCalendar();
	deletingACalendar.removeAttribute('disabled');
});

deletingACalendar.addEventListener('click', function() {
	calendarsWrapper.removeChild(calendarsWrapper.childNodes[0]);
	if (!(calendarsWrapper.childNodes[0])) {
		deletingACalendar.disabled = 'true';
	}
});

YearList.addEventListener('change', function() {
  let index 	= YearList.selectedIndex;
 	  year 		= YearList[index].value;
 	  isDisabledCreating();
});

MonthList.addEventListener('change', function() {
  let index 	= MonthList.selectedIndex;
  	  month 	= MonthList[index].value;
  	  isDisabledCreating(); 
});


//действия при нажатии на кнопки (вперед\назад для года и месяца)
prevYear.addEventListener('click', function(e){
	e.preventDefault();
	year--; 
	if (year < 1970) {year = new Date().getFullYear();}  
	YearList.length = 0; 
	createYearsList(year); 	
});

prevMonth.addEventListener('click', function(e){
	e.preventDefault();
	month--;
	if (month == (-1)) { 
		month = 11;
		year--; 
	}
	MonthList.length = 0;
	createMonthList(month);
});

nextYear.addEventListener('click', function(e){
	e.preventDefault();
	year++;
	if (year > new Date().getFullYear()) {year = 1970;}
	YearList.length = 0;
	createYearsList(year); 
});

nextMonth.addEventListener('click', function(e){
	e.preventDefault();
	month++;
	if (month == 12) { 
		month = 0;
		year++; 
	}
	MonthList.length = 0;
	createMonthList(month); 
});



class Calendar {
	constructor (year, month) {
		this.year = year;
		this.month = month;
		this.date = new Date(year, month);
	};

	createCalendar() {
		let calendarField = document.createElement('div');
		let lastDayOfPreviousMonth 	= 	new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
		let dayNumber = this.date.getDay();
			if (dayNumber == 0) { dayNumber = 7; } 
		let calendar = '<table><caption>' + allMonths[month] + ' ' + year + '</caption>';
			calendar += '<tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';		
		let prevD = dayNumber - 1;
	    for (var i = 0; i < dayNumber - 1; i++) {  	
	        calendar += '<td class = "other_month">' + (lastDayOfPreviousMonth - prevD) + '</td>';
	        prevD--;
	    }	    
	    while (this.date.getMonth() == this.month) {
	    	if (this.date.getDay() > 0 && this.date.getDay() < 6) {
	    		calendar += '<td class = "curr_month">' + this.date.getDate() + '</td>';
	    	}
	        if (this.date.getDay() == 6 || this.date.getDay() == 0) {
	        	calendar += '<td class = "weekend">' + this.date.getDate() + '</td>';
	        }
	        if (this.date.getDay() == 0) { 
	          calendar += '</tr><tr>';
	        }
	        this.date.setDate(this.date.getDate() + 1);
	    }	     
	    let nextD = 1; 
	    if (this.date.getDay() != 0) {
	        for (var i = this.date.getDay(); i < 8; i++) {
	          calendar += '<td class = "other_month">' + nextD + '</td>';
	          nextD++;
	        }
	    }
	    else if (this.date.getDay() == 0) {
	    	calendar += '<td class = "other_month">' + 1 + '</td>';
	    }	    
	    calendar += '</tr></table>';	    
	    let elem = calendarsWrapper.appendChild(calendarField);
	    elem.innerHTML = calendar;
	    selectTD(elem);
    }
};



//==========================//
// Button "Creating a calendar" to make disabled and back
//==========================//
function isDisabledCreating() {
	if (isNaN(year) || isNaN(month)) {
		creatingACalendarButton.disabled = 'true';
	}
	else if (!(isNaN(year)) && !(isNaN(month))) {
		creatingACalendarButton.removeAttribute('disabled');
	}
};


//==========================//
// Highliting of TD in tables
//==========================//
function selectTD(elem) {
	elem.addEventListener('click', function(event) {
		let target = event.target;
		if (target.tagName != 'TD') return;
		else if (target.classList.contains('highlight')) {
			target.classList.remove('highlight');
		}
		else target.classList.add('highlight');
	});
};


//==========================//
// Creating lists of years 
//==========================//
function createYearsList(val) {
	let selectAll = document.createElement('option');
	selectAll.innerHTML = 'Select';
	YearList.appendChild(selectAll); 
	for (let i = 1970; i <= new Date().getFullYear(); i++) {
		let year = document.createElement('option');
		year.value = i;
		year.innerHTML = i;
		YearList.appendChild(year); 
		if (year.value == val) {
			year.selected = true;
		}
	}
};

//==========================//
// Creating lists of months
//==========================//
function createMonthList(val) {
	let selectAll = document.createElement('option');
	selectAll.innerHTML = 'Select';
	MonthList.appendChild(selectAll);
	for (let i = 0; i < 12; i++) {
		let month = document.createElement('option');
		month.value = i;
		month.innerHTML = allMonths[i];
		MonthList.appendChild(month);
		if (month.value == val) {
			month.selected = true;
		}
	}
};