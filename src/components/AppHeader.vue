<script>
import { store } from '../store';
/* import axios from 'axios'; */

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<template>
    <div>
        <input type="text" v-model="store.searchText" placeholder="Write the title you looking for">
        <button @click="store.searchContent()">Search</button>
    </div>

</template>


<style></style>