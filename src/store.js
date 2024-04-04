import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
    movieUrl: 'https://api.themoviedb.org/3/search/movie',
    tvUrl: 'https://api.themoviedb.org/3/search/tv',
    apiKey: '7c7d2baca05b9819b69763a53ed1d49d',
    languageFilter: 'language=it_IT',
    posterImgUrl: 'http://image.tmdb.org/t/p',
    posterSize: 'w342',
    searchText: '',
    searchedList: null,
    searchContent() {
        if (this.searchText !== '') {

            this.searchedList = [];

            const searchMovieUrl = `${this.movieUrl}?api_key=${this.apiKey}&query=${this.searchText}&${this.languageFilter}`;

            const searchtvUrl = `${this.tvUrl}?api_key=${this.apiKey}&query=${this.searchText}&${this.languageFilter}`;

            axios.get(searchMovieUrl).then(response => {
                // console.log(response.data.results);

                response.data.results.forEach(movie => { this.searchedList.push(movie) });
            });

            axios.get(searchtvUrl).then(response => {
                // console.log(response.data.results);

                response.data.results.forEach(tv => this.searchedList.push(tv));
            });

            // console.log(store.searchedList);

        } else {
            this.searchedList = null;
        };
    },
})