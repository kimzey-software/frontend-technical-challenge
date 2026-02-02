import type { CustomForm } from "../models/zipcode-crud/CustomForm";
import { fetchDelete, fetchGet, fetchGetWithAuth, fetchPatch, fetchPost } from "../helpers/fetch";
import type { ZipCodeApiResponse } from "../models/zipcode-crud/ZipCode";
import type { User } from "../models/zipcode-crud/User";
import type { ZipcodeResponse } from "../models/zipcode-crud/zipcode-response";

export class ZipcodeService {
    private _baseUrl: string;
    constructor() {
        this._baseUrl = 'https://glaziersonline.com:3210/api-dev/zip-codes'; // From an environment variable in a real app
    }
    async createZipcode(data: CustomForm): Promise<any> {
        try {
            return await fetchPost(this._baseUrl, data);
        } catch (e: unknown) {
            console.log(e);
            return null;
        }
    }
    async createUser(data: { name: string }): Promise<User | null> {
        try {
            return await fetchPost(`${this._baseUrl}/user`, data);
        } catch (e: unknown) {
            console.log(e);
            return null;
        }
    }
    async updateZipcode(data: ZipcodeResponse): Promise<any> {
        try {
            const { id, ...updateData } = data;
            return await fetchPatch(`${this._baseUrl}/${id}`, updateData);
        } catch (e: unknown) {
            console.log(e);
            return null;
        }
    }
    async deleteZipcode(data: ZipcodeResponse): Promise<any> {
        try {
            return await fetchDelete(`${this._baseUrl}/${data.id}`);
        } catch (e: unknown) {
            console.log(e);
            return null;
        }
    }
    async getZipCodeByUserId(userId: number): Promise<CustomForm[] | null> {
        try {
            return await fetchGetWithAuth(`${this._baseUrl}/user/${userId}`);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    async getZipcodeInfo(zipcode: string): Promise<ZipCodeApiResponse | null> {
        try {
            return await fetchGet(`https://api.zippopotam.us/us/${zipcode}`);
        } catch (e: unknown) {
            console.log(e);
            return null;
        }
    }
}
