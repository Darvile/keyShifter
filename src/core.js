const keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
const mainKeys = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']
const compKeys = ['m', 'dim', 'aug', '6', '7', 'maj7', '9', 'add9', 'm6', 'm7', 'mmaj7', 'm9', '11', '7sus4', '13', '6add9', '5', '7-5', '7maj5', 'maj9', ' ']
const specialKeys = ['C/D', 'G/V']

function generateAllKeys (mainKeys, compKeys, specialKeys) {
  let tempAllKeys = []

  for (var i = mainKeys.length - 1; i >= 0; i--) {
    for (var j = compKeys.length - 1; j >= 0; j--) {
      tempAllKeys.push(mainKeys[i] + compKeys[j])
    }
  }

  for (var k = mainKeys.length - 1; k >= 0; k--) {
    tempAllKeys.push(mainKeys[k])
  }

  for (var l = specialKeys.length - 1; l >= 0; l--) {
    tempAllKeys.push(specialKeys[l])
  }

  return tempAllKeys
}

const allKeys = generateAllKeys(mainKeys, compKeys, specialKeys)

console.log(allKeys)

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

  let oldNoteFirstPart
  let oldNoteLastPart

  if (oldNote.length > 1 && oldNote[1] === '#') {
    oldNote = oldNote.split('#')
    oldNoteFirstPart = oldNote[0] + '#'
    oldNoteLastPart = oldNote[1]
  } else if (oldNote.length > 1 && oldNote[1] === '/') {
    newNote = newTones[oldTones.indexOf(oldNote[0])] + '/' + newTones[oldTones.indexOf(oldNote[2])]
    return newNote
  } else {
    oldNoteFirstPart = oldNote[0]
    oldNoteLastPart = oldNote.slice(1, oldNote.length)
  }

  index = oldTones.indexOf(oldNoteFirstPart)
  newNote = newTones[index] + oldNoteLastPart

  return newNote
}

export function shiftSong (oldkey, newKey, theSong) {
  let songArray = splitSongInArrays(theSong)
  let chordLines = []
  let lyricsLines = []
  let oldNotes = []
  let newSong = theSong.split('\n')

  for (var i = songArray.length - 1; i >= 0; i--) {
    console.log(isChordLine(songArray[i]))
    if (isChordLine(songArray[i])) {
      chordLines.push(i)
      oldNotes.push(songArray[i])
    } else {
      lyricsLines.push(i)
    }
  }

  oldNotes = [].concat.apply([], oldNotes)
  oldNotes = removeDuplicates(oldNotes)

  for (var k = 0; k <= newSong.length; k++) {
    if (chordLines.includes(k)) {
      for (var m = oldNotes.length - 1; m >= 0; m--) {
        var replace = oldNotes[m]
        var re = new RegExp(replace, 'g')

        newSong[k] = newSong[k].replace(re, shiftNote(oldkey, newKey, replace))
      }
    }
  }

  return newSong.join('\n')
}

shiftSong('C', 'B', song)
