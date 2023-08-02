<script setup>
import { storeToRefs } from 'pinia';
import { ref, computed } from '@vue/reactivity';
import { defineEmits } from '@vue/runtime-core';
import { useSharedState } from '@/stores/shared_state';
import piString from '@/assets/pi-1million.txt?raw';

defineEmits(['gameOver', 'newHighScore']);

const shared_state = storeToRefs(useSharedState());

var pi_slice = computed(() => piString.substring(shared_state.score.value - 3, shared_state.score.value + 3).split(''));
var pi_slice_length = computed(() => pi_slice.value.length);
var trimmed_pi_slice = computed(() => pi_slice.value.slice(0, pi_slice_length.value > 2 ? pi_slice_length.value - 1 : 2));
var last_input = ref("");
var new_high_score = ref(false);

function handleInput() {
    if (isNumeric(last_input.value.trim())) { // discard non number inputs
        if (last_input.value == pi_slice.value.at(-1)) { increment(); }
        else { shared_state.game_over.value = true; } //game over
    }
    last_input.value = ""
}

function increment() {
    shared_state.score.value += 1

    if (new_high_score.value) {
        shared_state.high_score.value = shared_state.score.value.valueOf(); // deep copy so we dont die to ref fuckery
        shared_state.is_currently_high_score.value = true;
    }
    else if (shared_state.score.value > shared_state.high_score.value) { // skip num comparison after new highscore
        shared_state.high_score.value = shared_state.score.value.valueOf(); // deep copy so we dont die to ref fuckery
        new_high_score.value = true;
    }
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
</script>

<template>
    <div >
        <h3>score: {{ shared_state.score.value }}</h3>
        <p v-if="shared_state.debug.value">{{ pi_slice }}</p>
        <div>
            <span v-for="char in trimmed_pi_slice">{{ char }}</span>
        </div>
        <button v-if="shared_state.debug.value" @click="increment">increment</button>
        <input type="text" inputmode="numeric" v-model="last_input" @input="handleInput" />
    </div>
</template>

<style scoped>
span {
    font-weight: 500;
    font-size: 4em;
}
</style>