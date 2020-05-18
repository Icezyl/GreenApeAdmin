export default [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: { requireAuth: true }
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/Index'),
    meta: { requireAuth: true },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/components/home/subject/Home')
      },
      // 日志
      {
        path: '/userLog',
        name: 'userLog',
        component: () => import('@/components/log/UserLog')
      },
      {
        path: '/adminLog',
        name: 'adminLog',
        component: () => import('@/components/log/AdminLog')
      },
      // swagger接口文档
      {
        path: '/swagger',
        name: 'swagger',
        component: () => import('@/components/home/subject/Swagger')
      },
      // 人员管理
      {
        path: '/userPersonnel',
        name: 'userPersonnel',
        component: () => import('@/components/personnel/UserPersonnel')
      },
      {
        path: '/recovery',
        name: 'recovery',
        component: () => import('@/components/personnel/Recovery')
      },
      {
        path: '/jurisdiction',
        name: 'jurisdiction',
        component: () => import('@/components/personnel/Jurisdiction')
      },
      // 书籍管理
      {
        path: '/book',
        name: 'book',
        component: () => import('@/components/book/Book')
      },
      {
        path: '/classIfication',
        name: 'classIfication',
        component: () => import('@/components/book/ClassIfication')
      }
    ]
  }
]
