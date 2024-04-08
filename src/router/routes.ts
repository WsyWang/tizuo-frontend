import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/lrviews/LoginView.vue'
import LoginRegisterLayout from '@/layouts/LoginRegisterLayout.vue'
import RegisterView from '@/views/lrviews/RegisterView.vue'
import ACCESS_ENUM from '@/constants/ACCESSENUM'
import TestView from '@/views/TestView.vue'
import NoAuthView from '@/views/errorviews/NoAuthView.vue'
import TeacherManageView from '@/views/userviews/TeacherManageView.vue'
import NotFoundView from '@/views/errorviews/NotFoundView.vue'
import ClassManageView from '@/views/classviews/ClassManageView.vue'
import QuestionManageView from '@/views/questionviews/QuestionManageView.vue'
import MyExamView from '@/views/examviews/MyExamView.vue'
import StartExamView from '@/views/examviews/StartExamView.vue'
import ExamView from '@/views/examviews/ExamView.vue'
import CreateQuestionView from '@/views/questionviews/CreateQuestionView.vue'
import PaperManageView from '@/views/paperView/PaperManageView.vue'
import CreatePaperView from '@/views/paperView/CreatePaperView.vue'
import ExamManageView from '@/views/examviews/ExamManageView.vue'
import JudgePaperView from '@/views/paperView/JudgePaperView.vue'

export const routes = [
  {
    path: '/',
    name: '首页',
    component: HomeView,
    meta: {
      icon: 'icon-shouye',
      access: [ACCESS_ENUM.ADMIN, ACCESS_ENUM.TEACHER, ACCESS_ENUM.STUDENT]
    }
  },
  {
    path: '/user',
    name: '用户管理',
    meta: {
      icon: 'icon-yonghu',
      access: [ACCESS_ENUM.ADMIN]
    },
    children: [
      {
        path: '/user/manageTeacher',
        name: '教师管理',
        component: TeacherManageView,
        meta: {
          icon: 'icon-jiaoshiguanli',
          access: [ACCESS_ENUM.ADMIN],
          haveParent: true
        }
      },
      {
        path: '/user/manageStudent',
        name: '学生管理',
        component: TestView,
        meta: {
          icon: 'icon-kaoshengguanli',
          access: [ACCESS_ENUM.ADMIN],
          haveParent: true
        }
      },
    ]
  },
  {
    path: '/exam',
    name: '考试中心',
    meta: {
      icon: 'icon-xuexiaoguanli',
      access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMIN, ACCESS_ENUM.STUDENT]
    },
    children: [
      {
        path: '/exam/manageExam',
        name: '考试管理',
        component: ExamManageView,
        meta: {
          icon: 'icon-kaoshixinxi',
          access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMIN],
          haveParent: true
        }
      },
      {
        path: '/exam/paperManage',
        name: '试卷管理',
        component: PaperManageView,
        meta: {
          icon: 'icon-tiqiatiku',
          access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMIN],
          haveParent: true
        }
      },
      {
        path: '/exam/joinExam',
        name: '参加考试',
        component: MyExamView,
        meta: {
          icon: 'icon-canjiakaoshichangci',
          access: [ACCESS_ENUM.STUDENT],
          haveParent: true
        }
      },
      {
        path: '/exam/judgeExam',
        name: '批阅试卷',
        component: JudgePaperView,
        meta: {
          icon: 'icon-piyueguanli',
          access: [ACCESS_ENUM.TEACHER],
          haveParent: true
        }
      },
      {
        path: '/exam/queryExam',
        name: '成绩查询',
        component: TestView,
        meta: {
          icon: 'icon-jinduchaxun',
          access: [ACCESS_ENUM.STUDENT],
          haveParent: true
        }
      }
    ]
  },
  {
    path: '/question',
    name: '试题管理',
    component: QuestionManageView,
    meta: {
      icon: 'icon-tiqiatiku',
      access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMIN]
    }
  },
  {
    path: '/createQuestion',
    name: '创建试题',
    component: CreateQuestionView,
    meta: {
      access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMIN],
      hide: true
    }
  },
  {
    path: '/createPaper',
    name: '创建试卷',
    component: CreatePaperView,
    meta: {
      access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMIN],
      hide: true
    }
  },
  {
    path: '/class',
    name: '班级中心',
    meta: {
      icon: 'icon-banjiliebiao',
      access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMIN, ACCESS_ENUM.STUDENT]
    },
    children: [
      {
        path: '/class/manageClass',
        name: '班级管理',
        component: ClassManageView,
        meta: {
          icon: 'icon-banjiguanli',
          access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMIN],
          haveParent: true
        }
      },
      {
        path: '/class/myClass',
        name: '我的班级',
        component: TestView,
        meta: {
          icon: 'icon-banji',
          access: [ACCESS_ENUM.STUDENT],
          haveParent: true
        }
      }
    ]
  },
  {
    path: '/startExamView',
    name: '开始考试',
    component: StartExamView,
    meta: {
      hide: true,
      access: [ACCESS_ENUM.STUDENT]
    }
  },
  {
    path: '/doExam',
    name: '进行考试',
    component: ExamView,
    meta: {
      hide: true,
      access: [ACCESS_ENUM.STUDENT]
    }
  },
  {
    path: '/403',
    name: '无权限',
    component: NoAuthView,
    meta: {
      hide: true
    }
  },
  {
    path: '/404',
    name: '访问错误',
    component: NotFoundView,
    meta: {
      hide: true
    }
  },
  {
    path: '/lrviews',
    name: '信息页面',
    component: LoginRegisterLayout,
    meta: {
      hide: true
    },
    children: [
      {
        path: '/lrviews/login',
        name: '登录',
        component: LoginView,
        meta: {
          haveParent: true,
          hide: true
        }
      },
      {
        path: '/lrviews/register',
        name: '注册',
        component: RegisterView,
        meta: {
          haveParent: true,
          hide: true
        }
      }
    ]
  }
]