export default {
    state: {
        error: false
    },
    mutations: {
        SET_ERROR(state, error){
            state.error = error
        }
    },
    actions: {
        MATCH_FIREBASE_ERROR(context, errorCode){
            let errorText = ''
            switch (errorCode) {
                case 'auth/email-already-in-use':
                    errorText = "Пользователь с данным email уже зарегистрирован"
                    break;
                case 'auth/invalid-email':
                    errorText = "Вы ввели неверный email"
                    break;
                case 'auth/wrong-password':
                    errorText = "Вы ввели неверный пароль"
                    break;
                case 'auth/timeout':
                    errorText = "Время истекло"
                    break;
                case 'auth/user-not-found':
                    errorText = "Пользователь не найден"
                    break;
                case 'auth/user-not-found':
                    errorText = "Пользователь не найден"
                    break;
                default:
                    errorText = "Произошла ошибка, повторите попытку"  
            }
            context.dispatch('SET_ERROR_TIMEOUT', {error: errorText, time: 5000})
        },
        SET_ERROR_TIMEOUT(context, errorInfo){
            context.commit('SET_ERROR', errorInfo.error)
            setTimeout(()=>{
                context.commit('SET_ERROR', false)
            },errorInfo.time)
        }
    },
    modules: {

    }
}