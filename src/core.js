const keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
const mainKeys = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']
const compKeys = ['m', 'dim', 'aug', '6', '7', 'maj7', '9', 'add9', 'm6', 'm7', 'mmaj7', 'm9', '11', '7sus4', '13', '6add9', '5', '7-5', '7maj5', 'maj9', ' ']

// var Person = function (firstName) {
//   this.firstName = firstName
// }

// Person.prototype.sayHello = function () {
//   console.log("Hello, I'm " + this.firstName)
// }

function generateAllKeys (mainKeys, compKeys) {
  let tempAllKeys = []

  for (var i = mainKeys.length - 1; i >= 0; i--) {
    for (var j = compKeys.length - 1; j >= 0; j--) {
      tempAllKeys.push(mainKeys[i] + compKeys[j])
    }
  }

  for (var k = mainKeys.length - 1; k >= 0; k--) {
    tempAllKeys.push(mainKeys[k])
  }

  return tempAllKeys
}

const allKeys = generateAllKeys(mainKeys, compKeys)

function isChordLine (line) {
  let count = 0

  for (var j = line.length - 1; j >= 0; j--) {
    if (allKeys.includes(line[j])) {
      count = count + 1
    }
  }

  if (count === line.length) {
    return true
  }
}

function splitSongInArrays (song) {
  song = song.split('\n')

  for (var i = song.length - 1; i >= 0; i--) {
    // transform extra spaces in one
    song[i] = song[i].replace(/\s\s+/g, ' ')

    // make array from lines
    song[i] = song[i].split(' ')

    // remove single spaces from array
    song[i] = song[i].filter(entry => entry.trim() !== '')

    // isChordLine(song[i])
  }

  return song
}

let song = `  C                   Dm
  I follow the Moskva
               C
Down to Gorky Park
                  Dm       Am7  G5
Listening to the wind of chan______ge
C                   Dm
  An August summer night
                  C
Soldiers passing by
                  Dm       Am7  G5
Listening to the wind of chan______ge`

function removeDuplicates (arr) {
  let s = new Set(arr)
  let it = s.values()
  return Array.from(it)
}

function generateKeyTones (key) {
  var keyIndex = keys.indexOf(key)
  var firstPart = keys.slice(0, keyIndex)
  var secondPart = keys.slice(keyIndex, keys.length)
  var newKeys = []

  newKeys = secondPart

  for (var i = 0; i < firstPart.length; i++) {
    newKeys.push(firstPart[i])
  }

  return newKeys
}

function shiftNote (oldKey, newKey, oldNote) {
  let oldTones = generateKeyTones(oldKey)
  let newTones = generateKeyTones(newKey)
  let newNote
  let index

  // this should deliver the new note complete

  let oldNoteFirstPart
  let oldNoteLastPart

  if (oldNote.length > 1 && oldNote[1] === '#') {
    oldNoteFirstPart = oldNote.split['#'][0] + '#'
    oldNoteLastPart = oldNote.split['#'][1]
  } else {
    oldNoteFirstPart = oldNote[0]
    oldNoteLastPart = oldNote.slice(1, oldNote.length)
  }

  index = oldTones.indexOf(oldNoteFirstPart)
  newNote = newTones[index] + oldNoteLastPart

  // console.log('oldNote', oldNote)
  // console.log('oldfirstpart', oldNoteFirstPart)
  // // console.log('index', index)
  // console.log('newNote', newNote)

  return newNote
}

shiftNote('Dm', 'C', 'D')

export function shiftSong (oldkey, newKey, theSong) {
  let songArray = splitSongInArrays(theSong)
  let chordLines = []
  let lyricsLines = []
  let oldNotes = []
  // let newNotes = []
  let newSong = theSong.split('\n')

  console.log(theSong)

  for (var i = songArray.length - 1; i >= 0; i--) {
    if (isChordLine(songArray[i])) {
      chordLines.push(i)
      oldNotes.push(songArray[i])
    } else {
      lyricsLines.push(i)
    }
  }

  oldNotes = [].concat.apply([], oldNotes)
  oldNotes = removeDuplicates(oldNotes)

  // for (var j = 0; j < oldNotes.length; j++) {
  //   let oldNoteFirstPart
  //   let oldNoteLastPart

  //   // get the new note and assembly
  //   if (oldNotes[j].length > 1 && oldNotes[j][1] === '#') {
  //     oldNoteFirstPart = oldNotes[j].split['#'][0] + '#'
  //     oldNoteLastPart = oldNotes[j].split['#'][1]
  //   } else {
  //     oldNoteFirstPart = oldNotes[j][0]
  //     oldNoteLastPart = oldNotes[j].slice(1, oldNotes[j].length)
  //   }
  //   // newNotes.push(shiftNote(oldkey, newKey, oldNoteFirstPart) + oldNoteLastPart)
  // }

  // console.log('newSong', newSong)
  // console.log('chordLines', chordLines)
  // console.log('lyricsLines', lyricsLines)

  for (var k = 0; k <= newSong.length; k++) {
    if (chordLines.includes(k)) {
      for (var m = oldNotes.length - 1; m >= 0; m--) {
        // console.log(newSong[k])
        // console.log('oldNotes', oldNotes[m])

        var replace = oldNotes[m]
        var re = new RegExp(replace, 'g')

        newSong[k] = newSong[k].replace(re, shiftNote(oldkey, newKey, replace))
        // console.log('new', newSong[k])
      }
      // loop through each chordline
      // for (var l = 0; l < newSong[k].length; l++) {
      //   if (newSong[k][l].length > 1 && newSong[k][l][1] === '#') {
      //     newSong[k][l].replace(newSong[k][l], shiftNote(oldkey, newKey, newSong[k][l][0] + '#'))
      //   } else {
      //     console.log('dam', newSong[k][l])
      //     newSong[k][l].replace(newSong[k][l][0], shiftNote(oldkey, newKey, newSong[k][l][0]))
      //   }
      // }
    }
  }

  // loop through the old notes
  // for (var j = 0; j < oldNotes.length; j++) {
    // let oldNoteFirstPart
    // let oldNoteLastPart

    // loop through old song
    // get the new note and assembly
    // if (oldNotes[j].length > 1 && oldNotes[j][1] === '#') {
    //   // oldNoteFirstPart = oldNotes[j].split['#'][0] + '#'
    //   // oldNoteLastPart = oldNotes[j].split['#'][1]
    // } else {
    //   // oldNoteFirstPart = oldNotes[j][0]
    //   // oldNoteLastPart = oldNotes[j].slice(1, oldNotes[j].length)
    // }

    // newNotes.push(shiftNote(oldkey, newKey, oldNoteFirstPart) + oldNoteLastPart)
  // }

  // console.log('newSong', newSong)
  // console.log('chordLines', chordLines)
  // console.log('lyricsLines', lyricsLines)
  // console.log('songArray', songArray)
  // console.log('oldNotes', oldNotes)
  // console.log('newNotes', newNotes)

  return newSong.join()
  // return newUserKeys
  // console.log('newUserKeys', newUserKeys)
}

shiftSong('C', 'B', song)

// export function transposeUserKeys (oldkey, newKey, userKeys) {
//   // var oldKeys = generateKeyTones(oldkey)
//   // var newKeys = generateKeyTones(newKey)
//   // var newUserKeys = []
//   // var indexNote = 0

//   // for (var i = 0; i < userKeys.length; i++) {
//   //   for (var j = 0; j < userKeys[i].length; j++) {
//   //     if (userKeys[i][j] === 'b') {
//   //       userKeys[i] = userKeys[i][0]
//   //       indexNote = oldKeys.indexOf(userKeys[i]) - 1
//   //       console.log(userKeys[i])
//   //     } else {
//   //       indexNote = oldKeys.indexOf(userKeys[i])
//   //     }
//   //   }
//   //   newUserKeys.push(newKeys[indexNote])
//   // }

//   // return newUserKeys
//   // console.log('newUserKeys', newUserKeys)
// }

// // console.log(transposeUserKeys('E', 'F', ['D', 'A', 'G']))
