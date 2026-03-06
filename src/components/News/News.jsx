import React, { useEffect, useState } from "react";
import styled from "styled-components";
import rainbow from "../../photos/vip-images/stars.jpg";
const SOURCES = [
  "https://www.nationalgeographic.com/animals/index.rss",
  "https://phys.org/rss-feed/biology-news/animals-news/",
];

const STOP_WORDS = [
  "війна",
  "політика",
  "кримінал",
  "суд",
  "затримано",
  "казино",
  "ставки",
  "корупція",
];

const NewsDiv = styled.div`
  margin-top: 35px;
  padding: 0 20px;
  @media (min-width: 768px) {
    margin-top: 50px;
  }
  @media (min-width: 1200px) {
    margin-top: 80px;
  }
`;

const AihelpTitle = styled.div`
  font-size: 14px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  color: ${(props) => (props.$isDarkMode ? "black" : "white")};
  margin-bottom: 35px;
  @media (min-width: 768px) {
    font-size: 24px;
    margin-bottom: 50px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 25px;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled.a`
  background: ${(props) => (props.$isDarkMode ? "#ffffff" : "#1a1a1a")};
  color: ${(props) => (props.$isDarkMode ? "#000000" : "#ffffff")};
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  height: 100%;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }
`;

const NewsImg = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
`;

const CardContent = styled.div`
  padding: 20px;
  font-family: var(--font-family);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const News = ({ $isDarkMode }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const translateText = async (text) => {
      if (!text || text.length < 3) return text;
      try {
        const res = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=uk&dt=t&q=${encodeURIComponent(text)}`,
        );
        const data = await res.json();
        return data[0].map((s) => s[0]).join("");
      } catch {
        return text;
      }
    };

    const getData = async () => {
      setLoading(true);
      try {
        let allItems = [];
        for (const url of SOURCES) {
          try {
            const res = await fetch(
              `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`,
            );
            const data = await res.json();
            if (data.status === "ok" && data.items.length > 0) {
              allItems = data.items;
              break;
            }
          } catch (e) {
            continue;
          }
        }

        const clean = allItems.filter((i) => {
          const content = (i.title + (i.description || "")).toLowerCase();
          return !STOP_WORDS.some((word) => content.includes(word));
        });

        const limited = clean.slice(0, 5);

        const translated = await Promise.all(
          limited.map(async (item) => {
            const cleanDesc = (item.description || "")
              .replace(/<[^>]*>?/gm, "")
              .trim();
            const bestImg =
              (item.enclosure && item.enclosure.link) ||
              item.thumbnail ||
              rainbow;

            return {
              title: await translateText(item.title),
              description: await translateText(
                cleanDesc.substring(0, 80) + "...",
              ),
              link: item.link,
              displayImage: bestImg,
            };
          }),
        );

        setItems(translated);
      } catch (e) {
        console.error("Помилка завантаження новин:", e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <NewsDiv>
      <AihelpTitle $isDarkMode={$isDarkMode}>Світ природи</AihelpTitle>
      {loading ? (
        <div style={{ textAlign: "center", color: "gray", padding: "50px" }}>
          Шукаємо цікавинки...
        </div>
      ) : items.length > 0 ? (
        <Grid>
          {items.map((item, idx) => (
            <Card
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              $isDarkMode={$isDarkMode}
            >
              <NewsImg
                src={item.displayImage}
                alt=""
                onError={(e) => {
                  e.target.src = rainbow;
                }}
              />
              <CardContent>
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "18px",
                    fontWeight: "700",
                    lineHeight: "1.3",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    opacity: 0.7,
                    margin: 0,
                    lineHeight: "1.5",
                  }}
                >
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </Grid>
      ) : (
        <div style={{ textAlign: "center", color: "gray", padding: "20px" }}>
          Новини тимчасово відпочивають. Зазирніть за хвилину!
        </div>
      )}
    </NewsDiv>
  );
};

export default News;
