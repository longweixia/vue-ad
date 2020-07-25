<template>
  <div class="my-breadcrumb">
    <Breadcrumb>
          <BreadcrumbItem :to="getRouter">
            <Icon :type="icon1"></Icon> {{title1}}
          </BreadcrumbItem>
          <BreadcrumbItem to="TemplateMall">
            <Icon :type="icon2"></Icon> {{title2}}
          </BreadcrumbItem>
        </Breadcrumb>
  </div>
</template>
<script>
export default {
  name: "MyBreadcrumb",
  props:["getRouter","title1","title2","icon1","icon2"],
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.my-breadcrumb{
    padding: 10px;
}
</style>