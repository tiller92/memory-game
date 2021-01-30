const gameContainer = document.getElementById("game");

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

let card1 = ''
let card2 = ''
let firstry = 0
let secondtry = 0
let flip1 = ''
let flip2 = ''
let quickFlip = ''
let quickFlip2 = ''
let cheaterCheck = 0
let score = 0
const complete = []
let highScore = localStorage.getItem('highScore')
console.log('highScore', highScore)
let scoreDiv = document.getElementById('yourScore')
let currentBest = document.querySelector('#currentBest')
currentBest.textContent = `The best score so far is: ${highScore}`
currentBest.setAttribute('id', 'bestScore')
const restartBtnS = document.querySelector('#restartS')
restartBtnS.addEventListener('click', function() { window.location.reload() })


//const startBtn = document.querySelector('#start')
//const restartBtn = document.querySelector('#restart')
//let startSwitch = false

//startBtn.addEventListener('click', function(start) {
//    startSwitch = true
//        // console.log(true)
//})
//restartBtn.addEventListener('click', function(restart) {
//   startSwitch = false
//})

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);


        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}


// TODO: Implement this function!

function handleCardClick(event) {
    // you can use event.target to see which element was 
    // logs the first event as the the first try     
    if (firstry === 0) {
        card1 = event.target.classList[0]
        console.log('first try', card1)
        flip2 = event.target
        quickFlip1 = event.target
        quickFlip1.setAttribute('id', card1)
        setTimeout(function() {
            if (card1 !== undefined || card1 !== null) {
                let remove = document.getElementById(card1)
                remove.removeAttribute('id')
            }
        }, 1000)
        console.log(quickFlip1)
        score++
        scoreDiv.innerHTML = `Your Current Score: ${score}`
        firstry += 1
        return
    }
    // logs the second try
    if (secondtry === 0 && firstry === 1) {
        card2 = event.target.classList[0]
        quickFlip2 = event.target
        quickFlip2.setAttribute('id', card2)
        setTimeout(function() {
            let remove = document.getElementById(card2)
            remove.removeAttribute('id')
        }, 1000)
        console.log('second try', card2)
        secondtry += 1
        score++
        scoreDiv.innerHTML = `Your Current Score: ${score}`
    }

    setTimeout(function() {
        // if first try does not equal second try
        if (card1 !== card2 && firstry === 1 && secondtry === 1) {
            console.log('cards dont match')
            card1 = ''
            card2 = ''
            flip1 = ''
            flip2 = ''
            firstry--
            secondtry--
            return
        }
        // if first try matches second try 
        if (card1.classList === card2.classList && firstry !== 0 && quickFlip1 !== quickFlip2) {
            console.log('match', card1, card2)
            let flip1 = event.target
            flip1.setAttribute('id', card1)
            flip2.setAttribute('id', card1)
            flip1.removeEventListener('click', handleCardClick)
            flip2.removeEventListener('click', handleCardClick)
            score++
            complete.push(card1)
            if (complete.length === COLORS.length / 2) {
                console.log('GAME OVER')
                    // end game pop up that gives score and high score, with the restart button
                let gameOver = document.querySelector('body')
                gameOver.style.backgroundColor = 'black'
                let scorePopUp = document.createElement('div')
                scorePopUp.setAttribute('id', 'scorePopUp')
                gameOver.append(scorePopUp)
                let restartBtn = document.createElement('btn')
                restartBtn.setAttribute('id', 'restart')
                scorePopUp.append(restartBtn)
                let scoreSpan = document.createElement('div')
                scoreSpan.setAttribute('class', 'scoreDiv')
                scoreSpan.innerHTML = `${score}`
                scorePopUp.append(scoreSpan)
                    //local storage
                if (highScore > score) {
                    localStorage.setItem('highScore', score)
                }
                console.log(score, highScore)
                if (highScore <= 1) {
                    localStorage.remove('highScore')
                }
            }
            // reset after matches
            secondtry--
            firstry--
            flip1 = ''
            flip2 = ''
            card1 = ''
            card2 = ''
                // just to ensure that things reset
        } else {
            secondtry--
            firstry--
            cheaterCheck--
            flip1 = ''
            flip2 = ''
            card1 = ''
            card2 = ''
        }

    }, 1000)
}


// when the DOM loads
createDivsForColors(shuffledColors);