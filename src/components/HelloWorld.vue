<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a-button type="primary">primary</a-button>
  </div>
</template>

<script>
// import {Button} from 'ant-design-vue';
export default {
  name: 'HelloWorld',
  // components:{
  //   AButton:Button
  // },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
