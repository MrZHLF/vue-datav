<template>
  <ve-liquidfill :data="chartData" height="100%" :settings="chartSettings"></ve-liquidfill>
</template>

<script>
import commonDataMixin from '../../mixins/commonDataMixin'
function getColor(value) {
  return value > 0 && value <= 0.5 ? 'rgba(97,216,0,.7)' : value > 0.5 && value <= 0.8? 'rgba(204,178,26,.7)' : value > 0.8 ? 'rgba(241,47,28,.7)' : '#c7c7cb'
}
  export default {
    mixins:[commonDataMixin],
    name:'LiquidFill',
    data() {
      return {
        chartData: {},
        chartSettings: {}
      }
    },
    watch: {
      userGrowthLastMonth() {
        console.log(this.userGrowthLastMonth,'6');
        let sum = this.userGrowthLastMonth / 100 ? this.userGrowthLastMonth / 100 : 0
        this.chartData= {
          columns: ['title', 'percent'],
          rows: [{
            title: 'rate',
            percent:sum
          }]
        
        }
        this.chartSettings= {
          seriesMap: {
            'rate': {
              radius: '80%',
              label: {
                // normal: {
                  formatter: (v) =>{
                    return `${(v.data.value * 100).toFixed(2)}`
                  },
                  textStyle: { //设置文字样式
                    fontSize:36,
                    color: '#999',
                    fontWeight: 'normal'
                  },
                  position:['50%','50%'], //位置
                // },
                insideColor: '#fff', //波浪超出文字定制颜色
              },
              outline: { //边框设置
                itemStyle: {
                  borderColor:'#aaa4a4', //边框颜色
                  borderWidth:1, //边框宽度
                  color:'none', //颜色
                  shadowBlur:0, //阴影
                  shadowColor:'#fff' //阴影颜色
                },
                borderDistance:0, //外边距和内边距融合
              },
              backgroundStyle: {
                //背景颜色
                color:'#fff'
              },
              itemStyle: {
                //背景阴影设置
                shadowBlur: 0, 
                shadowColor: '#fff'
              },
              amplitude: 8, //波纹
              color:[getColor(this.chartData.rows[0].percent)]
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>