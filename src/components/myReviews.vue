<template>
    <v-expand-transition>
        <div v-if="isReviews">
            <div class="py-2 d-flex justify-center" v-if="isLoading">
            <v-progress-circular
            indeterminate>
            </v-progress-circular>
            </div>
            <div class="text-black py-2 d-flex justify-center" v-if="!reviews.length">
                Отзывов пока что нет
            </div>
            <v-expand-transition v-else>
            <v-list class="bg-transparent mx-5">
            <v-list-item
                v-for="review in reviews"
                :prepend-avatar="review.userData.userAvatar"
                :title="review.userData.authorName"
                :subtitle="review.body"
                max-width="1000"
                class="mb-2"        
            >
            <template v-slot:append>
                <div class="d-flex">
                    <span class="text-black text-caption d-flex justify-center align-center">
                        ({{ review.rating }})
                    </span>
               
                    <v-rating
                        v-model="review.rating"
                        readonly
                        half-increments
                        active-color="#FFDA6A"
                        color="#7A7A7A"
                        size="20"
                    >
                    </v-rating>
                </div>
            </template>
            </v-list-item>
                <v-btn
                    class="bg-indigo-lighten-1"
                    variant="text"
                    @click="loadReviews"
                    v-if="showLoadMoreButton"
                    :loading="isLoading"
                >
                Показать еще
                </v-btn>
            </v-list>
            </v-expand-transition>
        </div>
    </v-expand-transition>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
    name: 'my-reviews',
    data(){
        return {
            displayedReviewsCount: 0,
            totalReviewsCount: 0
        }
    },
    computed:{
        ...mapState({
            isReviews: state => state.RatingsAndReviews.isReviews,
            reviews: state => state.RatingsAndReviews.reviews,
            isLoading: state => state.RatingsAndReviews.isLoading,
            placeDetails: state => state.googleMaps.placeDetails,
        }),
        showLoadMoreButton() {
            return this.totalReviewsCount > this.displayedReviewsCount
        },
    },
    methods: {
        ...mapActions(['DB_GET_PLACE']),
        ...mapMutations(['SET_REVIEWS', 'SET_LOADING_REVIEWS_AND_RATINGS']),
        loadReviews(){
            this.SET_LOADING_REVIEWS_AND_RATINGS()
            this.DB_GET_PLACE(this.placeDetails.place_id)
            .then((data)=> {
                if(data.data().userReviews.length){
                    const newReviews = data.data().userReviews.slice(
                    this.displayedReviewsCount,
                    this.displayedReviewsCount +5
                    )
                    this.SET_REVIEWS([...this.reviews, ...newReviews])
                    this.displayedReviewsCount += newReviews.length
                    this.totalReviewsCount = data.data().userReviews.length
                }
            })
            this.SET_LOADING_REVIEWS_AND_RATINGS()
        }
    },
    watch: {
        isReviews(){
            console.log('флаг отзывов изменен')
            if(this.isReviews){
                this.displayedReviewsCount = 0
                this.totalReviewsCount = 0
                this.loadReviews()
            } else {
                this.SET_REVIEWS(null)
            }
        }
    },
    mounted(){
        setInterval(()=> {
            console.log(this.showLoadMoreButton, this.totalReviewsCount, this.displayedReviewsCount)
        },5000)
    }
}
</script>

<style>

</style>