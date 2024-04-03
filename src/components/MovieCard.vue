<script>

export default {
    name: 'MovieCard',
    props: {
        title: String,
        originalTitle: String,
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
                Titolo: {{ title }}
            </li>
            <li>
                Titolo originale: {{ originalTitle }}
            </li>
            <li>
                Lingua: {{ language }}
                <span :class="`lang-icon lang-icon-${language}`"></span>
            </li>
            <li>
                Voto: {{ vote }}
            </li>
        </ul>
    </li>
</template>

<style>
.lang-icon {
    background-image: url(../../node_modules/@textabledev/langs-flags-list/lang-flags.png);
}
</style>