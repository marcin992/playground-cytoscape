import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {ReactCytoscape} from 'react-cytoscape';

export class App extends Component {
  state = {
    elements: [
      { data: { id: 'l1', aa: 'aaaa' } },
      { data: { id: 'l2' } },
      { data: { id: 'l3.1' } },
      { data: { id: 'l3.2' } },
      { data: { id: 'l4' } },
      { data: { id: 'l5.1' } },
      { data: { id: 'l5.2' } },
      { data: { id: 'l5.3' } },
      { data: { id: 'l35.1' } },
    
      { data: { id: '12', source: 'l1', target: 'l2' } },
      { data: { id: '231', source: 'l2', target: 'l3.1' } },
      { data: { id: '232', source: 'l2', target: 'l3.2' } },
      { data: { id: '314', source: 'l3.1', target: 'l4' } },
      { data: { id: '324', source: 'l3.2', target: 'l4' } },
      { data: { id: '451', source: 'l4', target: 'l5.1' } },
      { data: { id: '452', source: 'l4', target: 'l5.2' } },
      { data: { id: '453', source: 'l4', target: 'l5.3' } },
      { data: { id: '351', source: 'l3.1', target: 'l35.1' } },
      { data: { id: '351a', source: 'l5.2', target: 'l35.1' } }
    ]
  }
  aaa = (cy) => {
    this.cy = cy;
    cy.on('click', 'node', evt => {
      const node = evt.target;
      console.log(node.data())
    })
  }

  handleChange = ({target}) => {
    console.log(target.value);
    this.setState(state => ({...state, predecessor: target.value}))
  }

  handleClick = () => {
    const {predecessor, name} = this.state;
    this.setState(state => ({...state, elements: [
      ...this.state.elements,
      { data: { id: name } },
      { data: { id: `${name}edge`, source: predecessor, target: name } }
    ]}));
  }

  render() {
    console.log('aaa')
    return (
      <div style={{width: '100vw', height: '100vh'}}>
        <div>
          predecessor
          <input type='text' onChange={this.handleChange} />
          
        </div>
        <div>
          name
          <input type='text' onChange={({target}) => this.setState(state => ({...state, name: target.value}))} />
        </div>
        <div>
        <button onClick={this.handleClick}>AAA</button>
        </div>
        <ReactCytoscape
          containerID='aaa'
          elements={this.state.elements}
          cyRef={this.aaa}
          // style={[{selector: 'node', style: {shape: 'tag'}}, {selector: 'label', style: {color: 'black'}}]}
          cytoscapeOptions={{wheelSensitivity: 0.1, autoungrabify: true}}
          layout={{name: 'dagre'}}
        />
      </div>
    );
  }
}
