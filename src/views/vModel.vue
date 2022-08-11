<template>
  <div>
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vModel',
  data () {
    return {

    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: String,
  },
  methods: {


  },
  mounted () {
    console.log('vmodel ---', this.propsData)
  }
}
</script>

<style>
</style>