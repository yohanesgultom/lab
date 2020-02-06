<template>
  <v-form>
    <v-alert type="info">
      Warta GKI Cawang Search
    </v-alert>   

    <v-text-field
        name="query"
        label="Nama Petugas"
        prepend-icon="mdi-account-search"
        v-model="query"
        placeholder="Nama petugas"
    ></v-text-field>
    
    <div class="d-flex justify-center">
      <v-btn      
        color="info"
        @click="search"
      >
        Cari
      </v-btn>
    </div>

    <v-simple-table class="mt-5 table-bordered" v-show="originalText">
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Tanggal</td>
            <td>{{ serviceDate }}</td>
          </tr>
          <tr>
            <td>Ibadah Ke</td>
            <td>{{ serviceNo }}</td>
          </tr>
          <tr>
            <td>Tugas</td>
            <td>{{ taskName }}</td>
          </tr>
          <tr>
            <td>Teks Asli</td>
            <td>{{ originalText }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    
  </v-form>
</template>

<script>
/* eslint-disable no-console */
import store from "../store/index"

export default {
    data: () => ({
        query: '',
        originalText: null,
        serviceDate: null,
        serviceNo: null,
        taskName: null,
    }),

    methods: {
        search: async function() {
            if (this.query) {
                store.commit('update', {overlay: true})
                this.originalText = null
                this.serviceDate = null
                this.serviceNo = null
                this.taskName = null
                try {
                    let res = await this.$http.get('https://lab.gultom.me/warta-api', {params: {query: this.query}})
                    console.log(res.data)
                    if (!res.data.original_text) {
                        store.commit('update', {overlay: false, alertMessage: 'Tidak ditemukan'})
                    } else {
                        this.originalText = res.data.original_text
                        this.serviceDate = res.data.service_date
                        this.serviceNo = res.data.service_no
                        this.taskName = res.data.task_name
                        store.commit('update', {overlay: false})
                    }                    
                } catch (err) {
                    store.commit('update', {overlay: false, alertMessage: err}) 
                }
            }
        }
    },
}
</script>
