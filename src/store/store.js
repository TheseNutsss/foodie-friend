import { createStore } from "vuex"
import db from "@/store/Firebase/FirestoreDB"
import auth from "@/store/Firebase/Auth"
import OverlayLoading from "@/store/OverlayLoading/OverlayLoading"
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
        OverlayLoading
    }
})
export default store