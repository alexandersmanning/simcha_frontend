import fetch from 'isomorphic-fetch'
import {
    addPost,
    CREATE_POST,
    DELETE_POST, EDIT_POST,
    GET_POSTS,
    receivePosts,
    UPDATE_POST,
    updatePost
} from "../actions/postActions";
import {IPost} from "../shared/postComponents/posts";
import {AnyAction, Dispatch} from "redux";

export const getPosts = (store: any) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (action.type !== GET_POSTS) return next(action);

    fetch('http://localhost:8000/posts', {
        method: 'GET',
        headers: new Headers({
            'Content-type': 'application/json',
            'Accept': 'application/json',
        }),
    }).then((res: Response) => {
        return res.json();
    }).then((posts) => {
        const statePosts:IPost[] = [];
        if (!posts) return;
        posts.forEach((post: IPost) => {
            statePosts.push({ author: { id: post.author.id, email: post.author.email }, body: post.body, title: post.title, id: post.id })
        });

        store.dispatch(receivePosts(statePosts));
    })
};

export const createPost = (store: any) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (action.type !== CREATE_POST) return next(action);

    const headers: Headers = new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
    });

    fetch('http://localhost:8000/posts', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(action.payload),
        headers,
    }).then((res: Response) => {
        if (!res.ok) {
            throw new Error('Something Went Wrong');
        }
        return res.json();
    }).then((post: IPost) => {
        store.dispatch(addPost(post));
        action.callback();
    }).catch((err) => {
        console.log(err);
    })
};

export const deletePost = (store: any) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (action.type !== DELETE_POST) return next(action);

    const headers = new Headers({
        'Accept': 'application/json',
    });

    fetch(`http://localhost:8000/posts/${action.payload}`, {
        method: 'DELETE',
        credentials: 'include',
        headers,
    }).then((res: Response) => {
        return res.json();
    }).then(() => {
        return next(action)
    }).catch((err) => {
        console.log(err)
    });
};

export const editPost = (store: any) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (action.type !== EDIT_POST) return next(action);

    const headers = new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
    });

    fetch(`http://localhost:8000/posts/${action.payload.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers,
    }).then((res: Response) => res.json())
        .then(() => {
            store.dispatch(updatePost(action.payload));
        })
        .catch((err) => {
            console.log(err);
        });
};
