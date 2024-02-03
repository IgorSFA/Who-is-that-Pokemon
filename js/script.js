var pokemon, number;
var score = 0;
var scoreMax = localStorage.getItem("scoreMax") || score;
var url = "https://pokeapi.co/";
var genNumbers = {
	gen1: [1,151],
	gen2: [152,251],
	gen3: [252,386],
	gen4: [387,493],
	gen5: [494,649],
	gen6: [650,721]
};

$('#score').text("Score: "+score);
$('#scoreMax').text("Record: "+scoreMax);
$('#newPoke').click(getAnotherPoke);
$('#verify').click(verifyName);
$('#name').keydown(function(key){
	if(key.keyCode === 13){
		verifyName();
	}
});
$('#reset').click(resetRecord);

function getAnotherPoke(e){
	var service = "api/v1/pokemon/";
	var gens = getGenerations();
	number = randomNumber(gens);
	$.get(url+service+number+"/")
		.done(showPokemon)
		.fail(errorReq);
}

function getGenerations(){
	var gens = [];
	$('.gen:checked').each(function(){
		gens.push(genNumbers[$(this).val()]);
	});
	return gens;
}

function randomNumber(arr){
	var randomGen = Math.floor(Math.random()*(arr.length));
	return Math.floor(Math.random()*(arr[randomGen][1] - arr[randomGen][0] + 1)) + arr[randomGen][0];
}

function showPokemon(data){
	pokemon = data;
	//alert(pokemon.name);
	var actualNumber = ""+number;
	while(actualNumber.length < 3){
		actualNumber = 0 + actualNumber;
	}
	var sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+actualNumber+".png";
	$('#pokeImage').html('<img id="sprite" src="'+sprite+'" class="silhouette"/>');
	//$('#sprite').addClass("silhouette");
}

function verifyName(e){
	var userInput = $('#name').val();
	$('#sprite').removeClass("silhouette");
	if(userInput === pokemon.name.toLowerCase()){
		alert("You did it! It's "+pokemon.name);
		$('#score').text("Score: "+(++score));
		if(score > localStorage.getItem("scoreMax")){
			localStorage.setItem("scoreMax", score);
			$('#scoreMax').text("Record: "+score);
		}

	}else{
		alert("You fail! It's "+pokemon.name);
		score = 0;
		$('#score').text("Score: "+score);
	}
}

function resetRecord(){
	localStorage.setItem("scoreMax", 0);
	$('#scoreMax').text("Record: "+0);
	score = 0;
	$('#score').text("Score: "+score);
}

function errorReq(){

}