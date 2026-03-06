import React, { useState } from "react";
import styled from "styled-components";

const BANNED_KEYWORDS = [
  "війна",
  "вибори",
  "депутат",
  "рецепт",
  "порно",
  "казино",
];

const AihelpDiv = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 30px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 500px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
  color: black;
  font-family: inherit;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background: #0056b3;
  }
`;

const ResponseBox = styled.div`
  width: 100%;
  max-width: 500px;
  color: ${(props) => (props.$isDarkMode ? "black" : "white")};
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  white-space: pre-wrap;
  border: 1px solid rgba(255, 255, 255, 0.2);
  line-height: 1.5;
`;

const Aihelp = ({ $isDarkMode }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;

    const containsBanned = BANNED_KEYWORDS.some((word) =>
      trimmedPrompt.toLowerCase().includes(word.toLowerCase()),
    );

    if (containsBanned) {
      setResponse(
        "Вибачте, але я не можу відповідати на запитання на цю тему.",
      );
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/api/help", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: trimmedPrompt }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.text);
      } else {
        setResponse(data.error || "Сталася помилка на сервері.");
      }
    } catch (error) {
      setResponse(
        "Не вдалося зв'язатися з сервером. Переконайтеся, що бекенд запущено.",
      );
      console.error("Помилка:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AihelpDiv>
      <AihelpTitle $isDarkMode={$isDarkMode}>Допомога ШІ</AihelpTitle>

      <TextArea
        placeholder="Напишіть ваше запитання..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
      />

      <SendButton onClick={handleAsk} disabled={loading || !prompt.trim()}>
        {loading ? "Думаю..." : "Запитати ШІ"}
      </SendButton>

      {response && (
        <ResponseBox $isDarkMode={$isDarkMode}>
          <strong>Відповідь:</strong>
          <p>{response}</p>
        </ResponseBox>
      )}
    </AihelpDiv>
  );
};

export default Aihelp;
