import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { GoogleGenerativeAI } from "@google/generative-ai";
import localforage from "localforage";
import ReactMarkdown from "react-markdown";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: ${(props) => (props.$isDarkMode ? "#1a1a1a" : "#fdfdfd")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  width: 100%;
  max-width: 600px;
  height: 85vh;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border: 1px solid ${(props) => (props.$isDarkMode ? "#333" : "#ddd")};
`;

const Header = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid ${(props) => (props.$isDarkMode ? "#333" : "#eee")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 { margin: 0; font-size: 18px; color: #ffb36c; font-family: var(--font-family, sans-serif); }
`;

const CloseBtn = styled.button`
  background: none; border: none; color: inherit; font-size: 24px; cursor: pointer;
  &:hover { color: #ff4d4d; }
`;

const Body = styled.div`
  padding: 15px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-family: var(--font-family, sans-serif);
`;

const ModesContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ModeBtn = styled.button`
  background: ${(props) => (props.$active ? "#ffb36c" : "transparent")};
  color: ${(props) => (props.$active ? "#000" : (props.$isDarkMode ? "#ccc" : "#444"))};
  border: 1px solid ${(props) => (props.$active ? "#ffb36c" : (props.$isDarkMode ? "#444" : "#ccc"))};
  border-radius: 12px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover:not(:disabled) {
    border-color: #ffb36c;
    color: ${(props) => (props.$active ? "#000" : "#ffb36c")};
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const ChatHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
`;

const Message = styled.div`
  align-self: ${(props) => (props.$isBot ? "flex-start" : "flex-end")};
  background: ${(props) => (props.$isBot ? (props.$isDarkMode ? "#2a2a2a" : "#f0f0f0") : "#ffb36c")};
  color: ${(props) => (props.$isBot ? (props.$isDarkMode ? "#fff" : "#000") : "#000")};
  padding: 10px 15px;
  border-radius: 12px;
  max-width: 90%;
  font-size: 14px;
  line-height: 1.4;
  border: 1px solid ${(props) => (props.$isBot ? (props.$isDarkMode ? "#444" : "#ddd") : "#e69c55")};
  
  a {
    color: ${(props) => (props.$isBot ? "#ffb36c" : "#000")};
    text-decoration: underline;
  }
`;

const InputArea = styled.div`
  padding: 15px;
  border-top: 1px solid ${(props) => (props.$isDarkMode ? "#333" : "#eee")};
  display: flex;
  gap: 10px;
  background: ${(props) => (props.$isDarkMode ? "#111" : "#fafafa")};
  font-family: var(--font-family, sans-serif);
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 15px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.$isDarkMode ? "#444" : "#ccc")};
  background: ${(props) => (props.$isDarkMode ? "#222" : "#fff")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  outline: none;
  font-family: inherit;
  &:focus { border-color: #ffb36c; }
`;

const SendBtn = styled.button`
  background: #ffb36c; color: #000; border: none; padding: 0 20px; border-radius: 20px; cursor: pointer; font-weight: bold;
  transition: all 0.2s;
  &:hover:not(:disabled) { background: #ffa040; transform: scale(1.05); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export default function NewsAiModal({ isOpen, onClose, newsItem, isDarkMode }) {
  const [mode, setMode] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    localforage.getItem("gemini_api_key").then(key => setApiKey(key));
    
    // "чат скидається через добу, показує останні 10 запитів"
    const historyKey = `news_ai_chat_${newsItem?.link || 'general'}`;
    localforage.getItem(historyKey).then(data => {
      if (data) {
        if (Date.now() - data.timestamp > 24 * 60 * 60 * 1000) {
          setMessages([]);
        } else {
          setMessages(data.messages || []);
        }
      } else {
        setMessages([]);
      }
    });
  }, [isOpen, newsItem]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveHistory = (msgs) => {
    const toSave = msgs.slice(-20); // roughly 10 user requests + 10 bot responses
    const historyKey = `news_ai_chat_${newsItem?.link || 'general'}`;
    localforage.setItem(historyKey, {
      timestamp: Date.now(),
      messages: toSave
    });
    setMessages(toSave);
  };

  const handleSend = async (customPrompt = null, forceMode = null) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;
    if (!apiKey) {
      alert("Не знайдено Gemini API ключ! Додайте його в меню 'Допомога ШІ' внизу сторінки.");
      return;
    }

    const currentMode = forceMode || mode || "докладно";
    
    let userMsg = { text: customPrompt ? `[Режим: ${forceMode}] Зроби виклад цієї новини.` : textToSend, isBot: false };
    const newMsgs = [...messages, userMsg];
    
    if (!customPrompt) setInput("");
    setMessages(newMsgs);
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      let systemPrompt = `Ти - ШІ-помічник. Твоє завдання зробити виклад новини та відповідати на питання щодо неї. Режим відповіді: ${currentMode}.`;
      if (currentMode === "коротко") systemPrompt += " Відповідай максимально стисло, виділи головне (1-2 речення).";
      if (currentMode === "докладно") systemPrompt += " Відповідай розгорнуто, з усіма доступними деталями, структуруй текст.";
      if (currentMode === "науково") systemPrompt += " Використовуй науковий, академічний стиль та термінологію, аналітичний підхід.";
      if (currentMode === "дружньо") systemPrompt += " Будь дуже милим, дружнім, як найкращий друг, використовуй смайлики та неформальний стиль.";
      if (currentMode === "саркастично") systemPrompt += " Відповідай з легким сарказмом та іронією (але без образ та цензурно).";

      // "із сайту якщо можливий перехід на нього" - ми передаємо посилання, Gemini іноді може читати сайти.
      let promptText = `${systemPrompt}\n\nОсь новина, про яку йде мова:\nЗаголовок: ${newsItem.title}\nОпис: ${newsItem.description}\nПосилання на сайт (якщо можеш, перейди за ним для деталей): ${newsItem.link}\n\nЗапит: ${textToSend}`;

      const result = await model.generateContent(promptText);
      const botResponse = result.response.text();

      const botMsg = { text: botResponse, isBot: true };
      saveHistory([...newMsgs, botMsg]);
      
    } catch (error) {
      console.error(error);
      const botMsg = { text: "⚠️ Помилка при генерації відповіді. Перевірте API-ключ або спробуйте пізніше.", isBot: true };
      saveHistory([...newMsgs, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const doSummary = (selectedMode) => {
     setMode(selectedMode);
     handleSend("Будь ласка, зроби виклад цієї новини. Якщо можеш - візьми дані безпосередньо з сайту за посиланням, якщо ні - використай наданий опис.", selectedMode);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent $isDarkMode={isDarkMode} onClick={e => e.stopPropagation()}>
        <Header $isDarkMode={isDarkMode}>
          <h3>✨ ШІ Виклад Новини</h3>
          <CloseBtn onClick={onClose} title="Закрити">&times;</CloseBtn>
        </Header>
        <Body>
          <ModesContainer>
            {["коротко", "докладно", "науково", "дружньо", "саркастично"].map(m => (
              <ModeBtn 
                key={m} 
                $active={mode === m} 
                $isDarkMode={isDarkMode}
                onClick={() => doSummary(m)}
                disabled={loading}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </ModeBtn>
            ))}
          </ModesContainer>
          <ChatHistory>
            {messages.length === 0 && !loading && (
               <div style={{ textAlign: "center", marginTop: "20px", color: "gray", fontSize: "14px" }}>
                 Оберіть режим вище, щоб згенерувати виклад новини, або просто задайте своє питання щодо неї!
               </div>
            )}
            {messages.map((m, i) => (
              <Message key={i} $isBot={m.isBot} $isDarkMode={isDarkMode}>
                <ReactMarkdown>{m.text}</ReactMarkdown>
              </Message>
            ))}
            {loading && <Message $isBot={true} $isDarkMode={isDarkMode}>Думаю... 🤔</Message>}
            <div ref={chatEndRef} />
          </ChatHistory>
        </Body>
        <InputArea $isDarkMode={isDarkMode}>
          <Input 
            $isDarkMode={isDarkMode} 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Задайте питання щодо новини..."
            disabled={loading}
          />
          <SendBtn onClick={() => handleSend()} disabled={loading || !input.trim()} title="Відправити">➔</SendBtn>
        </InputArea>
      </ModalContent>
    </ModalOverlay>
  );
}
