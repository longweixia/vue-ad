<template>
<!-- 主页 -->
  <div class="zm">
    <div class="layout">
      <Layout>
        <!-- <Header class="zm-header"> -->
        <NavHeader></NavHeader>
        <!-- <Chart/> -->

        <!-- <div @click="joinGroupChart">加入群聊</div>
        <ul v-for="(item, index) in resulist" :key="index" style="float:left">
          <li @click="gotoResume(item-1)">简历{{ item }}</li>
        </ul>
        <ResumeTemplate1 v-if="resumeIndex[0].ry" />
        <ResumeTemplate2 v-if="resumeIndex[1].ry" /> -->
        <Content class="jm-content">
          <!-- banner -->
          <div class="zm-banner">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img src="../../../static/image/banner1.png" alt="" />
                </div>
                <div class="swiper-slide">
                  <img src="../../../static/image/banner1.png" alt="" />
                </div>
                <div class="swiper-slide">
                  <img src="../../../static/image/banner1.png" alt="" />
                </div>
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <!-- banner中的输入框 -->
            <Row class="zm-banner-input">
              <Col span="8" class="banner-input-Col">
                <Input
                  size="large"
                  search
                  enter-button
                  placeholder="输入行业或职业名，寻找属于您的专属简历模板"
                />
              </Col>
            </Row>
          </div>
          <!-- 列表上方文字区 -->
          <Row class="zm-table-text">
            <Row>
              <h2>在线简历制作</h2>
            </Row>
            <Row>
              <Divider />
            </Row>
            <Row>
              <p>
                只需几步，轻松制作多份不同主题的精美简历，模板任性下载，永久免费
              </p>
            </Row>
            <Row class="zm-table-tag">
              <Row>
                <Col>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">前端</Tag>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">后端</Tag>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">ui设计</Tag>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">测试</Tag>
                </Col>
              </Row>
              <Row class="zm-table-title">
                <Col span="6" @click.native="goTemplateMall">
                 <span class="zm-table-b">更多模板，</span>
                 <span class="zm-table-s">进入模板商城</span>
                </Col>
              </Row>
              <!-- 简历列表 -->
              <Row>
                <Col class="jm-ul" v-for="(item, index) in imgList"
                    :key="index">
                  <ul>
                    <li class="jm-li">
                      <img v-lazy="item.imgUrl"/>

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
                         <div class="center-btn">
                        <Button @click="gotoResumeTemplate(index)" class="jm-btn" shape="circle" icon="ios-search"
                          >编辑简历</Button>
                          </div>
                          <div class="center-btn">
                        <Button @click="collections(index,imgList[index].mallId)" class="jm-btn jm-btn-delete"
                         shape="circle" icon="ios-heart-outline">{{item.collectText}}</Button>
                      </div>
                      </div>
                      <div  class="jm-preview" v-show="currentIcon==index">
                        <img :class="isRightImg?'rightPreview':'leftPreview'"
                          :src="item.imgUrl"
                        />
                      </div>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Row>
          </Row>
          <!-- 更多模板 -->
          <Row class="jm-more">
            <Row class="jm-collect" v-if="isCollect">
              <Col>
              <span  @click="collect">
                <span style="font-size:20px">☝</span>
                收起来
                </span>
              </Col>
              </Row>
            <Col class="jm-ct">
              <Button type="primary" :disabled="isdisable" @click="getMoreResume" class="jm-more-btn">{{resumeBtn}}</Button>
            </Col>
          </Row>
          <!-- 分享 -->
          <Row class="jm-share border-rd5">
            <Row class="jm-share-title">加入简觅大家庭</Row>
            <Row class="jm-share-line"></Row>
            <Row class="jm-share-info"
              >您的专属职场社区，分享，聆听，转变，让您的职场更轻松</Row
            >
            <!-- 分享的卡片 -->
            <Row class="jm-share-card ">
              <Row>
                <!-- 卡片1 -->
                <Col span="8" class="jm-messge">
                  <Row class="jm-box border-rd5">
                    <Row class="jm-text">
                      "里面真的有人愿意倾听我的迷茫和焦虑，还有小伙伴给我指导，分享ta的经验，让我成功避雷，太感谢了。"
                    </Row>
                    <Row class="jm-tate">
                      <Rate allow-half v-model="valueHalf" />
                    </Row>
                    <Row class="jm-name">
                      <Col span="6">赵立</Col>
                      <Col class="jm-rt" span="18">
                        <img class="jm-headImg" src="static/image/user3.jpg" />
                      </Col>
                    </Row>
                    <Row class="jm-job">
                      市场营销
                    </Row>
                  </Row>
                </Col>
                <!-- 卡片1 -->
                <Col span="8" class="jm-messge">
                  <Row class="jm-box border-rd5">
                    <Row class="jm-text">
                      "里面真的有人愿意倾听我的迷茫和焦虑，还有小伙伴给我指导，分享ta的经验，让我成功避雷，太感谢了。"
                    </Row>
                    <Row class="jm-tate">
                      <Rate allow-half v-model="valueHalf" />
                    </Row>
                    <Row class="jm-name">
                      <Col span="6">赵立</Col>
                      <Col class="jm-rt" span="18">
                        <img class="jm-headImg" src="static/image/user3.jpg" />
                      </Col>
                    </Row>
                    <Row class="jm-job">
                      市场营销
                    </Row>
                  </Row>
                </Col>
                <!-- 卡片1 -->
                <Col span="8" class="jm-messge">
                  <Row class="jm-box border-rd5">
                    <Row class="jm-text">
                      "里面真的有人愿意倾听我的迷茫和焦虑，还有小伙伴给我指导，分享ta的经验，让我成功避雷，太感谢了。"
                    </Row>
                    <Row class="jm-tate">
                      <Rate allow-half v-model="valueHalf" />
                    </Row>
                    <Row class="jm-name">
                      <Col span="6">赵立</Col>
                      <Col class="jm-rt" span="18">
                        <img class="jm-headImg" src="static/image/user3.jpg" />
                      </Col>
                    </Row>
                    <Row class="jm-job">
                      市场营销
                    </Row>
                  </Row>
                </Col>
              </Row>
              <!-- 更多分享 -->
              <Row class="jm-more jm-more-share ">
                <Col class="jm-ct">
                  <Button type="primary" class="jm-more-btn" @click="routerTo('club')">更多分享</Button>
                </Col>
              </Row>
            </Row>
          </Row>
          <!-- 服务保障区 -->
          <Row class="jm-share jm-service">
            <Row class="jm-share-title jm-text">四大服务保障</Row>
            <Row class="jm-share-line jm-text jm-line"></Row>
            <Row class="jm-share-info jm-text"
              >安全，免费，简单，高效，在求职路上祝您一臂之力</Row
            >
            <!-- 服务项目-->
            <Row class="jm-share-card jm-service-card jm-ct border-rd5">
              <Row>
                <!-- 安全 -->
                <Col span="6" class="jm-messge">
                  <Row class="jm-box border-rd5">
                    <Icon size="80" class="jm-safe-icon" type="ios-cloud" />
                  </Row>
                  <Row class="jm-box">
                    保护隐私
                  </Row>
                  <Row class="jm-box jm-msg">
                    保护隐私，未经用户许可，本站信息不提供给第三方网站。
                    保护隐私，未经用户许可，本站信息不提供给第三方网站。
                  </Row>
                </Col>
                <!-- 免费 -->
                <Col span="6" class="jm-messge">
                  <Row class="jm-box border-rd5">
                    <Icon size="80" class="jm-free-icon" type="md-brush" />
                  </Row>
                  <Row class="jm-box">
                    永久免费
                  </Row>
                  <Row class="jm-box jm-msg">
                    保护隐私，未经用户许可，本站信息不提供给第三方网站。
                    保护隐私，未经用户许可，本站信息不提供给第三方网站。
                  </Row>
                </Col>
                <!-- 专业高效 -->
                <Col span="6" class="jm-messge">
                  <Row class="jm-box border-rd5">
                    <Icon
                      size="80"
                      class="jm-major-icon"
                      type="ios-thumbs-up"
                    />
                  </Row>
                  <Row class="jm-box">
                    专业高效
                  </Row>
                  <Row class="jm-box jm-msg">
                    保护隐私，未经用户许可，本站信息不提供给第三方网站。
                    保护隐私，未经用户许可，本站信息不提供给第三方网站。
                  </Row>
                </Col>
                <!-- 跟踪反馈 -->
                <Col span="6" class="jm-messge">
                  <Row class="jm-box border-rd5">
                    <Icon
                      size="80"
                      class="jm-feedback-icon"
                      type="ios-notifications"
                    />
                  </Row>
                  <Row class="jm-box">
                    跟踪反馈
                  </Row>
                  <Row class="jm-box jm-msg">
                    保护隐私，未经用户许可，本站信息不提供给第三方网站。
                    保护隐私，未经用户许可，本站信息不提供给第三方网站。
                  </Row>
                </Col>
              </Row>
            </Row>
          </Row>
          <!-- <div class="zm-input-tips">
            <Row class="zm-input">
              <Col span="24">
                您有2种填入简历的方式
              </Col>
            </Row>
            <Row class="zm-input zm-input-title2">
              <Col span="8">
                1. 填写基本信息，一键生成多主题简历
                <span class="zm-input-recommend">！推荐</span>
                <Button> 进入 </Button>
              </Col>
            </Row>
            <Row class="zm-input  zm-input-title3">
              <Col span="8">
                2. 选择自己喜欢的模板然后填入信息。
                <Button> 进入 </Button>
              </Col>
            </Row>
          </div>
          <Row class="zm-input">
            <Col span="12">
              <Input
                style="height:50px"
                placeholder="输入行业或职业名，寻找属于你的专属简历模板"
              >
              </Input>
            </Col>
          </Row> -->
        </Content>

        <NavFooter></NavFooter>
     
      </Layout>
    </div>
       <BackTop :height="100" :bottom="50">
        <div class="top">返回顶端</div>
        </BackTop>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import ResumeTemplate1 from "@/views/resume/ResumeTemplate/ResumeTemplate1";
import ResumeTemplate2 from "@/views/resume/ResumeTemplate/ResumeTemplate2";
import Chart from "./Chart";
// import Swiper from "swiper";
// import "swiper/dist/css/swiper.min.css";
// import GroupChart from "@/views/GroupChart/GroupChart";
export default {
  name: "Home",
  data() {
    return {
      isCollect:false,//是否展示收起来
      resumeBtn:"更多模板",
      isdisable:false,//是否不能点击更多模板了
      resulist: [1, 2],
      resumeIndex: [{ ry: false }, { ry: false }],
      value2: 0,
      imgList: [], //首页图片列表
      valueHalf: 4.5, //评分值
      jmMaskOpacity: "", //图片列表遮罩层的透明度
      current: 0, //当前悬浮图片的位置
      currentIcon: -1, //当前悬浮预览图标
      isRightImg:false,//是否是右边图
      pageSize:4,//默认展示，点击更多时让pageSize+4
    };
  },
  components: {
    NavHeader,
    NavFooter,
    Chart,
    ResumeTemplate1,
    ResumeTemplate2
  },
  watch:{
     
   pageSize: {
      handler(newVal, oldVal) {
       if (newVal>4) { 
         this.isCollect = true
            }else{
              this.isCollect = false
            }
    },
      deep: true
    }
  },
  methods: {
    // 收藏简历
    collections(index,name){
      this.axios.post("collections/resume", {
        userName: localStorage.getItem("userName"), 
        mallId:name
      }).then(res => { 
        if(res.data.status=="0"){
          this.imgList[index].collectText="已收藏"
          
        }else if(res.data.status=="2"){
          this.imgList[index].collectText="收藏"
        }else{
          this.$Message.info(res.data.msg);
        }
         
        })
        .catch(err => {
          console.log("err", err);
        });
    },
     // 进入简历模板
    gotoResumeTemplate(index){
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
    routerTo(name) {
      if(name=='club'){
        this.$router.push({name:"clubContent"})
      }
     
    },
    // 收起来
    collect(){
      console.log(1)
      this.pageSize=4;
      this.getImgList();
    },
    // 更多模板
    getMoreResume(){
      this.pageSize=this.pageSize+4;
      this.getImgList();
    },
     // 进入模板商城
    goTemplateMall() {
      this.$router.push({
        name: "templateMall"
      });
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
      this.isRightImg = index==(parseInt(index/4))*4+2 || index==(parseInt(index/4))*4+3
      console.log("行===",this.isRightImg)
      console.log("位置===",index)
      this.currentIcon = index;
    },
    //鼠标离开预览图标
    leaveIcon(index) {
      this.currentIcon = -1;
    },

    // 进入简历
    gotoResume(item) {
      this.resumeIndex.forEach((items, indexs) => {
        items.ry = false;
      });
      this.resumeIndex[item].ry = true;
    },
    // 进入群聊
    joinGroupChart() {
      this.$router.push({
        name: "groupChart"
      });
    },
    // 获取图片列表
    getImgList() {
      this.axios
        .get("malls/getImgList", { 
          params:{
          pageSize: this.pageSize,
          currentPage:this.currentPage,
          userName: localStorage.getItem("userName")
          }
          })
        .then(res => {
          this.imgList = res.data.result.list;
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  mounted() {
    this.getImgList();
    // var mySwiper = new Swiper(".swiper-container", {
    //   autoplay: true,
    //   delay: 2000, //2秒切换一次
    //   loop: true,
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination"
    //   }
    // });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 .jm-btn-delete{
    margin-top: 10px;
    color: red;
  }
  .center-btn{
    position: relative;
    top: 50%;
  }
.zm {
  max-width: 1920px;
  // padding-left: 2%;
  // padding-right: 2%;
  background: #f5f7f9;
}
.ivu-layout {
  background: #fff;
}
.jm-content {
  padding-left: 2%;
  padding-right: 2%;
}
// banner
.zm-banner {
  img {
    width: 100%;
    height: 180px;
  }
}
.swiper-pagination {
  position: relative;
  margin-top: -25px;
}
.zm-banner-input {
  position: relative;
  .banner-input-Col {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: -60px;
    z-index: 1;
  }
}

// 列表上方文字区域
.zm-table-text {
  text-align: center;
  margin-top: 30px;
  padding-top:20px;
  line-height: 25px;
  background: rgb(246, 249, 251);
  .ivu-divider-horizontal {
    width: 30%;
    margin: 10px auto;
    margin-top: 5px;
    min-width: 30%;
  }
  .zm-table-tag {
    margin-top: 20px;
    .jm-tag{
      margin: 0 10px; 
    }

    
    .zm-table-title{
      text-align: left;
      margin-top:20px;
      .zm-table-b{
        font-size: 22px;
        margin-left:20px;
      }
      .zm-table-s{
        font-size: 16px;
      }
    }
    .zm-table-title :hover{
      color:#2d8cf0;
      cursor:pointer;
    }
  }
}
// 列表
.jm-li {
  width: 25%;
  float: left;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
  img {
    width: 100%;
    height: 350px;
  }
  // 遮罩层
  .jm-mask {
    position: relative;
    text-align: center;
    height: 350px;
    margin-top: -360px;
    float: left;
    background-color: rgba(0, 192, 145, 0.5);
    opacity: 0;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    // z-index: 1;
    .jm-btn {
      position: relative;
      top: 50%;
      font-size: 20px;
      // left: 50%;
      transform: translate(0, -50%);
    }
    .jm-bigger {
      position: absolute;
      right: 0;
      color: #fff;
    }
  }
  // 预览图片
  .jm-preview {
    position: absolute;
    z-index: 100;
    img {
     background: #ddd;
     padding: 20px;   
      width: 500px;
      height: 730px;
      top: -500px;
    }
  }
  .leftPreview{
    position: relative;
     margin-left:300px;
  }
  .rightPreview{
    position: absolute;
    margin-left:-530px;
  }
}
.jm-li {
  content: "";
  overflow: hidden;
}
// 更多模板
.jm-more {
  background: #f5f7f9;
  .jm-collect{
    z-index: 10;
    position: absolute;
    right: 20px;
    cursor: pointer;
  }
  .jm-more-btn {
    width: 25%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
//分享社区
.jm-share {
  background: #6bb2d0;
  .jm-share-title {
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-top: 50px;
  }
  .jm-share-line {
    height: 2px;
    width: 20%;
    margin-left: 40%;
    margin-right: 40%;
    background: #fff;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .jm-share-info {
    text-align: center;
    color: #fff;
    margin-bottom: 50px;
  }
  // 分享卡片
  .jm-share-card {
    background: #6bb2d0;
    .jm-messge {
      padding: 20px;

      .jm-box {
        padding: 20px;
        background: #fff;

        .jm-text {
        }
        .jm-tate {
          margin-bottom: 30px;
        }
        .jm-name {
          .jm-headImg {
            position: absolute;
            top: -10px;
            right: 0;
            display: inline-block;
            width: 60px;
            height: 60px;
          }
        }
        .jm-job {
          margin-top: 10px;
        }
      }
    }
    .jm-more-share {
      background: #6bb2d0;
      margin-bottom: 30px;
    }
  }
}
//服务与保障区
.jm-service {
  background: #f5f7f9;
  .jm-text {
    color: #000;
  }
  .jm-line {
    background: #000;
  }
  .jm-service-card {
    background: #f5f7f9;
    .jm-messge {
      .jm-box {
        background: #f5f7f9;
        padding: 10px;
        .jm-safe-icon {
          color: #1cb52b;
        }
        .jm-free-icon {
          color: rgb(25, 128, 229);
        }
        .jm-major-icon {
          color: rgb(251, 225, 128);
        }
        .jm-feedback-icon {
          color: rgb(78, 22, 202);
        }
      }
      .jm-msg {
        text-align: left;
      }
    }
  }
}
.border-rd5 {
  border-radius: 5px;
}
.jmMaskOpacity {
  opacity: 0.8 !important;
}
.top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>
