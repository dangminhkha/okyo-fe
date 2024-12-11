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
    listGuaranteeData: null,
    imageData: null,
    guaranteeListData: null,
    guaranreeDetailData: null,
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
    //lay danh sach bao hanh tu id san pham
    async getListGuarantee(url: string) {
      await baseService.fetch(API_URL + url).then((resp) => {
        this.listGuaranteeData = resp.data;
      });
      return this.listGuaranteeData;
    },
    //lay hinh anh tu
    async getImageFromId(url: string, params: any) {
      await baseService.fetchParams(API_URL + url, params).then((resp) => {
        this.imageData = resp.data;
      });
      return this.imageData;
    },
    //lay danh sach bao hanh
    async getListGuaranteeAdmin(url: string, params: any) {
      await baseService.add(API_URL + url, params).then((resp) => {
        this.listGuaranteeData = resp.data;
      });
      return this.listGuaranteeData;
    },
    //lay chi tiet hao hanh dua tren id
    async getGuaranteeDetail(url: string) {
      await baseService.fetch(API_URL + url).then((resp) => {
        this.guaranreeDetailData = resp.data;
      });
      return this.guaranreeDetailData;
    },
  },
  persist: true,
});
