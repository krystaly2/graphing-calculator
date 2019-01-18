import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Plot from 'react-plotly.js';


// use Ployly library to generate plot which contains multiple traces
class Graph extends React.Component {
  render() {
    const data = this.props.data

    return (
      <Plot
        data={data}
        layout={{width: 1050, height: 700, margin:{l:50, r:30, b:30, t:20},
                 xaxis:{showspikes:true, spikedash:'dash', spikethickness:2},
                 yaxis:{showspikes:true, spikedash:'dash', spikethickness:2}}}
      />
    );
  }
}


class Functions extends React.Component {
  render() {
    const functions = this.props.functions;
    const listFns = functions.map((fn) => {
      return <li>{fn.text}</li>
    });

    return (
      <ul className='theList'>
      {listFns}
      </ul>
    )
  }
}



class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      exprStr: '',
      data: [],
      functions: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleChange(event) {
    this.setState({exprStr: event.target.value});
  }

  handleSubmit(event) {
      const {exprStr} = this.state;

      // generate trace to draw
      const expr = window.math.compile(exprStr)

      const xValues = window.math.range(-10, 10, 0.1).toArray()
      const yValues = xValues.map(x => expr.eval({x: x}))

      const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter'
      }

      // generate fn entry to display in the list format later on
      const newFn = {
        text: 'y = ' + exprStr,
        key: Date.now()
      }

      // update state
      this.setState(
        (prevState) => {
          return {
            data: prevState.data.concat(trace),
            functions: prevState.functions.concat(newFn),
            exprStr: ''
          }
        }
      )

      event.preventDefault();
  }


  render() {
    return (
      <React.Fragment>
        <div className='graph'>
          <Graph data={this.state.data}/>
        </div>
        <div className='form'>
        <form onSubmit={this.handleSubmit}>
          <label>
            {"y =  "}
            <input type="text" value={this.state.exprStr}
                   placeholder='enter expression'
                   onChange={this.handleChange} />
          </label>
          <button type="submit">add</button>
        </form>
        </div>
        <Functions functions={this.state.functions}/>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Main/>, document.getElementById('app'));
