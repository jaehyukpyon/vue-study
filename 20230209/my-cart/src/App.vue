<template>
  <div>
    <h1>Sales Product ({{ inCart.length }}개), {{ totalPrice }}원</h1>

    <br />
    <h5>구입목록</h5>
    <br /><br />
    <ul>
      <li v-for="(item, index) in inCart" :key="item.title">
        <strong>{{ item.title }}</strong
        >, {{ item.price }}원
        <a href="" @click.prevent="delCart(index)" style="color: red">삭제</a>
        <br />
        <hr />
        <br />
      </li>
    </ul>

    <product-list :chips-data="chips" @add-item="addCart"></product-list>
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      chips: [
        {
          img: `mango.jpg`,
          title: `자연그대로 망고칩`,
          desc: `단맛이 그대로 살아있는 망고칩입니다.`,
          price: `2500`,
        },
        {
          img: `apple.jpg`,
          title: `천연 오가닉 사과칩`,
          desc: `깨끗한 재료를 엄선하여 자연을 그대로 담았습니다.`,
          price: `2000`,
        },
        {
          img: `jujube.jpg`,
          title: `아이깨끗 대추칩`,
          desc: `새콤함이 살아있는 반건조 대추그대로.`,
          price: `3000`,
        },
      ],
      inCart: [],
    };
  },
  methods: {
    addCart(index) {
      this.inCart.push(this.chips[index]);
    },
    delCart(index) {
      this.inCart.splice(index, 1);
    },
  },
  computed: {
    totalPrice() {
      // 항상 return 필요
      let result = 0;
      this.inCart.forEach((item) => (result += Number(item.price)));
      return result;
    },
  },
}; // export default ends
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

body {
  padding: 30px;
}

.list {
  margin: 20px 0;
  display: flex;
}

.list > li {
  width: 200px;
  border: 1px solid gray;
  padding: 10px;
  margin: 5px;
}

.list > li > * {
  display: block;
}

.list > li > img {
  width: 200px;
  margin-bottom: 20px;
}

.list > li > strong {
  font-size: 20px;
  color: #666;
  margin-bottom: 10px;
}

.list > li > span {
  margin-bottom: 10px;
}
</style>
