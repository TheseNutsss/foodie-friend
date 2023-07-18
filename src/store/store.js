import { createStore } from "vuex"
import db from "@/store/Firebase/FirestoreDB"
import auth from "@/store/Firebase/Auth"
import OverlayLoading from "@/store/OverlayLoading/OverlayLoading"
import CustomErrors from "@/store/CustomErrors/CustomErrors"
import Alert from "@/store/Alert/Alert"
import googleMaps from "@/store/googleMaps/googleMaps"
import Filters from "@/store/Filters/Filters"
import RatingsAndReviews from "@/store/ReviewsAndRatings/ratingsAndReviews"
const store = createStore({
    state: {
        
    },
    mutations: {

    },
    actions: {

    },
    modules: {
        db,
        auth,
        OverlayLoading,
        CustomErrors,
        Alert,
        googleMaps,
        Filters,
        RatingsAndReviews
    }
})
export default store