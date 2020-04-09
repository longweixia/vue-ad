import Vue from 'vue'
import Router from 'vue-router'
import Home1 from '@/views/home/Home1'
import ArticleContent from '@/views/home/ArticleContent'
import GroupChart from '@/views/GroupChart/GroupChart'
import Login from '@/views/login/Login'
import WriteBaseInfo from '@/views/resume/WriteBaseInfo'
import ResumeTemplate1 from '@/views/resume/ResumeTemplate/ResumeTemplate1'
import TemplateMall from '@/views/templateMall/TemplateMall'   
import WriteResumeIde from '@/views/resume/WriteResumeIde'   
import WriteIdeHeader from '@/views/resume/Common/WriteIdeHeader'   
import Preview from '@/views/resume/Common/Preview'   
import WriteIdeSiderLeft from '@/views/resume/Common/WriteIdeSiderLeft'   
// import WriteResumeTemplate1 from '@/views/resume/WriteResumeTemplate/WriteResumeTemplate1'
// import WriteResumeTemplate2 from '@/views/resume/WriteResumeTemplate/WriteResumeTemplate2'
import MyCenter from '@/views/myCenter/MyCenter'   
import MyResume from '@/views/myCenter/MyResume'   
import Collection from '@/views/myCenter/Collection'
import ClubContent from '@/views/club/Content'   



Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home1',
            component: Home1
        },
        {
            path: '/home1',
            name: 'home1',
            component: Home1
        },
        {
            path: '/articleContent',
            name: 'ArticleContent',
            component: ArticleContent
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/writeBaseInfo',
            name: 'writeBaseInfo',
            component: WriteBaseInfo
        },
        {
            path: '/resumeTemplate1',
            name: 'resumeTemplate1',
            component: ResumeTemplate1
        },
        {
            path: '/groupChart',
            name: 'groupChart',
            component: GroupChart
        },
        {
            path: '/templateMall',
            name: 'templateMall',
            component: TemplateMall
        },
        {
            path: '/writeResumeIde',
            name: 'writeResumeIde',
            component: WriteResumeIde
        },
        {
            path: '/writeIdeHeader',
            name: 'writeIdeHeader',
            component: WriteIdeHeader
        },
        {
            path: '/writeIdeSiderLeft',
            name: 'writeIdeSiderLeft',
            component: WriteIdeSiderLeft
        },
        {
            path: '/writeIdeSiderLeft',
            name: 'writeIdeSiderLeft',
            component: WriteIdeSiderLeft
        },
        // {
        //     path: '/writeResumeTemplate1',
        //     name: 'writeResumeTemplate1',
        //     component: WriteResumeTemplate1
        // },
        // {
        //     path: '/writeResumeTemplate2',
        //     name: 'writeResumeTemplate2',
        //     component: WriteResumeTemplate2
        // },
        {
            path: '/preview',
            name: 'preview',
            component: Preview
        },
        {
            path: '/myCenter',
            name: 'myCenter',
            component: MyCenter
        },
        {
            path: '/myResume',
            name: 'myResume',
            component: MyResume
        },
        {
            path: '/collection',
            name: 'collection',
            component: Collection
        },
        {
            path: '/club',
            name: 'clubContent',
            component: ClubContent
        }
    ]
})