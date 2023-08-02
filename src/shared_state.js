import {ref} from '@vue/reactivity';
import { useLocalStorage } from '@vueuse/core';

var shared_state = ref({
    high_score: useLocalStorage('highscore', 0),
    score: 0,
    game_over: false,
    is_currently_high_score: false,
})

export default shared_state;