//rain function is commented out at the very bottom

// I should have stuffed multiple functions into the success of the AJAX call


$(function(init){
	setHome();
	$('#searchYonder').click(sendRequest);
	$('#searchYonder').click(getForecast);
	$('#searchHome').click(setHome);
	$('#addToMe').on("click", ".card", deleteIt);
});

var apiKey = '1b63344baa5f0cd0314625e06a1b036a';
var words = [];

function sendRequest() {
	var yonderPlace = $('#yonderPlace').val();
	var temp = 0;
	addWord();
	$.ajax({
		method: 'GET',
		url:`http://api.openweathermap.org/data/2.5/weather?q=${yonderPlace}&APPID=${apiKey}`,
		success: function(data){
			$('#addToMe').append(addCard(data));
		},
		error: function (error){
			alert("somethings wrong, dumbo!");
		}
	});
}
function getForecast() {
 	var yonderPlace = $('#yonderPlace').val();
 	$.ajax({
 		method:'GET',
 		url: `http://api.openweathermap.org/data/2.5/FORECAST?q=${yonderPlace}&APPID=${apiKey}`,
 		success: function(item){
			console.log(item);
			$('#addToMe').append(addForecast(item));
		},
		error: function (error){
			console.log("error:", error);
		}
 	});	
}
function addForecast (item) {
	var nextDayMax = Math.round(((item.list[4].main.temp_max- 273.15)*1.8+32)*10)/10;
	var nextDayMin = Math.round(((item.list[4].main.temp_min- 273.15)*1.8+32)*10)/10;
	var secondDayMax = Math.round(((item.list[12].main.temp_max- 273.15)*1.8+32)*10)/10;
	var secondDayMin = Math.round(((item.list[12].main.temp_min- 273.15)*1.8+32)*10)/10;
	var thirdDayMax = Math.round(((item.list[20].main.temp_max- 273.15)*1.8+32)*10)/10;
	var thirdDayMin = Math.round(((item.list[20].main.temp_min- 273.15)*1.8+32)*10)/10;
	//$('#addToMe').find('#nextDay')
	$("#nextDay").text(nextDayMin+ " / " + nextDayMax);
	$("#secondDay").text(secondDayMin+ " / "+secondDayMax);
	$("#thirdDay").text(thirdDayMin+ " / "+thirdDayMax);
}
//successfully adds new values to LOCALSTORAGE under property name words;
function addWord () {
	makeLocalStorage();
	var newWord = $('#yonderPlace').val();
	words.push(newWord);
	var newWordStr = JSON.stringify(words);
	localStorage.words = newWordStr;
}
function makeLocalStorage () {
	if (!localStorage.words) {
		localStorage.words = "[]";
	}
	words = JSON.parse(localStorage.words);
}
function addCard (data) {
	var correctContainer = $('#cardTemplate').clone().removeAttr("id");
	var theWeather = data.weather[0].main;
	correctContainer.find('#searchedCity').text($('#yonderPlace').val());
	correctContainer.find('#temperature').text("It's currently " + Math.round(((data.main.temp - 273.15)*1.8+32)*10)/10 + " degrees!");
	correctContainer.find('#weather').text("Looks like there they've got " + theWeather + " !");
	return correctContainer;
}
//adds to front of LocalStorage string;
// DONT FUCKING TOUCH. IT WORKS.
function setHome () {
	makeLocalStorage();
	var newWord ="";
	if($('#yourHome').val()){
		newWord = $('#yourHome').val();
	}
	else {
		newWord = words[0];
	}
	words.unshift(newWord);
	var newWordStr = JSON.stringify(words);
	localStorage.words = newWordStr;
	sendRequestInit(localStorage);
}
//retrieve localStorage.words[0];
// DONT FUCKING TOUCH. IT WORKS.
function sendRequestInit(localStorage) {
	var anotherStringArray = JSON.parse(localStorage.words);
	var yetAnother = [];
	var setHome = "";
	if (anotherStringArray[0] == ""){
		yetAnother = anotherStringArray.shift();
		setHome = yetAnother[0];
	}
	else {
		setHome = anotherStringArray[0];
	}
	$.ajax({
		method: 'GET',
		url:`http://api.openweathermap.org/data/2.5/weather?q=${setHome}&APPID=${apiKey}`,
		success: function(data){
			addFirstCard(data);
		},
		error: function (error){
			console.log("error:", error);
		}
	});
}
// DONT FUCKING TOUCH. IT WORKS.
function addFirstCard (data) {
	var theWeather = data.weather[0].main;
	$('#searchedCity').text(data.name);
	$('#weather').text("Looks like there they've got " + data.weather[0].main + " !");
	$('#temperature').text("It's currently " + Math.round(((data.main.temp - 273.15)*1.8+32)*10)/10 + " degrees!");
}
function deleteIt (event){
	//event.stopPropagation;
	console.log("delete it");
	$(this).closest(".card").hide(3000);
}
/*

// number of drops created.
var nbDrop = 858; 

// function to generate a random number range.
function randRange( minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

// function to generate drops
function createRain() {

	for( i=1;i<nbDrop;i++) {
	var dropLeft = randRange(0,1600);
	var dropTop = randRange(-1000,1400);

	$('.rain').append('<div class="drop" id="drop'+i+'"></div>');
	$('#drop'+i).css('left',dropLeft);
	$('#drop'+i).css('top',dropTop);
	}
}
// Make it rain
createRain();


*/









