export default class KeyShifter {

  constructor (oldKey, newKey, theSong) {
    this.oldKey = oldKey
    this.newKey = newKey
    this.theSong = theSong
    this.keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
    this.mainKeys = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']
    this.compKeys = ['m', 'dim', 'aug', '6', '7', 'maj7', '9', 'add9', 'm6', 'm7', 'mmaj7', 'm9', '11', '7sus4', '13', '6add9', '5', '7-5', '7maj5', 'maj9', ' ']
    this.specialKeys = ['C/E', 'C/F', 'C/G', 'D/F', 'D/A', 'D/Bb', 'D/B', 'D/C', 'E/B', 'E/C', 'E/D', 'E/D', 'E/F', 'E/G', 'Em/B', 'Em/C', 'Em/D', 'Em/D', 'Em/F', 'Em/F', 'Em/G', 'Em/G', 'F/C', 'F/D', 'F/D', 'F/E', 'F/G', 'F/A', 'Fm/C', 'G/B', 'G/D', 'G/E', 'G/F', 'G/F', 'A/C', 'A/E', 'A/F', 'A/F', 'A/G', 'Am/C', 'Am/E', 'Am/F', 'Am/G']
    this.allKeys = this._generateAllKeys()

    return this
  }

  _generateAllKeys () {
    let tempAllKeys = []

    for (let i = this.mainKeys.length - 1; i >= 0; i--) {
      for (let j = this.compKeys.length - 1; j >= 0; j--) {
        tempAllKeys.push(this.mainKeys[i] + this.compKeys[j])
      }
    }

    for (let k = this.mainKeys.length - 1; k >= 0; k--) {
      tempAllKeys.push(this.mainKeys[k])
    }

    for (let l = this.specialKeys.length - 1; l >= 0; l--) {
      tempAllKeys.push(this.specialKeys[l])
    }

    return tempAllKeys
  }

  _isChordLine (line) {
    let count = 0

    for (let j = line.length - 1; j >= 0; j--) {
      if (this.allKeys.includes(line[j])) {
        count = count + 1
      }
    }

    if (count === line.length) {
      return true
    }
  }

  _splitSongInArrays (song) {
    song = song.split('\n')

    for (let i = song.length - 1; i >= 0; i--) {
      // transform extra spaces in one
      song[i] = song[i].replace(/\s\s+/g, ' ')

      // make array from lines
      song[i] = song[i].split(' ')

      // remove single spaces from array
      song[i] = song[i].filter(entry => entry.trim() !== '')
    }

    return song
  }

  _removeDuplicates (arr) {
    let s = new Set(arr)
    let it = s.values()
    return Array.from(it)
  }

  _generateKeyTones (key) {
    let keyIndex = this.keys.indexOf(key)
    let firstPart = this.keys.slice(0, keyIndex)
    let secondPart = this.keys.slice(keyIndex, this.keys.length)
    let newKeys = []

    newKeys = secondPart

    for (let i = 0; i < firstPart.length; i++) {
      newKeys.push(firstPart[i])
    }

    return newKeys
  }

  _shiftNote (oldKey, newKey, oldNote) {
    let oldTones = this._generateKeyTones(oldKey)
    let newTones = this._generateKeyTones(newKey)
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

  init () {
    let songArray = this._splitSongInArrays(this.theSong)
    let chordLines = []
    let lyricsLines = []
    let oldNotes = []
    let newNotes = []
    let newSong = this.theSong.split('\n')

    for (let i = songArray.length - 1; i >= 0; i--) {
      if (this._isChordLine(songArray[i])) {
        chordLines.push(i)
        oldNotes.push(songArray[i])
      } else {
        lyricsLines.push(i)
      }
    }

    oldNotes = [].concat.apply([], oldNotes)
    oldNotes = this._removeDuplicates(oldNotes)

    for (let k = 0; k <= newSong.length; k++) {
      if (chordLines.includes(k)) {
        for (let m = oldNotes.length - 1; m >= 0; m--) {
          let replace = oldNotes[m]
          let re = new RegExp(replace, 'g')

          if (!newNotes.includes(this._shiftNote(this.oldKey, this.newKey, replace))) {
            newNotes.push(this._shiftNote(this.oldKey, this.newKey, replace))
          }

          newSong[k] = newSong[k].replace(re, this._shiftNote(this.oldKey, this.newKey, replace))
        }
      }
    }

    return {
      'oldNotes': oldNotes,
      'newNotes': newNotes,
      'newSong': newSong.join('\n')
    }
  }
}
