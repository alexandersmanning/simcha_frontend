import fetch from 'isomorphic-fetch'
import {addPost, CREATE_POST, GET_POSTS, receivePosts} from "../actions/postActions";
import {IPost} from "../shared/posts";
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
            statePosts.push({ author: { email: post.author.email }, body: post.body, title: post.title, id: post.id })
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
