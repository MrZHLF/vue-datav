<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-data">{{userCount}}</div>
                <v-chart :options="searchUserOption" />
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">{{serachCount}}</div>
                <v-chart :options="searchNumberOption" />
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData" style="height:285px">
                <el-table-column prop="rank" label="排名" />
                <el-table-column prop="keyword" label="关键词" />
                <el-table-column prop="count" label="总搜索量" />
                <el-table-column prop="users" label="搜索用户数" />
                <el-table-column prop="range" label="搜索占比" />
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                background
                @current-change="onPageChange"
              />
            </div>
          </div>
        </template>
      </el-card>
    </div>
    
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <div class="radio-wrapper">
              <el-radio-group v-model="radioSelect" size="small" @change="onPiceChar">
                <el-radio-button label="品类"></el-radio-button>
                <el-radio-button label="商品"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <v-chart :options="categoryOptions" />
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import commonDataMixin from '../../mixins/commonDataMixin'
 const colors = ['#8d7fec', '#5085f2', '#f8726b', '#e7e702', '#78f283', '#4bc1fc']
import { wordcloud } from './../../api/index'
  export default {
    mixins:[commonDataMixin],
    name:"BottomView",
    data() {
      return {
        searchUserOption: {},
        searchNumberOption:{},
        tableData:[],
        totalData: [],
        total:0,
        pageSize:4,
        userCount:0,
        serachCount:0,
        radioSelect: '品类',
        categoryOptions:{}
      }
    },
    mounted(){
      this.renderPieChart()
    },
    created() {
      const totalData = []
        wordcloud().then(res => {
          res.forEach((item,index) => {
            totalData.push({
              id: index + 1,
              rank: index + 1,
              keyword: item.word,
              count: item.count,
              users: item.user,
              range: `${((item.user / item.count) * 100).toFixed(2)}%`
            })
          })
          this.totalData = totalData
          this.total = this.totalData.length
          this.renderTable(1)
          this.userCount =  this.format(totalData.reduce((s,i) => i.users + s,0))
          this.serachCount = this.format(totalData.reduce((s,i) => i.count + s,0))
          this.renderLineChart()
        })
    },
    methods: {
      onPiceChar(type) {
        this.radioSelect = type
        this.renderLineChart()
      },
      renderLineChart() {
        const createOption = (key) => {
          let axis = []
          let data = []
          this.totalData.forEach(item => {
           data.push(item[key])
          })
          // this.totalData.forEach(item => axis.push(item[count]))
          return {
            xAxis:{
              type:'category',
              show:false, //坐标
              boundaryGap:false, //默认距x轴两侧间距
              data: axis,
            },
            yAxis:{
              show:false //坐标
            },
            tooltip:{},
            series:[{
              type: 'line',
              data,
              areaStyle: {
                color: 'rgba(95,187,255,.5)'
              },
              lineStyle: {
                color: 'rgb(95,187,255)'
              },
              itemStyle: {
                opacity: 0
              },
              smooth: true
            }],
            grid: {
              top:0,
              left:0,
              right:0,
              bottom:0
            }
          }
        }
        this.searchUserOption = createOption('users')
        this.searchNumberOption = createOption('count')
      },
      renderTable(page) {
        this.tableData  = this.totalData.slice((page - 1) * this.pageSize,(page - 1) * this.pageSize + this.pageSize)
      },
      onPageChange(page) {
        this.renderTable(page)
      },
      renderPieChart() {
        if (!this.category1.data1 || !this.category2.data1) {
          return
        }
        let data
        let axis
        let total = 0
        if (this.radioSelect === '品类') {
          data = this.category1.data1.slice(0, 6)
          axis = this.category1.axisX.slice(0, 6)
          total = data.reduce((s, i) => s + i, 0)
        } else {
          data = this.category2.data1.slice(0, 6)
          axis = this.category2.axisX.slice(0, 6)
          total = data.reduce((s, i) => s + i, 0)
        }
        const chartData = []
        data.forEach((item,index) => {
          const percent = `${(item / total * 100).toFixed(2)}%`
          chartData.push({
            legendname:axis[index],
            value:item,
            percent,
            itemStyle: {
              color: colors[index]  
            },
            name: `${axis[index]} | ${percent}`
          })
        })
        this.categoryOptions = {
          title:[{
            text: `${this.radioSelect}分布`,
            textStyle: {
              fontSize: 14,
              color:'#666'
            },
            left: 20,
            top: 20
          },{
            text:'累计订单量',
            subtext:total,
            x:'34.5%',
            y:'42.5%',
            textStyle: {
              fontSize: 14,
              color: '#999'
            },
            subtextStyle: { //副标题
              fontSize: 28,
              color: '#333'
            },
            textAlign: 'center'
          }],
          series:[{
            name:'品类分布',
            type:'pie',
            data:chartData,
            label: {
              normal: {
                show:true,
                position: 'outter', //显示位置
                formatter:function(params) {
                  return params.data.legendname //名称
                }
              }
            },
            center:['35%','50%'], //以中心移动位置
            radius:['45%','60%'], //半径 设置空心
            labelLine: { //文字表述线条
              normal:{
                length:5,
                length2: 3,
                smooth: true
              }
            },
            clockwise:false, //排序顺序 
            itemStyle: { //空白间距
              borderWidth: 4, //间隔
              borderColor: '#fff' //颜色
            }
          }],
          legend:{ //内容文字展示
            type: 'scroll',
            orient: 'vertical', //水平排列
            height: 250,
            left: '70%',
            top:"middle",
            textStyle: {
              color:'#8c8c8c'
            }
          },
          tooltip: { //鼠标放入显示
            trigger: 'item',
            formatter: function(params) {
              const str = params.seriesName + '<br/>' +  params.marker + params.data.legendname + '<br/>' + '数量:' + params.data.value + '<br/>'+ '占比:' + params.data.percent + '%'
              return str
            }
          }
        }
      },
     format(v) {
        const reg = /\d{1,3}(?=(\d{3})+$)/g
        return `${v}`.replace(reg,'$&,')
      }
    },
    watch: {
      category1() {
        this.renderPieChart()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .bottom-view {
    display: flex;
    margin-top: 20px;

    .view {
      flex: 1;
      width: 50%;
      box-sizing: border-box;

      &:first-child {
        padding: 0 10px 0 0;
      }

      &:last-child {
        padding: 0 0 0 10px;
      }

      .title-wrapper {
        display: flex;
        align-items: center;
        height: 60px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        font-weight: 500;
        padding: 0 0 0 20px;

        .radio-wrapper {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          padding-right: 20px;
        }
      }

      .chart-wrapper {
        display: flex;
        flex-direction: column;
        height: 452px;

        .chart-inner {
          display: flex;
          padding: 0 10px;
          margin-top: 20px;

          .chart {
            flex: 1;
            padding: 0 10px;

            .chart-title {
              color: #999;
              font-size: 14px;
            }

            .chart-data {
              font-size: 22px;
              color: #333;
              font-weight: 500;
              letter-spacing: 2px;
            }

            .echarts {
              height: 50px;
            }
          }
        }

        .table-wrapper {
          flex: 1;
          margin-top: 20px;
          padding: 0 20px 20px;

          .el-pagination {
            display: flex;
            justify-content: flex-end;
            margin-top: 15px;
          }
        }
      }
    }
  }
</style>
