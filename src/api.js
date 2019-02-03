import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from './stores/commonStore';
import authStore from './stores/authStore';


const superagent = superagentPromise(_superagent, global.Promise);
// const encode = encodeURIComponent;

const API_ROOT = 'https://testproject-api-v2.strv.com';
const API_KEY = '34V6kXl7q7gTm/7haqpg2GoDlCo4r8yvBdrjm5Jgm8a1';

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout();
  }
  return err;
};

const responseBody = res => res.body;

const parseTokens = res => {
  commonStore.setToken(res.headers['authorization'])
  if (res.headers['refresh-token']) {
    commonStore.setRefreshToken(res.headers['refresh-token'])
  }
  return responseBody(res)
}

const prepareHeaders = req => {
  if (commonStore.token) {
    req.set('authorization', `Token ${commonStore.token}`);
  }
};
const prepareApiKey =  req => {
  req.set('APIKey', API_KEY);
};

const requests = {
  // del: url =>
  //   superagent
  //     .del(`${API_ROOT}${url}`)
  //     .use(prepareHeaders)
  //     .end(handleErrors)
  //     .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(prepareHeaders)
      .use(prepareApiKey)
      .end(handleErrors)
      .then(responseBody),
  // put: (url, body) =>
  //   superagent
  //     .put(`${API_ROOT}${url}`, body)
  //     .use(prepareHeaders)
  //     .end(handleErrors)
  //     .then(responseBody),
  post: (url, body, isLogin=false) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(prepareHeaders)
      .use(prepareApiKey)
      .end(handleErrors)
      .then(res => isLogin ? parseTokens(res) : responseBody(res))
};

const Auth = {
  login: (email, password) =>
    requests.post('/auth/native', { email, password }, true),
  register: (firstName, lastName, email, password) =>
    requests.post('/users', { firstName, lastName, email, password }),
  refreshToken: (refreshToken) => {
    return superagent
      .post(`${API_ROOT}/auth/native`, { refreshToken })
      .use(req => req.set('APIKey', API_KEY))
      .end(handleErrors)
      .then(responseBody)
  }
  // save: user =>
  //   requests.put('/user', { user })
};

const Events = {
  getAll: () =>
    superagent
      .get(`${API_ROOT}/events`)
      .use(prepareApiKey)
      .end(handleErrors)
      .then(responseBody)
};

// const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
// const omitSlug = article => Object.assign({}, article, { slug: undefined })

/*const Articles = {
  all: (page, lim = 10) =>
    requests.get(`/articles?${limit(lim, page)}`),
  byAuthor: (author, page, query) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page, lim = 10) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(lim, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    requests.post('/articles', { article })
};*/

/*const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};*/

/*const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};*/

export default {
  // Articles,
  Auth,
  Events,
  // Comments,
  // Profile,
  // Tags,
};
