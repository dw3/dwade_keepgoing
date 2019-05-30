import { regist } from '@/services/user';

export default {
    namespace: 'regist',

    state: {
        status: undefined,
    },

    effects: {
        *submit({ payload }, { call, put }) {
            console.log(JSON.stringify(payload));
            const response = yield call(regist, payload);
            // yield put({
            //     type: 'registerHandle',
            //     payload: response,
            // });
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
