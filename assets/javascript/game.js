

//GLOBAL VARIABLES
let computerChoices = []; //array of possible words to guess
let answerIndex = 0; //index of the current word to be guessed
let word = ""; //current word to be guessed
let wordArray = ""; //array of the characters belonging to current word to be guessed
let lettersGuessed = []; //array to keep track of letters Guessed
let userProgress = []; //array to keep track of the current guesses
let wins = 0; //keep track of the guessed words
let numGuesses = 12; //keep track of the number of guesses left
let userInput = ""; // current keyboard input
let isMatchFound = false;

initGame();

//after the page loads, listen for the following actions
document.onkeyup = function(event){
    //sanitize guess input a bit to fascilitate comparison with lowercase letters only
    userInput = event.key.toLowerCase();
    console.log(userInput);
   
    //searches through the array from the start to the end and returns the index at which 
    //the requested value was found—or -1 if it wasn’t found
    let notYetGuessed = lettersGuessed.indexOf(userInput);
    console.log("not yet guessed"+notYetGuessed);

    if ((numGuesses >= 0) && (notYetGuessed > -1)){
        lettersGuessed.push(userInput);
        $("#lettersGuessed").append(userInput);

        isMatchFound = false; //reset matchfound before every comparison
        compareAndReplace();

        //re-draw the the progress of the current word again
        render();      
    }
}

//initialize the game
function initGame(){
    computerChoices = ["apples", "peaches", "oranges"];
    //randomize the current word to be guessed
    answerIndex = Math.floor((Math.random() * computerChoices.length));
    word = computerChoices[answerIndex];
    console.log(word);
    wordArray = word.split(""); //split the word into characters only
    userProgress = []; //ensure the array is empty from any previous games
    //create initial display of dashes
    for (let i=0; i < wordArray.length; i++){
        userProgress.push("_");
    }
    //ensure letters guessed array and display are cleared from previous games
    lettersGuessed = [];
    $("#lettersGuessed").text("");
    
    render(); //draw initial display of dashes for the current word
}

//draw the progress of the current word being guessed
function render(){
    document.getElementById("userprogress").textContent = userProgress.join(" ");
    $("#numGuess").text(numGuesses);
    $("#numWins").text(wins);
}

//loop to run thru the array of the current word characters and replace the "-" with the 
// actual letter if matched
function compareAndReplace(){
    for(let j=0;j<wordArray.length; j++){
        if(userInput === wordArray[j]){
            userProgress[j] = userInput;
            isMatchFound = true;
        }
    } 
    //if isMatchFound is false after comparison, there was no match
    if (isMatchFound == false){
        numGuesses--;  
        if (numGuesses == 0){
            alert("Game is over!");
            wins = 0;
            numGuesses = 12;
            initGame();
        }  
    }
    //was this letter the last one in the word? if yes, then winner
    if (userProgress.join("") == word){
        wins++;
        initGame();
    }
    console.log(userProgress);
    console.log(numGuesses);
}
