

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

const allNotes = document.querySelectorAll('.white-note, .black-note')
const allChords = document.querySelectorAll('.chords button')

var synth = new Tone.PolySynth(4, Tone.Synth, {
    oscillator : {
          type : "square"
      }
  }).toMaster();


document.addEventListener('keydown', (e) => {
    if (e.repeat){ return }
    playNote(keyBindings[e.key])
})

document.addEventListener('keyup', (e) => {
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

playNote = (note) => {
    synth.triggerAttack(note)
    const noteDiv = document.querySelector(`#${note.replace("#", '\\#')}`)
    noteDiv.classList.add('playing')
    if (readyToAnswer) {
        currentAnswer.push(note)
        console.log(currentAnswer)
    }
}

releaseNote = (note) => {
    synth.triggerRelease(note);
    const noteDiv = document.querySelector(`#${note.replace("#", '\\#')}`)
    noteDiv.classList.remove('playing')
    if (readyToAnswer && (currentAnswer.length >= currentQuestion.notes.length)) {answerRound()}
}


//Display Logic and Responsiveness

const wrapper = document.querySelector('div.wrapper')

document.addEventListener("DOMContentLoaded", resizeKeybed)

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

menuButton.addEventListener("click", e => {
    if (modalOpen) {
        modalDiv.classList.add('hide')
        modalOpen = false
    }
    else {
        modalDiv.classList.remove('hide')
        modalOpen = true
    }
})

// Game Logic

let readyToAnswer = false
let currentAnswer = []

const Correct = ["That's Right!", "Great Work!", "Fantastic!"]
const Incorrect = ["Keep Trying!", "So close...", "You'll get it next time!"]

class Question {
    constructor(notes, question, playItFirst = false, ordered = false, chordsAllowed = false) {
        this.question=question
        this.notes=notes
        this.playItFirst=playItFirst
        this.ordered=ordered
        this.chordsAllowed=chordsAllowed
        this.guesses=0
        this.completed=false
    }
    ask() {
        alert(this.question)
        if (this.playItFirst) {
            // alert("woof")
            playCurrentSequence()
        }
    }
    compareReponse(res) {
        if (!this.ordered){
            res.sort()
            this.notes.sort()
        }
        return !(this.notes.find((e, i) => e!==res[i]))
    }
    badFeedback() {
        alert(Incorrect[Math.floor((Math.random()*(Incorrect.length)))])
    }
    goodFeedback() {
        // debugger
        alert(Correct[Math.floor((Math.random()*(Correct.length)))])
    }
}

const q1 = new Question (["D3", "G3", "B3"], "Play a V chord", false, false, true)
const q2 = new Question (["C3", "D3", "F3"], "Listen to the following notes and play them back in order", true, true)
const q3 = new Question (["F3", "A3", "C4"], "Play back the following chord", true, false, true)

let round = [q1, q2, q3]

let currentQuestion //current question index

function dealRound(q) {
    readyToAnswer = false
    currentAnswer = []
    currentQuestion = round[q]
    if (round[q].playItFirst){loadNewSequence(round[q].notes)}
    else {loadNewSequence([])}
    round[q].ask()
    readyToAnswer = true
}

function gameOver() {
    alert('Good Game!')
}

function answerRound() {
    readyToAnswer = false
    if (currentQuestion.compareReponse(currentAnswer)){currentQuestion.goodFeedback()}
    else {currentQuestion.badFeedback()}
    let q = round.indexOf(currentQuestion)
    if (q+1 === round.length) {gameOver()}
    dealRound(q+1)
}

function playGame() {
    dealRound(0)
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
let currentCompTimes = [0, '0:3', '0:6']
let currentIndex = 0;

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

function loadNewSequence(ar) {
    clearCurrentSequence()
    currentCompNotes = ar
    currentIndex = 0
    setup()    
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

playButton = document.querySelector('.play')
playButton.addEventListener("click", playGame)

// if (Modernizr.touchevents) {alert("you're on a phone")}
// else {alert("you're on a computer")}