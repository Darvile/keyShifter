var keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

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

export function transposeUserKeys (oldkey, newKey, userKeys) {
  var oldKeys = generateKeyTones(oldkey)
  var newKeys = generateKeyTones(newKey)
  var newUserKeys = []
  var indexNote = 0

  for (var i = 0; i < userKeys.length; i++) {
    for (var j = 0; j < userKeys[i].length; j++) {
      if (userKeys[i][j] === 'b') {
        userKeys[i] = userKeys[i][0]
        indexNote = oldKeys.indexOf(userKeys[i]) - 1
        console.log(userKeys[i])
      } else {
        indexNote = oldKeys.indexOf(userKeys[i])
      }
    }
    newUserKeys.push(newKeys[indexNote])
  }

  return newUserKeys
  // console.log('newUserKeys', newUserKeys)
}

// console.log(transposeUserKeys('E', 'F', ['D', 'A', 'G']))
