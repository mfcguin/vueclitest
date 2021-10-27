import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films'
import Cinemas from '@/views/Cinemas'
// import Center from '@/views/Center';
import Nowplaying from '@/views/films/Nowplaying'
import Comingsoon from '@/views/films/Comingsoon'
import Detail from '@/views/Detail'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'films' }
  },
  {
    name: 'films',
    path: '/films',
    component: Films,
    mata: {
      showTabbar: true
    },
    children: [
      {
        name: 'nowplaying',
        path: 'nowplaying',
        component: Nowplaying,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'comingsong',
        path: 'comingsoon',
        component: Comingsoon
      },
      {
        path: '/films',
        redirect: 'nowplaying'
      }
    ]
  },
  {
    path: '/city',
    component: () => import('@/views/City')
  },
  {
    name: 'detail',
    path: '/detail/:id',
    component: Detail,
    meta: {
      notKeepAlive: true
    }
  },
  {
    path: '/cinemas',
    component: Cinemas,
    mata: {
      showTabbar: true
    }
  },
  {
    path: '/cinemas/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/center',
    component: () => import('@/views/Center'),
    mata: {
      showTabbar: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savePosition) {
    //   return savePosition;

    // const position = {};
    //
    // if (to.hash) {
    //   position.selector = to.hash;
    //
    //   return position;
    // }

    // return savePosition;
    return savePosition
  }
})

// 全局拦截
router.beforeEach((to, from, next) => {
  // 判断是否需要登陆
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断是否登陆
    if (!localStorage.getItem('token')) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
