<template>
<my-header></my-header>
<my-place-info></my-place-info>
<v-main> 
    <my-map></my-map>
</v-main>
<my-filters></my-filters>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex"
export default {
    computed: {
        ...mapState({
            editUserLocationListener: state => state.googleMaps.editUserLocationListener,
        })
    },
    methods: {
        ...mapMutations(['TOGGLE_FILTERS']),
        ...mapActions(['newUserLocation', 'removeEditUserLocationListener'])
    },
}
</script>
<style scoped>
@media screen and (min-width: 1280px){
    .customPadding{
        padding-top: 0px;
    }
}
</style>
