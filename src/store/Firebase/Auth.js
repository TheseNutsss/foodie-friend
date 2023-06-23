import {auth, provider} from "@/firebase/init"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut  } from "firebase/auth"
import router from "@/router/router"
export default {
    state: {
        user: '',
        isAuthed: false
    },
    mutations: {
        SET_USER(state, user){
            state.user = user
        },
        SET_AUTH(state, payload){
            console.log('setauth')
            state.isAuthed = payload
        }
    },
    actions: {
        createUser(context, userObj){
            createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
                .then((userCredential) => {
                    const user = userCredential.user
                    sessionStorage.setItem('auth', JSON.stringify(user))
                    context.commit('SET_USER', user)
                    context.commit('SET_AUTH', true)
                    router.push('/application')
                })
                .catch((error)=> {
                    console.log(error)
                })
        },
        signIn(context, userObj){
            signInWithEmailAndPassword(auth, userObj.email, userObj.password)
                .then((userCredential) => {
                    const user = userCredential.user
                    sessionStorage.setItem('auth', JSON.stringify(user))
                    context.commit('SET_USER', user)
                    context.commit('SET_AUTH', true)
                    context.dispatch('loading', {time: 2000, redirectTo: '/application'})
                })
                .catch((error)=> {
                    console.log(error)
                })
        },
        signInWithGoogle(context){
            console.log('signInWithGoogle', router)
            signInWithPopup(auth, provider)
                .then((result) => {
                    // The signed-in user info.
                    const user = result.user;
                    sessionStorage.setItem('auth', JSON.stringify(user))
                    context.commit('SET_USER', user)
                    context.commit('SET_AUTH', true)
                    context.dispatch('loading', {time: 2000, redirectTo: '/application'})
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error)
                });
        },
        signOut(context){
            signOut(auth)
                .then(() => {
                    sessionStorage.clear()
                    context.commit('SET_USER', '')
                    router.push('/auth')
                }).catch((error) => {
                    console.log(error)
                });
        }    
    },
    modules: {

    }
}