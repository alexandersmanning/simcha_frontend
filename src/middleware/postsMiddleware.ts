import {
    addPost,
    CREATE_POST,
    DELETE_POST, EDIT_POST,
    GET_POSTS,
    receivePosts,
    updatePost
} from "../actions/postActions";
import {IPost} from "../shared/postComponents/posts";
import {AnyAction, Dispatch} from "redux";
import {handleCSRF} from "../utils/middlewareHelpers";
import {simchaFetch} from "../utils/fetchUtil";

export const getPosts = (store: any) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (action.type !== GET_POSTS) return next(action);

    simchaFetch('posts', { method: 'GET' })
        .then(({ data, token }: { data: [], token: string }) => {
            handleCSRF(store, token);
            const statePosts:IPost[] = [];
            if (!data) return;
            data.forEach((post: IPost) => {
                statePosts.push({ author: { id: post.author.id, email: post.author.email }, body: post.body, title: post.title, id: post.id })
            });

            store.dispatch(receivePosts(statePosts));
        });
};

export const createPost = (store: any) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (action.type !== CREATE_POST) return next(action);
    const csrfToken = store.getState().token;

    simchaFetch('posts', { method: 'POST', body: action.payload, csrfToken })
        .then(({ token, data }: { token: string, data: IPost }) => {
            handleCSRF(store, token);
            store.dispatch(addPost(data));
            action.callback();
        }).catch((err: Error) => {
            console.log(err);
        })
};

export const deletePost = (store: any) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (action.type !== DELETE_POST) return next(action);
    const csrfToken = store.getState().token;

    simchaFetch(`posts/${action.payload}`, { method: 'DELETE', csrfToken })
        .then(({ token }: { token: string }) => {
            handleCSRF(store, token);
            return next(action)
        }).catch((err: Error) => {
            console.log(err)
        });
};

export const editPost = (store: any) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (action.type !== EDIT_POST) return next(action);
    const csrfToken = store.getState().token;

    simchaFetch(`posts/${action.payload.id}`, { method: 'PUT', csrfToken, body: JSON.stringify(action.payload.post) })
        .then(({ token }: { token: string }) => {
            handleCSRF(store, token);
            store.dispatch(updatePost(action.payload));
        })
        .catch((err) => {
            console.log(err);
        });
};
