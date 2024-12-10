<template>
  <div>sd</div>
</template>

<script>
import { mapActions } from "pinia";
import { useBaseStore } from "../stores/baseStore";
export default {
  name: "ProductDetailPage",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(useBaseStore, ["detailsProduct"]),
    getDetails(id) {
      this.detailsProduct(`admin/product/${id}`).then((resp) => {
        if (resp) {
          
        }
      });
    },
  },
  created() {
    this.getDetails(this.$route.params.id);
  },
};
</script>

<style>
</style>