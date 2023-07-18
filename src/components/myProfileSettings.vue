<template>
    <v-dialog
      persistent
      width="1024"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Редактирование данных</span>
        </v-card-title>
        <v-card-text>
          <v-container>
             <v-alert
            variant="tonal"
            :title="alertTitle"
            :text="alertText"
            :type="alertType"
            v-model="isAlert"
            >
            </v-alert>
            <v-col>
                <template v-for="(obj, index) in $store.state.auth.user.userData">
                    <template v-for="(value, key) in obj">
                    <v-row justify="start">
                        <v-col>
                            <v-sheet class="pa-2 overflow-y-auto">
                            {{key}}
                            </v-sheet>
                        </v-col>
                        <v-col>
                          <template v-if="key=='E-mail'">
                            <v-text-field
                            clearable
                            hide-details="auto"
                            disabled
                            :label="value"
                          ></v-text-field>
                          </template>
                          <template v-else>
                          <v-text-field
                            clearable
                            hide-details="auto"
                            :label="value"
                            @change="fieldChanged(key, $event.target.value)"
                            @click:clear="fieldChanged(key, $event.target.value)"
                          ></v-text-field>
                          </template>
                        </v-col>    
                        <template v-if="index !== $store.state.auth.user.userData.length - 1">
                            <v-divider></v-divider>
                        </template>
                    </v-row>
                    </template>
                </template>
            </v-col>

          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="bg-indigo-lighten-1"
            variant="text"
            @click="this.$emit('closeProfileSettings')"
          >
            Закрыть
          </v-btn>
          <v-btn
            class="bg-indigo-lighten-1"
            variant="text"
            @click="saveChanges"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
    name: 'my-profile-settings',
    data(){
      return {
        modifiedFields: [],
      }
    },
    computed: {
       ...mapState({
        isAlert: state => state.Alert.isAlert,
        alertTitle: state => state.Alert.alertTitle,
        alertText: state => state.Alert.alertText,
        alertType: state => state.Alert.alertType,
        }),
        originalFields() {
          // Возвращаем оригинальные значения полей из vuex или из другого источника данных
          return this.$store.state.auth.user.userData;
        }

    },
    methods: {
      ...mapActions(["DB_UPDATE_DATA", "SET_ALERT"]),
      async saveChanges() {
        // Сохраняем измененные поля в базе данных
        console.log(this.modifiedFields)
        if ((Object.keys(this.modifiedFields)).length > 0) {
          // Выполняем код для сохранения измененных полей в базе данных
          const newData = {
            email: JSON.parse(sessionStorage.getItem('auth')).email,
            userData: this.modifiedFields,
          };
          try{
            await this.DB_UPDATE_DATA(newData);
            this.SET_ALERT({isAlert: true, alertTitle: "Успех!", alertText: "Вы успешно изменили данные профиля", alertType: "success", timeout: 5000})
          } catch (error) {
            this.SET_ALERT({isAlert: true, alertTitle: "Ошибка!", alertText: "При изменение данных вознкикла ошибка", alertType: "error", timeout: 5000})
          }
          
        }
      },
      fieldChanged(key, value) {
        const field = this.originalFields.find((field) => field.hasOwnProperty(key))
        if(value === undefined){
          value = ""
        }
        if (value !== field[key]) {
          console.log(key, value)
          const index = this.modifiedFields.findIndex((obj)=> obj.hasOwnProperty(key))
          console.log(index)
          if(index !== -1){
            this.modifiedFields[index][key] = value
          } else {
            this.modifiedFields.push({[key]: value});
          }
        } else {
          console.log('delete')
          const objToRemove = this.modifiedFields.findIndex((obj)=> obj.hasOwnProperty(key))
          this.modifiedFields.splice(objToRemove, 1)
          console.log(this.modifiedFields)
        }
        console.log(this.modifiedFields)
      },
      },
}
</script>
