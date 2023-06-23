<template>
  <v-app>
    <my-loader></my-loader>
    <router-view></router-view>
</v-app>

</template>

<script>
export default {
    mounted (){
        if(sessionStorage.getItem('auth')){
            console.log('+')
            const user = JSON.parse(sessionStorage.getItem('auth'))
            this.$store.commit('SET_AUTH', true)
            this.$store.commit('SET_USER', user)
        }
    }
}
</script>

<style>

</style>

