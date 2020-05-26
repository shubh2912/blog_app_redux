import actionTypes from './actionTypes';
import axios from 'axios';

export const getBlogData = () => {
    return (dispatch) => {
        axios("http://localhost:8082/blog/getblogs")
            .then(res => dispatch(saveBlogData(res.data.blog)))
            .catch(err => console.log(err))
    }
}

export const deleteBlogData = (blogId) => {
    return (dispatch) => {
        axios({
            url: `http://localhost:8082/blog/deleteblog/${blogId}`,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => dispatch(getBlogData()))
    }
}

export const addBlogdata = (blogObj) => {
    return (dispatch) => {
        axios({
            url: `http://localhost:8082/blog/addblog`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: blogObj
        }).then(res => dispatch(getBlogData()))
    }
}

export const updateBlogData = (blogObj, blogId) => {
    return (dispatch) => {
        axios({
            url: `http://localhost:8082/blog/updateblog/${blogId}`,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: blogObj
        }).then(res => dispatch(getBlogData()))
    }
}

export const saveBlogData = (response) => {
    return {
        type: actionTypes.SAVE_BLOG_DATA,
        payload: response
    }
}