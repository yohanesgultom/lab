<template>
    <v-form>
        <v-alert
            border="left"
            colored-border
            type="info"
            elevation="2"
        >
            Convert emoji to unicode and vice versa
        </v-alert>

        <v-textarea
            name="emoji"
            label="Emoji"
            append-icon="mdi-face"
            v-model="emoji"
            @keyup="convertEmoji"
            placeholder="😍"
        ></v-textarea>

        <v-textarea
            name="unicode"
            label="Unicode (Surrogate Pair)"
            append-icon="mdi-unicode"
            v-model="unicode"
            @keyup="convertUnicode"
            placeholder="\uD83D\uDE0D"
        ></v-textarea>
    </v-form>
</template>

<script>
import store from "../store/index";

// http://www.2ality.com/2013/09/javascript-unicode.html
const u = function(codeUnit) {
    return "\\u" + codeUnit.toString(16).toUpperCase();
};

// http://www.2ality.com/2013/09/javascript-unicode.html
const toUTF16 = function(emoji) {
    let codePoint = emoji.codePointAt(0);
    let TEN_BITS = parseInt("1111111111", 2);

    if (codePoint <= 0xffff) {
        return u(codePoint);
    }
    codePoint -= 0x10000;

    // Shift right to get to most significant 10 bits
    let leadSurrogate = 0xd800 + (codePoint >> 10);

    // Mask to get least significant 10 bits
    let tailSurrogate = 0xdc00 + (codePoint & TEN_BITS);

    return u(leadSurrogate) + u(tailSurrogate);
};

// From: https://stackoverflow.com/a/33686504/1862500
const parseUnicode = function(str) {
    let r = /\\u([\d\w]{4})/gi;
    str = str.replace(r, function(match, grp) {
        return String.fromCharCode(parseInt(grp, 16));
    });
    return str;
};

export default {

    name: 'EmojiConverter',

    data: () => ({
        emoji: "",
        unicode: ""
    }),

    methods: {
        convertEmoji: function() {
            let unicode = "";
            try {
                let cleaned = this.emoji.replace(/\s/g, "");
                for (let i = 0; i < cleaned.length; i += 2) {
                    unicode += toUTF16(cleaned.substr(i, 2));
                }
            } catch (err) {
                unicode = "";
                store.commit("update", { alertMessage: err });
            } finally {
                this.unicode = unicode;
            }
        },
        convertUnicode: function() {
            let emoji = "";
            try {
                let cleaned = this.unicode.replace(/\s/g, "");
                for (let i = 0; i < cleaned.length; i += 6) {
                    emoji += parseUnicode(cleaned.substr(i, 6));
                }
                // emoji = parseUnicode(e.target.value)
            } catch (err) {
                emoji = "";
                store.commit("update", { alertMessage: err });
            } finally {
                this.emoji = emoji;
            }
        }
    }
};
</script>
