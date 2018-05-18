
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Vue from 'vue'
import VueAxiosPlugin from 'vue-axios-plugin'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import addUser from './vue/user_add.vue'
import {faSpinner} from '@fortawesome/fontawesome-free-solid'
import fontawesome from '@fortawesome/fontawesome'
import home from './vue/home.vue'
import login from './vue/login.vue'
import logs from './vue/logs_page.vue'
import notification from 'vue-notification'
import settings from './vue/settings.vue'
import siteHeader from './vue/site_header.vue'
import usersEdit from './vue/users_edit.vue'
import usersManagement from './vue/management.vue'

fontawesome.library.add(faSpinner)

Vue.use(Vuex)

Vue.use(notification)

Vue.use(VueRouter)

Vue.use(VueAxiosPlugin)

const NotFoundComponent = {template: '<div>NotFoundComponent</div>'}

const store = new Vuex.Store({
  state: {
    id: window.localStorage.getItem('id'),
    Admin: window.localStorage.getItem('Admin'),
    token: window.localStorage.getItem('token'),
    lastLogin: window.localStorage.getItem('lastLogin'),
    username: window.localStorage.getItem('username'),
    users: [],
    log: []
  },
  mutations: {
    changeToken (state, value) {
        state.token = value
    },
    changeUsername(state, value) {
        state.username = value
    },
    changeId(state, value) {
        state.id = value
    },
    changeLogin(state, value) {
        state.lastLogin = value
    },
    changeAdmin(state, value) {
        state.Admin = value
    },
    changeUsers(state, value) {
        state.users = value
    },
    changeLog(state, value) {
        state.log = value
    },
    deleteUser(state, index) {
        state.users.splice(index, index)
    },
    clearState(state) {
        state.id = null
        state.Admin = 0
        state.token = null
        state.lastLogin = null
        state.username = null
        state.users = []
        state.log = []
    }
  },
  actions: {
    changeState({commit}, payload) {
        commit(payload.mutation, payload.res)
        window.localStorage.setItem(
            payload.var,
            payload.res
        )

        if (payload.checkAdmin) {
            if (payload.res) {
                window.localStorage.setItem('Admin', 1)
                commit('changeAdmin', 1)
            } else {
                window.localStorage.setItem('Admin', 0)
                commit('changeAdmin', 0)
            }
        }
    },
    deleteUsers({commit, state}, payload) {
        state.users.forEach(function(item, index) {
            if (item._id === payload.id) {
                commit(payload.mutation, index)
            }
        })
    }
  }
})

const routes = [
    {
        component: login,
        path: '/login'
    },
    {
        component: addUser,
        path: '/add'
    },
    {
        component: settings,
        path: '/settings'
    },
    {
        component: logs,
        path: '/logs'
    },
    {
        component: usersEdit,
        name: 'edit',
        path: '/edit/:id'
    },
    {
        component: home,
        path: '/'
    },
    {
        component: NotFoundComponent,
        path: '*'
    },
    {
        component: usersManagement,
        path: '/management'
    }
]

export default {}

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    components: {siteHeader},
    router,
    store
}).$mount('#common')
