// import * as Tone from "Tone.js";

// document.querySelector('button').addEventListener('click', async () => {
// 	await Tone.start()
//     console.log('audio is ready')
//     const synth = new Tone.Synth().toMaster();
//     synth.triggerAttackRelease("C4", "8n");
//play a note every quarter-note
// })

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
const synth = new Tone.Synth().toMaster();

document.addEventListener('keydown', (e) => {
    // debugger
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
    note.addEventListener('mouseup', () => {
        releaseNote(event.target.id)
    })
} 

playNote = (note) => {
    synth.triggerAttack(note)
    const noteDiv = document.querySelector(`#${note.replace("#", '\\#')}`)
    noteDiv.classList.add('playing')
}

// playAndReleaseNote = (note) => {
//     synth.triggerAttackRelease(note, "8n");
// }

releaseNote = (note) => {
    synth.triggerRelease();
    const noteDiv = document.querySelector(`#${note.replace("#", '\\#')}`)
    noteDiv.classList.remove('playing')
}