# Ada's Ear Training

### An Ear-Training and Basic Music Theory App for Young Kids



## Introduction

*Ada's Ear Training* is a browser based application intended to help young children learn the basics of music theory (note naming, chord forming) and practice ear training (chord recognition, and note/melodic echoing).  It was inspired by my 3yo daughter's own early adventures in music and I figured this would be a fun and interactive way for her to practice her skills and share these concepts with other children (and adults) as well.  I went for a retro-style that evoked a lot of the educational games of my childhood.

## Technical

The front-end of the app was built with vanilla JavaScript and the back-end was built in Rails.  I utilized Tone.js for music synthesis and the Web Speech API.  User info and personalized progress is stored/updated in the database.  The questions and game/level information are pre-computed and also stored in the database, where they are served on request via the front-end applcation and proper credentials.  The back-end includes the logic for serving the user a random assortment of questions based on the user's current skill level.

## Instructions

This app is intended to be mobile-friendly and responsive, but if you are playing on a smartphone, I'd recommend orienting the screen horizontally.  Anybody can play around with the basic keyboard interface (supports touchscreen devices as well as computer keyboard for polyphony), but you will need to login or register for a (free) new account in order to play the theory/ear-training games.

Once logged in/registered, click on the "Play Game" button to load up the game options.  Games 1/2 are based on note and chord recognition.  Ada the Angora will prompt the user to play certain/notes/patterns.  Games 3/4 are ear training excercises, where the user will need to repeat back certain patterns.  The app will store each user's progress and the excercises will get progressively harder.  If the user answers each question in a round sucessfully (within 3 tries), they can progress to the next round.  The app will also track the user's best score.

Future versions will include support for level navigation, "Learning Mode", and options to adjust playback speed/volume along with more engaging feedback for correct responses and level/game completion.


## Links

- [Basic Video Demo](https://www.youtube.com/watch?v=EAFggwkXN5w)
- [Github Front-end](https://github.com/edensongjbs/adas-ear-training-frontend)
- [Github Back-end](https://github.com/edensongjbs/adas-ear-training-api)
- [Blog Entry About Building The Raibow Piano Interface](https://dev.to/edensongjbs/building-ada-s-rainbow-piano-11bd)
- [Tone.js](https://tonejs.github.io/)
