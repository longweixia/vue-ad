<template>
  <!-- 保存后，推荐简历 -->
  <!-- 这里为什么把props里面的modalTips放在父组件来控制，而不用直接放在v-model来控制组件的显示：
  因为v-model的值如果直接取props的值，那么点击确定或者取消会默认的改变props的值，vue是不允许直接改props的，
  所以我们可以弄个镜像，通过data中的isshow这个变量来改变显示隐藏-->
  <div v-if="modalTips">
    <!-- <Button class="bntn" type="primary" @click="modal1 = true">Display dialog box</Button> -->
    <Modal
      v-model="isshow"
      title="已为您生成3个主题简历"
      @on-ok="ok"
      @on-cancel="cancel"
      :mask-closable="false"
    >
      <div class="zm-banner">
        <div @mouseenter="templateMask=3"
        @mouseleave="templateMask=0" class="template-recom" :class="templateMask==3?'template-mask':''">
          <h2 class="jm-title">
            模板3
          </h2>
           <div @click="saveTemplate(3)" class="jm-save-btn">保存为简历</div>
           <div @click="gotoResumeTemplate(index)" class="jm-save-btn jm-router"
          >进入此模板</div>
          <Template3 showFind="1" class="jm-content"></Template3>
        </div>

        <div class="jm-border"></div>
        <div class="template-recom" @mouseenter="templateMask=4"
        @mouseleave="templateMask=0" :class="templateMask==4?'template-mask':''">
          <h2 class="jm-title">模板4</h2>
           <div @click="saveTemplate(4)" class="jm-save-btn">保存为简历</div>
           <div @click="gotoResumeTemplate(index)" class="jm-save-btn jm-router"
          >进入此模板</div>
          <Template4 showFind="1" class="jm-content"  ></Template4>
        </div>
        <!-- <div>点击生成更多主题简历</div> -->
      </div>
    </Modal>
  </div>
</template>
<script>
// import Swiper from "swiper";
// import "swiper/dist/css/swiper.min.css";
import Bus from "@/assets/event-bus.js";
// 由于进入Template3或者Template4时都会调用getTemplatesResume接口，而这个
// 接口需要传TemplateId值为路由的id，当在Template3页面引入这两个模板时，路由id为3
// 所以初始化时这个两个模板传的数据是一样的
import Template3 from "./../WriteResumeTemplate/Template3";
import Template4 from "./../WriteResumeTemplate/Template4";
export default {
  name: "recommendResume",
  props: ["modalTips"],
  components: {
    Template3,
    Template4
  },
  data() {
    return {
      isshow: true,
      templateMask:"",//遮罩层
    };
  },
  watch: {
    modalTips: {
      handler(newVal, oldVal) {
        console.log(newVal);
        newVal ? (this.isshow = true) : (this.isshow = false);
      },
      deep: true
    }
  },
  methods: {
    // 使用此模板
    saveTemplate(id){
      // 出发对应模板的保存事件
      Bus.$emit("saveRecommend",id)
    },
    // 进入简历模板
    gotoResumeTemplate(index){
      console.log(index+1,"进入模板")
      this.$router.push({
        // name: "writeResumeTemplate"+(index+1)
        name: "writeResumeIde",
        query:{
          id:index+1
        }
 
      });
      // 解决模板引入需要刷新才改变视图的问题
       window.location.reload();
    },
    ok() {
      Bus.$emit("closeModel", false);
    },
    cancel() {
      Bus.$emit("closeModel", false);
    },
    //   enter(name) {
    //     console.log(111)
    //   this.templateMask = name;
    // },
    // leave(name) {
    //   // this.templateMask = 0;
    // },
  },
  mounted() {
    // var mySwiper = new Swiper(".swiper-container", {
    //   //   autoplay: true,
    //   //   delay: 2000, //2秒切换一次
    //   //   loop: true,
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination",
    //     scrollbar: ".swiper-scrollbar",
    //     // 如果需要分页器
    //     pagination: ".swiper-pagination",
    //     // 如果需要前进后退按钮
    //     nextButton: ".swiper-button-next",
    //     prevButton: ".swiper-button-prev"
    //   }
    // });
  }
};
</script>
<style lang="less" scoped>
.bntn {
  position: absolute;
}
/deep/ .ivu-modal-body {
  min-height: 340px;
  height: 500px;
  overflow: auto;
}
/deep/.ivu-modal {
  width: 900px !important;
}
// banner
.zm-banner {
  z-index: 100;
  .jm-border {
    border: 10px solid #fff;
  }
  .template-recom {
    // text-align: center;
    position: relative;
    padding-bottom: 15px;
    // background: #ddd;
    .jm-title {
      text-align: center;
      background: #fff;
    }
  }
  // 遮罩层
  .template-mask::before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 31px;
    left: 18px;
    width: 814px;
    height: calc(100% + -46px);
    background: #666;
    opacity: 0.2;
  }
}
 .jm-save-btn {
  position: absolute;
  padding: 5px;
  background-color: #00c190;
  color: white;
  border-radius: 4px;
  border: none;
  // width: 60px;
  // height: 30px;
  line-height: 30px;
  text-align: center;
  vertical-align: middle;
  left: 50%;
  margin-left: -30px;
  top: 50%;
  z-index: 1000;
  cursor: pointer;
}
.jm-router{
  top: 55%;
}
</style>