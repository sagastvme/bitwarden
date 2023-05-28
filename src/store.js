//index.js
import  {createStore} from "vuex";

const store = createStore({

    state() {
        return {
            loggedIn: false
     }
    },

    mutations:{

        setLoggedIn(state){
            state.loggedIn=true
        }
    },
    getters: {

        log(state){
            return state.loggedIn
        }
    }
});

export default store