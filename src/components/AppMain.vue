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
    <div class="empty_array_message" v-if="store.searchedList !== null && store.searchedList.length === 0">
        NESSUN RISULTATO TROVATO
    </div>
</template>


<style>
.search_response {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.empty_array_message {
    height: 100px;
    width: 500px;
    margin: 0 auto;
    background-color: darkcyan;
    text-align: center;
    line-height: 100px;
    font-size: 2rem;
    font-weight: bold;
    color: ivory;
    border-radius: 1rem;
}
</style>