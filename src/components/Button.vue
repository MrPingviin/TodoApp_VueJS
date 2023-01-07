<script lang="ts">
export default {
    props: [],
    data() {
        return {
        }
    },
    methods: {
        reRender() {
            this.$emit("changeHappened");
        }
    }
}

</script>

<template>
    <button @click="reRender">
        <slot />
    </button>
</template>

<style >
button {
    font-weight: bold;
    padding: 1rem;
    background-color: #41B883;
    border: none;
    border-radius: 0.25rem;
}

button:hover {
    cursor: pointer;
    filter: brightness(90%);
}
</style>