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

const responseBody = res => res.body
const parseTokens = res => {
  if (res.headers['authorization']) {
    commonStore.setToken(res.headers['authorization'])
  }
  if (res.headers['refresh-token']) {
    commonStore.setRefreshToken(res.headers['refresh-token'])
  }
  return res
}
const prepareHeaders = req => {
  if (commonStore.token) {
    req.set('Authorization', commonStore.token);
  }
};
const prepareApiKey =  req => {
  req.set('APIKey', API_KEY);
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(prepareHeaders)
      .use(prepareApiKey)
      .end(handleErrors)
      .then(responseBody),

  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(prepareHeaders)
      .use(prepareApiKey)
      .end(handleErrors)
      .then(responseBody),

  patch: url =>
    superagent
      .patch(`${API_ROOT}${url}`)
      .use(prepareHeaders)
      .use(prepareApiKey)
      .end(handleErrors)
      .then(responseBody),

  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(prepareHeaders)
      .use(prepareApiKey)
      .end(handleErrors)
      .then(responseBody),

  loginOrRefresh: (body) =>
    superagent
      .post(`${API_ROOT}/auth/native`, body)
      .use(prepareApiKey)
      .end(handleErrors)
      .then(parseTokens)
      .then(responseBody),

  register: (body) =>
    superagent
      .post(`${API_ROOT}/users`, body)
      .use(prepareApiKey)
      .end(handleErrors)
      .then(parseTokens)
      .then(responseBody),

};

const Auth = {
  login: (email, password) =>
    requests.loginOrRefresh({ email, password }),
  register: (firstName, lastName, email, password) =>
    requests.register({ firstName, lastName, email, password }),
  refreshToken: (refreshToken) =>
    requests.loginOrRefresh({ refreshToken }),
};

const Events = {
  getAll: () =>
    superagent
      .get(`${API_ROOT}/events`)
      .use(prepareApiKey)
      .end(handleErrors)
      .then(responseBody),
  join: (eventId) =>
    requests.post(`/events/${eventId}/attendees/me`),
  leave: (eventId) =>
    requests.del(`/events/${eventId}/attendees/me`),
  create: (title, description, startsAt, capacity) =>
    requests.post(`/events`, {title, description, startsAt, capacity}),
};

// '': 'Awesome event',
// '': 'A bunch of people doing awesome stuff',
// '': '2016-12-08T10:46:33.901Z',
// '': 50

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


export default {
  Auth,
  Events,
};
