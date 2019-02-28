import React from 'react';

interface IGridProps {
    data: {
        firstName: string,
        lastName: string,
    }
}

export default class Grid extends React.Component<IGridProps> {
    render() {
        const data = this.props.data;
        return (
            <div>
                <div>First Name: {data.firstName}</div>
                <div>Last Name: {data.lastName}</div>
            </div>
        )
    }
}
