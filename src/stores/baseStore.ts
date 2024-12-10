import { defineStore } from "pinia";
import { baseService } from "../services/base-service";
const API_URL = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PREFIX;
export const useBaseStore = defineStore({
  id: "base",
  state: () => ({
    snack: {
      status: false,
      message: "sdd",
      color: "",
    },
    overlay: false,
    loginData: null,
    windowReSize: null,
    listProductData: null,
    productDetailData: null,
  }),
  actions: {
    overlayChange(status: boolean) {
      this.overlay = status;
    },
    snackChange(data: any) {
      this.snack = data;
    },
    //dang nhap
    async login(url: string, params: any) {
      await baseService.addAuthen(API_URL + url, params).then((resp) => {
        this.loginData = resp.data;
      });
      return this.loginData;
    },
    //lay danh sach san pham
    async getListProduct(url: string, params: any) {
      await baseService.add(API_URL + url, params).then((resp) => {
        this.listProductData = resp.data;
      });
      return this.listProductData;
    },
    //lay chi tiet san pham
    async detailsProduct(url: string) {
      await baseService.fetch(API_URL + url).then((resp) => {
        this.productDetailData = resp.data;
      });
      return this.productDetailData;
    },
  },
  persist: true,
});
