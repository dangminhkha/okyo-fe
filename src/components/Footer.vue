<template>
  <!-- ========== FOOTER ========== -->
  <footer
    class="mt-auto w-full py-10 px-4 sm:px-6 lg:px-8 mx-auto !bg-[#ecf3fa] !text-[#333333]"
  >
    <!-- Grid -->
    <div
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-10 max-w-screen-lg m-auto"
    >
      <div class="col-span-full hidden lg:col-span-2 lg:block">
        <div>
          <img src="/src/assets/images/logo_no_bg.png" class="w-[200px]" />
          <p class="mt-3">
            Từ các giải pháp nước dân dụng và thương mại đến quản lý nước trong
            công nghiệp và nhiều lĩnh vực khác, OSG luôn tập trung vào các giải
            pháp nước thông minh và bền vững, góp phần giúp con người và hành
            tinh phát triển thịnh vượng.
          </p>
          <div class="grid grid-cols-4 gap-3 mt-3 text-3xl text-[#333333]">
            <a href="https://www.facebook.com/maylocnuocionosg?locale=vi_VN" target="_blank"><span class="mdi mdi-facebook"></span></a>
            <span class="mdi mdi-instagram"></span>
            <span class="fa-brands fa-x-twitter"></span>
            <span class="mdi mdi-linkedin"></span>
          </div>
        </div>
      </div>
      <!-- End Col -->
      <div>
        <div class="grid gap-3">
          <div class="customer-divide !bg-[#d0df00]"></div>
          <a href="https://osg-humanwater.com/" target="_blank">Tuyển dụng</a>
          <a href="https://osg-humanwater.com/" target="_blank">Thương hiệu</a>
          <a href="https://osg-humanwater.com/" target="_blank">Nhà đầu tư</a>
          <a href="https://osg-humanwater.com/" target="_blank">Media</a>
          <a href="https://osg-humanwater.com/" target="_blank">Nhà cung cấp</a>
        </div>
      </div>
      <div>
        <div class="grid gap-3">
          <div class="customer-divide !bg-[#d0df00]"></div>
          <a href="https://osg-humanwater.com/" target="_blank">Dân dụng</a>
          <a href="https://osg-humanwater.com/" target="_blank">Doanh nghiệp và công nghiệp</a>
          <a href="https://osg-humanwater.com/" target="_blank">Sản phẩm</a>
          <a href="https://osg-humanwater.com/" target="_blank">Tra cứu đại lý</a>
          <a href="https://osg-humanwater.com/" target="_blank">Trang đối tác</a>
        </div>
      </div>
      <div>
        <div class="grid gap-3">
          <div class="customer-divide !bg-[#d0df00]"></div>
          <a href="https://osg-humanwater.com/" target="_blank">Liên hệ</a>
          <a href="https://osg-humanwater.com/" target="_blank">Hỗ trợ sản phẩm dân dụng</a>
          <a href="https://osg-humanwater.com/" target="_blank">Hỗ trợ sản phẩm cho doanh nghiệp và công nghiệp</a>
          <a href="https://osg-humanwater.com/" target="_blank">Trung tâm Tải xuống</a>
        </div>
      </div>
      <div class="lg:col-span-2">
        <div class="grid gap-3 ">
          <div class="customer-divide !bg-[#d0df00]"></div>
          <a href="https://osg-humanwater.com/" target="_blank">Thông báo về quyền riêng tư</a>
          <a href="https://osg-humanwater.com/" target="_blank">Điều khoản sử dụng</a>
          <a href="https://osg-humanwater.com/" target="_blank">Tuyên bố về khả năng truy cập website</a>
          <a href="https://osg-humanwater.com/" target="_blank">Báo cáo minh bạch nhà vận chuyển y tế</a>
          <a href="https://osg-humanwater.com/" target="_blank">Nhãn hiệu thương hiệu</a>
          <a href="https://osg-humanwater.com/" target="_blank">Công bố có trách nhiệm</a>
          <a href="https://osg-humanwater.com/" target="_blank">Không bán hoặc chia sẻ thông tin cá nhân của tôi</a>
        </div>
      </div>
    </div>
    <!-- End Grid -->
  </footer>
  <div class="bg-[#061b3b] px-5 py-8">
    <div class="max-w-screen-lg m-auto flex justify-between">
      <div class="text-[#ffffff80] text-base md:text-xl">
        © {{ new Date().getFullYear() }} Bản quyền thuộc về OSG
      </div>
      <div class="flex gap-3">
        <span
          class="fa-brands fa-cc-visa text-3xl text-[#ffffff80] hover:text-[#ffffff] hover:cursor-pointer"
        ></span>
        <span
          class="fa-brands fa-cc-paypal text-3xl text-[#ffffff80] hover:text-[#ffffff] hover:cursor-pointer"
        ></span>
        <span
          class="fa-brands fa-cc-stripe text-3xl text-[#ffffff80] hover:text-[#ffffff] hover:cursor-pointer"
        ></span>
        <span
          class="fa-brands fa-cc-mastercard text-3xl text-[#ffffff80] hover:text-[#ffffff] hover:cursor-pointer"
        ></span>
        <span
          class="fas fa-shipping-fast text-3xl text-[#ffffff80] hover:text-[#ffffff] hover:cursor-pointer"
        ></span>
      </div>
    </div>
  </div>
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