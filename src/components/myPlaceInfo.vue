<template>
    <v-dialog
    v-model="isPlaceInfoOn"
    transition="dialog-top-transition"
    >
        <v-card
        class="height"
        > <v-overlay
          v-model="isLoadingPlace"
          contained
          class="align-center justify-center"
        >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
        </v-overlay>
        <template v-if="placeDetails">
            <v-card-title class="bg-white">{{placeInfo.name}}</v-card-title>
            <v-card-subtitle>
                <v-icon
                icon="mdi-map-marker"
                size="18"
                color="black"
                class="me-1 pb-1"
                ></v-icon>{{placeInfo.vicinity}}
            </v-card-subtitle>
            <v-card-subtitle class="d-flex align-center">
                <span class="text-black text-caption d-flex justify-center align-center">
                    ({{ placeInfo.rating }})
                </span>
                <v-rating
                v-model="placeInfo.rating"
                readonly
                half-increments
                active-color="amber"
                size="20"
                ></v-rating>
                <span class="text-black text-caption d-flex justify-center align-center">
                    ({{ placeInfo.user_ratings_total }})
                </span>
            </v-card-subtitle>
            <v-card-text>
                <v-carousel show-arrows="hover" class="fill-height" v-if="placePhoto.length">
                    <v-carousel-item v-for="(slide, i) in placePhoto"
                        :src="slide"
                        contain
                        :key="i"
                    ></v-carousel-item>
                </v-carousel>
                <v-img src="https://firebasestorage.googleapis.com/v0/b/foodie-friend-241bf.appspot.com/o/no%20image.png?alt=media&token=8d8030ac-2fba-48be-a006-b3a65c8f07fe" contain v-else></v-img>
            </v-card-text>
            <v-card-actions>
                <v-btn
                @click="SET_REVIEWS_FLAG"
                >
                    {{isReviews ? 'Скрыть отзывы' : 'Показать отзывы'}}
                </v-btn>
                <v-btn
                @click="SET_REVIEW_FORM_FLAG"
                v-if="!isReviewForm"
                >Оставить отзыв и рейтинг</v-btn>
            </v-card-actions>
            <Transition name="slide-fade">
                <div v-if="getIsAlert">
                    <v-alert
                    variant="tonal"
                    :title="getAlertTitle"
                    :text="getAlertText"
                    :type="getAlertType"
                    ></v-alert>
                </div>
            </Transition>
                <my-review-form></my-review-form>
                <my-reviews></my-reviews>
        </template>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
    name: 'my-place-info',
    data(){
        return {
            isPlaceInfoOn: false,
        }
    },
    computed:{
        ...mapState({
            isPlaceInfo: state => state.googleMaps.isPlaceInfo,
            placeInfo: state => state.googleMaps.placeInfo,
            placeDetails: state => state.googleMaps.placeDetails,
            isLoadingPlace: state => state.googleMaps.isLoadingPlace,
            placePhoto: state => state.googleMaps.placePhoto,
            isReviews: state => state.RatingsAndReviews.isReviews,
            isReviewForm: state => state.RatingsAndReviews.isReviewForm,
        }),
        ...mapGetters([
            'getIsAlert',
            'getAlertTitle',
            'getAlertText',
            'getAlertType'
        ])
    },
    watch: {
        isPlaceInfo(){
            if(this.isPlaceInfo){
                this.isPlaceInfoOn = this.isPlaceInfo
                this.getPlaceDetails()
            }
        },
        placeDetails(){
            if(this.placeDetails && this.placeDetails.hasOwnProperty('photos')){
                console.log('placeDetails ищменилось')
                this.SET_PLACE_LOADING()
                this.DB_GET_PLACE(this.placeDetails.place_id)
                .then((data)=> {
                    if(data){
                        console.log(data)
                        //тут надо сделать так что бы данные подгружались не из гугла а из бд в data храниться нужное заведение, но нужно сделать .data()
                    } else {
                        console.log('no place')
                        this.DB_CREATE_PLACE(this.placeDetails)
                    }
                })
                this.placeDetails.photos.forEach(photoInfo => this.getPhotos(photoInfo.photo_reference))
                console.log(this.placePhoto)
                this.SET_PLACE_LOADING()
            }
        },
        isPlaceInfoOn(){
            if(!this.isPlaceInfoOn){
                this.SET_PLACE_INFO(null),
                this.SET_PLACE_DETAILS(null)
                this.SET_PLACE_PHOTO(null)
                this.SET_RATINGS_AND_REVIEWS_DEFAULT()
            }
        },
    },
    methods: {
        ...mapMutations(['SET_PLACE_INFO', 'SET_PLACE_LOADING', 'SET_PLACE_DETAILS', 'SET_PLACE_PHOTO', 'SET_REVIEW_FORM_FLAG', 'SET_REVIEWS_FLAG', 'SET_RATINGS_AND_REVIEWS_DEFAULT']),
        ...mapActions(['getPhotos', 'getPlaceDetails', 'DB_GET_PLACE', 'DB_CREATE_PLACE']),
        async ratingText() {
            if (this.placeInfo && this.placeInfo.user_ratings_total) {
                const count = this.placeInfo.user_ratings_total;
                const url = new URL("https://ws3.morpher.ru/russian/spell")
                url.searchParams.set('format', 'json')
                url.searchParams.set('n', count)
                url.searchParams.set('unit', 'голос')
                try {
                    const response = await fetch(url.href)
                    const data = await response.json()
                    if(data.code == 1){
                        console.log(count)
                        return count
                    } else {
                        return `${count} ${wordForm}`;
                    }
                } catch (error){
                    console.log(error)
                }
                
            }
            return '';
        }
    },
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.height {
    height: 90vh;
}
@media screen and (max-width: 860px) {
  .height{
    height: auto;
  }   
}
</style>