<template>
    <header v-if="isAuth" class="card-header">
        <div class="logo">
            <router-link to="/" style="text-decoration: none; color: black; outline: none; width: 100px;">
                My SPA
            </router-link>
        </div>
        <div class="loginInfo">
            <small>Last login: {{ lastLogin }}</small>
        </div>
        <div class="logout_icon">
            <button type="submit" class="btn btn-link out" v-on:click='logOut()'>
                <font-awesome-icon icon="sign-out-alt"/>
            </button>
        </div>
        <div class="user">
            <font-awesome-icon icon="user" style="margin-right: 10px"/>{{this.$store.state.username}}
        </div>
    </header>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import moment from 'moment'
moment.locale('ru')

export default {
    data() {
        return {moment}
    },
    components: {FontAwesomeIcon},
    methods: {
        logOut() {
            window.localStorage.clear()
            this.$store.commit('clearState')
            this.$router.push({path: '/login'})
        }
    },
    computed: {
        isAuth() {
            return this.$store.state.token
        },
        lastLogin: function() {
            return moment(this.$store.state.lastLogin).fromNow()
        }
    }
}
</script>

<style>
    .btn-link{
        color: black;
    }
    .out:hover {
        color: red;
    }
    .logout_icon {
        position: absolute;
        right: 10px;
        top: 4px;
    }
    .loginInfo {
        position: absolute;
        text-align: center;
        width: 100%;
        top: 20px;
        left: 0;
    }
    .card-header {
        height: 45px;
    }
    .logo {
        position: absolute;
        text-align: left;
        font-size: 15pt;
        width: 100px;
        top: 6px;
    }
    .user {
        display: inline-block;
        position: absolute;
        border-right: 1px solid;
        right: 50px;
        top: 10px;
        padding: 0px 10px;
    }
</style>