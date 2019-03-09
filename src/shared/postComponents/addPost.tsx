import React, {FormEvent} from 'react';
import userReducer from "../../reducers/userReducer";
import {connect} from "react-redux";
import {createPost} from "../../actions/postActions";
import PostForm from './postForm';

interface IAddPostProps {
    user: {
        id: string;
        email: string;
    },
    createPost: (post: { body: string, title: string }, callback: () => void) => void,
}

class AddPost extends React.Component<IAddPostProps, { title: string, body: string }> {
    constructor(props: IAddPostProps) {
        super(props);
        this.state = { title: '', body: '' };
    }

    addPost(e: FormEvent<HTMLElement>, title: string, body: string) {
        e.preventDefault();
        const bodyInput = {
            title: title,
            body: body,
        };

        this.props.createPost(bodyInput, () => {
            this.setState({ title: '', body: '' });
        });
    }

    render() {
        if (!this.props.user.id) {
            return (
                <div>Login to add a post!</div>
            )
        }

        return (
            <div>
                <div>Add a post here!</div>
                <PostForm title={this.state.title} body={this.state.body} onSubmit={this.addPost.bind(this)}/>
            </div>
        )
    }
}

const mapStateToProps = (state: any, action: any) => {
    return {
        user: userReducer(state.user, action),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        createPost(post: { body: string, title: string }, callback: () => void) {
            dispatch(createPost(post, callback));
        },
    }
};

const AddPostComponent = connect(mapStateToProps, mapDispatchToProps)(AddPost);
export default AddPostComponent;
