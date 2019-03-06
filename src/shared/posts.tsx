import React from 'react';
import AddPost from "./addPost";
import postReducer from "../reducers/postReducer";
import {connect} from "react-redux";
import {getPosts, receivePosts} from "../actions/postActions";

export interface IPost {
    id: string,
    title: string;
    body: string;
    author: {
        email: string
    }
}

interface IPostProps {
    posts: IPost[];
    getPosts: () => void;
}

class Posts extends React.Component<IPostProps, {}> {
    constructor(props: IPostProps) {
        super(props);
    }

    componentDidMount(): void {
        this.props.getPosts();
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
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getPosts: () => {
            dispatch(getPosts())
        }
    }
};

const PostsComponent = connect(mapStateToProps, mapDispatchToProps)(Posts);
export default PostsComponent;
