import Vue from 'vue'
import Router from 'vue-router'


const Index = () => import('@/components/Index');
const Header = () => import('@/components/layout/Header');
const Footer = () => import('@/components/layout/Footer');
const IndexContent = () => import('@/components/index/IndexContent');
const PostContent = () => import('@/components/post/PostContent');
const PostDetail = () => import('@/components/post/PostDetail');
const PostAdd = () => import('@/components/post/PostAdd');
const PostEdit = () => import('@/components/post/PostEdit');
const CategoryContent = () => import('@/components/category/CategoryContent');
const UserContent = () => import('@/components/accounts/UserContent');
const UserActivites = () => import('@/components/accounts/UserActivites');
const UserPosts = () => import('@/components/accounts/UserPosts');
const Login = () => import('@/components/auth/Login');
;

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      redirect: {name: 'index'},
      children: [
        {
          path: '/timeline',
          name: 'index',
          components: {
            header: Header,
            content: IndexContent,
            footer: Footer
          },
          meta: {
            title: '首页'
          }
        },
        {
          path: '/post',
          name: 'post',
          components: {
            header: Header,
            content: PostContent,
            footer: Footer
          },
          meta: {
            title: '文章'
          }
        },
        {
          path: '/post/add',
          name: 'postadd',
          components: {
            header: Header,
            content: PostAdd,
            footer: Footer
          },
          meta: {
            requireAuth: true,
            title: '文章创建',

          }
        },
        {
          path: '/post/:id',
          name: 'postdetail',
          components: {
            header: Header,
            content: PostDetail,
            footer: Footer
          },
          meta: {
            title: '文章详情'
          }
        },
        {
          path: '/post/:id/edit',
          name: 'PostEdit',
          components: {
            header: Header,
            content: PostEdit,
            footer: Footer
          },
          meta: {
            requireAuth: true,
            requireAuthor: true,
            title: '文章修改'
          }
        },
        {
          path: '/category',
          name: 'category',
          components: {
            header: Header,
            content: CategoryContent,
            footer: Footer
          },
          meta: {
            title: '分类'
          }
        },
        {
          path: '/user',
          components: {
            header: Header,
            content: UserContent,
            footer: Footer
          },
          children: [
            {
              path: '/',
              name: 'userindex',
              components: {
                userdetail: UserActivites,
              },
              meta: {
                title: '动态',
              }
            },
            {
              path: 'posts',
              name: 'userposts',
              components: {
                userdetail: UserPosts,
              },
              meta: {
                title: '用户文章',
              }
            },
          ]
        },
      ]
    },

    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
  ]
})

