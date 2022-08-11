<template>
  <div class="content">
    <!--文本框-->
    <div
      class="editor"
      ref="divRef"
      contenteditable
      @keyup="handkeKeyUp"
      @keydown="handleKeyDown"
    ></div>
    <!--选项-->
    <AtDialog
      v-if="showDialog"
      :visible="showDialog"
      :position="position"
      :queryString="queryString"
      @onPickUser="handlePickUser"
      @onHide="handleHide"
      @onShow="handleShow"
    ></AtDialog>
    <button @click="getDivRef">button</button>
  </div>
</template>
<script>
import AtDialog from "../components/AtDialog";
export default {
  name: "example",
  components: { AtDialog },
  data() {
    return {
      node: "", // 获取到节点
      user: "", // 选中项的内容
      endIndex: "", // 光标最后停留位置
      queryString: "", // 搜索值
      showDialog: false, // 是否显示弹窗
      position: {
        x: 0,
        y: 0,
      }, // 弹窗显示位置
    };
  },
  methods: {
    // 获取光标位置
    getCursorIndex() {
      const selection = window.getSelection();
      return selection.focusOffset; // 选择开始处 focusNode 的偏移量
    },
    // 获取节点
    getRangeNode() {
      const selection = window.getSelection();
      console.log("getRangeNode ---选择的结束节点---", selection);
      return selection.focusNode; // 选择的结束节点
    },
    // 弹窗出现的位置
    getRangeRect() {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0); // 是用于管理选择范围的通用对象
      console.log("弹窗出现的位置----", range.getClientRects()[0]);
      const rect = range.getClientRects()[0]; // 择一些文本并将获得所选文本的范围
      const LINE_HEIGHT = 30;
      return {
        x: rect.x,
        y: rect.y + LINE_HEIGHT,
      };
    },
    // 是否展示 #
    showAt() {
      const node = this.getRangeNode();
      console.log("showAt-----", node);
      if (!node || node.nodeType !== Node.TEXT_NODE) return false;
      const content = node.textContent || "";
      const regx = /#([^#\s]*)$/;
      const match = regx.exec(content.slice(0, this.getCursorIndex()));
      console.log("showAt-----", match);
      return match && match.length === 2;
    },
    // 获取 # 用户
    getAtUser() {
      const content = this.getRangeNode().textContent || "";
      const regx = /#([^#\s]*)$/;
      const match = regx.exec(content.slice(0, this.getCursorIndex()));

      console.log("getAtUser-------", match, match.length);
      if (match && match.length === 2) {
        return match[1];
      }
      return undefined;
    },
    // 创建标签
    createAtButton(user) {
      const btn = document.createElement("span");
      btn.style.display = "inline-block";
      btn.style.color = "skyblue";
      btn.dataset.user = JSON.stringify(user);
      btn.className = "at-button";
      btn.contentEditable = "false";
      btn.textContent = `#${user.name} `;
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.contentEditable = "false";
      const spaceElem = document.createElement("span");
      spaceElem.style.whiteSpace = "pre";
      spaceElem.textContent = "\u200b";
      spaceElem.contentEditable = "false";
      const clonedSpaceElem = spaceElem.cloneNode(true);
      wrapper.appendChild(spaceElem);
      wrapper.appendChild(btn);
      wrapper.appendChild(clonedSpaceElem);
      return wrapper;
    },
    replaceString(raw, replacer) {
      return raw.replace(/#([^#\s]*)$/, replacer);
    },
    // 插入#标签
    replaceAtUser(user) {
      const node = this.node;
      if (node && user) {
        const content = node.textContent || "";
        const endIndex = this.endIndex;
        const preSlice = this.replaceString(content.slice(0, endIndex), "");
        const restSlice = content.slice(endIndex);
        const parentNode = node.parentNode;
        const nextNode = node.nextSibling;
        const previousTextNode = new Text(preSlice);
        const nextTextNode = new Text("\u200b" + restSlice); // 添加 0 宽字符
        const atButton = this.createAtButton(user);
        parentNode.removeChild(node);
        // 插在文本框中
        if (nextNode) {
          parentNode.insertBefore(previousTextNode, nextNode);
          parentNode.insertBefore(atButton, nextNode);
          parentNode.insertBefore(nextTextNode, nextNode);
        } else {
          parentNode.appendChild(previousTextNode);
          parentNode.appendChild(atButton);
          parentNode.appendChild(nextTextNode);
        }
        // 重置光标的位置
        const range = new Range();
        const selection = window.getSelection();
        range.setStart(nextTextNode, 0);
        range.setEnd(nextTextNode, 0);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    },
    // 键盘抬起事件
    handkeKeyUp(e) {
      console.log("键盘抬起事件", e, e.keyCode);
      if (this.showAt()) {
        const node = this.getRangeNode();
        const endIndex = this.getCursorIndex();
        this.node = node;
        this.endIndex = endIndex;
        this.position = this.getRangeRect();
        this.queryString = this.getAtUser() || "";
        this.showDialog = true;
      } else {
        this.showDialog = false;
      }
    },
    // 键盘按下事件
    handleKeyDown(e) {
      console.log("键盘按下事件");
      if (this.showDialog) {
        if (
          e.code === "ArrowUp" ||
          e.code === "ArrowDown" ||
          e.code === "Enter"
        ) {
          e.preventDefault();
        }
      }
    },
    // 插入标签后隐藏选择框
    handlePickUser(user) {
      this.replaceAtUser(user);
      this.user = user;
      this.showDialog = false;
    },
    // 隐藏选择框
    handleHide() {
      this.showDialog = false;
    },
    // 显示选择框
    handleShow() {
      this.showDialog = true;
    },
    getDivRef() {
      console.log("-------", this.$refs.divRef.innerHTML);
      console.log("----", this.getRangeNode());
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  font-family: sans-serif;

  h1 {
    text-align: center;
  }
}

.editor {
  margin: 0 auto;
  width: 600px;
  height: 150px;
  background: #fff;
  border: 1px solid blue;
  border-radius: 5px;
  text-align: left;
  padding: 10px;
  overflow: auto;
  line-height: 30px;

  &:focus {
    outline: none;
  }
}
</style>
