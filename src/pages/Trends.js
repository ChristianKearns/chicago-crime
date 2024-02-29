import TrendsList from "../components/TrendsList";

export default function Trends() {
    return(
      <>
        {/* Top Section */}
        <div>
          Please select a trend below to get started.
        </div>

        {/* Bottom Section */}
        <TrendsList buttonType="Select"/>
      </>
    )
  }