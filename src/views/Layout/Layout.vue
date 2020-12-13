<template>
  <div id="layout">
      <Header />
      <router-view id="router"></router-view>
      
  </div>
</template>

<script>
import Header from "./Header/Header"
export default {
    name: "Layout",
    components: {
        Header
    },
    beforeCreate(){
      if(!sessionStorage.getItem('token')){
        location.replace("/paperhub/manager/");
      }else{
        this.$http.post(this.domain + 'user/authentication',{},{
          headers : {
            "token" : sessionStorage.getItem('token')
          }
        })
        .then(res=>{
          if(res.data.code != 1) {
            location.replace('/paperhub/manager/');
          }
        })
      }
    }
}
</script>

<style lang="scss" scoped>
#layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  #router {
    width: calc(100% - 300px);
    height: 100vh;
    overflow: auto;
    left: 300px;
    background-color: rgb(245, 246, 250);
  }
}
</style>