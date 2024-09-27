import React from 'react';
import ComponentBuilder, { BuilderProp } from './builder';

interface EngineProps {
    components: BuilderProp[];
    classname?: string;
}

const Engine: React.FC<EngineProps> = ({ components, classname }) => {
    return (
        <div className={`wrapper ${classname}`}>
            {components.map(bp => <ComponentBuilder builderProps={bp} />)}
        </div>
    );
};



export default Engine;