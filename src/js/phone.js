var DEBUG = false, LIGHT_DEBUG = true;

//var name = "name", type = "type", stage = "stage", caught = "caught";
var grass = "grass", water = "water", fire = "fire", bug = "bug",
	psychic = "psychic", flying = "flying", ghost = "ghost", fighting = "fighting",
	normal = "normal", poison = "poison", electric = "electric", ground = "ground",
	fairy = "fairy", rock = "rock", ice = "ice", dragon = "dragon";

var Pokemon = [
	{ name : "MissingNo", type : "blank", stage : 100, caught : 0, species : "Glitch Pokemon"},
	
	{ name : "Bulbasaur", type : grass, stage : 0, caught : 0, species : "Seed Pokemon"},
	{ name : "Ivysaur", type : grass, stage : 9, caught : 0, species : "Seed Pokemon"},
	{ name : "Venusaur", type : grass, stage : 16, caught : 0, species : "Seed Pokemon"},
	{ name : "Charmander", type : fire, stage : 0, caught : 0, species : "Lizard Pokemon"},
	{ name : "Charmeleon", type : fire, stage : 9, caught : 0, species : "Flame Pokemon"},
	{ name : "Charizard", type : fire, stage : 16, caught : 0, species : "Flame Pokemon"},
	{ name : "Squirtle", type : water, stage : 0, caught : 0, species : "Tiny Turtle Pokemon"},
	{ name : "Wartortle", type : water, stage : 9, caught : 0, species : "Turtle Pokemon"},
	{ name : "Blastoise", type : water, stage : 16, caught : 0, species : "Shellfish Pokemon"},
	{ name : "Caterpie", type : bug, stage : 1, caught : 0, species : "Worm Pokemon"},
	{ name : "Metapod", type : bug, stage : 5, caught : 0, species : "Cocoon Pokemon"},
	{ name : "Butterfree", type : bug, stage : 13, caught : 0, species : "Butterfly Pokemon"},
	{ name : "Weedle", type : bug, stage : 1, caught : 0, species : "Hairy Bug Pokemon"},
	{ name : "Kakuna", type : bug, stage : 5, caught : 0, species : "Cocoon Pokemon"},
	{ name : "Beedrill", type : bug, stage : 13, caught : 0, species : "Poison Bee Pokemon"},
	{ name : "Pidgey", type : flying, stage : 1, caught : 0, species : "Tiny Bird Pokemon"},
	{ name : "Pidgeotto", type : flying, stage : 9, caught : 0, species : "Bird Pokemon"},
	{ name : "Pidgeot", type : flying, stage : 16, caught : 0, species : "Bird Pokemon"},
	{ name : "Rattata", type : normal, stage : 1, caught : 0, species : "Mouse Pokemon"},
	{ name : "Raticate", type : normal, stage : 5, caught : 0, species : "Mouse Pokemon"},
	{ name : "Spearow", type : flying, stage : 1, caught : 0, species : "Tiny Bird Pokemon"},
	{ name : "Fearow", type : flying, stage : 10, caught : 0, species : "Beak Pokemon"},
	{ name : "Ekans", type : poison, stage : 2, caught : 0, species : "Snake Pokemon"},
	{ name : "Arbok", type : poison, stage : 11, caught : 0, species : "Cobra Pokemon"},
	{ name : "Pikachu", type : electric, stage : 0, caught : 0, species : "Mouse Pokemon"},
	{ name : "Raichu", type : electric, stage : 9, caught : 0, species : "Mouse Pokemon"},
	{ name : "Sandshrew", type : ground, stage : 1, caught : 0, species : "Mouse Pokemon"},
	{ name : "Sandslash", type : ground, stage : 6, caught : 0, species : "Mouse Pokemon"},
	{ name : "Nidoran F", type : poison, stage : 1, caught : 0, species : "Poison Pin Pokemon"},
	{ name : "Nidorina", type : poison, stage : 5, caught : 0, species : "Poison Pin Pokemon"},
	{ name : "Nidoqueen", type : poison, stage : 16, caught : 0, species : "Drill Pokemon"},
	{ name : "Nidoran M", type : poison, stage : 1, caught : 0, species : "Poison Pin Pokemon"},
	{ name : "Nidorino", type : poison, stage : 5, caught : 0, species : "Poison Pin Pokemon"},
	{ name : "Nidoking", type : poison, stage : 16, caught : 0, species : "Drill Pokemon"},
	{ name : "Clefairy", type : fairy, stage : 2, caught : 0, species : "Fairy Pokemon"},
	{ name : "Clefable", type : fairy, stage : 11, caught : 0, species : "Fairy Pokemon"},
	{ name : "Vulpix", type : fire, stage : 4, caught : 0, species : "Fox Pokemon"},
	{ name : "Ninetales", type : fire, stage : 12, caught : 0, species : "Fox Pokemon"},
	{ name : "Jigglypuff", type : fairy, stage : 2, caught : 0, species : "Balloon Pokemon"},
	{ name : "Wigglytuff", type : fairy, stage : 11, caught : 0, species : "Balloon Pokemon"},
	{ name : "Zubat", type : poison, stage : 2, caught : 0, species : "Bat Pokemon"},
	{ name : "Golbat", type : poison, stage : 6, caught : 0, species : "Bat Pokemon"},
	{ name : "Oddish", type : grass, stage : 3, caught : 0, species : "Weed Pokemon"},
	{ name : "Gloom", type : grass, stage : 6, caught : 0, species : "Weed Pokemon"},
	{ name : "Vileplume", type : grass, stage : 11, caught : 0, species : "Flower Pokemon"},
	{ name : "Paras", type : bug, stage : 2, caught : 0, species : "Mushroom Pokemon"},
	{ name : "Parasect", type : bug, stage : 6, caught : 0, species : "Mushroom Pokemon"},
	{ name : "Venonat", type : bug, stage : 4, caught : 0, species : "Insect Pokemon"},
	{ name : "Venomoth", type : bug, stage : 7, caught : 0, species : "Poison Moth Pokemon"},
	{ name : "Diglett", type : ground, stage : 3, caught : 0, species : "Mole Pokemon"},
	{ name : "Dugtrio", type : ground, stage : 8, caught : 0, species : "Mole Pokemon"},
	{ name : "Meowth", type : normal, stage : 4, caught : 0, species : "Scratch Cat Pokemon"},
	{ name : "Persian", type : normal, stage : 8, caught : 0, species : "Classy Cat Pokemon"},
	{ name : "Psyduck", type : water, stage : 4, caught : 0, species : "Duck Pokemon"},
	{ name : "Golduck", type : water, stage : 8, caught : 0, species : "Duck Pokemon"},
	{ name : "Mankey", type : fighting, stage : 4, caught : 0, species : "Pig Monkey Pokemon"},
	{ name : "Primeape", type : fighting, stage : 8, caught : 0, species : "Pig Monkey Pokemon"},
	{ name : "Growlithe", type : fire, stage : 3, caught : 0, species : "Puppy Pokemon"},
	{ name : "Arcanine", type : fire, stage : 12, caught : 0, species : "Legendary Pokemon"},
	{ name : "Poliwag", type : water, stage : 4, caught : 0, species : "Tadpole Pokemon"},
	{ name : "Poliwhirl", type : water, stage : 8, caught : 0, species : "Tadpole Pokemon"},
	{ name : "Poliwrath", type : water, stage : 19, caught : 0, species : "Tadpole Pokemon"},
	{ name : "Abra", type : psychic, stage : 3, caught : 0, species : "Psi Pokemon"},
	{ name : "Kadabra", type : psychic, stage : 7, caught : 0, species : "Psi Pokemon"},
	{ name : "Alakazam", type : psychic, stage : 19, caught : 0, species : "Psi Pokemon"},
	{ name : "Machop", type : fighting, stage : 4, caught : 0, species : "Superpower Pokemon"},
	{ name : "Machoke", type : fighting, stage : 7, caught : 0, species : "Superpower Pokemon"},
	{ name : "Machamp", type : fighting, stage : 19, caught : 0, species : "Superpower Pokemon"},
	{ name : "Bellsprout", type : grass, stage : 2, caught : 0, species : "Flower Pokemon"},
	{ name : "Weepinbell", type : grass, stage : 11, caught : 0, species : "Flycatcher Pokemon"},
	{ name : "Victreebel", type : grass, stage : 17, caught : 0, species : "Flycatcher Pokemon"},
	{ name : "Tentacool", type : water, stage : 3, caught : 0, species : "Jellyfish Pokemon"},
	{ name : "Tentacruel", type : water, stage : 12, caught : 0, species : "Jellyfish Pokemon"},
	{ name : "Geodude", type : rock, stage : 2, caught : 0, species : "Rock Pokemon"},
	{ name : "Graveler", type : rock, stage : 11, caught : 0, species : "Rock Pokemon"},
	{ name : "Golem", type : rock, stage : 19, caught : 0, species : "Megaton Pokemon"},
	{ name : "Ponyta", type : fire, stage : 5, caught : 0, species : "Fire Horse Pokemon"},
	{ name : "Rapidash", type : fire, stage : 10, caught : 0, species : "Fire Horse Pokemon"},
	{ name : "Slowpoke", type : water, stage : 5, caught : 0, species : "Dopey Pokemon"},
	{ name : "Slowbro", type : water, stage : 10, caught : 0, species : "Hermit Crab Pokemon"},
	{ name : "Magnemite", type : electric, stage : 7, caught : 0, species : "Magnet Pokemon"},
	{ name : "Magneton", type : electric, stage : 12, caught : 0, species : "Magnet Pokemon"},
	{ name : "Farfetch'd", type : flying, stage : 10, caught : 0, species : "Wild Duck Pokemon"},
	{ name : "Doduo", type : flying, stage : 7, caught : 0, species : "Twin Bird Pokemon"},
	{ name : "Dodrio", type : flying, stage : 17, caught : 0, species : "Triple Bird Pokemon"},
	{ name : "Seel", type : water, stage : 9, caught : 0, species : "Sea Lion Pokemon"},
	{ name : "Dewgong", type : ice, stage : 17, caught : 0, species : "Sea Lion Pokemon"},
	{ name : "Grimer", type : poison, stage : 6, caught : 0, species : "Sludge Pokemon"},
	{ name : "Muk", type : poison, stage : 14, caught : 0, species : "Sludge Pokemon"},
	{ name : "Shellder", type : water, stage : 6, caught : 0, species : "Bivalve Pokemon"},
	{ name : "Cloyster", type : ice, stage : 14, caught : 0, species : "Bivalve Pokemon"},
	{ name : "Gastly", type : ghost, stage : 6, caught : 0, species : "Gas Pokemon"},
	{ name : "Haunter", type : ghost, stage : 11, caught : 0, species : "Gas Pokemon"},
	{ name : "Gengar", type : ghost, stage : 19, caught : 0, species : "Shadow Pokemon"},
	{ name : "Onix", type : rock, stage : 9, caught : 0, species : "Rock Snake Pokemon"},
	{ name : "Drowzee", type : psychic, stage : 3, caught : 0, species : "Hypnosis Pokemon"},
	{ name : "Hypno", type : psychic, stage : 12, caught : 0, species : "Hypnosis Pokemon"},
	{ name : "Krabby", type : water, stage : 9, caught : 0, species : "River Crab Pokemon"},
	{ name : "Kingler", type : water, stage : 14, caught : 0, species : "Pincer Pokemon"},
	{ name : "Voltorb", type : electric, stage : 3, caught : 0, species : "Ball Pokemon"},
	{ name : "Electrode", type : electric, stage : 12, caught : 0, species : "Ball Pokemon"},
	{ name : "Exeggcute", type : grass, stage : 10, caught : 0, species : "Egg Pokemon"},
	{ name : "Exeggutor", type : grass, stage : 17, caught : 0, species : "Coconut Pokemon"},
	{ name : "Cubone", type : ground, stage : 10, caught : 0, species : "Lonely Pokemon"},
	{ name : "Marowak", type : ground, stage : 14, caught : 0, species : "Bone Keeper Pokemon"},
	{ name : "Hitmonchan", type : fighting, stage : 18, caught : 0, species : "Kicking Pokemon"},
	{ name : "Hitmonlee", type : fighting, stage : 18, caught : 0, species : "Punching Pokemon"},
	{ name : "Lickitung", type : normal, stage : 15, caught : 0, species : "Licking Pokemon"},
	{ name : "Koffing", type : poison, stage : 6, caught : 0, species : "Poison Gas Pokemon"},
	{ name : "Weezing", type : poison, stage : 14, caught : 0, species : "Poison Gas Pokemon"},
	{ name : "Rhyhorn", type : rock, stage : 10, caught : 0, species : "Spikes Pokemon"},
	{ name : "Rhydon", type : rock, stage : 17, caught : 0, species : "Drill Pokemon"},
	{ name : "Chansey", type : normal, stage : 15, caught : 0, species : "Egg Pokemon"},
	{ name : "Tangela", type : grass, stage : 14, caught : 0, species : "Vine Pokemon"},
	{ name : "Kangaskhan", type : normal, stage : 14, caught : 0, species : "Parent Pokemon"},
	{ name : "Horsea", type : water, stage : 3, caught : 0, species : "Dragon Pokemon"},
	{ name : "Seadra", type : water, stage : 8, caught : 0, species : "Dragon Pokemon"},
	{ name : "Goldeen", type : water, stage : 10, caught : 0, species : "Goldfish Pokemon"},
	{ name : "Seaking", type : water, stage : 14, caught : 0, species : "Goldfish Pokemon"},
	{ name : "Staryu", type : water, stage : 4, caught : 0, species : "Star Shape Pokemon"},
	{ name : "Starmie", type : water, stage : 7, caught : 0, species : "Mysterious Pokemon"},
	{ name : "Mr. Mime", type : psychic, stage : 15, caught : 0, species : "Barrier Pokemon"},
	{ name : "Scyther", type : bug, stage : 15, caught : 0, species : "Mantis Pokemon"},
	{ name : "Jynx", type : psychic, stage : 15, caught : 0, species : "Human Shape Pokemon"},
	{ name : "Electabuzz", type : electric, stage : 18, caught : 0, species : "Electric Pokemon"},
	{ name : "Magmar", type : fire, stage : 18, caught : 0, species : "Spitfire Pokemon"},
	{ name : "Pinsir", type : bug, stage : 18, caught : 0, species : "Stag Beetle Pokemon"},
	{ name : "Tauros", type : normal, stage : 15, caught : 0, species : "Wild Bull Pokemon"},
	{ name : "Magikarp", type : water, stage : 2, caught : 0, species : "Fish Pokemon"},
	{ name : "Gyrados", type : water, stage : 17, caught : 0, species : "Atrocious Pokemon"},
	{ name : "Lapras", type : water, stage : 15, caught : 0, species : "Transport Pokemon"},
	{ name : "Ditto", type : normal, stage : 15, caught : 0, species : "Transform Pokemon"},
	{ name : "Eevee", type : normal, stage : 5, caught : 0, species : "Evolution Pokemon"},
	{ name : "Vaporeon", type : water, stage : 13, caught : 0, species : "Bubble Jet Pokemon"},
	{ name : "Jolteon", type : electric, stage : 13, caught : 0, species : "Lightning Pokemon"},
	{ name : "Flareon", type : fire, stage : 13, caught : 0, species : "Flame Pokemon"},
	{ name : "Porygon", type : normal, stage : 18, caught : 0, species : "Virtual Pokemon"},
	{ name : "Omanyte", type : water, stage : 13, caught : 0, species : "Spiral Pokemon\n\n\n\n\nAll praise Lord Helix!"},
	{ name : "Omastar", type : water, stage : 17, caught : 0, species : "Spiral Pokemon"},
	{ name : "Kabuto", type : rock, stage : 13, caught : 0, species : "Shellfish Pokemon"},
	{ name : "Kabutops", type : rock, stage : 17, caught : 0, species : "Shellfish Pokemon"},
	{ name : "Aerodactyl", type : flying, stage : 18, caught : 0, species : "Fossil Pokemon"},
	{ name : "Snorlax", type : normal, stage : 18, caught : 0, species : "Sleeping Pokemon"},
	{ name : "Articuno", type : ice, stage : 20, caught : 0, species : "Freeze Pokemon"},
	{ name : "Zapdos", type : electric, stage : 20, caught : 0, species : "Electric Pokemon"},
	{ name : "Moltres", type : fire, stage : 20, caught : 0, species : "Flame Pokemon"},
	{ name : "Dratini", type : dragon, stage : 13, caught : 0, species : "Dragon Pokemon"},
	{ name : "Dragonair", type : dragon, stage : 16, caught : 0, species : "Dragon Pokemon"},
	{ name : "Dragonite", type : dragon, stage : 20, caught : 0, species : "Dragon Pokemon"},
	{ name : "Mewtwo", type : psychic, stage : 20, caught : 0, species : "Genetic Pokemon"},
	{ name : "Mew", type : psychic, stage : 21, caught : 0, species : "New Species Pokemon"}
];

var stage;

var DEBUG_DELAY_MS = 1000*60;
var MINUTE_DELAY_MS = 1000*60*10;

var DEBUG_TIMEFRAME_MS = 1000*60*5;
var TIMEFRAME_MS = 1000*60*60*4;

var YEAR = 1000*60*60*24*365;

function populatePokemon(){	
	if(DEBUG) console.log("Populate");
	for(var p = 1, p_len = Pokemon.length; p < p_len; p++){
		if(Pokemon[p].stage === stage && Pokemon[p].caught === 0){
			var random_time = new Date();	
			if(stage === 0){
				if(p < 20) random_time.setTime(random_time.getTime() + ( (p/3)+1) * 1000*60*2 );
				else random_time.setTime(random_time.getTime() + 1000*60*10);
			}
			else{
				random_time.setTime(random_time.getTime() + (DEBUG ? DEBUG_DELAY_MS + Math.random()*DEBUG_TIMEFRAME_MS : MINUTE_DELAY_MS + Math.random()*TIMEFRAME_MS));	
			}
			if(DEBUG) console.log("Pin " + Pokemon[p].name + " at " + random_time.toUTCString());
			var future_time = new Date();
			future_time.setTime(random_time.getTime() + YEAR);
			var pokepin = {
				"id" : "pokemon_"+p,
				"time" : future_time.toISOString(),
				"duration": 1,//30,
				"layout": {
					"title" : Pokemon[p].name,
					"subtitle" : Pokemon[p].species,
					"type" : "genericPin",
					"tinyIcon" : "system://images/NOTIFICATION_SNAPCHAT",
					"largeIcon": "system://images/NOTIFICATION_SNAPCHAT",
					"backgroundColor" : getBackgroundColor(Pokemon[p].type),
					"secondaryColor" : getForegroundColor(Pokemon[p].type),
					"primaryColor" : getForegroundColor(Pokemon[p].type)
				},
				"reminders" : [
					{
						"time": random_time.toISOString(),
						"layout": {
							"type" : "genericReminder",
							"tinyIcon": "system://images/GENERIC_WARNING",
							"largeIcon":"system://images/GENERIC_WARNING",
							"title": "A wild Pokemon appeared!"
						}
					}
				],
				"actions" : [
					{
						"title" : "Catch!",
						"type" : "openWatchApp",
						"launchCode" : p
					}
				]
			};
			insertUserPin(pokepin, null);
		}
	}
}

Pebble.addEventListener("ready", function(e){
	if(DEBUG) console.log("ready");
	
	stage = 0;
	if(localStorage.currentStage) stage = localStorage.currentStage*1;
	if(DEBUG) console.log("Stage: " + stage + ", Local Stage: " + localStorage.currentStage + " , Mew Stage: " + Pokemon[151].stage);
	
	
	if(localStorage.pokedex){
		var pokedex = localStorage.pokedex;
		pokedex = pokedex.split('');
		for(var i = 1, i_len = pokedex.length; i < i_len; i++){
			Pokemon[i].caught = pokedex[i]*1;
		}
		if(DEBUG) console.log("Pokedex: " + pokedex);
		if(DEBUG) console.log("Local Pokedex: " + localStorage.pokedex);
	}
	else{
		if(DEBUG) console.log("No Pokedex");
	}	
	
	if(!localStorage.oak){
		var now = new Date();
		var oak_pin = {
			"id" : "oak_pin",
			"time" : now.toISOString(),
			"duration" : 5,//,
			"layout" : {
				"title" : "Welcome to the world of Pokemon!",
				"type" : "genericPin",
				"tinyIcon" : "system://images/DURING_PHONE_CALL",
				"largeIcon" : "system://images/DURING_PHONE_CALL",
				"body" : "Hello, my name is Professor Oak. People call me the Pokemon Prof. I've created a Pokemon encyclopedia called Pokedex, but I will need your help to complete it!\n\nWild Pokemon will appear in your timeline - when one appears, choose 'More' to see which Pokemon it is, then 'Catch!' to add their data to your Pokedex. Catch them all and complete my research!!!\n\nIf you have any questions, feel free to reach out on the Pebble forums or Slack channel to my assistant, Mathew Reiss. Good luck!!!",
				"primaryColor": "#FFFFFF",
				"backgroundColor": "#0055AA"
			},
			"createNotification": {
				"layout" : {
					"type" : "genericNotification",
					"title" : "Incoming call from Professor Oak...",
					"tinyIcon" : "system://images/DURING_PHONE_CALL",
					"largeIcon" : "system://images/DURING_PHONE_CALL",
					"backgroundColor" : "#00AA00",
					"primaryColor" : "#000000"
				}
			},
			"updateNotification": {
				"time" : now.toISOString(),
				"layout" : {
					"type" : "genericNotification",
					"title" : "Incoming call from Professor Oak...",
					"tinyIcon" : "system://images/DURING_PHONE_CALL",
					"largeIcon" : "system://images/DURING_PHONE_CALL",
					"backgroundColor" : "#00AA00",
					"primaryColor" : "#000000"
				}
			}
			/*"reminders": [	
				{	
					"time" : now.toISOString(),
					"layout" : {
						"type" : "genericReminder",
						"tinyIcon": "system://images/DURING_PHONE_CALL",
						"largeIcon": "system://images/DURING_PHONE_CALL",
						"title": "Incoming call from Professor Oak...",
						"backgroundColor" : "#00AA00",
						"primaryColor" : "#000000"
					}
				}
			]*/
		};
		/*if(!DEBUG)*/ insertUserPin(oak_pin, null);
		
		/*if(!DEBUG)*/ localStorage.oak = true;
	}
		
	Pebble.sendAppMessage({"DATA" : "0"});
});

Pebble.addEventListener("appmessage", function(e){
	if(DEBUG) console.log("appmessage");
	
	var request = JSON.parse(JSON.stringify(e.payload)).DATA*1;
	
	if(DEBUG) console.log("Request: " + request);
	
	if(request === 0){ populatePokemon(); return; }
	//else if(request === 9000){ console.log("Local Storage cleared..."); localStorage.clear(); return; }
	else if(request >= 1000) return;
	
	
	Pokemon[request].caught = 1;
	var now = new Date();
	var removal_pin = {
		"id" : "pokemon_" + request,
		"time" : now.toISOString(),
	//	"duration": 1,
		"layout" : {
			"title" : "Caught " + Pokemon[request].name + "!",
	//		"type": "genericPin",
	//		"tinyIcon" : "system://images/NOTIFICATION_SNAPCHAT",
	//		"largeIcon" : "system://images/NOTIFICATION_SNAPCHAT",
	//		"backgroundColor" : getBackgroundColor(Pokemon[request].type),
	//		"primaryColor" : getForegroundColor(Pokemon[request].type)
		}//,
	//	"actions" : [
	//		{
	//			"title" : "View Entry",
	//			"type" : "openWatchApp",
	//			"launchCode" : 1000+request
	//		}
	//	]
	};
	deleteUserPin(removal_pin, null);
	//insertUserPin(removal_pin, null);
	
	if(request !== 0) populatePokemon(); //Re-scatters Pokemon, but delay prevents Pins from showing up while app is open (15 minutes)
	
	var pokedex = "0";
	for(var i = 1, i_len = Pokemon.length; i < i_len; i++){
		pokedex += Pokemon[i].caught+"";
	}
	localStorage.pokedex = pokedex;
	if(DEBUG) console.log("Pokedex: " + pokedex);
	if(DEBUG) console.log("Local Pokedex: " + localStorage.pokedex);
	
	var remaining_in_stage = 0;

	if(DEBUG) console.log("Stage: " + stage + ", Local Stage: " + localStorage.currentStage + " , Mew Stage: " + Pokemon[151].stage);
	
	for(var p = 1, p_len = Pokemon.length; p < p_len; p++){
		//console.log(Pokemon[p].name + " in Stage " + Pokemon[p].stage + " has " + (Pokemon[p].caught === 0 ? "not" : "") + " been caught.");
		if(Pokemon[p].stage === stage && Pokemon[p].caught === 0){ remaining_in_stage++; }
	}
	if(DEBUG) console.log("All Pokemon in stage? " + remaining_in_stage + ", for stage: " + stage);
	
	if(remaining_in_stage === 0){
		stage += 1;
		localStorage.currentStage = stage;
		
		if(DEBUG) console.log("Stage: " + stage + ", Local Stage: " + localStorage.currentStage + " , Mew Stage: " + Pokemon[151].stage);
		
		if(stage !==  Pokemon[151].stage + 1){
			var total_caught = 0;
			for(var c = 1, c_len = Pokemon.length; c < c_len; c++){
				if(Pokemon[c].caught === 1) total_caught++;
			}
			
			if(DEBUG) console.log("Next stage");
			populatePokemon();	
			var next_stage_pin = {
				"id" : "next_stage_pin",
				"time" : now.toISOString(),
				"duration" : 1,
				"layout" : {
					"title" : "Next Stage",
					"type" : "genericPin",
					"tinyIcon" : "system://images/GENERIC_CONFIRMATION",
					"largeIcon" : "system://images/GENERIC_CONFIRMATION",
					"body" : "Congratulations! You've caught " + total_caught + " Pokemon in total and advanced to the next stage - more Pokemon will be available in your Timeline soon!",
					"primaryColor": "#FFFFFF",
					"backgroundColor": "#0055AA"
				},
				"createNotification" : {
					"layout" : {
						"type": "genericNotification",
						"title" : "Next Stage",
						"tinyIcon" : "system://images/GENERIC_CONFIRMATION",
						"largeIcon" : "system://images/GENERIC_CONFIRMATION",
						"body" : total_caught + " Pokemon caught so far..."
					}
				},
				"updateNotification" : {
					"time" : now.toISOString(),
					"layout" : {
						"type": "genericNotification",
						"title" : "Next Stage",
						"tinyIcon" : "system://images/GENERIC_CONFIRMATION",
						"largeIcon" : "system://images/GENERIC_CONFIRMATION",
						"body" : total_caught + " Pokemon caught so far..."
					}					
				}
			};
			insertUserPin(next_stage_pin, null);
		}
		else{
			if(DEBUG) console.log("Game over!");
			var completion_pin = {
				"id" : "completion_pin",
				"time" : now.toISOString(),
				"duration" : 1,//30,
				"layout" : {
					"title" : "Congratulations!!!",
					"type" : "genericPin",
					"tinyIcon" : "system://images/DURING_PHONE_CALL",
					"largeIcon" : "system://images/DURING_PHONE_CALL",
					"body" : "Amazing! Absolutely amazing! You've managed to catch all 151 Pokemon! Truly remarkable...\n\nYou should share your exploits online! Be sure to visit the Pebble forums or Slack channel, and check out other great apps by my research assistant, Mathew Reiss. Thanks for playing!!!",
					"primaryColor": "#FFFFFF",
					"backgroundColor": "#0055AA"
				},
				"createNotification": {
					"layout" : {
						"type" : "genericNotification",
						"tinyIcon": "system://images/DURING_PHONE_CALL",
						"title": "Incoming call from Professor Oak...",
						"backgroundColor" : "#00AA00",
						"primaryColor" : "#000000"
					}
				},
				"updateNotification": {
					"time": now.toISOString(),
					"layout" : {
						"type" : "genericNotification",
						"tinyIcon": "system://images/DURING_PHONE_CALL",
						"title": "Incoming call from Professor Oak...",
						"backgroundColor" : "#00AA00",
						"primaryColor" : "#000000"						
					}
				}
			};
			insertUserPin(completion_pin, null);
			
			now.setTime(now.getTime() + 1000*60);
			
			var champion_pin = {
				"id" : "champion_pin",
				"time" : now.toISOString(),
				"duration" : 60*24*7,
				"layout" : {
					"title" : "Became Champion",
					"type" : "genericPin",
					"tinyIcon" : "system://images/TIMELINE_SPORTS",
					"largeIcon" : "system://images/TIMELINE_SPORTS",
					"body" : "Congratulations. You have earned the title of Pokemon Champion!",
					"primaryColor" : "#FFFFFF",
					"backgroundColor" : "#0055AA"
				}
			};
			insertUserPin(champion_pin, null);
		}
	}
});

function getBackgroundColor(type){
	if(type === fire) return "#FF0000";
	if(type === grass) return "#00AA00";
	if(type === water) return "#00AAFF";
	if(type === rock) return "#555500";
	if(type === ground) return "#FFAA55";
	if(type === ice) return "#AAFFFF";
	if(type === electric) return "#FFFF00";
	if(type === dragon) return "#005555";
	if(type === poison) return "#5555AA";
	if(type === fairy) return "#FF55FF";
	if(type === psychic) return "#AA00AA";
	if(type === ghost) return "#5500AA";
	if(type === flying) return "#55AAFF";
	if(type === normal) return "#AAAAAA";
	if(type === bug) return "#AAAA00";
	if(type === fighting) return "#AA5500";
	return "#FFFFFF";
}

function getForegroundColor(type){
	if(type === fire) return "#FFFFFF";
	if(type === grass) return "#FFFFFF";
	if(type === water) return "#FFFFFF";
	if(type === rock) return "#FFFFFF";
	if(type === ground) return "#000000";
	if(type === ice) return "#000000";
	if(type === electric) return "#000000";
	if(type === dragon) return "#FFFFFF";
	if(type === poison) return "#FFFFFF";
	if(type === fairy) return "#000000";
	if(type === psychic) return "#FFFFFF";
	if(type === ghost) return "#FFFFFF";
	if(type === flying) return "#000000";
	if(type === normal) return "#000000";
	if(type === bug) return "#000000";
	if(type === fighting) return "#FFFFFF";
	return "#000000";
}

/******************************* timeline lib *********************************/

// The timeline public URL root
var API_URL_ROOT = 'https://timeline-api.getpebble.com/';

/**
 * Send a request to the Pebble public web timeline API.
 * @param pin The JSON pin to insert. Must contain 'id' field.
 * @param type The type of request, either PUT or DELETE.
 * @param callback The callback to receive the responseText after the request has completed.
 */
function timelineRequest(pin, type, callback) {
  // User or shared?
  var url = API_URL_ROOT + 'v1/user/pins/' + pin.id;

  // Create XHR
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if(LIGHT_DEBUG || DEBUG) console.log('Timeline Response Received: ' + this.responseText + " for " + pin.id + ' (' + pin.layout.title + ' - ' + (pin.reminders ? pin.reminders[0].time : "") + ')');
  };
  xhr.open(type, url);

  // Get token
  Pebble.getTimelineToken(function(token) {
    // Add headers
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-User-Token', '' + token);

    // Send
    xhr.send(JSON.stringify(pin));
   // if(DEBUG) console.log('Timeline: Request sent');
  }, function(error) { console.error('Timeline: Error getting timeline token: ' + error); });
}

/**
 * Insert a pin into the timeline for this user.
 * @param pin The JSON pin to insert.
 * @param callback The callback to receive the responseText after the request has completed.
 */
function insertUserPin(pin, callback) {
  timelineRequest(pin, 'PUT', callback);
}

/**
 * Delete a pin from the timeline for this user.
 * @param pin The JSON pin to delete.
 * @param callback The callback to receive the responseText after the request has completed.
 */
function deleteUserPin(pin, callback) {
	timelineRequest(pin, 'DELETE', callback);
}

/***************************** end timeline lib *******************************/