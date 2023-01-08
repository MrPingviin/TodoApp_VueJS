<script lang="ts">
import { todoContainer } from "./dataContainer";
export default {
    name: "DownloadHandler",
    methods: {
        downloadData() {
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Security-Key": "todoApp"
                }
            }
            fetch("https://json.extendsclass.com/bin/a2dc17596b79", options).then(r => r.json()).then(data => {
                console.log("DATA ", data)
                data.map((item: any) => {
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