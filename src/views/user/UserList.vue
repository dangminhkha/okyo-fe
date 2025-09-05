<template>
  <div class="shadow-xl rounded-lg">
    <v-card flat>
      <v-card-title>
        <v-row>
          <v-col cols="12" md="6" class="text-blue-darken-4 font-bold uppercase"
            >Danh sách user</v-col
          >
          <v-col cols="12" md="6"
            ><v-text-field
              v-model="search"
              density="compact"
              label="Tìm kiếm"
              prepend-inner-icon="mdi:mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              single-line
              @click:prepend-inner="searchDara()"
              class="h-[48px]"
            ></v-text-field
          ></v-col>
        </v-row>
      </v-card-title>
      <div class="p-4">
        <div
          class="flex justify-center items-center p-3 rounded-lg text-sm bg-blue-darken-4 h-[40px] w-[165px] cursor-pointer"
          @click="addAgentBtn()"
        >
          <span class="mdi mdi-plus"></span>Thêm user
        </div>
      </div>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        :page="page"
        :items-per-page="itemsPerPage"
        item-value="name"
        hide-default-footer
        :mobile="windowReSize.x < 768"
        :hide-default-header="windowReSize.x < 768"
      >
        <template v-slot:[`item.id`]="{ item, index }">
          <div class="cursor-pointer">
            <span class="hidden">{{ item.id }}</span
            >{{ index + 1 }}
          </div>
        </template>
        <template v-slot:[`item.product.name`]="{ item }">
          <div class="md:max-w-[100px] md:truncate md:cursor-pointer">
            <v-tooltip activator="parent" location="top">{{
              item.product.name
            }}</v-tooltip>
            {{ item.product.name }}
          </div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <div
            v-if="item.status === 0 || !item.status"
            class="font-bold p-2 text-sm rounded-lg text-center max-w-[150px] m-auto"
          >
            <span class="mdi mdi-circle text-2xl text-gray-500"></span>
          </div>
          <div
            v-if="item.status === 1"
            class="font-bold p-2 text-sm rounded-lg text-center max-w-[150px] m-auto"
          >
            <span class="mdi mdi-circle text-2xl text-green-500"></span>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="min-w-[60px]">
            <v-icon @click="detailAgent(item)" class="text-blue-darken-4">
              mdi:mdi-eye
            </v-icon>
            <v-icon @click="editAgent(item)" class="text-blue-darken-4 ml-3">
              mdi:mdi-pencil
            </v-icon>
            <v-icon
              @click="removeGuaranteeDetails(item)"
              class="text-red-darken-4 ml-3"
            >
              mdi:mdi-close-circle-outline
            </v-icon>
          </div>
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="5"
        next-icon="mdi:mdi-menu-right"
        prev-icon="mdi:mdi-menu-left"
      >
      </v-pagination>
    </v-card>
  </div>
  <v-dialog max-width="1024" v-model="dialogAdd" persistent>
    <v-card>
      <v-card-text>
        <div class="bg-white p-4 rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <div
              class="text-center text-xl font-bold text-blue-darken-4 uppercase"
            >
              Thêm mới user
            </div>
            <div class="text-right" @click="dialogAdd = false">
              <span
                class="mdi mdi-close cursor-pointer font-bold text-2xl"
              ></span>
            </div>
          </div>
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="submitAddAgent"
            class="grid"
          >
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Tên User"
                  variant="outlined"
                  v-model="name"
                  :rules="rulesRequired"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Tên đăng nhập"
                  variant="outlined"
                  v-model="username"
                  :rules="[rules.required, rules.varChar]"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" md="6">
                <v-select
                  label="Quyền"
                  :items="roleList"
                  v-model="roleSelected"
                  variant="outlined"
                  density="comfortable"
                  :rules="rulesRequired"
                ></v-select>
              </v-col>
              <v-col cols="6" md="6">
                <v-checkbox v-model="status" label="Hoạt động"></v-checkbox>
              </v-col>
              <v-col cols="6" md="6" v-if="roleSelected === 'USER_AGENT'">
                <v-select
                  label="Đại lý"
                  :items="agentData"
                  v-model="agentSelected"
                  variant="outlined"
                  density="comfortable"
                  item-title="name"
                  item-value="id"
                  return-object
                  :rules="rulesRequired"
                ></v-select>
              </v-col>
            </v-row>
            <div class="flex justify-center my-6">
              <v-btn
                variant="flat"
                color="blue-darken-4"
                @click="submitAddAgent"
              >
                Xác nhận
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog max-width="800" v-model="dialogDetail" persistent>
    <div class="bg-white py-3 px-5 rounded-lg">
      <div class="grid grid-cols-2 items-center mb-4">
        <div class="text-left text-xl font-bold text-blue-darken-4 uppercase">
          Chi tiết user
        </div>
        <div class="text-right" @click="dialogDetail = false">
          <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
        </div>
      </div>
      <div class="grid gap-3" v-if="detailData">
        <div class="grid gap-3">
          <div class="grid grid-cols-2 gap-2">
            <div class="text-right">Tên user</div>
            <div class="font-bold">{{ detailData.name }}</div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="text-right">Tên đăng nhập</div>
            <div class="font-bold">{{ detailData.username }}</div>
          </div>
        </div>
        <div class="grid gap-3">
          <div class="grid grid-cols-2 gap-2">
            <div class="text-right">Quyền</div>
            <div class="font-bold">{{ detailData.role }}</div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="text-right">Trạng thái</div>
            <div class="font-bold"
              :class="detailData.status ? 'text-green-500' : 'text-gray-500'"
            >
              {{ detailData.status ? "Đang hoạt động" : "Không hoạt động" }}
            </div>
          </div>
        </div>
        <div class="grid" v-if="detailData.role === 'USER_AGENT'">
          <div class="grid grid-cols-2 gap-2">
            <div class="text-right">Đại lý</div>
            <div class="font-bold">{{ detailData?.salesAgent?.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
  <v-dialog max-width="800" v-model="dialogEdit" persistent>
    <v-card>
      <v-card-text>
        <div class="bg-white p-4 rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <div
              class="text-center text-xl font-bold text-blue-darken-4 uppercase"
            >
              Cập nhật thông tin user
            </div>
            <div class="text-right" @click="dialogEdit = false">
              <span
                class="mdi mdi-close cursor-pointer font-bold text-2xl"
              ></span>
            </div>
          </div>
          <v-form
            ref="formEdit"
            v-model="validEdit"
            @submit.prevent="submitEditAgent"
            class="grid"
          >
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Tên User"
                  variant="outlined"
                  v-model="name"
                  :rules="rulesRequired"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Tên đăng nhập"
                  variant="outlined"
                  v-model="username"
                  :rules="[rules.required, rules.varChar]"
                  disabled
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" md="6">
                <v-select
                  label="Quyền"
                  :items="roleList"
                  v-model="roleSelected"
                  variant="outlined"
                  density="comfortable"
                  :rules="rulesRequired"
                ></v-select>
              </v-col>
              <v-col cols="6" md="6">
                <v-checkbox v-model="status" label="Hoạt động"></v-checkbox>
              </v-col>
              <v-col cols="6" md="6" v-if="roleSelected === 'USER_AGENT'">
                <v-select
                  label="Đại lý"
                  :items="agentData"
                  v-model="agentSelected"
                  variant="outlined"
                  density="comfortable"
                  item-title="name"
                  item-value="id"
                  return-object
                  :rules="rulesRequired"
                ></v-select>
              </v-col>
            </v-row>
            <div class="flex justify-center my-6">
              <v-btn
                variant="flat"
                color="blue-darken-4"
                @click="submitEditAgent"
              >
                Xác nhận
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-card-text>
    </v-card></v-dialog
  >
  <v-dialog v-model="dialogRemove" max-width="500">
    <div class="bg-white py-3 px-5 rounded-lg">
      <div class="text-right" @click="dialogRemove = false">
        <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
      </div>
      <div class="grid gap-3">
        <div class="text-center text-xl font-bold">Xác nhận xóa user?</div>
        <v-btn
          variant="flat"
          color="blue-darken-4"
          class="w-3/5 m-auto mt-5"
          @click="removeConfirm()"
          >Xác nhận</v-btn
        >
      </div>
    </div>
  </v-dialog>
</template>
  
  <script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../../stores/baseStore";
import GuaranteeDetailVue from "../sections/GuaranteeDetail.vue";
export default {
  name: "UserListPage",
  components: { GuaranteeDetailVue },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      headers: [
        {
          title: "STT",
          align: "start",
          key: "id",
          sortable: false,
        },

        {
          title: "Tên user",
          align: "start",
          key: "name",
          sortable: false,
        },
        {
          title: "Quyền",
          align: "start",
          key: "role",
          sortable: false,
        },
        {
          title: "Username",
          align: "start",
          key: "username",
          sortable: false,
        },
        {
          title: "Trạng thái",
          align: "center",
          key: "status",
          sortable: false,
        },

        { title: "", key: "actions", align: "end", sortable: false },
      ],
      items: [],
      dialogDetail: false,
      dialogDetailData: null,
      dialogRemove: false,
      dataSelected: null,
      agentData: null,
      dialogAdd: false,
      dialogEdit: false,
      valid: false,
      validEdit: false,
      name: null,
      username: null,
      address: null,
      status: true,
      rulesRequired: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
      rules: {
        required: (v) => !!v || "Vui lòng nhập thông tin",
        varChar: (v) =>
          !v || /^[a-zA-Z0-9]*$/i.test(v) || "Không nhập ký tự đặc biệt",
      },
      detailData: null,
      roleList: null,
      roleSelected: null,
      agentData: null,
      agentSelected: null,
    };
  },
  computed: {
    ...mapState(useBaseStore, ["windowReSize"]),
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
  methods: {
    ...mapActions(useBaseStore, [
      "snackChange",
      "getUserList",
      "addNewUser",
      "editInfoUser",
      "removeUser",
      "getUserDetailInfo",
      "getListRole",
      "getListAgent",
      "getUserDetailInfo",
    ]),
    getDataAgentDetail(id) {
      this.getUserDetailInfo(`admin/user/detail?id=${id}`).then((resp) => {
        this.detailData = null;
        if (resp) {
          this.detailData = resp.data;
          this.name = this.detailData.name;
          this.username = this.detailData.username;
          this.roleSelected = this.detailData.role;
          this.agentSelected = this.detailData.salesAgent;
          this.status = this.detailData.status === 1 ? true : false;
        }
      });
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    addAgentBtn() {
      this.dialogAdd = true;
      this.status = true;
      this.name = null;
      this.username = null;
    },
    async submitAddAgent() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let params = {
          name: this.name,
          username: this.username,
          role: this.roleSelected,
          salesAgentId:
            this.roleSelected === "ADMIN" ? '' : this.agentSelected.id,
          status: this.status ? 1 : 0,
        };
        this.addNewUser("admin/user", params).then((resp) => {
          if (resp) {
            this.snackChange({
              status: true,
              message: "Thêm user thành công",
              color: "blue",
            });
            this.getData();
            this.dialogAdd = false;
          }
        });
      }
    },
    async submitEditAgent() {
      const { valid } = await this.$refs.formEdit.validate();
      if (valid) {
        let params = {
          id: this.detailData.id,
          name: this.name,
          username: this.username,
          role: this.roleSelected,
          salesAgentId:
            this.roleSelected === "ADMIN" ? "" : this.agentSelected.id,
          status: this.status ? 1 : 0,
        };
        this.addNewUser("admin/user", params).then((resp) => {
          if (resp) {
            this.snackChange({
              status: true,
              message: "Cập nhật thông tin thành công",
              color: "blue",
            });
            this.getData();
            this.dialogEdit = false;
          }
        });
      }
    },
    searchDara() {
      this.page = 1;
      this.getData();
    },
    getData() {
      let paramsSearch = {
        page: this.page,
        size: this.itemsPerPage,
        filters: [
          {
            fieldCode: "NAME",
            operator: "LIKE",
            value: this.search,
          },
        ],
        sorts: [
          {
            fieldCode: "ID",
            typeSort: "DESC",
          },
        ],
      };
      this.getUserList("admin/user/search", paramsSearch).then((resp) => {
        if (resp) {
          this.items = resp.data.data;
          this.pageCount = resp.data.totalPage;
        }
      });
    },
    detailAgent(data) {
      this.getDataAgentDetail(data.id);
      this.dialogDetail = true;
    },
    editAgent(data) {
      this.getDataAgentDetail(data.id);
      this.dialogEdit = true;
    },

    removeGuaranteeDetails(data) {
      this.dialogRemove = true;
      this.dataSelected = data;
    },
    removeConfirm() {
      this.removeUser(`admin/user/delete?id=${this.dataSelected.id}`).then(
        (resp) => {
          if (resp) {
            this.snackChange({
              status: true,
              message: "Xóa user thành công",
              color: "blue",
            });
            this.dialogRemove = false;
            this.getData();
          }
        }
      );
    },
    updateDone() {
      this.dialogDetail = false;
      this.getData();
    },
  },
  watch: {
    page(val) {
      this.getData();
    },
    itemsStatusSelected(val) {
      this.getData();
    },
  },
  created() {
    this.getData();
    this.getListRole("admin/user/role-list").then((resp) => {
      if (resp) {
        this.roleList = resp.data;
      }
    });
    this.getListAgent("admin/sales-agent/select").then((resp) => {
      if (resp) {
        this.agentData = resp.data;
      }
    });
  },
};
</script>
  
  <style></style>