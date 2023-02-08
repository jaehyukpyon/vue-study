<template>
  <ul class="list">
    <li v-for="(item, i) in chipsData" :key="item.title">
      <img :src="require(`@/assets/${item.img}`)" />
      <strong>{{ item.title }}</strong>
      <span>{{ item.desc }}</span>
      <b>{{ item.price }}원</b><br />
      <button @click="add(i)">구매하기</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["chipsData"],
  methods: {
    add(index) {
      this.$emit("add-item", index);
    },
  },
};
</script>

<style>
</style>