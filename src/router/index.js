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
const SettingsContent = () => import('@/components/settings/SettingsContent');
const Profile = () => import('@/components/settings/Profile');
const Post = () => import('@/components/settings/Post');
const Account = () => import('@/components/settings/Account');
const Password = () => import('@/components/settings/Password');
const SearchContent = () => import('@/components/search/SearchContent');
const Login = () => import('@/components/auth/Login');
;

Vue.use(Router)

// 解决重复点击出错的NavigationDuplicated的解决方案，原理未知
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

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
          path: '/search',
          name: 'search',
          components: {
            header: Header,
            content: SearchContent,
            footer: Footer
          },
          meta: {
            title: '搜索'
          },
        },
        {
          path: '/user/:username',
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
        {
          path: '/settings',
          components: {
            header: Header,
            content: SettingsContent,
            footer: Footer
          },
          redirect: {name: 'settprofile'},
          meta: {
            requireAuth: true,
            dnotscroll: true

          },
          children: [
            {
              path: 'profile',
              name: 'settprofile',
              components: {
                settingtab: Profile,
              },
              meta: {
                title: '用户信息',
                requireAuth: true,
              }
            },
            {
              path: 'posts',
              name: 'settposts',
              components: {
                settingtab: Post,
              },
              meta: {
                title: '文章管理',
                requireAuth: true,
              }
            },
            {
              path: 'account',
              name: 'account',
              components: {
                settingtab: Account,
              },
              meta: {
                title: '账户关联',
                requireAuth: true,
              }
            },
               {
              path: 'password',
              name: 'password',
              components: {
                settingtab: Password,
              },
              meta: {
                title: '密码修改',
                requireAuth: true,
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


