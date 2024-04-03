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
    <ul class="sarech_response" v-for="content in store.searchedList">
        <ContentCard :title="content.title" :name="content.name" :originalTitle="content.original_title"
            :originalName="content.original_name" :language="content.original_language" :vote="content.vote_average" />
    </ul>
</template>


<style scoped></style>