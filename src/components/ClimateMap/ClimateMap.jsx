import React from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  width: 95%;
  max-width: 1200px;
  height: 450px;
  margin: 20px auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: #1a1a1a; // Фон поки карта вантажиться

  @media (min-width: 1920px) {
    height: 700px;
  }
`;

const SourceLink = styled.a`
  display: block;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  text-decoration: none;
  margin-top: 10px;
  transition: color 0.3s;
  
  &:hover {
    color: skyblue;
    text-decoration: underline;
  }
`;

const ClimateMap = () => {
  // Використовуємо спеціальний URL для вбудовування (embed2.html)
  // lat/lon 48.379/31.165 - це центр України
  const embedUrl = "https://embed.windy.com/embed2.html?lat=48.379&lon=31.165&zoom=5&level=surface&overlay=wind&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1";

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <MapContainer>
        <iframe
          title="Windy Live Weather Map"
          width="100%"
          height="100%"
          src={embedUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </MapContainer>
      
      <SourceLink 
        href="https://www.windy.com/" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Оригінальна карта на Windy.com (Open Source Weather Data)
      </SourceLink>
    </div>
  );
};

export default ClimateMap;