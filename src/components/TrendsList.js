import '../styling/trendlist.css'
import { useNavigate } from "react-router-dom";
import React from "react";
import TotalBarGraph from "./TotalBarGraph";


export default function TrendsList(props) {
    const navigate = useNavigate();

    function handleTrendClick(num) {
        navigate(`/trends/${num}`);
    }

    return (
        <div className='bottom-container'>
            <div className='trend-title'>
                Trends
            </div>
            <div className='trends-container'>
                <div className='trend-container'>
                    <div className='trend-subtitle'>
                        Chicago’s Shot Spotter Reduction Trends
                    </div>
                    <div className='trend-msg'>
                        Have there been changes in law enforcement response times,within the hour, to the ShotSpotter alerts over time,
                        and how do these changes correlate with the outcomes of crime incidents involving single or multiple gunshots? Are there trends
                        indicating improvements or challenges in police responsiveness to gun violence incidents, in particular, homicides? What are the
                        implications of these trends for the community and law enforcement on regards to shot spotter on homicides? Is the shot spotter system effective
                        in reducing homicides in the community?
                    </div>
                    <div className={`trend-btn ${props.selectedTrend === "1" ? 'selected' : ''}`}
                         onClick={() => handleTrendClick("1")}>
                        {props.selectedTrend === "1" ? "Selected" : props.buttonType}

                    </div>
                </div>

                <div className='trend-container'>
                    <div className='trend-subtitle'>
                        Crime in Relation to Socioeconomic Conditions
                    </div>
                    <div className='trend-msg'>
                        Are student attendance rates affected by the amount of crime in their district?
                        We're looking into whether there's a link between how often students show up to school and the crime levels in their neighborhoods in Chicago.
                        By checking out the numbers on both school attendance and local crime, we want to see if there's a pattern that shows if more crime might mean fewer kids making it to school.
                        This study could help us understand how feeling safe or not can change how likely students are to attend class.
                    </div>
                    <div className={`trend-btn ${props.selectedTrend === "2" ? 'selected' : ''}`}
                         onClick={() => handleTrendClick("2")}>
                        {props.selectedTrend === "2" ? "Selected" : props.buttonType}
                    </div>
                </div>

                <div className='trend-container'>
                <div className='trend-subtitle'>
                    Criminality in Relation to COVID-19
                </div>
                <div className='trend-msg'>
                    How was criminality affected by the drastic living changes caused by the coronavirus? Additionally, how was this 
                    change affected by the economic stature of each community area in Chicago, and which crime types were affected? The months
                    from 2019 to 2023 are analyzed to better understand the changes in criminality during the lifespan of COVID19, and in the
                    months that followed it.
                </div>
                <div className={`trend-btn ${props.selectedTrend === "3" ? 'selected' : ''}`} onClick={() => handleTrendClick("3")}>
                    {props.selectedTrend === "3" ? "Selected" : props.buttonType}
                </div>
                </div>

                <div className='trend-container'>
                    <div className='trend-subtitle'>
                        Instances of Crime in Relation to Street Light Outages
                    </div>
                    <div className='trend-msg'>
                        Is there a correlation between streetlight outages and crime incidents?
                        Many criminals would like to avoid getting caught, resulting in a possible focus of stealth when committing crimes.
                        We want to see if there is a correlation between the amount of streetlight outages in an area and the number of crimes committed.
                        Furthermore, we want to explore whether the absence of streetlights lead to an increase in certain types of crimes.
                    </div>
                    <div className={`trend-btn ${props.selectedTrend === "4" ? 'selected' : ''}`}
                         onClick={() => handleTrendClick("4")}>
                        {props.selectedTrend === "4" ? "Selected" : props.buttonType}
                    </div>
                </div>

                <div className='trend-container'>
                    <div className='trend-subtitle'>
                        Criminal Activity Throughout the Year Based on District
                    </div>
                    <div className='trend-msg'>
                        How do the rates of different crime categories (e.g. homicide) vary throughout the year and in
                        which districts
                        (e.g. northern districts vs southern)? Has this changed over time? Can an increase in a certain
                        crime category
                        be predicted based on the time of the year and location? Identifying recurring patterns can help
                        anticipate
                        spikes in certain crime categories during particular times of the year and in specific
                        districts, enabling
                        proactive measures to mitigate potential risks.
                    </div>
                    <div className={`trend-btn ${props.selectedTrend === "5" ? 'selected' : ''}`}
                         onClick={() => handleTrendClick("5")}>
                        {props.selectedTrend === "5" ? "Selected" : props.buttonType}
                    </div>
                </div>

                <div className='trend-container'>
                    <div className='trend-subtitle'>
                        Live count of the total number of tuples in the database.
                    </div>
                    <div className='trend-msg'>
                         <TotalBarGraph/>
                    </div>
                </div>
            </div>
        </div>
    )
}