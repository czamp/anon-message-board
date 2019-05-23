import Axios from 'axios';
import URL from '../config';

const API = {

  listBoards: (callback, error) => {
    return Axios.get(`${URL}/api/boards`)
      .then(res => callback(res.data))
      .catch(err => error(err.response))
  },

  listThreads: (board, callback, error) => {
    Axios.get(`${URL}/api/threads/${board}`)
      .then(res => callback(res.data))
      .catch(err => error(err.response))
  },

  getCompleteThread: (board, thread_id, callback, error) => {
    Axios.get(`${URL}/api/replies/${board}?thread_id=${thread_id}`)
    .then(res => callback(res))
    .catch(err => error(err.response))
  },

  postThread: (event, board, text, delete_password, callback, error) => {
    event.preventDefault();
    Axios.post(`${URL}/api/threads/${board}`, {text, delete_password})
      .then(res => callback(res))
      .catch(err => error(err.response));
  },

  postReply: (event, board, text, delete_password, thread_id, callback, error) => {
    event.preventDefault();
    Axios.post(`${URL}/api/replies/${board}`, {text, delete_password, thread_id})
      .then(res => callback(res))
      .catch(err => error(err.response))
  },

  deleteThread: (event, board, thread_id, delete_password, callback, error) => {
    event.preventDefault();
    Axios.delete(`${URL}/api/threads/${board}`, {data: {thread_id, delete_password}})
      .then(res => callback(res))
      .catch(err => error(err.response));
  },

  deleteReply: (event, board, thread_id, reply_id, delete_password, callback, error) => {
    event.preventDefault();
    Axios.delete(`${URL}/api/replies/${board}`, {data: {thread_id, reply_id, delete_password}})
      .then(res => callback(res))
      .catch(err => error(err.response));
  },

  reportThread: (board, thread_id, callback, error) => {
    Axios.put(`${URL}/api/threads/${board}`, {thread_id})
      .then(res => callback(res))
      .catch(err => error(err.response))
  },

  reportReply: (board, thread_id, reply_id, callback, error) => {
    Axios.put(`${URL}/api/replies/${board}`, {thread_id, reply_id})
      .then(res => callback(res))
      .catch(err => error(err.response))
  }

}

export default API;
