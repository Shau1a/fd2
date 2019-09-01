function WheatherWidget() {

		let field = null;

		this.createGridOfWidget = function() {
			field = document.createElement('div');
			field.id = 'WG';
			let string = `	
				<div class="small-icon hide">
					<div class="dragAndDrop_handle"></div>
					<a href="#" title="открыть виджет погоды"><img src="weather-icon.png"></a>
				</div>

				<div class="weatherWidget">
					<div class="weatherWidget__close"><a>X</a></div>
					<div class="weatherWidget__tabs">
						<div class="weatherWidget__oneDay highlite"><h2>1 день</h2></div>
						<div class="weatherWidget__threeDays"><h2>3 дня</h2></div>
					</div>
					<div class="weatherWidget__oneDayTab clearfix">
						<h2 class="location"></h2>
					    <div class="temp"></div>
					    <div class="image"></div>
						<div class="wind"></div>
					    <div class="descr"></div>
					    
					</div>
					<div class="weatherWidget__threeDaysTab hide-tab">
						<h2 class="location"></h2>
						<div class="day1">
							<div class="date"></div>
					    	<div class="temp"></div>
					    	<div class="descr"></div>
					    	<div class="image"></div>
					    	<div class="wind"></div>
						</div>
						<div class="day2">
							<div class="date"></div>
					    	<div class="temp"></div>
					    	<div class="descr"></div>
					    	<div class="image"></div>
					    	<div class="wind"></div>
						</div>
						<div class="day3">
							<div class="date"></div>
					    	<div class="temp"></div>
					    	<div class="descr"></div>
					    	<div class="image"></div>
					    	<div class="wind"></div>
						</div>
					</div>
				</div>`;

			field.innerHTML = string;
			document.body.appendChild(field);
		};

		this.getOneDayWheather = function(_cityID) { //625144 - Minsk
	        let cityID = _cityID,
	            apiUrl = "https://api.openweathermap.org/data/2.5/",
	            apiKey = "a7eb3512a90a3d2230ae86c021f9fe18", 
	            apiQuery = apiUrl+"/weather?id=" + cityID + "&units=metric&lang=ru&appid="+apiKey;

	        fetch(apiQuery, { method: 'get' })
	        .then(response => response.json())
	        .then(data => {
	            this.parseOneDayWeather(data);
	        })
	        .catch(error => console.error("Ошибка получение погоды. Причина: " + error));
	    };

	    this.getThreeDaysWheather = function(_cityID) {
	    	let cityID = _cityID,
	            apiUrl = "https://api.openweathermap.org/data/2.5/",
	            apiKey = "a7eb3512a90a3d2230ae86c021f9fe18", 
	            apiQuery = apiUrl+"forecast?id=" + cityID + "&units=metric&lang=ru&appid="+apiKey;

	        fetch(apiQuery, { method: 'get' })
	        .then(response => response.json())
	        .then(data => {
	           	this.parseThreeDaysWeather(data);
	        })
	        .catch(error => console.error("Ошибка получение погоды. Причина: " + error));
	    };

	    this.parseOneDayWeather = function(data) {
	    	let location = field.querySelector('.weatherWidget__oneDayTab .location');
	    	let temp = field.querySelector('.weatherWidget__oneDayTab .temp');
			let descr = field.querySelector('.weatherWidget__oneDayTab .descr');
			let image = field.querySelector('.weatherWidget__oneDayTab .image');
			let wind = field.querySelector('.weatherWidget__oneDayTab .wind');

			location.innerHTML = data.name;
			temp.innerHTML = Math.floor(data.main.temp) + "&#8451;";
			descr.innerHTML = data.weather[0].description;
			image.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="icon">`;
			wind.innerHTML = '&#9780; ' + data.wind.speed + ' км/ч';
	    };

	   	this.parseThreeDaysWeather = function(data) {
	    	let location = field.querySelector('.weatherWidget__threeDaysTab .location');

	    	let date1 = field.querySelector('.weatherWidget__threeDaysTab .day1 .date');
	    	let temp1 = field.querySelector('.weatherWidget__threeDaysTab .day1 .temp');
			let descr1 = field.querySelector('.weatherWidget__threeDaysTab .day1 .descr');
			let image1 = field.querySelector('.weatherWidget__threeDaysTab .day1 .image');
			let wind1 = field.querySelector('.weatherWidget__threeDaysTab .day1 .wind');

			let date2 = field.querySelector('.weatherWidget__threeDaysTab .day2 .date');
			let temp2 = field.querySelector('.weatherWidget__threeDaysTab .day2 .temp');
			let descr2 = field.querySelector('.weatherWidget__threeDaysTab .day2 .descr');
			let image2 = field.querySelector('.weatherWidget__threeDaysTab .day2 .image');
			let wind2 = field.querySelector('.weatherWidget__threeDaysTab .day2 .wind');

			let date3 = field.querySelector('.weatherWidget__threeDaysTab .day3 .date');
			let temp3 = field.querySelector('.weatherWidget__threeDaysTab .day3 .temp');
			let descr3 = field.querySelector('.weatherWidget__threeDaysTab .day3 .descr');
			let image3 = field.querySelector('.weatherWidget__threeDaysTab .day3 .image');
			let wind3 = field.querySelector('.weatherWidget__threeDaysTab .day3 .wind');

			location.innerHTML = data.city.name;

			date1.innerHTML = data.list[1].dt_txt.substr(0, 10);
			temp1.innerHTML = Math.floor(data.list[1].main.temp) + "&#8451;";
			descr1.innerHTML = data.list[1].weather[0].description;
			image1.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}.png" alt="icon">`;
			wind1.innerHTML = '&#9780; ' + data.list[1].wind.speed + ' км/ч';

			date2.innerHTML = data.list[9].dt_txt.substr(0, 10);
			temp2.innerHTML = Math.floor(data.list[9].main.temp) + "&#8451;";
			descr2.innerHTML = data.list[9].weather[0].description;
			image2.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[9].weather[0].icon}.png" alt="icon">`;
			wind2.innerHTML = '&#9780; ' + data.list[9].wind.speed + ' км/ч';

			date3.innerHTML = data.list[17].dt_txt.substr(0, 10);
			temp3.innerHTML = Math.floor(data.list[17].main.temp) + "&#8451;";
			descr3.innerHTML = data.list[17].weather[0].description;
			image3.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[17].weather[0].icon}.png" alt="icon">`;
			wind3.innerHTML = '&#9780; ' + data.list[17].wind.speed + ' км/ч';
	    };


	    
	    this.events = function() {
			let oneDayTab = field.querySelector('.weatherWidget__oneDayTab');
			let threeDaysTab = field.querySelector('.weatherWidget__threeDaysTab');
			let close = field.querySelector('.weatherWidget__close a');
			let widget = field.querySelector('.weatherWidget');
			let oneDayButton = field.querySelector('.weatherWidget__oneDay');
			let threeDaysButton = field.querySelector('.weatherWidget__threeDays');
			let smallIcon = field.querySelector('.small-icon');


			close.addEventListener('click', function(e){
				e.preventDefault();
				field.classList.add('delete-shadow');
				widget.classList.add('hide');
				smallIcon.classList.remove('hide');
			});

			smallIcon.addEventListener('click', function(e){
				e.preventDefault();
				smallIcon.classList.add('hide');
				widget.classList.remove('hide');
			});

			oneDayButton.addEventListener('click', function(e){
				threeDaysTab.classList.add('hide-tab');
				threeDaysButton.classList.remove('highlite');
				oneDayTab.classList.remove('hide-tab');
				oneDayButton.classList.add('highlite');
			}, true);

			threeDaysButton.addEventListener('click', function(e){
				oneDayTab.classList.add('hide-tab');
				oneDayButton.classList.remove('highlite');
				threeDaysTab.classList.remove('hide-tab');
				threeDaysButton.classList.add('highlite');
			}, true);	
		};

		this.dragAndDrop = function() {

			let oneDayTab = field.querySelector('.weatherWidget__oneDayTab');
			let threeDaysTab = field.querySelector('.weatherWidget__threeDaysTab');
			let smallIcon = field.querySelector('.small-icon .dragAndDrop_handle');

			oneDayTab.addEventListener('mousedown', move);
			threeDaysTab.addEventListener('mousedown', move);
			smallIcon.addEventListener('mousedown', move);


			function getCoords(elem) { 
				let box = elem.getBoundingClientRect();

				return {
				    top: box.top + pageYOffset,
				    left: box.left + pageXOffset
				};
			};

			function move(e){
				let coords = getCoords(field);
				let shiftX = e.pageX - coords.left;
				let shiftY = e.pageY - coords.top;

				field.style.position = 'absolute';
				document.body.appendChild(field);                                  
				field.style.zIndex = 1000;

				function moveAt(e) {
					field.style.left = e.pageX - shiftX + 'px';
					field.style.top = e.pageY - shiftY + 'px';
				};

				document.onmousemove = function(e) {
				    moveAt(e);
				};

				this.onmouseup = function() {
				    document.onmousemove = null;
				    field.onmouseup = null;
				};
			};
				
			oneDayTab.ondragstart = function() {
				return false;
			};
			threeDaysTab.ondragstart = function() {
				return false;
			};
			smallIcon.ondragstart = function() {
				return false;
			};
		};

	    this.getWeather = function() {
			this.createGridOfWidget();
			this.dragAndDrop();
			this.events();
			this.getOneDayWheather(625144);
			this.getThreeDaysWheather(625144);
		};

	}
