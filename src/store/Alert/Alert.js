export default {
    state: {
        isAlert: false,
        alertTitle: null,
        alertText: null,
        alertType: null
    },
    mutations: {
        SET_ALERT_STATE(state, alertInfo){
            state.isAlert = alertInfo.isAlert
            state.alertText = alertInfo.alertText
            state.alertType = alertInfo.alertType
            state.alertTitle = alertInfo.alertTitle
        }
    },
    actions: {
        SET_ALERT(context, alertInfo){
            context.commit('SET_ALERT_STATE', alertInfo)
            setTimeout(() => {
                context.commit('SET_ALERT_STATE', {isAlert: false, alertType: null, alertTitle: null, alertText: null})
            }, alertInfo.timeout)
        }
    },
    getters: {
        getIsAlert(state) {
          return state.isAlert;
        },
        getAlertTitle(state) {
          return state.alertTitle;
        },
        getAlertText(state) {
          return state.alertText;
        },
        getAlertType(state) {
          return state.alertType;
        }
      },
    modules: {

    }
}