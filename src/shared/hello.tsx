import React from 'react';

interface IProps {
    name?: string,
    helloText?: string
    match: {
        params: {
            userId: string
        }
    }
}

interface IState {
    name: string,
    helloText: string
}

export class Hello extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.setState({ name: this.props.name || this.props.match.params.userId, helloText: this.props.helloText || 'Hi'});
    }

    render() {
        return (
            <div>{this.state.helloText} {this.state.name}</div>
        )
    }
}
