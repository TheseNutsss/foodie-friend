<template>
    <v-expand-transition>
        <div v-if="isReviewForm" class="ma-3">
            <v-form v-model="isValid">
                <v-card
                elevation="10"
                max-width="1000"
                >
                    <v-card-text>
                        <v-textarea prepend-icon="mdi-message-draw" label="Отзыв" v-model.trim="textInput" :rules="textInputRules" required></v-textarea>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions :class="{'ratingError': ratingError}" class="mx-2">
                        <p>Оцените место</p>
                        <v-spacer></v-spacer>
                        <div class="d-flex flex-column align-end">
                            <v-rating
                            v-model="rating"
                            active-color="#FFDA6A"
                            color="#7A7A7A"
                            half-increments
                            hover
                            size="20"
                            required
                            :rules="[v => v || 'Поставьте оценку']"
                        ></v-rating>
                            <span v-if="ratingError" class="errorHint">Поставьте оценку</span>
                        </div>
                    </v-card-actions>
                    <v-card-actions>
                       <v-spacer></v-spacer>
                            <v-btn class="bg-indigo-lighten-1" @click="close">Отмена</v-btn>
                            <v-btn class="bg-indigo-lighten-1" type="submit" @click.prevent="createReview">Оставить отзыв</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </div>
    </v-expand-transition>
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
export default {
    data(){
        return {
            rating: null,
            textInput: "",
            isValid: false,
            textInputRules: [
                v => !!v || 'Заполните это поле',
                v => (v && v.length >= 5) || 'Отзыв должен быть не менее 5 символов',
            ],
            ratingError: false,
        }
    },
    name: 'my-review-form',
    computed:{
        ...mapState({
            isReviewForm: state => state.RatingsAndReviews.isReviewForm,
            isLoading: state => state.RatingsAndReviews.isLoading,
            isReviews: state => state.RatingsAndReviews.isReviews,
            placeDetails: state => state.googleMaps.placeDetails,
        }),
        ...mapGetters([
            'getIsAlert',
            'getAlertTitle',
            'getAlertText',
            'getAlertType'
        ])
    },
    methods: {
        ...mapMutations(['SET_REVIEW_FORM_FLAG', 'SET_REVIEWS_FLAG']),
        ...mapActions(['DB_UPDATE_REVIEW', 'SET_ALERT', 'getPlaceDetails', 'DB_GET_PLACE', 'DB_CREATE_PLACE']),
        async validateForm () {
            this.isValid = true
            if(this.rating === null){
                this.isValid = false
                this.ratingError = true
            } else if (this.textInput.length < 5){
                this.isValid = false
            }
        },
        clearModels(){
            this.rating = null,
            this.textInput = ""
            this.ratingError = false
        },
        close(){
            this.clearModels()
            this.SET_REVIEW_FORM_FLAG()
        },
        async createReview(){
            await this.validateForm()
            if(this.isValid){
                const review = {
                    mode: 'add',
                    body: this.textInput,
                    rating: this.rating
                }
                try {
                    const place = await this.DB_GET_PLACE(this.placeDetails.place_id)
                    if(!place){
                        await this.DB_CREATE_PLACE(this.placeDetails)
                    }
                    await this.DB_UPDATE_REVIEW(review)
                    this.close()
                    this.SET_ALERT({isAlert: true, alertType: 'success', alertTitle: 'Успех!', alertText: 'Отзыв успешно добавлен!', timeout: 5000})
                    this.isReviews? this.SET_REVIEWS_FLAG() : ''
                } catch (error) {
                    this.SET_ALERT({isAlert: true, alertType: 'error', alertTitle: 'Ошибка!', alertText: 'При создании отзыва возникла ошибка, повторите попытку!', timeout: 5000})
                }
                
            }
        }
    },
    watch: {
        rating(){
            if(this.ratingError){
                this.ratingError = false
            }
        }
    }
}
</script>

<style>
.ratingError{
    border-bottom: 1px solid rgb(176, 0, 32);
    color: rgb(176, 0, 32);
}
.errorHint{
    color: rgb(176, 0, 32);
    font-size: 12px;
    line-height: 12px;
    word-break: break-word;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    hyphens: auto;
    transition-duration: 150ms;
    margin-top: 4px;
}
</style>