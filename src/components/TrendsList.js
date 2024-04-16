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
                        Have there been changes in law enforcement response times to ShotSpotter alerts over time,
                        and how do these changes correlate with the outcomes of crime incidents? Are there trends
                        indicating improvements or challenges in police responsiveness to gun violence incidents?
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
                        Analyzing educational data (such as test scores, graduation rates, and college readiness scores)
                        alongside
                        comprehensive crime statistics for those areas would be necessary to investigate the
                        relationship between
                        education quality and crime, as well as how school district rankings within Chicago correlate
                        with surrounding
                        neighborhood crime rates, with a focus on burglary, vandalism, assault, and robbery. To find
                        patterns and
                        correlations, we would combine socioeconomic and demographic data with data from public
                        databases, including
                        the Chicago Police Department and the Illinois State Board of Education. And by analyzing the
                        socioeconomic
                        factors, it may show the degree to which educational achievements impact or are impacted by
                        regional crime
                        statistics. This investigation seeks to identify patterns in neighborhood safety and school
                        district performance,
                        offering insights into the intricate relationship between Chicago's crime dynamics and
                        educational quality.
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
                        Criminal Activity During the Holidays
                    </div>
                    <div className='trend-msg'>
                        Since many crimes are focused around thievery, neighborhoods are a big source of crime. Around
                        Christmas time those
                        who are less fortunate might resort to stealing and other crime. We want to investigate if the
                        proximity of
                        holidays causes an influx in crime. Furthermore, if we compared any changes to the average
                        amount spent during the
                        holiday season, would we see a relationship with the amount spent on gifts and the amount of
                        crime committed? Our
                        goal is to see if holidays and average holiday spending have any effect on crime.
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