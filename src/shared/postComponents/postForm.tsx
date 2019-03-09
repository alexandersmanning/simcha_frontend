import React, {FormEvent} from 'react';

interface IPostFormProps {
    title: string;
    body: string;
    onSubmit: (event: FormEvent<HTMLElement> ,title: string, body: string) => void;
}

export default function PostForm(props: IPostFormProps) {
    let title: HTMLInputElement;
    const titleRef = (element: HTMLInputElement): void => {
        title = element;
    };

    let body: HTMLInputElement;
    const bodyRef = (element: HTMLInputElement): void => {
        body = element;
    };

    return (
        <form>
            <label>
                <span>Title</span>
                <input
                    type="text"
                    ref={titleRef}
                    value={props.title}
                />
            </label>
            <label>
                <span>Body</span>
                <input
                    type="textarea"
                    ref={bodyRef}
                    value={props.body}
                />
            </label>
            <button
                type="submit"
                onClick={(e) => {props.onSubmit(e, title.value, body.value) }}
            >
                Submit
            </button>
        </form>
    )
}
