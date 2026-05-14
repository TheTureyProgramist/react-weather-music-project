import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { Line } from "react-chartjs-2";
import {
  removeCustomDay,
  addCustomDay,
} from "../../features/counter/Counter.js";

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

const WeatherCard = styled.div`
  background: ${(props) => (props.$isDarkMode ? "#1e1e1e" : "#f5f5f5")};
  position: relative;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: ${(props) =>
    props.$isMain ? "2px solid #004cff" : "1px solid #444"};
  transition: all 0.3s ease;
  @media (min-width: 768px) {
    max-width: 380px;
    padding: 20px;
  }
  @media (min-width: 1920px) {
    max-width: 550px;
    padding: 40px;
    border-radius: 30px;

    h1 {
      font-size: 4rem !important;
    }
    h3 {
      font-size: 2.2rem !important;
    }
    h4 {
      font-size: 1.8rem !important;
      margin-bottom: 20px !important;
    }
    p,
    div,
    span {
      font-size: 20px !important;
    }
  }
`;
//
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
    color: ${(props) => (props.$isMain ? "#008cff" : "skyblue")};
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
    &:hover {
      background: #555;
    }
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

const OrderControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};

  button {
    background: ${(props) => (props.$isDarkMode ? "#333" : "#ddd")};
    color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
    border: 1px solid #737373;
    border-radius: 4px;
    padding: 2px 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s;

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    &:hover:not(:disabled) {
      background: orange;
      color: #000;
    }
  }

  span {
    font-size: 14px;
    font-weight: 900;
  }
`;

const ImagePlaceholder = styled.div`
  width: ${(props) => props.size || "50px"};
  height: ${(props) => props.size || "50px"};
  background: rgba(58, 58, 58, 0.8);
  border: 1px dashed #00eaff;
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

const ChartScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
  padding-bottom: 10px;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 10px;
  }
`;

const ChartInnerContainer = styled.div`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height || "200px"};
`;
const DailyDetailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) =>
    props.$isDarkMode ? "rgba(30, 30, 30, 0.98)" : "rgba(255, 255, 255, 0.98)"};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  z-index: 100;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${fadeIn} 0.2s ease-in;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #ffb36c;
  }
  p {
    font-size: 14px;
    margin: 5px 0;
  }

  button {
    margin-top: 20px;
    background: #ffb36c;
    color: #000;
    border: none;
    padding: 8px 20px;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background: #ff9800;
    }
  }

  @media (min-width: 1920px) {
    h3 {
      font-size: 2.2rem;
    }
    p {
      font-size: 20px;
    }
    button {
      font-size: 20px;
      padding: 12px 30px;
    }
  }
`;

const WeatherCardComponent = ({
  user,
  card,
  isDarkMode,
  isLocationEnabled,
  isExtremeTemp,
  isExtremeWind,
  isExtremeUV,
  index,
  totalCards,
  handleRefreshCard,
  handleDeleteCard,
  handleRenameCard,
  moveWeatherCard,
  setIsLocationEnabled,
  customHolidayName,
}) => {
  const customDays = useSelector((state) => state.calendar?.customDays || []);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(card.locationName);
  const [selectedDay, setSelectedDay] = useState(null);

  const createIconCanvas = (icon, size = 24, dangerColor = null) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    ctx.font = `${size - 8}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(icon, size / 2, size / 2);

    if (dangerColor) {
      ctx.fillStyle = dangerColor;
      ctx.font = `bold ${size / 2}px Arial`;
      ctx.fillText("!", size - 5, 5);
    }
    return canvas;
  };

  const handleRenameSubmit = () => {
    if (newName.trim()) {
      handleRenameCard(card.id, newName);
      setIsEditing(false);
    }
  };

  const hourlyChartData = {
    labels: card.hourly?.map((h) => h.time) || [],
    datasets: [
      {
        label: "Температура (°C)",
        data: card.hourly?.map((h) => h.tempNum ?? 0) || [],
        fill: true,
        backgroundColor: "rgba(255, 179, 108, 0.2)",
        borderColor: "rgba(255, 179, 108, 1)",
        pointRadius: 12,
        pointStyle: card.hourly?.map((h) => {
          let danger = null;
          if ((h.tempNum ?? 0) > 30) danger = "#ff0000";
          else if ((h.tempNum ?? 0) < -30) danger = "#004cff";
          else if ((h.windNum ?? 0) > 10) danger = "#ff6a00";
          return createIconCanvas(h.iconPlaceholder ?? "☁️", 24, danger);
        }),
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Вітер (м/с)",
        data: card.hourly?.map((h) => h.windNum ?? 0) || [],
        borderColor: "rgba(0, 190, 235, 1)",
        backgroundColor: "rgba(0, 190, 235, 0.1)",
        pointRadius: 8,
        pointStyle: "circle",
        pointBackgroundColor:
          card.hourly?.map((h) =>
            (h.windNum ?? 0) > 10 ? "#ff6a00" : "rgba(0, 190, 235, 1)",
          ) || [],
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  };

  const getWeatherDescription = (code) => {
    if (code === 0) return "Ясно";
    if (code >= 1 && code <= 3) return "Частково хмарно";
    if (code >= 45 && code <= 48) return "Туман";
    if (code >= 51 && code <= 55) return "Дрібна сяка";
    if (code >= 61 && code <= 65) return "Дощ";
    if (code >= 71 && code <= 77) return "Сніг";
    if (code >= 80 && code <= 82) return "Шквальний дощ";
    if (code >= 95 && code <= 99) return "Гроза";
    return "Хмарно";
  };

  // Реєстр свят 2026
  const HOLIDAYS_2026 = {
    "01.01": "Вітаю з Новим роком!",
    "06.01": "Богоявлення (Водохреще)",
    "07.01": "Різдво Христове (старий стиль)",
    "02.02": "Стрітення Господнє",
    14.02: "З Днем святого Валентина!",
    "08.03": "Жінки, всіх вас вітаю з вашим днем!",
    25.03: "Благовіщення",
    "01.04": "Сьогодні день дурня, не святого лежня. Нікому не вірте!",
    12.04: "З Великоднем (Пасха). Бажаю всім всього найкращого.",
    "01.05": "День праці",
    "08.05":
      "День пам'яті та перемоги. В цей день ми(наші прадіди) перемогли фашизм",
    10.05:
      "День матері. Подякуйте їм, за те що вони підтримували вас у тяжкі дні. А радісні робили, ще кращими.",
    21.05: "Вознесіння Господнє",
    31.05: "Трійця (П'ятдесятниця). ",
    21.06: "День батька",
    28.06: "День Конституції України",
    "01.08": "День Малятко ТВ. Ще раз особиста подяка.",
    "06.08": "Преображення (Спас)",
    15.08: "Успіння Пресвятої Богородиці",
    24.08: "День Незалежності України",
    "01.09":
      "День знань. Цей день усі ненавидять, бо термін відпустки закінчився.",
    11.09: "Випуск 1шої серії м/с Динофроз. Легенда.",
    "01.10": "Покрова і день Козацтва (Новий стиль)",
    "14.10": "Покрова і день Козацтва (Старий стиль)",
    "27.10": "День писемності та мови",
    19.11: "Міжнародний чоловічий день. Наш день :)",
    21.11: "Введення в храм Пресвятої Богородиці",
    25.12: "Різдво Христове (новий стиль)",
  };

  const isWeekend = (dayName) => {
    const name = dayName.toLowerCase();
    return name.includes("сб") || name.includes("нд");
  };

  const isBirthday = (dateStr) => {
    if (!user?.birthDate || !dateStr) return false;
    // user.birthDate: YYYY-MM-DD, dateStr: DD.MM
    const [, uMonth, uDay] = user.birthDate.split("-");
    const [dDay, dMonth] = dateStr.split(".");
    return (
      parseInt(uDay) === parseInt(dDay) && parseInt(uMonth) === parseInt(dMonth)
    );
  };

  const getDateType = (dateStr, dayName, fullDate) => {
    const holidayName = HOLIDAYS_2026[dateStr];
    const isWknd = isWeekend(dayName);
    const isBday = isBirthday(dateStr);
    const customDay = customDays.find((d) => d.date === fullDate);

    // Пріоритет: Свято > День народження > Custom > Вихідний
    if (holidayName) {
      return {
        type: "holiday",
        color: "#ff6666",
        label: holidayName + (isWknd ? " + вихідний" : ""),
      };
    }
    if (isBday) {
      return {
        type: "birthday",
        color: "#e066ff", // Використовуємо фіолетовий для "райдужного" ефекту в hex
        label: "З Днем Народження! 🎉",
        isRainbow: true,
      };
    }
    if (customDay) {
      return { type: "custom", color: "#00bfff", label: customDay.reason };
    }
    if (isWknd) {
      return {
        type: "weekend",
        color: "#ff9966",
        label: "вихідний",
      };
    }
    return { type: "regular", color: null, label: "" };
  };

  const calculateCountdown = (fullDate) => {
    const now = new Date();
    const target = new Date(fullDate);
    target.setHours(0, 0, 0, 0); // Початок дня події

    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `⏳ Залишилось: ${days}д ${hours}г`;
    return `⏳ Почнеться за ${hours}г`;
  };

  const getHolidayMessage = (dateStr, dayName, fullDate) => {
    const customDay = customDays.find((d) => d.date === fullDate);
    const countdown = calculateCountdown(fullDate);
    const suffix = countdown ? ` (${countdown})` : "";

    if (customDay) return `💙 Ваша подія: ${customDay.reason}${suffix}`;
    if (isBirthday(dateStr))
      return `🎂 Вітаємо, ${user?.firstName}! З Днем Народження! 🌈${suffix}`;
    const holiday = HOLIDAYS_2026[dateStr];
    if (holiday) return `✨ Вітаємо з святом: ${holiday}!${suffix}`;
    return null;
  };
  const dailyChartData = {
    labels: card.daily16?.map((d) => `${d.date}\n${d.day}`) || [],
    datasets: [
      {
        label: "День (°C)",
        data: card.daily16?.map((d) => parseInt(d.temp_day)) || [],
        borderColor: "#ffb36c",
        backgroundColor: "rgba(255, 179, 108, 0.5)",
        pointRadius: 12,
        pointStyle: card.daily16?.map((d) =>
          createIconCanvas(d.iconPlaceholder, 24),
        ),
        pointBorderColor: card.daily16?.map((d) => {
          const dateType = getDateType(d.date, d.day, d.fullDate);
          return dateType.color || "#ffb36c";
        }),
        pointBorderWidth: card.daily16?.map((d) => {
          const dateType = getDateType(d.date, d.day, d.fullDate);
          return dateType.color ? 3 : 2;
        }),
        tension: 0.3,
      },
      {
        label: "Ніч (°C)",
        data: card.daily16?.map((d) => parseInt(d.temp_night)) || [],
        borderColor: "#00eaff",
        backgroundColor: "rgba(0, 234, 255, 0.2)",
        pointStyle: "circle",
        pointRadius: 4,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: isDarkMode ? "#fff" : "#333" },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          title: (items) => `⏰ Час: ${items[0].label}`,
          label: (context) => {
            if (context.datasetIndex === 0) {
              // Температура
              const temp = context.parsed.y || 0;
              let label = `🌡️ Температура: ${temp}°C`;

              let dangers = [];
              if (temp > 30) dangers.push("СПЕКА ☀️");
              if (temp < -30) dangers.push("МОРОЗ ❄️");

              if (dangers.length > 0) {
                label += ` ⚠️ ${dangers.join(", ")}`;
              }
              return label;
            } else if (context.datasetIndex === 1) {
              // Вітер
              const wind = context.parsed.y || 0;
              let label = `🌬️ Вітер: ${wind.toFixed(1)} м/с`;
              if (wind > 10) label += ` ⚠️ СИЛЬНИЙ ВІТЕР`;
              return label;
            }
            return "";
          },
          afterLabel: (context) => {
            const index = context.dataIndex;
            const hourlyData = card.hourly?.[index];
            if (context.datasetIndex === 0 && hourlyData) {
              return `${hourlyData.iconPlaceholder} ${getWeatherDescription(parseInt(hourlyData.iconPlaceholder.charCodeAt(0)))}`;
            }
            return "";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: "Температура (°C)", color: "#ffb36c" },
        ticks: { color: isDarkMode ? "#aaa" : "#888", font: { size: 10 } },
        grid: {
          color: isDarkMode
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(128, 128, 128, 0.1)",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: true,
        title: {
          display: true,
          text: "Вітер (м/с)",
          color: "rgba(0, 190, 235, 1)",
        },
        ticks: { color: "rgba(0, 190, 235, 1)", font: { size: 10 } },
        grid: { drawOnChartArea: false },
      },
      x: {
        ticks: { color: isDarkMode ? "#aaa" : "#888", font: { size: 10 } },
        grid: { display: false },
      },
    },
  };

  const dailyChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        ...chartOptions.plugins.tooltip,
        callbacks: {
          title: (items) => {
            const daily = card.daily16?.[items[0].dataIndex];
            if (!daily) return items[0].label;
            const dateType = getDateType(daily.date, daily.day, daily.fullDate);
            const holidayMsg = getHolidayMessage(
              daily.date,
              daily.day,
              daily.fullDate,
            );
            const label = dateType.label ? ` [${dateType.label}]` : "";
            const titleText = items[0].label + label;
            // Повертаємо масив для коректного відображення кількох рядків
            return holidayMsg ? [holidayMsg, titleText] : titleText;
          },
          label: (context) => {
            const isDay = context.datasetIndex === 0;
            return `${isDay ? "☀️ День" : "🌙 Ніч"}: ${context.parsed.y}°C`;
          },
          afterLabel: (context) => {
            const daily = card.daily16?.[context.dataIndex];
            if (!daily || context.datasetIndex !== 0) return "";
            return `\nОписання: ${daily.description || "—"}`;
          },
        },
      },
    },
    scales: {
      ...chartOptions.scales,
      x: {
        ...chartOptions.scales.x,
        ticks: {
          ...chartOptions.scales.x.ticks,
          color: (ctx) => {
            if (!card.daily16 || ctx.index >= card.daily16.length) {
              return isDarkMode ? "#aaa" : "#888";
            }
            const daily = card.daily16[ctx.index];
            const dateType = getDateType(daily.date, daily.day, daily.fullDate);
            return dateType.color || (isDarkMode ? "#aaa" : "#888");
          },
          font: {
            ...chartOptions.scales.x.ticks.font,
            weight: (ctx) => {
              if (!card.daily16 || ctx.index >= card.daily16.length)
                return "normal";
              const daily = card.daily16[ctx.index];
              const dateType = getDateType(
                daily.date,
                daily.day,
                daily.fullDate,
              );
              return dateType.color ? "bold" : "normal";
            },
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const daily = card.daily16[index];
        const dateType = getDateType(daily.date, daily.day, daily.fullDate);
        if (dateType.type === "holiday" || dateType.type === "birthday") {
          // Не змінювати свята і дні народження
          setSelectedDay(daily);
        } else if (dateType.type === "custom") {
          // Видалити custom day
          dispatch(removeCustomDay(daily.fullDate));
        } else {
          // Додати custom day, якщо є назва
          if (customHolidayName.trim()) {
            if (customHolidayName.trim().length > 12) {
              alert("Назва свята занадто довга (макс. 12 символів)!");
              return;
            }
            dispatch(
              addCustomDay({
                date: daily.fullDate,
                reason: customHolidayName.trim(),
              }),
            );
          } else {
            setSelectedDay(daily);
          }
        }
      }
    },
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <OrderControls $isDarkMode={isDarkMode}>
        <button
          disabled={index === 0}
          onClick={() => moveWeatherCard(card.id, -1)}
          title="Перемістити вгору"
        >
          ↑
        </button>
        <span>{index + 1}.</span>
        <button
          disabled={index === totalCards - 1}
          onClick={() => moveWeatherCard(card.id, 1)}
          title="Перемістити вниз"
        >
          ↓
        </button>
      </OrderControls>
      <WeatherCard $isMain={card.isMain} $isDarkMode={isDarkMode}>
        {selectedDay && (
          <DailyDetailOverlay $isDarkMode={isDarkMode}>
            <h3 style={{ margin: 0 }}>
              Детально: {selectedDay.date} ({selectedDay.day})
            </h3>
            {getDateType(
              selectedDay.date,
              selectedDay.day,
              selectedDay.fullDate,
            ).label && (
              <p
                style={{
                  margin: "5px 0",
                  fontSize: "12px",
                  color: getDateType(
                    selectedDay.date,
                    selectedDay.day,
                    selectedDay.fullDate,
                  ).color,
                  fontWeight: "bold",
                }}
              >
                {getDateType(
                  selectedDay.date,
                  selectedDay.day,
                  selectedDay.fullDate,
                ).label.toUpperCase()}
              </p>
            )}
            {getHolidayMessage(
              selectedDay.date,
              selectedDay.day,
              selectedDay.fullDate,
            ) && (
              <p
                style={{
                  margin: "8px 0",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#ffb36c",
                }}
              >
                {getHolidayMessage(
                  selectedDay.date,
                  selectedDay.day,
                  selectedDay.fullDate,
                )}
              </p>
            )}
            <ImagePlaceholder
              size="60px"
              fontSize="30px"
              style={{ margin: "15px 0" }}
            >
              {selectedDay.iconPlaceholder}
            </ImagePlaceholder>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                width: "100%",
                maxWidth: "300px",
              }}
            >
              <p style={{ margin: 0 }}>
                ☀️ День: <b>{selectedDay.temp_day ?? "—"}</b>
              </p>
              <p style={{ margin: 0 }}>
                🌙 Ніч: <b>{selectedDay.temp_night ?? "—"}</b>
              </p>
              <p style={{ margin: 0 }}>
                🌬️ Вітер: <b>{selectedDay.wind_speed ?? "0 м/с"}</b>
              </p>
              <p style={{ margin: 0 }}>
                🧴 УФ: <b>{selectedDay.uv_index ?? 0}</b>
              </p>
            </div>
            <button onClick={() => setSelectedDay(null)}>Закрити</button>
          </DailyDetailOverlay>
        )}
        <CardHeader $isMain={card.isMain}>
          <div>
            {isEditing ? (
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  autoFocus
                  style={{
                    padding: "2px 5px",
                    fontSize: "14px",
                    borderRadius: "4px",
                    border: "1px solid #ff6a00",
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#000",
                  }}
                />
                <button
                  onClick={handleRenameSubmit}
                  style={{
                    background: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    padding: "2px 8px",
                  }}
                >
                  ✓
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    padding: "2px 8px",
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <h3>
                {card.locationName} {card.isMain && "📍"}
              </h3>
            )}

            <p
              style={{
                margin: "5px 0 0 0",
                fontSize: "11px",
                color: "#686868",
              }}
            >
              Lat: {card.lat?.toFixed(2)}, Lon: {card.lon?.toFixed(2)}
            </p>
          </div>
          <ActionButtons>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} title="Перейменувати">
                ✎
              </button>
            )}
            {card.isMain && (
              <button
                onClick={() => setIsLocationEnabled((v) => !v)}
                style={{ background: isLocationEnabled ? "#444" : "#ff4d4d" }}
              >
                {isLocationEnabled ? "GPS ON" : "GPS OFF"}
              </button>
            )}
            <button onClick={() => handleRefreshCard(card)}>↺</button>
            {!card.isMain && (
              <button onClick={() => handleDeleteCard(card.id)}>🗑</button>
            )}
          </ActionButtons>
        </CardHeader>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "15px",
            alignItems: "center",
          }}
        >
          <ImagePlaceholder size="80px">
            {card.current.iconPlaceholder}
          </ImagePlaceholder>
          <div>
            <h1
              style={{
                margin: "0",
                color: isExtremeTemp ? "#ff4d4d" : "inherit",
                fontSize: "2.5rem",
              }}
            >
              {card.current.temp}
            </h1>
            <p style={{ margin: "0", fontSize: "14px", opacity: 0.8 }}>
              Відчувається: {card.current.feels_like}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            fontSize: "13px",
            marginBottom: "20px",
          }}
        >
          <div>
            Вологість: <b>{card.current.humidity ?? "—"}</b>
          </div>
          <div style={{ color: isExtremeWind ? "#ff4d4d" : "inherit" }}>
            🌬️ Вітер: <b>{card.current.wind_speed ?? "0 м/с"}</b>
          </div>
          <div>
            Тиск: <b>{card.current.pressure ?? "—"}</b>
          </div>
          <div style={{ color: isExtremeUV ? "#ff4d4d" : "inherit" }}>
            🧴 УФ-індекс: <b>{card.current.uv_index ?? 0}</b>
          </div>
        </div>

        <h4 style={{ margin: "0 0 10px 0" }}>Годинний прогноз:</h4>
        {card.hourly && card.hourly.length > 0 && (
          <ChartScrollWrapper>
            <ChartInnerContainer $width={1200} $height="220px">
              <Line options={chartOptions} data={hourlyChartData} />
            </ChartInnerContainer>
          </ChartScrollWrapper>
        )}

        <h4 style={{ margin: "15px 0 10px 0" }}>Прогноз на 16 днів:</h4>
        <ChartScrollWrapper>
          <ChartInnerContainer $width={1000} $height="220px">
            <Line options={dailyChartOptions} data={dailyChartData} />
          </ChartInnerContainer>
        </ChartScrollWrapper>
      </WeatherCard>
    </div>
  );
};

export default WeatherCardComponent;
