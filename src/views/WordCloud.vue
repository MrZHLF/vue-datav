<template>
  <div id="container"></div>
</template>

<script>
import 'echarts-wordcloud'
  export default {
    mounted () {
      const data=[{
        name:'慕课网',
        value:100
      },{
        name:'数据可视化',
        value:50
      },{
        name: '小周',
        value: 20
      },{
        name:"郑州",
        value:120
      },{
        name:'河南',
        value:200
      },{
        name:'上海',
        value: 80
      }]
      const chart = this.$echarts.init(document.getElementById('container'))
      chart.setOption({
        series:[{
          type:'wordCloud',
          data,
          shape:'circle',
          textStyle: {
            normal: {
              color: function () {
                return 'rgb(' + [
                  Math.round(Math.random() * 255),
                  Math.round(Math.random() * 255),
                  Math.round(Math.random() * 255)
                ].join(',') + ')';
              },
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
        }]
      })
    }
  }
</script>

<style lang="scss" scoped>
  #container {
    width: 100%;
    height: 100%;
  }
</style>