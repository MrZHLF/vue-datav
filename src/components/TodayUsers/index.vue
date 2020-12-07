<template>
    <common-card title="今日交易用户量" :value="orderUser">
      <template>
        <v-chart :options="getOptions()" />
      </template>
      <template v-slot:footer>
        <span>退货率 </span>
        <span class="emphasis">{{returnRate}}</span>
      </template>
    </common-card>
</template>

<script>
import commonCardMixin from './../../mixins/commonCardMixin.js';
import commonDataMixin from './../../mixins/commonDataMixin.js';
  export default {
    mixins: [commonCardMixin,commonDataMixin],
    methods: {
      getOptions() {
        return {
          color:['#3398DB'],
          tooltip:{},
          xAxis:{
            type:'category',
            show:false, //坐标
            boundaryGap:false, //默认距x轴两侧间距
            data:this.orderUserTrendAxis
          },
          yAxis:{
            show:false //坐标
          },
          series:[
            {
              type:"bar",
              data:this.orderUserTrend,
              barWidth:"60%"
            }
          ],
          grid:{ //位置
            top:0,
            left:0,
            right:0,
            bottom:0
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>