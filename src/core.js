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
    let oldChords = []
    let newChords = []
    let newSong = this.theSong.split('\n')

    for (let i = songArray.length - 1; i >= 0; i--) {
      if (this._isChordLine(songArray[i])) {
        chordLines.push(i)
        oldChords.push(songArray[i])
      } else {
        lyricsLines.push(i)
      }
    }

    oldChords = [].concat.apply([], oldChords)
    oldChords = this._removeDuplicates(oldChords)

    for (let k = newSong.length - 1; k >= 0; k--) {
      if (chordLines.includes(k)) {
        for (let m = oldChords.length - 1; m >= 0; m--) {
          let replace = oldChords[m]
          let re = new RegExp(replace, 'g')

          if (!newChords.includes(this._shiftNote(this.oldKey, this.newKey, replace))) {
            newChords.push(this._shiftNote(this.oldKey, this.newKey, replace))
          }

          newSong[k] = newSong[k].replace(re, this._shiftNote(this.oldKey, this.newKey, replace))
        }
      }
    }

    return {
      'oldChords': oldChords,
      'newChords': newChords.reverse(),
      'newSong': newSong.join('\n')
    }
  }
}
