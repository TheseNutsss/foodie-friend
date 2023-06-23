<template>
<v-layout>
    <my-header>
    </my-header>
    <v-main>
        <v-card
            class=""
            elevation="4"
            height="250"
            rounded
            max-width="800"
            width="100%"
            title="Профиль"
        >
            <v-card-text>
                <v-container class="bg-surface-variant">
                    <template v-for="info in $store.state.auth.user">

                    <v-row justify="start" class="bg-red">
                        <v-col
                            cols="4"
                            class="bg-orange"
                        >
                            <v-sheet class="pa-2 ma-2">
                            Имя
                            </v-sheet>
                        </v-col>
                        <v-col
                            cols="4"
                            class="bg-orange"
                        >
                            <v-sheet class="pa-2 ma-2">
                            {{info.displayName}}
                            </v-sheet>
                        </v-col>
                         <v-col
                            cols="4"
                            class="bg-orange"
                        >
                            <v-sheet class="pa-2 ma-2">
                            E-mail
                            </v-sheet>
                        </v-col>
                        <v-col
                            cols="4"
                            class="bg-orange"
                        >
                            <v-sheet class="pa-2 ma-2">
                            {{info.email}}
                            </v-sheet>
                        </v-col>
                    </v-row>
                    
                    </template>
                </v-container>
            </v-card-text>
        </v-card>
    </v-main>
</v-layout>
</template>

<script>

export default {
    
}
</script>
