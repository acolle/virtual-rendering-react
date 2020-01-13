import React from 'react';
import { loremIpsum } from 'lorem-ipsum';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from "react-virtualized";
import logo from './logo.svg';
import './App.css';

const rowCount = 200;
const listHeight = 600;
const rowHeight = 50;
const rowWidth = 800;

const App = () => {

  const list = Array(rowCount).fill().map((val, idx) => {
    return {
      id: idx,
      name: `Employee ${idx + 1}`,
      image: `https://avatars.dicebear.com/v2/human/employee${idx + 1}.svg?options[width][]=60`,
      text: loremIpsum({
        count: 1,
        units: 'sentences',
        sentenceLowerBound: 10,
        sentenceUpperBound: 100
      })
    }
  });

  const cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 120
    });

  {/*
    Without Virtual Rendering
    const renderRow = (item) => {
      return (
        <div key={item.id} className="row">
          <div className="image">
            <img src={item.image} alt="employee-picture" />
          </div>
          <div className="content">
            <div>{item.name}</div>
            <div>{item.text}</div>
          </div>
        </div>
      );
    }
  */}

  const renderRow = ({ index, key, style }) => {
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        columnIndex={0}
        rowIndex={index}>
          <div style={style} className="row">
            <div className="image">
              <img src={list[index].image} alt="employee-picture" />
            </div>
            <div className="content">
              <div>{list[index].name}</div>
              <div>{list[index].text}</div>
            </div>
          </div>
      </CellMeasurer>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>A React implementation of Virtual Rendering to prevent slow and laggy scrolling of large lists</p>
      </header>
      {/*
        Without Virtual Rendering
        <div className="list">
          {list.map(renderRow)}
        </div>
      */}
      <div className="list">
          <AutoSizer>
          {
            ({ width, height }) => {
              return <List
                width={width}
                height={height}
                rowHeight={cache.rowHeight}
                rowRenderer={renderRow}
                rowCount={list.length}
                overscanRowCount={3} />
            }
          }
          </AutoSizer>
        </div>
    </div>
  );
}

export default App;
