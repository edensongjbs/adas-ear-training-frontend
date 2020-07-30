

// Playing the Keyboard

const keyBindings = {
    "a": "C3",
    "s": "D3",
    "d": "E3",
    "f": "F3",
    "g": "G3",
    "h": "A3",
    "j": "B3",
    "k": "C4",
    "w": "C#3",
    "e": "D#3",
    "t": "F#3",
    "y": "G#3",
    "u": "A#3"
}

const chordBindings = {
    "I": ["C3", "E3", "G3"],
    "V": ["G3", "B3", "D3"],
    "IV": ["F3", "A3", "C4"],
    "ii": ["D3", "F3", "A3"],
    "vi": ["A3", "C4", "E3"],
    "iii": ["E3", "G3", "B3"]
}

let localUserObject = {}

let charArea = document.querySelector(".character-area img")

let globalShowNotes = false //if user wants to always display notes being played

const allPitches = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "C#", "D#", "F#", "G#", "A#"]

function releaseAll() {
    for (const note of allPitches) {synth.triggerRelease(note)}
}

const allNotes = document.querySelectorAll('.white-note, .black-note')
const allChords = document.querySelectorAll('.chords button')

var synth = new Tone.PolySynth(4, Tone.Synth, {
    oscillator : {
          type : "square"
      }
  }).toMaster();

var compSynth = new Tone.PolySynth(4, Tone.Synth, {
    oscillator : {
          type : "square"
      }
  }).toMaster();


document.addEventListener('keydown', (e) => {
    if (e.repeat){ return }
    if (modalOpen){ return }
    playNote(keyBindings[e.key])
})

document.addEventListener('keyup', (e) => {
    if (modalOpen){ return }
    releaseNote(keyBindings[e.key])
})

for (const note of allNotes) {
    if (Modernizr.touchevents) {
        note.addEventListener('touchstart', () => {
            playNote(event.target.id)
        })
        note.addEventListener('touchend', () => {
            releaseNote(event.target.id)
        })
    }
    else {
        note.addEventListener('mousedown', () => {
            playNote(event.target.id)
        })
        
        note.addEventListener('mouseup', () => {
            releaseNote(event.target.id)
        })
    }  
}

for (const chord of allChords) {
    chord.addEventListener("mousedown", (e) => {
        // console.log("heyo")
        playChord(chordBindings[event.target.innerText])
    })
}

playChord = (chord) => {
    for (const n of chord)
    {synth.triggerAttackRelease(n, '2n')}
    if (readyToAnswer && currentQuestion.chordsAllowed) {
        currentAnswer = chord
        console.log(currentAnswer)
        answerRound()
    }
}

function highlightNote(note) {
    const noteDiv = document.querySelector(`#${note.replace("#", '\\#')}`)
    noteDiv.classList.add('playing')
}

function unhighlightNote(note) {
    const noteDiv = document.querySelector(`#${note.replace("#", '\\#')}`)
    noteDiv.classList.remove('playing')
}

playNote = (note) => {
    synth.triggerAttack(note)
    // const noteDiv = document.querySelector(`#${note.replace("#", '\\#')}`)
    // noteDiv.classList.add('playing')
    highlightNote(note)
    if (readyToAnswer) {
        currentAnswer.push(note)
        console.log(currentAnswer)
    }
}

releaseNote = (note) => {
    synth.triggerRelease(note);
    // const noteDiv = document.querySelector(`#${note.replace("#", '\\#')}`)
    // noteDiv.classList.remove('playing')
    unhighlightNote(note)
    if (readyToAnswer && (currentAnswer.length >= currentQuestion.notes.length)) {answerRound()}
}


//Display Logic and Responsiveness

//let vmsg = new SpeechSynthesisUtterance();
//let voices 



function alertUser(msg) {
    speakAndy()
    releaseAll()
    alertMessage = () => messageDiv.innerText=msg
    // speechText()
    alertMessage()
    messageDiv.click()

    // $messageDiv.trigger('click')
}

function customPronounce(wordAry) {
    // const wordAry = text.split(' ')
    for (const wordIndex in wordAry) {
        switch (wordAry[wordIndex]) {
            case 'do':
                wordAry[wordIndex] = "doh"
                break
            case 'Do':
                wordAry[wordIndex] = "doh"
                break
            case 'Do.':
                wordAry[wordIndex] = "doh."
                break
            case 'Do!':
                wordAry[wordIndex] = "doh!"
                break
            case 'Re':
                wordAry[wordIndex] = "ray"
                break
            case 'Re!':
                    wordAry[wordIndex] = "ray!"
                    break
            case 'Re.':
                    wordAry[wordIndex] = "ray."
                    break
            case 'Re,':
                    wordAry[wordIndex] = "ray,"
                    break
            case 'I':
                // debugger
                if (wordAry[(parseInt(wordIndex)+1)]=="chord" || wordAry[(parseInt(wordIndex)+1)]=="chord!" || wordAry[(parseInt(wordIndex)+1)]=="chord." || wordAry[(parseInt(wordIndex)+1)]=="chord,"  ) {wordAry[wordIndex] = "1"}
                break
            case 'I,':
                wordAry[wordIndex] = "1,"
                break
            case 'VI':
                wordAry[wordIndex] = "6"
                break
            case 'VI,':
                wordAry[wordIndex] = "6,"
                break
            case 'V':
                wordAry[wordIndex] = "5"
                break
            case 'V,':
                wordAry[wordIndex] = "5,"
                break
            case 'IV':
                wordAry[wordIndex] = "4"
                break
            case 'IV,':
                wordAry[wordIndex] = "4,"
                break
            case 'iii':
                wordAry[wordIndex] = "3"
                break
            case 'iii,':
                wordAry[wordIndex] = "3,"
                break
            case 'ii':
                wordAry[wordIndex] = "2"
                break
            case 'ii,':
                wordAry[wordIndex] = "2,"
                break
        }
    }
    // console.log(wordAry)
    return wordAry.join(' ')
}

function speechText(e) {
    console.log(e)
    vmsg = new SpeechSynthesisUtterance();
    vmsg.voice = r
    vmsg.pitch = 2
    const messageAry = messageDiv.innerText.split(" ")
    vmsg.text = customPronounce(messageAry) 
    // vmsg.text = messageDiv.innerText;
    window.speechSynthesis.speak(vmsg)
    silentDelay = Math.round(messageAry.length*wordDelay*0.60)
    setTimeout(stillAndy, silentDelay)
}

const wrapper = document.querySelector('div.wrapper')
let messsageDiv

document.addEventListener("DOMContentLoaded", () => {
    resizeKeybed()
    messageDiv = document.querySelector('#msg')
    initialAuthorize()
    // alertUser(r)
     //7 17 37 49
})

function resizeKeybed() {
    if (window.screen.availHeight > 375) {
        const width = parseInt(getComputedStyle(wrapper).width.split('px')[0])
        wrapper.style.height = `${width/2}px`
    }
}

window.addEventListener("resize", resizeKeybed)

let modalOpen = false
const menuButton = document.querySelector('#menu')
const modalDiv = document.querySelector('.window-cover')
const modalA = document.querySelector('.modal-a')
const modalB = document.querySelector('.modal-b')


const loginLink = document.querySelector('#login-link')
const logoutLink = document.querySelector('#logout-link')

loginLink.addEventListener("click", e => {
    if (modalOpen) {
        if (![...modalA.classList].includes("hide")) {
            modalA.classList.add("hide")
            modalB.classList.remove("hide")
        }      
        modalDiv.classList.add('hide')
        modalOpen = false
        e.target.innerText="Login/Signup"
        e.target.classList.remove('menu-open')
    }
    else {
        if (![...modalA.classList].includes("hide")) {
            modalA.classList.add("hide")
            modalB.classList.remove("hide")
        }   
        modalDiv.classList.remove('hide')
        modalOpen = true
        e.target.innerText="Back"
        e.target.classList.add('menu-open')
    }
})

// Game Logic

let readyToAnswer = false
let currentAnswer = []

const Correct = ["That's Right!", "Great Work!", "Fantastic!"]
const Incorrect = ["Keep Trying!", "So close...", "You'll get it next time!"]

class Question {
    constructor(notes, question, playItFirst = false, ordered = false, chordsAllowed = false, arpeggiate= true) {
        this.question=question
        this.notes=notes
        this.playItFirst=playItFirst
        this.ordered=ordered
        this.chordsAllowed=chordsAllowed
        this.guesses=0
        this.completed=false
        this.arpeggiate=arpeggiate
    }
    ask() {
        console.log("asking")
        alertUser(this.question)
        const voiceDelay = this.question.split(" ").length*wordDelay
        if (this.playItFirst) {
            // alert("woof")
            // setTimeout(playCurrentSequence, 1000)
            setTimeout(() => {
                stillAndy()
                playComp(this.arpeggiate)
            }, voiceDelay)
        }
        else {setTimeout(stillAndy, voiceDelay)}
        readyToAnswer = true;
    }
    compareReponse(res) {
        this.guesses++
        const flatRes = Object.assign([], res)
        const flatNotes = this.notes.map(e => e.note_value)
        if (!this.ordered){
            flatRes.sort()
            flatNotes.sort()
        }
        return !(flatNotes.find((e, i) => e!==flatRes[i]))
    }
    tryAgain() {
        const tryAgainMessage = "Let's Try Again..."
        alertUser(tryAgainMessage)
        const voiceDelay = tryAgainMessage.split(" ").length*wordDelay*1.5
        console.log(this)
        const boundAsk = this.ask.bind(this)
        setTimeout(() => {
            stillAndy()
            boundAsk()
        }, voiceDelay)
    }
    questionOver() {
        let q = round.indexOf(currentQuestion)
        if (q+1 === round.length) {setTimeout(gameOver, 2000)}
        else {setTimeout(() => dealRound(q+1), 2000)}
    }
    badFeedback() {
        const incorrectMessage = Incorrect[Math.floor((Math.random()*(Incorrect.length)))]
        alertUser(incorrectMessage)
        console.log(this)
        const voiceDelay = incorrectMessage.split(" ").length*wordDelay*2
        const boundTryAgain = this.tryAgain.bind(this)
        const boundQuestionOver = this.questionOver.bind(this)
        if (this.guesses < 3) { setTimeout(() => {
            stillAndy()
            boundTryAgain()
        }, voiceDelay) }
        else {
            this.completed = true
            this.correct = false
            loadNewSequence(this.notes.map(e => e.note_value))
            setTimeout (() => {
                const moveOnMessage = "Let's Move On.  This was the answer:"
                
                const voiceDelay2 = moveOnMessage.split(" ").length*wordDelay
                alertUser(moveOnMessage)
                setTimeout(() => {
                    stillAndy()
                    playComp(true, true)
                    setTimeout(boundQuestionOver, (round.length*noteDuration*1000)+500)
                }, voiceDelay2+500)
            }, voiceDelay)
        }
    }
    goodFeedback() {
        // debugger
        this.completed = true
        this.correct = true
        console.log(this)
        const correctMessage = Correct[Math.floor((Math.random()*(Correct.length)))]
        alertUser(correctMessage)
        const voiceDelay = correctMessage.split(" ").length*wordDelay
        const boundQuestionOver = this.questionOver.bind(this)
        setTimeout(() => {
            stillAndy()
            boundQuestionOver()
        }, voiceDelay)
    }
}

//const q1 = new Question (["D3", "G3", "B3"], "Play a V chord", false, false, true)
//const q2 = new Question (["C3", "D3", "F3"], "Listen to the following notes and play them back in order", true, true)
//const q3 = new Question (["F3", "A3", "C4"], "Play back the following chord", true, false, true)

let round //= [q1, q2, q3]
let game_info
//let numGuesses //haven't used yet!!
let numCorrect //haven;t used yet

let currentQuestion //current question index

function dealRound(q) {
    readyToAnswer = false
    currentAnswer = []
    currentQuestion = round[q]
    if (round[q].playItFirst){loadNewSequence(round[q].notes.map(e => e.note_value))}
    else {loadNewSequence([])}
    round[q].ask()
    // readyToAnswer = true
}

function makeQuestionObjects() {
    round = []
    for (const eachQuestion of game_info.questions) {
        const newQObject = new Question(eachQuestion.notes, eachQuestion.text, eachQuestion.play_first, eachQuestion.orderMatters, eachQuestion.chordsAllowed, eachQuestion.arpeggiated)
        round.push(newQObject)
    } 
}

function patchUserLevel(userLevelObject) {
    const uselev = game_info.user_level_id
    configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(userLevelObject)
    }
    fetch (`${url}/user_levels/${uselev}`, configObj).then(res => res.json()).then(json => console.log(json))
}

function tallyUpRound() {
    const totalGuesses = round.reduce((m,q) => {
        return m + q.guesses
    }, 0)
    const allCorrect = round.every(q => q.correct)
    const score = Math.round(((round.filter(q => q.correct).length)/totalGuesses)*100)
    // debugger
    currentLevel = game_info.level_num
    let userLevelObject = {}
    if (allCorrect && localUserObject[currentGame].highest_completed_level < currentLevel ) {
        // inc level locally
        localUserObject[currentGame].highest_completed_level = currentLevel
        userLevelObject = Object.assign({}, userLevelObject, {completed:true})
        // check to see if score > high score
        if (localUserObject[currentGame].high_scores[currentLevel-1] < score) {
            localUserObject[currentGame].high_scores[currentLevel-1] = score
            userLevelObject = Object.assign({}, userLevelObject, {best_score: score})
        }
        patchUserLevel(userLevelObject)
        // if so, update locally
        // send fetch to update one or both of those values
    }
    else {
        if (localUserObject[currentGame].high_scores[currentLevel-1] < score) {
            localUserObject[currentGame].high_scores[currentLevel-1] = score
            userLevelObject = Object.assign({}, userLevelObject, {best_score: score})
            patchUserLevel(userLevelObject)
        }
        // is score for this level > high score
        // if so, update locally and send fetch
        // else, just end round
    }

}

function gameOver() {
    alertUser('Good Game!')
    tallyUpRound()
    setTimeout(stillAndy, 500)
    // We'll want to fetch here as well!

}

function answerRound() {
    readyToAnswer = false
    if (currentQuestion.compareReponse(currentAnswer)){currentQuestion.goodFeedback()}
    else {
        currentAnswer = []
        currentQuestion.badFeedback()
    }
    
    //  These three lines are being moved to class def

    // let q = round.indexOf(currentQuestion)
    // if (q+1 === round.length) {setTimeout(gameOver, 2000)}
    // else {setTimeout(() => dealRound(q+1), 2000)}
}

let url = 'http://localhost:3000'
let currentGame, currentLevel
// let gameNumber = 1
// let levelNumber = 1

//setTimeout(() => console.log(window.speechSynthesis.getVoices()), 5000)

function playGame(gameNum, levelNum) {
    if (modalOpen){
        logoutLink.click()
    }
    // debugger
    //vmsg.voice = voices[49]
    // debugger
    // randLevel = Math.floor((Math.random()*11))+1
    currentGame = `game_${gameNum}`
    currentLevel = levelNum
    fetch(`${url}/games/${gameNum}/?level=${levelNum}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${localStorage.token}`} 
    })
    .then(res => res.json())
    .then(json => {
        game_info = json
        // round = game_info.questions
    })
    .then(() => {
        alertUser(game_info.game_message)
        const voiceDelay = game_info.game_message.split(" ").length*wordDelay
        // userLevelId = game_info
        makeQuestionObjects()
        setTimeout(() =>{
            alertUser(game_info.level_message)
            const voiceDelay = game_info.level_message.split(" ").length*wordDelay
            setTimeout(() => {
                stillAndy()
                dealRound(0)
            }, voiceDelay)
        }, voiceDelay)
    }).catch(alertUser)
    // .then( () => dealRound(0))
    // Takes a Game object? array of questions
    // We'll need Question class and possibly Round/Game class(es)
    // theGameArray.forEach(playRound)
    // For each question:
    // Ask question
    // Reset Answer Array
    // Loop until Response Array is of the right size?
    // Compare user response array against right answer
    // Keep track of # of tries
    // Keep track of score
    // Give Response
    // Reset number of tries
}

//Question Seeding

//Playing Questions

let currentCompNotes
let currentCompTimes = [0, '0:3', '0:6', '0:9', '1:2']
let currentIndex = 0;
let noteDuration = 1

function playCurrentSequence() {
    if (Tone.Transport.state==="started") {Tone.Transport.toggle()}
    Tone.Transport.toggle()
}

function clearCurrentSequence() {
    for (const i in Tone.Transport._scheduledEvents){
        console.log(i)
        Tone.Transport.clear(i)
    }
}

function highLightSequence(lastNote, upComingNotes, timeInterval) {
    // debugger
    // console.log("highlighting "+upComingNotes)
    // console.log("unhighlighting "+lastNote)
    // console.log("length of array"+upComingNotes.length)
    if (upComingNotes.length > 0) {
        const noteToPlay=upComingNotes[0]
        highlightNote(noteToPlay)
        const newArray = Object.assign([], upComingNotes.slice(1, upComingNotes.length))
        setTimeout(() => highLightSequence(noteToPlay, newArray, timeInterval), timeInterval)
    }
    if (lastNote) {unhighlightNote(lastNote)}
}

function playComp(arp = false, highlight=false) {
    let nextTime = 0
    tempNoteDuration = arp ? noteDuration : (2*noteDuration)
    //let lastNote
    // const now = Tone.now()

    if (highlight || globalShowNotes) { highLightSequence(null, Object.assign([], currentCompNotes), noteDuration*1000) }
    for (const note of currentCompNotes){
        console.log(note)
        compSynth.triggerAttack(note, (Tone.now()+nextTime))
        compSynth.triggerRelease(note, (Tone.now()+nextTime+noteDuration))
        nextTime = nextTime+(arp ? noteDuration: 0 )
        // debugger
    }
}

function loadNewSequence(ar) {
    clearCurrentSequence()
    currentCompNotes = ar
    currentIndex = 0
    // playComp()
    //setup() 
}

// loadNewSequence(["C4", "E4", "G4"])

function inc() {
    if (currentIndex===(currentCompNotes.length-1)){
            currentIndex=0
    }
    else {currentIndex++}
}


function setup() {

    for (const p of currentCompTimes) {
        Tone.Transport.schedule(triggerSynth, p)
    }
    // Tone.Transport.schedule(this.triggerSynth, '0:2')
    // Tone.Transport.schedule(this.triggerSynth, '0:2:2.5')

    //set the transport to repeat
    Tone.Transport.loopEnd = '2m'
    Tone.Transport.loop = false
}

function triggerSynth(time){
    //the time is the sample-accurate time of the event
    // debugger
    synth.triggerAttackRelease(currentCompNotes[currentIndex], '2n', time)
    inc()
}

const playButton = document.querySelector('.play')
const gameButtonArea = document.querySelector('.game-buttons')

gameButtonArea.addEventListener('click', e => {
    if (e.target.value) {playGame(parseInt(e.target.value), parseInt(e.target.querySelector('span').innerText))}
})



// playButton.addEventListener("click", playGame)
playButton.addEventListener("click", () => {
    if (localUserObject.email) {openGameMenu()}
    else loginLink.click()
})

function updateLevelButtons() {
    const gameButtons = [...gameButtonArea.querySelectorAll('button')].sort((a, b) => parseInt(a.value) - parseInt(b.value))
    gameButtons[0].querySelector('span').innerText = localUserObject.game_1.highest_completed_level+1
    gameButtons[1].querySelector('span').innerText = localUserObject.game_2.highest_completed_level+1
    gameButtons[2].querySelector('span').innerText = localUserObject.game_3.highest_completed_level+1
    gameButtons[3].querySelector('span').innerText = localUserObject.game_4.highest_completed_level+1
}

function openGameMenu() {
    updateLevelButtons()
    modalB.classList.add("hide")
    modalA.classList.remove("hide")
    modalDiv.classList.remove("hide")
    modalOpen = true
    logoutLink.innerText="Back"
    logoutLink.classList.add('menu-open')
    if (userDeletable) {deleteUserLink.classList.add('hide')}
}

let userDeletable = false

// if (Modernizr.touchevents) {alert("you're on a phone")}
// else {alert("you're on a computer")}

// User signup

const signupForm = document.querySelector('.signup-form')
const loginForm = document.querySelector('.login-form')

signupForm.querySelector('a').addEventListener("click", () => {
    // preventDefault()
    signupForm.classList.add('hide')
    loginForm.classList.remove('hide')
})

loginForm.querySelector('a').addEventListener("click", () => {
    // preventDefault()
    loginForm.classList.add('hide')
    signupForm.classList.remove('hide')
})


function createUser() {
    const userObj = {
        email: signupForm[0].value,
        password: signupForm[2].value,
        password_confirmation: signupForm[3].value,
        first_name: signupForm[1].value
    }
    const configObj = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(userObj)
    }
    console.log(userObj)
    console.log(configObj)
    fetch(`${url}/users`, configObj)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        if (json.token) {
            localStorage.token = json.token
            localUserObject = json.user_object
            loginLink.classList.add('hide')
            logoutLink.classList.remove('hide')
            deleteUserLink.classList.remove('hide')
            userDeletable = true
            debugger
            alertUser(`Welcome, ${localUserObject.first_name}`)
        }
        signupForm.reset()
        loginLink.click()
    })
    .catch(alertUser)
}

function logoutOrCloseModal(e) {
    // logoutUser()
    if (modalOpen) {
        if (![...modalA.classList].includes("hide")) {
            modalA.classList.add("hide")
            modalB.classList.remove("hide")
        }
        if (userDeletable) {deleteUserLink.classList.remove('hide')}      
        modalDiv.classList.add('hide')
        modalOpen = false
        logoutLink.innerText="Logout"
        logoutLink.classList.remove('menu-open')
    }
    else {
        // if (![...modalA.classList].includes("hide")) {
        //     modalA.classList.add("hide")
        //     modalB.classList.remove("hide")
        // }   
        // modalDiv.classList.remove('hide')
        // modalOpen = true
        //e.target.innerText="Back"
        //e.target.classList.add('menu-open')
        logoutUser()
    }
}

logoutLink.addEventListener("click", logoutOrCloseModal)

const deleteUserLink = document.querySelector('#delete-user-link')

function confirmDelete() {
    fetch(`${url}/users`, {
        method: "DELETE",
        headers: {Authorization: `Bearer ${localStorage.token}`} 
    }).then(logoutUser)
}


// function requestDelete() {
    
// }

function deleteUser() {
    if (deleteUserLink.innerText == "Confirm Delete?") {
        confirmDelete()
    }
    else {
        deleteUserLink.innerText = "Confirm Delete?"
        setTimeout(()=> deleteUserLink.innerText = "Delete Account", 5000)
    }
}

deleteUserLink.addEventListener("click", deleteUser)

function initialAuthorize() {
    const configObj = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    }
    fetch(`${url}/users`, configObj)
    .then (res => res.json()).then(json => {
        // debugger
        
        // debugger
        if (json.email){
            // debugger
            localUserObject = json
            loginLink.classList.add('hide')
            logoutLink.classList.remove('hide')
            deleteUserLink.classList.remove('hide')
            userDeletable = true
            alertUser(`Welcome, ${localUserObject.first_name}!`)
        }
    }).catch(alertUser)
}

// userObj = {
//     email: email,
//     first_name: first_name,
//     game_1: {
//         highest_completed_level: num,
//         high_scores: []
//     },
//     game_2: {
//         highest_completed_level: num,
//         high_scores: []
//     },
//     game_3: {
//         highest_completed_level: num,
//         high_scores: []
//     },
//     game_4: {
//         highest_completed_level: num,
//         high_scores: []
//     }   
// }

function loginUser() {
    const userObj = {
        email: loginForm[0].value,
        password: loginForm[1].value,
    }
    const configObj = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(userObj)
    }
    console.log(userObj)
    console.log(configObj)
    fetch(`${url}/auth`, configObj)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        if (json.token) {
            localStorage.token = json.token
            localUserObject = json.user_object
            loginLink.classList.add('hide')
            logoutLink.classList.remove('hide')
            deleteUserLink.classList.remove('hide')
            userDeletable = true
            alertUser(`Welcome back, ${localUserObject.first_name}!`)
        }
        loginForm.reset()
        loginLink.click()
    })
    .catch(alertUser)
}

function logoutUser() {
    alertUser("Goodbye")
    localStorage.clear()
    setTimeout(() => location.reload(), 1000)
}

signupForm.addEventListener("submit", (e) => {
    e.preventDefault()
    createUser()
})

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    loginUser()
})


// text to speech

const wordDelay = 300

function setSpeech() {
    return new Promise(
        function (resolve, reject) {
            let synth = window.speechSynthesis;
            let id;

            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 10);
        }
    )
}
let r
let s = setSpeech();
s.then((voices) => {
    r = voices.find(e => e.name==="Tessa") || voices[0]
    // alertUser(r)
})


// Andy Animations

andyIntervals = []
let andyStatus = "still"
const talkingAndy = ["AndyOpenEyesTalk.gif", "AndySlowTalkClosed.gif", "AndySlowTalkOpen.gif", "BlinkingTalking.gif", "ClosedEyeTalking.gif"]
const stillAndyAr = ["AndyBlinking.gif", "MediumWag_EyesOpen.gif", "MediumWag_Closed.gif"]
const happyAndy = []

// talkingAndy.map( e =>{
//     const newAndyImg = new Image()
//     newAndyImg.src = `./assets/${e}`
//     newAndyImg
// })

// talkingAndy.map( e =>{
//     const newAndyImg = new Image()
//     newAndyImg.src = `./assets/${e}`
//     newAndyImg
// }

function andyTalk() {
    const frame = Math.floor(Math.random()*talkingAndy.length)
    // console.log(frame)
    charArea.src = "./assets/"+talkingAndy[frame]     ///Uncomment this line
    // charArea = talkingAndy[frame]
    // console.log(charArea.src)
}

function andyBeStill() {
    if (charArea.src!=="./assets/andystillframe.gif") {charArea.src = "./assets/andystillframe.gif"}
    const frame = Math.floor(Math.random()*15)
    if (frame===0 || frame===1 || frame===2) {charArea.src = "./assets/"+stillAndyAr[frame]}
}

function setTalkingInterval() {
    andyIntervals.push(setInterval(andyTalk, 1000))
}

function setStillInterval() {
    andyIntervals.push(setInterval(andyBeStill, 1500))
}

function updateAndy() {
    // console.log("updating")
    if (andyStatus === "talking") {
        // const frame = Math.floor(Math.random()*talkingAndy.length)
        // // console.log(frame)
        // charArea.src = "./assets/"+talkingAndy[frame]
        // console.log(charArea.src)
        charArea.src = "./assets/"+talkingAndy[0]
        setTalkingInterval()
    }
    else if (andyStatus == "happy") {

    }
    else {
        setStillInterval()
    }
}

function speakAndy() {
    clearIntervals()
    andyStatus = "talking"
    window.dispatchEvent(andyEvent)
}

function stillAndy() {
    console.log("Still!")
    clearIntervals()
    andyStatus = "still"
    window.dispatchEvent(andyEvent)
}

function clearIntervals() {
    for (const andyInterval of andyIntervals) {
        clearInterval(andyInterval)
    }
    andyIntervals = []
}

window.addEventListener('changeAndy', updateAndy)

let andyEvent = new Event('changeAndy')
// setInterval(checkAndy, 1000)
stillAndy()


// Menu Shifting