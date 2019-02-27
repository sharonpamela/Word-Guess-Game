

//GLOBAL VARIABLES
let computerChoices = []; //array of possible words to guess
let lettersGuessed = []; //array to keep track of letters Guessed
let userProgress = []; //array to keep track of the current guesses
let word = ""; //current word to be guessed
let wordArray = ""; //array of the characters belonging to current word to be guessed
let userInput = ""; // current keyboard input
let answerIndex = 0; //index of the current word to be guessed
let wins = 0; //keep track of the guessed words
let numGuesses = 10; //keep track of the number of guesses left
let isMatchFound = false;

initGame();

//after the page loads, listen for the following actions
document.onkeyup = function(event){

    //sanitize guess input a bit to fascilitate comparison with lowercase letters only
    userInput = event.key.toLowerCase();
   
    //searches through the array from the start to the end and returns the index at which 
    //the requested value was found—or -1 if it wasn’t found
    let notYetGuessed = lettersGuessed.indexOf(userInput);
    console.log("not yet guessed: " + notYetGuessed);
   
    if ((numGuesses > 0) && (notYetGuessed == -1)){
        // lettersGuessed.push(userInput);
        isMatchFound = false; //reset matchfound before every comparison
        compareAndReplace();
        //re-draw the the progress of the current word again
        render();      
    }
}

// Play again on click.
// $("#play-again").on("click", function() {
//     // init the game and re-direct user to the original page
//     wins = 0;
//     numGuesses = 10;
//     window.location.href = 'index.html'; 
//     initGame(); 
//   });
// init the game and re-direct user to the original page 
$("#play-again").on("click", initGame());

//initialize the game
function initGame(){
    computerChoices =['ocean', 'lake', 'seawater', 'water', 'coral', 'antarctica', 'river ', 'earth', 'shellfish', 'freshwater', 'offshore', 'gulf', 'bay ', 'mediterranean', 'seaweed', 'fishing', 'shore', 'fish', 'land', 'coast', 'seabed', 'tidepool', 'coastal', 'aquaculture'];
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
    $(".lettersGuessed").text("");
    render(); //draw initial display of dashes for the current word
}

//draw the progress of the current word being guessed
function render(){
    document.getElementById("userprogress").textContent = userProgress.join(" ");
    $(".numGuess").text(numGuesses);
    $(".numWins").text(wins);
    // $(".lettersGuessed").append(userInput);
}

//loop to run thru the array of the current word characters and replace 
//the "-" with the actual letter if matched
function compareAndReplace(){
    for(let j=0;j<wordArray.length; j++){
        if(userInput === wordArray[j]){
            userProgress[j] = userInput;
            isMatchFound = true;
        }
    } 
    //was this letter the last one in the word? if yes, then winner
    if (userProgress.join("") == word){
        wins++;
        $(".lettersGuessed").text("");//reset the letters guesses
        initGame();
    }
    //if isMatchFound is false after comparison, there was no match
    if (isMatchFound == false) {
        if (numGuesses > 0){
            numGuesses--;
            lettersGuessed.push(userInput);
            $(".lettersGuessed").text(lettersGuessed.join(" "));
        }    
        if (numGuesses == 0){
            window.location.href = 'game-over.html';        
        }  
    }
}

//Features to implement:
// - words fall and as the user progresses, the word gets moved userProgress, if word reaches bottom, it's a loss
// - two modes of difficulty
// - display the letters of the alphabet and keep color coded track of right /wrong answers

    // //create a button for each letter of the alpahabet and display them
    // var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];
    
    // // 1. Create a for-loop to iterate through the letters array.
    // for (var i = 0; i < letters.length; i++) {

    //   // 2. Create a variable named "letterBtn" equal to $("<button>");
    //   var letterBtn = $("<button>");

    //   // 3. Then give each "letterBtn" the following classes: "letter-button" "letter" "letter-button-color".
    //   letterBtn.addClass("letter-button letter letter-button-color");

    //   // 4. Then give each "letterBtn" a data-attribute called "data-letter".
    //   letterBtn.attr("data-letter", letters[i]);

    //   // 5. Then give each "letterBtns" a text equal to "letters[i]".
    //   letterBtn.text(letters[i]);

    //   // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).
    //   $("#buttons").append(letterBtn);

    // }