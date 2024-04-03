<script>

export default {
    name: 'MovieCard',
    props: {
        title: String,
        name: String,
        originalTitle: String,
        originalName: String,
        language: String,
        vote: Number,
    },
    mounted() {
        // console.log(this.language);
    }
}
</script>

<template>
    <li class="card">
        <ul>
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
    </li>
</template>

<style>
.lang-icon {
    background-image: url(../../node_modules/@textabledev/langs-flags-list/lang-flags.png);
}
</style>