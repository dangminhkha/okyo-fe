<template>
  <div class="shadow-xl rounded-lg">
    <v-card>
      <v-card-text>
        <div class="bg-white p-4 rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <div
              class="text-center text-xl font-bold text-blue-darken-4 uppercase"
            >
              Gửi thông báo zalo
            </div>
          </div>
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="submitPush"
            class="grid"
          >
            <div class="grid gap-1">
              <v-text-field
                label="Tiêu đề"
                variant="outlined"
                v-model="title"
                :rules="rulesRequired"
                density="comfortable"
                maxlength="200"
                counter="200"
              >
              </v-text-field>
              <v-textarea
                label="Nội dung tin"
                variant="outlined"
                v-model="content"
                :rules="rulesRequired"
                auto-grow
                rows="5"
                maxlength="200"
                counter="200"
              >
              </v-textarea>
              <v-text-field
                label="Khuyến mãi"
                variant="outlined"
                v-model="promotion"
                density="comfortable"
                maxlength="200"
                counter="200"
              >
              </v-text-field>
            </div>

            <div class="flex justify-center my-6">
              <v-btn variant="flat" color="blue-darken-4" @click="submitPush">
                Xác nhận
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useBaseStore } from "../../stores/baseStore";
export default {
  name: "PushNotiPageComponent",
  data() {
    return {
      valid: false,
      title: null,
      content: null,
      promotion: null,
      rulesRequired: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
    };
  },
  methods: {
    ...mapActions(useBaseStore, ["pushNotification", "snackChange"]),

    async submitPush() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let params = {
          title: this.title,
          content: this.content,
          promotion: this.promotion,
        };
        this.pushNotification("admin/send-ads", params).then((resp) => {
          if (resp) {
            this.snackChange({
              status: true,
              message: "Gửi tin thành công",
              color: "blue",
            });
            this.content = null;
          }
        });
      }
    },
  },
};
</script>

<style>
</style>