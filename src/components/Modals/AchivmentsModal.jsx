import React from "react";
import styled, { keyframes } from "styled-components";
import horse from "../../photos/vip-images/horse.jpg";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  0% {
    transform: translateY(100%) scale(0.5);
    opacity: 0;
  }
  100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: #093500;
  color: #2eb813;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh; 
  border: 2px solid #2eb813;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
`;
const ScrollContainer = styled.div`
  overflow-y: auto;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  &::-webkit-scrollbar-thumb:hover {
    background: #a2ff6c;
  }

  /* Для Firefox */
  scrollbar-width: thin;
  scrollbar-color: #2eb813 #051a00;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #2eb813;
  line-height: 1;
  z-index: 10;
  &:hover {
    color: #a2ff6c;
  }
`;

const AchivmentsTitle = styled.h2`
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
  font-family: "Inter", sans-serif;
  letter-spacing: 2px;
  flex-shrink: 0;
`;

const AchivmentItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(162, 255, 108, 0.05);
  border-radius: 12px;
  padding: 12px;
  gap: 15px;
  border: 1px solid #a2ff6c;
  transition: transform 0.2s;

  &:hover {
    background: rgba(162, 255, 108, 0.1);
  }
`;

const AchivmentImagePlace = styled.img`
  width: 60px;
  height: 60px;
  background: rgb(123, 255, 83);
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid #2eb813;
`;

const AchivmentInfo = styled.div`
  flex-grow: 1;
`;

const AchivmentName = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #ffb36c;
`;

const AchivmentGoal = styled.p`
  margin: 5px 0 0;
  font-size: 12px;
  line-height: 1.4;
  opacity: 0.9;
  color: #a2ff6c;
`;

const RewardField = styled.div`
  width: 65px;
  height: 40px;
  background: rgba(46, 184, 19, 0.2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
  border: 1px dashed #ffb36c;
  color: #ffb36c;
`;

const AchivmentsModal = ({ onClose }) => {
  const achievements = [
    {
      name: "Спринтер",
      goal: "Ціль: пройти за 40с головоломку",
      reward: "20 🧧",
    },
        {
      name: "Давай!",
      goal: "Ціль: Почніть головоломку, залиште останній хід і не робіть його протягом 2 хвилин, а потім закінчіть.",
      reward: "20 🧧",
    },
    {
      name: "Бог любить трійцю!",
      goal: "Ціль: заходьте до нас після реєстрації 3 дні підряд",
      reward: "30 🧧",
    },
    {
      name: "Ерудит",
      goal: "Ціль: пройдіть головоломку за 25 ходів",
      reward: "20 🧧",
    },
        {
      name: "Помилка-це навчання",
      goal: "Ціль: пройдіть головоломку на 20 спробі, між перезапусками 20с!",
      reward: "20 🧧",
    },
    {
      name: "А я думав, що ти не повернешся.",
      goal: "Доступно: Після виконання досягнення 'Бог любить трійцю'. Ціль: заходьте 3 днів поспіль, а потім не заходьте 3 дні,а потім в ту саму хвилину зайдіть, коли ви були останнього разу.",
      reward: "40 🧧",
    },
        {
      name: "Він точно шпигун!",
      goal: "Зайдіть на сайт, коли в Києві (за часом на картці) температура нижче -30°C або вище +30°C.",
      reward: "30 🧧",
    },
    {
      name: "Конотопська відьма!",
      goal: "Зайдіть на сайт, опівночі, паралельно ввімкнуши на сайті саундхоррор 'жах ночі'",
      reward: "30 🧧",
    },
    {
      name: "Любитель ризиків",
      goal: "Ціль: пройдіть з І спроби головоломку (раз на добу)",
      reward: "30 🧧",
    },
    {
      name: "Колекціонер",
      goal: "Ціль: зберіть усі аватари(що отримуються з часом або конвертами)",
      reward: "50 🧧",
    },
    {
      name: "Нічна сова",
      goal: "Ціль: розв'яжіть головоломку між 00:00 та 03:00",
      reward: "30 🧧",
    },
    {
      name: "Спонсор",
      goal: "Ціль: підпишіться на мій фейсбук канал",
      reward: "40 🧧",
    },
    {
      name: "Хапай якір!",
      goal: "Ціль: вийдіть з акаунту і поверніться через логін",
      reward: "20 🧧",
    },
    {
      name: "Ви зараз виконуєте це afk :(?",
      goal: "Читайте угоду користувача 2хв!",
      reward: "20 🧧",
    },
    {
      name: "Дубль 2",
      goal: "Ціль: прослухайте двічі мелодію, через автоповтор.",
      reward: "20 🧧",
    },
    {
      name: "Краще перестрахуюсь!",
      goal: "Ціль: змініть пароль у нашому сайті",
      reward: "20 🧧",
    },
    {
      name: "Хм дай подумаю ні!",
      goal: "Ціль: зробіть 2етапну перевірку.",
      reward: "20 🧧",
    },
    {
      name: "Цикл",
      goal: "Ціль: натискайте на мелодії користуючись кодом: 8123. Порядок натискань переплутаний. Вірний порядок буде підсвічуватись.",
      reward: "40 🧧",
    },
    {
      name: "Можна взяти?",
      goal: "Ціль: Скачайте пісню.",
      reward: "20 🧧",
    },
    {
      name: "Ти не станеш у мене на шляху!",
      goal: "Ціль: Прискорте перезарядку кнопки конвертом(ами)",
      reward: "20 🧧",
    },
    {
      name: "Ви не з масонської організації?",
      goal: "Натисність дізнатися більше у погодній картці",
      reward: "20 🧧",
    },
    {
      name: "Дім, милий дім!",
      goal: "Ціль: Погодня картка - Конотоп.",
      reward: "20 🧧",
    },
        {
      name: "Тестувальник",
      goal: "Ціль: Випробуйте режим відео(музичні картки).",
      reward: "20 🧧",
    },
    {
      name: "Люблю текст!",
      goal: "Ціль: Натисність на кнопку текст пісні",
      reward: "20 🧧",
    },
    {
      name: "Фанат чи хейтер?",
      goal: "Ціль: Натисніть на кнопку роздрукувати фан-арт(але той якого немає в музичному списку).",
      reward: "20 🧧",
    },
    {
      name: "Індики винні!",
      goal: "Ціль: за 1хв змініть світлу-темну тему 25разів! Під музику індиків.",
      reward: "20 🧧",
    },  
    {
      name: "Це цікаво!",
      goal: "Ціль: знайдіть зайве на сайті, воно маленьке, у цьому досягненні уважні побачать підказку :).",
      reward: "20 🧧",
    },  
    {
      name: "Це незвично!",
      goal: "Ціль: пройдіть за 30хв одну й ту саму головоломку 3 рази поспіль.",
      reward: "20 🧧",
    },  
    {
      name: "Назад в минуле!",
      goal: "Ціль: пройдіть одну й ту саму головоломку 2 рази поспіль секунда в секунду!",
      reward: "40 🧧",
    },  
    {
      name: "Помножений на нуль!",
      goal: "Витратьте 200🧧 за 10хв",
      reward: "20 🧧",
    },  
    {
      name: "Він знає те чого не знаю я?",
      goal: "Зосередьте мишку у футері на лого на 2хв!",
      reward: "20 🧧",
    },  
        {
      name: "Скрудж МакДак",
      goal: "Ціль: Накопичте 500🧧!",
      reward: "40 🧧",
    },  
    {
      name: "Дракомбінація",
      goal: "Скомбінуйте 2 саундтреки про драконів",
      reward: "20 🧧",
    },
    {
      name: "Великий день!",
      goal: "Зайдіть на сайт, на важливе свято (старого/нового стилю).",
      reward: "40 🧧",
    },
    {
      name: "Дублер Тома Круза",
      goal: "Ціль: виконайте 30 досягнень.",
      reward: "40 🧧",
    },  
      {
      name: "Імператор Ніцерон",
      goal: "Придбайте набір конвертів або VIP-підписку. Або заходьте стільки днів поспіль, скільки я загадав! Підказка менше 32 днів точно :), можливо, не знаю, навряд або ні чекайте :). Удача любить терплячих.",
      reward: "40 🧧",
    },
  ];

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <AchivmentsTitle>Досягнення</AchivmentsTitle>

        <ScrollContainer>
          {achievements.map((item, index) => (
            <AchivmentItem key={index}>
              <AchivmentImagePlace src={horse} alt={item.name} />
              <AchivmentInfo>
                <AchivmentName>{item.name}</AchivmentName>
                <AchivmentGoal>{item.goal}</AchivmentGoal>
              </AchivmentInfo>
              <RewardField>{item.reward}</RewardField>
            </AchivmentItem>
          ))}
        </ScrollContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AchivmentsModal;
