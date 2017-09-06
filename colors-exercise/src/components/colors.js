import React from 'react';
import * as d3 from 'd3';

export default class Colors extends React.Component {

  colors = d3.schemeCategory20;
  width = d3.scaleBand()
            .domain(d3.range(20));

  componentWillMount() {
    this.updateD3(this.props);
  }

  componentWillUpdate(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    this.width.range([0, props.width]);
  }

  render() {
    if (this.props.reverse) {
      return (
        <g>
          {d3.range(20).map((i) => (
            <Swatch key={i}
                    color={this.colors[(19-i)]}
                    width={this.width.step()}
                    x={this.width(i)}
                    y="0" />
          ))}
        </g>
      )
    }
    return (
      <g>
        {d3.range(20).map((i) => (
          <Swatch key={i}
                  color={this.colors[i]}
                  width={this.width.step()}
                  x={this.width(i)}
                  y="0" />
        ))}
      </g>
    )
  }

}

const Swatch = ({ color, width, x, y }) => (
  <rect width={width}
        height="20"
        x={x}
        y={y}
        style={{fill: color}} />
);
