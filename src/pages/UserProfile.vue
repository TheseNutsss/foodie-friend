<template>
<my-header :showButton="false">
</my-header>
    <v-main class="bg">
        <v-card
            class="customCard bg-teal-lighten-5"
            elevation="4"
            rounded
            min-height="490"
            title="Профиль"
        >
            <v-card-text class="h-100 w-100">
                <v-row class="w-100 customRow d-flex">
                    <v-col
                    xs="12"
                    md="9"
                    class="table-column"
                    >
                      <v-overlay
          v-model="isLoading"
          contained
          class="align-center justify-center"
        >
          <v-progress-circular indeterminate></v-progress-circular>
                      </v-overlay>
                        <template v-for="(obj, index) in $store.state.auth.user.userData">
                            <template v-for="(value, key) in obj">
                            <v-row justify="start">
                                <v-col>
                                    <v-sheet class="pa-2 overflow-y-auto bg-teal-lighten-5">
                                    {{key}}
                                    </v-sheet>
                                </v-col>
                                <v-col>
                                    <v-sheet class="pa-2 overflow-y-auto bg-teal-lighten-5" >
                                    {{value}}
                                    </v-sheet>
                                </v-col>    
                                <template v-if="index !== $store.state.auth.user.userData.length - 1">
                                    <v-divider></v-divider>
                                </template>
                            </v-row>
                            </template>
                        </template>
                        <div class="d-flex justify-end mt-5">
                        <v-btn prepend-icon="mdi-file-edit" class="bg-indigo-lighten-1 d-flex d-md-none" @click="toggleProfileSettings"
                        >
                            <template v-slot:prepend>
                            <v-icon color="white"></v-icon>
                        </template>ИЗМЕНИТЬ ДАННЫЕ
                        </v-btn>
                        </div>
                    </v-col> 
                    <v-col xs="12"
                    md="3" class="d-flex flex-column d-md-flex avatar-column">
                        <div class="d-flex flex-column align-center h-100">
                            <v-avatar size="80" class="mb-3 elevation-4">
                                <v-img :lazy-src="$store.state.auth.user.photo_URL" :src="$store.state.auth.user.photo_URL" alt="Аватар пользователя" aspect-ratio="1/1" cover class="avatar-image">
                                    <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular
                                            color="grey-lighten-4"
                                            indeterminate
                                            ></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                            </v-avatar>
                            <v-btn class="bg-indigo-lighten-1" @click="toggleModal" prepend-icon="mdi-image-edit">Изменить аватар</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn prepend-icon="mdi-file-edit" class="bg-indigo-lighten-1 d-none d-md-flex" @click="toggleProfileSettings"
                            >
                                <template v-slot:prepend>
                                <v-icon color="white"></v-icon>
                            </template>ИЗМЕНИТЬ ДАННЫЕ
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-main>
<my-change-avatar v-model="isChangeAvatar" @closeModal="toggleModal"></my-change-avatar>
<my-profile-settings v-model="isProfileSettings" @closeProfileSettings="toggleProfileSettings"></my-profile-settings>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data (){
        return{
            isChangeAvatar: false,
            isProfileSettings: false,
            isLoading: false
        }
    },
    watch: {
        userData(){
            this.isLoading = !this.userData
        }
    },
    computed: {
        ...mapState({
            userData: state => state.auth.user.userData
        })
    },
    methods: {
        toggleModal(){
            this.isChangeAvatar = !this.isChangeAvatar
        },
        toggleProfileSettings(){
            this.isProfileSettings = !this.isProfileSettings
        }
    },
    mounted (){
        this.isLoading = !this.userData
    }
    
}
</script>
<style scoped>
@media screen and (max-width: 959px){
    .customCard{
        width: 100%;
    }
    .avatar-column{
        order: 0;
        justify-content: flex-end;
        align-items: flex-end;
    }
    .table-column{
        order: 1;
    }
    .customRow{
        flex-direction: column;
    }
}
@media screen and (min-width: 960px){
    .customCard{
        max-width: 960px;
    }
}
@media screen and (min-width: 1280px){
    .customPadding{
        padding-top: 0px;
    }
}
.bg{
    background-image: url('@/images/imageBg.jpg');
    background-size: cover;
}
</style>