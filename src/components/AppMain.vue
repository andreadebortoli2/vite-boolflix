<script>
import { store } from '../store';
import ContentCard from './ContentCard.vue';

export default {
    name: 'AppMain',
    components: {
        ContentCard,
    },
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <div class="search_response container">
        <ContentCard :image="content.poster_path" :title="content.title" :name="content.name"
            :originalTitle="content.original_title" :originalName="content.original_name"
            :language="content.original_language" :vote="content.vote_average" :overview="content.overview"
            v-for="content in store.searchedList" />
    </div>
</template>


<style>
.search_response {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}
</style>