<template>
  <v-form>
    <v-alert type="info">
      Parse uploaded xlsx file (per row) and display details (columns)
    </v-alert>

    <v-file-input 
      label="Upload file (.xlsx)" 
      accept=".xlsx"
      @change="parseFile"
    ></v-file-input>
    <v-autocomplete
      v-show="rows"
      label="Rows found"
      prepend-icon="mdi-database-search"
      placeholder="Start typing to Search"
      item-text="Nama dagang produk"
      return-object
      :items="rows"
      @change="displayDetails"
    ></v-autocomplete>
    
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

    <!-- make global -->
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-form>  
</template>

<script>
/* eslint-disable no-console */
import XLSX from 'xlsx'

export default {
    data: function() {
      return {
        rows: null,
        selection: null,
        loading: false,
      }
    },  
    methods: {
        parseFile: function (f) {        
            this.loading = true    
            let reader = new FileReader()
            reader.onload = (e) => {
                let data = e.target.result
                let workbook = XLSX.read(data, {type: 'binary'})
                let sheet = workbook.SheetNames[0]
                this.rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]) 
                this.loading = false
            }
            reader.readAsBinaryString(f)
        },
        displayDetails: function(val) {
            this.selection = val
        }
    },
}
</script>
