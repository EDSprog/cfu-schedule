<template>
    <tr>
        <td>{{id}}</td>
        <td>{{username}}</td>
        <td>{{status}}</td>
        <td>{{fullName}}</td>
        <td>{{lastLogin}}</td>
        <td>{{Created}}</td>
        <td>
            <button type="button" class="btn btn-link edit" v-on:click='edit()'>
                <font-awesome-icon icon="edit"/>
            </button>
            <button :id="fullName" type="button" class="btn btn-link trash" data-toggle="modal" :data-target="'#'+id">
                <font-awesome-icon icon="trash-alt" />
            </button>
        </td>
        <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete user</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Дествительно ли Вы хотите удалить этот аккаунт? <br/> id: <b>{{id}}</b>,<br/> Username: <b>{{username}}</b><br/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click='deleteUser()'>Yes, delete</button>
                    </div>
                </div>
            </div>
        </div>
    </tr>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import moment from 'moment'
moment.locale('en')

export default {
    data() {
        return {moment}
    },
    components: {FontAwesomeIcon},
    methods: {
        async deleteUser() {
            try {
                const response = await this.$axios.delete(
                    `/api/users/${this.id}`,
                    {headers: {'X-Auth-Token': this.$store.state.token}}
                )

                this.$notify({
                    group: 'users-notify',
                    text: response.data,
                    title: 'Done!',
                    type: 'success'
                })

                this.$store.dispatch(
                    'deleteUsers',
                    {
                        mutation: 'deleteUser',
                        id: this.id
                    }
                )
            } catch (error) {
                this.$notify({
                    group: 'users-notify',
                    text: error.response.data,
                    title: 'Error',
                    type: 'error'
                })
            }
        },
        edit() {
            this.$router.push({
                name: 'edit',
                params: {id: this.id}
            })
        }
    },
    computed: {
        lastLogin: function() {
            return this.moment(this.login).fromNow()
        },
        Created: function() {
            return this.moment().calendar(this.created)
        }
    },
    props: [
        'fullName',
        'id',
        'login',
        'created',
        'status',
        'username'
    ]
}
</script>

<style>
    .trash:hover {
        color: Tomato;
    }
    .edit:hover {
        color: #FFFFA8;
    }
</style>