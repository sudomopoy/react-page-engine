import React, { ReactNode } from 'react';
import { BuilderProp } from './element.builder';


const eventHandlers = {
    handleClick: () => alert('Button clicked!')
};
// export function BindEventHandler(name: string, fc: () => {}) {
//     eventHandlers[name] = fc;
// }


interface ComponentBuilderProps {
    builderProp: BuilderProp;
}
export type PrefabComponent = (childComponents: ReactNode[], content?: string) => React.ReactElement;

const ComponentBuilder = ({ builderProp }: ComponentBuilderProps): PrefabComponent => {
    const { type, className, content, style } = builderProp;



    return function (childComponents: ReactNode[], content?: string) {
        const Component = React.createElement(
            type,
            {
                className,
                style,
                // onClick: onClick ? eventHandlers[onClick] : undefined,
                // href
            },
            content,
            ...childComponents
        );

        return Component
    };
};

export default ComponentBuilder;
