import React from 'react';
import fetch from 'isomorphic-fetch';

interface IPost {
    title: string;
    body: string;
    author: {
        email: string
    }
}

interface IPostState {
    posts: IPost[]
}

export default class Posts extends React.Component<{}, IPostState> {
    constructor(props: {}) {
        super(props);
        this.state = { posts: [] };
    }

    componentDidMount(): void {
        fetch('http://localhost:8000/posts', {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
            }),
        }).then((res) => {
            return res.json();
        }).then((posts) => {
            const statePosts:IPost[] = [];
            posts.forEach((post: IPost) => {
                statePosts.push({ author: { email: post.author.email }, body: post.body, title: post.title })
            });

            return this.setState({ posts: statePosts });
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.posts.map((post: IPost) => {
                        return (
                            <div>
                                <div>Email: {post.author.email}</div>
                                <div>Title: {post.title}</div>
                                <div>Body: {post.body}</div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
