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
        }
    },
    mounted() {
        // console.log(this.posterSrc);
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
            Voto: {{ vote }}
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