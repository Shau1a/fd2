'use strict';


class HashStorage {
	constructor(storage) { 
		this.storage = {}; 
	};

	addValue(key, value) { 
		this.storage[key] = value; 
	}
	getValue(key) {
		return this.storage[key];
	}
	deleteValue(key) {
		if (key in this.storage) {
			delete this.storage[key];
			return true;
		}
		return false;
	}
	getKeys() {	
		return Object.keys(this.storage); 
	}
}


/* хранилище коктейлей */
let coctails = {
	'Апероль' : 	{},
	'Пиранья' 		: 	{},
	'Оазис' 		: 	{}
};


/* создаем объект-потомок основного хранилища, в нем - объект-хранилище коктейлей */
let coctailsStorage 	= new HashStorage();
coctailsStorage.storage = coctails;


/* 	создаем коктейль (ингредиенты, рецепт) и добавляем его в хранилище через addValue()
	остальные предзаданные коктейли хранятся в отдельном файле для удобства чтения */
let daikiri 					 = 	{};
daikiri['Напиток'] 				 = 	'Алкогольный';
daikiri['Необходмые ингриденты'] =	{'Ром белый' : '50 мл (3 ст. л.)',
								 	'Сок половины лайма' : '1',
								 	'Сахарный сироп' : '2 ч. л'	};
daikiri['Приготовление'] 		 = 	'Хорошо смешайте все ингредиенты коктейля Дайкири в шейкере со льдом. Процедите в охлажденный бокал для коктейля. Не украшайте.';
	
coctailsStorage.addValue('Дайкири', daikiri);



const 	receiptInput		= 	document.getElementById('receiptInput'), // ввод рецепта
		toGetDrinkReceipt	= 	document.getElementById('toGetDrinkReceipt'), // получение рецепта
		toDeleteDrink		= 	document.getElementById('toDeleteDrink'), // удаление рецепта
		toGetDrinklist		= 	document.getElementById('toGetDrinklist'), // получить список напитков
		outputField			=	document.getElementById('outputField'); // поле вывода информации



//******************************************************
//Показ и удаление со страницы списка напитков
//******************************************************
//
toGetDrinklist.addEventListener('click', function() {
	if (toGetDrinklist.innerHTML == 'Перечень всех коктейлей') {
		outputField.style.textAlign = 'center';
		outputField.innerHTML = coctailsStorage.getKeys().join(',  ');
		toGetDrinklist.innerHTML = 'Скрыть информацию';
	}
	else if (toGetDrinklist.innerHTML == 'Скрыть информацию') {
		outputField.innerHTML = '';
		toGetDrinklist.innerHTML = 'Перечень всех коктейлей';
	}
});


//******************************************************
//Удаление напитка из хранилища
//******************************************************
//
toDeleteDrink.addEventListener('click', function() {
	let drink = prompt('Введите напиток, который надо удалить из хранилища', '');
	drink = drink.charAt(0).toUpperCase() + drink.substr(1).toLowerCase();
	let res = coctailsStorage.deleteValue(drink); 
	if (res == true) { alert ('Удалено');}
	else alert ('Нет в базе');
});


//******************************************************
//Получение рецепта (выводится на страницу)
//******************************************************
//
toGetDrinkReceipt.addEventListener('click', function() {
	let drink = prompt('Какой напиток Вас интересует?', '');
	drink = drink.charAt(0).toUpperCase() + drink.substr(1).toLowerCase();

	let res = coctailsStorage.getValue(drink);
// 	console.log(res);
// 	console.log(typeof res); //object

	if (res) {
		let arr = [];
		for(let key in res) {
			if (res[key] == '[object Object]') { //вложенный объект
				arr.push('<b>'+key+'</b>' + ': ');
				for(let key1 in res[key]) arr.push(key1 + ': ' + res[key][key1]); //распечатка вложенного объекта
				continue;
			} 
			arr.push('<b>'+key+'</b>' + ': '  + '<br>' + res[key]); //создание массива с отображением "ключ : значение"
		}
		outputField.style.textAlign = 'left';
		outputField.innerHTML = ('<h2>'+'Коктейль '+drink+'</h2>' + '<hr>' + arr.join('<br>'));
	}
	else alert('Нет такого рецепта');
});


//******************************************************
//Введение рецепта и сохрание его в хранилище
//******************************************************
//
receiptInput.addEventListener('click', function() {
	let newCoctailName, 
		receiptValues = {},
		ingredient;

	do {
		newCoctailName = prompt('Введите название коктейля:', '');
		if (newCoctailName == '') alert ('Введите название!');
	    else if (newCoctailName === null) return;
	} while(newCoctailName == '');
 	newCoctailName = newCoctailName.charAt(0).toUpperCase() + newCoctailName.substr(1).toLowerCase();
	
	confirm('Напиток алкогольный?') ? receiptValues['Напиток'] = 'Алкогольный' : receiptValues['Напиток'] = 'Безалкогольный';
	
	receiptValues['Необходмые ингредиенты'] = {};
	do {
		ingredient = prompt('Введите ингредиент:', '');
		if (ingredient == '') {
			alert ('Введите название!');
			continue;
		}
		else if (ingredient === null) break;
		receiptValues['Необходмые ингредиенты'][ingredient] = prompt('Сколько?', '');
	} while(ingredient || ingredient == '');

	receiptValues['Приготовление'] = prompt('Введите инструкцию по приготовлению:', '');

	coctailsStorage.addValue(newCoctailName, receiptValues);
	alert('Напиток успешно добавлен в хранилище!');

	console.log(newCoctailName);
	console.log(receiptValues);
});
