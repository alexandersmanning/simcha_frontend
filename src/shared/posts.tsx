import React, {DOMElement, FormEvent} from 'react';
import AddPost from "./addPost";
import postReducer from "../reducers/postReducer";
import {connect} from "react-redux";
import {deletePost, getPosts, receivePosts} from "../actions/postActions";
import userReducer from "../reducers/userReducer";

export interface IPost {
    id: string,
    title: string;
    body: string;
    author: {
        id: number,
        email: string
    }
}

interface IPostProps {
    posts: IPost[];
    user: { id: number, email: string };
    getPosts: () => void;
    deletePost: (id: number) => void;
}

class Posts extends React.Component<IPostProps, {}> {
    constructor(props: IPostProps) {
        super(props);
    }

    componentDidMount(): void {
        this.props.getPosts();
    }

    handleDelete(e: FormEvent<HTMLElement>, id: number) {
        e.preventDefault();
        this.props.deletePost(id);
    }

    allowDelete(post: IPost) {
        return this.props.user && post && this.props.user.id === post.author.id;
    }

    render() {
        return (
            <div>
                {
                    this.props.posts.map((post: IPost) => {
                        return (
                            <div>
                                <div>Email: {post.author.email}</div>
                                <div>Title: {post.title}</div>
                                <div>Body: {post.body}</div>
                                {
                                    this.allowDelete.call(this, post) &&
                                    <button onClick={(e) => {
                                        this.handleDelete.call(this, e, post.id)
                                    }}>Delete Post</button>
                                }
                            </div>
                        )
                    })
                }
                <AddPost/>
            </div>
        );
    }
}

const mapStateToProps = (state: any, action: any) => {
    return {
        posts: postReducer(state.posts, action),
        user: userReducer(state.user, action),
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getPosts: () => {
            dispatch(getPosts())
        },
        deletePost: (id: number) => {
            dispatch(deletePost(id))
        }
    }
};

const PostsComponent = connect(mapStateToProps, mapDispatchToProps)(Posts);
export default PostsComponent;
