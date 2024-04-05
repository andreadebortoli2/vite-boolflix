<script>
import { store } from '../store';
import axios from 'axios';

export default {
    name: 'MovieCard',
    props: {
        id: Number,
        image: String,
        title: String,
        originalTitle: String,
        language: String,
        vote: Number,
        overview: String,
        castUrl: String,
        genreIds: Array,
        genresList: Array,
        filterList: Array
    },
    data() {
        return {
            store,
            posterSrc: `${store.posterImgUrl}/${store.posterSize}/${this.image}`,
            fullStarCount: '',
            emptyStarsCount: '',
            cast: [],
            genres: [],
            display: true,
        }
    },
    watch: {
        /**
         * at the change of the list of filters change the visibility of the card
         * @param {Array} newVal change on list of filters
         * return display true or false
         */
        filterList(newVal) {
            if (newVal.length === 0) {
                // console.log('empty');
                this.display = true;
                // loop in filters list
            } else if (newVal.length > 0) {
                for (let i = 0; i < newVal.length; i++) {
                    const val = newVal[i];
                    // check for corrispondencies
                    if (this.genreIds.includes(val) === true) {
                        // console.log('ok');
                        this.display = true;
                        if (this.display === true) break;
                    } else {
                        // console.log('no');
                        this.display = false;
                    };
                };
            };
        },
    },
    methods: {
        /**
         * calc full stars for vote
         */
        calcFullStars() {
            this.fullStarCount = Math.ceil(this.vote / 2);
        },
        /**
         * calc empty stars for vote
         */
        calcEmptyStars() {
            this.emptyStarsCount = 5 - this.fullStarCount;
        },
        /**
         * 'axios' API call for cast (if actors are more then five cut the array)
         * @param {String} url url for the call from store.js
         * return array of actors
         */
        castRequest(url) {
            const requestUrl = `${url}${this.id}/credits?api_key=${store.apiKey}`;
            // console.log(castUrl);
            axios.get(requestUrl)
                .then((response) => {
                    // console.log(response.data.cast);
                    response.data.cast.forEach(actor => {
                        this.cast.push(actor.name);
                    });
                    // console.log(this.cast);
                    if (this.cast.length > 5) {
                        this.cast.length = 5;
                        // console.log(this.cast);
                    };
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        /**
         * transform genres codes in strings
         */
        transformGenres() {
            this.genreIds.forEach(id => {
                this.genresList.forEach(genre => {
                    if (genre.id === id) {
                        this.genres.push(genre.name);
                        // console.log(this.genres);
                    };
                });
            });
        },
    },
    mounted() {
        // console.log(this.posterSrc);
        this.calcFullStars();
        this.calcEmptyStars();
        // console.log(this.fullStarCount);
        // console.log(this.emptyStarsCount);
        // console.log(this.id);
        this.castRequest(this.castUrl);
        this.transformGenres();
    }
}
</script>

<template>
    <div class="card" v-if="display">
        <img v-if="image" :src="posterSrc" alt="">
        <!-- / img -->
        <ul>
            <li v-if="language" class="language">
                <span :class="`lang-icon lang-icon-${language}`"></span>
            </li>
            <!-- / language_icon -->
            <li v-if="title">
                <span class="bold">Titolo:</span>{{ title }}
            </li>
            <!-- / title -->
            <li class="original_title" v-if="title !== originalTitle">
                <span class="bold">Titolo originale:</span>{{ originalTitle }}
            </li>
            <!-- / original_title -->
            <li v-if="vote">
                <span class="bold">Voto:</span>
                <span v-for="n in fullStarCount"><i class="fa-solid fa-star"></i></span>
                <!-- / full_stars -->
                <span v-for="n in emptyStarsCount"><i class="fa-regular fa-star"></i></span>
                <!-- / empty_stars -->
            </li>
            <!-- / vote -->
            <li v-if="overview" class="overview">
                <span class="bold">Trama:</span>{{ overview }}
            </li>
            <!-- / overview -->
            <li class="cast" v-if="cast.length > 0">
                <span class="bold">Cast:</span>
                <span v-for="actor in cast">{{ actor }}, </span>
                <span> ...</span>
            </li>
            <!-- / cast -->
            <li class="genres_list" v-if="genres.length > 0">
                <div class="bold">Generi:</div>
                <div class="genre">
                    <div v-for="genre in genres">{{ genre }}</div>
                </div>
            </li>
            <!-- / genres -->
        </ul>
    </div>
</template>

<style scoped>
.card {
    height: 500px;
    flex-shrink: 0;
    position: relative;
    background-color: lightgray;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 150px;
    overflow: hidden;


    &:hover {
        ul {
            display: block;
        }
    }

    img {
        height: 100%;

    }

    ul {
        display: none;
        background-color: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        color: ivory;
        list-style: none;
        padding: 2rem 1rem 0;
        position: absolute;
        bottom: 0;
        line-height: 1.5rem;

        li {
            padding: 0.3rem 0;
        }

        .bold {
            font-weight: bolder;
            padding-right: 0.4rem;
        }

        .language {
            position: absolute;
            top: 0.5rem;
            right: 1rem;
        }

        .original_title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        .overview {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            overflow: hidden;
            line-height: 2rem;
        }

        .genres_list {
            display: flex;

            .genre {
                display: flex;
                flex-wrap: wrap;

                div {
                    margin: 0.2rem;
                    padding: 0 0.2rem;
                    background-color: slategray;
                    border-radius: 0.2rem;
                }
            }
        }
    }
}

.lang-icon {
    background-image: url(../../node_modules/@textabledev/langs-flags-list/lang-flags.png);
}
</style>