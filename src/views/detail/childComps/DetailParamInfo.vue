<template>
  <div id="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table v-for="(table, index) in paramInfo.sizes"
           class="info-size" :key="index">
      <tr v-for="(tr, indexY) in table" :key="indexY">
        <td v-for="(td, indexZ) in tr" :key="indexZ">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.infos">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailParamInfo",
    props: {
		  paramInfo: {
		    type: Object,
        default: {}
      }
    }
	}
</script>

<style scoped>
  #param-info {
    font-size: 14px;
    padding: 20px 10px;
    background-color: #fff;
  }
  #param-info table {
    width: 100%;
    border-collapse: collapse;
  }
  .info-size tr {
    height: auto;
    line-height: 30px;
    display: flex;
  }
  .info-size tr:nth-child(1) {
    background-color: lightgray;
  }
  .info-size tr, .info-param tr {
    border-bottom: 1px solid rgba(0, 0, 0, .15);
  }
  .info-size tr td, .info-param tr td {
    padding: 3px;
  }
  .info-size tr:first-child td:not(td:first-child) {
    line-height: normal;
    padding: 10px 3px;
  }
  .info-size tr:first-child td:first-child {
    align-self: center;
  }
  .info-size tr td:first-child {
    width: 20%;
  }
  .info-size tr td:not(td:first-child) {
    flex: 1;
    text-align: center;
  }
  .info-param {
    margin-top: 10px;
  }
  .info-param tr {
    height: 40px;
  }
  .info-param tr td:first-child {
    width: 40%;
  }
  .info-param-key {
    min-width: 100px;
  }
  .param-value {
    color: var(--color-tint);
  }
  .info-img img {
    width: 100%;
  }
</style>
