import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosHeaders, AxiosRequestConfig, AxiosResponse, Method, RawAxiosRequestHeaders, ResponseType } from 'axios';

export type TApiResponse = { status: number; data: object };

@Injectable()
export class ApiService {
    private headers: RawAxiosRequestHeaders | AxiosHeaders;
    private responseType: ResponseType;
    private timeout: number; // ms
    private maxRedirects: number;

    constructor(private readonly httpService: HttpService) {}

    init(): this {
        this.headers = {
            Authorization: 'Bearer ' + '', // TODO : JWT token 추가 예정
            'Content-type': 'application/json'
        };
        this.responseType = 'json';
        this.timeout = 3000;
        this.maxRedirects = 0;
        return this;
    }

    async setConfig(addConfig): Promise<AxiosRequestConfig> {
        const initConfig: AxiosRequestConfig = {
            headers: this.headers,
            responseType: this.responseType,
            maxRedirects: this.maxRedirects,
            timeout: this.timeout
        };

        return { initConfig, ...addConfig }; // 초기 설정 값 변경 가능
    }

    async callApi(url: string, method: Method, data?: object): Promise<TApiResponse> {
        let addConfig: AxiosRequestConfig = {
            url: url,
            method: method as Method
        };

        if (data) addConfig = { ...addConfig, data: data };

        const config = await this.setConfig(addConfig);

        try {
            const res: AxiosResponse = await lastValueFrom(this.httpService.request(config));

            return {
                status: res.status,
                data: res.hasOwnProperty('data') && res.data.length ? res.data : {}
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
