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
            console.log('SET_USER')
            state.user = user
        },
        SET_AUTH(state, payload){
            state.isAuthed = payload
        }
    },
    actions: {
        async createUser(context, userObj){
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
                const user = userCredential.user
                const userObjInDB = {
                    name: '',
                    email: userObj.email,
                    password: userObj.password,
                    photo_URL: 'https://firebasestorage.googleapis.com/v0/b/foodie-friend-241bf.appspot.com/o/default-avatar.png?alt=media&token=192a3a4f-67b1-44fd-80b5-ba8dc884c2d3',
                    biography: '',
                    city_region: '',
                    culinary_interests: '',
                    social_networks: '',
                    ratings: '',
                    reviews: '',
                    phone_Number: '',
                    provider: 'googleRegistration',
                    location: {
                        latitude: null, 
                        longitude: null
                    },
                    userData: [
                        {'Имя': ''},
                        {'E-mail': userObj.email},
                        {'Биография': ''},
                        {'Город (регион)': ''},
                        {'Кулинарные интересы': ''},
                        {'Социальные сети': ''},
                        {'Номер телефона': ''},
                    ]
                }
                sessionStorage.setItem('auth', JSON.stringify({email: userObjInDB.email, auth: true}))
                context.dispatch('loading', {time: 2000, redirectTo: '/application'})
                await context.dispatch('DB_CREATE_USER', userObjInDB)
                context.dispatch('subscribeToUserChanges', userObj.email)
                context.commit('SET_AUTH', true)
                context.dispatch('SET_ALERT', {isAlert: true, alertTitle: "Успех!", alertText: "Вы успешно изменили данные профиля", alertType: "success", timeout: 5000})
            } catch (error) {
                console.log(error)
                context.dispatch('MATCH_FIREBASE_ERROR', error)
            }
        },
        async signIn(context, userObj){
            try {
                const userCredential = await signInWithEmailAndPassword(auth, userObj.email, userObj.password)
                const user = userCredential.user
                sessionStorage.setItem('auth', JSON.stringify({email: user.email, auth: true}))
                context.dispatch('loading', {time: 2000, redirectTo: '/application'})
                context.dispatch('subscribeToUserChanges', user.email)
                context.commit('SET_AUTH', true)
            } catch (error){
                console.log(error)
                context.dispatch('MATCH_FIREBASE_ERROR', error)
            }       
        },
        async signInWithGoogle(context){
            console.log('signInWithGoogle', router)
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                const userObjInDB = {
                    name: user.displayName,
                    email: user.email,
                    password: '',
                    photo_URL: user.photoURL,
                    biography: '',
                    city_region: '',
                    culinary_interests: '',
                    social_networks: '',
                    ratings: '',
                    reviews: '',
                    phone_Number: '',
                    provider: 'googleAuth',
                    location: {
                        latitude: null, 
                        longitude: null
                    },
                    userData: [
                        {'Имя': user.displayName},
                        {'E-mail': user.email},
                        {'Биография': ''},
                        {'Город (регион)': ''},
                        {'Кулинарные интересы': ''},
                        {'Социальные сети': ''},
                        {'Номер телефона': ''},
                    ]
                }
                sessionStorage.setItem(
                  'auth',
                  JSON.stringify({ email: userObjInDB.email, auth: true })
                );
                await context.dispatch('loading', { time: 2000, redirectTo: '/application' });
                await context.dispatch('DB_CREATE_USER', userObjInDB);
                context.dispatch('subscribeToUserChanges', user.email)
                context.commit('SET_AUTH', true);
              } catch (error) {
                console.log(error);
                context.dispatch('SET_ERROR_TIMEOUT', {error: error, time: 5000})
              }
        },
        signOut(context){
            signOut(auth)
                .then(() => {
                    sessionStorage.removeItem('auth')
                    context.dispatch('unsubscribeUser')
                    context.commit('SET_USER', '')
                    context.commit('SET_AUTH', false)
                    context.dispatch('loading', {time: 1000, redirectTo: '/auth'})
                }).catch((error) => {
                    console.log(error)
                });
        }    
    },
    modules: {

    }
}