<template>

    <v-parallax src="@/images/background.jpg" class="align-center h-screen">
         <v-card title="Хотите вкусно покушать?" color="rgb(255, 255, 255, 0.9)" elevation="20" text="Наше приложение предоставляет вам простой и удобный способ найти лучшие места поблизости. Независимо от того, нужен ли вам ресторан, кафе, бар или другое заведение, мы поможем вам выбрать именно то, что ищете. Используя нашу платформу, вы сможете легко найти заведения с отзывами и рейтингами от других пользователей. Мы также предоставляем информацию о расстоянии до выбранного места, чтобы вы могли быстро и удобно планировать свои встречи или поездки. Наслаждайтесь отличной едой, приятной атмосферой и отзывчивым сервисом – все это легко найти с помощью нашего приложения. Дайте нам возможность помочь вам открыть новые и захватывающие заведения, которые удовлетворят ваши предпочтения и ожидания. Начните свое путешествие по открытию уникальных мест уже сегодня!">
            <v-card-actions class="d-flex justify-end">
                <v-btn prepend-icon="mdi-map-search" elevation="8" class="pa-5 mb-3 d-flex justify-center align-center bg-white" @click="$router.push('/application')">Найти заведение</v-btn>
            </v-card-actions>
        </v-card>
        <v-card>
            <v-tabs
            v-model="tab"
            bg-color="indigo-lighten-1"
            centered
            stacked
            >
                <v-tab value="tab-1">
                    <v-icon>mdi-card-account-details-star</v-icon>
                    Отзывы и оценки
                </v-tab>

                <v-tab value="tab-2">
                    <v-icon>mdi-heart</v-icon>
                    Избранное
                </v-tab>

                <v-tab value="tab-3">
                    <v-icon>mdi-map-marker</v-icon>
                    Геолокация
                </v-tab>
            </v-tabs>

            <v-window v-model="tab">
                <v-window-item value="tab-1">
                    <v-card>
                    <v-card-text>Пользователи могут просматривать отзывы и оценки других пользователей о ресторанах и кафе, а также оставлять свои собственные отзывы и оценки.</v-card-text>
                    </v-card>
                </v-window-item>
                <v-window-item value="tab-2">
                    <v-card>
                    <v-card-text>Пользователи могут создавать свои собственные коллекции и списки любимых заведений или мест, которые они хотят посетить.</v-card-text>
                    </v-card>
                </v-window-item>
                <v-window-item value="tab-3">
                    <v-card>
                    <v-card-text>Приложение использует геолокацию пользователя, чтобы предложить ему рестораны и кафе, находящиеся поблизости.</v-card-text>
                    </v-card>
                </v-window-item>
            </v-window>
        </v-card>
    </v-parallax>
   
</template>

<script>
  export default {
    data: () => ({
      tab: null,
    }),
  }
</script>

<style>

</style>
