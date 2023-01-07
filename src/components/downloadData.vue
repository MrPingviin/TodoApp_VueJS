<script lang="ts">
import { todoContainer } from "./dataContainer";
export default {
    name: "DownloadHandler",
    methods: {
        downloadData(){
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": "$2b$10$kwAPpRW53n.o7e0GutygO.YA3H8QpE8tB4.VofGOCmIZ09G/lWgLS",
                    "X-ACCESS-KEY": "$2b$10$CFodaMc5i9emUkCAn5UYXePYzrjMk7GBmfDjc88qZqOi3/k.zK37G"
                }
            }
          fetch("https://api.jsonbin.io/v3/b/63b94662dfc68e59d57bb597/latest", options).then(r => r.json()).then(data => {
                console.log("DATA ", data.record)
                data.record.map((item: any) => {
                    todoContainer.push(item)
                })
                console.log(todoContainer)
                this.$emit("downloadComplete")
            })
        }
    },
    mounted() {
       this.downloadData();
    }
}
</script>