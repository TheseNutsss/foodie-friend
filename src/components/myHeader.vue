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
                    :src="userPhoto"
                    :lazy-src="userPhoto"
                    aspect-ratio="1/1"
                    >
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height" >
                                <v-progress-circular
                                color="grey-lighten-4"
                                indeterminate
                                :size="20"
                                ></v-progress-circular>
                            </div>
                        </template>
                    </v-img>
                </v-avatar>
              </template>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-map-search-outline" title="Поиск заведения" value="search" to="/application"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <template v-slot:append>
        <v-divider></v-divider>
        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-logout" title="Выйти" value="Выйти" @click="$store.dispatch('signOut')"></v-list-item>
        </v-list>
        </template>
      </v-navigation-drawer>
    
</template>

<script>
export default {
    name: 'my-header',
    computed: {
        userInfo() {
            return this.$store.state.auth.user.userData || {}
        },
        userName(){
            const userInfo = Array.isArray(this.userInfo) ? this.userInfo : [this.userInfo]
            const field = userInfo.find((field) => field.hasOwnProperty('Имя'))
            return field ? field['Имя'] : ''
        },
        userPhoto(){
            return this.$store.state.auth.user.photo_URL
        },
        userEmail(){
            const userInfo = Array.isArray(this.userInfo) ? this.userInfo : [this.userInfo]
            const field = userInfo.find((field) => field.hasOwnProperty('E-mail'))
            return field ? field['E-mail'] : ''
        },
    },
}
</script>

<style>

</style>
