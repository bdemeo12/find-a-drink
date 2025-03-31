import { Config } from '../config/config';
import axios, { AxiosInstance } from 'axios';

export class RequestService {
    private readonly httpClient: AxiosInstance

    constructor(
        private readonly config: Config,
    ) {
        this.httpClient = axios.create()
    }

    public async getBreweriesByState(state: string) {
        const getEndpoint = `${this.config.BASE_URL}?by_state=${state}&per_page=1`;

        try {
            return await this.httpClient.get(getEndpoint)
        } catch(error: unknown) {
            throw error
        }
    }
}