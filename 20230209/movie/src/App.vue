<template>
  <div class="movie">
    <ul class="tab" ref="tab" @click.prevent="setContext">
      <li><a href="">예매순</a></li>
      <li><a href="">평점순</a></li>
      <li><a href="">개봉일순</a></li>
      <li><a href="">주말관객순</a></li>
      <li><a href="">다운로드순</a></li>
    </ul>
    <ol class="list"> <!--이 부분을 component화 하자, 필요 데이터: movies, movContext-->
      <li v-for="(movie, i) in movies" :key="movie.name">
        <a href="">
          <h4 class="hide">{{ movie.name }}</h4>
          <span :class="['hide', 'rate', 'rate' + movie.rate[0]]">{{
            movie.rate[1]
          }}</span>
          <strong class="rank">{{ i + 1 }}</strong>
          <img class="poster" :src="require(`./assets/${movie.src}`)" :alt="movie.name" />
          <!-- 평점순  -->
          <span class="desc" v-if="movContext === '평점순'">
            <i class="star"
              ><b :style="'width:' + movie.score * 10 + '%'"></b
            ></i>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      movContext: "예매순",
      menuMatch: {
        예매순: "ticketing",
        평점순: "score",
        개봉일순: "openDate",
        주말관객순: "week",
        다운로드순: "sale",
      },
      rateMatch: {
        0: "전체관람가",
        12: "12세이상 관람가",
        15: "15세이상 관람가",
        19: "19세이상 관람가",
        20: "청소년관람불가",
      },
      movies: [
        {
          // movie.rate[1]
          name: "남애의 여름밤",
          src: "images/mov_1.jpg",
          rate: 20, //[12, '12세이상 관람가'],
          score: 9.43, //평점
          sale: 11.7, //판매율
          openDate: 8.26, //개봉일
          ticketing: 11.79, //예매율
          week: 8777, //주말관객
        },
        {
          name: "시크릿 가든",
          src: "images/mov_2.jpg",
          rate: 0,
          score: 8.13,
          sale: 7.7, //판매율
          openDate: 9.3, //개봉일
          ticketing: 20.66,
          week: 2000,
        },
        {
          name: "반도",
          src: "images/mov_3.jpg",
          rate: 15,
          score: 8.54,
          sale: 7.7,
          openDate: 9.3,
          ticketing: 9.79,
          week: 23327,
        },
        {
          name: "강철비2",
          src: "images/mov_4.jpg",
          rate: 19,
          score: 7.43,
          sale: 7.7,
          openDate: 9.7,
          ticketing: 8.6,
          week: 23421,
        },
        {
          name: "신혼여행 허리케인",
          src: "images/mov_5.jpg",
          rate: 12,
          score: 6.2,
          sale: 10.7,
          openDate: 8.17,
          ticketing: 2.11,
          week: 3213,
        },
        {
          name: "테넷",
          src: "images/mov_6.jpg",
          rate: 19,
          score: 7.12,
          sale: 9.11,
          openDate: 11.17,
          ticketing: 3.21,
          week: 3213,
        },
        {
          name: "오케이 마담",
          src: "images/mov_7.jpg",
          rate: 20,
          score: 9.43,
          sale: 9.11,
          openDate: 9.1,
          ticketing: 3.79,
          week: 2277,
        },
        {
          name: "다만 악에서 구하소서",
          src: "images/mov_8.jpg",
          rate: 20,
          score: 8.9,
          sale: 8.8,
          openDate: 8.21,
          ticketing: 12.79,
          week: 83777,
        },
      ],
    };
  },
  watch: {
    movContext(crr) {
      this.setOrder(this.menuMatch[crr]);
      this.setCrrTab(crr);
    },
  },
  methods: {
    setOrder(cxt) {
      // 소팅
      this.movies.sort((a, b) => b[cxt] - a[cxt]);
    },
    setContext(ev) {
      // 상태바꾸기
      if (ev.target.tagName !== "A") return;
      this.movContext = ev.target.textContent;
    },
    setCrrTab(crr) {
      // on 지우기
      this.$refs.tab.querySelectorAll("li").forEach((item) => {
        item.classList.remove("on");
      });
      //lielem에 on 주기
      this.$refs.tab.querySelectorAll("a").forEach((item) => {
        if (item.textContent === crr) {
          item.parentNode.classList.add("on");
        }
      });
    },
  },
  mounted() {
    // 시작시 탭에 on주기
    this.setCrrTab(this.movContext);
    // rate 데이터 손보기
    for (const movie of this.movies) {
      movie.rate = [movie.rate, this.rateMatch[movie.rate]];
    }
    // 시작시 소팅
    this.setOrder(this.movContext);
  },
};
</script>

<style>
@charset 'utf-8';

/* reset */
body {
  font: normal 12px Arial, sans-serif;
  line-height: 1.3;
  color: #666666;
  background-color: #fff;
  margin: 0;
  padding: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 1em;
}
h1,
h2,
h3,
h4,
h5,
h6,
div,
p,
dl,
dt,
dd,
ul,
ol,
li,
form,
fieldset,
blockquote,
address,
table,
thead,
tbody,
tfoot,
tr,
td,
caption {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: white;
}

/* movie */
body {
  background-color: #242424;
}
.movie {
  width: 590px;
  margin: 30px auto 0;
  padding: 10px;
  background-color: #242424;
  overflow: hidden;
}
.movie > ol > li {
  float: left;
  width: 125px;
  height: 204px;
  margin: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.movie > ol > li a {
  display: block;
  position: relative;
}
.movie > ol > li .hide {
  font-size: 0;
}
.movie > ol > li .rank {
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 24px;
  font-style: italic;
  color: white;
  text-shadow: 0 0 10px black;
}
.movie > ol > li .rate {
  position: absolute;
  top: 5px;
  right: 5px;
  content: "";
  width: 25px;
  height: 25px;
  display: block;
  background-image: url("./assets/images/icon_rate.png");
  background-repeat: no-repeat;
}
.movie > ol > li .rate15 {
  background-position: 0 -60px;
}
.movie > ol > li .rate12 {
  background-position: 0 -30px;
}
.movie > ol > li .rate00 {
  background-position: 0 0;
}
.movie > ol > li .rate19 {
  background-position: 0 -120px;
}
.movie > ol > li .rate20 {
  background-position: 0 -90px;
}
.movie > ol > li .poster {
  display: block;
}
.movie > ol > li .desc {
  position: relative;
  background-color: black;
  display: block;
  height: 25px;
}
.movie > ol > li i {
  float: left;
  margin: 5px 0 0 10px;
  font-style: normal;
}
.movie > ol > li em {
  float: right;
  margin: 5px 10px 0 0;
  font-weight: bold;
  font-style: normal;
}
.movie > ol > li i.star {
  width: 71px;
  height: 14px;
  background: url("./assets/images/icon_star.png") no-repeat 0 0/71px auto;
}
.movie > ol > li i.star > b {
  display: block;
  width: 0;
  height: 100%;
  background: url("./assets/images/icon_star.png") no-repeat 0 -15px/71px auto;
}
.movie > ol > li i.reserv_title {
  font-weight: bold;
}
.movie > ol > li em.reserv_num {
  color: red;
}
.movie > ol > li i.open_title {
  position: absolute;
  right: 35px;
  font-weight: bold;
  color: red;
}
.movie > ol > li em.open_num {
  font-weight: bold;
}
.movie > ol > li i.week_title {
  font-weight: bold;
}
.movie > ol > li em.week_num {
  color: red;
}
.movie > ol > li i.sale_title {
  font-weight: bold;
}
.movie > ol > li em.sale_num {
  color: red;
}
.movie > .tab {
  text-align: center;
  font-size: 16px;
}
.movie > .tab > li {
  display: inline-block;
  margin: 0 20px;
}
.movie > .tab > li.on a {
  color: red;
}
</style>
