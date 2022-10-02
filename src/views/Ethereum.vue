<template>
  <v-form>
      <v-alert
          border="left"
          colored-border
          type="info"
          elevation="2"
      >
      Ethereum (Ropsten) integration using web3js and infura.io
    </v-alert>   

    <v-textarea
        name="address"
        label="Eth Address"
        prepend-icon="mdi-wallet"
        v-model="address"
        placeholder="0x593bc8ef18e35a3e3022412727c13768cb36da71"
    ></v-textarea>
    
    <div class="d-flex justify-center">
      <v-btn      
        color="info"
        @click="getBalance"
      >
        Get Balance
      </v-btn>
    </div>

    <v-simple-table class="mt-5 table-bordered" v-show="balance">
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Balance</td>
            <td>{{ balance }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    
  </v-form>
</template>

<script>
/* eslint-disable no-console */
import Web3 from 'web3'
import localforage from 'localforage'
import store from "../store/index"
const web3 = new Web3('https://ropsten.infura.io/v3/e9c90cfa581548eeb2d3fca53fe8be2a')

localforage.config({
    driver      : localforage.INDEXEDDB,
    name        : 'eth-wallet',
    version     : 1.0,
    storeName   : 'eth-wallet-db',
    description : 'eth wallet database',
})

export default {

    name: 'EthereumWallet',

    data: () => ({
        address: '',
        balance: null,
    }),

    methods: {
      getBalance: async function () {
        // attempt to load address from local storage
        let tmp = await localforage.getItem('address')
        console.log('stored in local storage:', tmp)      
        if (this.address) {
          try {
            store.commit('update', {overlay: true})          
            let balance = await web3.eth.getBalance(this.address)
            this.balance = Web3.utils.fromWei(balance, 'ether')
            store.commit('update', {overlay: false})
            // store in local storage
            await localforage.setItem('address', this.address)
          } catch (err) {
            store.commit('update', {overlay: false, alertMessage: err})            
          }          
        }
      }
    },
}
</script>
