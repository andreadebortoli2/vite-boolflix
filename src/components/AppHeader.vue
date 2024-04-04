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
    <div class="header container">
        <div class="logo">
            <h1>BOOLFLIX</h1>
        </div>
        <div class="search">
            <input type="text" v-model="store.searchText" @keyup.enter="store.searchContent()"
                placeholder="Cerca un titolo">
            <button @click="store.searchContent()">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    </div>

</template>


<style scoped>
.header {
    background-color: darkcyan;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        color: ivory;
        font-size: 3rem;
        background-color: cadetblue;
        padding: 1rem 2rem;
        border-radius: 3rem;
    }

    .search {
        background-color: cadetblue;
        border-radius: 0.5rem;

        input,
        button {
            background-color: transparent;
            font-size: 1.5rem;
            padding: 0.5rem 1rem;
            border: none;
            color: ivory;
        }

        input {
            width: 500px;
            outline: 0;

            &:focus {
                border-bottom: 1px solid azure;
                border-radius: 0.5rem;
            }

            &::placeholder {
                color: gainsboro;
                font-size: 1.2rem;
            }
        }

        button {
            border: none;
            border-left: 3px solid darkcyan;
        }
    }
}
</style>