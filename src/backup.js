import { LineChart, Line, XAxis, YAxis, Curve, CartesianGrid} from 'recharts';

const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const data2 = [
  {x: -3, y: 9},
  {x: -2, y: 4},
  {x: -1, y: 1},
  {x: 0, y: 0},
  {x: 1, y: 1},
  {x: 2, y: 4},
  {x: 3, y: 9}
]

// x from -10 to 10
const data3 = [];
const upperBound = 5;
const lowerBound = -5;
const numData = 100;

function calculate(x){
  return Math.sqrt(1-x**2) + x**(2/3);
}


data3[0] = {x: lowerBound, y: 0};
data3[0].y = calculate(data3[0].x);

let inc = (upperBound-lowerBound)/numData;

for(let count = 1; count < numData; ++count){
  data3[count] = {x:data3[count-1].x+inc, y:0};
  data3[count].y = calculate(data3[count].x);
}

// console.log(data3);
const points = [
  {x: 3, y: -9},
  {x: 2, y: -4},
  {x: 1, y: -1},
  {x: 0, y: 0},
  {x: 1, y: 1},
  {x: 2, y: 4},
  {x: 3, y: 9}
]


const cv = [
  {x: 3, y1: -9, y2: 9},
  {x: 2, y1: -4, y2: 4},
  {x: 1, y1: -1, y2: 1},
  {x: 0, y1: 0, y2: 0}
];

// const curve = window.d3.curveMonotoneY;




class Graph extends React.Component {
  render(){

    return(
      <LineChart width={400} height={400} data={cv}>
      <Line type='monotoneY'  dataKey='y1' stroke="#8884d8"/>
      <Line type='monotoneY'  dataKey='y2' stroke="#82ca9d"/>
      </LineChart>
    )
  }
}

/****************************************************************************/
setUpData(){
  const xUpperBound = 5;
  const xLowerBound = -5;
  const numData = 100;
  const initialData = [];

  initialData[0] = {x: lowerBound, y: null};

  const xInc = (xUpperBound-xLowerBound)/numData;

  for(let count = 1; count <= numData; ++count){
    initialData[count] = {x: initialData[count-1].x + inc, y:null};
  }
  console.log(initialData);
  this.setState({data: initialData});
}

calculate(x){
  return Math.sqrt(1-x**2) + x**(2/3);
}

componentDidMount(){
  this.setUpData();
}
