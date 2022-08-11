<template>
  <div class="hello">
    <h1>{{ name }}</h1>
    <span @click="consFn">改变name</span>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "sonHellow",
  inject: ["name", "that"],
  props: {
    msg: String,
  },
  methods: {
    consFn () {
      this.that.name = 'haha'
      console.log(this.name, this.that)
    }
  },
  mounted() {
    console.log('son-----hellow', this.name);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
