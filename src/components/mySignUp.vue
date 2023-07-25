<template>
<v-sheet width="400" class="mx-auto pa-5" :elevation="15">
    <v-form v-model="isValid">
        <p class="text-h5 mb-2">Регистрация</p>
        <v-alert
            color="error"
            icon="$error"
            title="Ошибка"
            closable
            :text="errorText"
            v-model="isError"
        ></v-alert>
        <v-alert
            variant="tonal"
            :title="alertTitle"
            :text="alertText"
            :type="alertType"
            v-model="isAlert"
        >
        </v-alert>
        <v-text-field
            v-model="email"
            label="email"
            :rules="emailRules"
            prepend-icon="mdi-email-outline"
            hint="Введите ваш email"
            clearable
        ></v-text-field>

        <v-text-field
            v-model="password"
            label="пароль"
            :rules="passwordRules"
            prepend-icon="mdi mdi-lock-outline"
            hint="Введите пароль"
            :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="isPasswordVisible ? 'text' : 'password'"
            @click:append-inner="isPasswordVisible = !isPasswordVisible"
        ></v-text-field>
        
        <v-text-field
            v-model="confirmPassword"
            label="подтвердите пароль"
            :rules="confirmPasswordRules"
            prepend-icon="mdi mdi-lock-outline"
            hint="Подтвердите пароль"
            :append-inner-icon="isRepeatPaswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="isRepeatPaswordVisible ? 'text' : 'password'"
            @click:append-inner="isRepeatPaswordVisible = !isRepeatPaswordVisible"
        ></v-text-field>

        <v-btn type="submit" block class="mt-2 bg-indigo-lighten-1" :disabled="!isValid || isLoading" :loading="isLoading" @click.prevent="onSubmit">Зарегистрироваться</v-btn>
        <v-btn variant="text" block class="text-indigo-accent-3" @click="$router.push('/auth')">Войти</v-btn>
        <my-pop-up>Другие варианты регистрации</my-pop-up>
    </v-form>
</v-sheet>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'my-sign-up',
    data(){
        return {
            email: '',
            password: '',
            confirmPassword: '',
            isValid: false,
            isLoading: false,
            errorText: '',
            isError: false,
            isPasswordVisible: false,
            isRepeatPaswordVisible: false,
            emailRules: [
                value => {
                    if (value) return true

                    return 'Введите email'
                },
                value => {
                    if (/.+@.+\..+/.test(value)) return true

                    return 'Введите корректный email'
                },
            ],
            passwordRules: [
                value => {
                if (value) return true

                return 'Введите пароль'
                },
                value => {
                if (value?.length >= 6 ) return true

                return 'Пароль должен состоять из 6 и более символов'
                },
            ],
            confirmPasswordRules: [
                value => {
                    if (value && value == this.password) return true

                    return 'Подтвердите пароль'
                }
            ],
        }
    },
    methods: {
        onSubmit(){
            this.isLoading = true
            console.log('+')
            setTimeout(()=> (this.isLoading = false), 2000)
            this.$store.dispatch('createUser', {
                email: this.email,
                password: this.password
            }) 
        }
    },
    watch: {
        '$store.state.CustomErrors.error'() {
            this.isError = this.$store.state.CustomErrors.error
            if(this.$store.state.CustomErrors.error){
                this.errorText = this.$store.state.CustomErrors.error
            } else {
                this.errorText = ''
            }
        }
    },
    computed: {
        ...mapState({
        isAlert: state => state.Alert.isAlert,
        alertTitle: state => state.Alert.alertTitle,
        alertText: state => state.Alert.alertText,
        alertType: state => state.Alert.alertType,
        }),
    }
}
</script>

<style>

</style>
