import React, {ReactComponentElement} from "react";

const asyncComponent = (getComponent: any) => {
    return class AsyncComponent extends React.Component<{}, {}> {
        private static Component: any = null;
        public state = { Component: AsyncComponent.Component };

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then((Component: any) => {
                    AsyncComponent.Component = Component;
                    this.setState({ Component })
                })
            }
        }

        render() {
            const { Component } = this.state;
            if (Component) {
                return <Component {...this.props} />
            }
            // @ts-ignore
            console.log(__isBrowser__);
            return null
        }
    };
};

export default asyncComponent;
