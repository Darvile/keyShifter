<template>
  <div class="transposer">
    <h1>Shifter</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <label for="old-song">Paste your song or chords here:</label>
          <textarea name="old-song" v-model="items.song" class="form-control"></textarea>
        </div>

        <div class="col-md-2">
          <label for="old-key">Original key</label>
          <select name="old-key" id="" class="form-control" v-model="items.old_key">
            <option v-for="key in items.keys">{{ key }}</option>
          </select>

          <label for="new-key">New key</label>
          <select name="new-key" id="" class="form-control" v-model="items.new_key">
            <option v-for="key in items.keys">{{ key }}</option>
          </select>
          <button @click="startShift">Shift Song</button>
        </div>

        <div class="col-md-5">
          <label for="old-song">Transposed song</label>
          <textarea name="old-song" v-model="items.song_shifted" class="form-control"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {transposeUserKeys} from '../core'
import {shiftSong} from '../core'

export default {
  name: 'hello',
  data () {
    return {
      items: {
        song: `C                   Dm
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
Listening to the wind of chan______ge`,
        song_shifted: '',
        old_key: 'C',
        new_key: 'A',
        keys: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
      }
    }
  },
  // computed: {
  //   song_shifted: function () {
  //     // return this.song_shifted
  //   }
  // },
  created () {
    this.formatInput()
  },
  watch: {
    items: {
      handler: function () {
      },
      deep: true
    }
  },
  methods: {
    startShift () {
      this.items.song_shifted = shiftSong(this.items.old_key, this.items.new_key, this.items.song)
    },
    formatInput () {
      // let inputArray = []
      let lines = this.items.song.split('\n')
      // console.log(lines)

      for (var i = 0; i < lines.length; i++) {
        // inputArray.push(this.items.song[i])
        // if (this.items.song[i] !== ' ') {
        // }
        // console.log(lines[i])
      }

      // console.log(inputArray)

      // this.items.song_shifted = inputArray
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  height: 300px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
