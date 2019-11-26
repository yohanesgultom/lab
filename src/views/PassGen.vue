<template>
  <v-form>
    <v-text-field
      v-model="length"
      type="number"
      label="Length"
      autofocus
      required
    ></v-text-field>
    <v-checkbox
      v-model="useSymbols"
      label="Use symbols"
    ></v-checkbox>
    <v-textarea
        ref="password"
        name="password"
        label="Password"
        v-model="password"
        counter
        @click="copyToClipboard"
        readonly
    ></v-textarea>
    <v-btn
      color="success"
      class="mr-4"
      @click="forceRecompute++"
    >
      Generate
    </v-btn>
  </v-form>
</template>

<script>
/* eslint-disable no-console */
function generatePassword(length, symbols=false) {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    if (symbols) {
        charset += "!@#$%&_="
    }
    let retVal = ""
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n))
    }
    return retVal
}

export default {
    data: () => ({
        length: 12,
        useSymbols: true,
        forceRecompute: 0,
    }),

    computed: {
        password: function() {
            this.forceRecompute
            return this.length ? generatePassword(this.length, this.useSymbols) : ''
        }
    },

    methods: {
        copyToClipboard: function() {
            console.log(this.$refs.password.$refs.input)
            if (this.password) {
                this.$refs.password.$refs.input.select()
                document.execCommand('copy')
                alert('copied to clipboard')
            }
        }
    },
}
</script>
