<template>
  <div class="shadow-xl rounded-lg" >
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        Danh sách sản phẩm
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
        ></v-text-field>
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table
        :custom-filter="filterOnlyCapsText"
        :headers="headers"
        :items="items"
        :search="search"
        :page="page"
        :items-per-page="itemsPerPage"
        item-value="name"
        hide-default-footer
        :mobile="windowReSize.x < 768"
      >
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
</template>

<script>
import { mapState } from 'pinia';
import { useBaseStore } from '../stores/baseStore';
export default {
  name: "DashboardPage",
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      search: "",
      headers: [
        {
          title: "CPU Model",
          align: "start",
          key: "name",
        },
        {
          title: "Cores",
          align: "end",
          key: "cores",
        },
        {
          title: "Threads",
          align: "end",
          key: "threads",
        },
        {
          title: "Base Clock",
          align: "end",
          key: "baseClock",
        },
        {
          title: "Boost Clock",
          align: "end",
          key: "boostClock",
        },
        {
          title: "TDP (W)",
          align: "end",
          key: "tdp",
        },
      ],
      items: [
        {
          name: "Intel Core i9-11900K",
          cores: 8,
          threads: 16,
          baseClock: "3.5 GHz",
          boostClock: "5.3 GHz",
          tdp: "125W",
        },
        {
          name: "AMD Ryzen 9 5950X",
          cores: 16,
          threads: 32,
          baseClock: "3.4 GHz",
          boostClock: "4.9 GHz",
          tdp: "105W",
        },
        {
          name: "Intel Core i7-10700K",
          cores: 8,
          threads: 16,
          baseClock: "3.8 GHz",
          boostClock: "5.1 GHz",
          tdp: "125W",
        },
        {
          name: "AMD Ryzen 5 5600X",
          cores: 6,
          threads: 12,
          baseClock: "3.7 GHz",
          boostClock: "4.6 GHz",
          tdp: "65W",
        },
        {
          name: "Intel Core i5-10600K",
          cores: 6,
          threads: 12,
          baseClock: "4.1 GHz",
          boostClock: "4.8 GHz",
          tdp: "125W",
        },
        {
          name: "AMD Ryzen 7 5800X",
          cores: 8,
          threads: 16,
          baseClock: "3.8 GHz",
          boostClock: "4.7 GHz",
          tdp: "105W",
        },
        {
          name: "Intel Core i3-10100",
          cores: 4,
          threads: 8,
          baseClock: "3.6 GHz",
          boostClock: "4.3 GHz",
          tdp: "65W",
        },
        {
          name: "AMD Ryzen 3 3300X",
          cores: 4,
          threads: 8,
          baseClock: "3.8 GHz",
          boostClock: "4.3 GHz",
          tdp: "65W",
        },
        {
          name: "Intel Pentium Gold G6400",
          cores: 2,
          threads: 4,
          baseClock: "4.0 GHz",
          tdp: "58W",
        },
        {
          name: "AMD Athlon 3000G",
          cores: 2,
          threads: 4,
          baseClock: "3.5 GHz",
          tdp: "35W",
        },
        {
          name: "AMD Athlon 3000G",
          cores: 2,
          threads: 4,
          baseClock: "3.5 GHz",
          tdp: "35W",
        },
        {
          name: "AMD Athlon 3000G",
          cores: 2,
          threads: 4,
          baseClock: "3.5 GHz",
          tdp: "35W",
        },
      ],
    };
  },
  methods: {
    filterOnlyCapsText(value, query, item) {
      return (
        value != null &&
        query != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(query) !== -1
      );
    },
  },
  computed:{
    ...mapState(useBaseStore, ['windowReSize'])
  },
  watch:{
    windowReSize(val){
      console.log(val);
    }
  },
  created() {
    this.pageCount = Math.ceil(this.items.length / this.itemsPerPage);
  },
};
</script>

<style>
</style>