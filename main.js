//Letters 

const letters = "abcdefghijklmnopqrstuvwxyz"

//get array from letters
let lettersArray = Array.from(letters)

//select letters container
let lettersContainer = document.querySelector(".letters")

//generate letters 
let spanLetter
lettersArray.forEach((letter) =>{
    
    //create span
    spanLetter = document.createElement("span")
    
    //class to span
    spanLetter.className = "letter-box"

    //create letter Text Node
    let theLetter = document.createTextNode(letter)

    //append theletter to the span
    spanLetter.appendChild(theLetter)

    //append the span to the letters container
    lettersContainer.appendChild(spanLetter)

})

//object of words and categories

const words = {
    Programming_Language:["Python","Java","C","JavaScript","PHP","SQL","R","Groovy"],
    movie:["Inception","Prestige","Pulb Fiction","Interstellar","Titanic","La La Land","Nightmare Alley","Venom","Army Of Thieves","Enola Holmes","Psycho"],
    person:["Albert Einstein","Cleopatra","Abraham Lincoln","Elon Musk","Marilyn Monroe","Marie Curie","Isaac Newton","Galileo Galilei","Charles Darwin","Thomas Edison","Stephen Hawking","Archimedes","Benjamin Franklin","George Washington","Nikola Tesla","Pythagoras","Whiplash","Memento"],
    country:["Argentina","Australia","Algeria","Czechia","Czechia","Equatorial Guinea","Guatemala","Honduras","Liechtenstein","Luxembourg","Luxembourg","North Korea","Palestine","Netherlands","Morocco","Morocco","Libya","Kyrgyzstan","Kazakhstan","Honduras","Germany","Denmark","Cambodia","Bangladesh","Afghanistan"]
}

//get random property
let allKeys = Object.keys(words)

//random number depend on key length
let randomPropNumber = Math.floor(Math.random() * allKeys.length); 
//random key
let randomProbName = allKeys[randomPropNumber]
//random value
let randomPropValue = words[randomProbName]
// random number depends on size of values 
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// random name
let randomName = randomPropValue[randomValueNumber]


document.querySelector(".category span").innerHTML = randomProbName

//select letter-Guess div
let letterGuessContainer = document.querySelector(".letters-guess")

//convert choosen name to array 
let ArrayGuess = Array.from(randomName.toLowerCase())

//create span on words
ArrayGuess.forEach(letter =>{
    //create empty span
    let emptySpan = document.createElement("span")

    //if letter is space
    if(letter === " "){

        //add class to span
        emptySpan.className = "has-space"

    }

    //append span to letterGuessContainer
    letterGuessContainer.appendChild(emptySpan)
})

//handle clicking on letter

//select spans that will carry the right letters
let guessSpans = document.querySelectorAll(".letters-guess span")

//setting wrong attempts
let wrongAttempts = 0

//select the draw element
let theDraw = document.querySelector(".hangman-draw")

document.addEventListener("click",(e)=>{

    //set status
    let thestatus = false

    if(e.target.className === "letter-box"){

        e.target.classList.add("clicked")

        //get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase()

        ArrayGuess.forEach((wordletter,wordindex) =>{

            if(theClickedLetter == wordletter){
                
                //set status to correct
                thestatus = true

                //loop on all spans
                guessSpans.forEach((span,spanindex) =>{
                    
                    if(wordindex === spanindex){
                        span.innerHTML = theClickedLetter
                        span.classList.add("correct")
                    }
                })
            }
        })
        //outside loop

        if(thestatus != true){ // if letter is wrong

            //if wrong play fail audio
            let failSuccess = document.querySelector(".wrong")
            failSuccess.play()
            failSuccess.volume = 0.2
        
            wrongAttempts ++;
            theDraw.classList.add(`wrong-${wrongAttempts}`)
            
            //add class wrong on the draw element
            if(wrongAttempts === 8){ //dont contain wrong-8
                endgame();
                lettersContainer.classList.add("finished");
            }
        }
        else{
            //if true play true audio
            let audioSuccess = document.querySelector(".true")
                audioSuccess.play()
                audioSuccess.volume = 0.2
        }

        let x = Array.from(letterGuessContainer.children)
        let filterGuess = x.filter((e)=>e.classList.contains('correct') || e.classList.contains('has-space'));
        if(filterGuess.length == randomName.length){
            youWin();
    }   
}
})

// end game function 
function endgame(){
    //create popup
    let div = document.createElement("div")

    //creatext
    div.appendChild(document.createTextNode(`Game Over , the word is ${randomName}`))

    //add class on div
    div.className = "popUpLose"

    //append to the body
    document.body.appendChild(div)

    //bluring the game
    let container = document.querySelector(".container")
    container.style.filter = "blur(8px)"

    let GameOver = document.querySelector(".GameOver")
    GameOver.play()
    GameOver.volume = 0.1
}

// youWin function

function youWin(){

    //create popup
    let div = document.createElement("div")

    //creatext
    div.appendChild(document.createTextNode(`Good Job, you won after ${wrongAttempts} attempts`))

    //add class on div
    div.className = "popUpWin"

    //append to the body
    document.body.appendChild(div)

    //bluring the game
    let container = document.querySelector(".container")
    container.style.filter = "blur(8px)"

    let Win = document.querySelector(".Win")
    Win.play()
    Win.volume = 0.1
}




