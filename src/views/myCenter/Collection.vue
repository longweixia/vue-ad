<template>
<!-- 我的收藏 -->
  <div>
    <!-- 这里收藏也引入myCenter组件，所以刚引入进来的mycenteropenNames是1-1，这也就是当点击收藏进入收藏页面的时候，
    第一次点击,mycenter相当于出书画还是引入进来的状态，第二次点击才会选择收藏的状态，所以要用变量，且变量要由mycenter改变 -->
    <myCenter :bread="breadText" :openNames="openNames"></myCenter>
    <div class="center-right">
      <ul v-if="!showMsg" class="jm-ul">
      
        <li class="jm-li" v-for="(item, index) in imgList" :key="index">
            <span>{{item.mallId}}</span>
          <img
            class="jm-img"
           :src="item.imgUrl"
          />

          <!-- 遮罩层 -->
          <div
            @mouseenter="enter(index)"
            @mouseleave="leave(index)"
            class="jm-mask"
            :class="current == index ? jmMaskOpacity : ''"
          >
            <Icon
              size="35"
              class="jm-bigger"
              type="ios-add-circle-outline"
              @mouseenter.native="enterIcon(index)"
              @mouseleave.native="leaveIcon(index)"
            />
            <Button
              @click="gotoResumeTemplate(item.mallId)"
              class="jm-btn"
              shape="circle"
              icon="ios-search"
              >编辑简历</Button
            >
            <Button
              @click="cancle(index,item.mallId)"
              class="jm-btn jm-btn-delete"
              shape="circle"
              icon="ios-trash"
              >取消收藏</Button
            >
          </div>
          <div class="jm-preview" v-show="currentIcon == index">
            <img
              :class="isRightImg ? 'rightPreview' : 'leftPreview'"
              :src="item.imgUrl"
            />
          </div>
        </li>
      </ul>
      <div v-if="showMsg" class="msg-info">
        您还没有收藏的简历数据呢，请在
        <span class="msg-router" @click="gotoTemplateMall"
          >模板商城页面</span
        >
        收藏您喜欢的简历模板。
      </div>
    </div>
  </div>
</template>

<script>
import myCenter from "./MyCenter";
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import Bus from "@/assets/event-bus.js";

export default {
  name: "collection",
  data() {
    return {
      imgList: [], //首页图片列表
      jmMaskOpacity: "", //图片列表遮罩层的透明度
      current: 0, //当前悬浮图片的位置
      currentIcon: -1, //当前悬浮预览图标
      isRightImg: false, //是否是右边图
      showMsg: false, //是否显示没有图片的提示
      breadText:"我的收藏",//面包屑文字
      openNames:"1-2"//点击哪一项的标识
    };
  },
  components: {
    myCenter: myCenter,
      NavHeader,
    NavFooter,
  },
  methods: {
    //删除简历
    cancle(index,name) {
       this.axios.post("collections/resume", {
        userName: localStorage.getItem("userName"), //暂时写死，到时候用vuex
        mallId:name
      }).then(res => {
        if(res.data.status=="2"){
          this.imgList.splice(index,1)
          if(this.imgList==""){
             this.showMsg = true;
             return
           }else{
             this.showMsg = false;
           }
        }
         
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 进入简历模板商城页面
    gotoTemplateMall() {
      this.$router.push({
        // name: "writeResumeTemplate"+(index+1)
        name: "templateMall"
      });
    },
    // 进入简历模板
    gotoResumeTemplate(index) {
      this.$router.push({
        // name: "writeResumeTemplate"+(index+1)
        name: "writeResumeIde",
        query: {
          id: index
        }
      });
      // 解决模板引入需要刷新才改变视图的问题
      window.location.reload();
    },
    // 鼠标悬浮图片
    enter(index) {
      this.current = index;
      this.jmMaskOpacity = "jmMaskOpacity";
    },
    //鼠标离开图片
    leave(index) {
      this.current = index;
      this.jmMaskOpacity = "";
    },
    // 鼠标悬浮预览图标
    enterIcon(index) {
      this.isRightImg =
        index == parseInt(index / 4) * 4 + 2 ||
        index == parseInt(index / 4) * 4 + 3;
      this.currentIcon = index;
    },
    //鼠标离开预览图标
    leaveIcon(index) {
      this.currentIcon = -1;
    },

    // 获取图片列表
    getImgList() {
      this.axios
        .get("collections/getResume", {
          params: {
         userName: localStorage.getItem("userName") //暂时写死，到时候用vuex
        }
        })
        .then(res => {
          if (res.data.status == "0") {
          this.imgList = res.data.result;
          //  如果获取不到数据，就不执行，防止后面获取属性值：null.xxx报错
           if(!this.imgList || this.imgList==""){ 
             this.showMsg = true;
             return
           }else{
             this.showMsg = false;
           }
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.getImgList();
      Bus.$on("postOpenNames", (data) => {
      this.openNames = data
      
    })
  }
};
</script>

<style lang="less" scoped>
.center-right {
  position: absolute;
  top: 80px;
  left: 240px;
  margin: 10px;
  .jm-ul {
    margin-top: 20px;
    .jm-li {
      text-align:  center;
      width: 25%;
      float: left;
      .jm-img {
       background: #ddd;
        height: 350px;
        width: 250px;
        padding: 10px;
      }
    }
  }
}
// 遮罩层
.jm-mask {
  position: relative;
  text-align: center;
  height: 350px;
  width: 250px!important;
  padding: 10px;
  margin-top: -356px;
  margin-left: 15px;
  float: left;
  background-color: rgba(0, 192, 145, 0.5);
  opacity: 0;
  width: 100%;
  left: 0;
  right: 0;
  // bottom: 0;
  .jm-btn {
    position: relative;
    top: 50%;
    font-size: 20px;
    transform: translate(0, -50%);
  }
  .jm-bigger {
    position: absolute;
    right: 0;
    color: #fff;
  }
}
.jmMaskOpacity {
  opacity: 0.8 !important;
}
// 无简历数据时的提示信息
.msg-info {
  margin-left: 60px;
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
  color: #666;
  .msg-router {
    color: blue;
    cursor: pointer;
  }
}
  // 预览图片
  .jm-preview {
    position: relative;
   
    img {
       z-index: 100;
      position: absolute;
      background: #ddd;
      padding: 10px;
      width: 500px;
      height: 730px;
      top: -400px; 
      left: 380px;
    }
  }
    .leftPreview {
    position: relative;
    margin-left: -100px;
  }
  .rightPreview {
    position: absolute;
    margin-left: -880px;
  }
  .jm-btn-delete{
    margin-top: 10px;
    color: red;
  }
</style>
