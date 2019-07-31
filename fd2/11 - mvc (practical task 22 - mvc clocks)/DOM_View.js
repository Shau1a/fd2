function ClockViewDOM() {
	let myModel = null;
	let myField = null;

	let run = null;
	let stop = null;

	let clock = null;
	let sArrow = null;
 	let mArrow = null;
 	let hArrow = null;

	
	this.start = function(model, field, city, gtm) {
		myModel = model;
		myField = field;

		this.clockCreate(city, gtm);

		sArrow = myField.querySelector('.sArrow');
		mArrow = myField.querySelector('.mArrow');
		hArrow = myField.querySelector('.hArrow');
		run = myField.querySelector('.run');
		stop = myField.querySelector('.stop');

		run.disabled = true;
	};

	this.clockCreate = function(city, gtm) {
		this.createButtons(); // верстка
		this.setCityTime(city, gtm);
		this.createClockField(); // верстка
		this.makingClock(); // верстка
	};

	this.createButtons = function() {
		let button_run = '<button class="run">старт</button>';
		let button_stop = '<button class="stop">стоп</button>';
		let buttons = button_run + " " + button_stop;
		myField.innerHTML = buttons;
	};

	this.setCityTime = function(city, gtm) {
		let info = document.createElement('div');
		info.className = 'info';
		info.innerHTML = `${city} (GTM ${gtm > 0 ? ('+' + gtm) : gtm})`;
		myField.appendChild(info);
	};

	this.createClockField = function() {
		clock = document.createElement('div');
		clock.className = 'clock';
		myField.appendChild(clock);

		let sArrow = document.createElement('div');
			sArrow.className = 'sArrow';
			clock.appendChild(sArrow);

		let mArrow = document.createElement('div');
			mArrow.className = 'mArrow';
			clock.appendChild(mArrow);

		let hArrow = document.createElement('div');
			hArrow.className = 'hArrow';
			clock.appendChild(hArrow);

		let centerCircle = document.createElement('div');
			centerCircle.className = 'centerCircle';
			clock.appendChild(centerCircle);
	};
	
	this.makingClock = function() {
		let delta = Math.PI * 2 / 12; // сдвиг угла
		let angle = 0;
		let h = 3;
		let clockCenterX = clock.offsetWidth / 2;
		let clockCenterY = clock.offsetHeight / 2;

		for (let i = 0; i < 12; i++) {
			let point = document.createElement('div');
				point.classList.add('hPoint');
				point.innerHTML = h;
		    	clock.appendChild(point);

			let pointCenterX = point.offsetWidth / 2;
			let pointCenterY = point.offsetHeight / 2;

			point.style.left = clockCenterX - pointCenterX - 2 + 75 * Math.cos(angle) + 'px';
		    point.style.top = clockCenterY - pointCenterY - 2 + 75 * Math.sin(angle) + 'px';
		    
		    angle += delta;
		    h++;
			if (h > 12) h = 1;
		};
	};

	this.changeState = function (item, state) {
		if (state == false) {
			item.removeAttribute('disabled');
		}
		else if (state == true) {
			item.setAttribute('disabled', 'true');
		}
	};

	this.updateSArrow = function(f) {
		sArrow.style.transform = `rotate(${f}deg)`;
	};
	this.updateMinRotation = function(f) {
		mArrow.style.transform = `rotate(${f}deg)`;
	};
	this.updateHArrow = function(f) {
		hArrow.style.transform = `rotate(${f}deg)`;
	};
}
