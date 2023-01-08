<script lang="ts">
export default {
    props: ["task", "priority", "id"],
    data() {
        return {

        }
    },
    methods: {
        deleteTodo(event: any) {
            this.$emit("deleteEvent", this.id, event);
        }
    }
}
</script>

<template>
    <div>
        <div class="Card">
            <div id="Title">
                <h1>Task</h1>
                <span>{{ task }}</span>
            </div>
            <div id="PrioData">
                <h2>Priority</h2>
                <span class="high-priority" v-if="priority == 'High'">{{ priority }}</span>
                <span class="normal-priority" v-if="priority == 'Normal'">{{ priority }}</span>
                <span class="low-priority" v-if="priority == 'Low'">{{ priority }}</span>
            </div>
            <div class="ButtonSection">
                <button class="Delete-Button" @click="deleteTodo">X</button>
            </div>
        </div>
    </div>
</template>

<style>
.Card {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 3.5rem;
    background-color: #41B883;
    gap: 0.5rem;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    word-break: break-word;
    width: 15vw;
    filter: drop-shadow(0.25rem 0.25rem 0.15rem black);
}

.high-priority {
    background-color: red;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: bold;
    color: white;
}

.normal-priority {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: bold;
    color: white;
}

.low-priority {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: bold;
    color: #41B883;
    background-color: white;
}

#Title,
#PrioData {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;

}

#Title span {
    text-align: center;
    color: white;
    word-break: break-word;
}

.ButtonSection {
    display: flex;
    position: absolute;
    gap: 0.5rem;
    top: -0.75rem;
    right: -1rem;
}

.ButtonSection button {
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    border: none;
}

.ButtonSection button:hover {
    cursor: pointer;
    filter: brightness(90%);
}

.Delete-Button {
    background-color: rgb(229, 38, 38);
    font-weight: bold;
    color: white;
    font-size: 1.2rem;
}

@media screen and (max-width: 1050px) {
    button {
        padding: 1rem;
        font-size: 1.25rem;
    }
}

@media screen and (max-width: 450px) {
    .Card {
        width: 50vw;
    }

}
</style>