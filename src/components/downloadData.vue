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
                    "Security-Key": "todoApp",
                    "Access-Control-Allow-Origin": "cors"

                }
            }
            fetch("https://api.npoint.io/325fcbc7d56363513c13", options).then(r => r.json()).then(data => {
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