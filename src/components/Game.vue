<script setup>
import { ref, computed } from '@vue/reactivity';
import { defineEmits } from '@vue/runtime-core';
import { computedEager } from '@vueuse/core'
import shared_state from '../shared_state';
import piString from '@/assets/pi-1million.txt?raw';

defineEmits(['gameOver', 'newHighScore']);

var score = ref(0);
var pi_slice = computed(() => piString.substring(score.value - 3, score.value + 3).split(''));
var pi_slice_index = ref([0, 1, 2]);
var pi_slice_length = computed(() => pi_slice.value.length);
var indexed_pi_slice = computed(() => pi_slice.value.slice(0, pi_slice_length.value > 2 ? pi_slice_length.value - 1 : 2).map((char, index) => {return {char: char, index: pi_slice_index.value.at(index)}}))
var last_input = ref("");
var new_high_score = ref(false);

function handleInput() {
    if (isNumeric(last_input.value.trim())) { // discard non number inputs
        if (last_input.value == pi_slice.value.at(-1)) { increment(); }
        else { } //game over
    }
    last_input.value = ""
}

function increment() {
    score.value += 1
    if (pi_slice_length.value > 5) {pi_slice_index.value.shift()};
    pi_slice_index.value.push(score.value.valueOf()+2);

    if (new_high_score.value) {
        shared_state.value.high_score = score.value.valueOf(); // deep copy so we dont die to ref fuckery
    }
    else if (score.value > shared_state.value.high_score) { // skip num comparison after new highscore
        shared_state.value.high_score = score.value.valueOf(); // deep copy so we dont die to ref fuckery
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
    {{ pi_slice }}
    <TransitionGroup name="list" tag="div">
        <span v-for="(char, index) in indexed_pi_slice" :key="char.index">{{ char.char }}</span>
    </TransitionGroup>
    <button @click="increment">incre</button>
    <input type="text" inputmode="numeric" v-model="last_input" @input="handleInput" />
</template>

<style scoped>
span {
    font-weight: 500;
    font-size: 4em;
}
/* TODO: figure out animations */
</style>