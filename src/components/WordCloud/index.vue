<template>
  <ve-wordcloud :data="chartData" height="100%" :settings="chartSettings"></ve-wordcloud>
</template>

<script>
import commonDataMixin from '../../mixins/commonDataMixin'
  export default {
    mixins:[commonDataMixin],
    watch: {
      wordCloud() {
        const data=[]
        this.wordCloud.forEach(item => {
          console.log(item,'5');
          data.push({
            name:item.word,
            value:item.count
          })
        })
        this.chartData = {
          columns: ['name', 'value'],
          rows: data
        }
      }
    },
    data() {
      return {
        chartData:{},
        chartSettings: {
          // color:['rgba(97,216,0,.7)']
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>