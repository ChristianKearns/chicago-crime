import TrendsList from "../components/TrendsList";
import { useParams } from 'react-router-dom';
import '../styling/trends.css'

export default function Trends() {
    const { trend } = useParams();

    return(
      <>
        {/* Top Section */}
        <div className="graphs-container">
          Please select a trend below to get started.
        </div>

        {/* Bottom Section */}
        <TrendsList buttonType="Select" selectedTrend={trend}/>
      </>
    )
  }