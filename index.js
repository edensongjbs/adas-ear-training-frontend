// import * as Tone from "Tone.js";

// document.querySelector('button').addEventListener('click', async () => {
// 	await Tone.start()
//     console.log('audio is ready')
//     const synth = new Tone.Synth().toMaster();
//     synth.triggerAttackRelease("C4", "8n");
//play a note every quarter-note
// })

const allNotes = document.querySelectorAll('.white-note, .black-note')
const synth = new Tone.Synth().toMaster();

for (const note of allNotes) {
    note.addEventListener('click', () => {
        playNote(event.target.id)
    })
} 

playNote = (note) => {
    synth.triggerAttackRelease(note, "8n");
}