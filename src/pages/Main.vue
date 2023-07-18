<template>
<my-place-info></my-place-info>
<my-header></my-header>
<v-main>
    <v-container class="h-75">
        <v-btn
        prepend-icon="mdi-filter-outline"
        class="bg-indigo-lighten-1"
        @click="TOGGLE_FILTERS"
        >
        Фильтры
        </v-btn>
        <p>Хотите изменить вашу локацию?<br>
        Для изменения локации необходимо включить режим редактирования
        </p>
        <v-btn
        prepend-icon="mdi-check-bold"
        class="bg-indigo-lighten-1"
        @click="newUserLocation"
        v-if="!editUserLocationListener"
        >
        Включить
        </v-btn>
        <v-btn
        prepend-icon="mdi-cancel"
        class="bg-indigo-lighten-1"
        @click="removeEditUserLocationListener"
        v-if="editUserLocationListener"
        >
        Выключить
        </v-btn>
    <my-map></my-map>
    </v-container>
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
