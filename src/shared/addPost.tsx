import React, {FormEvent} from 'react';
import fetch from 'isomorphic-fetch';

export default class AddPost extends React.Component<{}, {}> {
    private title: HTMLInputElement;
    private readonly titleRef: (element: HTMLInputElement) => void;

    private body: HTMLTextAreaElement;
    private readonly bodyRef: (element: HTMLTextAreaElement) => void;

    constructor(props: {}) {
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
        }).then((post) => {
            console.log(post);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
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
