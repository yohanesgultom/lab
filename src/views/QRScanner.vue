<template>
    <v-row>
        <!-- placeholder -->
        <v-col cols="12" md="6" v-if="loading">
            <v-row align="center" justify="center" style="margin-top:20vh">
                <v-icon
                    large
                    color="orange darken-2"
                >
                    mdi-camera
                </v-icon>
            </v-row>
        </v-col>

        <!-- camera -->
        <v-col cols="12" md="6">
            <QrcodeStream 
                :camera="camera"
                @init="onInit"
                @decode="onDecode"
            >
            </QrcodeStream> 
        </v-col>

        <!-- history -->
        <v-col cols="12" md="6">
            <v-card
                class="mx-auto"
            >
                <v-card-title>History</v-card-title>
                <v-card-subtitle>
                    <v-alert
                    type="info"
                    class="mt-4"
                    >          
                    These values are only stored in your browser local storage (nothing stored on server)
                    </v-alert>
                </v-card-subtitle>                
                <v-card-actions>
                <v-btn
                    color="default"
                    class="ml-4"
                    @click="clearHistory"
                >
                <v-icon left>
                    mdi-delete
                </v-icon>
                Clear All
                </v-btn>
                </v-card-actions>
                <v-card-text>
                    <v-list 
                        shaped
                        max-height="80vh"
                        class="overflow-y-auto"
                    >
                        <v-list-item-group>
                            <template v-for="(item, i) in history">
                            <v-list-item
                                :key="`item-${i}`"
                                :value="item"
                                active-class="deep-purple--text"
                                @click="copyHistoryToClipboard(item)"
                            >
                                <template v-slot:default="{ active }">
                                <v-list-item-action>
                                    <v-checkbox
                                    :input-value="active"
                                    color="deep-purple accent-4"
                                    ></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item"></v-list-item-title>
                                </v-list-item-content>
                                </template>
                            </v-list-item>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
            </v-card>            
        </v-col>
    </v-row>  
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader"
import store from "../store/index"

export default {
    components: {
        QrcodeStream,
    },

    data: () => ({
        camera: 'auto',
        scanResult: null,
        forceRefresh: 0,
        loading: true,
    }),

    mounted() {
        store.commit('update', {overlay: true})
    },

    computed: {
        history: function() {
            let history = []
            this.forceRefresh
            if (localStorage.getItem('scan_history')) {
                try {
                    history = JSON.parse(localStorage.getItem('scan_history'))
                } catch(e) {
                    localStorage.removeItem('scan_history')
                }
            }
            return history
        }
    },

    methods: {
        async onInit(promise) {
            try {
                await promise
                store.commit('update', {overlay: false})                
            } catch (error) {
                store.commit('update', {alertMessage: error.name, overlay: false})
            } finally {
                this.loading = false
            }
        }, 
        async onDecode(code) {
            alert(code)
            store.commit('update', {alertMessage: `Saved to history: "${code}"`})
            this.camera = 'off' 
            this.scanResult = code
            const history = this.history
            history.unshift(this.scanResult)
            localStorage.setItem('scan_history', JSON.stringify(history))
            this.camera = 'auto'
        },
        copyToClipboard: function() {
            if (this.scanResult) {
                navigator.clipboard.writeText(this.scanResult)
                store.commit('update', {alertMessage: 'copied to clipboard'})
            }
        },
        copyHistoryToClipboard: function(item) {
            navigator.clipboard.writeText(item)
            store.commit('update', {alertMessage: 'copied to clipboard'})
        },
        clearHistory: function() {
            localStorage.setItem('scan_history', JSON.stringify([]))
            this.forceRefresh++
        },
    },
}
</script>
