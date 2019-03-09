import React, {FormEvent} from 'react';
import {IPost} from "./posts";
import PostForm from "./postForm";
import {connect} from "react-redux";
import userReducer from "../../reducers/userReducer";
import {editPost} from "../../actions/postActions";

interface IEditPost {
    post: IPost;
    user: {
        id: string;
        email: string;
    }
    editPost: (post: { id: string, title: string, body: string}) => void;
}

class EditPost extends React.Component<IEditPost,{ title: string, body: string }> {
    constructor(props: IEditPost) {
        super(props);
        this.state = { title: this.props.post.title, body: this.props.post.body };
    }

    updatePost(e: FormEvent<HTMLElement>, title: string, body: string) {
        const postData = {
            id: this.props.post.id,
            title,
            body,
        };

        this.props.editPost(postData);
    }

    render() {
        return (
            <PostForm
                title={this.state.title}
                body={this.state.body}
                onSubmit={this.updatePost.bind(this)}
            />
        )
    }
}

const mapStateToProps = (state: any, action: any) => {
    return {
        user: userReducer(state.user, action),
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        editPost(post: { id: string, title: string, body: string }) {
            dispatch(editPost(post))
        }
    }
};

const EditPostComponent = connect(mapStateToProps, mapDispatchToProps)(EditPost);
export default EditPostComponent;
