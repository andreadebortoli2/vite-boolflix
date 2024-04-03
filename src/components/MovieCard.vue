<script>
export default {
    name: 'MovieCard',
    props: {
        title: String,
        originalTitle: String,
        language: String,
        vote: Number
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
                Titolo originale: {{ original_title }}
            </li>
            <li>
                Lingua: {{ original_language }}
            </li>
            <li>
                Voto: {{ vote_average }}
            </li>
        </ul>
    </li>
</template>

<style></style>