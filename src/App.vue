<template>
  <v-app>
    <my-loader></my-loader>
    <router-view></router-view>
</v-app>

</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState({
            user: state => state.auth.user
        }),
    },
    watch: {
        user() {
            // При изменении user запускаем подписку на изменения пользователя
            //console.log('запустили сабскрайб', JSON.parse(sessionStorage.getItem('auth')).email)
            //this.subscribeToUserChanges(JSON.parse(sessionStorage.getItem('auth')).email);
        },
    },
    methods: {
        ...mapActions(["subscribeToUserChanges"]), // Используем действие Vuex для подписки на изменения пользователя
    },
    created (){
        if(sessionStorage.getItem('auth')){
            this.subscribeToUserChanges(JSON.parse(sessionStorage.getItem('auth')).email)
            this.$store.commit('SET_AUTH', true)
        }
    }
}
</script>

<style>

</style>

