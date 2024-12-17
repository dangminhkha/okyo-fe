<template>
  <v-dialog v-model="dialogDetail" max-width="500" scrollable>
    <v-card>
      <v-card-text>
        <div class="bg-white py-3 px-5 rounded-lg">
          <div class="text-right" @click="dialogDetail = false">
            <span
              class="mdi mdi-close cursor-pointer font-bold text-2xl"
            ></span>
          </div>
          <div class="grid gap-3">
            <div class="text-center text-xl font-bold">Chi tiết bảo hành</div>

            <div class="">
              <div class="flex justify-between my-1">
                <div>Tên SP</div>
                <div>{{ dataSelected.product.name }}</div>
              </div>
              <!-- <div class="flex justify-between my-1">
                <div>Mô tả</div>
                <div>{{ dataSelected.product.description }}</div>
              </div> -->
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
                :rules="[rules.required]"
              >
              </v-text-field>
              <v-text-field
                label="Sđt khách hàng"
                variant="outlined"
                v-model="customerPhone"
                :rules="[rules.required, rules.rulesPhone]"
                inputmode="numeric"
                maxlength="10"
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
                class="p-date hideDate"
                :cancel-text="'Đóng'"
                :hide-actions="true"
                placeholder="dd/mm/yyyy"
                :format="'dd/mm/yyyy'"
                :rules="[rules.required]"
              >
                <template v-slot:default>
                  {{ dateFormated }}
                </template>
              </v-date-input>
              <v-textarea
                label="Mô tả"
                variant="outlined"
                density="comfortable"
                v-model="description"
                auto-grow
              >
              </v-textarea>
            </v-form>
            <v-btn variant="flat" color="blue-darken-4" @click="submitEdit">
              Xác nhận
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "pinia";
import { useBaseStore } from "../../stores/baseStore";
import moment from "moment";
export default {
  name: "GuaranteeSection",
  emits: ["close", "updateDone"],
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
      dateFormated: null,
      description: null,
      todayDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      rulesRequired: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
      rules: {
        required: (v) => !!v || "Vui lòng nhập thông tin",
        rulesPhone: (v) =>
          (v && v.length === 10) || "Vui lòng nhập đúng số điện thoại",
      },
      valid: false,
      dataSelected: null,
    };
  },
  methods: {
    ...mapActions(useBaseStore, [
      "getGuaranteeDetail",
      "updateGuarantee",
      "snackChange",
    ]),
    getGuaranteeDetails(id) {
      this.getGuaranteeDetail(`admin/guarantee/${id}`).then((resp) => {
        if (resp) {
          this.dialogDetail = true;
          this.dataSelected = resp.data;
          this.customerName = this.dataSelected.customerName;
          this.customerPhone = this.dataSelected.customerPhone;
          this.customerEmail = this.dataSelected.customerEmail;
          this.fromDate = this.dataSelected.startDate ? new Date(moment(this.dataSelected.startDate, 'DD/MM/YYYY').format()) : null;
          this.dateFormated = this.dataSelected.startDate;
        }
      });
    },
    async submitEdit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let params = {
          id: this.dataSelected.id,
          customerName: this.customerName,
          customerPhone: this.customerPhone,
          customerEmail: this.customerEmail,
          startDate: moment(this.fromDate).format("DD/MM/YYYY"),
          description: this.description,
        };
        this.updateGuarantee("admin/guarantee", params).then((resp) => {
          if (resp) {
            this.snackChange({
              status: true,
              message: "Cập nhật thông tin thành công",
              color: "blue",
            });
            this.$emit("updateDone");
          }
        });
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
  },
  computed: {
    rulesEmail() {
      const rules = [];
      const rule2 = (value) =>
        (value &&
          /^[a-z][a-z0-9_\.-]{2,}@[a-z0-9]{2,}(\.[a-z0-9]{1,}){1,2}$/.test(
            value
          )) ||
        "Vui lòng nhập đúng định dạng email";
      rules.push(rule2);
      return rules;
    },
  },
  watch: {
    fromDate(val) {
      this.dateFormated = moment(val).format("DD/MM/YYYY");
    },
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