import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
    apiKey: '7c7d2baca05b9819b69763a53ed1d49d',
    movieUrl: 'https://api.themoviedb.org/3/search/movie',
    tvUrl: 'https://api.themoviedb.org/3/search/tv',
    languageFilter: 'language=it',
    posterImgUrl: 'http://image.tmdb.org/t/p',
    posterSize: 'w342',
    genresListMovieUrl: 'https://api.themoviedb.org/3/genre/movie/list',
    genresListTvUrl: 'https://api.themoviedb.org/3/genre/tv/list',
    movieCastApiUrl: 'https://api.themoviedb.org/3/movie/',
    tvCastApiUrl: 'https://api.themoviedb.org/3/tv/',
    searchText: '',
    searchedMovieList: null,
    searchedTvList: null,
    genresListMovie: [],
    genresListTv: [],
    filterList: [],
    /**
     * return array of movies and tv shows
     * make both 'axios' API calls
     */
    searchContent() {
        // clean filters array each new search
        this.filterList = [];
        if (this.searchText !== '') {
            // transform null in arrays
            this.searchedMovieList = [];
            this.searchedTvList = [];
            // create urls
            const searchMovieUrl = `${this.movieUrl}?api_key=${this.apiKey}&query=${this.searchText}&${this.languageFilter}`;
            const searchtvUrl = `${this.tvUrl}?api_key=${this.apiKey}&query=${this.searchText}&${this.languageFilter}`;
            // start calls
            axios.get(searchMovieUrl)
                .then(response => {
                    // console.log(response.data.results);
                    if (response.data.results.length === 0) {
                        this.searchedMovieList = [];
                    } else {
                        response.data.results.forEach(movie => { this.searchedMovieList.push(movie) });
                    };
                })
                .catch(function (error) {
                    console.log(error);
                });
            axios.get(searchtvUrl)
                .then(response => {
                    // console.log(response.data.results);
                    if (response.data.results.length === 0) {
                        this.searchedTvList = [];
                    } else {
                        response.data.results.forEach(tv => this.searchedTvList.push(tv));
                    };
                })
                .catch(function (error) {
                    console.log(error);
                });
            // console.log(store.searchedList);
        } else {
            // arrays back to null to clear the page
            this.searchedMovieList = null;
            this.searchedTvList = null;
        };
    },
    /**
     * return arrays for movies and tv shows genres
     */
    generateGenreLists() {
        // create urls
        const movieGenresUrl = `${this.genresListMovieUrl}?api_key=${this.apiKey}&${this.languageFilter}`;
        const tvGenresUrl = `${this.genresListTvUrl}?api_key=${this.apiKey}&${this.languageFilter}`;
        // generate movies genres array
        axios.get(movieGenresUrl)
            .then(response => {
                // console.log(response.data.genres);
                this.genresListMovie = response.data.genres;
            })
            .catch(function (error) {
                console.log(error);
            });
        // generate tv shows genres array
        axios.get(tvGenresUrl)
            .then(response => {
                // console.log(response.data.genres);
                this.genresListTv = response.data.genres;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
})