function ClockViewSVG() {
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
		this.createButtons(); 
		this.setCityTime(city, gtm);
		this.createClockField(); 
		this.makingClock(); 
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
		let svg = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='100%' height='200' viewBox='0 0 200 200' preserveAspectRatio='xMidYMin meet'><g class='mainCircle'><circle r='100' cx='50%' cy='50%' class='clock'></circle><g class='arrows'><rect class='hArrow' x='98.5' y='45%' width='3' height='64' rx='2.5' ry='2.55'></rect><rect class='mArrow' x='99.1' y='44%' width='1.8' height='80' rx='2' ry='2'></rect><rect class='sArrow' x='99.5' y='42%' width='1' height='100' rx='2' ry='2'></rect></g><circle fill='#d41a1a' r='5' cx='50%' cy='50%'></circle></g></svg>"
		let svg_wrapper = document.createElement('div');
		svg_wrapper.className = 'clock-margin';
		svg_wrapper.innerHTML = svg;
		myField.appendChild(svg_wrapper);
	};
	
	this.makingClock = function() {
		let delta = Math.PI * 2 / 12; // сдвиг угла
		let angle = 0;
		let h = 3; 

		let mainCircle = myField.querySelector('.mainCircle');
		let arrows = myField.querySelector('.arrows');

		let svgNS = "http://www.w3.org/2000/svg";

		for (let i = 0; i < 12; i++) {
			let point = document.createElementNS(svgNS, 'circle');
				point.classList.add('hPoint');
			let text = document.createElementNS(svgNS, 'text');

			x = 100 + 75 * Math.cos(angle);
		    y = 100 + 75 * Math.sin(angle);

			if (h < 10) {
				text.setAttribute('x', x - 2.5);
				text.setAttribute('y', y + 3);
			}

			if (h >= 10) {
				text.setAttribute('x', x - 6);
				text.setAttribute('y', y + 3);
			}
	        
	        text.textContent = h;

		    point.setAttribute('r', 12);
		    point.setAttribute('cx', x);
		    point.setAttribute('cy', y);
			
			mainCircle.insertBefore(point, arrows);
			mainCircle.insertBefore(text, arrows);
		    
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
		sArrow.setAttribute('transform', `rotate(${f})`);
	};
	this.updateMinRotation = function(f) {
		mArrow.setAttribute('transform', `rotate(${f})`);
	};
	this.updateHArrow = function(f) {
		hArrow.setAttribute('transform', `rotate(${f})`);
	};
}
