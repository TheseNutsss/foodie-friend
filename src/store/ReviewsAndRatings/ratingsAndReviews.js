export default {
    state: {
        ratings: [],
        reviews: [],
        isReviewForm: false,
        isReviews: false,
        isLoading: false,
    },
    mutations: {
        SET_RATINGS(state, ratings){
            if(ratings){
                state.ratings = ratings
            } else {
                state.ratings = []
            }
            
        },
        SET_REVIEWS(state, reviews){
            if(reviews){
                state.reviews = reviews
            } else {
                state.reviews = []
            }
            
        },
        SET_REVIEW_FORM_FLAG(state){
            state.isReviewForm = !state.isReviewForm
        },
        SET_REVIEWS_FLAG(state){
            state.isReviews = !state.isReviews
        },
        SET_LOADING_REVIEWS_AND_RATINGS(state){
            state.isLoading = !state.isLoading
        },
        SET_RATINGS_AND_REVIEWS_DEFAULT(state){
            state.reviews = []
            state.ratings = []
            state.isReviewForm = false,
            state.isReviews = false,
            state.isLoading = false
        }
    },
    actions: {
        
    },
    modules: {

    }
}