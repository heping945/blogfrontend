import api from '../api/http'


//登录
export const login = params => {
  return api.post(`login/`, params)
};
//注册
export const register = parmas => {
  return api.post(`user/`, parmas)
};


//获取分类信息
export const getCategory = params => {
  if ('slug' in params) {
    return api.get(`/category/` + params.slug + '/');
  }
  else {
    return api.get(`/category/`, params);
  }
};

//获取首页文章信息
export const getIndexPost = params => {
  return api.get(`/post/`, params)
};


//获取文章详情
export const getPostDetail = params => {
  return api.get(`/post/` + params.id, {params: params})
};
//创建文章
export const createPost = params => {
  return api.post('/post/', params)
};
//更新文章
export const updatePost = params => {
  return api.put('/post/'+params.id+'/', params)
};
//删除文章
export const deletePost = params => {
  return api.delete('/post/'+params.id+'/', params)
};


// 获取 分类列表
export const getcategorylist = params => {
  return api.get('/category/', params)
};
// 获取 标签列表
export const gettaglist = params => {
  return api.get('/tag/', params)
};

// 创建 新标签
export const createTag = params => {
  return api.post(`/tag/`, params)
};

// 图片上传  （单次图片）
export const postimgupload = params =>{
  return api.post('/postimg/',params,{ headers: {'Content-Type': 'multipart/form-data'},})
}
