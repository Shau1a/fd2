function ClockViewCanvas() {
	let myModel = null;
	let myField = null;

	let run = null;
	let stop = null;

	let clock = null;

 	let canvas = null;
	let ctx  = null;

	let hours = null; 
	let min = null; 
	let sec = null;

	
	this.start = function(model, field, city, gtm) {
		myModel = model;
		myField = field;

		this.clockCreate(city, gtm);

		run = myField.querySelector('.run');
		stop = myField.querySelector('.stop');

		run.disabled = true;
	};

	this.clockCreate = function(city, gtm) {
		this.createButtons(); 
		this.setCityTime(city, gtm);

		let canv = '<canvas class="CanvasClock" width="200" height="200">Извините, ваш браузер не поддерживает тег canvas</canvas>';
		let canvas_wrapper = document.createElement('div');
		canvas_wrapper.className = 'clock-margin';
		canvas_wrapper.innerHTML = canv;
		myField.appendChild(canvas_wrapper);

		canvas = myField.querySelector('.CanvasClock');
		ctx = canvas.getContext('2d');
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

	this.init = function() {
		this.update();
		this.clear();
		this.createClockField(); 
		this.createArrows(); 
	};

	this.clear = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	this.createClockField = function() {
		ctx.beginPath();
		ctx.fillStyle = '#F1ECE0';
		ctx.arc(100, 100, 100, 0, Math.PI*2, true);
		ctx.fill();

		ctx.beginPath();
		let delta = Math.PI * 2 / 12; 
		let angle = 0;
		let h = 3;

		for (let i = 0; i < 12; i++) {		
			x = 100 + 75 * Math.cos(angle);
		    y = 100 + 75 * Math.sin(angle);
			
			ctx.beginPath();
			ctx.fillStyle = '#d41a1a';
		    ctx.arc(x, y, 12, 0, Math.PI*2, true);
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = '#fff';    
			ctx.font = '800 12px Arial';
			if (h < 10) {
				ctx.fillText(h, x - 4, y + 5);
			}

			if (h >= 10) {
				ctx.fillText(h, x - 8, y + 5);
			}

		    angle += delta;
		    h++;
			if (h > 12) h = 1;
		};
	};

	this.createArrows = function() {
		let x1 = canvas.width / 2;
		let y1 = canvas.height / 2;

		let secAngle = 6 * sec;
		let minAngle = 6 * (min + 1 / 60 * sec);
		let hrAngle = 30 * (hours + 1 / 60 * min);

		ctx.beginPath();
		ctx.lineWidth = 2;
	    ctx.lineCap = 'round';
		ctx.translate(x1 - ctx.lineWidth / 2, y1);
		ctx.rotate(secAngle * Math.PI / 180 + Math.PI);
		ctx.moveTo(0, -10);
	    ctx.lineTo(0, 80);
	    ctx.strokeStyle = '#F84949';
	    ctx.stroke();
	    ctx.resetTransform();
	    ctx.closePath();

	    ctx.beginPath();
		ctx.lineWidth = 3;
	    ctx.lineCap = 'round';
		ctx.translate(x1 - ctx.lineWidth / 2, y1);
		ctx.rotate(minAngle * Math.PI / 180 + Math.PI);
		ctx.moveTo(0, -14);
	    ctx.lineTo(0, 75);
	    ctx.strokeStyle = '#383535';
	    ctx.stroke();
	    ctx.resetTransform();
	    ctx.closePath();

	    ctx.beginPath();
		ctx.lineWidth = 4;
	    ctx.lineCap = 'round';
		ctx.translate(x1 - ctx.lineWidth / 2, y1);
		ctx.rotate(hrAngle * Math.PI / 180 + Math.PI);
		ctx.moveTo(0, -16);
	    ctx.lineTo(0, 40);
	    ctx.strokeStyle = '#383535';
	    ctx.stroke();
	    ctx.resetTransform();
	    ctx.closePath();

	    ctx.beginPath();
	    ctx.fillStyle = '#F84949';
	    ctx.arc(x1, y1, 6, 0, Math.PI*2, true);
		ctx.fill();
	};

	this.changeState = function (item, state) {
		if (state == false) {
			item.removeAttribute('disabled');
		}
		else if (state == true) {
			item.setAttribute('disabled', 'true');
		}
	};

	this.update = function() {
		let d = myModel.getTime(); 
		hours = d.getHours();
		min = d.getMinutes(); 
		sec = d.getSeconds();
	};
}
