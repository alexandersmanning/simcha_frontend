// export type Lit = string | number | boolean | undefined | null | void | {}
// export const ActionConstant = <T extends Lit>(v: T) => v;

import {IPost} from "../shared/postComponents/posts";

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const GET_POSTS = 'GET_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const SEND_EDIT = 'SEND_EDIT';

export interface ICreatePostAction {
    type: typeof CREATE_POST;
    payload: { title: string, body: string };
    callback: () => void;
}

export const createPost = (post: { title: string, body: string }, callback: () => void): ICreatePostAction => {
    return {
        type: CREATE_POST,
        payload: post,
        callback,
    }
};

export interface IAddPostAction {
    type: typeof ADD_POST,
    payload: IPost,
}

export const addPost = (post: IPost): IAddPostAction => {
    return {
        type: ADD_POST,
        payload: post,
    }
};

export interface IReceivePostsAction {
    type: typeof RECEIVE_POSTS;
    payload: IPost[];
}

export const receivePosts = (posts: IPost[]): IReceivePostsAction => {
    return {
        type: RECEIVE_POSTS,
        payload: posts,
    }
};

export interface IGetPostsAction {
    type: typeof GET_POSTS;
}

export const getPosts = (): IGetPostsAction => {
    return {
        type: GET_POSTS,
    };
};

export interface IDeletePostAction {
    type: typeof DELETE_POST;
    payload: number;
}

export const deletePost = (id: number): IDeletePostAction => {
    return {
        type: DELETE_POST,
        payload: id,
    }
};

export interface IEditPostAction {
    type: typeof EDIT_POST;
    payload: number;
}

export const editPost = (id: number): IEditPostAction => {
    return {
        type: EDIT_POST,
        payload: id,
    }
};

export interface ISendEditAction {
    type: typeof SEND_EDIT;
    payload: IPost;
}

export const sendEdit = (post: IPost): ISendEditAction => {
    return {
        type: SEND_EDIT,
        payload: post,
    }
};

export interface IUpdatePost {
    type: typeof UPDATE_POST;
    payload: IPost;
}

export const updatePost = (post: IPost): IUpdatePost => {
    return {
        type: UPDATE_POST,
        payload: post,
    }
};

export type PostActions =
    IUpdatePost |
    ISendEditAction |
    IEditPostAction |
    IAddPostAction |
    IReceivePostsAction |
    IGetPostsAction |
    IDeletePostAction |
    IEditPostAction
