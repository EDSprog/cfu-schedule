<template>
    <div class="position">
        <title>Settings</title>
        <form class="form-size" action="javascript:void(0)">
            <div class="form-group">
                <label for="userName">User name</label>
                <input type="name" class="form-control" id="userName" placeholder="Enter new name" v-model='username'>
            </div>
            <div class="form-group">
                <label for="fullName">Full name</label>
                <input type="text" class="form-control" id="fullName" placeholder="Enter new full name" v-model='fullName'>
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="isAdmin" v-model='isAdmin'>
                <label class="form-check-label" for="isAdmin">Admin</label>
            </div>
            <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model='password'>
            </div>
            <div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="userStatus" id="active" value="active" v-model='status'>
                    <label class="form-check-label" for="active">Active</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="userStatus" id="blocked" value="blocked" v-model='status'>
                    <label class="form-check-label" for="blocked">Blocked</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="userStatus" id="notConfirmed" value="not_confirmed" v-model='status'>
                    <label class="form-check-label" for="notConfirmed">Not confirmed</label>
                </div>
            </div>
            <button type="submit" class="btn btn-dark" v-on:click='saveChanges()'>Save</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: null,
            password: null,
            fullName: null,
            isAdmin: false,
            status: null
        }
    },
    async mounted() {
        const URL = `/api/users/${this.$route.params.id}`

        const response = await this.$axios.get(
            URL,
            {headers: {'X-Auth-Token': this.$store.state.token}}
        )

        const user = response.data.data

        this.username = user.username
        this.password = user.password
        this.fullName = user.full_name
        this.isAdmin = user.is_admin
        this.status = user.status
    },
    methods: {
        async saveChanges() {
            try {
                const URL = `/api/users/${this.$route.params.id}`

                await this.$axios.post(
                    URL,
                    {
                        'username': this.username,
                        'password': this.password,
                        'full_name': this.fullName,
                        'status': this.status,
                        'is_admin': this.isAdmin
                    },
                    {headers: {'X-Auth-Token': this.$store.state.token}}
                )

                this.$notify({
                    group: 'users-notify',
                    text: `username: ${this.username} <br/>
                            Full name: ${this.fullName} <br/>
                            Status: ${this.status} <br/>
                            Admin: ${this.isAdmin}`,
                    title: 'Done!',
                    type: 'success'
                })
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
}
</script>

<style>
    .position {
        position: absolute;
        top: 20%;
        left: 37%;
        width: 500px;
    }
    .btn-dark {
        margin-top: 5px;
    }
</style>