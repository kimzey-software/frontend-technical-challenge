import { ZipcodeService } from "../../services/zipcode.service";
import type { CustomForm } from "../../models/zipcode-crud/CustomForm";
import type { ZipcodeResponse } from "../../models/zipcode-crud/zipcode-response";

interface ZipCodeList {
    page: number;
    perPage: number;
    data: ZipcodeResponse[] | null;
    total: number;
}

interface State {
    userId: number | null;
    zipcodeList: ZipCodeList | null;
}

const state = (): State => ({
    userId: sessionStorage.getItem('userId') ? parseInt(sessionStorage.getItem('userId')!) : null,
    zipcodeList: null
});

const getters = {
    getZipCodeList(state: State): ZipCodeList | null {
        return state.zipcodeList ?? null;
    },
    getUserId(state: State): number | null {
        return state.userId;
    }
};

const mutations = {
    setUserId(state: State, userId: number | null) {
        state.userId = userId
    },
    setZipcodeList(state: State, zipcodeList: ZipCodeList) {
        state.zipcodeList = zipcodeList;
    }
}

const actions = {
    async createUser({ commit }: any, name: string): Promise<void> {
        const zipCodeService = new ZipcodeService()
        const data = await zipCodeService.createUser({ name });
        if (data?.uuid != null) {
            sessionStorage.setItem('userId', data?.id.toString());
            commit('setUserId', data?.id)
        }
    },
    async fetchZipcodesByUserId({ state, commit }: any): Promise<void> {
        const zipCodeService = new ZipcodeService()
        const data = await zipCodeService.getZipCodeByUserId(state?.userId);
        if (data !== null) {
            commit('setZipcodeList', data)
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}