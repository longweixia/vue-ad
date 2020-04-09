<template>
  <div class="layout">
    <Header :style="{ position: 'fixed', width: '100%', zIndex: 1000 }">
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
        <div class="layout-nav">
          <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            首页导航
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            搜狗联盟
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-analytics"></Icon>
            百度联盟
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-paper"></Icon>
            360联盟
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-paper"></Icon>
            推广联盟
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-paper"></Icon>
            谷歌联盟
          </MenuItem>
          <MenuItem name="4">
            <Input
              suffix="ios-search"
              placeholder="Enter text"
              style="width: auto"
            />
          </MenuItem>
        </div>
      </Menu>
    </Header>
  </div>
</template>
<script>
export default {
    name:"AdHeader",
     components:{},
  data() {
    return {

    }}
}
</script>

<style lang="less" scoped>
.layout {
  height: 60px;
}
// .layout-header-bar {
//   background: #eeeeee;
//   box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
// }
// .menu-item span {
//   display: inline-block;
//   overflow: hidden;
//   width: 69px;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   vertical-align: bottom;
//   transition: width 0.2s ease 0.2s;
// }
// .menu-item i {
//   transform: translateX(0px);
//   transition: font-size 0.2s ease, transform 0.2s ease;
//   vertical-align: middle;
//   font-size: 16px;
// }
// .collapsed-menu span {
//   width: 0px;
//   transition: width 0.2s ease;
// }
// .collapsed-menu i {
//   transform: translateX(5px);
//   transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
//   vertical-align: middle;
//   font-size: 22px;
// }
// .layout-header-bar {
//   height: 400px;
// }
</style>