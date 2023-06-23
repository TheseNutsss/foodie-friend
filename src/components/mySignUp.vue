<template>
<v-sheet width="400" class="mx-auto pa-5" :elevation="15">
    <v-form v-model="isValid">
        <p class="text-h5 mb-2">Регистрация</p>
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
        hint="Введите ваш пароль"
        clearable
        ></v-text-field>
        
        <v-text-field
        v-model="confirmPassword"
        label="подтвердите пароль"
        :rules="confirmPasswordRules"
        prepend-icon="mdi mdi-lock-outline"
        hint="Подтвердите ваш пароль"
        clearable
        ></v-text-field>

        <v-btn type="submit" block class="mt-2 bg-indigo-lighten-1" :disabled="!isValid" :loading="isloading" @click.prevent="onSubmit">Зарегистрироваться</v-btn>
        <v-btn variant="text" block class="text-indigo-accent-3" @click="$router.push('/auth')">Войти</v-btn>
        <my-pop-up>Другие варианты регистрации</my-pop-up>
    </v-form>
</v-sheet>
</template>

<script>
export default {
    name: 'my-sign-up',
    data(){
        return {
            email: '',
            password: '',
            confirmPassword: '',
            isValid: false,
            isloading: false,
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
                    if (value) return true

                    return 'Подтвердите пароль'
                },
                value => {
                    if(value == this.password) return true
                }
            ],
        }
    },
    methods: {
        onSubmit(){
            this.isLoading = true
            console.log('+')
            setTimeout(()=> (this.isLoading = false), 2000)
        }
    }
}
</script>

<style>

</style>
