import React, { ReactElement } from 'react';
import { PrefabComponent } from './component.builder';


const eventHandlers = {
    handleClick: () => alert('Button clicked!')
};
// export function BindEventHandler(name: string, fc: () => {}) {
//     eventHandlers[name] = fc;
// }
export interface BuilderProp {
    type: string;
    component_id?: string;
    className?: string;
    style?: string;
    content?: string;
    children?: BuilderProp[];
    onClick?: string;
    href?: string;
}

interface ElementBuilderProps {
    builderProp: BuilderProp;
    getComponent: (builderProp: BuilderProp) => PrefabComponent;
}

const ElementBuilder: React.FC<ElementBuilderProps> = ({ builderProp, getComponent }) => {
    const { type, className, style, content, children, onClick, href } = builderProp;

    const childComponents = !!children ? children.map((child) => ElementBuilder({ builderProp: child, getComponent })) : [];
    let Component: ReactElement;
    if (type === "component") {
        Component = getComponent(builderProp)(childComponents, content)
    } else {
        Component = React.createElement(
            type,
            {
                className,
                style,
                // onClick: onClick ? eventHandlers[onClick] : undefined,
                href
            },
            content,
            ...childComponents
        );
    }

    return Component;
};

export default ElementBuilder;
