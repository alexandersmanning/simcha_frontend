import React, {FormEvent} from 'react';
import {IPost} from "./posts";
import PostForm from "./postForm";
import {connect} from "react-redux";
import userReducer, {IUserState} from "../../reducers/userReducer";
import {sendEdit} from "../../actions/postActions";
import {IApplicationState} from "../../reducer";
import {IGetUserAction} from "../../actions/userActions";
import {Dispatch} from "redux";

interface IEditPost {
    post: IPost;
    user: IUserState;
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
                id: this.props.user.id,
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

const mapStateToProps = (state: IApplicationState, action: IGetUserAction) => {
    return {
        user: userReducer(state.user, action),
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendEdit(post: IPost){
            dispatch(sendEdit(post))
        },
    }
};

const EditPostComponent = connect(mapStateToProps, mapDispatchToProps)(EditPost);
export default EditPostComponent;
