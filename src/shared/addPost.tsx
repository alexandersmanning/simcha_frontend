import React, {FormEvent} from 'react';
import userReducer from "../reducers/userReducer";
import {connect} from "react-redux";
import {createPost} from "../actions/postActions";

interface IAddPostProps {
    user: {
        id: string;
        email: string;
    },
    createPost: (post: { body: string, title: string }, callback: () => void) => void,
}

class AddPost extends React.Component<IAddPostProps, {}> {
    private title: HTMLInputElement;
    private readonly titleRef: (element: HTMLInputElement) => void;

    private body: HTMLTextAreaElement;
    private readonly bodyRef: (element: HTMLTextAreaElement) => void;

    constructor(props: IAddPostProps) {
        super(props);
        this.titleRef = (element: HTMLInputElement) => {
            this.title = element;
        };

        this.bodyRef = (element: HTMLTextAreaElement) => {
            this.body = element;
        };
    }

    addPost(e: FormEvent<HTMLElement>) {
        e.preventDefault();
        const bodyInput = {
            title: this.title.value,
            body: this.body.value,
        };

        this.props.createPost(bodyInput, () => {
            this.title.value = '';
            this.body.value = '';
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
                <form>
                    <label>
                        <span>Title</span>
                        <input placeholder="Add post title" ref={this.titleRef} />
                    </label>
                    <label>
                        <span>Body</span>
                        <textarea placeholder="Add a post body here" ref={this.bodyRef}/>
                    </label>
                    <button onClick={this.addPost.bind(this)}>Add Post</button>
                </form>
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
