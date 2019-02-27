import React from 'react';
import { Hello} from "../app/components/hello";

interface IAppProps {
    name: string
}
export default (props: IAppProps) => {
    return (
        <Hello name={props.name}/>
    )
}
