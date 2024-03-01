import '../styling/trendlist.css'
import { useNavigate } from "react-router-dom";

export default function TrendsList(props) {
    const navigate = useNavigate();

    function handleTrendClick(num) {
        navigate(`/trends/${num}`)    
    }

    return (
        <div className='bottom-container'>
            <div className='trend-title'>
                Trends
            </div>
            <div className='trends-container'>
                <div className='trend-container'>
                <div className='trend-subtitle'>
                    Chicago’s Criminal Landscape During the Recession
                </div>
                <div className='trend-msg'>
                    The United States of America underwent a significant economic recession known as the Global Financial 
                    Crisis(GFC) in 2007-2009. The GFC unfolded over a period of several years traced back to the mid-2000s. 
                    Now, acquire the top five types of crimes that were prevalent within the GFC (A ranking query). 
                    How has the rate of the top five ranked crimes fluctuated seven years before and during the GFC 
                    (2 years)? Study these trend queries as in current times,there is an increase in the cost of living within 
                    the US. How are the rates of the top five types of change over time within the current times, could they 
                    indicate a potential economic recession? The goal is to identify a complex trend from the ranking of crime 
                    types that occur before and during the GFC to predict a potential economic recession. Is there a correlation
                     between the rates of particular crime types with an economic recession ?
                </div>
                <div className={`trend-btn ${props.selectedTrend === "1" ? 'selected' : ''}`} onClick={() => handleTrendClick("1")}>
                    {props.selectedTrend === "1" ? "Selected" : props.buttonType}
                </div>
                </div>

                <div className='trend-container'>
                <div className='trend-subtitle'>
                    Crime in Relation to Socioeconomic Conditions
                </div>
                <div className='trend-msg'>
                    Analyzing educational data (such as test scores, graduation rates, and college readiness scores) alongside 
                    comprehensive crime statistics for those areas would be necessary to investigate the relationship between 
                    education quality and crime, as well as how school district rankings within Chicago correlate with surrounding 
                    neighborhood crime rates, with a focus on burglary, vandalism, assault, and robbery. To find patterns and 
                    correlations, we would combine socioeconomic and demographic data with data from public databases, including 
                    the Chicago Police Department and the Illinois State Board of Education.  And by analyzing the socioeconomic 
                    factors, it may show the degree to which educational achievements impact or are impacted by regional crime 
                    statistics. This investigation seeks to identify patterns in neighborhood safety and school district performance, 
                    offering insights into the intricate relationship between Chicago's crime dynamics and educational quality.
                </div>
                <div className={`trend-btn ${props.selectedTrend === "2" ? 'selected' : ''}`} onClick={() => handleTrendClick("2")}>
                    {props.selectedTrend === "2" ? "Selected" : props.buttonType}
                </div>
                </div>
        
                <div className='trend-container'>
                <div className='trend-subtitle'>
                    Violent Crimes with Relation to Video Games
                </div>
                <div className='trend-msg'>
                    How have violent crimes, particularly among boys between the ages of 18 and 25 changed over the 
                    past 23 years as video games have become increasingly more mainstream. How do these trends change in
                    districts in relation to the wealth of each district? While crime is generally expected to rise with
                    relation to more impoverished economic conditions, does this rise decrease in the target demographic
                    of 18 to 25 year old boys due to a lack of access to consoles necessary to play violent video 
                    games growing up? These constraints can help to investigate the question of whether violent video 
                    games can cause boys to become violent once they reach adulthood.
                </div>
                <div className={`trend-btn ${props.selectedTrend === "3" ? 'selected' : ''}`} onClick={() => handleTrendClick("3")}>
                    {props.selectedTrend === "3" ? "Selected" : props.buttonType}
                </div>
                </div>

                <div className='trend-container'>
                <div className='trend-subtitle'>
                    Criminal Activity During the Holidays
                </div>
                <div className='trend-msg'>
                    Since many crimes are focused around thievery, neighborhoods are a big source of crime. Around Christmas time those
                    who are less fortunate might resort to stealing and other crime. We want to investigate if the proximity of 
                    holidays causes an influx in crime. Furthermore, if we compared any changes to the average amount spent during the 
                    holiday season, would we see a relationship with the amount spent on gifts and the amount of crime committed? Our 
                    goal is to see if holidays and average holiday spending have any effect on crime.
                </div>
                <div className={`trend-btn ${props.selectedTrend === "4" ? 'selected' : ''}`} onClick={() => handleTrendClick("4")}>
                    {props.selectedTrend === "4" ? "Selected" : props.buttonType}
                </div>
                </div>

                <div className='trend-container'>
                <div className='trend-subtitle'>
                    Criminal Activity Throughout the Year Based on District
                </div>
                <div className='trend-msg'>
                    How do the rates of different crime categories (e.g. homicide) vary throughout the year and in which districts 
                    (e.g. northern districts vs southern)? Has this changed over time? Can an increase in a certain crime category 
                    be predicted based on the time of the year and location? Identifying recurring patterns can help anticipate 
                    spikes in certain crime categories during particular times of the year and in specific districts, enabling 
                    proactive measures to mitigate potential risks.
                </div>
                <div className={`trend-btn ${props.selectedTrend === "5" ? 'selected' : ''}`} onClick={() => handleTrendClick("5")}>
                    {props.selectedTrend === "5" ? "Selected" : props.buttonType}
                </div>
                </div>
            </div>
        </div>
    )
}