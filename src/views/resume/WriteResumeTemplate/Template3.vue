<template>
  <div class="jm-template">
    <Row id="code">
      <!-- {{modalSkill}} -->
      <!-- 左侧区域 -->
      <skillModal
        :modalSkills="modalSkill"
        :hasSkillLists="hasSkillList"
        v-on:changeSkillModel="changeSkillModel"
        v-on:saveSkill="saveSkill"
      />
      <baseInfoModel
        :modalSkills="modalBaseInfo"
        :baseInfoList="baseInfoList"
        :baseObjC="baseObjC"
        v-on:changeSkillModel="changeSkillModel"
        v-on:saveBaseInfo="saveBaseInfo"
      />
      <div class="resume-left">
        <!-- 头像 -->
        <headContent
          :formData="formData"
          :showHeadImg="showHeadImg"
        ></headContent>
        <!-- 基本信息 -->
        <Row>
          <div
            class="jm-baseInfo"
            :class="isBase ? 'jm-headImg-lineIs' : ''"
            @mouseenter="enter('base')"
            @mouseleave="leave('base')"
          >
            <Icon
              @click="displayModelBase('base')"
              v-show="isBase"
              class="jm-head-icon"
              size="20"
              type="md-create"
            />
            <Row
              class="jm-age"
              v-for="(item, index) in baseInfoList"
              :key="index"
            >
              <Icon :type="item.type" />
              <span class="jm-baseText">{{ item.baseText }}</span>
              <span class="jm-baseText">{{ item.inputText }}</span>
            </Row>
          </div>
        </Row>
        <!-- 技能特长 -->
        <Row>
          <!-- mouseenter在Row中不生效，需要放在div中 -->
          <div
            class="jm-baseInfo"
            :class="isSkill ? 'jm-headImg-lineIs' : ''"
            @mouseenter="enter('skill')"
            @mouseleave="leave('skill')"
          >
            <Icon
              @click="displaySkillModel"
              v-show="isSkill"
              class="jm-head-icon"
              size="20"
              type="md-create"
            />
            <Row class="jm-skill-title">
              <Icon size="25" type="md-checkbox-outline" />
              <span>技能特长</span>
            </Row>

            <Row class="jm-skill-content">
              <i-Circle
                :size="70"
                v-for="(item, index) in hasSkillList"
                :key="index"
                class="jm-circle"
                :percent="item.skillNumber"
              >
                <span class="demo-Circle-inner" style="font-size:24px">{{
                  item.skillNumber
                }}</span>
                <span class="jm-circle-text">{{ item.name }}</span>
              </i-Circle>
            </Row>
          </div>
        </Row>
      </div>
      <!-- 右侧区域 -->
      <div class="resume-right" ref="rightContent">
        <!-- 名字和介绍 -->
        <Row class="jm-base-name">
          <!-- 名字 -->
          <div
            style="position: relative;"
            class="jm-defult-line"
            :class="isBaseLine ? 'jm-base-linehover0' : ''"
            @mouseenter="enter('baseRight')"
            @mouseleave="leave('baseRight')"
          >
            <Icon
              v-show="isBaseLine"
              @click="displayModelBase('base')"
              class="jm-head-icon"
              size="20"
              type="md-settings"
            />
            <div class="jm-name">
              <Input
                v-model="formData.name"
                placeholder="你的名字"
                clearable
                class="right-name"
              />
            </div>
            <div v-if="formData.showDescribe" class="jm-name-introduce">
              <Input
                v-model="formData.wordDescribe"
                placeholder="一句话介绍自己，告诉HR为什么选择你而不是别人"
                clearable
                autosize
                type="textarea"
                class="input-introduce"
              />
            </div>
          </div>

          <!-- 介绍 -->
          <Row>
            <!-- 求职意向 -->
            <vuedraggable class="wrapper">
              <rightContent
                :themeList="jobThemeList"
                themeFlag="jobIntention"
                key="1"
                :jobIntentionLists="jobIntentionList"
                name="jobIntention"
                v-on:savaJobIntention="savaJobIntention"
                title="求职意向"
              >
                <div slot="slotRight">
                  <Row
                    class="jobList"
                    v-for="(item, index) in jobIntentionList"
                    :key="index"
                  >
                    <Icon :size="20" class="jobIcon" :type="item.type" />
                    <span class="jobText">{{ item.baseText }}</span>
                  </Row>
                </div>
              </rightContent>
              <!-- 教育背景 -->
              <rightContent
                :themeList="eduThemeList"
                themeFlag="edu"
                :key="2"
                name="edu"
                v-on:addEdus="addEdus('edu')"
                title="教育背景"
              >
                <div slot="slotRight">
                  <Row v-for="(item, index) in eduList" :key="index">
                    <Row v-if="settingObj.isShowJobTime">
                      <Row>
                        <Col :span="12" class="jm-edu-col">
                          <Input
                            v-model="item.eduDate"
                            placeholder="请填写时间如:2016/08-2017/09"
                          />
                        </Col>
                        <Col :span="12" class="jm-edu-col">
                          <Input
                            v-model="item.schooName"
                            placeholder="学校名字"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col :span="18" class="jm-edu-col">
                          <Input
                            v-model="item.majorName"
                            placeholder="请填写专业"
                          />
                        </Col>
                      </Row>
                    </Row>
                    <Row>
                      <Col class="jm-edu-col">
                        <Input
                          v-model="item.eduContent"
                          type="textarea"
                          clearable
                          autosize
                          class="input-introduce"
                          placeholder="请填写内容"
                        />
                      </Col>
                    </Row>
                  </Row>
                </div>
              </rightContent>
              <!-- 工作经验 -->
              <rightContent
                :themeList="workThemeList"
                themeFlag="work"
                key="3"
                name="edu"
                v-on:addEdus="addEdus('experience')"
                title="工作经验"
              >
                <div slot="slotRight">
                  <Row v-for="(item, index) in experienceList" :key="index">
                    <Row>
                      <Col :span="12" class="jm-edu-col">
                        <Input
                          v-model="item.date"
                          placeholder="请填写时间如:2016/08-2017/09"
                        />
                      </Col>
                      <Col :span="12" class="jm-edu-col">
                        <Input v-model="item.name" placeholder="公司名字" />
                      </Col>
                    </Row>
                    <Row>
                      <Col :span="18" class="jm-edu-col">
                        <Input
                          v-model="item.positionName"
                          placeholder="请填写职位"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col class="jm-edu-col">
                        <Input
                          v-model="item.content"
                          clearable
                          autosize
                          type="textarea"
                          class="input-introduce"
                          placeholder="请填写内容"
                        />
                      </Col>
                    </Row>
                  </Row>
                </div>
              </rightContent>
              <!-- 自我评价 -->
              <rightContent
                :themeList="ThemeAppraiseList"
                themeFlag="appraise"
                key="4"
                name="appraise"
                title="自我评价"
              >
                <div slot="slotRight">
                  <Row>
                    <Col class="jm-edu-col">
                      <Input
                        v-model="selfEvaluation"
                        placeholder="请填写内容，字数不超过500字"
                        clearable
                        autosize
                        type="textarea"
                        class="input-introduce"
                      />
                    </Col>
                  </Row>
                </div>
              </rightContent>
            </vuedraggable>
          </Row>
        </Row>
      </div>
    </Row>
    <!-- 如果该模板之前就有保存过简历的话，就弹出提示框 -->
    <!-- <Modal
      class="warn-has-resume"
      v-model="modal2"
      width="360"
      :mask-closable="false"
    >
      <p slot="header" style="color:#2db7f5;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <p>您已保存过该模板简历</p>
        <p>是否在此基础上进行修改？</p>
      </div>
      <div slot="footer">
        <Button type="info" size="large" @click="cancle">取消</Button>
        <Button
          type="info"
          size="large"
          :loading="modal_loading"
          @click="getTemplatesResume"
          >确定</Button
        >
      </div>
    </Modal> -->
    <div v-if="showFind!=='1'">
    <findResumeModal :modal2="modal2" :modal_loading="modal_loading"></findResumeModal>
  </div>
   </div>
</template>

<script>
import jmUploadImg from "@/components/UploadImg";
import skillModal from "./SkillModal";
import baseInfoModel from "./BaseInfoModel";
import rightContent from "./common/RightContent";
import findResumeModal from "./common/FindResumeModal";
import Bus from "@/assets/event-bus.js";
import vuedraggable from "vuedraggable";
import headContent from "@/components/HeadContent";
// import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";
export default {
  name: "Template3",
  components: {
    jmUploadImg,
    skillModal,
    baseInfoModel,
    rightContent,
    vuedraggable,
    headContent,
    findResumeModal
  },
  data() {
    return {
      modal2: false,
      modal_loading: false,
      // contentHight:"",//内容高度
      showHeadImg: true, //是否显示头像
      // showSetting: false, //是否显示头像的设置面板
      settingObj: {
        isShowJobTime: true
      }, //设置数据
      // themeList:{},//主题数据
      jobThemeList: {}, //求职意向主题数据
      eduThemeList: {}, //教育背景主题数据
      workThemeList: {}, //工作主题数据
      ThemeAppraiseList: {}, //评价主题数据
      baseObjC: {}, //传递获取接口的数据到基本数据弹窗的数据
      // resumeTemplateObj: {}, //当该模板之前有提交过时，
      // wirteIdeContent.vue会将之前的值传过来传递过来
      modalSkill: false, //默认技能弹窗不显示
      modalBaseInfo: false, //默认基本信息弹窗不显示
      isBase: false, //是否显示base编辑框
      isSkill: false, //是否显示技能编辑框
      isBaseLine: false, //右边是否显示基本信息编辑框
      // isBaseLine: false, //悬浮显示基本信息
      formData: {
        showDescribe: true //默认显示描述
      }, //基本信息弹窗传过来的数据
      hasSkillList: [], //传过来的技能数组
      ImgBase64: "", //头像数据
      baseInfoList: [
        //基本信息
        {
          type: "ios-contact",
          baseText: "年龄",
          inputText: ""
        },
        {
          type: "md-briefcase",
          baseText: "工作经验",
          inputText: ""
        },
        {
          type: "ios-call",
          baseText: "电话",
          inputText: ""
        },
        {
          type: "ios-mail",
          baseText: "邮箱",
          inputText: ""
        }
      ],
      jobIntentionList: [
        //求职意向项
        {
          type: "ios-contact",
          baseText: "意向岗位",
          name: "choseJob"
        },
        {
          type: "md-briefcase",
          baseText: "意向城市",
          name: "city"
        },
        {
          type: "ios-mail",
          baseText: "入职时间",
          name: "entryTime"
        },
        {
          type: "ios-call",
          baseText: "薪资要求",
          name: "salary"
        }
      ],
      // 教育背景数据
      eduList: [
        {
          eduDate: "",
          schooName: "",
          majorName: "",
          eduContent: ""
        }
      ],
      // 工作经验数据
      experienceList: [
        {
          date: "",
          name: "",
          positionName: "",
          content: ""
        }
      ],
      // 自我评价
      selfEvaluation: ""
    };
  },
    props:["showFind"],
  watch: {
    contentHight: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          console.log(newVal);
        }
      },
      deep: true
    }
  },
  methods: {
    // cancle() {
    //   this.modal2 = false;
    // },
    // // 将文档转换成图片
    // domToImg(){
    //    let doms = document.getElementById("code")
    //    this.common.transformImage(doms).then(dataUrl=>{
    //           this.resumeUrl = dataUrl
    //   })
    // },
    transformImage() {
      let doms = document.getElementById("code");
      this.common.transformImage(doms).then(dataUrl => {
        this.$router.push({ name: "preview", params: { dataUrl: dataUrl } });
      });
    },
    // 获取简历信息
    // 调用接口，判断获取该模板中是否已经填写过内容，如果是，直接将数据回填
    getTemplatesResume() {
      this.modal_loading = true;
      this.axios
        .get("resumeTemplates/getTemplatesResume", {
          params: {
            userName: localStorage.getItem("userName"), //暂时写死，到时候用vuex
            TemplateId: this.$route.query.id
          }
        })
        .then(res => {
          if (res.data.status == "0") {
            this.modal_loading = false;
            this.modal2 = false;
            var resumeTemplateObj = res.data.result.resumeContent;
            //  如果获取不到数据，就不执行，防止后面获取属性值：null.xxx报错
            if (!resumeTemplateObj) {
              return;
            }
            this.getTemplatesResumes(resumeTemplateObj);
          }
        })
        .catch(err => {});
    },
    // 获取简历信息
    getTemplatesResumes(resumeTemplateObj) {
      // var resumeTemplateObj = resumeTemplateObj.resumeTemplate[0].resumeContent;
      if (resumeTemplateObj.baseInfoList.headPic == "显示") {
        this.showHeadImg = true;
      } else if (resumeTemplateObj.baseInfoList.headPic == "隐藏") {
        this.showHeadImg = false;
      }
      console.log(resumeTemplateObj, "====");
      // 组装基本数据，传递到基本数据弹窗
      this.baseObjC = {
        name: resumeTemplateObj.baseInfoList.name,
        birthday: resumeTemplateObj.baseInfoList.birthday,
        age: resumeTemplateObj.baseInfoList.age, //年龄
        tel: resumeTemplateObj.baseInfoList.tel,
        mail: resumeTemplateObj.baseInfoList.mail,
        work: resumeTemplateObj.baseInfoList.work, //工作年限
        headPic: resumeTemplateObj.baseInfoList.headPic, //是否显示头像
        wordDescribe: resumeTemplateObj.baseInfoList.wordDescribe, //一句话描述
        showDescribe: resumeTemplateObj.baseInfoList.showDescribe //是否开启隐藏按钮
      };
      // 获取数据，回填到表单
      (this.baseInfoList = [
        //基本信息
        {
          type: "ios-contact",
          baseText: "年龄",
          inputText: resumeTemplateObj.baseInfoList.age || ""
        },
        {
          type: "md-briefcase",
          baseText: "工作经验",
          inputText: resumeTemplateObj.baseInfoList.work || ""
        },
        {
          type: "ios-call",
          baseText: "电话",
          inputText: resumeTemplateObj.baseInfoList.tel || ""
        },
        {
          type: "ios-mail",
          baseText: "邮箱",
          inputText: resumeTemplateObj.baseInfoList.mail || ""
        }
      ]),
        (this.formData = resumeTemplateObj.baseInfoList);
      this.hasSkillList = resumeTemplateObj.SkillList;
      this.jobIntentionList = resumeTemplateObj.jobIntentionList;
      this.eduList = resumeTemplateObj.eduList;
      this.experienceList = resumeTemplateObj.experienceList;
      this.selfEvaluation = resumeTemplateObj.selfEvaluation;
    },
    // 点击保存按钮，提交填写好的简历
    saveContent(nameId) {
      let doms = document.getElementById("code");
      this.common.transformImage(doms).then(dataUrl => {
        // 组装要提交的信息
        var content = {
          userName: localStorage.getItem("userName"), //简历名称
          hasCommonResume: false, //是否有基础简历的信息

          resumeTemplate: [
            //模板简历
            {
              TemplateId: nameId, //模板ID
              img: {
                url: dataUrl,
                name: nameId
              },
              resumeContent: {
                //简历内容
                baseInfoList: this.formData, //基本信息
                SkillList: this.hasSkillList, //技能特长
                jobIntentionList: this.jobIntentionList, //求职意向
                eduList: this.eduList, //教育背景
                experienceList: this.experienceList, //工作经验
                selfEvaluation: this.selfEvaluation //自我评价
              }
            }
          ]
        };
        this.axios
          .post("resumeTemplates/resumeTemplates", {
            content: content,
            TemplateId: nameId
          })
          .then(res => {
            if (res.data.status == "0") {
              // this.$Message.success("保存成功");
              Bus.$emit("showMoreResume");
            }
          })
          .catch(err => {
            console.log("err", err);
          });
      });
    },
    saveContentss() {
      Bus.$on("saveContents", () => {
        this.saveContent(this.$route.query.id);
      });
    },
    // 解决父组件多次传值的问题
    // Bus.$off("saveTheme")
    // 点击主题的保存，传递过来主题数据
    saveThemes() {
      Bus.$on("saveTheme", themeList => {
        var flags = themeList[1]; //判断是哪项的标识
        console.log(themeList, "子");
        if (flags == "jobIntention") {
          this.jobThemeList = themeList[0];
        } else if (flags == "edu") {
          this.eduThemeList = themeList[0];
        } else if (flags == "work") {
          this.workThemeList = themeList[0];
        } else if (flags == "appraise") {
          this.ThemeAppraiseList = themeList[0];
        }
      });
    },
    // 获取设置数据
    getSetting() {
      Bus.$on("changeSetting", settingObj => {
        this.settingObj = settingObj;
      });
    },
    // 鼠标悬浮
    enter(flag) {
      switch (flag) {
        case "base":
          this.isBase = true;
          break;
        case "skill":
          this.isSkill = true;
          break;
        case "baseRight":
          this.isBaseLine = true;
          break;
      }
    },
    //鼠标离开
    leave(flag) {
      switch (flag) {
        case "base":
          this.isBase = false;
          break;
        case "skill":
          this.isSkill = false;
          break;
        case "baseRight":
          this.isBaseLine = false;
          break;
      }
    },
    // 显示技能弹窗
    displaySkillModel() {
      this.modalSkill = true;
    },
    // 显示基本信息弹窗
    displayModelBase(name) {
      if (name == "base") {
        this.modalBaseInfo = true;
      }
      //  else if (name == "headIcon") {
      //   this.showSetting = true;
      // }
    },
    // 关闭技能弹窗，基本信息弹窗
    changeSkillModel(data) {
      this.modalSkill = false;
      this.modalBaseInfo = false;
    },
    // 点击基本信息保存
    saveBaseInfo(data) {
      console.log(data, "data=====");
      for (let item in data) {
        switch (item) {
          case "birthday":
            this.baseInfoList.find(item => item.baseText == "年龄").inputText =
              data.age + "岁";
            break;
          case "work":
            this.baseInfoList.find(
              item => item.baseText == "工作经验"
            ).inputText = data.work;
            break;
          case "tel":
            this.baseInfoList.find(item => item.baseText == "电话").inputText =
              data.tel;
            break;
          case "mail":
            this.baseInfoList.find(item => item.baseText == "邮箱").inputText =
              data.mail;
            break;
        }
        if (data.headPic == "显示") {
          this.showHeadImg = true;
        } else if (data.headPic == "隐藏") {
          this.showHeadImg = false;
        }
        this.formData = data;
      }
    },
    // 点击技能保存
    saveSkill(data) {
      this.hasSkillList = data;
    },
    // 意向职位传过去的事件
    savaJobIntention(val) {
      this.jobIntentionList.find(item => item.name == "choseJob").baseText =
        val.choseJob;
      this.jobIntentionList.find(item => item.name == "city").baseText =
        val.city;
      this.jobIntentionList.find(item => item.name == "entryTime").baseText =
        val.entryTime;
      this.jobIntentionList.find(item => item.name == "salary").baseText =
        val.salary0 + 10 + "k ~ " + (val.salary1 + 10) + "k";
      console.log(this.jobIntentionList);
    },
    // 点击教育添加按钮
    addEdus(name) {
      if (name == "edu") {
        var objEdu = {
          eduDate: "",
          schooName: "",
          majorName: "",
          eduContent: ""
        };
        this.eduList.push(objEdu);
      }
      if (name == "experience") {
        var objExperience = {
          date: "",
          name: "",
          positionName: "",
          content: ""
        };
        this.experienceList.push(objExperience);
      }
    },
    // 查询是否有该简历
    findHasResume() {
      this.axios
        .get("resumeTemplates/findHasResume", {
          params: {
            userName: localStorage.getItem("userName"), //暂时写死，到时候用vuex
            TemplateId: this.$route.query.id
          }
        })
        .then(res => {
          if (res.data.status == "0") {
            this.modal2 = true;
          }
        })
        .catch(err => {
          this.modal2 = false;
        });
    }
  },
  mounted() {
 if(this.showFind==="1"){
      this.getTemplatesResume()
    }else{
      this.findHasResume()
    }
    Bus.$on("getShowHeadImg", value => {
      if (value == "显示") {
        this.showHeadImg = true;
      } else if (value == "隐藏") {
        this.showHeadImg = false;
      }
    });
    // 获取头像的数据
    Bus.$on("postPhotoBase64", ImgBase64 => {
      this.formData.ImgBase64 = ImgBase64;
    });
    Bus.$on("previews", () => {
      this.transformImage();
    });
    // 绑定内容高度，然后监听
    this.contentHight = this.$refs.rightContent.offsetHeight;
    console.log(this.contentHight);
    this.getSetting();
    //   // 获取简历信息
    //  this.getTemplatesResume();
    // 点击保存按钮，提交填写好的简历
    this.saveContentss();
    // 解决父组件多次传值的问题
    // Bus.$off("saveTheme")
    // 点击主题的保存，传递过来主题数据
    this.saveThemes();
    Bus.$on("saveRecommend", id => {
      if (id == 3) {
        this.saveContent(3);
      }
    });
    Bus.$on("saveRecommend", id => {
      if (id == 3) {
        this.saveContent(3);
      }
    });
    
    Bus.$on("showFindModal",data=>{
      this.modal2 = false
    })
   
    Bus.$on("getResumes",()=>{
      // 查询该模板下是否已有保存过的简历
    this.getTemplatesResume();
    })
  },
  // 解决$on接收多次的问题
  beforeDestroy() {
    Bus.$off("saveContentss");
  }
};
</script>


<style lang="less" scoped>
// 头像样式
.jm-headImg {
  position: relative;
  display: block;
  width: 170px;
  margin: 0 auto;
  padding: 20px;
  border: 1px dashed transparent !important;
  .head-icon {
    position: relative;
    width: 128px;
    height: 156px;
    margin: 0 auto;
    border: 4px solid #e5e5e5;
    background: #e5e5e5;
    overflow: hidden;
    cursor: pointer;
    // .jm-upload-icon {
    //   // background: url(./../../../../static/image/bg3.jpg);
    //   position: absolute;
    //   // z-index: -1;
    //   width: 40px;
    //   height: 40px;
    //   margin-left: 40px;
    //   margin-top: 55px;
    // }
  }
}
/deep/.ivu-input {
  border: none !important;
}
// 悬浮显示头像图片编辑框
.jm-headImg-lineIs {
  border: 1px dashed #00c091 !important;
}
.jm-head-icon {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  background: #00c091;
  margin: 5px;
  z-index: 1;
  cursor: pointer;
}
body {
  min-width: 1240px;
}
.jm-template {
  margin: 0 auto;
  width: 814px;
  min-height: 1160px;
  .resume-left {
    float: left;
    height: 1160px;
    width: 264px;
    background: #254665;
    padding: 20px 30px 40px 30px;
  }
  // 基本信息
  .jm-baseInfo {
    padding: 20px 0 20px 4px;
    width: 210px;
    color: #fff;
    font-size: 14px;
    border: 1px dashed transparent;
    .jm-age {
      height: 24px;
      line-height: 24px;
      .jm-baseText {
        margin-left: 5px;
      }
    }
  }
  // 技能
  .jm-skill-title {
    font-size: 20px;
    font-weight: bold;
  }
  .jm-skill-content {
    .jm-circle {
      width: 80px;
      margin: 20px 10px 30px 10px;
      .jm-circle-text {
        top: 60px;
        left: 10px;
        position: absolute;
      }
    }
  }
}
// 右侧信息
.resume-right {
  // padding: 10px 30px;
  background: #fff;
  float: right;
  min-height: 1160px;
  padding: 10px 30px 40px 30px;
  width: 550px;
  .ivu-input {
    border: none !important;
  }
}
.jm-base-name {
  position: relative;
  padding-bottom: 15px;
  .jm-defult-line {
    border: 1px dashed transparent;
  }
  .jm-base-linehover0 {
    border: 1px dashed #00c091;
  }
  /deep/.ivu-input {
    border: none;
  }
  .jm-name {
    /deep/.ivu-input {
      font-size: 30px;
    }
  }
}
.jm-base-linehover {
  border: 1px dashed #00c091;
}
// 求职意向
.jobList {
  width: 25%;
  display: inline-block;
  padding: 20px 5px;
  .jobIcon {
    color: #747474;
    margin-top: -2.5px;
  }
  .jobText {
    color: #747474;
    font-size: 14px;
  }
}
.right-name {
  width: calc(100% - 45px);
  margin: 20px 40px 10px 5px;
  font-size: 30px;
}
.input-introduce {
  width: calc(100% - 20px);
  margin-left: 5px;
  margin-bottom: 20px;
  // 去掉textarea右下角的三角形
  /deep/ textarea {
    resize: none;
  }
}
.jm-edu-col {
  margin-top: 10px;
}
// 默认圆形头像
.round-head-icon {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
// 1:1头像
.one-head-icon {
  border-radius: 0;
}
// 1:1头像
.three-head-icon {
  width: 30px;
  height: 40px;
  border-radius: 0;
}
.head-img-example {
  width: 52px;
  height: 79px;
  display: inline-block;
  margin: 5px;
  padding: 5px;
  border: 1px solid rgb(148, 147, 147);
  border-radius: 5px;
  cursor: pointer;
}
.setting-head {
  position: absolute;
  z-index: 10;
  top: 20px;
  padding-top: 20px;
  right: -10px;
}
.bg-head-icon {
  background: #00c091;
}
.warn-has-resume {
  /deep/ .ivu-modal-footer {
    text-align: center;
  }
}
</style>