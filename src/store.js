import { reactive } from "vue";

export const store = reactive({
    movieApiUrl: 'https://api.themoviedb.org/3/search/movie?api_key=7c7d2baca05b9819b69763a53ed1d49d&language=it-IT&query=',
    tvApiUrl: 'https://api.themoviedb.org/3/search/tv?api_key=7c7d2baca05b9819b69763a53ed1d49d&language=it_IT&query=',
    searchedList: [],
})