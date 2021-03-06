import React from 'react';

interface IAboutProps {
    name?: string,
    match: {
        params: {
            userId: string
        }
    }
}

interface IAboutStore {
    name: string
}

export class About extends React.Component<IAboutProps, IAboutStore> {
    constructor(props: IAboutProps) {
        super(props);
        this.setState({ name: this.props.name || this.props.match.params.userId });
    }

    render() {
        return (
            <div>
                <div>This is the about page</div>
                <div>{this.state.name}</div>
            </div>
        )
    }
}
