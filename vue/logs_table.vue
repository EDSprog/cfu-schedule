<template>
    <tr>
        <td>{{username}}</td>
        <td>{{ip}}</td>
        <td>{{lastLogin}}</td>
        <td>{{userAgent}}</td>
    </tr>
</template>

<script>
import moment from 'moment'
moment.locale('en')

export default {
    data() {
        return {moment}
    },
    computed: {
        lastLogin: function() {
            return moment(this.login).format('MMMM Do YYYY, h:mm:ss a')
        }
    },
    props: [
        'username',
        'ip',
        'login',
        'userAgent'
    ]
}
</script>