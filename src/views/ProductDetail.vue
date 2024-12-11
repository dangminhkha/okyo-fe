<template>
  <div class="bg-white p-3 rounded-lg" v-if="dataDetail">
    <div class="grid gap-4">
      <div class="text-center">
        <v-carousel
          v-if="imageList.length > 0"
          hide-delimiters
          hide-delimiter-background
          height="300"
          :cycle="true"
          :interval="6000"
        >
          <template v-slot:prev="{ props }">
            <div
              class="w-[50px] h-[50px] bg-gray-100 flex justify-center items-center shadow-2xl rounded-full"
              @click="props.onClick"
            >
              <span class="mdi mdi-arrow-left w-[40px]"></span>
            </div>
          </template>
          <template v-slot:next="{ props }">
            <div
              class="w-[50px] h-[50px] bg-gray-100 flex justify-center items-center shadow-2xl rounded-full"
              @click="props.onClick"
            >
              <span class="mdi mdi-arrow-right w-[40px]"></span>
            </div>
          </template>
          <v-carousel-item
            cover
            v-for="(item, index) in imageList"
            :key="index"
          >
            <img :src="item" class="m-auto max-h-[400px] h-[100%]"
          /></v-carousel-item>
        </v-carousel>
      </div>
      <div class="flex text-center justify-between px-4">
        <div>{{ dataDetail.name }}</div>
        <div>Thời hạn BH {{ dataDetail.monthGuarantee }} tháng</div>
      </div>
      <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
          Danh sách bảo hành
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            density="compact"
            label="Tìm kiếm"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
            @click:prepend-inner="searchDara()"
          ></v-text-field>
        </v-card-title>

        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="guaranteeData"
          :page="page"
          :items-per-page="itemsPerPage"
          item-value="name"
          hide-default-footer
          :mobile="windowReSize.x < 768"
        >
          <template v-slot:[`item.status`]="{ item }">
            <v-chip
              color="red-darken-4"
              variant="flat"
              v-if="item.status === 'EXPIRED'"
              size="small"
            >
              Hết hạn BH
            </v-chip>
            <v-chip
              color="green-darken-4"
              variant="flat"
              v-if="item.status === 'NOT_SOLD'"
              size="small"
            >
              Chưa có BH
            </v-chip>
            <v-chip
              color="blue-darken-4"
              variant="flat"
              v-if="item.status === 'SOLD'"
              size="small"
            >
              Còn BH
            </v-chip>
          </template>
        </v-data-table>
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="5"
          prev-icon="fas fa-angle-double-left text-sm"
          next-icon="fas fa-angle-double-right text-sm"
        ></v-pagination>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../stores/baseStore";
export default {
  name: "ProductDetailPage",
  components: {},
  data() {
    return {
      dataDetail: null,
      guaranteeData: [],
      imageList: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      headers: [
        {
          title: "Mã sản phẩm",
          align: "start",
          key: "code",
        },
        {
          title: "Tên KH",
          align: "center",
          key: "customerName",
        },
        {
          title: "Sđt KH",
          align: "center",
          key: "customerPhone",
        },
        {
          title: "Email KH",
          align: "center",
          key: "customerEmail",
        },
        {
          title: "Ngày hết hạn BH",
          align: "center",
          key: "endDate",
        },
        {
          title: "Trạng thái",
          align: "start",
          key: "status",
        },

        { title: "", key: "actions", align: "end", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState(useBaseStore, ["windowReSize"]),
  },
  methods: {
    ...mapActions(useBaseStore, [
      "detailsProduct",
      "getListGuarantee",
      "getImageFromId",
    ]),
    getImageUrl(id) {
      this.getImageFromId(`public/file`, { id: id }).then((resp) => {
        if (resp) {
          // resp.data.rep

          this.imageList.push(
            "data:" + resp.data.contentType + ";base64," + resp.data.base64
          );
        }
      });
    },
    getDetails(id) {
      this.detailsProduct(`admin/product/${id}`).then((resp) => {
        if (resp) {
          this.dataDetail = resp.data;
          this.imageList = [];
          this.dataDetail.files.map((item) => {
            this.getImageUrl(item.fileId);
          });
        }
      });
    },
    getGuarantee(id) {
      this.getListGuarantee(`admin/guarantee/product/${id}`).then((resp) => {
        if (resp) {
          this.guaranteeData = resp.data;
          this.pageCount = resp.data.totalPage;
        }
      });
    },
  },
  created() {
    this.getDetails(this.$route.params.id);
    this.getGuarantee(this.$route.params.id);
  },
};
</script>

<style>
</style>