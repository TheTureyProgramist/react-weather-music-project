import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

const WeatherCard = styled.div`
  background: ${(props) => (props.$isDarkMode ? "#1e1e1e" : "#f5f5f5")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: ${(props) => (props.$isMain ? "2px solid gold" : "1px solid #444")};
  transition: all 0.3s ease;

  /* Адаптивність для планшетів та ноутбуків */
  @media (min-width: 768px) {
    max-width: 380px;
    padding: 20px;
  }

  /* Адаптивність для великих моніторів 1920px+ */
  @media (min-width: 1920px) {
    max-width: 550px;
    padding: 40px;
    border-radius: 30px;

    h1 { font-size: 4rem !important; }
    h3 { font-size: 2.2rem !important; }
    h4 { font-size: 1.8rem !important; margin-bottom: 20px !important; }
    p, div, span { font-size: 20px !important; }
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(128, 128, 128, 0.3);
  padding-bottom: 10px;
  margin-bottom: 15px;
  h3 {
    margin: 0;
    font-size: 16px;
    color: ${(props) => (props.$isMain ? "gold" : "skyblue")};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  button {
    background: #333;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    &:hover { background: #555; }
  }

  @media (min-width: 1920px) {
    gap: 15px;
    button {
      font-size: 20px;
      padding: 10px 20px;
      border-radius: 10px;
    }
  }
`;

const ImagePlaceholder = styled.div`
  width: ${(props) => props.size || "50px"};
  height: ${(props) => props.size || "50px"};
  background: rgba(58, 58, 58, 0.8);
  border: 1px dashed #888;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: ${(props) => props.fontSize || "24px"};
  color: #fff;
  
  @media (min-width: 1920px) {
    width: ${(props) => parseInt(props.size) * 1.5}px;
    height: ${(props) => parseInt(props.size) * 1.5}px;
    font-size: 45px !important;
  }
`;

const ForecastScroll = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;
  margin-top: 10px;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb { background: #555; border-radius: 10px; }

  @media (min-width: 1920px) {
    max-height: 500px;
    padding-right: 20px;
  }
`;

const WeatherCardComponent = ({
  card,
  isDarkMode,
  isLocationEnabled,
  isExtremeTemp,
  isExtremeWind,
  isExtremeUV,
  chartOptions,
  chartData,
  handleRefreshCard,
  handleDeleteCard,
  setIsLocationEnabled,
}) => (
  <WeatherCard $isMain={card.isMain} $isDarkMode={isDarkMode}>
    <CardHeader $isMain={card.isMain}>
      <div>
        <h3>{card.locationName} {card.isMain && "📍"}</h3>
        {card.isMain && (
          <p style={{ margin: "5px 0 0 0", fontSize: "11px", color: "#888" }}>
            Lat: {card.lat?.toFixed(2)}, Lon: {card.lon?.toFixed(2)}
          </p>
        )}
      </div>
      <ActionButtons>
        {card.isMain && (
          <button
            onClick={() => setIsLocationEnabled((v) => !v)}
            style={{ background: isLocationEnabled ? "#444" : "#ff4d4d" }}
          >
            {isLocationEnabled ? "GPS ON" : "GPS OFF"}
          </button>
        )}
        <button onClick={() => handleRefreshCard(card)}>↺</button>
        {!card.isMain && <button onClick={() => handleDeleteCard(card.id)}>🗑</button>}
      </ActionButtons>
    </CardHeader>

    <div style={{ display: "flex", gap: "20px", marginBottom: "15px", alignItems: "center" }}>
      <ImagePlaceholder size="80px">{card.current.iconPlaceholder}</ImagePlaceholder>
      <div>
        <h1 style={{ margin: "0", color: isExtremeTemp ? "#ff4d4d" : "inherit", fontSize: "2.5rem" }}>
          {card.current.temp}
        </h1>
        <p style={{ margin: "0", fontSize: "14px", opacity: 0.8 }}>Відчувається: {card.current.feels_like}</p>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "13px", marginBottom: "20px" }}>
      <div>Вологість: <b>{card.current.humidity}</b></div>
      <div style={{ color: isExtremeWind ? "#ff4d4d" : "inherit" }}>Вітер: <b>{card.current.wind_speed}</b></div>
      <div>Тиск: <b>{card.current.pressure}</b></div>
      <div style={{ color: isExtremeUV ? "#ff4d4d" : "inherit" }}>УФ-індекс: <b>{card.current.uv_index}</b></div>
    </div>

    <h4 style={{ margin: "0 0 10px 0" }}>Годинний прогноз:</h4>
    {card.hourly && card.hourly.length > 0 && chartOptions && chartData && (
      <div style={{ height: "180px", marginBottom: "20px" }}>
        <Line options={chartOptions} data={chartData} />
      </div>
    )}

    <h4 style={{ margin: "15px 0 10px 0" }}>Прогноз на 16 днів:</h4>
    <ForecastScroll>
      {card.daily16.map((day, idx) => (
        <div key={idx} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: "12px", fontSize: "13px", borderBottom: "1px solid rgba(128,128,128,0.2)",
          paddingBottom: "8px"
        }}>
          <span style={{ width: "50px" }}>{day.date}</span>
          <span style={{ width: "40px", fontWeight: "bold" }}>{day.day}</span>
          <ImagePlaceholder size="35px" fontSize="16px">{day.iconPlaceholder}</ImagePlaceholder>
          <div style={{ display: "flex", gap: "10px", minWidth: "80px", justifyContent: "flex-end" }}>
            <span>{day.temp_day}</span>
            <span style={{ color: "#888" }}>{day.temp_night}</span>
          </div>
        </div>
      ))}
    </ForecastScroll>
  </WeatherCard>
);

export default WeatherCardComponent;