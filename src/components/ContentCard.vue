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
    },
    data() {
        return {
            store,
            posterSrc: `${store.posterImgUrl}/${store.posterSize}/${this.image}`,
            fullStarCount: '',
            emptyStarsCount: '',
            cast: [],
        }
    },
    methods: {
        calcFullStars() {
            this.fullStarCount = Math.ceil(this.vote / 2)
        },
        calcEmptyStars() {
            this.emptyStarsCount = 5 - this.fullStarCount
        },
        castRequest(url) {

            const castUrl = `${url}${this.id}/credits?api_key=${store.apiKey}`;

            // console.log(castUrl);

            axios.get(castUrl).then((response) => {

                // console.log(response.data.cast);

                response.data.cast.forEach(actor => {
                    this.cast.push(actor.name);
                });

                // console.log(this.cast);

                if (this.cast.length > 5) {
                    this.cast.length = 5;
                    // console.log(this.cast);
                };
            });
        },
        displayCast() {
            if (this.name === undefined) {
                this.castRequest(store.movieCastApiUrl);
            } else if (this.title === undefined) {
                this.castRequest(store.tvCastApiUrl);
            };
        }
    },
    mounted() {
        // console.log(this.posterSrc);
        this.calcFullStars();
        this.calcEmptyStars();
        // console.log(this.fullStarCount);
        // console.log(this.emptyStarsCount);
        // console.log(this.id);
        this.displayCast()
    }
}
</script>

<template>
    <div class="card">
        <img v-if="image" :src="posterSrc" alt="">
        <ul>
            <li v-if="title">
                <span class="bold">Titolo:</span> {{ title }}
            </li>
            <li class="original_title" v-if="title !== originalTitle">
                <span class="bold">Titolo originale:</span> {{ originalTitle }}
            </li>
            <li v-if="vote">
                <span class="bold">Voto: </span>
                <span v-for="n in fullStarCount"><i class="fa-solid fa-star"></i></span>
                <span v-for="n in emptyStarsCount"><i class="fa-regular fa-star"></i></span>
            </li>
            <li v-if="overview" class="overview">
                <span class="bold">Trama:</span> {{ overview }}
            </li>
            <li class="cast" v-if="cast.length > 0">
                <span class="bold">Cast: </span>
                <span v-for="actor in cast"> {{ actor }}, </span>
                <span> ...</span>
            </li>
            <li v-if="language" class="language">
                <span :class="`lang-icon lang-icon-${language}`"></span>
            </li>
            <li class="badge" v-if="title">
                <i class="fa-solid fa-film"></i>
            </li>
            <li class="badge" v-if="name">
                <i class="fa-solid fa-tv"></i>
            </li>
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
        padding: 0.5rem 1rem 4rem;
        position: absolute;
        bottom: 0;
        line-height: 1.5rem;

        li {
            padding: 0.3rem 0;
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

        .bold {
            font-weight: bolder;
        }

        .language {
            position: absolute;
            bottom: 1rem;
            left: 1rem;
        }

        .badge {
            background-color: darkturquoise;
            padding: 0.3rem 0.3rem 0.2rem;
            font-size: 2rem;
            font-weight: bold;
            border-radius: 0.5rem;
            width: fit-content;
            position: absolute;
            bottom: 1rem;
            right: 1rem;
        }
    }
}

.lang-icon {
    background-image: url(../../node_modules/@textabledev/langs-flags-list/lang-flags.png);
}
</style>