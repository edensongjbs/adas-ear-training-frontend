// const Tone = require("./Tone");

let readyToAnswer = false
let currentAnswer = []

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

const allNotes = document.querySelectorAll('.white-note, .black-note')

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
    note.addEventListener('mousedown', () => {
        playNote(event.target.id)
    })
    note.addEventListener('touchstart', () => {
        playNote(event.target.id)
    })
    note.addEventListener('mouseup', () => {
        releaseNote(event.target.id)
    })
    note.addEventListener('touchend', () => {
        releaseNote(event.target.id)
    })
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
}

// compPlayNote = (time) => {
//     console.log("playing")
//     synth.triggerAttackRelease("C4", "4n", time)
// }

// scheduleNote

//Together
// function triggerSynth() {
//     synth.triggerAttackRelease("C3", "2n", "4n")
//     synth.triggerAttackRelease("G3", "2n", "8n")
//     synth.triggerAttackRelease("E3", "2n", "2n")
// }
// Tone.Transport.schedule(compPlayNote, 0)
// Tone.Transport.schedule(compPlayNote, Tone.Time("4n"))
// Tone.Transport.schedule(compPlayNote, 2*Tone.Time("4n"))
// Tone.Transport.loopEnd = '2m'
// Tone.Transport.loop = true

// let compNoteSeq = [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]

// [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]);

// const part = new Tone.Part(((time, value) => {
// 	// the value is an object which contains both the note and the velocity
//     console.log("playing")
//     synth.triggerAttackRelease(value.note, value.duration, time, value.velocity);
// }), [{ time: 0, note: "C3", velocity: 0.9, duration: "8n" },
// 	{ time: "0:2", note: "C4", velocity: 0.5, duration: "2n" }
// ])

// part.start(0)

// synth.triggerAttackRelease("C3", "2n").then(() => synth.triggerAttackRelease("G3", "2n")
// )


//Display Logic and Responsiveness

const wrapper = document.querySelector('div.wrapper')

// const part = new Tone.Part(((time, value) => {
//     // the value is an object which contains both the note and the velocity
//     console.log("playing")
//     synth.triggerAttackRelease(value.note, value.duration, time, value.velocity);
// }), [{ time: 0, note: "C3", velocity: 0.9, duration: "8n" },
//     { time: "0:2", note: "C4", velocity: 0.5, duration: "2n" }
// ])

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

const Correct = ["That's Right!", "Great Work!", "Fantastic!"]
const Incorrect = ["Keep Trying!", "So close...", "You'll get it next time!"]

// class Question() {
//     constructor(notes, question, playItFirst = false, ordered = false) {
//         this.question=question
//         this.notes=notes
//         this.ordered=ordered
//         this.guesses=0
//         this.completed=false
//     }
//     ask() {
//         console.log(this.question)
//     }
//     compareReponse(res) {
//         if (!ordered){
//             res.sort()
//             this.notes.sort()
//         }
//         return (this.notes.find((e, i) => e!==res[i]))
//     }
//     badFeedback() {
//         console.log(Incorrect[(Math.random*Incorrect.length).floor])
//     }
//     goodFeedback() {
//         console.log(Correct[(Math.random*Correct.length).floor])
//     }
// }

// const q1 = new Question (["D3", "G3", "B3"], "Play a V chord")
// const q2 = new Question
// const q3 = 

// playGame() {
    // Takes a Game object? array of questions
    // We'll need Question class and possibly Round/Game class(es)
    
    // For each question:
    // Ask question
    // Reset Answer Array
    // Loop until Response Array is of the right size?
    // Compare user response array against right answer
    // Keep track of # of tries
    // Keep track of score
    // Give Response
    // Reset number of tries
// }

//Question Seeding

let currentCompNotes = ["C4", "E4", "G4"]
let currentCompTimes = [0, '0:3', '0:6']
let currentIndex = 0;


function inc() {
    if (currentIndex===(currentCompNotes.length-1)){
            currentIndex=0
    }
    else {currentIndex++}
}

// class NoteSequence {
//     constructor(pitches, phraseLength = '1m'){
//         this.pitches=pitches
//         this.phraseLength=phraseLength
//         this.currentIndex=0;
//     }
//     get current(){
//         return this.pitches[this.currentIndex]
//     }
//     inc() {
//         if (this.currentIndex===(this.pitches.length-1))
//         {
//             this.currentIndex=0
//         }
//         else {this.currentIndex++}
//     }
//     setup() {

//         for (const p in this.pitches) {
//             Tone.Transport.schedule(((this.triggerSynth).bind(this)), p.time)
//         }
//         // Tone.Transport.schedule(this.triggerSynth, '0:2')
//         // Tone.Transport.schedule(this.triggerSynth, '0:2:2.5')

//         //set the transport to repeat
//         Tone.Transport.loopEnd = this.phraseLength
//         Tone.Transport.loop = true
//     }
// }

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

// let ns = new NoteSequence([{note: "C4", duration: "4n" ,time: 0}, {note: "E4", duration: "4n" ,time: '0:2'}, {note: "G4", duration: "2n" ,time: '0:3'}]) 
// ns.setup()

// function triggerSynth(time){
// 	//the time is the sample-accurate time of the event
// 	synth.triggerAttackRelease('C2', '8n', time)
// }

// //schedule a few notes
// Tone.Transport.schedule(triggerSynth, 0)
// Tone.Transport.schedule(triggerSynth, '0:2')
// Tone.Transport.schedule(triggerSynth, '0:2:2.5')

// //set the transport to repeat
// Tone.Transport.loopEnd = '1m'
// Tone.Transport.loop = false