<template>
    <div class="position" v-if = "isAuth()">
        <title>Login</title>
        <form action="javascript:void(0)" class = "form-size">
            <div class="form-group">
                <label for="userName">User name</label>
                <input type="text" class="form-control" id="userName" placeholder="Enter username" v-model='username'>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="pass" placeholder="Password" v-model='password'>
            </div>
            <button type="submit" class="btn btn-dark" v-on:click='doLogin'>Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
          password: null,
          username: null
        }
    },
    methods: {
        async doLogin() {
            try {
                const response = await this.$axios.post(
                    '/api/login',
                    {
                        'username': this.username,
                        'password': this.password
                    }
                )

                if (response.data.token) {
                    this.$store.dispatch(
                        'changeState',
                        {
                            res: response.data.token,
                            mutation: 'changeToken',
                            var: 'token',
                            checkAdmin: 0
                        }
                    )
                    this.$store.dispatch(
                        'changeState',
                        {
                            res: response.data.data._id,
                            mutation: 'changeId',
                            var: 'id',
                            checkAdmin: 0
                        }
                    )
                    this.$store.dispatch(
                        'changeState',
                        {
                            res: response.data.data.username,
                            mutation: 'changeUsername',
                            var: 'username',
                            checkAdmin: 0
                        }
                    )
                    this.$store.dispatch(
                        'changeState',
                        {
                            res: response.data.data.last_login_at,
                            mutation: 'changeLogin',
                            var: 'lastLogin',
                            checkAdmin: 0
                        }
                    )
                    this.$store.dispatch(
                        'changeState',
                        {
                            res: response.data.data.is_admin,
                            mutation: 'changeAdmin',
                            var: 'Admin',
                            checkAdmin: 1
                        }
                    )
                }

                this.$router.push({path: '/'})

            } catch (error) {
                this.$notify({
                    group: 'users-notify',
                    text: error.response.data.data,
                    title: 'Error',
                    type: 'error'
                })
            }
        },
        isAuth() {
            if (!this.$store.state.token) {
                return true
            }

            return this.$router.replace({path: '/'})
        }
    }
}
</script>

<style>
    .position {
        position: absolute;
        top: 20%;
        left: 35%;
        width: 500px;
    }
    .btn-dark {
        margin-top: 5px;
    }
</style>