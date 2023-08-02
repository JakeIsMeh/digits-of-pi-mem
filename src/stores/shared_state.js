import { ref } from '@vue/reactivity';
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core';

export const useSharedState = defineStore('shared_state', () => {
    const score = ref(0);
    const high_score = useLocalStorage('highscore', 0);
    const game_over = ref(false);
    const is_currently_high_score = ref(false);
    const debug = ref(false);

    return { score, high_score, game_over, is_currently_high_score, debug }
});
// ref({
//     high_score: useLocalStorage('highscore', 0),
//     score: 0,
//     game_over: false,
//     is_currently_high_score: false,
//     debug: true,
// })