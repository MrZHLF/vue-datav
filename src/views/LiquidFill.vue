<template>
  <div id="contianer">
  </div>
</template>

<script>
import 'echarts-liquidfill'
  export default {
    name:'LiquidFill',
    mounted () {
      const chart = this.$echarts.init(document.getElementById('contianer'))
      chart.setOption({
        series:[{
          type: 'liquidFill',
          data: [0.6, 0.5, 0.4, 0.3],
          outline: {
            show: false
          },
          label: {
            fontSize: 15
          },
          shape: 'circle'
        }]
      })
    }
  }
</script>

<style lang="scss" scoped>
  #contianer {
    width: 100%;
    height: 100%;
  }
</style>