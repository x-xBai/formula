<template>
  <div>test</div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "test",
  props: {
    // id: {
    //   type: String,
    //   default: () => "",
    // },
  },
  data() {
    return {
      // selfObj: {},
      id: uuidv4(),
    };
  },
  mounted() {
    this.$emit("mounted", this.id);
  },
  beforeDestroy() {
    this.$emit("beforeDestroy", this.id);
  },
  destroyed() {
    this.$emit("destroyed", this.id);
  },
};
</script>

<style lang="scss"></style>
