<template>
  <!-- 主页 -->
  <div class="zm">
    <div class="layout">
      <Layout>
        <NavHeader></NavHeader>
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
            <Row class="jm-table-bread">
              <Breadcrumb>
                <BreadcrumbItem to="/">
                  <Icon type="ios-home-outline"></Icon> 首页
                </BreadcrumbItem>
                <BreadcrumbItem to="TemplateMall">
                  <Icon type="logo-buffer"></Icon> 模板商城
                </BreadcrumbItem>
              </Breadcrumb>
            </Row>
            <Row class="zm-table-tag">
              <!-- 筛选项 -->
              <Row class="jm-screen">
                <!-- 求职意向 -->
                <Row>
                 
                  <Col class="jm-lt"> 
                  <Icon class="jm-screen-icon1" size="20" type="ios-paper-plane-outline" />
                  <span class="jm-screen-text1">求职意向：</span>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">前端</Tag>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">后端</Tag>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">测试</Tag>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">ui设计</Tag>
                  </Col>
                </Row>
                <!-- 模板排序 -->
                 <Row style="padding-top:10px;">
                  <Col class="jm-lt">
                  <Icon class="jm-screen-icon1" size="20" type="ios-book-outline" />
                  <span class="jm-screen-text1">模板排序：</span>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">综合</Tag>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">热门</Tag>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">最新</Tag>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">实习</Tag>
                  <Tag class="jm-tag" :checked="false" checkable color="geekblue">校招</Tag>
                  </Col>
                </Row>
              </Row>
              <Upload
      :show-upload-list="false"
      :before-upload="handleUpload"
      action="">
      <Button>上传模板商城图片</Button>
      </Upload>
              <!-- 简历列表 -->
              <Row>
                <Col>
                  <ul
                    class="jm-ul"
                    v-for="(item, index) in imgList"
                    :key="index"
                  >
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
                      <div class="jm-preview" v-show="currentIcon == index">
                        <img
                          :class="isRightImg ? 'rightPreview' : 'leftPreview'"
                          :src="item.imgUrl"
                        />
                      </div>
                    </li>
                  </ul>
                </Col>
              </Row>
              <Row class="jm-page">
                <Page :total="totalPage" :page-size-opts="[8,16,24,40]" show-elevator 
                prev-text="上一页" next-text="下一页" show-sizer :page-size="pageSize"
                @on-change="changePageNumber" @on-page-size-change="changePageSize"/>
              </Row>
            </Row>
          </Row>

        </Content>

        <NavFooter></NavFooter>
      </Layout>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
// import Swiper from "swiper";
// import "swiper/dist/css/swiper.min.css";
// import GroupChart from "@/views/GroupChart/GroupChart";
export default {
  name: "TemplateMall",
  data() {
    return {
      resulist: [1, 2],
      resumeIndex: [{ ry: false }, { ry: false }],
      value2: 0,
      imgList: [], //首页图片列表
      valueHalf: 4.5, //评分值
      jmMaskOpacity: "", //图片列表遮罩层的透明度
      current: 0, //当前悬浮图片的位置
      currentIcon: -1, //当前悬浮预览图标
      isRightImg: false, //是否是右边图
      totalPage:null,//页面总条数
      pageSize:8,//每页展示的数量
      currentPage:1,//当前页码
      file:null
    };
  },
  components: {
    NavHeader,
    NavFooter
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
    // // 上传方式1开始，将图片的base64数据保存在数据库中
    // handleUpload(file) {
    //   // 需要传给后台的file文件
    //   this.file = file;
    //   // FileReader api 为用户提供了方法去读取一个文件或者一个二进制大对象，
    //   // 并且提供了事件模型让用户可以操作读取后的结果
    //   const reader = new FileReader();
    //   // readAsDataURL：读取为base64格式
    //   reader.readAsDataURL(file);
    //   // onload 在文件读取成功时触发
    //   reader.onload = () => {
    //     // 拿到图片的base64数据
    //     this.postImage(reader.result);
    //   };
    //   return false;
    // },
    // postImage(data) {
    //   this.axios.post("malls/uploadImg", {
    //     imgUrl:data,
    //     mallId:0
    //   }).then(res => {
    //      this.$Message.info(res.data.msg);
    //     })
    //     .catch(err => {
    //       console.log("err", err);
    //     });
    // },
    // // 上传方式1结束
    // 上传方式2开始，上传一个图片文件保存在后台项目目录上，并且把文件的路径保存在数据库中
    handleUpload(file) {
      // 需要传给后台的file文件
      this.file = file;
      let data = new FormData();
      data.append("file", file, file.name); //很重要 data.append("file", file);不成功
      data.append("mallId", 112);
      console.log(data.get("file"));
      this.axios.post("malls/uploadImg", data, {
        headers: { "content-type": "multipart/form-data" }
      }).then(res => {
         this.$Message.info(res.data.msg);
        })
        .catch(err => {
          console.log("err", err);
        });;
      return false;
    },
    // 上传方式2结束
    // 改变页码
    changePageNumber(data){
      console.log(data)
      this.currentPage= data
      this.getImgList();
    },
    //切换每页显示条数
    changePageSize(data){ 
      console.log(data)
      this.pageSize= data
      this.getImgList();
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
          // this.imgList.forEach((val,item)=>{
          //   val.collectText="收藏"
          // })
          this.totalPage = res.data.result.totol;
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
  line-height: 25px;
  background: rgb(246, 249, 251);
  .jm-table-bread {
    text-align: left;
    margin: 30px;
    margin-left: 20px;
  }
  .ivu-divider-horizontal {
    width: 30%;
    margin: 10px auto;
    margin-top: 5px;
    min-width: 30%;
  }
  .zm-table-tag {
   
    margin-top: 20px;
     .jm-screen{
      background: #fff;
      padding: 10px;
      margin: 10px;
      .jm-screen-text1{
        font-size: 16px;
      }
      .jm-screen-icon1{
      margin-top: -5px;
      }
    }
    .jm-tag{
      margin-left:20px;
      font-size: 14px;
    }
    .zm-table-title {
      text-align: left;
      margin-top: 20px;
      .zm-table-b {
        font-size: 22px;
        margin-left: 20px;
      }
      .zm-table-s {
        font-size: 16px;
      }
    }
    .zm-table-title :hover {
      color: #2d8cf0;
      cursor: pointer;
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
    .jm-btn {
      position: relative;
      // top: 50%;
      font-size: 20px;
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
  .leftPreview {
    position: relative;
    margin-left: 300px;
  }
  .rightPreview {
    position: absolute;
    margin-left: -530px;
  }
}
.jm-li {
  content: "";
  overflow: hidden;
}

.border-rd5 {
  border-radius: 5px;
}
.jmMaskOpacity {
  opacity: 0.8 !important;
}
// 页码
.jm-page{
  margin-top:40px;
  margin-bottom: 40px;
}
  .jm-btn-delete{
    margin-top: 10px;
    color: red;
  }
  .center-btn{
    position: relative;
    top: 50%;
  }
</style>
