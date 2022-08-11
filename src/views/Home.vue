<template>
  <div class="home">
    <h1>home</h1>

    <div class="home-content">
      <div class="home-content-slider">
        <div
          class="home-content-slider-list"
          v-for="item in mathFormula"
          :key="item.id"
        >
          <span>{{ item.name.replace(/\$/g, " ") }}</span>
          <i class="el-icon-edit" @click="clickEvent(item.name)"></i>
        </div>
      </div>
      <div class="home-content-main">
        <input type="text" v-model="regStr" />
        <div class="home-content-main-right" contenteditable="true">
          <span v-for="(item, index) in regStr" :key="index"
            ><Test
              v-if="item === '$'"
              @mounted="mounted"
              @beforeDestroy="beforeDestroy"
              @destroyed="destroyed"
            /><i v-else>{{ item }}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import Test from "../components/test.vue";
const arr = [
  "$+$",
  "$%$",
  "$-$",
  "$/$",
  "Math.max($, $)",
  "Math.floor($)",
  "Math.min($, $)",
];
export default {
  name: "home",
  data() {
    return {
      reg: /(\$)\1+/g,
      mathFormula: [],
      regStr: `Math.max($ * $, Math.min( $, $) + $ - $)`, // 初始模版 && 页面渲染模版
      $arr: [], // 记录 $(占位符) 顺序
      $catch: {}, // 数据存储
      $key: [], // 记录数据顺序
      $components: [], // 记录渲染组件顺序
      renderTempl: ``, // 渲染模版
      respData: {
        model: ``, // 创建的公式模版
        datas: [], // 对应的公式数据
      },
    };
  },
  components: {
    Test,
  },
  methods: {
    clickEvent(item) {
      console.log(item);
    },
    mounted(id) {
      console.log("mounted---", id);
    },
    beforeDestroy(id) {
      console.log("beforeDestroy-----", id);
    },
    destroyed(id) {
      console.log("destroyed-----", id);
    },
  },
  filters: {
    filterName(name) {
      console.log(name);
      if (name.length === 3) {
        return name.replace(/\$/g, "");
      }
      return name;
    },
  },
  created() {
    // arr.map();
    this.renderTempl = `<Test />`;
    this.mathFormula = arr.map((v) => {
      return {
        name: v,
        id: uuidv4(),
      };
    });
  },
};
</script>

<style lang="scss">
.home {
  padding: 20px;
  &-content {
    display: flex;

    &-slider {
      width: 300px;
      border: 1px solid #ccc;
      margin-right: 40px;

      &-list {
        line-height: 40px;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 10px;
      }
    }

    &-main {
      width: 500px;
      border: 1px solid #ccc;
      display: flex;
      flex-direction: column;

      &-right {
        display: flex;
      }
    }
  }
}
</style>
