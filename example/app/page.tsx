"use client"
import { useState } from 'react';
import { BuilderProp } from '../../packages/engine/src/element.builder';
import { Engine } from '../../packages/engine/src/engine'
import root_element from './root.json';
import cmps from './components.json';

export default function Home() {
  const [root, setRoot] = useState(JSON.parse(JSON.stringify(root_element)) as BuilderProp)
  const [components, setComponents] = useState(JSON.parse(JSON.stringify(cmps)) as BuilderProp[])
  return (
    <div>
      <Engine root={root} components={components} />
    </div>
  );
}
