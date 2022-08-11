<template>
  <div class="example2">
    <el-row :gutter="20">
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <el-button @click="submit">确定</el-button>
        </div></el-col
      >
      <el-col :span="8">
        <el-tabs
          type="border-card"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane :label="item.name" v-for="item in tabs" :key="item.type">
            <div
              v-for="item in item.data"
              :key="item.id"
              class="about-slider-list"
            >
              <span>{{ item.name }}</span>
              <el-button size="small" @click="insertCursor(item)"
                >选择</el-button
              >
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="参数">参数</el-tab-pane> -->
        </el-tabs>
      </el-col>
      <el-col :span="14">
        <div>
          <el-popover
            placement="right"
            width="400"
            v-model="visible"
            popper-class="atPopover"
            trigger="manual"
          >
            <template #default>
              <el-card>
                <template #header>
                  <div class="flex flex_sb">
                    <i class="el-icon-close" @click="close" />
                  </div>
                </template>
                <div
                  v-for="item in items"
                  :key="item.id"
                  class="flex flex_sb bb p8 about-slider-list"
                >
                  <span>{{ item.name }}</span>
                  <el-button size="small" @click="select(item)">选择</el-button>
                </div>
              </el-card>
            </template>

            <template #reference>
              <div
                slot="reference"
                id="atInput"
                ref="refAtInput"
                contenteditable="true"
                @input="input"
                @focus="visible = false"
                @blur="() => recordRange()"
                @click="click"
                @keydown.left="keyleft"
                @keydown.right="keyright"
              />
            </template>
          </el-popover>
        </div>
        <div class="result">
          <h4>公式中参数集合:</h4>
          <div v-for="item in paramOVList" :key="item.id">
            {{ item }}
          </div>
          <h4>实时innerText: {{ inputText }}</h4>
          <h4>公式-key: {{ expressStr }}</h4>
          <h4>公式-value: {{ volidStr }}</h4>
          <!-- <h4>公式校验返回值: {{ volid }}</h4> -->
          <!-- <h4>实时innerHTML: {{ inputHTML }}</h4> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { tabs } from "./config.js";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "CalculationEngine",
  components: {},
  data() {
    return {
      tabs,
      activeName: "",
      visible: false, // 是否显示选择人员弹窗
      inputHTML: "", // 实时输入内容 innerHTML
      // inputHTML:
      //   "<span class='__at_span' data-select-id='3773f96f-4857-43a5-b6a0-531a59a6d3f1' contenteditable='false'>最大高度</span>&ZeroWidthSpace;", // 实时输入内容 innerHTML
      inputText: "", // 实时innerText
      volid: null,
      volidStr: "",
      expressStr: "",
      focusOffset: 0, // 缓存光标所在位置
      focusNode: {}, // 缓存光标所在节点
      selectIds: [], // 选中参数集合
      observer: {}, // dom 监听器
      items: tabs[1].data,
      insertIndex: null,
    };
  },
  computed: {
    paramOVList() {
      let arr = [];
      this.selectIds.forEach((v) => {
        if (!arr.find((j) => j.id === v.id)) {
          arr.push(v);
        }
      });
      return arr;
    },
  },
  methods: {
    initDom() {
      const selection = getSelection();
      const range = selection.getRangeAt(0);
      // 缓存光标所在节点
      this.focusNode = selection?.focusNode;
      // 缓存光标所在节点位置
      this.focusOffset = selection?.focusOffset;
      range.setStart(this.focusNode, this.focusOffset);
      range.setEnd(this.focusNode, this.focusOffset);
      range.collapse();
      const unsaw = document.createTextNode("\u200B");
      // 插入不可见文本
      range.insertNode(unsaw);
      // 光标移动到末尾
      range.collapse();
      range.setEnd(unsaw, 1);
      range.setStart(unsaw, 1);
      range.collapse();
    },
    keyleft(e) {
      const range = getSelection().getRangeAt(0);
      const node = range.startContainer;

      console.log(
        "collapsed: " + range.collapsed,
        "nodeType: " + node.nodeType,
        "nodeValue: " + node.nodeValue,
        "startOffset: " + range.startOffset
      );
      if (
        range.collapsed &&
        node.nodeType === 3 &&
        node.nodeValue?.startsWith("\u200B") &&
        range.startOffset === 1
      ) {
        e.preventDefault();
        range.setStart(node?.previousSibling?.previousSibling, 0);
        range.setEnd(
          node.previousSibling?.previousSibling,
          node.previousSibling?.previousSibling?.nodeValue.length || 0
        );
        range.collapse();
      }
    },
    keyright(e) {
      const range = getSelection()?.getRangeAt(0);
      const node = range?.startContainer;
      if (node.nextSibling?.nodeName === "SPAN") {
        e.preventDefault();
        range.setStart(node.nextSibling?.nextSibling, 1);
        range.setEnd(
          node.nextSibling?.nextSibling,
          node.nextSibling?.nextSibling?.nodeValue.length || 1
        );
        range.collapse();
      }
    },
    click(e) {
      if (e.target?.nodeName === "SPAN") {
        getSelection()?.getRangeAt(0).selectNode(e.target);
      }
    },
    input(e) {
      console.log("input 数据发生变化", e);
      // 删除#
      Array.from(e.target.childNodes).forEach((el) => {
        if (
          el.nodeName === "SPAN" &&
          !el.nextSibling.nodeValue?.startsWith("\u200B")
        ) {
          console.log("删除中---u200B");
          el.remove();
        }
        if (
          el.nodeValue?.startsWith("\u200B") &&
          el.previousSibling &&
          el.previousSibling.nodeName !== "SPAN"
        ) {
          el.nodeValue = el.nodeValue?.replace("\u200B", "");
        }
      });
      // 实时输入框的保存
      this.inputHTML = e.target.innerHTML;
      if (e.data === "#") {
        this.open();
      }
    },
    // 打开弹框
    open() {
      const selection = getSelection();
      const rang = selection?.getRangeAt(0);
      // 缓存光标所在节点
      this.focusNode = selection?.focusNode;
      // 缓存光标所在节点位置
      this.focusOffset = selection?.focusOffset;
      const pos = rang.getBoundingClientRect();
      // 显示选择框
      this.visible = true;

      this.$nextTick(() => {
        const x = pos.x > 75 ? pos.x - 75 : 0;
        const y = pos.y + pos?.height + 8;
        const s = document.getElementsByClassName("atPopover")[0];
        s.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
      });
    },
    close() {
      this.visible = false;
      const selection = getSelection();
      const range = selection.getRangeAt(0);

      // 选中节点
      range.selectNode(this.focusNode);
      // 移动到终点
      // 设置终点
      range.setEnd(this.focusNode, this.focusOffset);
      // 移动到终点
      range.collapse();
      // 聚焦输入框
      this.$refs.refAtInput.focus();
    },
    select(item, type) {
      // console.log(item);
      const input = this.$refs.refAtInput;
      // 关闭选择框
      this.visible = false;
      input.focus();
      console.log("select----", this.focusOffset, this.focusNode);
      const range = getSelection()?.getRangeAt(0);

      let focusStart = this.focusOffset;
      if (type !== "insertCursor") {
        focusStart -= 1;
      }

      // 选中输入的 # 符
      range.setStart(this.focusNode, focusStart);
      range.setEnd(this.focusNode, this.focusOffset);
      // 删除输入的 #
      range.deleteContents();

      this.insertIndex = null;
      const selection = getSelection();
      const node = selection.focusNode;
      this.getIndex(node);
      console.log("insertIndex----", this.insertIndex);

      const element = document.createElement("SPAN");
      const unsaw = document.createTextNode("\u200B");
      item.selectId = uuidv4();
      element.className = "__at_span";
      element.dataset.selectId = item.selectId;
      // element.dataset.row = JSON.stringify({
      //   ...item,
      // });
      element.contentEditable = false;
      element.innerText = item.name;
      this.spliceSelectIds(this.insertIndex, JSON.parse(JSON.stringify(item)));

      // 插入元素节点
      range.insertNode(element);
      // 光标移动到末尾
      range.collapse();
      // 插入不可见文本
      range.insertNode(unsaw);
      // 光标移动到末尾
      range.collapse();
      range.setEnd(unsaw, 1);
      range.setStart(unsaw, 1);
    },
    submit() {
      this.inputText = this.$refs.refAtInput.innerText
        .trim()
        .replace(/\u200B/g, "");
      this.inputHTML = this.$refs.refAtInput.innerHTML;

      const { volid, volidStr, expressStr } = this.getParams(
        this.inputText,
        this.selectIds
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
      this.volid = volid;
      this.expressStr = expressStr;
      this.volidStr = volidStr;
    },
    /**
     * @str 视图显示字符串
     * @list  参数集合
     * @key  表达式
     */
    getParams(str, data) {
      let catchStr = str;
      data.forEach((v) => {
        str = str.replace(v.name, ".".repeat(v.name.length));
      });
      return { ...this.getExpress(catchStr, data) };
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
        expressStr = expressStr.replace(v.name, v.key);
        volidStr = volidStr.replace(v.name, v.value);
      });

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
        if (typeof rest === "undefined") return 1;
        if (typeof rest === "number" && restArr.includes(rest)) {
          return 3;
        }
        return 2;
      } catch (error) {
        return 3;
      }
    },
    showMessage({ message, type, duration }) {
      this.$message({
        showClose: true,
        message,
        type,
        duration,
      });
    },
    diff(obj1, obj2) {
      var o1 = obj1 instanceof Object;
      var o2 = obj2 instanceof Object;
      // 判断是不是对象
      if (!o1 || !o2) {
        return obj1 === obj2;
      }

      //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
      //例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
      }

      for (var o in obj1) {
        // 遍历对象 fon in 循环 o 为 对象的属性名
        var t1 = obj1[o] instanceof Object;
        var t2 = obj2[o] instanceof Object;
        if (t1 && t2) {
          return this.diff(obj1[o], obj2[o]);
        } else if (obj1[o] !== obj2[o]) {
          console.log("false");
          return false;
        }
      }
      return true;
    },
    getIndex(node) {
      if (node.previousElementSibling) {
        this.insertIndex++;
        this.getIndex(node.previousElementSibling);
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);

      this.activeName = tab.index;
    },
    async insertCursor(item) {
      if (this.activeName === "1") {
        this.select(item, "insertCursor");
      } else {
        const input = this.$refs.refAtInput;
        input.focus();
        const selection = getSelection();
        const range = selection?.getRangeAt(0);

        range.setStart(this.focusNode, this.focusOffset);
        range.setEnd(this.focusNode, this.focusOffset);

        const textNode = document.createTextNode(item.name);
        range.insertNode(textNode);
        range.collapse();
        if (item.name.indexOf("(") !== -1) {
          range.setEnd(textNode, item.name.length - 1);
          range.setStart(textNode, item.name.length - 1);
        }
      }
    },
    /**
     * @focusNode 缓存光标所在节点
     * @focusOffset 缓存光标所在节点位置
     * @desc 记录光标位置
     */
    recordRange() {
      const selection = getSelection();
      const range = selection?.getRangeAt(0);
      // 缓存光标所在节点
      this.focusNode = selection?.focusNode;
      // 缓存光标所在节点位置
      this.focusOffset = selection?.focusOffset;
      const input = this.$refs.refAtInput;
      input.focus();
      range.setStart(this.focusNode, this.focusOffset);
      range.setEnd(this.focusNode, this.focusOffset);
    },
    spliceSelectIds(index, item) {
      this.selectIds.splice(index, 0, item);
    },
  },
  created() {},
  mounted() {
    const input = this.$refs.refAtInput;
    input.focus();
    this.initDom();
    this.observer = new MutationObserver((mutationsList) => {
      // 添加的元素
      // Array.from(mutationsList.map((e) => Array.from(e.addedNodes)))
      //   .flat()
      //   .filter((e) => e.nodeName === "SPAN")
      //   .map((e) => e.dataset.row)
      //   .forEach(
      //     (row) =>
      //       // !this.selectIds.includes(selectId) &&
      //       // this.selectIds.push(selectId)
      //       // {
      //       //   if (this.selectIds.find(v => v.selectIds))
      //       // }
      //       this.selectIds.splice(this.insertIndex, 0, JSON.parse())
      //   );

      Array.from(mutationsList.map((e) => Array.from(e.removedNodes)))
        .flat()
        .filter((e) => e.nodeName === "SPAN")
        .map((e) => e.dataset.selectId)
        .forEach((selectId) => {
          this.selectIds.find((v) => v.selectId === selectId) &&
            this.selectIds.splice(
              this.selectIds.findIndex((v) => v.selectId === selectId),
              1
            );
        });
    });

    this.observer.observe(input, {
      subtree: true, // 监听所有后代节点
      childList: true, // 监听后代节点增加删除
      attributes: true, // 监听属性
      characterData: true, // 监听字符数据变化
      attributeOldValue: true, // 记录变化前属性值
      characterDataOldValue: true, // 记录变化前字符值
    });
  },
  beforeDestroy() {},
};
</script>
<style lang="scss">
.example2 {
  padding: 40px;
  height: 100vh;
  box-sizing: border-box;

  #atInput {
    outline: none;
    height: 100px;
    font-size: 16px;
    min-height: 92px;
    padding: 16px 8px;
    line-height: 20px;
    border-radius: 8px;
    border: 1px solid #efefef;
    box-sizing: border-box;
    text-align: left;
    color: #409eff;
  }
}
.__at_span {
  color: #fff;
  display: inline-block;
  padding: 4px 14px;
  background-color: #67c23a;
  border-radius: 6px;
  margin: 0 2px;
  font-weight: bolder;
  font-size: 10px;
}

.about-slider-list {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px;
}
.result {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 20px;
}
</style>
