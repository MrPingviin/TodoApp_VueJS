<script lang="ts">
import Button from "./components/Button.vue"
import downloadData from "./components/downloadData.vue";
import Card from "./components/Card.vue";
import { idGenerator } from "./components/dataContainer";
import { todoContainer } from "./components/dataContainer";
import { ref } from "vue"

export default {
  components: { Button, Card, downloadData, todoContainer },
  name: "App",
  data() {
    return {
      todoTask: ref(""),
      todoPriority: ref(""),
      loadTodos: ref(0),
      todoContainer: todoContainer,
      isLoading: true
    }
  },
  methods: {
    refresh() {
      this.loadTodos += 1;
      console.log(this.loadTodos);
      this.isLoading = false;
    },
    async addNewTodo() {
      if ((this.todoTask.length > 3) && (this.todoPriority != undefined) && (this.todoPriority != "")) {
        this.isLoading = true;
        const newTodo = { "id": idGenerator(), "task": `${this.todoTask}`, "priority": `${this.todoPriority}` };
        this.todoContainer.push(newTodo)
        console.log(this.todoContainer)
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Security-Key": "todoApp"
          },
          body: JSON.stringify(this.todoContainer)
        }
        return (
          await fetch("https://json.extendsclass.com/bin/a2dc17596b79", options), this.isLoading = false,
          this.todoTask = "",
          this.todoPriority = ""
        )
      }
    },
    filterContainer(id: any) {
      let newContainerToUpload: any[] = [];
      newContainerToUpload = [];

      this.todoContainer.filter(item => {
        if (item.id != id) {
          newContainerToUpload.push(item);
        }
      })

      this.todoContainer = newContainerToUpload;

      return newContainerToUpload;
    },
    async delTodo(id: any, event: any) {
      event.target.parentElement.parentElement.parentElement.remove()
      this.isLoading = true;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Security-Key": "todoApp"
        },
        body: JSON.stringify(this.filterContainer(id))
      }
      await fetch("https://json.extendsclass.com/bin/a2dc17596b79", options)
      return this.refresh(), this.isLoading = false;

    },
    scrollToTop() {
      window.location.href = "#Main"
    }
  },
}


</script>

<template>

  <div id="Main">
    <div id="toTopButtonContainer">
      <button id="toTopButton" @click="scrollToTop">
        <img src="./assets/toTop.svg" alt="Scroll to Top icon.">
      </button>
    </div>
    <div id="MainContent">
      <downloadData @downloadComplete="refresh" />

      <div id="todoAdderSection">
        <div id="todoAdderSection-Content">
          <div id="DataInputSection">
            <div id="TitleSection">
              <h1>Todo App made with </h1>
              <div>
                <img src="./assets/vue.svg" alt="VueJS logo.">
                <h1>ue</h1>
              </div>
            </div>

            <div id="FormSection">
              <input type="text" placeholder="Write the task here." v-model="todoTask">
              <div>
                <label for="priorityOptions" id="Priority-Title">Priority</label>
                <select name="priorityOptions" id="prioritySelector" v-model="todoPriority">
                  <option value="High">High</option>
                  <option value="Normal">Normal</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <Button @changeHappened="addNewTodo">Submit</Button>
            </div>
          </div>
        </div>
      </div>

      <div id="CardSection">
        <div id="CardSection-Content">
          <h1 id="emptyText" v-bind:value="loadTodos" v-if="todoContainer.length == 0 && !isLoading">Here you'll see
            your todo cards.
          </h1>
          <div id="CardSection-Cardholder" v-if="(todoContainer.length > 0) && !isLoading">
            <Card @deleteEvent="delTodo" v-for="item of todoContainer" v-bind:value="loadTodos" :task="item.task"
              :priority="item.priority" :id="item.id" />
          </div>
          <h2 v-if="isLoading" class="Loading">Loading..</h2>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
#Main {
  display: flex;
  justify-content: center;
  background-color: rgb(36, 36, 36);
  min-height: 100vh;

}

#MainContent {
  display: flex;
  flex-direction: column;
  width: 95%;
  background-color: rgb(150, 78, 78);
}

#TitleSection {
  display: flex;
  gap: 0.5rem;
}



#toTopButtonContainer {
  right: 5vw;
  bottom: 5vh;
  position: fixed;
  z-index: 999;
}

#toTopButton {
  border-radius: 50rem;
  border: none;
}

#toTopButton img {
  width: 2.5rem;
}

#CardSection {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  padding: 2rem;
}

#CardSection-Cardholder {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
}

#CardSection-Content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

}

#DataInputSection {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 1rem;
  padding: 3rem 0rem;
}

#todoAdderSection {
  background-color: rgb(40, 40, 40);
}

#todoAdderSection-Content,
#CardSection-Content,
#CardSection-Cardholder {
  opacity: 0;
  animation: popup 0.65s linear forwards;
}

@keyframes popup {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}


#TitleSection div {
  display: flex;
}

#FormSection {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 25%;

}

#FormSection input,
select {
  font-size: 1.5rem;
  outline: none;
  padding: 0.25rem;
  border-radius: 0.25rem;
  border: none;
}

#FormSection input:focus,
select:focus {
  outline: 5px solid #41B883;
}

#prioritySelector {
  display: flex;
  width: 100%;
}

#prioritySelector:hover {
  cursor: pointer;
}

#Priority-Title {
  font-weight: bold;
  font-size: 1.2rem;
}

.Loading {
  animation: LoadAnim 2s linear infinite;
}

@keyframes LoadAnim {
  0% {
    font-size: 2rem;
  }

  50% {
    font-size: 2.5em;
  }

  100% {
    font-size: 2rem;
  }
}

@media screen and (max-width: 1050px) {
  #FormSection {
    width: 50%;
  }
}

@media screen and (max-width: 450px) {

  #TitleSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 90%;
  }

  #emptyText {
    font-size: 1.15rem;
  }

  #FormSection {
    width: 90%;
  }
}
</style>


