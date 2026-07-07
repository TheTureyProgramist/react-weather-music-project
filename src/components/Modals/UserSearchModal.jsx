import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import localforage from "localforage";
import styled, { keyframes, css } from "styled-components";
import { GoogleGenerativeAI } from "@google/generative-ai";
import songAiKnowledge from "../MusicPhoto/songAiKnowledge.json";
import hills from "../../photos/hero-header/fog.webp";
import texts from "../../photos/vip-modal/texts.webp";
import logofix from "../../photos/hero-header/logo-fix.webp";
import preview from "../../photos/hero-header/prewiew.webp";
import info from "../../photos/hero-header/what.webp";
import one from "../../photos/hero-header/my/myone.webp";
import two from "../../photos/hero-header/my/mytwo.webp";
import soon from "../../photos/hero-header/my/soon.webp";
import might from "../../photos/hero-header/my/myone.webp";
import puzzle from "../../photos/vip-modal/puzzle.webp";
import three from "../../photos/hero-header/my/mythree.webp";
const slideIn = keyframes`
  0% { transform: translateY(100%) scale(0.9); opacity: 0; }
  100% { transform: translateY(0%) scale(1); opacity: 1; }
`;

const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.9); opacity: 0; }
`;

const fadeIn = keyframes`
   from { opacity: 0; transform: scale(0.8); }
   to { opacity: 1; transform: scale(1); }
 `;
const appearAndShrink = keyframes`
  0% { opacity: 0; transform: scale(1.3); filter: blur(10px); }
  50% { opacity: 0.5; transform: scale(1.1); filter: blur(2px); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
`;

const animatedStyle = css`
  opacity: 0;
  transform-origin: left center;
  animation: ${appearAndShrink} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    forwards;
  ${({ $index }) => css`
    animation-delay: ${0.1 + ($index || 0) * 0.05}s;
  `}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9000;
  transition:
    opacity 0.4s ease,
    pointer-events 0.4s ease;
  opacity: ${(props) => (props.$isClosing ? 0 : 1)};
  pointer-events: ${(props) => (props.$isClosing ? "none" : "auto")};
  backdrop-filter: blur(5px);
`;

const Content = styled.div`
  background: #ffd001;
  padding: 20px;
  border-radius: 20px;
  max-width: 900px;
  width: 95%;
  position: relative;
  font-family:
    "Inter",
    -apple-system,
    sans-serif;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.4s
    cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background: ${(props) => (props.$active ? "#8a2be2" : "rgba(0, 0, 0, 0.1)")};
  color: ${(props) => (props.$active ? "white" : "#333")};
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: ${(props) => (props.$active ? "#8a2be2" : "rgba(0, 0, 0, 0.2)")};
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  font-size: 34px;
  cursor: pointer;
`;

const PreviewCloseBtn = styled(CloseBtn)`
  color: white;
  top: 20px;
  right: 20px;
  z-index: 9601;
  animation: ${fadeIn} 0.3s ease-out forwards;
  &:hover {
    color: #ffb36c;
  }
`;

const AccordionWrapper = styled.div`
  margin-top: 10px;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  ${animatedStyle}
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => (props.$rating === 1 ? "#8a2be2" : "#111")};
  opacity: ${(props) => (props.$rating === -1 ? 0.4 : 1)};
  transition: all 0.3s ease;

  &:hover {
    color: #8a2be2;
  }

  &::before {
    content: "";
    width: 4px;
    height: 20px;
    background: ${(props) => (props.$rating === -1 ? "#ccc" : "#8a2be2")};
    margin-right: 12px;
    display: inline-block;
  }
`;

const QuestionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

const QuestionText = styled.div`
  flex: 1;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  gap: 3px;
  min-width: 20px;
  justify-content: flex-end;
  &:hover {
    transform: scale(1.2);
  }
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Arrow = styled.span`
  font-size: 12px;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(90deg)")};
`;

const Answer = styled.div`
  max-height: ${(props) => (props.$isOpen ? "6000px" : "0")};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding-bottom: ${(props) => (props.$isOpen ? "5px" : "0")};
  font-size: 13px;
  line-height: 1.6;
  color: #4a4a4a;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  white-space: pre-line;
`;

const AnswerImage = styled.img`
  max-width: 100%;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  height: auto;
  max-height: ${(props) =>
    props.$isHovered || props.$isPinned ? "800px" : "10px"};
  opacity: ${(props) => (props.$isHovered || props.$isPinned ? 1 : 0.4)};

  &:hover {
    transform: scale(1.01);
  }
`;

const ImagePreviewActions = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9600;
  display: flex;
  gap: 15px;
  animation: ${fadeIn} 0.3s ease-out forwards;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }
`;

const ImageActionsContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  display: flex;
  gap: 8px;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.$isHovered || props.$isPinned ? 1 : 0)};
  pointer-events: ${(props) =>
    props.$isHovered || props.$isPinned ? "auto" : "none"};
`;

const AnswerActionButton = styled.button`
  background: #8a2be2;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 2px 10px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s ease;
  &:hover {
    background: #a25be2;
  }
`;

const ImagePreviewOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  z-index: 9500;
`;

const PreviewImage = styled.img`
  max-width: 95%;
  max-height: 95%;
  object-fit: contain;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  cursor: zoom-out;
`;

const AnswerContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const AcceptBtn = styled.button`
  margin-top: 5px;
  padding: 6px 20px;
  background: #8a2be2;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
  transition: transform 0.2s;
  ${animatedStyle}
  &:hover {
    transform: scale(1.05);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  border: 2px solid rgba(138, 43, 226, 0.3);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #8a2be2;
    background: #fff;
  }

  &::placeholder {
    color: #999;
  }
`;

const ChatWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  &::-webkit-scrollbar { width: 4px; }
`;

const Message = styled.div`
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 13px;
  max-width: 85%;
  position: relative;
  ${props => props.$isUser ? css`
    background: #8a2be2;
    color: white;
    align-self: flex-end;
  ` : css`
    background: white;
    color: #333;
    align-self: flex-start;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  `}
`;

const EditBtn = styled.button`
  background: none;
  border: none;
  color: rgba(255,255,255,0.7);
  font-size: 10px;
  cursor: pointer;
  margin-top: 4px;
  text-decoration: underline;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
`;

const StopBtn = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClearBtn = styled.button`
  background: rgba(0, 0, 0, 0.1);
  color: #333;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const InfoModal = ({ onClose, isOpen }) => {
  const [isClosing, setIsClosing] = useState(false);
  const customDays = useSelector((state) => state.calendar?.customDays || []);
  const [activeIndex, setActiveIndex] = useState(null);
  const [ratings, setRatings] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faq");
  const LIKE = 1;
  const DISLIKE = -1;

  // Load pinned state
  useEffect(() => {
    const loadPinnedState = async () => {
      try {
        const saved = await localforage.getItem("training_actions_pinned");
        if (saved !== null) setIsActionsPinned(saved);
      } catch (e) {
        console.error("Error loading pinned state:", e);
      }
    };
    loadPinnedState();
  }, []);

  // AI Logic
  const [chatHistory, setChatHistory] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [geminiKey, setGeminiKey] = useState("");
  const abortControllerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const initAi = async () => {
      const savedKey = await localforage.getItem("gemini_api_key");
      const savedHistory = await localforage.getItem("user_help_session");
      if (savedKey) setGeminiKey(savedKey);
      if (savedHistory) setChatHistory(savedHistory);
      else setChatHistory([{ text: "Привіт! Я твій асистент 'Стихії'. Запитай мене про погоду, пісні або правила сайту.", isBot: true }]);
    };
    initAi();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory, isAiLoading]);

  const saveSession = async (history) => {
    await localforage.setItem("user_help_session", history.slice(-15));
  };

  const [hoveredImage, setHoveredImage] = useState(null);
  const [isActionsPinned, setIsActionsPinned] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleStopGeneration = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    setIsAiLoading(false);
  };

  const handleClearHistory = async () => {
    if (window.confirm("Очистити історію чату з асистентом?")) {
      const resetMsg = [{ text: "Привіт! Я твій асистент 'Стихії'. Запитай мене про погоду, пісні або правила сайту.", isBot: true }];
      setChatHistory(resetMsg);
      await localforage.removeItem("user_help_session");
    }
  };

  // Save pinned state
  const togglePin = async (e) => {
    e.stopPropagation();
    const newState = !isActionsPinned;
    setIsActionsPinned(newState);
    await localforage.setItem("training_actions_pinned", newState);
  };

  const handleClose = useCallback(() => {
    // Modified to handle previewImage first
    if (previewImage) {
      setPreviewImage(null);
      return; // Don't close the main modal if only preview was closed
    }
    setPreviewImage(null);
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400);
  }, [onClose, previewImage]);

  const handleDownloadImage = (imgSrc) => {
    const a = document.createElement("a");
    a.href = imgSrc;
    a.download = `stykhiya_image_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrintImage = (imgSrc) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print Image</title></head><body style="text-align:center;"><img src="${imgSrc}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
    );
    printWindow.document.close();
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen || isClosing) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, isClosing, handleClose]);

  const handleLike = (index, points) => {
    const currentRating = ratings[index] || 0;
    const newRating = currentRating === points ? 0 : points;
    setRatings({ ...ratings, [index]: newRating });
  };

  const pastEvents = React.useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return customDays
      .filter((day) => day.date < today)
      .sort((a, b) => b.date.localeCompare(a.date)) // Свіжіші спочатку
      .slice(0, 5);
  }, [customDays]);

  if (!isOpen && !isClosing) return null;

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      q: "Останнє оновлення",
      a: "Тут текст про нову версію, виправлення помилок та покращення стабільності.",
      image: null,
    },
    {
      q: "Угода користувача",
      a: `Ця Угода є юридично обов'язковим договором між Користувачем та Адміністрацією платформи. Натискаючи кнопку "Прийняти(у реєстрації)" або використовуючи будь-яку частину сервісу, ви підтверджуєте свою повну згоду з усіма пунктами.
1. Реєстрація та Вікові обмеження

1.1. Доступ до базових функцій надається особам, що досягли 13-річного віку.
1.2. Контент з маркуванням 14+ (зокрема певні музичні треки або візуальні матеріали) рекомендовані виключно особам відповідного віку.

2. Використання Штучного Інтелекту (ШІ)

2.1. Сервіс використовує технології генеративного ШІ для надання допомоги та створення контенту.
2.2. ШІ може генерувати фактично невірну або суб'єктивну інформацію. Адміністрація не несе відповідальності за поради ШІ.
2.3. Користувачеві заборонено використовувати ШІ для створення шкідливого коду, пропаганди ненависті, дискримінації або порушення законів України.
2.4. Ліміт безкоштовних повідомлень змінюється в залежності від активності користувачів.

3. Авторські права та Комерція

3.1. Платформа надає технічний інструментарій для прослуховування аудіовізуального(Виняток: відеовізуального: Динофроз) контенту. Адміністрація не є власником розміщених треків(Виняток: звуки індиків, коня, соловейка і вітру) та використовує їх виключно в ознайомчих цілях. Усі права належать їх законним власникам(Звуки з міткою Моя робота :), можна накладати на власні відео, музику і т.д.)
3.2. Генерації користувача: Ви отримуєте право власності на результати своєї творчості, створені за допомогою інструментів сервісу (фан-арти, тексти), та маєте право на їх комерційне використання (продаж у розрукованому вигляді, а у віртуальному з умовою посилання на Стихію). 
3.3. Зображення оригінальні(але я підняв для напруги, у деяких контрасність)
3.4. Для правовласників, я використовув їхні пісні з метою мотивації переглянути офіційний ресурс. У випадку якщо ви проти розміщення пишіть на емеіл theturkeystudio@gmail.com. Примітка: якщо не вийде домовитись, з розміщенням на сайті ми видалимо пісню через 24год. За умови, доказів, що ви дісно з компанії, а не користувач, що видає себе за неї. Якщо, після скарги ми відправили відповідь, але не отримували відповідь протягом 12днів, ми вважатимемо, що ви передумали(і вважатимемо спамом, ваші наспупні скарги 6 місяців).
       
4. Конфіденційність та Дані

4.1. Ми не збираємо: Ім'я, дату народження, IP-адресу, дані про активність, вибір аватара, і т.д. За бажанням, заходьте під псевдонімом або не існуючою електронною поштою.
 
5. Правила поведінки (Анти-спам)
Забороняється:
Використання ботів для накрутки прослуховувань треків або штучного інтелекту отримання досягнень.
Спроби злому системи, маніпуляції з балансом "Конвертів" або несанціонованого доступу до чужих акаунтів.
           
6. Відмова від гарантій

Сервіс надається за принципом (as is). Ми не гарантуємо безперебійну роботу сайту у разі технічних збоїв на стороні провайдерів або форс-мажорних обставин.

7. Зміни та розірвання

7.1. Адміністрація залишає за собою право змінювати цю Угоду в будь-який час. Продовження користування сайтом після змін означає вашу згоду з новою редакцією.
7.2. У разі порушення правил, акаунт користувача може бути заблокований без попередження. При блокуванні всі досягнення та внутрішня валюта анулюються без права на компенсації.
        
8. Ціни ми можемо змінювати, їх в будь яку мить(ми попередимо за 3 тижні)
Те саме з угодою користувача(попередження ми розмітимо внизу данної угоди і дату вступання її в силу.)

9. Досягнення та Внутрішня валюта (Конверти)
9.1. Конверти — це внутрішня віртуальна валюта сервісу, яка не є грошовим засобом у розумінні законодавства та не може бути обміняна на реальні кошти.
9.2. Конверти та досягнення нараховуються за активність на сайті.
9.3. Адміністрація має право в односторонньому порядку змінювати вартість послуг у Конвертах або правила нарахування досягнень та додавати і прибирати їх.

10. Майбутні зміни:
Я поки, що не планую нічого тут змінювати.
11. Я сам малював :) Вибачте Ніцерона не дуже намалював. І 2 орфорграфічні помилки у слові бундюча.
`,
      image: preview,
    },
    {
      q: "Примітки підписок і конвертів",
      a: `1.Mісячний/Річний тариф перемикається автоматично! При активній Стихія+ ви можете миттєво перейти на Ultra. Скасування Ultra, повертає Plus на решту терміну. Помилки оплати повертають гроші (або 🧧)
          2.Коли підписка закінчиться привілегії(не всі) зникнуть. Врахуйте: У тарифі Ultra діє лімітована акція, що активується після другої оплати поспіль(річні миттєво!). Якщо підписка Ultra буде перервана на термін понад 3 місяці, бонус зникне(доступ лише при
          дії Ultra, при Plus таймер заморожується.), і для його відновлення треба повторна серія оплат. Також доступна послуга «Швидкий старт»(2 безкоштовні) за 3,19 грн для миттєвої активації 1 акції.
          3.Переваги Plus оптимізовані в Стихія Ultrа, ті що не були вказані в Стихія Ultra(присутні, але ті самі як в Plus)
          4.Для власників Plus ціна знижена на 5грн, а Ultra на 10грн. Знижка діє і для обмежених подій. Початок нової доби о 0:00 за Київським часом. Ліміт конвертів 2500, ті що перевищують ліміт, будуть анульовані(збільште ліміт з підписками).
`,
      image: texts,
    },
    {
      q: "Календар версій(Мінорні 1.0 - 1.5)",
      a: `1.1 - 11.09.2026
          1.2 - 03.11.2026
          1.3 - 01.01.2027
          1.4 - 08.03.2027
          1.5 - 29.05.2027
`,
      image: info,
    },
    {
      q: "Співпраця та поради. Можливсості сайту.",
      a: "Так! Я можу підказати через email, як отримати доступ до API сайтів та плагінів, які я використовую. А ось можливості сайту: Погода, музика, фан-арти, ШІ, системи: 🧧, 🏆.",
      image: might,
    },
    {
      q: "Погода: навчання",
      a: "Ми маємо прогноз, що зараз, на 24години та на 16днів. За якої умови, прогнозна інформація червона. Якщо прямо зараз температура > 30°C або < -30°C, вітер > 10 м/с або УФ-індекс > 7. Умови попереджень, в наступних версіях, будуть корректніші, якщо ви дасте пораду в зміні лімітів. При вводі міста, дають мітку Червоний знак (!): з'являється, якщо прямо зараз, порушення умови. Оранжевий знак (!): з'являється, якщо такі умови очікуються хоча б в один із найближчих 3-х днів.",
      image: hills,
    },
    {
      q: "Невідомі кнопки в меню",
      a: "Роз’яснення всіх функцій можна знайти, натиснувши на символ меню ☰. Кожна кнопка має свою підказку. При наведенні на лого є 4 кнопки: скачати - зліва, друкувати - вгорі, повноеранний - справа, перемикання - на VIP стилі та версії - внизу.",
      image: logofix,
    },
    {
      q: "Валюти Стихії",
      a: "-----------------------------------",
      image: null,
    },
        {
      q: "Загальний план і історія",
      a: `Друзі, я хочу в головоломки, і кілька пісень вселити сюжет 'Сценотвору'. Сполерів небагато: Діма(головний герой), Кейт(добра, але серйозна індичка), Влад(друг Діми, харизматичний, і потрапляє у важкі ситуації), Поліна(зникла безвіти, її треба знайти і врятувати) боряться проти Метра(творіння хаосу і зла). 
Як виглядиме проходження? На вас чекає 104головоломки(7рідкостей, як у В'язниці), 1ша і 104та, будуть hidden object adventure(з скрімерами та лімітом життів), інші будуть мати харакер: знайди к-ка предметів в кількох локаціях, і розблокуй головоломку. Головоломки розблокуються одна за одною, деякі розблоковуюють у налаштуваннях пісень, режим сюжету де герої кажуть фрази субтитрами. Буду вдячний, чкщо хтось вас, вміє робити 3д відеоролики 20с, які зроблять сюжет живим. Головоломки, стають доступними з оновленнями. Крім 104головоломок, головоломка пазли, в якій ви будете відновлювати історію локації або героя.`,
      image: logofix,
    },
      {
      q: "Історія Доміно",
      a: `Колись давно був Орден Хаосу, який хотів захопити світ, пристроєм, що створює фантазії. Їх здолав орден Концетрації, але пристрій, зробив потайні ходи в інші світи. 
      Пристрій зник, але потрапивши на острів де жило 2маленьких індики(Доміно і Кейт), вони здобули свідомість і вічне життя, вони мандрували світами. Але ідилія не буває вічною, Доміно зник, а Кейт продовжила подорожі, пошуки не дали результатів. 
      Ходять чутки, що в печері, живе індик, в якого висять картини, І таблички з написами: Магазин Доміно, Кейт, де ти? Та різні сувеніри.
      Кейт переслідувала невідома сутність, і вона сховалась на одному з островів. 
      Її життя змінилось, коли діти(Поліна і Діма) потрапили через портал у кінотеатрі на її острів(Метра доклав до цього руки). Спойлерні питання: Куде, зникне Поліна? Що з Дімою, станеться на Евересті?, В якому опиниться ця трійця? Яку дрібницю, ніхто, крім Кейт, не помітить у тв шоу Світ навиворіт, Реальна містика, оповіданні кртвенька качечка та Динофрозі?`,
      image: logofix,
    },
    {
      q: "Чому ШІ відмовив у запиті за конверти?",
      a: "API штучного інтелекту є платним для розробника. Після вичерпання безкоштовного ліміту система може просити оплату для підтримки сервісу.",
      image: null,
    },
    {
      q: "Співпраця та поради. Можливсості сайту.",
      a: "Так! Я можу підказати через email, як отримати доступ до API сайтів та плагінів, які я використовую. А ось можливості сайту: Погода, музика, фан-арти, ШІ, системи: 🧧, 🏆.",
      image: null,
    },
    {
      q: "Рішення головоломок",
      a: `1. Зберіть картину, міняючи місцями елементи. Але при вашому ході, інші елементи переставлявся(можуть розвернутись, розмитись(в чіткості) і навпаки)
2. Повторіть послідовність натисками, яку показала гра.
3. Розкрийте, сейф уводячи код!
4. Ціль: Встановити 4 модулі на позиції ⚡.
Пили: Випадковий рух. У Фазі 1 забирають 1❤️.
НЕВРАЗЛИВІСТЬ: Після 4-го модуля — 8с безпеки (зелені пили).
ФАЗА ЕВАКУАЦІЇ: Пили стають невидимими (радіус 1) і наносять x2 ШКОДИ (2❤️)!
Як вижити? Активуйте 8 точок 📍. При кожній активації пили стають видимими на 1с.
      `,
      image: puzzle,
    },
    {
      q: "Я втратив акаунт. Чому?",
      a: "Ваші дані в безпеці, бо ми не зберігаємо їх постійно. Через очищення кешу браузера сесія може бути перервана.",
      image: null,
    },
    {
      q: "Про тематику та ностальгію",
      a: "Скоріше за все, мені нудно, тому спогади вставив: музику з Geometry Dash та Minecraft, бо мої друзі любили грати в ці ігри. А я в My Litle Universe. Індики, бо вони роблять мене щасливими. А Динофроз, бо я маю надію, що Malatko TV, повернеться і можливо покажуть, і я відкритий до ваших ідей!",
      image: two,
    },
    {
      q: "Чому є реклама при переході на новину?",
      a: "Реклама допомагає отримувати прибуток, який е головною мотивацією розвивати проект далі для вас.",
      image: null,
    },
    {
      q: "Обмеження підписки на музику",
      a: "Ми поважаємо авторське право. Заробляти на чужих піснях — це неправильно.",
      image: three,
    },
    {
      q: "Навіщо реєстрація?",
      a: "Це необхідно для ідентифікації підписників та впевненості, що контент використовується за призначенням, стабільності системи оплати, ШІ та підписок.",
      image: one,
    },
    {
      q: "Чи буде після Стихії щось?",
      a: "Ви навіть не уявляєте мій задум! Час покаже, а ваша підтримка та мотивація збільшують шанси!",
      image: soon,
    },
    {
      q: "Механіки плейлисту",
      a: `Свайп/Стрілки: Перемикання треків
Пробіл: Пауза/Старт
Клік зліва/справа (20% екрану): Промотка -2с/+2с
Центр екрану: Пауза/Старт
Шестерня: Налаштування швидкості, гучності, інтервалу промотки
Динофроз: Навідміну від інших, відео, замість свайпу картинок, фільртів.
Прев'ю: Наведення на шкалу показує кадр (відео) або фото.
Регулятор: Справа від звукового джойстика, натискайте для зміни: Автоповтор, наступна пісня по черзі, чи випадково
Кешування: Зберігає пісню/відео (Доступ без інтернету). Зліва від звукового джойстика
Скрін: Знак камери, вибір: скачати, сфотографувати.
Обрізка: Скріншоти та завантаження фото автоматично обрізають 10% площі (по 5% з країв).
Clubstep: рандомні фільтри.
`,
      image: null,
    },
  ];

  if (pastEvents.length > 0) {
    const pastText = pastEvents
      .map((e) => `• ${e.date}: ${e.reason}`)
      .join("\n");
    faqData.unshift({
      q: "📚 Архів минулих подій (ліміт 5)",
      a: `Це події, які ви додавали, але їх час уже минув:\n\n${pastText}`,
      image: null,
    });
  }

  const handleAskAi = async () => {
    if (!searchQuery.trim() || isAiLoading) return;
    
    if (!geminiKey) {
      alert("Будь ласка, встановіть API-ключ Gemini у налаштуваннях ШІ для використання цієї функції.");
      return;
    }

    const userText = searchQuery;
    setSearchQuery("");
    const newHistory = [...chatHistory, { text: userText, isBot: false }];
    setChatHistory(newHistory);
    setIsAiLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      // Формуємо контекст з FAQ та бази пісень
      const faqContext = faqData.map(f => `Q: ${f.q} A: ${f.a}`).join("\n");
      const songsContext = songAiKnowledge.map(s => {
        const dur = s.duration ? `${Math.floor(s.duration / 60)}:${(s.duration % 60).toString().padStart(2, '0')}` : "невідомо";
        const lyricsSum = s.lyrics && Array.isArray(s.lyrics) ? s.lyrics.map(l => `${l.time}s:${l.text}`).join("|").substring(0, 100) : "no";
        const filtersSum = s.filters && Array.isArray(s.filters) ? s.filters.map(f => `${f.start}-${f.end}s:${f.type}`).join("|") : "no";
        
        let base = `Song: ${s.author}, Category: ${s.category}, Duration: ${dur}, Lyrics: ${lyricsSum}..., Filters: ${filtersSum}, Info: ${s.text}`;
        
        if (s.schedule) {
          const sched = s.schedule.map(e => `S${e.season}E${e.ep}: ${e.title} (${e.date})`).join("; ");
          base += `. Schedule: ${sched}`;
        }
        return base;
      }).join("\n");
      
      const prompt = `Ти асистент проекту "Стихія". Тобі доступні дві бази даних:
      1. База FAQ: містить правила сайту, інформацію про підписки, набори 🧧 та інструкції щодо розділу Погода.
      2. База пісень: містить повний список треків (${songAiKnowledge.length} шт), авторів, тексти пісень та візуальні ефекти (фільтри).

      ІНСТРУКЦІЯ:
      - Якщо запит стосується температури, вітру, УФ-індексу або роботи розділу погоди — шукай у базі FAQ.
      - Якщо запит стосується конкретної пісні, її тривалості, тексту або ефектів — шукай у Базі пісень.
      - Якщо питання про валюту сайту (конверти) — дивись розділ Валюти в FAQ.
      - Відповідай коротко, професійно та виключно українською мовою.

      КОНТЕКСТ FAQ: ${faqContext.substring(0, 2000)}
      КОНТЕКСТ ПІСЕНЬ: ${songsContext.substring(0, 15000)}

      ЗАПИТ КОРИСТУВАЧА: ${userText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const botText = response.text();

      const finalHistory = [...newHistory, { text: botText, isBot: true }];
      setChatHistory(finalHistory);
      await saveSession(finalHistory);
    } catch (e) {
      if (e.name !== 'AbortError') {
        const errHistory = [...newHistory, { text: "Помилка зв'язку з інтелектом. Перевірте ключ.", isBot: true }];
        setChatHistory(errHistory);
      }
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleEditMessage = (index) => {
    setSearchQuery(chatHistory[index].text);
  };

  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const sortedFaqData = [...faqData]
    .filter((item) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.q?.toLowerCase().includes(query) ||
        item.a?.toLowerCase().includes(query)
      );
    })
    .map((item, originalIndex) => ({
      ...item,
      originalIndex,
      rating: ratings[originalIndex] || 0,
    }))
    .sort((a, b) => b.rating - a.rating);

  return (
    <Overlay $isClosing={isClosing} onClick={handleClose}>
      <Content $isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={handleClose}>&times;</CloseBtn>
        <h1
          style={{
            textAlign: "center",
            fontSize: "26px",
            color: "#222",
            marginBottom: "5px",
          }}
        >
          Навчання
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#666",
            marginBottom: "5px",
          }}
        >
          Останнє оновлення: 6 травня 2026 року
        </p>

        <TabsContainer>
          <TabButton $active={activeTab === "faq"} onClick={() => setActiveTab("faq")}>
            Питання (FAQ)
          </TabButton>
          <TabButton $active={activeTab === "ai"} onClick={() => setActiveTab("ai")}>
            ШІ Асистент
          </TabButton>
        </TabsContainer>

        {activeTab === "ai" && (
          <div>
            <ChatWrapper ref={scrollRef}>
              {chatHistory.map((m, i) => (
                <Message key={i} $isUser={!m.isBot}>
                  {renderTextWithLinks(m.text)}
                  {!m.isBot && i === chatHistory.length - 1 && !isAiLoading && (
                    <EditBtn onClick={() => handleEditMessage(i)}>редагувати</EditBtn>
                  )}
                </Message>
              ))}
              {isAiLoading && <Message $isUser={false}>Думаю...</Message>}
            </ChatWrapper>

            <InputRow>
              <SearchInput
                type="text"
                placeholder="Запитай ШІ або шукай у FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAskAi()}
              />
              <ClearBtn onClick={handleClearHistory} title="Очистити чат">🗑️</ClearBtn>
              {isAiLoading ? (
                <StopBtn onClick={handleStopGeneration} title="Зупинити">🛑</StopBtn>
              ) : (
                <AcceptBtn style={{ marginTop: 0, padding: '0 15px' }} onClick={handleAskAi}>
                  Запитати
                </AcceptBtn>
              )}
            </InputRow>
          </div>
        )}

        {activeTab === "faq" && (
          <AccordionWrapper style={{ marginTop: 0 }}>
            {sortedFaqData.map((item, displayIndex) => {
              const originalIndex = item.originalIndex;
              const rating = ratings[originalIndex] || 0;

              return (
                <AccordionItem key={originalIndex} $index={displayIndex + 1}>
                  <Question $rating={rating} onClick={() => toggleAccordion(originalIndex)}>
                    <QuestionContent>
                      <QuestionText>{item.q}</QuestionText>
                      <ArrowContainer>
                        <LikeButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(originalIndex, LIKE);
                          }}
                          title="Корисно"
                        >
                          {rating === LIKE ? "❤️" : "🤍"}
                        </LikeButton>
                        <LikeButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(originalIndex, DISLIKE);
                          }}
                          title="Не корисно"
                        >
                          {rating === DISLIKE ? "👎" : "👎🏻"}
                        </LikeButton>
                        <Arrow $isOpen={activeIndex === originalIndex}>▼</Arrow>
                      </ArrowContainer>
                    </QuestionContent>
                  </Question>
                  <Answer $isOpen={activeIndex === originalIndex}>
                    <AnswerContent>
                      {item.image && (
                        <>
                          <AnswerImage
                            src={item.image}
                            alt={item.q}
                            $isHovered={hoveredImage === item.image}
                            $isPinned={isActionsPinned}
                            onClick={() => setPreviewImage(item.image)}
                            onMouseEnter={() => setHoveredImage(item.image)}
                            onMouseLeave={() => setHoveredImage(null)}
                          />
                          <ImageActionsContainer
                            $isHovered={hoveredImage === item.image}
                            $isPinned={isActionsPinned}
                            onMouseEnter={() => setHoveredImage(item.image)}
                            onMouseLeave={() => setHoveredImage(null)}
                          >
                            <AnswerActionButton
                              onClick={togglePin}
                              title={
                                isActionsPinned
                                  ? "Відкріпити кнопки"
                                  : "Закріпити кнопки"
                              }
                            >
                              {isActionsPinned ? "📌" : "📍"}
                            </AnswerActionButton>
                            <AnswerActionButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadImage(item.image);
                              }}
                            >
                              ⇩ Скачати
                            </AnswerActionButton>
                            <AnswerActionButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrintImage(item.image);
                              }}
                            >
                              🖨️ Друкувати
                            </AnswerActionButton>
                          </ImageActionsContainer>
                        </>
                      )}
                      {/* Вставляємо як HTML, якщо потрібно підтримувати теги */}
                      <div dangerouslySetInnerHTML={{ __html: item.a.replace(/\n/g, '<br/>') }} />
                    </AnswerContent>
                  </Answer>
                </AccordionItem>
              );
            })}
          </AccordionWrapper>
        )}
        <div style={{ textAlign: "center" }}>
          <AcceptBtn $index={faqData.length + 2} onClick={handleClose}>
            Дякую, зрозуміло!
          </AcceptBtn>
        </div>
      </Content>
      {previewImage && (
        <ImagePreviewOverlay onClick={() => setPreviewImage(null)}>
          <PreviewCloseBtn onClick={() => setPreviewImage(null)}>
            &times;
          </PreviewCloseBtn>
          <ImagePreviewActions>
            <ActionButton
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadImage(previewImage);
              }}
            >
              ⇩ Скачати
            </ActionButton>
            <ActionButton
              onClick={(e) => {
                e.stopPropagation();
                handlePrintImage(previewImage);
              }}
            >
              🖨️ Друкувати
            </ActionButton>
          </ImagePreviewActions>
          <PreviewImage
            src={previewImage}
            alt="Прев'ю зображення"
            onClick={(e) => e.stopPropagation()}
          />
        </ImagePreviewOverlay>
      )}
    </Overlay>
  );
};
export default InfoModal;
