var timeMax = 20000 // miliseconds
var cardList = [
    "images/Bright_Knight.png",
    "images/Umbral_Rose.png",
    "images/Herrscher_of_Reason.png",
    "images/Knight_Moonbeam.png",
    "images/Starlit_Astrologos.png",
    "images/Striker_Fulminata.png"
]

showList()
var cardListShow = [] // array with per cardItem object include (front, back)

var listItem = document.querySelectorAll(".list-item")
var cardFront = document.querySelectorAll(".card.front")
var cardBack = document.querySelectorAll(".card.back")

for (let i = 0; i < listItem.length; i++) {
    let cardItem = {
        front: "",
        back: ""
    }
    cardItem.front = cardFront[i]
    cardItem.back = cardBack[i]
    cardListShow.push(cardItem)
}

var validateCard = [] // array 2 card for validating them
var validateCount = 0 // count the matched card
var runTime = 0

// ====================================================================
function startGame() {
    document.querySelectorAll(".cover.start-game")[0].classList.add("hide")
    timeStart()
}

function endGame(status) { // status = "win" or "lose"
    document.querySelectorAll(".cover.end-game")[0].classList.remove("hide")
    if (status == "win") {
        document.querySelectorAll(".game-over.win.hide")[0].classList.remove("hide")
        clearInterval(runTime)
    } else if (status == "lose") {
        document.querySelectorAll(".game-over.lose.hide")[0].classList.remove("hide")
    }
}

function timeStart() {
    var maxWidth = document.getElementsByClassName("timer")[0].offsetWidth
    var timeStep = maxWidth / timeMax
    var timeRun = 10
    runTime = setInterval(() => {
        timeRun += timeStep
        document.querySelectorAll(".time")[0].style.width = timeRun + "px"
        if (timeRun >= maxWidth) {
            clearInterval(runTime)
            endGame("lose")
        }
    });
}

function checkWinGame() {
    if (validateCount == 6) {
        endGame("win")
    }
}

function resetGame() {
    window.location.reload(true)
}

function showList() {
    var cardList1 = shuffle(cardList)
    var cardList2 = shuffle(cardList)
    cardList = cardList1.concat(cardList2)
    cardList = shuffle(cardList)
    var cardImg = document.querySelectorAll(".card.front")

    for (let i = 0; i < cardList.length; i++) {
        cardImg[i].setAttribute("style", "background-image:url(" + cardList[i] + ")")
    }
}

function rotateCard(index) {
    revealCard(index)
    validateCard.push(cardListShow[index])
    setTimeout(() => {
        if (validateCard[1] != undefined) {
            if (checkCard(validateCard[0].front, validateCard[1].front) == true) {
                for (let i = 0; i < validateCard.length; i++) {
                    validateCard[i].front.classList.add("fade")
                    validateCard[i].back.classList.add("fade")
                    validateCard[i].front.disabled = true
                    validateCard[i].back.disabled = true
                }
                validateCount++
                checkWinGame()
            } else {
                reserveCard()
            }
            validateCard = []
        }
    }, 500)
}

function disableAllCard(status) {
    for (let i = 0; i < cardListShow.length; i++) {
        cardListShow[i].front.disabled = status
        cardListShow[i].back.disabled = status
    }
}

function revealCard(index) {
    disableAllCard(true)
    cardListShow[index].front.classList.add("rotate")
    cardListShow[index].front.style.zIndex = 2
    cardListShow[index].back.classList.add("rotate")
    cardListShow[index].back.style.zIndex = 1
    setTimeout(() => {
        disableAllCard(false)
    }, 500);
}

function reserveCard() {
    for (let i = 0; i < cardListShow.length; i++) {
        cardListShow[i].front.classList.remove("rotate")
        cardListShow[i].front.style.zIndex = 1
        cardListShow[i].back.classList.remove("rotate")
        cardListShow[i].back.style.zIndex = 2
    }
}

function checkCard(img1, img2) {
    if (img1.style.backgroundImage === img2.style.backgroundImage) {
        return true
    } else return false
}

// ====================================================================
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}