prevGuesses = [];
hangImage = 0;
guessesLeft = 10;
var blanks = "";
var easy = ["cart", "jock", "flap", "ounce", "door", "leaf", "hat", "trap", "cord", "hair", "fish", "table", "flag", "box", "water", "sad", "loop", "snoopy", "rope", "frog", "plan", "milk", "heat", "heat", "circle", "copy", "square", "trip"];
var medium = ["splat", "crank", "spleen", "kodak", "keyboard", "otter", "lunar", "latte", "roses", "trout", "ulcer", "sonar", "state", "trend", "girls", "boys", "actor", "alert", "blood", "literary", "archer", " aprons", "batman", "shrek", "beaver", "ostrich", "addicts", "alcohol", "alchemy", "amulet", "bouncer","compass", "deflate"];
var hard = ["aorta", "snort", "computer", "soften", "ability", "absence", "assault", "bedroom", "battery", "auction", "chamber", "brother", "grandmother", "defence", "fiction", "abstract", "momentum", "repetition", "suburban", "woodlands", "tomorrow", "victorian", "embyros", "eviction", "aardvark", "werewolf", "aviation", "backyard", "conjugate", "blizzard", "artichoke", "asparagus", "autonomous", "dreadlocks", "drugstore", "dungeon", "hairstyle", "hopscotch", "milkshakes", "newspaper", "oxymoron"];
var letters = ["a","b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l","m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] ; //.......
function populateLetters(){
    //iterate over letter and for each item create an <option> tag per letter  check
    //only add the option if letters is NOT in prevGuesses
    var result = "";
    for(var i = 0; i< letters.length; i++) {
        if(prevGuesses.indexOf(letters[i]) < 0) {
            result += "<option value='" + letters[i] + "'>" + letters[i].toUpperCase() + "</option>"
        }
    }
    document.getElementById("selectLetter").innerHTML = result;
}

function startGame(){
    resetGame();
    var difficulty = document.getElementById("selectDifficulty").value;
    var startDivs = document.getElementsByClassName("hideOnLoad");
    for (var i = 0; i < startDivs.length; i++){
            startDivs[i].style.display="block";
    }
    if(difficulty == "easy"){
        var difficulty = easy;
    }
    if(difficulty == "medium"){
        var difficulty = medium;
    }
    if(difficulty == "hard") {
        var difficulty = hard;
    }
    word = difficulty[Math.floor(Math.random() * difficulty.length)];
    console.log(word);
    printWord();
}

function resetGame(){
    hangImage = 0;
    guessesLeft = 9;
    prevGuesses = [];
    populateLetters();
    document.getElementById("endBox").innerHTML = "";
    document.getElementById("playButton").innerHTML = "Restart";
    document.getElementById("guessArray").innerHTML = prevGuesses.toString();
    document.getElementById("hangman").src="img/" + hangImage + ".jpg";
    document.getElementById("guessesLeft").innerHTML = guessesLeft + " guesses remaining";
}
function checkGuess(){
    var guess = document.getElementById("selectLetter").value;
    var arrayCheck = prevGuesses.indexOf(guess.toLowerCase());
    if(arrayCheck > -1){
        alert("You have already guessed " + guess);
        return;
    } else {
        prevGuesses.push(guess.toLowerCase());
    }
    document.getElementById("guessArray").innerHTML = prevGuesses.toString();
    printWord();

    if(word.indexOf(guess) == -1){
        hangImage++;
    }

    if(hangImage == 9){
        lose();
    }
    if(blanks.indexOf("_") == -1){
        console.log("win");
        win();
    }
    document.getElementById("hangman").src="img/" + hangImage + ".jpg";
    guessesLeft = 9 - hangImage;
    if(guessesLeft == 1){
        document.getElementById("guessesLeft").innerHTML =  guessesLeft + " guess remaining";
    } else {
        document.getElementById("guessesLeft").innerHTML = guessesLeft + " guesses remaining";
    }
    populateLetters();
}


function lose(){
    document.getElementById("endBox").innerHTML = "You lost :(" + " the word was " + word;
    var startDivs = document.getElementsByClassName("hideOnLoad");
    for (var i = 0; i < startDivs.length; i++){
        startDivs[i].style.display="none";
    }
}

function win(){
    document.getElementById("endBox").innerHTML = "You win 😛";
    var startDivs = document.getElementsByClassName("hideOnLoad");
    for (var i = 0; i < startDivs.length; i++){
        startDivs[i].style.display="none";
    }
    hangImage = 10;
    document.getElementById("hangman").src="img/" + hangImage + ".jpg";
}


function printWord(){
    blanks = "";
    for (var i = 0; i < word.length; i++){
        if(prevGuesses.indexOf(word[i]) > -1) {
            blanks += word[i] + " "
        } else {
            blanks += "_ "

        }

    }
    document.getElementById("word").innerHTML = blanks;
}



