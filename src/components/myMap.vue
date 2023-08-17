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
    <v-overlay
      v-model="locationDisabled"
      class="align-center justify-center"
      contained
      persistent
    ><v-card>
      <v-alert
        v-model="locationDisabled"
        type="warning"
        variant="tonal"
        closable
        text='Вы запретили приложению использование вашей геолокации. Для отображения списка заведений вам нужно разрешить использование геолокации и обновить страницу либо в меню нажать "изменить локацию" и выбрать на карте место, в радиусе которого вы хотите найти заведение'
      ></v-alert>
      </v-card>
    </v-overlay>
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
      locationDisabled: false
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
        apiKey: process.env.VUE_APP_API_KEY,
        version: "weekly",
      });
      try {
        const google = await loader.load()
        const map = new google.maps.Map(this.$refs.mapContainer, {
          mapId: 'bc3c585d615f6a6',
          center: { lat: 49.149826, lng: 32.283336 },
          zoom: 8,
        });
        await this.SET_MAP(map)
        await this.SET_GOOGLE(google)
      } catch (error) {
      }
      this.SET_MAP_LOADING()
    },
    async initialize(){
      if(this.editUserLocationListener){
        this.SET_EDIT_USER_LOCATION_LISTENER(null)
      }
      await this.initMap();
      const userLocation = await this.getUserLocation();
      if(userLocation){
        const url = await this.generateURL({ radius: this.radius, type: this.establishmentType })
        await this.searchPlace(url)
      } else {
        this.locationDisabled = true
      }
    }
  },
  created() {
    this.initialize()
  },
}
</script>

<style>

</style>