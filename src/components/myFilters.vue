<template>
    <v-dialog
      v-model="isFiltersOpen"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="indigo-lighten-1"
          density="compact"
        >
          <v-btn
            icon
            dark
            @click="resetFilters"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Фильтры</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              prepend-icon="mdi-check-outline"
              variant="text"
              @click="applyFilters"
            >
              Применить
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
          <v-list-subheader>Радиус поиска</v-list-subheader>
          <v-list-item>
              <v-slider
                :value="inputRadius"
                :max="20000"
                :min="100"
                :step="100"
                label="Радиус в метрах"
                hide-details
                class="ma-4 pa-1"
                thumb-label
                @end="updateInputRadius"
                >
                <template v-slot:append>
                <v-text-field
                  v-model="inputRadius"
                  type="number"
                  style="width: 100px"
                  density="compact"
                  hide-details
                  variant="outlined"
                  :max="20000"
                  :min="100"
                  readonly
                ></v-text-field>
                </template>
      </v-slider>
          </v-list-item>
        </v-list>
         <v-list
          lines="two"
          subheader
        >
          <v-list-subheader>Вид заведения</v-list-subheader>
          <v-list-item>
              <v-radio-group
                v-model="establishmentType"
                column
              >
                <v-radio
                  label="Кафе"
                  value="cafe"
                ></v-radio>
                <v-radio
                  label="Ресторан"
                  value="restaurant"
                ></v-radio>
              </v-radio-group>
             <!--  <v-checkbox
                v-model="establishmentType"
                label="Кафе"
                value="cafe"
              ></v-checkbox>
              <v-checkbox
                v-model="establishmentType"
                label="Ресторан"
                value="restaurant"
              ></v-checkbox> -->
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex"
export default {
    name: 'my-filters',
    data(){
        return {
            inputRadius: 1000,
            establishmentType: "cafe",
            usedFilters: null
        }
    },
    computed: {
        ...mapState({
            isFiltersOpen: state => state.Filters.isFiltersOpen,
            radius: state => state.Filters.radius
        })
    },
    watch: {
        usedFilters(){
          this.SET_RADIUS(this.inputRadius)
          this.SET_ESTABLISHMENT_TYPE(this.establishmentType)
        }
    },
    methods: {
        ...mapMutations(['TOGGLE_FILTERS', 'SET_RADIUS', 'SET_ESTABLISHMENT_TYPE']),
        ...mapActions(['searchPlace', 'generateURL']),
        updateInputRadius(newValue) {
            this.inputRadius = newValue
        },
       async applyFilters(){
          this.usedFilters = {
            radius: this.inputRadius,
            placeType: this.establishmentType
          }
          const url = await this.generateURL({type: this.usedFilters.placeType, radius: this.usedFilters.radius})
          await this.searchPlace(url)
          this.TOGGLE_FILTERS()
          console.log(this.usedFilters)
        },
        resetFilters(){
          if(this.usedFilters !== null){
            this.inputRadius = this.usedFilters.radius
            this.establishmentType = this.usedFilters.placeType
          }
          
          this.TOGGLE_FILTERS()
        }
    }
}
</script>

<style>

</style>
