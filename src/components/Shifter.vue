<template>
  <div class="transposer">
    <h1>Key Shifter</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div v-if="error_msg" class="alert alert-danger" role="alert">Please select the new key...</div>
        </div>
        <div class="col-md-5">
          <label for="old-song">Paste your song or chords here:</label>
          <textarea name="old-song" v-model="items.song" v-on:keyup="startShift" class="form-control"></textarea>

          <h2>Old Notes</h2>
          <span style="margin-right: 5px;" v-for="oldNote in getOldNotes" class="label label-primary">{{ oldNote }}</span>
        </div>

        <div class="col-md-2">
          <label for="old-key">Original key</label>
          <select name="old-key" class="form-control" v-model="items.old_key">
            <option value="oldKey">Old key</option>
            <option v-for="key in items.keys">{{ key }}</option>
          </select>

          <label for="new-key">New key</label>
          <select name="new-key" class="form-control" v-model="items.new_key">
            <option value="newKey">New key</option>
            <option v-for="key in items.keys">{{ key }}</option>
          </select>
          <button class="btn btn-default" @click="startShift">Shift Song</button>
        </div>

        <div class="col-md-5">
          <label for="old-song">Shifted song</label>
          <textarea name="old-song" v-model="items.song_shifted" class="form-control"></textarea>

          <h2>New Notes</h2>
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
      error_msg: false,
      items: {
        song: 'C#',
        song_shifted: '',
        old_notes: [],
        new_notes: [],
        old_key: 'oldKey',
        new_key: 'newKey',
        keys: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
      }
    }
  },
  computed: {
    getOldNotes () {
      return this.items.old_notes
    },
    getNewNotes () {
      return this.items.new_notes
    }
  },
  created () {
  },
  methods: {
    startShift () {
      const keyShifter = new KeyShifter(this.items.old_key, this.items.new_key, this.items.song)

      if (this.items.new_key !== 'newKey') {
        this.items.song_shifted = keyShifter.init().newSong
        this.items.old_notes = keyShifter.init().oldNotes
        this.items.new_notes = keyShifter.init().newNotes

        if (this.items.old_key === 'oldKey') {
          this.items.old_key = this.items.old_notes[0]
        }
        this.error_msg = false
      } else {
        this.error_msg = true
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
