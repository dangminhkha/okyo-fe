<template>
  <v-dialog v-model="dialogDetail" max-width="500">
    <div class="bg-white py-3 px-5 rounded-lg">
      <div class="text-right" @click="dialogDetail = false">
        <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
      </div>
      <div class="grid gap-3">
        <div class="text-center text-xl font-bold">Chi tiết bảo hành</div>

        <div class="">
          <div class="flex justify-between my-1">
            <div>Tên SP</div>
            <div>{{ dataSelected.product.name }}</div>
          </div>
          <div class="flex justify-between my-1">
            <div>Mô tả</div>
            <div>{{ dataSelected.product.description }}</div>
          </div>
          <div class="flex justify-between my-1">
            <div>Thời hạn BH</div>
            <div>{{ dataSelected.product.monthGuarantee }} tháng</div>
          </div>
        </div>
        <div class="my-1 font-bold">Cập nhật thông tin khách hàng</div>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="submitEdit"
          class="grid gap-3"
        >
          <v-text-field
            label="Tên khách hàng"
            variant="outlined"
            v-model="customerName"
            :rules="rulesRequired"
          >
          </v-text-field>
          <v-text-field
            label="Sđt khách hàng"
            variant="outlined"
            v-model="customerPhone"
            :rules="rulesRequired"
          >
          </v-text-field>
          <v-text-field
            label="Email khách hàng"
            variant="outlined"
            v-model="customerEmail"
            :rules="customerEmail ? rulesEmail : []"
          >
          </v-text-field>
          <v-date-input
            prepend-icon=""
            label="Ngày bắt đầu"
            variant="outlined"
            density="comfortable"
            v-model="fromDate"
            :min="todayDate"
            class="p-date"
            :cancel-text="'Đóng'"
            :hide-actions="true"
            placeholder="mm/DD/yyyy"
            :format="'mm/DD/yyyy'"
          ></v-date-input>
        </v-form>
        <v-btn variant="flat" color="blue-darken-4" @click="submitEdit">
          Xác nhận
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions } from "pinia";
import { useBaseStore } from "../../stores/baseStore";
export default {
  name: "GuaranteeSection",
  emits: ["close"],
  props: {
    status: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
    dataValue: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      dialogDetail: false,
      customerName: null,
      customerPhone: null,
      customerEmail: null,
      fromDate: null,
      todayDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      rulesRequired: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
      valid: false,
      dataSelected: null,
    };
  },
  methods: {
    ...mapActions(useBaseStore, ["getGuaranteeDetail"]),
    getGuaranteeDetails(id) {
      this.getGuaranteeDetail(`admin/guarantee/${id}`).then((resp) => {
        if (resp) {
          this.dialogDetail = true;
          this.dataSelected = resp.data;
        }
      });
    },
    async submitEdit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
      }
    },
  },
  watch: {
    id(val) {
      this.getGuaranteeDetails(val);
    },
    dialogDetail(val) {
      this.$emit("close", val);
    },
  },
  created() {
    this.getGuaranteeDetails(this.id);
  },
};
</script>

<style>
</style>