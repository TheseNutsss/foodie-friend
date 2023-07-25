<template>
<v-sheet width="400" class="mx-auto pa-5" :elevation="15">
    <v-form v-model="isValid">
        <p class="text-h5 mb-2">Авторизация</p>
        <v-alert
            color="error"
            icon="$error"
            title="Ошибка"
            closable
            :text="errorText"
            v-model="isError"
        ></v-alert>
        <v-text-field
            v-model="email"
            label="email"
            :rules="emailRules"
            prepend-icon="mdi-email-outline"
            placeholder="johndoe@gmail.com"
            hint="Введите ваш email"
            clearable
        ></v-text-field>

        <v-text-field
            v-model="password"
            label="пароль"
            :rules="passwordRules"
            prepend-icon="mdi mdi-lock-outline"
            :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="isPasswordVisible ? 'text' : 'password'"
            hint="Введите ваш пароль"
            @click:append-inner="isPasswordVisible = !isPasswordVisible"
        ></v-text-field>

        <v-btn type="submit" block class="mt-2 bg-indigo-lighten-1" :disabled="!isValid" :loading="isLoading" @click.prevent="onSubmit">Авторизироваться</v-btn>
        <v-btn variant="text" block class="text-indigo-accent-3" @click="$router.push('/signUp')">Создать аккаунт</v-btn>
        <my-pop-up>Другие варианты авторизации</my-pop-up>
    </v-form>
</v-sheet>
</template>

<script>
export default {
    name: 'my-auth',
    data(){
        return {
            email: '',
            password: '',
            isValid: false,
            isLoading: false,
            errorText: '',
            isError: false,
            isPasswordVisible: false,
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
        }
    },
    methods: {
        onSubmit(){
            this.isLoading = true
            console.log('+')
            setTimeout(()=> (this.isLoading = false), 2000)
            this.$store.dispatch('signIn', {
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
    }
}
</script>

<style>

</style>
