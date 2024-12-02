<template>
  <div
    class="mt-10 bg-white border border-gray-200 rounded-xl shadow-sm max-w-md m-auto"
  >
    <div class="p-4 sm:p-7">
      <div class="text-center">
        <h1 class="block text-2xl font-bold text-gray-800 my-5">Đăng nhập</h1>

        <!-- Form -->
        <v-form
          ref="form"
          v-model="valid"
          class="mx-auto max-w-xl"
          @submit.prevent="submit"
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Tên đăng nhập"
                variant="outlined"
                density="comfortable"
                v-model="useName"
                :rules="rulesUserName"
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-text-field
                label="Mật khẩu"
                variant="outlined"
                density="comfortable"
                v-model="passWord"
                :rules="rulesPassWord"
                :type="visible ? 'text' : 'password'"
                ><template v-slot:append-inner>
                  <button type="button" @click="visible = !visible">
                    <i class="far fa-eye eyes-button-custom"></i>
                  </button> </template></v-text-field
            ></v-col>
          </v-row>
        </v-form>
        <div class="text-center normal-case">
          <v-btn
            variant="flat"
            color="blue-darken-4"
            class="mt-3"
            @click="submit"
            ><span class="text-md normal-case">Đăng nhập</span></v-btn
          >
        </div>
        <!-- End Form -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      visible: false,
      valid: false,
      useName: null,
      rulesUserName: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập tên đăng nhập";
        },
      ],
      passWord: null,
      rulesPassWord: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập mật khẩu";
        },
      ],
    };
  },
  methods: {
    async submit(e) {
      let params = {
        login: this.useName,
        password: this.passWord,
      };
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        console.log("login");
      }
    },
  },
};
</script>

<style>
</style>