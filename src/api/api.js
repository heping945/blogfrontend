import api from '../api/http'


//登录
export const login = params => {
  return api.post(`login/`, params)
};
//注册
export const register = parmas => {
  return api.post(`users/`, parmas)
};


//获取分类信息
export const getCategory = params => {
  if ('slug' in params) {
    return api.get(`/categories/` + params.slug + '/');
  } else {
    return api.get(`/categories/`, params);
  }
};

//获取首页文章信息
export const getIndexPost = params => {
  return api.get(`/posts/`, {params: params})
};


//获取文章详情
export const getPostDetail = params => {
  return api.get(`/posts/` + params.id, {params: params})
};
//创建文章
export const createPost = params => {
  return api.post('/posts/', params)
};
//更新文章
export const updatePost = params => {
  return api.put('/posts/' + params.id + '/', params)
};
//删除文章
export const deletePost = params => {
  return api.delete('/posts/' + params.id + '/', params)
};


// 获取 分类列表
export const getcategorylist = params => {
  return api.get('/categories/', params)
};
// 获取 标签列表
export const gettaglist = params => {
  return api.get('/tags/', params)
};

// 创建 新标签
export const createTag = params => {
  return api.post(`/tags/`, params)
};

// 图片上传  （单次图片）
export const postimgupload = params => {
  return api.post('/postimg/', params, {headers: {'Content-Type': 'multipart/form-data'},})
};


// 获取用户信息

export const getuserdetail = params => {
  return api.get('/users/' + params.username, params,)
};


//收藏
export const addFav = params => {
  return api.post('/userfavs/', params)
};

//取消收藏
export const delFav = postId => {
  return api.delete(`/userfavs/` + postId + '/')
};

export const getAllFavs = () => {
  return api.get(`/userfavs/`)
};

//判断是否收藏
export const getFav = postId => {
  return api.get(`/userfavs/` + postId + '/')
};


// 搜索

export const search = params=>{
  return api.get('/'+params.type+'/',{params:params.keyword})
}
