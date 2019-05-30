import { login } from '@/services/user';
import router from 'umi/router'
export default {
    namespace: 'login',

    state: {
        status: undefined,
    },

    effects: {
        *submit({ payload }, { call, put }) {
            const response = yield call(login, payload);
            alert("response:"+JSON.stringify(response));
            if(response.stateCode==200){
                router.push("/")
            }
        },
    },

        reducers: {
        registerHandle(state, { payload }) {
            return {
                ...state,
                status: payload.status,
            };
        },
    },
};
