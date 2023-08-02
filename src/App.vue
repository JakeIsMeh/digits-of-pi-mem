<script setup>
import shared_state from './shared_state';
import { ref } from '@vue/reactivity';
import Game from './components/Game.vue';

var in_game = ref(false)
var hide_high_score = ref(false)
var button_text = ref("start")

function startGame() {
  in_game.value = true;
  button_text.value = "restart";
}

function endGame() {
  in_game.value = false;
}

function resetHighScore() {
  shared_state.value.high_score = 0;
}
</script>

<template>
  <h1>Slice of Pi (clone)</h1>
  <h3 v-if="!hide_high_score">high score: {{ shared_state.high_score }}</h3>
  <Game @game-over="endGame" v-if="in_game" />
  <button v-else @click="startGame">{{ button_text }}</button>
  <button @click="resetHighScore">reset highscore</button>
</template>

<style scoped>
</style>
