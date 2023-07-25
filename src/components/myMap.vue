<template>
    <v-overlay
      v-model="isLoadingMap"
      class="align-center justify-center"
      contained
      persistent
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  <!-- <v-autocomplete
        :items="items"
        append-inner-icon="mdi-microphone"
        auto-select-first
        class="flex-full-width"
        density="comfortable"
        item-props
        menu-icon=""
        placeholder="Search Google or type a URL"
        prepend-inner-icon="mdi-magnify"
        rounded
        theme="light"
        variant="solo"
      ></v-autocomplete> -->
  <div ref="mapContainer" class="h-100">

  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader"
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data(){
    return {
      userMarkerMap: null,
    }
  },
  name: 'my-map',
  computed: {
    ...mapState({
      userLocation: state => state.googleMaps.userLocation,
      googleInstance: state => state.googleMaps.googleInstance,
      isLoadingMap: state => state.googleMaps.isLoadingMap,
      userMarker: state => state.googleMaps.userMarker,
      radius: state => state.Filters.radius,
      establishmentType: state => state.Filters.establishmentType,
      editUserLocationListener: state => state.googleMaps.editUserLocationListener,
      
    })
  },
  watch: {
    userLocation: {
      handler(newLocation) {
        if (newLocation !== undefined) {
          this.newMarker({ type: 'user', info: { location: newLocation } });
        }
      },
    },
  },
  methods: {
    ...mapActions(['getUserLocation', 'newMarker','searchPlace', 'newUserLocation', 'removePlaceMarkers', 'generateURL']),
    ...mapMutations(['SET_MAP', 'SET_GOOGLE', 'SET_MAP_LOADING', 'SET_EDIT_USER_LOCATION_LISTENER']),
    async initMap() {
      this.SET_MAP_LOADING()
      const loader = new Loader({
        apiKey: "AIzaSyAyKysGZvYN-Wy_yef7sGFf3qucqYrnOqQ",
        version: "weekly",
      });
      try {
        const google = await loader.load()
        const map = new google.maps.Map(this.$refs.mapContainer, {
          mapId: 'bc3c585d615f6a6',
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
        this.SET_GOOGLE(google)
        console.log('Засетил google instance', map)
        this.SET_MAP(map)
      } catch (error) {
        console.error('Ошибка загрузки Google Maps API:', error);
      }
      this.SET_MAP_LOADING()
    },
    async initialize(){
      if(this.editUserLocationListener){
        this.SET_EDIT_USER_LOCATION_LISTENER(null)
      }
      await this.initMap();
      await this.getUserLocation();
      const url = await this.generateURL({ radius: this.radius, type: this.establishmentType })
      await this.searchPlace(url)
      //this.newUserLocation()

    }
  },
  created() {
    this.initialize()
  },
}
</script>

<style>

</style>