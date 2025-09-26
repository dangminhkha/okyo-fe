<template>
  <div class="shadow-xl rounded-lg bg-white p-4">
    <div class="text-blue-darken-4 font-bold uppercase text-xl mb-4">
      Thống kê
    </div>
    <div v-if="loginData?.data.user.role === 'ADMIN'">
      <div
        class="grid grid-cols-10 items-center justify-center justify-content-center"
      >
        <div class="">Đại lý</div>
        <v-select
          v-if="agentData"
          :items="agentData"
          v-model="saleAgentId"
          variant="outlined"
          density="comfortable"
          item-title="name"
          item-value="id"
          hide-details
          class="col-span-2"
        ></v-select>
      </div>
    </div>
    <div class="grid md:grid-cols-2 gap-3 mt-4 border rounded-lg p-3">
      <div>
        <v-pie
          v-if="series"
          title="Kích hoạt"
          :palette="['#43A047', '#E53935']"
          :items="series"
          :legend="{ position: 'right' }"
          animation
          tooltip
          reveal
        />
      </div>
      <div>
        <v-pie
          v-if="series2"
          title="Hạn sử dụng"
          :palette="['#43A047', '#546E7A']"
          :items="series2"
          :legend="{ position: 'right' }"
          animation
          tooltip
          reveal
        />
      </div>
    </div>
  </div>
  <div class="bg-white p-4 rounded-lg">
    <v-form ref="form" v-model="valid" @submit.prevent="search">
      <div class="grid md:grid-cols-8 gap-3 items-end">
        <div class="flex-auto">
          <label for="datepicker-12h" class="block mb-2"> Từ tháng </label>
          <DatePicker
            showIcon
            v-model="startDate"
            view="month"
            dateFormat="mm/yy"
            :rules="[rules.required]"
          />
        </div>
        <div class="flex-auto">
          <label for="datepicker-12h" class="block mb-2"> Đến tháng </label>
          <DatePicker
            showIcon
            v-model="endDate"
            view="month"
            dateFormat="mm/yy"
          />
        </div>

        <div
          class="rounded-lg bg-blue-darken-4 flex gap-2 justify-center items-center h-[40px] cursor-pointer"
          @click="search"
        >
          <i class="fa-solid fa-magnifying-glass"></i>Xác nhận
        </div>
      </div>
    </v-form>
    <div
      v-if="chartOptions.xaxis.categories.length"
      class="border p-3 mt-4 rounded-lg"
    >
      <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series3"
      ></apexchart>
    </div>
  </div>
</template>
  
  <script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../../stores/baseStore";
import moment from "moment";
import DatePicker from "primevue/datepicker";
export default {
  name: "DashBoardPage",
  components: { DatePicker },
  data() {
    return {
      valid: false,
      agentData: null,
      saleAgentId: 0,
      series: [],
      series2: [],
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 5)),
      startDateFormated: null,
      endDate: new Date(),
      endDateFormated: null,
      monthlyData: [],

      series3: [],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            borderRadius: 5,
            borderRadiusApplication: "end",
          },
        },
        colors: ["#43A047", "#546E7A"],
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          title: {
            text: "Số phiếu bảo hành",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " đơn";
            },
          },
        },
      },
      rules: {
        required: (v) => !!v || "Vui lòng nhập thông tin",
      },
    };
  },
  computed: {
    ...mapState(useBaseStore, ["loginData"]),
  },
  methods: {
    ...mapActions(useBaseStore, [
      "getListAgent",
      "getAgentReport",
      "getMonthlyReport",
      "snackChange",
    ]),
    fetchDataAgentReport() {
      this.getAgentReport(
        `admin/dashboard?saleAgentId=${
          this.saleAgentId !== 0 ? this.saleAgentId : ""
        }`
      ).then((resp) => {
        this.series = [];
        this.series2 = [];
        if (resp) {
          this.series = resp?.data?.dashboardTotal;
          this.series.map((item, index) => {
            item.key = index;
          });
          this.series2 = resp?.data?.dashboardExpiry;
          this.series2.map((item, index) => {
            item.key = index;
          });
        }
      });
    },
    fetchDataMontlyReport() {
      this.getMonthlyReport(
        `admin/dashboard-month?saleAgentId=${
          this.saleAgentId !== 0 ? this.saleAgentId : ""
        }&startDate=${
          this.startDateFormated ? this.startDateFormated.replace("/", "") : ""
        }&endDate=${
          this.endDateFormated ? this.endDateFormated.replace("/", "") : ""
        }`
      ).then((resp) => {
        this.chartOptions.xaxis.categories = [];
        if (resp) {
          this.monthlyData = resp?.data;
          this.series3 = resp?.data?.data;
          this.chartOptions = {
            chart: {
              type: "bar",
              height: 350,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "55%",
                borderRadius: 5,
                borderRadiusApplication: "end",
              },
            },
            colors: ["#43A047", "#546E7A"],
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"],
            },
            xaxis: {
              categories: resp?.data?.label,
            },
            yaxis: {
              title: {
                text: "Số phiếu bảo hành",
              },
            },
            fill: {
              opacity: 1,
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + " đơn";
                },
              },
            },
          };
        }
      });
    },
    async search() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        if (moment(this.endDate).isBefore(this.startDate)) {
          this.snackChange({
            status: true,
            message: "Thời gian tìm kiếm không hợp lệ",
            color: "red",
          });
          return;
        }
        this.fetchDataMontlyReport();
      }
    },
  },
  watch: {
    saleAgentId(val) {
      this.fetchDataAgentReport();
      this.fetchDataMontlyReport();
    },
    startDate(val) {
      this.startDateFormated = moment(val).format("MM/YYYY");
    },
    endDate(val) {
      this.endDateFormated = moment(val).format("MM/YYYY");
    },
  },
  created() {
    this.getListAgent("admin/sales-agent/select").then((resp) => {
      if (resp) {
        this.agentData = resp.data;
        this.agentData.unshift({
          id: 0,
          name: "Tất cả",
        });
      }
    });
    this.fetchDataAgentReport();
    this.fetchDataMontlyReport();

    this.startDateFormated = moment(this.startDate).format("MM/YYYY");

    this.endDateFormated = moment(this.endDate).format("MM/YYYY");
  },
};
</script>
  
  <style>
</style>