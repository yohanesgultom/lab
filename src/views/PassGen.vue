<template>
    <v-row>
        <!-- form -->
        <v-col cols="12" md="6">
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
            @click="getNewPassword"
            >
            <v-icon left>
                mdi-play-circle
            </v-icon>
            Generate
            </v-btn>    
        </v-form>
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
                    This password is only stored in your browser local storage (nothing stored on server)
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
import store from "../store/index"

function generatePassword(length, symbols=false) {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    if (symbols) {
        charset += "!@#$%&_=-"
    }
    let retVal = ""
    for (let i = 0, n = charset.length; i < length; ++i) {
        let c = null
        if (i == 0) {
            // make sure there is one lowercase
            c = charset.charAt(Math.floor(Math.random() * 26))
        } else if (i == 1) {
            // make sure there is one uppercase
            c = charset.charAt(Math.floor(Math.random() * (52 - 26) + 26))
        } else if (i == 2) {
            // make sure there is one number
            c = charset.charAt(Math.floor(Math.random() * (62 - 52) + 52))
        } else if (i == 3 && symbols) {
            // make sure there is one number
            c = charset.charAt(Math.floor(Math.random() * (71 - 62) + 62))
        } else {
            c = charset.charAt(Math.floor(Math.random() * n))
        }
        retVal += c
    }
    // shuffle
    return retVal.split('').sort(function(){return 0.5-Math.random()}).join('')
}

export default {
    data: () => ({
        length: 12,
        useSymbols: true,
        password: null,
        forceRefresh: 0,
    }),

    computed: {
        history: function() {
            let history = []
            this.forceRefresh
            if (localStorage.getItem('history')) {
                try {
                    history = JSON.parse(localStorage.getItem('history'))
                } catch(e) {
                    localStorage.removeItem('history')
                }
            }
            return history
        }
    },

    methods: {
        getNewPassword: function() {
            this.password = this.length ? generatePassword(this.length, this.useSymbols) : ''
            const history = this.history
            history.unshift(this.password)
            localStorage.setItem('history', JSON.stringify(history))
        },
        copyToClipboard: function() {
            if (this.password) {
                navigator.clipboard.writeText(this.password)
                store.commit('update', {alertMessage: 'copied to clipboard'})
            }
        },
        copyHistoryToClipboard: function(item) {
            navigator.clipboard.writeText(item)
            store.commit('update', {alertMessage: 'copied to clipboard'})
        },
        clearHistory: function() {
            localStorage.setItem('history', JSON.stringify([]))
            this.forceRefresh++
        },
    },
}
</script>
