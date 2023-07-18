<template>
     <v-dialog
        transition="dialog-bottom-transition"
        width="350"
        persistent
      >
        <v-card>
            <v-alert
            variant="tonal"
            :title="alertTitle"
            :text="alertText"
            :type="alertType"
            v-model="isAlert"
            >
            </v-alert>
            <v-card-title>Изменение аватара</v-card-title>
            <v-card-actions class="d-flex flex-column">
            <v-file-input
                label="Выберите изображение"
                variant="solo-filled"
                prepend-icon="mdi-camera"
                accept="image/*"
                @change="imageData"
                class="w-100"
                :disabled="isImage"
                ref="fileInput"
            ></v-file-input>
                <template v-if="imageURL">
                    <v-sheet elevation="3" class="pa-2 d-flex flex-column justify-center align-center">
                    <p>Предпросмотр</p>
                    <v-avatar size="60">
                        <v-img
                        :src="imageURL"
                        :lazy-src="imageURL"
                        alt="Выбранное изображение"
                        contain
                        aspect-ratio="1/1"
                        >
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
                    </v-sheet>
                </template>
            </v-card-actions>
            <v-card-actions class="d-flex justify-center">
                <template v-if="imageURL">
                    <v-btn class="bg-indigo-lighten-1" @click="resetImage">Отмена</v-btn>
                    <v-btn class="bg-indigo-lighten-1" @click="$store.dispatch('DB_UPLOAD_AVATAR', getImage()); resetImage()">Подтвердить</v-btn>
                </template>
                <template v-else>
                    <v-btn class="bg-indigo-lighten-1" @click="this.$emit('closeModal')">Закрыть</v-btn>
                </template>
            </v-card-actions>
        <v-overlay v-model="isLoading" contained class="d-flex justify-center align-center" persistent>
            <v-progress-circular color="primary" indeterminate></v-progress-circular>
        </v-overlay>
      </v-card>
      </v-dialog>
</template>
<script>
import { mapState } from "vuex";

export default {
    name: 'my-change-avatar',
    data (){
        return {
            imageURL: false,
            isImage: false,
            isLoading: false,
        }
    },
    methods: {
        getImage(){
            const selectedFile = this.$refs.fileInput.files[0]
            return selectedFile
        },
        imageData(event){
            this.isLoading = true
            const reader = new FileReader()
            reader.onload = (e) => {
                this.imageURL =  e.target.result;
                this.isImage = true
            }
            reader.readAsDataURL(this.getImage())
            this.isLoading = false
        },
        resetImage(){
            this.isImage = false
            this.imageURL = false
            const fileInput = this.$refs.fileInput;
            fileInput.reset()
            console.log(fileInput.value)
        },
    },
    computed: {
        ...mapState({
        isAlert: state => state.Alert.isAlert,
        alertTitle: state => state.Alert.alertTitle,
        alertText: state => state.Alert.alertText,
        alertType: state => state.Alert.alertType,
        })
    },

}
</script>
