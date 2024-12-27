import { defineStore } from "pinia";
import { baseService } from "../services/base-service";
const API_URL = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PREFIX;
import router from "../router";
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
    addProductData: null,
    addFileData: null,
    addGuaranteeToProductData: null,
    updateCustomerGuaranteeData: null,
    removeGuaranteeData: null,
    updateProductData: null,
    customerProductData: null,
    getDataGuaranteeCustomerData: null,
    cusGuaranteeDetailData: null,
    removeProductData: null,
    changePassData: null,
    getListTypeData: null,
    menuItemData: null,
  }),
  actions: {
    changeMenu(val: any) {
      this.menuItemData = val;
      router.push({path: `/danh-muc/${val}`})
    },
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
    //đổi mật khẩu
    async changePassAction(url: string, params: any) {
      await baseService.update(API_URL + url, params).then((resp) => {
        this.changePassData = resp.data;
      });
      return this.changePassData;
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
    //thêm sản phẩm
    async addProductAction(url: string, params: any) {
      await baseService.add(API_URL + url, params).then((resp) => {
        this.addProductData = resp.data;
      });
      return this.addProductData;
    },
    //thêm file, trả về id, lấy id để tạo sản phẩm
    async addFileAction(url: string, params: any) {
      await baseService.add(API_URL + url, params).then((resp) => {
        this.addFileData = resp.data;
      });
      return this.addFileData;
    },
    //thêm mã bao hanh cho san pham
    async addGuaranteeToProduct(url: string, params: any) {
      await baseService.add(API_URL + url, params).then((resp) => {
        this.addGuaranteeToProductData = resp.data;
      });
      return this.addGuaranteeToProductData;
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
    //cập nhật thông tin khách hàng cho BH
    async updateGuarantee(url: string, params: any) {
      await baseService.update(API_URL + url, params).then((resp) => {
        this.updateCustomerGuaranteeData = resp.data;
      });
      return this.updateCustomerGuaranteeData;
    },
    //Xóa bảo hành
    async removeGuaranteeAction(url: string) {
      await baseService.remove(API_URL + url).then((resp) => {
        this.removeGuaranteeData = resp.data;
      });
      return this.removeGuaranteeData;
    },
    //cập nhật thông tin sản phẩm
    async updateProductAction(url: string, params: any) {
      await baseService.add(API_URL + url, params).then((resp) => {
        this.updateProductData = resp.data;
      });
      return this.updateProductData;
    },
    //lay chi tiet san pham khách hàng
    async getCusProductDetail(url: string) {
      await baseService.fetch(API_URL + url).then((resp) => {
        this.customerProductData = resp.data;
      });
      return this.customerProductData;
    },
    //lấy danh sách bảo hành cho khách hàng
    async getListCusGuarantee(url: string, params: any) {
      await baseService.fetchParams(API_URL + url, params).then((resp) => {
        this.getDataGuaranteeCustomerData = resp.data;
      });
      return this.getDataGuaranteeCustomerData;
    },
    //lấy chi tiết BH của khách hàng
    async cusDetail(url: string) {
      await baseService.fetch(API_URL + url).then((resp) => {
        this.cusGuaranteeDetailData = resp.data;
      });
      return this.cusGuaranteeDetailData;
    },
    //xóa sản phẩm
    async removeProductAction(url: string) {
      await baseService.remove(API_URL + url).then((resp) => {
        this.removeProductData = resp.data;
      });
      return this.removeProductData;
    },
    //Lấy danh sách loại sản phẩm
    async getListProductType(url: string) {
      await baseService.fetch(API_URL + url).then((resp) => {
        this.getListTypeData = resp.data;
      });
      return this.getListTypeData;
    },
  },
  persist: true,
});
