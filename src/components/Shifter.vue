<template>
  <div class="transposer">
    <h1>Key Shifter</h1>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div v-if="old_key_error_msg" class="alert alert-danger" role="alert">Please select the original key...</div>
          <div v-if="new_key_error_msg" class="alert alert-danger" role="alert">Please select the new key...</div>
        </div>
        
        <div class="col-md-5">
          <label for="old-song">Paste your song or chords here:</label>
          <textarea name="old-song" v-model="song" class="form-control"></textarea>

          <h2>Old Chords</h2>
          <span style="margin-right: 5px;" v-for="oldNote in getOldNotes" class="label label-primary">{{ oldNote }}</span>
        </div>

        <div class="col-md-2">
          <label for="old-key">Original key</label>
          <select name="old-key" class="form-control" v-model="old_key">
            <option value="oldKey">Old key</option>
            <option v-for="key in keys">{{ key }}</option>
          </select>

          <label for="new-key">New key</label>
          <select name="new-key" class="form-control" v-model="new_key">
            <option value="newKey">New key</option>
            <option v-for="key in keys">{{ key }}</option>
          </select>
          <!-- <div class="row">
            <div class="col-md-4">
              <button class="btn btn-default" @click="startShift">-</button>    
            </div>
            <div class="col-md-4"><p style="margin-top: 30px;">1/2tone</p></div>
            <div class="col-md-4">
              <button class="btn btn-default" @click="plusHalfTone">+</button>
            </div>
          </div> -->
          
          <button class="btn btn-default" @click="startShift">Shift Song</button>
        </div>

        <div class="col-md-5">
          <label for="old-song">Shifted song</label>
          <textarea name="old-song" v-model="song_shifted" class="form-control"></textarea>

          <h2>New Chords</h2>
          <span style="margin-right: 5px;" v-for="newNote in getNewNotes" class="label label-success">{{ newNote }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import KeyShifter from '../core'
export default {
  name: 'Shifter',
  data () {
    return {
      old_key_error_msg: false,
      new_key_error_msg: false,
      song: `          G              F
Well, you only need the light 
                   C
When it’s burning low
               G
Only miss the sun 
                      Am
When it’s starts to snow
               F
Only know you love her 
                  C  G
When you let her go`,
      song_shifted: '',
      old_chords: [],
      new_chords: [],
      old_key: 'oldKey',
      new_key: 'newKey',
      keys: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
    }
  },
  computed: {
    getOldNotes () {
      return this.old_chords
    },
    getNewNotes () {
      return this.new_chords
    }
  },
  watch: {
    'this.new_key': {
      handler: function (val, oldVal) {
        console.log('change')
        if (this.new_key !== 'newKey') {
          this.error_msg = false
        }
      },
      deep: true
    }
  },
  created () {
  },
  methods: {
    plusHalfTone () {
      if (this.old_key !== 'oldKey') {
        this.old_key_error_msg = false

        let plusKeyIndex = this.keys.indexOf(this.old_key) + 1

        if (plusKeyIndex < 11) {
          this.old_key = this.keys[plusKeyIndex]
          this.new_key = this.keys[plusKeyIndex + 1]
        } else if (plusKeyIndex === 11) {
          this.old_key = this.keys[11]
          this.new_key = this.keys[0]
        } else {
          this.old_key = this.keys[0]
          this.new_key = this.keys[1]
        }

        this.startShift()
      } else {
        this.old_key_error_msg = true
      }
    },
    minusHalfTone () {
      if (this.old_key !== 'oldKey') {
        this.old_key_error_msg = false

        let plusKeyIndex = this.keys.indexOf(this.old_key) - 1

        if (plusKeyIndex < 11) {
          this.old_key = this.keys[plusKeyIndex]
          this.new_key = this.keys[plusKeyIndex + 1]
        } else if (plusKeyIndex === 11) {
          this.old_key = this.keys[11]
          this.new_key = this.keys[0]
        } else {
          this.old_key = this.keys[0]
          this.new_key = this.keys[1]
        }

        this.startShift()
      } else {
        this.old_key_error_msg = true
      }
    },
    startShift (oldKey = this.old_key, newKey = this.new_key, song = this.song) {
      const keyShifter = new KeyShifter(oldKey, newKey, song)

      if (this.new_key !== 'newKey' && this.old_key !== 'oldKey') {
        this.song_shifted = keyShifter.init().newSong
        this.old_chords = keyShifter.init().oldChords
        this.new_chords = keyShifter.init().newChords

        this.old_key_error_msg = false
        this.new_key_error_msg = false
      } else {
        if (this.old_key !== 'oldKey') {
          this.old_key_error_msg = false
        } else {
          this.old_key_error_msg = true

          return
        }
        if (this.new_key !== 'newKey') {
          this.new_key_error_msg = false
        } else {
          this.new_key_error_msg = true
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  height: 300px;
}

.btn {
  margin-top: 20px;
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
