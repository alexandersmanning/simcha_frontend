import React, {FormEvent} from 'react';
import fetch from 'isomorphic-fetch';
import userReducer from "../reducers/userReducer";
import {connect} from "react-redux";
import {IPost} from "./posts";
import {addPost} from "../actions/postActions";

interface IAddPostProps {
    user: {
        id: string;
        email: string;
    },
    addPost: (post: IPost) => void,
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

        const headers: Headers = new Headers({
            'Content-type': 'application/json',
            'Accept': 'application/json',
        });

        fetch('http://localhost:8000/posts', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(bodyInput),
            headers,
        }).then((res: Response) => {
            if (!res.ok) {
                throw new Error('Something Went Wrong');
            }
            return res.json();
        }).then((post: IPost) => {
            this.props.addPost(post);
        }).catch((err) => {
            console.log(err);
        })
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
        addPost(post: IPost) {
            dispatch(addPost(post));
        },
    }
};

const AddPostComponent = connect(mapStateToProps, mapDispatchToProps)(AddPost);
export default AddPostComponent;
