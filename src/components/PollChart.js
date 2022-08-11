import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto'

export default function PollChart({pollOptions}) {

    const pollData = () => {
        const data = {};
    
        data.labels = [];
        pollOptions.forEach((option) => data.labels.push(option.name));
    
        const values = [];
        pollOptions.forEach((option) => values.push(option.votes));
    
        data.datasets = [
          {
            label: "votes",
            data: values,
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ], 
            borderColor: [
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1, 
              barThickness: 60, 
              
          }
        ];
        return data;
      };

  return (
    <>
      {/* {console.log(pollData)} */}
      <Bar
        data={pollData()}
        options={{
          maintainAspectRatio: true,
          indexAxis: 'y',
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
        }, 
        }}
      />
    </>
  );
}
