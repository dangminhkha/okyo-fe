<template>
  <!-- ========== FOOTER ========== -->
  <footer class="mt-auto w-full py-10 px-4 sm:px-6 lg:px-8 mx-auto bg-light-blue-darken-3">
    <!-- Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
      <div class="col-span-full hidden lg:col-span-1 lg:block">

        <p class="mt-3 text-xs sm:text-sm text-gray-600 text-center text-blue-grey-lighten-5">
          © {{ new Date().getFullYear() }} OSG VIETNAM.
        </p>
      </div>
      <!-- End Col -->

      <div>
        <h4 class="text-lg font-semibold text-blue-grey-lighten-5 uppercase text-blue-grey-lighten-5">
          Thông tin công ty
        </h4>

        <div class="mt-3 grid space-y-3 text-sm">
          <p>
            <span class="mdi mdi-chevron-right mr-2"></span>
            <a class="inline-flex gap-x-2 text-blue-grey-lighten-5 cursor-pointer" href="https://okyo.vn/"
              target="_blank">Giới thiệu
              công ty</a>
          </p>
          <p>
            <span class="mdi mdi-chevron-right mr-2"></span>
            <a class="inline-flex gap-x-2 text-blue-grey-lighten-5 cursor-pointer" href="https://okyo.vn/lien-he"
              target="_blank">Liên
              hệ, góp ý</a>
          </p>
          <p>
            <span class="mdi mdi-chevron-right mr-2"></span>
            <a class="inline-flex gap-x-2 text-blue-grey-lighten-5 cursor-pointer"
              href="https://okyo.vn/phuong-thuc-thanh-toan" target="_blank">Phương thức thanh toán</a>
          </p>
          <p>
            <span class="mdi mdi-chevron-right mr-2"></span>
            <a class="inline-flex gap-x-2 text-blue-grey-lighten-5 cursor-pointer" href="https://okyo.vn/tin-tuc"
              target="_blank">Tin
              tức</a>
          </p>
        </div>
        <div>
          <h4 class="text-lg font-semibold text-blue-grey-lighten-5 uppercase text-blue-grey-lighten-5 my-4">
            Thông tin liên hệ
          </h4>

          <div class="mt-3 grid space-y-3 text-sm">
            <p>
              <span class="mdi mdi-chevron-right mr-2"></span>
              <a class="inline-flex gap-x-2 text-blue-grey-lighten-5" href="https://okyo.vn/" target="_blank">Email:
                contact@okyo.vn</a>
            </p>
            <p>
              <span class="mdi mdi-chevron-right mr-2"></span>
              <a class="inline-flex gap-x-2 text-blue-grey-lighten-5" href="https://okyo.vn/" target="_blank">Hotline 1:
                0917.911.159</a>
            </p>
            <p>
              <span class="mdi mdi-chevron-right mr-2"></span>
              <a class="inline-flex gap-x-2 text-blue-grey-lighten-5" href="https://okyo.vn/" target="_blank">Hotline 2:
                028.224.366.33</a>
            </p>
          </div>
        </div>
      </div>

      <!-- End Col -->

      <div>
        <h4 class="text-lg font-semibold text-blue-grey-lighten-5 uppercase text-blue-grey-lighten-5">
          Hỗ trợ khách hàng
        </h4>

        <div class="mt-3 grid space-y-3 text-sm">
          <p>
            <span class="mdi mdi-chevron-right mr-2"></span>
            <a class="inline-flex gap-x-2 text-blue-grey-lighten-5 cursor-pointer"
              href="https://okyo.vn/chinh-sach-bao-hanh" target="_blank">Chính sách
              bảo hành</a>
          </p>
          <p>
            <span class="mdi mdi-chevron-right mr-2"></span>
            <a class="inline-flex gap-x-2 text-blue-grey-lighten-5 cursor-pointer"
              href="https://okyo.vn/chinh-sach-giao-hang" target="_blank">Chính sách
              giao hàng</a>
          </p>
          <p>
            <span class="mdi mdi-chevron-right mr-2"></span>
            <a class="inline-flex gap-x-2 text-blue-grey-lighten-5 cursor-pointer"
              href="https://okyo.vn/chinh-sach-doi-tra-hang" target="_blank">Chính sách
              đổi trả hàng</a>
          </p>
          <p>
            <span class="mdi mdi-chevron-right mr-2"></span>
            <a class="inline-flex gap-x-2 text-blue-grey-lighten-5 cursor-pointer"
              href="https://okyo.vn/chinh-sach-bao-mat" target="_blank">Chính sách
              bảo mật</a>
          </p>
          <p>
            <span class="mdi mdi-chevron-right mr-2"></span>
            <a class="inline-flex gap-x-2 text-blue-grey-lighten-5 cursor-pointer"
              href="https://okyo.vn/dieu-khoan-su-dung" target="_blank">Điều khoản
              sử dụng</a>
          </p>
          <p>
            <span class="mdi mdi-chevron-right mr-2"></span>
            <a class="inline-flex gap-x-2 text-blue-grey-lighten-5 cursor-pointer" href="https://okyo.vn/dang-ky-dai-ly"
              target="_blank">Đăng ký đại
              lý</a>
          </p>
        </div>
      </div>
      <!-- End Col -->
      <div class="grid grid-cols-2 col-span-2">
        <div>
          <h4 class="text-lg font-semibold text-blue-grey-lighten-5 uppercase">
            Trụ sở công ty
          </h4>

          <div class="mt-3 grid space-y-3 text-sm">
            <p class="flex">
              <span class="mdi mdi-chevron-right mr-2"></span>
              <a class="inline-flex gap-x-2 text-blue-grey-lighten-5" href="https://okyo.vn/" target="_blank">Cơ sở 1:
                7A Tân Thới Nhất 8, P. Tân Thới Nhất, Q.12, TP HCM</a>
            </p>
            <p class="flex">
              <span class="mdi mdi-chevron-right mr-2"></span>
              <a class="inline-flex gap-x-2 text-blue-grey-lighten-5" href="https://okyo.vn/" target="_blank">Cơ sở 2:
                40 đường D16, P Tây Thanh, Q Tân phú, TP HCM (KCN Tân
                Bình)</a>
            </p>
          </div>
        </div>
        <!-- End Col -->

        <div>
          <h4 class="text-lg font-semibold text-blue-grey-lighten-5 uppercase">
            Kết nối cộng đồng Facebook
          </h4>

          <div class="mt-3 grid space-y-3 text-sm">
            <p>
              <a class="inline-flex gap-x-2 text-blue-grey-lighten-5" href="https://www.facebook.com/locdaunguonokyo/"
                target="_blank"><img :src="fb1" /></a>
            </p>
            <p>
              <a class="inline-flex gap-x-2 text-blue-grey-lighten-5" href="https://www.facebook.com/locdaunguonokyo/"
                target="_blank"><img :src="fb2" /></a>
            </p>
            <p>
              <a class="inline-flex gap-x-2 text-blue-grey-lighten-5" href="https://www.facebook.com/locdaunguonokyo/"
                target="_blank"><img :src="fb3" /></a>
            </p>
          </div>
        </div>
        <div class="col-span-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15675.299619576266!2d106.60810800000002!3d10.824708!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b004932b7f5%3A0x2bd80dae2410d02a!2zT0tZTyAtIEdp4bqjaSBwaMOhcCBs4buNYyBuxrDhu5tjIHRpbmgga2hp4bq_dA!5e0!3m2!1svi!2sus!4v1735292554395!5m2!1svi!2sus"
            width="100%" height="200" style="border: 0" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <!-- End Col -->
      </div>
    </div>
    <!-- End Grid -->
  </footer>
  <!-- ========== END FOOTER ========== -->
</template>

<script>
import imageAvatar from "@/assets/images/logo.png";
import fb1 from "@/assets/images/Artboard-3-copy-2-1.png";
import fb2 from "@/assets/images/Artboard-3-copy-1.png";
import fb3 from "@/assets/images/Artboard-3-1.png";
export default {
  data() {
    return {
      imageAvatar,
      fb1,
      fb2,
      fb3,
    };
  },
};
</script>

<style></style>