$('#newPoke').click(getAnotherPoke);
$('#verify').click(verifyName);

var pokemon, number;
var url = "http://pokeapi.co/";

function getAnotherPoke(e){
	var service = "api/v1/pokemon/";
	var min = $('#min').val();
	var max = $('#max').val();
	number = randomNumber(min, max);
	$.get(url+service+number+"/")
		.done(showPokemon)
		.fail(errorReq);
}

function randomNumber(min, max){
	return Math.floor(Math.random()*(max - min + 1)) + min;
}

function showPokemon(data){
	pokemon = data;
	//alert(pokemon.name);
	var sprite = url+"media/img/"+number+".png";
	$('#pokeImage').html('<img id="sprite" src="'+sprite+'" class="silhouette"/>');
	//$('#sprite').addClass("silhouette");
}

function verifyName(e){
	var userInput = $('#name').val();
	$('#sprite').removeClass("silhouette");
	if(userInput === pokemon.name.toLowerCase()){
		alert("You did it! It's "+pokemon.name);
	}else{
		alert("You fail! It's "+pokemon.name);
	}
}

function errorReq(){

}