import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import horse from "../../photos/vip-images/horse.jpg";
import asium from "../../photos/vip-images/asium.jpg";
import chess from "../../photos/fan-art/chess.webp";
import time from "../../photos/vip-images/mechannic.jpg";
import puzzle1 from "../../photos/fan-art/puzzle-1.webp";
import puzzle2 from "../../photos/fan-art/puzzle-2.webp";
import puzzle3 from "../../photos/fan-art/puzzle-3.webp";
import puzzle4 from "../../photos/fan-art/puzzle-4.webp";
import puzzle5 from "../../photos/fan-art/puzzle-5.webp";
import letters from "../../photos/fan-art/letters.webp";
import niceron from "../../photos/vip-images/vip-dinofroz.webp";
import christmas from "../../photos/vip-images/christmas.jpg";
import telegram from "../../photos/fan-art/telegram.webp";
import clip from "../../photos/vip-images/clip.png";
import horrordog from "../../photos/vip-images/horror.jpg";
import dragons from "../../photos/vip-images/vip-dragons.jpg";
import stars from "../../photos/vip-images/stars.jpg";
import macduck from "../../photos/fan-art/macduck.webp";
import matrix from "../../photos/fan-art/matrix.webp";
import impossible from "../../photos/fan-art/impossible.jpg";
import impossible2 from "../../photos/fan-art/impossible2.webp";
import matrix2 from "../../photos/fan-art/matrix2.jpg";
import virus from "../../photos/fan-art/virus.webp";
import kolada from "../../photos/fan-art/kolada.webp";
// import document from "../../photos/fan-art/document.webp";
import anchor from "../../photos/fan-art/anchor.webp";
import parol from "../../photos/fan-art/parol.jpg";
import password from "../../photos/fan-art/password.webp";
import returns from "../../photos/fan-art/returns.webp";
import money from "../../photos/fan-art/money.webp";
import marks from "../../photos/fan-art/marks.webp";
import grafity from "../../photos/fan-art/grafiti.webp";
import finances from "../../photos/fan-art/finance.jpg";
import text from "../../photos/vip-modal/texts.jpg";
import rooster from "../../photos/vip-images/vip-rooster.jpg";
import turkeys from "../../photos/vip-images/collectors-edition.jpg";
import cloud from "../../photos/fan-art/strangecloud.webp";
import threedprinter from "../../photos/fan-art/threed-printer.webp";
import dizel from "../../photos/vip-images/dizel.webp";
import wall from "../../photos/fan-art/wall.webp";
import cycle from "../../photos/fan-art/cycle.webp";
import masons from "../../photos/fan-art/masons.webp";
import texting from "../../photos/fan-art/text.jpg";
import hills from "../../photos/hero-header/hiils.jpg";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  0% { transform: translateY(100%) scale(0.5); opacity: 0; }
  100% { transform: translateY(0%) scale(1); opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.5); opacity: 0; }
`;

const appearAndShrink = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.3); 
    filter: blur(10px);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: scale(1); 
    filter: blur(0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  backdrop-filter: blur(3px);
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${(props) => (props.isClosing ? fadeOut : fadeIn)} 0.3s ease-out
    forwards;
`;

const ModalContent = styled.div`
  background: #093500;
  color: #2eb813;
  padding: 7px;
  border-radius: 15px;
  width: 95%;
  max-width: 550px;
  max-height: 85vh;
  border: 2px solid #2eb813;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: ${(props) =>
    props.isClosing
      ? css`
          ${slideOut} 0.3s ease-in forwards
        `
      : css`
          ${slideIn} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards
        `};
`;

const ScrollContainer = styled.div`
  overflow-y: auto;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #051a00;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #2eb813;
    border-radius: 10px;
  }
  scrollbar-width: thin;
  scrollbar-color: #2eb813 #051a00;
`;

const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CategoryTitle = styled.div`
  font-size: 14px;
  letter-spacing: 1.5px;
  color: #a2ff6c;
  border-bottom: 1px solid rgba(162, 255, 108, 0.3);
  padding-bottom: 5px;
  margin-bottom: 5px;
  font-weight: 900;
  opacity: 0;
  animation: ${appearAndShrink} 0.6s ease-out forwards;
  ${({ $delay }) => css`
    animation-delay: ${$delay || "0.2s"};
  `}
`;
const AchivmentItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(162, 255, 108, 0.05);
  border-radius: 12px;
  padding: 6px;
  gap: 15px;
  border: ${(props) =>
    props.isSpecial ? "2px solid #ff0000" : "1px solid #a2ff6c"};
  transition: transform 0.2s;
  opacity: 0;
  animation: ${appearAndShrink} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    forwards;
  ${({ $index }) => css`
    animation-delay: ${0.3 + $index * 0.1}s;
  `}

  &:hover {
    background: rgba(162, 255, 108, 0.1);
    transform: translateX(3px);
  }
`;

const AchivmentImagePlace = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #2eb813;
  background: #051a00;
`;

const AchivmentName = styled.h3`
  margin: 0;
  font-size: 15px;
  color: #ffb36c;
`;

const AchivmentGoal = styled.p`
  margin: 3px 0 0;
  font-size: 11px;
  line-height: 1.3;
  opacity: 0.8;
  color: ${(props) => (props.isBlue ? "#00a2ff" : "#a2ff6c")};
`;

const RewardField = styled.div`
  width: 60px;
  height: 35px;
  background: rgba(46, 184, 19, 0.2);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 13px;
  border: 1px dashed #ffb36c;
  color: #ffb36c;
  flex-shrink: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #2eb813;
  z-index: 10;
  &:hover {
    color: #a2ff6c;
    transform: rotate(90deg);
  }
       @media (max-width: 768px) {
     top: 10px;
     font-size: 19px;
  right: 10px;
  }
`;

const AchivmentsModal = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  const categories = [
    {
      title: "🎮 Ігрові Майстри",
      items: [
        {
          name: "Спринтер",
          goal: "Ціль: пройти за 40с головоломку. І отримайте зелений колір імені.",
          reward: "40 🧧",
          img: horse,
        },
        {
          name: "Душевний спокій",
          goal: "Ціль: при розгадці ребусів не натискайте 4хв.",
          reward: "40 🧧",
          img: asium,
        },
        {
          name: "Ледве встиг!",
          goal: "Ціль: закінчіть головоломку в останні 3,7с.",
          reward: "37 🧧",
          img: time,
        },
        {
          name: "Давай!",
          goal: "Ціль: Почніть головоломку, залиште останній хід і не робіть його протягом 2 хвилин 6 cекунд мінімум, а потім закінчіть.",
          reward: "21 🧧",
          img: chess,
        },
        {
          name: "Ерудит",
          goal: "Ціль: пройдіть головоломку за 22 ходів.",
          reward: "22 🧧",
          img: puzzle1,
        },
        {
          name: "Помилка-це навчання",
          goal: "Ціль: пройдіть головоломку на 23 спробі, між перезапусками 23с!",
          reward: "23 🧧",
          img: puzzle2,
        },
        {
          name: "Любитель ризиків",
          goal: "Ціль: пройдіть з І спроби головоломку (раз на добу).",
          reward: "30 🧧",
          img: puzzle3,
        },
        {
          name: "Це незвично!",
          goal: "Ціль: пройдіть за 30хв одну й ту саму головоломку 3 рази поспіль.",
          reward: "20 🧧",
          img: puzzle4,
        },
        {
          name: "Назад в минуле!",
          goal: "Ціль: пройдіть одну й ту саму головоломку 2 рази поспіль секунда в секунду!",
          reward: "40 🧧",
          img: puzzle5,
        },
      ],
    },
    {
      title: "👥 Соціальні та Активність",
      items: [
        {
          name: "Порекомендую!",
          goal: "Ціль: увести в поле реєстрації або налаштувань, акаунт знайомого... Отримайте червоний колір імені.",
          reward: "35 🧧",
          isSpecial: true,
          img: telegram,
        },
        {
          name: "Щедрик!",
          goal: "Ціль: відайте 36 🧧 другу.",
          reward: "36 🧧",
          img: kolada,
        },
        {
          name: "З двох краще!",
          goal: "Зайдіть в акаунт з 2 пристороЇв. Отримайте голубий колір текту імені.",
          reward: "20 🧧",
          img: hills,
        },
        {
          name: "Бог любить трійцю!",
          goal: "Ціль: заходьте до нас після реєстрації 3 дні підряд.",
          reward: "30 🧧",
          img: christmas,
        },
        {
          name: "А я думав, що ти не повернешся.",
          goal: "Ціль: заходьте 3 днів поспіль, а потім не заходьте 3 дні.",
          reward: "30 🧧",
          img: returns,
        },
        {
          name: "Спонсор",
          goal: "Ціль: підпишіться на мій фейсбук канал.",
          reward: "40 🧧",
          img: money,
        },
        {
          name: "Великий день!",
          goal: "Зайдіть на сайт, на важливе свято (старого/нового стилю).",
          reward: "40 🧧",
          img: christmas,
        },
        {
          name: "Любитель графіті!",
          goal: "Ціль: зберіть усі кольори імені(що отримуються з часом, конвертами, досягненнями).",
          reward: "40 🧧",
          img: grafity,
        },
        {
          name: "Колекціонер",
          goal: "Ціль: зберіть усі аватари(що отримуються з часом або конвертами).",
          reward: "40 🧧",
          img: marks,
        },
      ],
    },
    {
      title: "🛠 Технічні та Налаштування",
      items: [
        {
          name: "Хапай якір!",
          goal: "Ціль: вийдіть з акаунту і поверніться через логін. І отримайте червону обводку імені.",
          reward: "20 🧧",
          img: anchor,
        },
        {
          name: "Фінансисти!",
          goal: "Ціль: 2 дні підряд витрачайте лише по 20🧧. І отримайте зелену обводку імені.",
          reward: "20 🧧",
          img: finances,
        },
        {
          name: "Ви зараз виконуєте це afk :(?",
          goal: "Читайте угоду користувача 2:42хв!",
          reward: "27 🧧",
          img: text,
        },
        {
          name: "Краще перестрахуюсь!",
          goal: "Ціль: змініть пароль у нашому сайті.",
          reward: "20 🧧",
          img: parol,
        },
        {
          name: "Хм дай подумаю ні!",
          goal: "Ціль: зробіть 2етапну перевірку.",
          reward: "20 🧧",
          img: password,
        },
        {
          name: "Цикл",
          goal: "Ціль: натискайте на мелодії користуючись кодом: 8123... Вірна комбінація номерів підсвічує кнопку.",
          reward: "40 🧧",
          img: cycle,
        },
        {
          name: "Можна взяти?",
          goal: "Ціль: Скачайте пісню.",
          reward: "20 🧧",
          img: dizel,
        },
        {
          name: "Ти не станеш у мене на шляху!",
          goal: "Ціль: Прискорте перезарядку кнопки 🧧.",
          reward: "20 🧧",
          img: wall,
        },
        {
          name: "Індики винні!",
          goal: "Ціль: за 1хв змініть світлу-темну тему 28разів. Під звуки індиків!",
          reward: "28 🧧",
          img: turkeys,
        },
        {
          name: "Мінливий характер!",
          goal: "Змініть 10разів аватар за 40с.",
          reward: "40 🧧",
          img: cloud,
        },
        {
          name: "Принтер!",
          goal: "Змініть 4 рази колiр тексту імені за 40с.",
          reward: "40 🧧",
          img: threedprinter,
        },
      ],
    },
    {
      title: "🎵 Медіа та Контент",
      items: [
        {
          name: "Дубль 2",
          goal: "Ціль: прослухайте двічі мелодію, через автоповтор.",
          reward: "20 🧧",
          img: clip,
        },
        {
          name: "Тестувальник",
          goal: "Ціль: Випробуйте режим відео(музичні картки).",
          reward: "20 🧧",
          img: matrix,
        },
        {
          name: "Люблю текст!",
          goal: "Ціль: Натисність на кнопку текст пісні.",
          reward: "20 🧧",
          img: texting,
        },
        {
          name: "Фанат чи хейтер?",
          goal: "Ціль: Натисніть на кнопку роздрукувати фан-арт...",
          reward: "20 🧧",
          img: rooster,
        },
        {
          name: "Зоряно!",
          goal: "Виберіть 3 пісні в обране, за 38с.",
          reward: "38 🧧",
          img: stars,
        },
        {
          name: "Дракомбінація",
          goal: "Скомбінуйте 2 саундтреки про драконів.",
          reward: "20 🧧",
          img: dragons,
        },
      ],
    },
    {
      title: "🕵️ Секретні та Особливі",
      items: [
        {
          name: "Він точно шпигун!",
          goal: "Зайдіть на сайт, коли в Києві температура нижче -24°C або вище +24°C.",
          reward: "24 🧧",
          img: impossible2,
        },
        {
          name: "Конотопська відьма!",
          goal: "Зайдіть на сайт, о 2:30, паралельно ввімкнуши саундхоррор 'Жах ночі'.",
          reward: "25 🧧",
          img: horrordog,
        },
        {
          name: "Ви не з масонської організації?",
          goal: "Натисність дізнатися більше у погодній картці.",
          reward: "33 🧧",
          img: masons,
        },
        {
          name: "Це цікаво!",
          goal: "Ціль: знайдіть зайве на сайті, воно маленьке...",
          reward: "29 🧧",
          img: virus,
        },
        {
          name: "Помножений на нуль!",
          goal: "Витратьте 310🧧 за 31хв.",
          reward: "31 🧧",
          img: letters,
        },
        {
          name: "Він знає те чого не знаю я?",
          goal: "Зосередьте мишку у футері на лого на 3хв 12с!",
          reward: "32 🧧",
          img: matrix2,
        },
        {
          name: "Скрудж МакДак",
          goal: "Ціль: Накопичте 340🧧!",
          reward: "34 🧧",
          img: macduck,
        },
        {
          name: "Дублер Тома Круза",
          goal: "Ціль: виконайте 40досягнень і отримайте аватар з індиками.",
          reward: "40 🧧",
          isBlue: true,
          img: impossible,
        },
        {
          name: "Імператор Ніцерон",
          goal: "Придбайте VIP, купіть набір або заходьте стільки днів поспіль, скільки я загадав...(десь до 39). Отрмайте аватар Ніцерона.",
          reward: "40 🧧",
          isBlue: true,
          img: niceron,
        },
      ],
    },
  ];
  return (
    <ModalOverlay isClosing={isClosing} onClick={handleClose}>
      <ModalContent isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Досягнення
        </h2>
        <ScrollContainer>
          {categories.map((cat, idx) => (
            <CategorySection key={idx}>
              <CategoryTitle $delay={`${0.2 + idx * 0.4}s`}>
                {cat.title}
              </CategoryTitle>
              {cat.items.map((item, i) => (
                <AchivmentItem
                  key={i}
                  isSpecial={item.isSpecial}
                  $index={idx * 10 + i}
                >
                  <AchivmentImagePlace src={item.img} alt={item.name} />
                  <div style={{ flexGrow: 1 }}>
                    <AchivmentName>{item.name}</AchivmentName>
                    <AchivmentGoal isBlue={item.isBlue}>
                      {item.goal}
                    </AchivmentGoal>
                  </div>
                  <RewardField>{item.reward}</RewardField>
                </AchivmentItem>
              ))}
            </CategorySection>
          ))}
        </ScrollContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AchivmentsModal;
