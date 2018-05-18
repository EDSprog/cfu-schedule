<template>
    <div class="position">
        <title>User add</title>
        <div>
            <form class="form-size" action="javascript:void(0)">
                <div class="form-group">
                  <label for="userName">User name</label>
                  <input type="name" class="form-control" id="userName" placeholder="Enter new name" v-model='username'>
                </div>
                <div class="form-group">
                  <label for="fullName">Full name</label>
                  <input type="text" class="form-control" id="fullName" placeholder="Enter new full name" v-model='fullName'>
                </div>
                <div class="form-group">
                      <label for="inputPassword">Password</label>
                      <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model='password'>
                </div>
                <button type="submit" class="btn btn-dark" v-on:click='addUser()'>Add</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: null,
            password: null,
            fullName: null
        }
    },
    methods: {
        async addUser() {
            try {
                const response = await this.$axios.post(
                    '/api/users',
                    {
                        'username': this.username,
                        'password': this.password,
                        'full_name': this.fullName
                    },
                    {headers: {'X-Auth-Token': this.$store.state.token}}
                )

                this.$notify({
                    group: 'users-notify',
                    text: `username: ${this.username} <br/>
                           Full name: ${this.fullName} <br/>`,
                    title: 'Done!',
                    type: 'success'
                })

                this.$router.replace({
                    name: 'edit',
                    params: {id: response.data.data._id}
                })
            } catch (error) {
                this.$notify({
                    group: 'users-notify',
                    text: error.response.data.error_msg,
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
        margin: auto;
        width: 500px;
    }
</style>