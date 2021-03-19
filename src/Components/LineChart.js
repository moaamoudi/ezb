import React from 'react'
import {Chart} from "react-google-charts"
export default function LineChart() {
    return (
        <Chart
  width={'100%'}
  height={'400px'}
  chartType="LineChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['x', 'mohammed', 'tamer'],
    ["Jan", 0, 0],
    ["Feb", 10, 5],
    ["Mar", 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
    [9, 27, 19],
    [10, 27, 19],
    [11, 27, 19],
    [12, 27, 19],
    [13, 27, 19],
    [14, 27, 19],
    [15, 27, 19],
    [16, 27, 19],
    [17, 27, 19],
    [18, 27, 19],
    [19, 27, 19],
    [20, 27, 19],
    [21, 27, 19],
    [22, 27, 19],
    [23, 27, 19],
    [24, 27, 19],
    [25, 27, 19],
    [26, 27, 19],
    [27, 27, 19],
    [28, 27, 19],
    [29, 27, 19],
    [30, 27, 19],
  ]}
  options={{
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'Tasks',
    },
    series: {
      1: { curveType: 'function' },
    },
  }}
  rootProps={{ 'data-testid': '2' }}
/>
    )
}