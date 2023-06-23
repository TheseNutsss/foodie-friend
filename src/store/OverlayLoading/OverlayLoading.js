import router from "@/router/router"
export default {
    state: {
        isLoading: false
    },
    mutations: {
        SET_LOADING(state, value){
            state.isLoading = value
            console.log('SET_LOADING')
        }
    },
    actions: {
        loading(context, payload){
            console.log('loading')
            context.commit('SET_LOADING', true)
            setTimeout(()=> {
                context.commit('SET_LOADING', false)
                if(payload.redirectTo !== undefined){
                    router.push(payload.redirectTo)
                }
            }, payload.time)
        }
    },
    modules: {

    }
}