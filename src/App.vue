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
    }
  },
  methods: {
    refresh() {
      this.loadTodos += 1;
      console.log(this.loadTodos)
    },
    addNewTodo() {
     if ((this.todoTask.length > 3) && (this.todoPriority != undefined) && (this.todoPriority != "")) {
      const newTodo = { "id": idGenerator(), "task": `${this.todoTask}`, "priority": `${this.todoPriority}` };
      this.todoContainer.push(newTodo)
      console.log(this.todoContainer)
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": "$2b$10$kwAPpRW53n.o7e0GutygO.YA3H8QpE8tB4.VofGOCmIZ09G/lWgLS",
          "X-ACCESS-KEY": "$2b$10$CFodaMc5i9emUkCAn5UYXePYzrjMk7GBmfDjc88qZqOi3/k.zK37G"
        },
        body: JSON.stringify(this.todoContainer)
      }
      fetch("https://api.jsonbin.io/v3/b/63b94662dfc68e59d57bb597", options).then(r => r.json()).then(data => {
        console.log(todoContainer[0])
        console.log("Upload completed. New data was added: ", newTodo);
      })
      this.todoTask = "";
      this.todoPriority = "";
      return this.loadTodos += 1;
     }
    },
    delTodo(id: any) {

      const targetID = id;
      const newContainerToUpload: any[] = [];

      this.todoContainer.filter(item => {
        if (item.id != targetID) {
          newContainerToUpload.push(item);
        }
      })

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": "$2b$10$kwAPpRW53n.o7e0GutygO.YA3H8QpE8tB4.VofGOCmIZ09G/lWgLS",
          "X-ACCESS-KEY": "$2b$10$CFodaMc5i9emUkCAn5UYXePYzrjMk7GBmfDjc88qZqOi3/k.zK37G"
        },
        body: JSON.stringify(newContainerToUpload)
      }
    fetch("https://api.jsonbin.io/v3/b/63b94662dfc68e59d57bb597", options).then(r => r.json()).then(data => {

      })
      this.todoTask = "";
      this.todoPriority = "";
      console.log("Delete completed")
      return this.loadTodos += 1; 
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
          <h1 id="emptyText" v-bind:value="loadTodos" v-if="todoContainer.length == 0">Here you'll see your todo cards.</h1>
          <div id="CardSection-Cardholder" v-if="todoContainer.length > 0">
            <Card @deleteEvent="delTodo" v-for="item of todoContainer" v-bind:value="loadTodos" :task="item.task" :priority="item.priority" :id="item.id" />
          </div>
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

#todoAdderSection-Content, #CardSection-Content, #CardSection-Cardholder {
  opacity: 0;
  animation: popup 0.5s linear forwards;
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

#CardSection {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 2rem;
  justify-content: center;

}

#Priority-Title {
  font-weight: bold;
  font-size: 1.2rem;
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


