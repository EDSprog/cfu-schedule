<template>
    <div v-if='isAuth()'>
        <title>Home</title>
        <ul class="nav justify-content-center">
            <li class="nav-item">
                <router-link class="nav-link" to="/management" style="outline: none;">Users management</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/settings" style="outline: none;">Settings</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/logs" style="outline: none;">Logs</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        isAuth() {
            if (this.$store.state.token) {
                return true
            }

            return this.$router.push({path: 'login'})
        }
    }
}
</script>