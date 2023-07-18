export default {
    state: {
        isFiltersOpen: false,
        radius: 1000,
        establishmentType: "cafe",
    },
    getters: {
        getRadius: state => state.radius,
        getEstablishmentType: state => state.establishmentType
    },
    mutations: {
        TOGGLE_FILTERS(state){
            state.isFiltersOpen = !state.isFiltersOpen
        },
        SET_RADIUS(state, radius){
            state.radius = radius
        },
        SET_ESTABLISHMENT_TYPE(state, types){
            state.establishmentType = types
        }
    },
    actions: {
        
    },
    modules: {

    }
}