import React, {FormEvent} from 'react';
import {IPost} from "./posts";
import PostForm from "./postForm";
import {connect} from "react-redux";
import userReducer from "../../reducers/userReducer";
import {editPost, sendEdit} from "../../actions/postActions";

interface IEditPost {
    post: IPost;
    user: {
        id: string;
        email: string;
    }
    sendEdit: (post: IPost) => void;
}

class EditPost extends React.Component<IEditPost,{ title: string, body: string }> {
    constructor(props: IEditPost) {
        super(props);
        this.state = { title: this.props.post.title, body: this.props.post.body };
    }

    updatePost(e: FormEvent<HTMLElement>, title: string, body: string) {
        e.preventDefault();
        const postData = {
            id: this.props.post.id,
            title,
            body,
            author: {
                email: this.props.user.email,
                id: parseInt(this.props.user.id),
            },
            edit: false,
        };

        this.props.sendEdit(postData);
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
        sendEdit(post: IPost){
            dispatch(sendEdit(post))
        },
    }
};

const EditPostComponent = connect(mapStateToProps, mapDispatchToProps)(EditPost);
export default EditPostComponent;
