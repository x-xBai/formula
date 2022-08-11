<template>
  <div class="about">
    <div class="about-slider">
      <el-tabs v-model="tabType" type="card" @tab-click="handleClick">
        <el-tab-pane
          :label="item.name"
          :name="item.type"
          v-for="item in tabs"
          :key="item.id"
          >用户管理</el-tab-pane
        >
      </el-tabs>
      <div v-for="item in list" :key="item.id" class="about-slider-list">
        <span>{{ item.name }}</span>
        <i class="el-icon-edit" @click="insertAtcursor(item.name)"></i>
      </div>
    </div>
    <div class="about-main">
      <el-input
        id="configInput"
        ref="configInput"
        type="textarea"
        :rows="20"
        placeholder="请输入内容"
        v-model="textarea"
        @blur="getPos"
      >
      </el-input>
      <el-button @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
// formula为传入需要校验的字符串; ruleArr为定义的系统提供的字段数组(#{}包裹的内容)
import { v4 as uuidv4 } from "uuid";

const data = [
  {
    name: "+",
  },
  {
    name: "-",
  },
  {
    name: "*",
  },
  {
    name: "/",
  },
  {
    name: "%",
  },
  {
    name: "Math.floor()",
  },
  {
    name: "Math.ceil()",
  },
  {
    name: "Math.max()",
  },
  {
    name: "Math.min()",
  },
  {
    name: ">=",
  },
  {
    name: "&&",
  },
];
const paramData = [
  {
    name: "最大高度",
    key: "maxHeight",
    value: 100,
  },
  {
    name: "最小高度",
    key: "minHeight",
    value: 10,
  },
  {
    name: "最大宽度",
    key: "maxWidth",
    value: 90,
  },
  {
    name: "最小宽度",
    key: "minWidth",
    value: 20,
  },
  {
    name: "大小",
    key: "size",
    value: 200,
  },
  {
    name: "重量",
    key: "weight",
    value: 50,
  },
];
export default {
  name: "about",
  components: {},
  data() {
    return {
      list: [],
      textarea: "",
      // "Math.max( 最大高度*最小高度 , Math.min( 最小宽度, 重量) + 最大高度 - 最小高度)",
      tabType: "0",
      tabs: [
        {
          name: "公式",
          type: "0",
          id: uuidv4(),
          data,
        },
        {
          name: "参数",
          type: "1",
          id: uuidv4(),
          data: paramData,
        },
      ],
      selectTextarea: {
        node: null,
        indexPos: null,
      },
    };
  },
  methods: {
    init(data) {
      this.list = [];
      this.list = data.map((v) => {
        return {
          ...v,
          id: uuidv4(),
        };
      });
    },
    changeFocus(e) {
      console.log(e);
    },
    async insertAtcursor(myValue) {
      let textarea = this.selectTextarea.node;
      let startPos = null,
        endPos = null;
      if (textarea.selectionStart || textarea.selectionStart === 0) {
        startPos = textarea.selectionStart;
        endPos = textarea.selectionEnd;

        this.textarea =
          textarea.value.substring(0, startPos) +
          myValue +
          textarea.value.substring(endPos, textarea.value.length);

        await this.$nextTick();
        textarea.focus();
        // 检测函数是否下一次插入点位置 设置光标位置
        if (myValue.indexOf("(") !== -1) {
          let arr = myValue.split("");
          let index = arr.findIndex((o) => {
            return o == "(";
          });
          textarea.setSelectionRange(endPos + index + 1, endPos + index + 1);
        } else {
          textarea.setSelectionRange(
            endPos + myValue.length,
            endPos + myValue.length
          );
        }
      } else {
        this.textarea += myValue;
      }
    },
    submit() {
      const { volid, volidStr, expressStr, list } = this.getParams(
        this.textarea,
        paramData
      );
      let messageObj = {};
      switch (volid) {
        case 1:
          messageObj = {
            message: "请添加公式！",
            type: "warning",
            duration: 2000,
          };
          break;
        case 2:
          messageObj = {
            message: "公式校验成功！",
            type: "success",
            duration: 1000,
          };
          break;
        case 3:
          messageObj = {
            message: "公式不合法，请检查后再提交！",
            type: "error",
            duration: 2000,
          };
          break;
      }
      this.showMessage({ ...messageObj });

      console.log("submit----", volid, volidStr, expressStr, list);
    },
    showMessage({ message, type, duration }) {
      this.$message({
        showClose: true,
        message,
        type,
        duration,
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.tabType = tab.index;
      this.init(this.tabs[this.tabType].data);
      this.setPos(this.selectTextarea);
    },
    /**
     * @str 视图显示字符串
     * @list  参数集合
     * @key  表达式
     */
    getParams(str, data) {
      let list = [];
      let index;
      data.forEach((v) => {
        while (str) {
          index = str.indexOf(v.name);
          str = str.replace(v.name, ".".repeat(v.name.length));
          if (index < 0) {
            break;
          } else {
            list.push({
              index,
              ...v,
            });
          }
        }
      });
      list.sort((a, b) => a.index - b.index);
      console.log(list);
      return { list, ...this.getExpress(this.textarea, list) };
    },
    /**
     * @return indexPos 失焦时 光标位置
     */
    getPos() {
      console.log(this.selectTextarea.node.selectionEnd);
      this.selectTextarea.indexPos = this.selectTextarea.node.selectionEnd;
    },
    /**
     * @desc 设置光标位置
     * @node dom节点
     * @index 光标位置
     */
    setPos({ node, indexPos }) {
      node.focus();
      node.setSelectionRange(indexPos, indexPos);
      console.log("设置光标位置");
    },
    /**
     * @str 视图显示字符串
     * @list 参数集合
     *
     * @expressStr 整合数据 ，传给后端
     * @volidStr 前端校验表达式，判断是否合法【有执行结果】
     */
    getExpress(str, list) {
      let expressStr = str,
        volidStr = str;
      list.forEach((v) => {
        console.log(v.name);
        // let reg = new RegExp(v.name);
        expressStr = expressStr.replace(v.name, v.key);
        volidStr = volidStr.replace(v.name, v.value);
      });

      console.log("-----", expressStr);
      console.log("----", volidStr);
      return {
        expressStr,
        volidStr,
        volid: this.volidExpress(volidStr),
      };
    },
    /**
     * @any
     * @Number 1 2 3
     * 1 - 空 // 结果为 undefined
     * 2 - 合法 // 结果为 true / false / 或者是一个实际值
     * 3 - 不合法 // 结果 报错 / NaN / Infinity /-Infinity
     */
    volidExpress(exp) {
      let restArr = [NaN, Infinity, -Infinity];
      try {
        let rest = new Function("return " + exp)();

        console.log("volidExpress----", rest, typeof rest);

        if (typeof rest === "undefined") return 1;
        if (typeof rest === "number" && restArr.includes(rest)) {
          return 3;
        }
        return 2;
      } catch (error) {
        return 3;
      }
    },
  },
  created() {
    this.init(data);
  },
  mounted() {
    this.selectTextarea.node = document.querySelector("#configInput");
    setTimeout(() => {
      // let selection = window.getSelection();
      // let node = selection.focusNode.firstChild;
      // let offset = 1;
      // selection.extend(node, 1);
      // selection.modify("move", "left", "character");

      let textarea = document.querySelector("#configInput");
      textarea.focus();
      textarea.setSelectionRange(17, 17);

      // selection.extend(node, 0);
      // console.log("---", node, selection, selection.toString());
    }, 0);
  },
  updated() {},
};
</script>

<style lang="scss">
.about {
  height: 100vh;
  display: flex;
  &-slider {
    width: 300px;
    height: 100%;

    &-list {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 6px 20px;
    }
  }
  &-main {
    // flex: 1;
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
  }
}
</style>
