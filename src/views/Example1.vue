<template>
  <div class="example1">
    <Editor
      style="height: 500px; border: 1px solid #ccc; text-align: left"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
    <div class="box-btn">
      <el-button @click="fullScreen">全屏</el-button>
      <el-button @click="unFullScreen">关闭全屏</el-button>
      <el-button @click="getText">获取纯文本</el-button>
      <el-button @click="getHtml">getHtml</el-button>
      <el-button @click="getFragment">获取选中的内容</el-button>
      <el-button @click="getSelectionPosition">获取选区的定位</el-button>
      <el-button @click="getNodePosition">获取某个节点的定位</el-button>
    </div>

    <el-select
      v-model="value"
      filterable
      placeholder="请选择"
      :style="cardStyle"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { Editor } from "@wangeditor/editor-for-vue";
// import { Boot } from "@wangeditor/editor";
// import mentionModule from "@wangeditor/plugin-mention";
// Boot.registerModule(mentionModule);
export default {
  name: "example1",
  components: {
    Editor,
  },
  data() {
    return {
      editor: null,
      content: "",
      html: "pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = ppos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posN'pos.to posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = pos+ 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'pos.top = posNum + 40 + 'px'",
      editorConfig: {
        placeholder: "请输入公式",
        autoFocus: true,
      },
      mode: "default",
      cardStyle: {},
      clientW: document.documentElement.clientWidth,
      clientH: document.documentElement.clientHeight,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  methods: {
    onCreated(editor) {
      editor.focus(true);
      console.log("onCreated----", editor);
      this.editor = Object.seal(editor);
    },
    // 开启全屏
    fullScreen() {
      this.editor.fullScreen();
    },
    unFullScreen() {
      this.editor.unFullScreen();
    },
    getText() {
      let str = this.editor.getText();
      console.log(str);
    },
    getHtml() {
      let html = this.editor.getHtml();
      console.log(html);
    },
    getFragment() {
      let str = this.editor.getFragment();
      console.log(str);
    },
    getSelectionPosition() {
      // let w1 = 200;
      const { clientH, clientW } = this;
      let { right, top, bottom, left } = this.editor.getSelectionPosition();
      const { x, y, width, height } = this.editor
        .getEditableContainer()
        .getBoundingClientRect();

      this.cardStyle = {};

      console.log("x:" + x, "y: " + y, "width: " + width, "height: " + height);
      console.log(
        "初始化前",
        "right:" + right,
        "top: " + top,
        "bottom: " + bottom,
        "left: " + left
      );
      if (bottom) {
        this.cardStyle.bottom = bottom;
      }
      if (right) {
        this.cardStyle.right = right;
      }
      if (top) {
        this.cardStyle.top = top;
      }
      if (left) {
        this.cardStyle.left = left;
      }

      console.log(
        "初始化后",
        "right:" + right,
        "top: " + top,
        "bottom: " + bottom,
        "left: " + left
      );
      console.log("cardStyle: ", this.cardStyle);
      console.log(
        "document.fullScreen-----",
        width,
        height,
        // "remainBottom: " + remainBottom,
        // "remainRight: " + remainRight,
        "clientW: " + clientW,
        "clientH: " + clientH
      );
    },
    getW(size, unit) {
      size -= unit;
      if (size <= 0) size = 0;
      return size;
    },
    getH(size, unit) {
      console.log("getH ---", size, unit);
      if (size >= unit) return size;
      if (size < unit) return size;
    },
    getNodePosition() {
      // let pos = this.editor.getNodePosition(node);
      // console.log(pos);
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss">
.example1 {
  padding: 40px;
  height: 100vh;
  box-sizing: border-box;

  .el-select {
    position: fixed;
  }
  .box-btn {
    z-index: 2000;
    position: relative;
  }
}
</style>
