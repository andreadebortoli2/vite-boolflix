import { reactive } from "vue";

export const store = reactive({
    movieApiUrl: 'https://api.themoviedb.org/3/search/movie?',
    ApiKey: 'api_key=7c7d2baca05b9819b69763a53ed1d49d',
    searchRequestStart: '&query=',
    movieLangFilter: '&language=it-IT',
})