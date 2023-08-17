import { markRaw } from "vue"
import axios from 'axios'
export default {
    state: {
        googleInstance: null,
        mapInstance: null,
        userLocation: null,
        userMarker: null,
        currentInfoWindow: null,
        isPlaceInfo: false,
        placeInfo: null,
        placeDetails: null,
        isLoadingPlace: false,
        isLoadingMap: false,
        placePhoto: [],
        placeMarkers: [],
        editUserLocationListener: null
    },
    mutations: {
        SET_GOOGLE(state, google){
            state.googleInstance = google
        },
        SET_MAP(state, map){
            state.mapInstance = map
        },
        SET_USER_LOCATION(state, location){
            state.userLocation = location
        },
        SET_INFO_WINDOW(state, infoWindow){
            state.currentInfoWindow = infoWindow
        },
        SET_PLACE_INFO(state, info){
            if(info === null){
                state.placeInfo = null
                state.isPlaceInfo = false
            } else {
                state.placeInfo = info
                state.isPlaceInfo = true
            }
        },
        SET_PLACE_LOADING(state){
            state.isLoadingPlace = !state.isLoadingPlace
        },
        SET_MAP_LOADING(state){
            state.isLoadingMap = !state.isLoadingMap
        },
        SET_PLACE_DETAILS(state, details){
            state.placeDetails = details
        },
        SET_PLACE_PHOTO(state, photoURL){
            if(photoURL){
                state.placePhoto.push(photoURL)
            } else {
                state.placePhoto = []
            }
        },
        SET_USER_MARKER(state, marker){
            state.userMarker = marker
        },
        SET_PLACE_MARKERS(state, marker){
            if(marker){
                state.placeMarkers.push(marker)
            } else {
                state.placeMarkers.length = 0
            }
        },
        SET_EDIT_USER_LOCATION_LISTENER(state, listener){
            state.editUserLocationListener = listener
        }
    },
    actions: {
        setLocationInDB(context, location){
            console.log('setLocationInDB')
            context.dispatch('DB_UPDATE_DATA', ({email: JSON.parse(sessionStorage.getItem('auth')).email, data: {
                location: location
            }}))
        },
        getUserLocation(context){
            console.log('getUserLocation')
            if (/Android/i.test(navigator.userAgent)) {
                navigator.geolocation.getCurrentPosition((position) => {
                    // Обработка полученных координат на Android
                    let userLatitude = position.coords.latitude;
                    let userLongitude = position.coords.longitude;
                    const userLocation = {
                        latitude: userLatitude,
                        longitude: userLongitude
                    }
                    context.dispatch('setLocationInDB', userLocation)
                    return new Promise((resolve, reject) => {
                        resolve(userLocation);
                    });
                });
            } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                navigator.geolocation.getCurrentPosition((position) => {
                    // Обработка полученных координат на iOS
                    let userLatitude = position.coords.latitude;
                    let userLongitude = position.coords.longitude;
                    const userLocation = {
                        latitude: userLatitude,
                        longitude: userLongitude
                    }
                    context.dispatch('setLocationInDB', userLocation)
                    return new Promise((resolve, reject) => {
                        resolve(userLocation);
                    });
                });
            } else {
                return new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition((position) => {
                      let userLatitude = position.coords.latitude;
                      let userLongitude = position.coords.longitude;
                      const userLocation = {
                        latitude: userLatitude,
                        longitude: userLongitude
                      };
                      context.dispatch('setLocationInDB', userLocation);
                      context.commit('SET_USER_LOCATION', userLocation)
                      resolve(userLocation);
                    }, (error) => {
                      reject(error);
                    });
                });
            }
        },
        async newMarker({state, dispatch, commit}, markerInfo){
            console.log('newMarker')
            if(markerInfo.type === 'user'){
                state.userMarker ? dispatch('removeMarker') : ''
                const markerIcon = {
                    path: state.googleInstance.maps.SymbolPath.CIRCLE,
                    fillColor: '#007EFF',  // Измените цвет на более голубой, например, #00ccff
                    fillOpacity: 1,
                    scale: 12,
                    strokeColor: 'white',
                    strokeWeight: 2,
                };
                const marker = new state.googleInstance.maps.Marker({
                    position: {
                        lat: markerInfo.info.location.latitude,
                        lng: markerInfo.info.location.longitude
                    },
                    map: state.mapInstance,
                    icon: markerIcon,
                    animation: state.googleInstance.maps.Animation.DROP
                });
                state.mapInstance.setCenter({
                    lat: markerInfo.info.location.latitude,
                    lng: markerInfo.info.location.longitude
                })
                marker.addListener("click", toggleBounce);
                function toggleBounce(){
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(state.googleInstance.maps.Animation.BOUNCE);
                    }
                }
                commit('SET_USER_MARKER', markRaw(marker))
            } else {
                const image = 'https://firebasestorage.googleapis.com/v0/b/foodie-friend-241bf.appspot.com/o/icon-pizza.png?alt=media&token=66e58cbb-b499-493b-94b8-855f98f612c2'
                const marker = new state.googleInstance.maps.Marker({
                    position: markerInfo.info.geometry.location,
                    map: state.mapInstance,
                    icon: image,
                    title: markerInfo.info.name,
                    animation: state.googleInstance.maps.Animation.DROP  // Добавляем анимацию падения маркера
                })
                
                commit('SET_PLACE_MARKERS', markRaw(marker))
                const infoWindow = new state.googleInstance.maps.InfoWindow({
                    content: `<h4 class="mb-1">${markerInfo.info.name}</h4>
                            <p class="mb-1">${markerInfo.info.vicinity}</p>
                            <button class='showMoreInfo rounded-sm bg-indigo-lighten-1 pa-2'>Показать больше информации</button>
                            `,
                    ariaLabel: markerInfo.info.name
                });
                marker.addListener("click", toggleBounce);
                marker.addListener("click", showWindow);
                infoWindow.addListener('closeclick', ()=>{
                    commit('SET_INFO_WINDOW', null)
                });

                function toggleBounce(){
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(state.googleInstance.maps.Animation.BOUNCE);
                    }
                }

                function showWindow(){
                    if (state.currentInfoWindow) {
                        state.currentInfoWindow.close();
                    }    
                    toggleBounce()
                    infoWindow.open({
                        anchor: marker,
                        map: state.mapInstance,
                    });
                    commit('SET_INFO_WINDOW', infoWindow)
                    infoWindow.addListener('domready', () => {
                        const button = document.querySelector('.showMoreInfo');
                        
                        // Присоединение слушателя события к кнопке
                        button.addEventListener('click', () => {
                            commit('SET_PLACE_INFO', markerInfo.info)
                        });
                    });
                }
            }
        },
        removeMarker({commit, state}){
            console.log('removeMarker')
            state.userMarker.setMap(null)
            commit('SET_USER_MARKER', null)
        },
        async getPhotos({context, commit}, photoReference){
            console.log('getPhotos', photoReference)
            const baseURL = 'http://localhost:3001/foodieFriend/photo'
            const url = new URL(baseURL)
            const API_KEY = process.env.VUE_APP_API_KEY
            url.searchParams.set('photo_reference', photoReference)
            url.searchParams.set('key', API_KEY)
            url.searchParams.set('maxwidth', 1920)
            url.searchParams.set('maxheight', 1080)
            console.log(url.href)
            try {
                const response = await axios.get(url.href)
                console.log("photos", response)
                commit('SET_PLACE_PHOTO', response)
            } catch (error) {
                console.log(error)
            }
        },
        async searchPlace({dispatch, state}, url){
            console.log('searchPlace: ', url)
            try {
                console.log(url.href)
                const response = await axios.get(url.href)
                console.log("Response:", response.data)
                const data = await response.data
                console.log('заведения', data)
                data.results.forEach(place => {
                    dispatch('newMarker', {type: "place", info: place})
                });
                if (data.next_page_token) {
                    // Если есть следующая страница результатов, делаем запрос с новым токеном
                    setTimeout(function () {
                        url.searchParams.set('pagetoken', data.next_page_token)
                        dispatch('searchPlace', url)
                    }, 2000); // Задержка между запросами, чтобы соответствовать ограничениям API
                }
            } catch (error) {
                console.log(error)
            }
        },
        generateURL({state,dispatch}, params){
            console.log('generateURL')
            state.placeMarkers.length ? dispatch('removePlaceMarkers') : ''
            const baseURL = 'http://localhost:3001/foodieFriend/nearbysearch/json'
            const API_KEY = process.env.VUE_APP_API_KEY
            const url = new URL(baseURL)
            url.searchParams.set('location', `${state.userLocation.latitude}, ${state.userLocation.longitude}`)
            url.searchParams.set('type', params.type)
            url.searchParams.set('radius', params.radius)
            url.searchParams.set('key', API_KEY)
            console.log(decodeURIComponent(url))
            return url
        },
        async getPlaceDetails({commit, state}){
            commit('SET_PLACE_LOADING')
            const baseURL = 'https://server-neon-tau.vercel.app/foodieFriend/details/json'
            const API_KEY = process.env.VUE_APP_API_KEY
            const url = new URL(baseURL)
            url.searchParams.set('key', API_KEY)
            url.searchParams.set('place_id', state.placeInfo.place_id)
            try {
                const response = await axios.get("/google-api/" + url.href)
                const data = await response.data.result
                commit('SET_PLACE_DETAILS', data)
            } catch (error) {
                console.log(error)
            }
            commit('SET_PLACE_LOADING')
        },
        async newUserLocation({state, commit, dispatch, rootState}){
            console.log('newUserLocation', state.mapInstance)
            const listener = state.mapInstance.addListener("click", async (event) => {
                commit('SET_USER_LOCATION', {latitude: event.latLng.lat(), longitude: event.latLng.lng()})
                await dispatch('setLocationInDB', {latitude: event.latLng.lat(), longitude: event.latLng.lng()});
                const url = await dispatch('generateURL', {type: rootState.Filters.establishmentType, radius: rootState.Filters.radius})
                await dispatch('searchPlace', url)
                state.googleInstance.maps.event.removeListener(listener)
                commit('SET_EDIT_USER_LOCATION_LISTENER', null)
            });
            console.log(listener)
            commit('SET_EDIT_USER_LOCATION_LISTENER', listener)
            console.log(state.editUserLocationListener)
        },
        removeEditUserLocationListener({state,commit}){
            state.googleInstance.maps.event.removeListener(state.editUserLocationListener)
            commit('SET_EDIT_USER_LOCATION_LISTENER', null)
            console.log(state.editUserLocationListener)
        },
        removePlaceMarkers({commit, state}){
            console.log('Action: removePlaceMarkers', state.placeMarkers)
            state.placeMarkers.forEach(marker => {
                marker.setMap(null)
            })
            commit('SET_PLACE_MARKERS', null)
            console.log(state.placeMarkers)
        }

    },
}