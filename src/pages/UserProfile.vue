<template>
<v-layout>
    <my-header>
    </my-header>
    <v-main>
        <v-card
            class=""
            elevation="4"
            rounded
            max-width="800"
            width="100%"
            title="Профиль"
        >
            <v-card-text class="d-flex pa-5">
                <v-row class="w-100">
                    <v-col cols="9">
                        <template v-for="(obj, index) in $store.state.auth.user.userData">
                            <template v-for="(value, key) in obj">
                            <v-row justify="start">
                                <v-col>
                                    <v-sheet class="pa-2 overflow-y-auto">
                                    {{key}}
                                    </v-sheet>
                                </v-col>
                                <v-col>
                                    <v-sheet class="pa-2 overflow-y-auto" >
                                    {{value}}
                                    </v-sheet>
                                </v-col>    
                                <template v-if="index !== $store.state.auth.user.userData.length - 1">
                                    <v-divider></v-divider>
                                </template>
                            </v-row>
                            </template>
                        </template>

                    </v-col>
                    <v-col cols="3" class="d-flex align-center flex-column">
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
                        <v-btn class="bg-indigo-lighten-1" @click="toggleModal">Изменить аватар</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn prepend-icon="mdi-file-edit" class="bg-indigo-lighten-1 text-caption" @click="toggleProfileSettings"
                        >
                        <template v-slot:prepend>
        <v-icon color="white"></v-icon>
      </template>Редактировать данные</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-main>
    
</v-layout>
<my-change-avatar v-model="isChangeAvatar" @closeModal="toggleModal"></my-change-avatar>
<my-profile-settings v-model="isProfileSettings" @closeProfileSettings="toggleProfileSettings"></my-profile-settings>
</template>

<script>

export default {
  data (){
        return{
            isChangeAvatar: false,
            isProfileSettings: false,
        }
    },
    methods: {
        toggleModal(){
            this.isChangeAvatar = !this.isChangeAvatar
        },
        toggleProfileSettings(){
            this.isProfileSettings = !this.isProfileSettings
        }
    },
    
}
</script>
