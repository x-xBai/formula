<template>
    <div class="slot-default">
        <slot :msg="msg" class="className" text="hello" :data="arr"
            >我是子组件的默认slot</slot
        >
    </div>
</template>

<script>
export default {
    name: 'slotComp',
    data () {
        return {
            msg: '我是子组件的msg',
            arr: [1, 2, 3, 4]
        }
    },
    methods: {

    },
    mounted () {

    }
}
</script>

<style>
</style>