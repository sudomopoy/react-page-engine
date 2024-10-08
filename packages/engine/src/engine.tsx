import React, { useEffect, useRef, useState } from 'react';
import ElementBuilder, { BuilderProp } from './element.builder';
import ComponentBuilder, { PrefabComponent } from './component.builder';

interface EngineProps {
    root: BuilderProp;
    components: BuilderProp[];
    classname?: string;
}

export const Engine: React.FC<EngineProps> = ({ root, components, classname }) => {
    const prefabComponents = useRef<Map<string, PrefabComponent>>(new Map<string, PrefabComponent>)
    function getComponent(builderProp: BuilderProp) {
        let prefab = prefabComponents.current.get(builderProp.component_id || "");
        if (!prefab) {
            prefab = generatePrefabComponent(builderProp.component_id || "")
        }
        return prefab as PrefabComponent
    }
    function generatePrefabComponent(cid: string): PrefabComponent {
        const cmp = components.find((c) => c.component_id === cid)
        if (cmp === undefined) {
            throw new Error("🔥HOT: component is not found")
        }
        const prefab = ComponentBuilder(
            {
                builderProp: cmp
            }
        );
        prefabComponents.current.set(cmp.component_id || "", prefab)
        return prefab
    }


    return (
        <div id='react-engine_wrapper' className={`${classname}`}>
            <ElementBuilder builderProp={root} getComponent={getComponent} />
        </div>
    );
};



export default Engine;