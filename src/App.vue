<template>
  <div id="app">
    
<keep-alive  include="['WriteResumeTemplate3','TemplateMall']">
    <router-view/>
</keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

