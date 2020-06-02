import axios, { AxiosInstance } from "axios";

export class Http {
  private client: AxiosInstance;

  constructor(params) {
    this.client = axios.create({ ...params });
    this.client.interceptors.request.use(
      (config) => {
        // const authToken = localStorage.getItem("jwt");
        // if (authToken) {
        //   config.headers.Authorization = authToken;
        // }
        return config;
      },
      (error) => Promise.reject(error)
    );
    this.client.interceptors.response.use(this.successHandler.bind(this), this.errorHandler);
  }

  public get(url) {
    return this.client.get(url);
  }

  public post(url, data) {
    return this.client.post(url, data);
  }

  public put(url, data) {
    return this.client.put(url, data);
  }

  public delete(url) {
    return this.client.delete(url);
  }

  public patch(url, data) {
    return this.client.patch(url, data);
  }

  private successHandler(response) {
    return response;
  }

  private errorHandler(error) {
    throw error;
  }
}
