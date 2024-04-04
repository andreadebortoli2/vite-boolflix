<script>
import { store } from '../store';

export default {
    name: 'MovieCard',
    props: {
        image: String,
        title: String,
        name: String,
        originalTitle: String,
        originalName: String,
        language: String,
        vote: Number,
    },
    data() {
        return {
            store,
            posterSrc: `${store.posterImgUrl}/${store.posterSize}/${this.image}`,
            fullStarCount: '',
            emptyStarsCount: '',
        }
    },
    methods: {
        calcFullStars() {
            this.fullStarCount = Math.ceil(this.vote / 2)
        },
        calcEmptyStars() {
            this.emptyStarsCount = 5 - this.fullStarCount
        }
    },
    mounted() {
        // console.log(this.posterSrc);
        this.calcFullStars();
        this.calcEmptyStars();
        // console.log(this.fullStarCount);
        // console.log(this.emptyStarsCount);
    }
}
</script>

<template>
    <ul>
        <li>
            <img :src="posterSrc" alt="">
        </li>
        <li>
            Titolo: {{ title }} {{ name }}
        </li>
        <li>
            Titolo originale: {{ originalTitle }} {{ originalName }}
        </li>
        <li>
            Lingua:
            <span :class="`lang-icon lang-icon-${language}`"></span>
        </li>
        <li>
            Voto: {{ fullStarCount }} / 5
            <span v-for="n in fullStarCount"><i class="fa-solid fa-star"></i></span>
            <span v-for="n in emptyStarsCount"><i class="fa-regular fa-star"></i></span>
        </li>
        <li v-if="title">Movie</li>
        <li v-if="name">TV</li>
    </ul>
</template>

<style>
.lang-icon {
    background-image: url(../../node_modules/@textabledev/langs-flags-list/lang-flags.png);
}
</style>