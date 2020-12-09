var timeMax = 60000 // miliseconds
var rowCount = 6 // max cards number in a row
var cardList = [
    "images/Bright_Knight.png",
    "images/Umbral_Rose.png",
    "images/Herrscher_of_Reason.png",
    "images/Knight_Moonbeam.png",
    "images/Starlit_Astrologos.png",
    "images/Striker_Fulminata.png",
    "images/Azure_Empyrea.png",
    "images/Black_Nucleus.png",
    "images/Darkbolt_Jonin.png",
    "images/Gothic_Rozamary.png",
    "images/Grand_Sage.png",
    "images/Hanami_Daimyo.png",
    "images/Herrscher_of_the_Void.png",
    "images/Herrscher_of_Thunder.png",
    "images/Rouged_Mayumi.png",
    "images/Shadow_Knight.png",
    "images/Shelley_Beastliya.png",
    "images/Stygian_Nymph.png",
    "images/Twilight_Paladin.png",
    "images/Vermilion_Knight.png"
]

showList(rowCount)
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

function showList(maxRow) {
    cardList = shuffle(cardList)
    var newCardList = cardList.splice(0, maxRow)
    newCardList = newCardList.concat(newCardList)
    newCardList = shuffle(newCardList)

    var rowList1 = document.createElement("div")
    var row1 = ""
    rowList1.classList.add("list-card")
    for (let i = 0; i < newCardList.length / 2; i++) {
        let blank = '<img class="blank" src="images/card.jpg">'
        let back = '<button class="card back" onclick="rotateCard(' + i + ')" style="z-index: 2;"></button>'
        let front = '<button class="card front" style="background-image: url(' + newCardList[i] + '); z-index: 1;"></button>'
        let listItem = '<div class="list-item">' + blank + front + back + '</div>'
        row1 += listItem
    }
    rowList1.innerHTML = row1
    document.getElementsByClassName("game")[0].appendChild(rowList1)

    var rowList2 = document.createElement("div")
    var row2 = ""
    rowList2.classList.add("list-card")
    for (let i = newCardList.length / 2; i < newCardList.length; i++) {
        let blank = '<img class="blank" src="images/card.jpg">'
        let back = '<button class="card back" onclick="rotateCard(' + i + ')" style="z-index: 2;"></button>'
        let front = '<button class="card front" style="background-image: url(' + newCardList[i] + '); z-index: 1;"></button>'
        let listItem = '<div class="list-item">' + blank + front + back + '</div>'
        row2 += listItem
    }
    rowList2.innerHTML = row2
    document.getElementsByClassName("game")[0].appendChild(rowList2)
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