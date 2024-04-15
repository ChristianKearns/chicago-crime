import { useState, useEffect } from 'react';
import TrendsList from "../components/TrendsList";
import CrimeTrendChart from "../components/Chart";
import { useParams } from 'react-router-dom';
import axios from "axios";
import '../styling/trends.css'

export default function Trends() {
    const { trend } = useParams();
    const [ data, setData ] = useState(null);
    useEffect(()=>{
      if(trend === '3') {
        fetchTrend3Data();
      }
    },[trend])
    const fetchTrend3Data = async () => {
      try {
          const response = await axios.get('http://localhost:3001/trend-three');
          console.log(response)
      } catch (error) {
          console.error('Error fetching crime locations:', error);
      }
  };

    console.log();

    return(
      <>
        {/* Top Section */}
        {trend === '3' && data && (
          <>
            <CrimeTrendChart data={data} />
          </>
        )}
        <div className="graphs-container">
          Please select a trend below to get started.
        </div>

        {/* Bottom Section */}
        <TrendsList buttonType="Select" selectedTrend={trend}/>
      </>
    )
  }