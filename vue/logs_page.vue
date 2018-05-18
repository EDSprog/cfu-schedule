<template>
    <div>
        <title>Logs</title>
        <div>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">IP</th>
                        <th scope="col">Last login</th>
                        <th scope="col">User agent</th>
                    </tr>
                </thead>
                <logs-table
                    v-for='log in this.$store.state.log.slice().reverse()'
                    v-bind:key="log._id"
                    v-bind:username="log.username"
                    v-bind:ip="log.ip"
                    v-bind:login="log.login"
                    v-bind:userAgent="log.userAgent">
                </logs-table>
            </table>
        </div>
    </div>
</template>

<script>
import logsTable from './logs_table.vue'

export default {
    components: {logsTable},
    async mounted() {
        try {
            const response = await this.$http.get(`/api/logs/${this.$store.state.username}`)

            this.$store.commit('changeLog', response.data.data)
        } catch (error) {
            this.$notify({
                group: 'users-notify',
                text: error.response.data,
                title: 'Error',
                type: 'error'
            })
        }
    }
}
</script>