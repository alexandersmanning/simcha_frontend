import React, {FormEvent} from 'react';
import AddPost from "./addPost";
import postReducer from "../../reducers/postReducer";
import {connect} from "react-redux";
import {deletePost, editPost, getPosts} from "../../actions/postActions";
import userReducer, {IUserState} from "../../reducers/userReducer";
import EditPostComponent from "./editPost";
import {IApplicationState} from "../../reducer";
import {Dispatch} from "redux";

export interface IPost {
    id: number,
    title: string;
    body: string;
    edit: boolean;
    author: IUserState;
}

interface IPostProps {
    posts: IPost[];
    user: { id: number, email: string };
    getPosts: () => void;
    deletePost: (id: number) => void;
    editPost: (id: number) => void;
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

    handleEdit(e: FormEvent<HTMLElement>, id: number) {
        e.preventDefault();
        this.props.editPost(id);
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
                            post.edit ?
                                <EditPostComponent post={post} user={post.author}/>
                                :
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
                                    {
                                        this.allowDelete.call(this, post) &&
                                        !post.edit &&
                                        <button onClick={(e) => {
                                            this.handleEdit.call(this, e, post.id)
                                        }}>Edit Post</button>
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

const mapStateToProps = (state: IApplicationState, action: any) => {
    return {
        posts: postReducer(state.posts, action),
        user: userReducer(state.user, action),
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getPosts: () => {
            dispatch(getPosts())
        },
        deletePost: (id: number) => {
            dispatch(deletePost(id))
        },
        editPost: (id: number) => {
            dispatch(editPost(id))
        }
    }
};

const PostsComponent = connect(mapStateToProps, mapDispatchToProps)(Posts);
export default PostsComponent;
