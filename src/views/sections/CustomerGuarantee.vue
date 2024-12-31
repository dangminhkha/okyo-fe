<template>

  <div class="bg-gray-100 rounded-2xl mx-4">
    <v-carousel height="auto" :show-arrows="false" hide-delimiter-background>
      <v-carousel-item v-for="(slide, i) in sliders" :key="i">
        <!-- Item -->
        <img :src="slide" class="m-auto rounded-2xl" />
        <!-- End Item -->
      </v-carousel-item>
    </v-carousel>
  </div>
  <div class="max-w-screen-lg m-auto p-3">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-4 rounded-lg my-4">
      <div class="text-xl text-blue-darken-3 font-bold">Danh sách bảo hành</div>

      <v-text-field v-model="search" density="compact" label="Tìm kiếm" prepend-inner-icon="mdi:mdi-magnify"
        variant="outlined" flat hide-details single-line @click:prepend-inner="searchDara()"></v-text-field>
    </div>

    <v-divider></v-divider>
    <v-data-table :headers="headers" :items="items" :page="page" :items-per-page="itemsPerPage" item-value="name"
      hide-default-footer hide-default-header :mobile="windowReSize.x < 768">
      <template v-slot:body="{ items }">
        <div v-if="items.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
            <div v-for="(item, index) in items" :key="index">
              <div class="bg-white border p-3 rounded-lg shadow-xl hover:shadow-lg cursor-pointer"
                @click="getGuaranteeDetails(item)">
                <div>
                  Mã BH:
                  <span class="text-blue-darken-4 font-bold">{{
                    item.code
                  }}</span>
                </div>
                <div class="md:max-w-[300px] md:truncate md:cursor-pointer">
                  <v-tooltip activator="parent" location="top">{{
                    item.product.name
                  }}</v-tooltip>
                  Tên SP:
                  <span class="text-blue-darken-4 font-bold">
                    {{ item.product.name }}</span>
                </div>
                <div class="md:max-w-[300px] md:truncate md:cursor-pointer">
                  <v-tooltip activator="parent" location="top">{{
                    item.customerName
                  }}</v-tooltip>
                  Tên KH:
                  <span class="text-blue-darken-4 font-bold">
                    {{ item.customerName }}</span>
                </div>
                <div class="">
                  SĐT KH:
                  <span class="text-blue-darken-4 font-bold">{{
                    item.customerPhone
                  }}</span>
                </div>
                <div>
                  Ngày hết hạn BH:
                  <span class="text-blue-darken-4 font-bold">{{
                    item.endDate
                  }}</span>
                </div>
                <div class="my-2">
                  <v-chip color="red-darken-4" variant="flat" v-if="item.status === 'EXPIRED'" size="small">
                    Hết hạn BH
                  </v-chip>
                  <v-chip color="green-darken-4" variant="flat" v-if="item.status === 'NOT_SOLD'" size="small">
                    Chưa kích hoạt
                  </v-chip>
                  <v-chip color="blue-darken-4" variant="flat" v-if="item.status === 'SOLD'" size="small">
                    Đang BH
                  </v-chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </v-data-table>
    <v-pagination v-model="page" :length="pageCount" :total-visible="5" next-icon="mdi:mdi-menu-right"
      prev-icon="mdi:mdi-menu-left">
    </v-pagination>
    <v-dialog v-model="dialogDetail" max-width="800" scrollable>
      <v-card>
        <v-card-text>
          <div class="bg-white rounded-lg">
            <div class="flex justify-between mb-4">
              <div class="text-center text-xl font-bold text-blue-darken-3 uppercase">
                Chi tiết bảo hành
              </div>
              <div class="text-right" @click="dialogDetail = false">
                <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
              </div>
            </div>
            <div class="grid gap-3 border p-3 rounded-lg">
              <v-row>
                <v-col cols="6">Tên KH</v-col>
                <v-col cols="6">{{ dataSelected.customerName }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6">SĐT KH</v-col>
                <v-col cols="6">{{ dataSelected.customerPhone }}</v-col>
              </v-row>
              <v-row v-if="dataSelected.customerEmail">
                <v-col cols="6">Email KH</v-col>
                <v-col cols="6">{{ dataSelected.customerEmail }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6">Tên SP</v-col>
                <v-col cols="6">{{ dataSelected.product.name }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6">Thời hạn BH</v-col>
                <v-col cols="6">{{ dataSelected.product.monthGuarantee }} tháng</v-col>
              </v-row>
              <v-row>
                <v-col cols="6">Trạng thái</v-col>
                <v-col cols="6">
                  <v-chip color="red-darken-4" variant="flat" v-if="dataSelected.status === 'EXPIRED'" size="small">
                    Hết hạn BH
                  </v-chip>
                  <v-chip color="green-darken-4" variant="flat" v-if="dataSelected.status === 'NOT_SOLD'" size="small">
                    Chưa kích hoạt
                  </v-chip>
                  <v-chip color="blue-darken-4" variant="flat" v-if="dataSelected.status === 'SOLD'" size="small">
                    Đang BH
                  </v-chip></v-col>
              </v-row>
              <v-row>
                <v-col cols="6">Ngày bắt đầu BH</v-col>
                <v-col cols="6">{{ dataSelected.startDate }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6">Ngày kết thúc BH</v-col>
                <v-col cols="6">{{ dataSelected.endDate }}</v-col>
              </v-row>
              <v-row v-if="dataSelected.description">
                <v-col cols="6">Mô tả</v-col>
                <v-col cols="6">{{ dataSelected.description }}</v-col>
              </v-row>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../../stores/baseStore";
import img1 from "@/assets/images/Slider1.jpg"
import img2 from "@/assets/images/Slider2.jpg"
import img3 from "@/assets/images/Slider3.jpg"
import img4 from "@/assets/images/Slider4.png"
import img5 from "@/assets/images/Slider5.jpg"
export default {
  name: "CustomerGuaramteePage",
  data() {
    return {
      sliders: [
        img1,
        img2,
        img3,
        img4,
        img5
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 9,
      search: "",
      headers: [
        {
          title: "STT",
          align: "start",
          key: "id",
          sortable: false,
        },
        {
          title: "Mã BH",
          align: "center",
          key: "code",
          sortable: false,
        },
        {
          title: "Tên SP",
          align: "center",
          key: "product.name",
          sortable: false,
        },
        {
          title: "Tên KH",
          align: "center",
          key: "customerName",
          sortable: false,
        },
        {
          title: "Sđt KH",
          align: "center",
          key: "customerPhone",
          sortable: false,
        },
        {
          title: "Email KH",
          align: "center",
          key: "customerEmail",
          sortable: false,
        },
        {
          title: "Ngày hết hạn BH",
          align: "center",
          key: "endDate",
          sortable: false,
        },
        {
          title: "Trạng thái",
          align: "start",
          key: "status",
          sortable: false,
        },

        { title: "", key: "actions", align: "end", sortable: false },
      ],
      items: [],
      dialogDetail: false,
      dataSelected: null,
    };
  },
  computed: {
    ...mapState(useBaseStore, ["windowReSize"]),
  },
  methods: {
    ...mapActions(useBaseStore, ["getListCusGuarantee", "cusDetail"]),
    searchDara() {
      this.page = 1;
      this.getData();
    },
    getData() {
      let paramsSearch = {
        page: this.page,
        size: this.itemsPerPage,
        searchValue: this.search,
      };
      this.getListCusGuarantee("public/guarantee", paramsSearch).then(
        (resp) => {
          if (resp) {
            this.items = resp.data.data;
            this.pageCount = resp.data.totalPage;
          }
        }
      );
    },
    getGuaranteeDetails(data) {
      this.cusDetail(`public/guarantee/${data.code}`).then((resp) => {
        if (resp) {
          this.dialogDetail = true;
          this.dataSelected = resp.data;
        }
      });
    },
  },
  watch: {
    page(val) {
      this.getData();
    },
  },
  created() { },
};
</script>

<style></style>