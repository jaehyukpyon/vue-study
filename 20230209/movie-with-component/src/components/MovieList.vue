<template>
  <ol class="list">
    <!--이 부분을 component화 하자, 필요 데이터: movies, movContext-->
    <li v-for="(movie, i) in movies" :key="movie.name">
      <a href="">
        <h4 class="hide">{{ movie.name }}</h4>
        <span :class="['hide', 'rate', 'rate' + movie.rate[0]]">{{
          movie.rate[1]
        }}</span>
        <strong class="rank">{{ i + 1 }}</strong>
        <img
          class="poster"
          :src="require(`../assets/${movie.src}`)"
          :alt="movie.name"
        />
        <!-- 평점순  -->
        <span class="desc" v-if="movContext === '평점순'">
          <i class="star"><b :style="'width:' + movie.score * 10 + '%'"></b></i>
          <em class="score">{{ movie.score }}</em>
        </span>
        <!-- 예매순 -->
        <span class="desc" v-else-if="movContext === '예매순'">
          <i class="reserv title">예매율</i>
          <em class="reserv data">9292827</em>
        </span>
        <!-- 개봉일순 -->
        <span class="desc" v-else-if="movContext === '개봉일순'">
          <em class="open data"> 9.11 <b>개봉</b></em>
        </span>
        <!-- 주말관객순 -->
        <span class="desc" v-else-if="movContext === '주말관객순'">
          <i class="week title">주말관객</i>
          <em class="week data">239282 명</em>
        </span>
        <!-- 판매율순 -->
        <span class="desc" v-else-if="movContext === '다운로드순'">
          <i class="sale title">판매율</i>
          <em class="sale data">23 %</em>
        </span>
      </a>
    </li>
  </ol>
</template>

<script>
export default {
    props: ['movies', 'movContext', ]
};
</script>

<style>
</style>