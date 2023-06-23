<template>
    
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
            <v-list-item
            :title="userName"
            :subtitle="userEmail"
            to="/user-profile"
            >
                <template v-slot:prepend>
                    <v-avatar>
                        <v-img
                            :src="userAvatar"
                            alt="John"
                        ></v-img>
                    </v-avatar>
                </template>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    
</template>

<script>
export default {
    name: 'my-header',
    data (){
        return {
            userEmail: '',
            userName: '',
            userAvatar: '@/images/default-avatar.png',
        }
    },
    mounted(){
        const userInfo = this.$store.state.auth.user
        if(userInfo.email){
            this.userEmail = userInfo.email
        }
        if(userInfo.photoURL){
            this.userAvatar = userInfo.photoURL
        }
        if(userInfo.displayName){
            this.userName = userInfo.displayName
        }

    }
}
</script>

<style>

</style>
