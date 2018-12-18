# Live Web Final Project - Collaborative Piano

## Overview

Collaborative Piano is a live multiplayer ice breaker game. This game needs 8 player to paticipate. Each individual would use their phone to land on 
[this page](https://hy1397.itp.io:8090/note.html) and will be automatically assigned to one note from C4, D4 ... to C5. User have to swing their phone to trigger the sound on [this page](https://hy1397.itp.io:8090/note.html). 

[The link to the Piano Interface](https://hy1397.itp.io:8090/sound.html)

[The link to the individual note interface](https://hy1397.itp.io:8090/note.html)

### Piano Interface
![Piano Interface](https://i.imgur.com/Gdzufmx.png)

### note interface on mobile

<img src="https://imgur.com/hjvnxMf.png" width="200"><img src="https://imgur.com/gkWydxK.png" width="200"><img src="https://imgur.com/nabDypw.png" width="200">

### Technical Details
#### 1. Accelerometer
I utilized the code below to access the accelerometer from users' mobile devices in order to create the "swing" interaction.
```javascript
 function ondevicemotion(e) {
            var y = e.acceleration.y;
 }
 window.addEventListener('devicemotion', ondevicemotion, false);
```

#### 2. Websocket
When the accerleration is greater than the threshould, the server would receive the date from the specific note and then tell the piano interface to trigger the correspondent sound.

**Mobile interface side**
```javascript
if (triggerable == true) {
  if (intY > threshold) {
    socket.emit(note, "play the note");
}
```

**Server side**
```javascript
socket.on('note', function (data) {
  if (socket == people.C4) {
    io.sockets.emit('C4', data);
  } 
});
    
//Sockets for playing sound
socket.on('C4', function (data) {
    io.sockets.emit('C4', data);
});
```

**Piano interface side**
```javascript
socket.on('C4', function (data) {
  synth.triggerAttackRelease("C4", "8n");
});
```
#### 3. Tone.js
I utilized Tone.js to create sounds
```javascript

    var synth = new Tone.PolySynth(6, Tone.Synth, {
	"oscillator" : {
	"partials" : [0, 2, 3, 4],
	    }
    }).toMaster();

```
