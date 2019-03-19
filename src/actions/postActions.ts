import {IPost} from "../shared/postComponents/posts";

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const GET_POSTS = 'GET_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const SEND_EDIT = 'SEND_EDIT';

export const createPost = (post: { title: string, body: string }, callback: () => void) => {
    return {
        type: CREATE_POST,
        payload: post,
        callback,
    }
};

export const addPost = (post: IPost) => {
    return {
        type: ADD_POST,
        payload: post,
    }
};

export const receivePosts = (posts: IPost[]) => {
    return {
        type: RECEIVE_POSTS,
        payload: posts,
    }
};

export const getPosts = () => {
    return {
        type: GET_POSTS,
    };
};

export const deletePost = (id: number) => {
    return {
        type: DELETE_POST,
        payload: id,
    }
};

export const editPost = (id: number) => {
    return {
        type: EDIT_POST,
        payload: id,
    }
};

export const sendEdit = (post: IPost) => {
    return {
        type: SEND_EDIT,
        payload: post,
    }
};

export const updatePost = (post: IPost) => {
    return {
        type: UPDATE_POST,
        payload: post,
    }
};
