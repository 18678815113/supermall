<template>
  <div class="Category">
    <nav-bar class="nav-bar">
      <div slot="center">
        商品分类
      </div>
    </nav-bar>
    <div class="cate-content">
      <CateLeftTab :leftList="CateGoodsList" @leftclick="leftclickindex"/>
      <cate-right-info :CateInfoItem="SubCategoryList"/>
    </div>
  </div>
</template>

<script>
  import CateLeftTab from './childComps/CateLeftTab'
  import {getCategory, getsubcategory} from "network/category";
  import NavBar from 'components/common/navbar/NavBar';
  import CateRightInfo from './childComps/CateRightInfo'

  export default {
    name: "Category",
    components: {
      NavBar,
      CateLeftTab,
      CateRightInfo
    },
    data() {
      return {
        CateGoodsList: [],
        SubCategoryList: []
      }
    },
    created() {
      this.getCategory()
    },
    methods: {
      getCategory() {
        getCategory().then(res => {
          this.CateGoodsList = res.data.category.list
        })
      },
      leftclickindex(index) {
        getsubcategory(this.CateGoodsList[index].maitKey).then(res => {
          this.SubCategoryList = res.data.list
        })
      }
    }
  }
</script>

<style scoped>
  .cate-content {
    display: flex;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: white;
  }
</style>
