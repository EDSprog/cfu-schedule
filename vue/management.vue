<template>
    <div>
        <title>Management</title>
        <div>
            <button type="button" class="buttonCastStyle btn btn-link" v-on:click='addUser()'>
                <font-awesome-icon icon="user-plus" size="2x"/>
            </button>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Username</th>
                        <th scope="col">Status</th>
                        <th scope="col">Full name</th>
                        <th scope="col">Last login</th>
                        <th scope="col">Created</th>
                        <th scope="col">Manage</th>
                    </tr>
                    <users-table
                        v-for="user in this.$store.state.users"
                        v-bind:key="user._id"
                        v-bind:fullName="user.full_name"
                        v-bind:id="user._id"
                        v-bind:login="user.last_login_at"
                        v-bind:created="user.created_at"
                        v-bind:status="user.status"
                        v-bind:username="user.username">
                    </users-table>
                </thead>
            </table>
        </div>
    </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import usersTable from './users_table.vue'

export default {
    components: {
        usersTable,
        FontAwesomeIcon
    },
    async beforeCreate() {
        try {
            const response = await this.$axios.get(
                '/api/users',
                {headers: {'X-Auth-Token': this.$store.state.token}}
            )

            this.$store.commit('changeUsers', response.data.data)
        } catch (error) {
            this.$notify({
                group: 'users-notify',
                text: error.response.data,
                title: 'Error',
                type: 'error'
            })
        }
    },
    methods: {
        addUser() {
            this.$router.push({path: '/add'})
        }
    }
}
</script>

<style>
    .buttonCastStyle {
        margin: 0 5px 5px 0;
        float: right;
    }
    .buttonCastStyle:hover {
        color: blue;
    }
</style>