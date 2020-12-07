<template>
  <div class="home">
    <TopView />
    <SalesView/>
    <BottomView/>
    <MapView/>
  </div>
</template>
<script>
  import BottomView from './../components/BottomView/index';
  import MapView from './../components/MapView/index';
  import SalesView from './../components/SalesView/index';
  import TopView from './../components/TopView/index';
  import { wordcloud, mapScatter, screenData } from './../api/index'
export default {
  name: 'Home',
  components: {
    BottomView,
    MapView,
    SalesView,
    TopView
  },
  data() {
    return {
      reportData:null,
      wordCloud:null,
      mapData:null
    }
  },
  methods: {
    getReportData() {
      return this.reportData
    },
    getWordCloud() {
      return this.wordCloud
    },
    getMapData() {
      return this.mapData
    }
  },
  provide() {
    return {
      getReportData: this.getReportData,
      getWordCloud: this.getWordCloud,
      getMapData: this.getMapData
    }
  },
  mounted () {
    screenData().then(data=> {this.reportData = data})
    wordcloud().then(data=> {this.wordCloud = data})
    mapScatter().then(data=> {this.mapData = data})
  }
}
</script>
<style lang="scss">
.home {
  width: 100%;
  padding: 20px;
  background: #eee;
  box-sizing: border-box;
}
</style>