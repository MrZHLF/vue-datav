<template>
    <common-card title="累计订单量" :value="orderToday">
      <template>
        <v-chart :options="getOptions()" />
      </template>
      <template v-slot:footer>
        <span>昨日销售额 </span>
        <span class="emphasis">{{orderLastDay}}</span>
      </template>
    </common-card>
</template>

<script>
import commonCardMixin from './../../mixins/commonCardMixin.js';
import commonDataMixin from './../../mixins/commonDataMixin.js';
  export default {
    mixins: [commonCardMixin,commonDataMixin],
    mounted () {
      
    },
    methods: {
      getOptions() {
        return  this.orderTrend.length > 0 ?{
          xAxis:{
            type:'category',
            show:false, //坐标
            boundaryGap:false, //默认距x轴两侧间距
          },
          yAxis:{
            show:false //坐标
          },
          series:[
            {
              type:"line",
              data: this.orderTrend,
              areaStyle:{
                color:'purple' //填充颜色
              },
              smooth:true,
              lineStyle:{ //数据线条
                width:0
              },
              itemStyle:{ //点
                opacity:0
              }
            }
          ],
          grid:{ //位置
            top:0,
            left:0,
            right:0,
            bottom:0
          }
        } : null
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>