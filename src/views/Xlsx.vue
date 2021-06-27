<template>
  <v-form>
    <v-alert
          border="left"
          colored-border
          type="info"
          elevation="2"
      >
      Parse uploaded xlsx file (per row) and display details (columns)
    </v-alert>

    <v-file-input 
      label="Upload file (.xlsx)" 
      accept=".xlsx"
      @change="parseFile"
    ></v-file-input>

    <v-select
      v-show="rowKeys"
      v-model="searchKey"
      :items="rowKeys"
      prepend-icon="mdi-key"
      label="Search key"
    ></v-select>
    <v-autocomplete
      v-show="rows"
      label="Rows found"
      prepend-icon="mdi-database-search"
      placeholder="Start typing to Search"
      :item-text="searchKey"
      return-object
      :items="rows"
      @change="displayDetails"
    ></v-autocomplete>
    
    <p v-show="selection" class="title pl-4">Details</p>
    <v-simple-table v-show="selection">
      <template v-slot:default>
        <tbody>
          <tr v-for="(value, key, index) in selection" :key="index">
            <td>{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

  </v-form>  
</template>

<script>
import XLSX from 'xlsx'
import store from "../store/index"

export default {
    data: function() {
      return {
        rows: [],
        searchKey: null,
        selection: null,
      }
    },
    computed: {
      rowKeys: function() {
          let keys = []
          if (this.rows && this.rows.length > 0) {
            keys = Object.keys(this.rows[0])
          }
          return keys
      }
    },
    methods: {
        parseFile: function (f) {        
            store.commit('update', {overlay: true})
            this.rows = []
            this.searchKey = null
            this.selection = null
            let reader = new FileReader()
            reader.onload = (e) => {
                let data = e.target.result
                let workbook = XLSX.read(data, {type: 'binary'})
                let sheet = workbook.SheetNames[0]
                this.rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]) 
                store.commit('update', {overlay: false})
            }
            reader.readAsBinaryString(f)
        },
        displayDetails: function(val) {         
          this.selection = val
        }
    },
}
</script>
