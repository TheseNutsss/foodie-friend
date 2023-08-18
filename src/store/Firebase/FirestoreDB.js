import { db, storage} from "@/firebase/init"
import { doc, setDoc, getDoc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage"
export default {
    state: {
        dbUserListener: null
    },
    mutations: {

    },
    actions: {
        async DB_CREATE_USER(context, userData){
            //console.log('DB_CREATE_USER')
            try{
                const docSnap = await getDoc(doc(db, 'Users', userData.email))
                if (!docSnap.exists()) {
                    setDoc(doc(db, 'Users', userData.email), userData)
                }
            } catch (error){
                console.error('Ошибка cоздания пользователя:', error);
            }
        },
        async DB_GET_USER(context, userEmail){
            //console.log('DB_GET_USER')
            try {
                const docSnap = await getDoc(doc(db, 'Users', userEmail))
                if (docSnap.exists()) {
                    context.commit('SET_USER', docSnap.data())
                }
            } catch (error) {
                console.error('Ошибка получения пользователя из БД:', error);
            }
        },
        async DB_UPLOAD_AVATAR(context, file){
            context.commit('SET_LOADING', true)
            //console.log(file)
            const uniqueFileName = `${Date.now()}_${file.name}`
            const storageRef = ref(storage, `users-avatars/${uniqueFileName}`);
            try {
                // Загрузите файл в хранилище
                const snapshot = await uploadBytes(storageRef, file)
                console.log('Файл успешно загружен:', snapshot.metadata.name);
                const imageURL = await getDownloadURL(snapshot.ref)
                await context.dispatch('DB_DELETE_AVATAR', context.rootState.auth.user.photo_URL)
                await context.dispatch('DB_UPDATE_DATA', {email: context.rootState.auth.user.email, data: {photo_URL: imageURL}})
                context.dispatch('SET_ALERT', {isAlert: true, alertTitle: "Успех!", alertText: "Вы успешно изменили изображение профиля", alertType: "success", timeout: 5000})
              } catch (error) {
                console.error('Ошибка загрузки файла:', error);
                context.dispatch('SET_ALERT', {isAlert: true, alertTitle: "Ошибка!", alertText: "Возникла ошибка при загрузке изображения", alertType: "error", timeout: 5000})
              }
              context.commit('SET_LOADING', false)
        },
        async DB_DELETE_AVATAR(context, photo_URL){
            const desertRef = ref(storage, photo_URL);
            try {
                await deleteObject(desertRef)
            } catch (error) {
                console.log(error)
            }
        },
        async DB_UPDATE_DATA(context, newData){
            //console.log('DB_UPDATE_DATA')
            const docRef = doc(db, 'Users', newData.email)
            try {
                if(newData.hasOwnProperty('userData')){
                    /// Получаем текущий документ из БД
                    const docSnap = await getDoc(docRef);
                    const userData = docSnap.data().userData;
                    // Обновляем только выбранные поля
                    for (const field of newData.userData) {
                    const key = Object.keys(field)[0];
                    const value = field[key];
                    console.log(key, value)
                    const fieldToUpdate = userData.find((obj)=> obj.hasOwnProperty(key))
                    fieldToUpdate[key] = value;
                    }
                    // Обновляем поле userData в документе
                    await updateDoc(docRef, { userData });
                } else {
                    const docSnap = await updateDoc(docRef, newData.data)
                }
            } catch (error){
                console.error('Ошибка обновления данных:', error)
                throw error
            }
        },
        subscribeToUserChanges({commit, state}, userEmail) {
            console.log("subscribeToUserChanges")
            // Создаем подписку на изменения документа пользователя
            const subscribe = onSnapshot(doc(db, "Users", userEmail), (doc) => {
                // Обновляем данные пользователя в хранилище Vuex
                const user = doc.data();
                commit('SET_USER', user)
                state.dbUserListener = subscribe
            });
        },
        unsubscribeUser({state}){
            if(state.dbUserListener){
                state.dbUserListener()
                state.dbUserListener = null
            }
            //console.log('unsubscribed')
        },
        async DB_GET_PLACE({state}, placeId){
            //console.log('DB_GET_PLACE', placeId)
            try {
                const docSnap = await getDoc(doc(db, 'Places', placeId))
                if (docSnap.exists()) {
                    return docSnap
                } else {
                    return false
                }
            } catch (error) {
                //console.log('Ошибка получения места из БД:', error);
            }
        },
        async DB_CREATE_PLACE({state}, placeData){
            //console.log('DB_CREATE_PLACE', placeData)
            placeData.userRatings = []
            placeData.userReviews = []
            try{
                setDoc(doc(db, 'Places', placeData.place_id), placeData)
            } catch (error){
                console.log('Ошибка cоздания места:', error);
            }
        },
        async DB_UPDATE_REVIEW({state, rootState}, reviewInfo){
            //console.log('DB_UPDATE_REVIEW', reviewInfo)
            if(reviewInfo.mode === 'add'){
                const name = (rootState.auth.user.userData.find((data)=> Object.keys(data).join('')=="Имя"))['Имя']
                console.log(name)
                const review = {
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    body: reviewInfo.body,
                    rating: reviewInfo.rating,
                    userData: {
                        authorName: name || 'Аноним',
                        userAvatar: rootState.auth.user.photo_URL
                    },
                }
                try{
                    await updateDoc(doc(db, 'Places', rootState.googleMaps.placeInfo.place_id), { userReviews: arrayUnion(review) });
                    return Promise.resolve()
                } catch (error){
                    console.log('Ошибка добавления отзыва:', error);
                    return Promise.reject(error);
                }
            }
        }
    },
    modules: {

    }
}