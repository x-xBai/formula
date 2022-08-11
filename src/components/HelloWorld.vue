<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div v-pre>说说 vue 内置指令</div>
    </div>
</template>

<script>
import { tableMixins } from "./../mixins/index.js";
export default {
    name: "HelloWorld",
    inject: ["name"],
    mixins: [tableMixins],
    props: {
        msg: String,
    },
    data() {
        return {
            list: [
                "hsha1",
                "hsha2",
                "hsha3",
                "hsha4",
                "hsha5",
                "hsha6",
                "hsha7",
            ],
            min: 2,
            obj: {
                a:1,
                b: {
                    a: 1,
                    b: 2,
                    c: 'hello'
                },
                d: 'hello',
                e: 'hello'
            }
        };
    },
    components: {
    },
    methods: {
        getMin() {
            // console.log("11111组件内", this);
            let fn = function(){
              console.log(this)
            }
            fn()
        },
    },
    created () {
        console.log('组件-----')
    },
    mounted() {
        console.log("hello ---- world", this.name);
        let o = {foo: this.getMin}
        this.getMin.bind(o)
        this.getMin();
        var arr = [1, 2, 3];

        for (let index in arr) {
            let res = index + 1;
            console.log(res, 'typeOf--- ' + typeof index );
        }
        o.foo()
        console.log(this.obj)
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
    cursor: pointer;
}
</style>
