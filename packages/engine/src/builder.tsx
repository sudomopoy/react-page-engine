import React from 'react';


const eventHandlers = {
    handleClick: () => alert('Button clicked!')
};
export function BindEventHandler(name: string, fc: () => {}) {
    eventHandlers[name] = fc;
}
export interface BuilderProp {
    type: string;
    className: string;
    style: string;
    content: string;
    children?: BuilderProp[];
    onClick: string;
    href: string;
}

interface ComponentBuilderProps {
    builderProps: BuilderProp;
}

const ComponentBuilder: React.FC<ComponentBuilderProps> = ({ builderProps }) => {
    const { type, className, style, content, children, onClick, href } = builderProps;

    const childComponents = !!children ? children.map((child) => ComponentBuilder({ builderProps: child })) : [];

    const Component = React.createElement(
        type,
        {
            className,
            style,
            onClick: onClick ? eventHandlers[onClick] : undefined,
            href
        },
        content,
        ...childComponents
    );

    return Component;
};

export default ComponentBuilder;
