<script setup>
import { storeToRefs } from 'pinia';
import { useSharedState } from '@/stores/shared_state';
import { ref } from '@vue/reactivity';
import Game from './components/Game.vue';

const shared_state = storeToRefs(useSharedState());

var in_game = ref(false)
var button_text = ref("start")

function startGame() {
  in_game.value = true;
  button_text.value = "retry";
  shared_state.score.value = 0;
  shared_state.is_currently_high_score.value = false;
  shared_state.game_over.value = false;
}

function endGame() {
  in_game.value = false;
}

function resetHighScore() {
  shared_state.high_score.value = 0;
  shared_state.is_currently_high_score.value = false;
}
</script>

<template>
  <h1>Slice of Pi (clone)</h1>

  <div v-if="shared_state.game_over.value">
    <h2>oopsies! you've done goofed</h2>
    <h2 v-if="shared_state.is_currently_high_score.value">at least you set a new high score tho</h2>
    <h2 v-else>score: {{ shared_state.score.value }}</h2>
  </div>
  
  <h3 v-if="!shared_state.is_currently_high_score.value && in_game">high score: {{ shared_state.high_score }}</h3>
  
  <div v-if="!shared_state.game_over.value">
    <Game @game-over="endGame" v-if="in_game" />
  </div>
  <button v-if="!in_game || shared_state.game_over.value" @click="startGame">{{ button_text }}</button>

  <button v-if="shared_state.debug.value" @click="resetHighScore">reset highscore</button>
</template>

<style scoped>
</style>
