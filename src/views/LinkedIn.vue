<template>
  <v-form>
      <v-alert
          border="left"
          colored-border
          type="info"
          elevation="2"
      >
      Share any URL to your LinkedIn + Twitter feeds
    </v-alert>

    <v-textarea
      v-model="url"
      type="text"
      label="URL"
      autofocus
      required
    ></v-textarea>
    <v-btn
      color="success"
      class="mr-4"
      @click="share"
    >
      Share
    </v-btn>
  </v-form>
</template>

<script>
export default {
    data: () => ({
        url: '',
    }),

    methods: {
        share: function() {
            /* eslint-disable no-console */
            if (this.url) {
              let url = encodeURI(this.url)
              let shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
              window.open(shareUrl)
            }
        }
    }
}
</script>
