import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import hills from "../../photos/hero-header/fog.webp";
import logofix from "../../photos/hero-header/logo-fix.webp";
const slideIn = keyframes`
  0% { transform: translateY(100%) scale(0.9); opacity: 0; }
  100% { transform: translateY(0%) scale(1); opacity: 1; }
`;

const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.9); opacity: 0; }
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
  padding: 40px;
  border-radius: 20px;
  max-width: 700px;
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

const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  font-size: 34px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: rotate(90deg);
  }
`;

const AccordionWrapper = styled.div`
  margin-top: 20px;
`;

const AccordionItem = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  ${animatedStyle}
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  color: #111;

  &:hover {
    color: #8a2be2;
  }

  &::before {
    content: "";
    width: 4px;
    height: 20px;
    background: #8a2be2;
    margin-right: 12px;
    display: inline-block;
  }
`;

const QuestionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

const QuestionText = styled.div`
  flex: 1;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 5px;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 50px;
  justify-content: flex-end;

  &:hover {
    transform: scale(1.2);
  }
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Arrow = styled.span`
  font-size: 12px;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(90deg)")};
`;

const Answer = styled.div`
  max-height: ${(props) => (props.$isOpen ? "3000px" : "0")};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding-bottom: ${(props) => (props.$isOpen ? "15px" : "0")};
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  white-space: pre-line;
`;

const AnswerImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const AnswerContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const AcceptBtn = styled.button`
  margin-top: 30px;
  padding: 12px 40px;
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

const PointsCounter = styled.div`
  text-align: center;
  margin: 20px 0;
  font-weight: 700;
  font-size: 14px;
  color: #111;
  padding: 10px;
  background: rgba(138, 43, 226, 0.1);
  border-radius: 10px;
`;

const InfoModal = ({ onClose, isOpen }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [ratings, setRatings] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const MAX_POINTS = 15;
  const RED_HEART = 1;
  const GOLD_HEART = 2;

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400);
  }, [onClose]);

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
    let newRating;
    if (currentRating === points) {
      newRating = 0;
      setTotalPoints(totalPoints - currentRating);
    } else {
      const pointsNeeded = points - currentRating;
      if (totalPoints + pointsNeeded > MAX_POINTS) {
        alert(
          `❌ Лімітовано! Ви можете додати максимум ${MAX_POINTS} балів. Залишилось: ${MAX_POINTS - totalPoints}`,
        );
        return;
      }
      newRating = points;
      setTotalPoints(totalPoints - currentRating + points);
    }

    setRatings({ ...ratings, [index]: newRating });
  };
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
`,
      image: null,
    },
    {
      q: "Календар версій(Мінорні 1.0 - 1.5)",
      a: `1.1 - 11.09.2026
          1.2 - 03.11.2026
          1.3 - 01.01.2027
          1.4 - 08.03.2027
          1.5 - 29.05.2027
`,
      image: null,
    },
    {
      q: "Співпраця та поради. Можливсості сайту.",
      a: "Так! Я можу підказати через email, як отримати доступ до API сайтів та плагінів, які я використовую. А ось можливості сайту: Погода, музика, фан-арти, ШІ, системи: 🧧, 🏆.",
      image: null,
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
      q: "Я втратив акаунт. Чому?",
      a: "Ваші дані в безпеці, бо ми не зберігаємо їх постійно. Через очищення кешу браузера сесія може бути перервана.",
      image: null,
    },
    {
      q: "Про тематику та ностальгію",
      a: "Скоріше за все, мені нудно, тому спогади вставив: музику з Geometry Dash та Minecraft, бо мої друзі любили грати в ці ігри. А я в My Litle Universe. Індики, бо вони роблять мене щасливими. А Динофроз, бо я маю надію, що Malatko TV, повернеться і можливо покажуть, і я відкритий до ваших ідей!",
      image: require("../../photos/vip-images/vip-rooster.webp"),
    },
    {
      q: "Чому є реклама при переході на новину?",
      a: "Реклама допомагає отримувати прибуток, який е головною мотивацією розвивати проект далі для вас.",
      image: null,
    },
    {
      q: "Обмеження підписки на музику",
      a: "Ми поважаємо авторське право. Заробляти на чужих піснях — це неправильно.",
      image: null,
    },
    {
      q: "Навіщо реєстрація для погоди та арту?",
      a: "Це необхідно для ідентифікації підписників та впевненості, що контент використовується за призначенням.",
      image: null,
    },
    {
      q: "Чи буде після Стихії щось?",
      a: "Ви навіть не уявляєте мій задум! Час покаже, а ваша підтримка та мотивація збільшують шанси!",
      image: null,
    },
    {
      q: "Повний конспект Paint: усі можливості та як їх отримати",
      a: `🎨 ПАНЕЛЬ ІНСТРУМЕНТІВ (Класика + ШІ):
• Виділення: прямокутне, довільне, «Виділити все» та інверсія вибору.
• Видалення фону: (Win 11) автоматичне прибирання фону навколо об'єкта одним кліком.
• Шари (Layers): створення малюнка на різних рівнях (Ctrl+Shift+L), щоб елементи не злипалися.
• Ластик: стирання (лівий клік — у колір фону; правий клік — стирання лише обраного кольору).
• Заливка: зафарбовування замкнених областей (регулюється допуском у нових версіях).
• Піпетка: копіювання точного кольору з полотна.
• Лупа: масштабування (від 12.5% до 800%) для піксельної точності.
• Олівець: малювання тонких ліній (1 піксель).
• Пензлі: 9 текстур (пензель, каліграфічні пера, аерозоль, олія, пастель, маркер, олівець, акварель).
• Текст: додавання написів із вибором шрифту, розміру та форматування (жирний, курсив тощо).
• Фігури: 23 готові форми (лінії, криві, багатокутники, хмаринки, серця, блискавки).
• Cocreator: (ШІ) генерація зображень за текстовим описом (залежить від регіону та NPU).

🌈 РОБОТА З КОЛЬОРАМИ ТА ПОЛОТНОМ:
• Палітра: вибір Кольору 1 (основний) та Кольору 2 (фон/правий клік).
• Редактор кольорів: створення власних відтінків через палітру RGB, HEX-коди або повзунок яскравості.
• Прозорість: підтримка прозорого фону (PNG) та «Прозоре виділення» для накладання об'єктів.
• Зміна розміру: масштабування в пікселях або відсотках (Ctrl+W), збереження пропорцій.
• Поворот/Віддзеркалення: поворот на 90/180 градусів, віддзеркалення по вертикалі/горизонталі.

📐 ВИГЛЯД ТА ДОПОМІЖНІ ЗАСОБИ:
• Лінійки та Сітка: для точного позиціювання об'єктів (Ctrl+R, Ctrl+G).
• Рядок стану: відображення координат курсора та розміру виділеної області.
• Повноекранний режим: перегляд малюнка без панелей інструментів (F11).

⚙️ ЯК ОТРИМАТИ ВСІ ЦІ МОЖЛИВОСТІ:
1. Базовий набір: вбудований у будь-яку Windows (Пуск -> Paint).
2. Нові функції (Шари, ШІ, Прозорість): доступні лише в Windows 11.
3. Оновлення: відкрийте Microsoft Store -> Бібліотека -> Отримати оновлення -> Оновити "Microsoft Paint".
4. Paint 3D: окрема програма з Microsoft Store для роботи з об'ємними моделями.`,
      image: null,
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
  const sortedFaqData = [...faqData]
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
            marginBottom: "30px",
          }}
        >
          Останнє оновлення: 8 квітня 2026 року
        </p>

        <PointsCounter>
          💛 Використано балів: {totalPoints} / {MAX_POINTS}
        </PointsCounter>

        <AccordionWrapper>
          {sortedFaqData.map((item, displayIndex) => {
            const originalIndex = item.originalIndex;
            const rating = ratings[originalIndex] || 0;

            return (
              <AccordionItem key={originalIndex} $index={displayIndex + 1}>
                <Question onClick={() => toggleAccordion(originalIndex)}>
                  <QuestionContent>
                    <QuestionText>{item.q}</QuestionText>
                    <ArrowContainer>
                      <LikeButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(originalIndex, RED_HEART);
                        }}
                        title="1 бал"
                      >
                        {rating === RED_HEART ? "❤️" : "🤍"}
                      </LikeButton>
                      <LikeButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(originalIndex, GOLD_HEART);
                        }}
                        title="2 бали"
                      >
                        {rating === GOLD_HEART ? "💛" : "🤎"}
                      </LikeButton>
                      <Arrow $isOpen={activeIndex === originalIndex}>▼</Arrow>
                    </ArrowContainer>
                  </QuestionContent>
                </Question>
                <Answer $isOpen={activeIndex === originalIndex}>
                  <AnswerContent>
                    {item.image && (
                      <AnswerImage src={item.image} alt={item.q} />
                    )}
                    {item.a}
                  </AnswerContent>
                </Answer>
              </AccordionItem>
            );
          })}
        </AccordionWrapper>

        <div style={{ textAlign: "center" }}>
          <AcceptBtn $index={faqData.length + 2} onClick={handleClose}>
            Дякую, зрозуміло!
          </AcceptBtn>
        </div>
      </Content>
    </Overlay>
  );
};

export default InfoModal;
