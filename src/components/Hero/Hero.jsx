import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import localforage from "localforage";
import hills from "../../photos/hero-header/fog.webp";
import herotext from "../../photos/hero-header/herotext.webp";

import soloveyko from "../../photos/vip-images/vip-soloveyko.webp";
import harmony from "../../photos/vip-images/asium/asium.webp";
import horse from "../../photos/vip-images/horse/horse.webp";
import theorytwo from "../../photos/fan-art/theorytwo.webp";
import fingerdash from "../../photos/vip-images/dinofroz/fingerdash.webp";
import electrodynamix from "../../photos/vip-images/electrodynamix.webp";
//Desert
import desert from "../../photos/vip-images/desert/vip-desert.webp";
import deserttwo from "../../photos/vip-images/desert/deserttwo.webp";
import desertthree from "../../photos/vip-images/desert/desertthree.webp";
import desertfour from "../../photos/vip-images/desert/desertfour.webp";
import desertone from "../../photos/vip-images/desert/desertone.webp";
import mecha from "../../photos/vip-images/mechannic.webp";
// import christmas from "../../photos/vip-images/christmas.webp";
import clubstep from "../../photos/fan-art/clubstep.webp";
import turkeys from "../../photos/vip-images/turkeys/ultra-vip-turkeys.webp";
//Horses
import horsethree from "../../photos/vip-images/horse/horsethree.webp";
import horsetwo from "../../photos/vip-images/horse/horsetwo.webp";
import chess from "../../photos/vip-images/horse/chess.webp";
//Turkeys
import turkeytwo from "../../photos/vip-images/turkeys/turkeytwo.webp";
import turkeythree from "../../photos/vip-images/turkeys/turkeysthree.webp";
import turkeyfour from "../../photos/vip-images/turkeys/turkeysfour.webp";
import turkeyfive from "../../photos/vip-images/turkeys/turkeysfive.webp";
import turkeysix from "../../photos/vip-images/turkeys/turkeyssix.webp";
import turkeysone from "../../photos/vip-images/turkeys/turkeysone.webp";
import turkeyseven from "../../photos/vip-images/turkeys/turkeysseven.webp";
//Asium
import asiumnine from "../../photos/vip-images/asium/vip-forest.webp";
import asiumone from "../../photos/vip-images/asium/asiumone.webp";
import asiumtwo from "../../photos/vip-images/asium/asiuntwo.webp";
import asiumthree from "../../photos/vip-images/asium/asiumthree.webp";
import asiumfour from "../../photos/vip-images/asium/asiumfour.webp";
import asiumfive from "../../photos/vip-images/asium/asiumfive.webp";
import asiumsix from "../../photos/vip-images/asium/asiumsix.webp";
import asiumten from "../../photos/vip-images/asium/asiumeleven.webp";
import asiumeleven from "../../photos/vip-images/asium/asiumtwelve.webp";
import asiumseven from "../../photos/vip-images/asium/asiumseven.webp";
//Swamp
import swamptwo from "../../photos/vip-images/swamp/swamptwo.webp";
import swampthree from "../../photos/vip-images/swamp/swampthree.webp";
import swampfour from "../../photos/vip-images/swamp/swampfour.webp";
import swampfive from "../../photos/vip-images/swamp/swampfive.webp";
import swampsix from "../../photos/vip-images/swamp/swampsix.webp";
import swampseven from "../../photos/vip-images/swamp/seampseven.webp";
import swampeight from "../../photos/vip-images/swamp/swampeight.webp";
import swampnine from "../../photos/vip-images/swamp/swampnine.webp";
import theory from "../../photos/fan-art/theory.webp";
import deadlocked from "../../photos/vip-images/swamp/deadlocked.webp";
//Horror
import horrortwo from "../../photos/vip-images/horror/horrortwo.webp";
import horrorthree from "../../photos/vip-images/horror/horrorthree.webp";
import horrorfour from "../../photos/vip-images/horror/horrorfour.webp";
import horrorfive from "../../photos/vip-images/horror/horrorfive.webp";
import horror from "../../photos/vip-images/horror/horror.webp";
import horrorsix from "../../photos/vip-images/horror/horrorsix.webp";
import horrorseven from "../../photos/vip-images/horror/horrorseven.webp";
import horroreight from "../../photos/vip-images/horror/horroreight.webp";
//Динофроз
import dinofrozone from "../../photos/vip-images/dinofroz/vip-dinofroz.webp";
import dinofrozthree from "../../photos/vip-images/dinofroz/dinofrozthree.webp";
import dinofrozfour from "../../photos/vip-images/dinofroz/dinofrozfour.webp";
import dinofrozfive from "../../photos/vip-images/dinofroz/dinofrozfive.webp";
import dinofrozsix from "../../photos/vip-images/dinofroz/dinofrozsix.webp";
import dinofrozseven from "../../photos/vip-images/dinofroz/dinofrozseven.webp";
import dinofrozeight from "../../photos/vip-images/dinofroz/dinofrozeight.webp";
import dinofroztwo from "../../photos/vip-images/dinofroz/vip-dragons.webp";
import dinofroznine from "../../photos/vip-images/dinofroz/dinofroznine.webp";
import nicerone from "../../photos/vip-images/dinofroz/nicerone.webp";
//Mia and me
import mia from "../../photos/vip-images/mia/miaandme.webp";
import volcano from "../../photos/vip-images/fire.webp";
const DEFAULT_BGS = [
  // Основні / Головні
  { src: hills, name: "Туманний ліс", category: "Стихія" },
  { src: volcano, name: "Вулкан", category: "Стихія" },
  // Світ Динофроз та Дракони
  { src: dinofrozone, name: "Імператор Ніцерон", category: "Динофроз" },
  { src: dinofroztwo, name: "Генерал Влад (2 сезон)", category: "Динофроз" },
  { src: dinofrozthree, name: "Прев'ю мультфільму", category: "Динофроз" },
  { src: dinofrozfour, name: "Драгемон (2 сезон)", category: "Динофроз" },
  { src: dinofrozfive, name: "Мелтстон", category: "Динофроз" },
  { src: dinofrozsix, name: "Динофроз (Епізод)", category: "Динофроз" },
  { src: dinofrozseven, name: "Генерал Влад (1 сезон)", category: "Динофроз" },
  { src: dinofrozeight, name: "Генерал Трік (1 сезон)", category: "Динофроз" },
  { src: dinofroznine, name: "Погляд у Рокфроз", category: "Динофроз" },
  { src: fingerdash, name: "Замок Ніцерона", category: "Динофроз" },
  { src: nicerone, name: "Іще варіант", category: "Динофроз" },
  // Тварини та Істоти (Індики, Коні)
  { src: horse, name: "Кінь", category: "Тварини" },
  { src: horsetwo, name: "Армія козаків", category: "Тварини" },
  { src: horsethree, name: "Лицар", category: "Тварини" },
  { src: turkeys, name: "Індичка Кейт (VIP)", category: "Тварини" },
  { src: turkeysone, name: "Мале бундюче стадо", category: "Тварини" },
  { src: turkeytwo, name: "Малий, але впевнений", category: "Тварини" },
  { src: turkeythree, name: "Дивись мені в очі!", category: "Тварини" },
  { src: turkeyfour, name: "І знову про індиків", category: "Тварини" },
  { src: turkeyfive, name: "2 Індики", category: "Тварини" },
  { src: turkeysix, name: "Ми вже виросли!", category: "Тварини" },
  { src: turkeyseven, name: "Шукаю друга", category: "Тварини" },
  { src: soloveyko, name: "Соловейко", category: "Тварини" },
  // Природа та Локації (Пустеля, Болото, Азіум)
  { src: desert, name: "Загадки пустелі", category: "Локації" },
  { src: desertone, name: "Кораблі у пустелі", category: "Локації" },
  { src: deserttwo, name: "Пустельні міражі", category: "Локації" },
  { src: desertthree, name: "Какстуси", category: "Локації" },
  { src: desertfour, name: "Піраміда", category: "Локації" },
  { src: swampnine, name: "Озеро волі", category: "Локації" },
  { src: swamptwo, name: "Записка", category: "Локації" },
  { src: asiumten, name: "Зимовий ліс", category: "Локації" },
  { src: asiumeleven, name: "Водоспад", category: "Локації" },
  // Містичні та Казкові місця
  { src: asiumnine, name: "Казковий ліс", category: "Фентезі" },
  { src: asiumone, name: "Під водою", category: "Фентезі" },
  { src: asiumtwo, name: "Поле і сакури", category: "Фентезі" },
  { src: asiumthree, name: "Печера", category: "Фентезі" },
  { src: asiumfour, name: "Річка з лави", category: "Фентезі" },
  { src: asiumfive, name: "Спуск з гори", category: "Фентезі" },
  { src: asiumsix, name: "Скарбниця + Відсилки", category: "Фентезі" },
  { src: asiumseven, name: "Японський балкон", category: "Фентезі" },
  { src: harmony, name: "Японський храм", category: "Фентезі" },
  { src: mia, name: "Міа та я", category: "Фентезі" },
  // Хоррор та Болото (Темна тематика)
  { src: horror, name: "Бійцівська собака", category: "Хоррор" },
  { src: horrortwo, name: "Будинок Granny", category: "Хоррор" },
  { src: horrorthree, name: "Підвал", category: "Хоррор" },
  { src: horrorfour, name: "Город зла", category: "Хоррор" },
  { src: horrorfive, name: "Зіграймо!", category: "Хоррор" },
  { src: horrorsix, name: "Втеча", category: "Хоррор" },
  { src: horrorseven, name: "Далі невідомо...", category: "Хоррор" },
  { src: horroreight, name: "Втеча (фінал)", category: "Хоррор" },
  { src: swampfour, name: "Матка павуків", category: "Хоррор" },
  { src: swampfive, name: "Злі духи", category: "Хоррор" },
  { src: swampseven, name: "Туман, що дивиться", category: "Хоррор" },
  { src: swampeight, name: "Болотний дракон", category: "Хоррор" },
  { src: deadlocked, name: "Болото мук", category: "Хоррор" },
  // Ігри та Техно
  { src: theorytwo, name: "Чорна діра", category: "Аркада" },
  { src: electrodynamix, name: "Гроза", category: "Аркада" },
  { src: mecha, name: "Шестерні", category: "Аркада" },
  { src: clubstep, name: "Невідоме місце", category: "Аркада" },
  { src: theory, name: "Вогнище", category: "Аркада" },
  { src: chess, name: "Шахи", category: "Аркада" },
  { src: swampthree, name: "Підказка свічки", category: "Аркада" },
  { src: swampsix, name: "Печера кристалів", category: "Аркада" },
];
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;
const slideIn = keyframes`
  0% { transform: translateY(100%) scale(0.5); opacity: 0; }
  100% { transform: translateY(0%) scale(1); opacity: 1; }
`;
const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.5); opacity: 0; }
`;
const slideUpHero = keyframes`
  0% { transform: translateY(120px) scale(1.8); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
`;
const fadeInContent = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;
const HeroDiv = styled.div`
  position: relative;
  width: 100%;
  min-height: 712px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 65px;
  align-items: center;
  overflow: hidden;
  z-index: 1;
  @media (min-width: 768px) {
    gap: 25px;
    margin-bottom: 15px;
  }
  @media (min-width: 1200px) {
    gap: 30px;
    min-height: 643px;
    margin-bottom: 20px;
  }
  @media (min-width: 1920px) {
    min-height: 1080px;
    margin-bottom: 30px;
    gap: 96px;
  }
`;
const HeroDecors = styled.div`
  display: block;
  width: 170px;
  margin-top: 85px;
  height: 78px;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transform: translateY(120px) scale(1.8);
  animation: ${(props) =>
    props.$start
      ? css`
          ${slideUpHero} 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards
        `
      : "none"};
  @media (min-width: 768px) {
    width: 410px;
    height: 180px;
  }
  @media (min-width: 1200px) {
    width: 400px;
    height: 179px;
  }
  @media (min-width: 1920px) {
    width: 700px;
    height: 280px;
  }
`;
const DelayedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 70px;
  opacity: 0;
  animation: ${(props) =>
    props.$start
      ? css`
          ${fadeInContent} 1s ease-out forwards
        `
      : "none"};
  animation-delay: ${(props) => (props.$start ? "3s" : "0s")};
  @media (min-width: 768px) {
    gap: 25px;
  }
  @media (min-width: 1200px) {
    gap: 50px;
  }
  @media (min-width: 1920px) {
    gap: 80px;
  }
`;
const panAnimation = keyframes`
  0% { background-position-x: 0%; }
  50% { background-position-x: 100%; }
  100% { background-position-x: 0%; }
`;
const BgLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: ${(props) => props.$focalX}% ${(props) => props.$focalY}%;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.$image || hills});
  opacity: ${(props) => (props.$active ? 1 : 0)};
  transition: opacity ${(props) => props.$transition}s ease-in-out;
  transform: scale(
      ${(props) => (props.$zoom || 1) * (props.$rotationScale || 1)}
    )
    rotate(${(props) => props.$rotation || 0}deg);
  transform-origin: ${(props) => props.$focalX}% ${(props) => props.$focalY}%;
  filter: blur(${(props) => props.$blur || 0}px);
  z-index: -2;
  animation: ${(props) =>
    props.$panEnabled && props.$zoom > 1
      ? css`
          ${panAnimation} ${props.$panSpeed || 6}s infinite linear
        `
      : "none"};
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, ${(props) => props.$opacity});
  z-index: -1;
  pointer-events: none;
`;
const HeroDecor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

const HeroFix = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 0;
    width: 550px;
  }
`;
const HeroFi = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center; 
`;
const HeroTextLink = styled.a`
  color: #fff;
  font-family: var(--font-family);
  font-size: 10px;
  font-weight: 500;
  text-decoration: none;
  display: block;
  text-align: center;
  width: auto;
  margin: 0;
  text-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    font-size: 10px;
    flex: 1;
    text-align: right;
    padding-right: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 18px;
    padding-right: 30px;
  }
  @media (min-width: 1920px) {
    font-size: 30px;
    padding-right: 50px;
  }
`;
const HeroDate = styled.div`
  color: #fff;
  font-size: 8px;
  text-align: center;
font-weight: 600;
  text-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(0, 0, 0, 0.5);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (min-width: 768px) {
    font-size: 10px;
    flex: 1;
    justify-content: center;
    padding-left: 0px;
    gap: 10px;
  }
  @media (min-width: 1200px) {
    font-size: 18px;
    padding-left: 30px;
    gap: 15px;
  }
  @media (min-width: 1920px) {
    font-size: 30px;
    padding-left: 50px;
    gap: 20px;
  }
`;

const rotateGear = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const TimezoneButton = styled.button`
  background: rgba(255, 179, 108, 0.2);
  border: 1px solid rgba(255, 179, 108, 0.5);
  color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  padding: 0;

  &:hover {
    background: rgba(255, 179, 108, 0.4);
    border-color: #ffb36c;
    transform: scale(1.1) rotate(360deg); /* Анімація обертання */
    animation: ${rotateGear} 1s linear infinite; /* Застосовуємо анімацію */
  }

  @media (min-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }

  @media (min-width: 1200px) {
    width: 22px;
    height: 22px;
    font-size: 11px;
  }

  @media (min-width: 1920px) {
    width: 40px;
    height: 40px;
    font-size: 24px;
  }
`;

const TimezoneMenu = styled.div`
  position: absolute;
  bottom: -10px;
  right: 0;
  transform: translateY(100%);
  background: #1e1e1e;
  border: 1px solid #ffb36c;
  border-radius: 10px;
  padding: 10px;
  width: 250px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 2000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    width: 280px;
    padding: 15px;
  }

  @media (min-width: 1920px) {
    width: 350px;
    padding: 20px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 10px;
  }
`;

const TimezoneOption = styled.button`
  width: 100%;
  background: transparent;
  color: ${(props) => (props.$selected ? "#ffb36c" : "#fff")};
  border: 1px solid ${(props) => (props.$selected ? "#ffb36c" : "transparent")};
  border-radius: 5px;
  padding: 8px 10px;
  margin-bottom: 5px;
  cursor: pointer;
  text-align: left;
  font-size: 12px;
  transition: all 0.2s ease;
  font-weight: ${(props) => (props.$selected ? "bold" : "normal")};

  &:hover {
    background: rgba(255, 179, 108, 0.2);
    border-color: #ffb36c;
  }

  @media (min-width: 1920px) {
    font-size: 16px;
    padding: 12px 15px;
  }
`;
const DownloadAppsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5px;

  @media (min-width: 768px) {
    gap: 20px;
  }
`;

const DownloadAppButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 179, 108, 0.5);
  border-radius: 20px;
  color: #fff;
  text-decoration: none;
  font-size: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 179, 108, 0.2);
    transform: translateY(-2px);
    border-color: #ffb36c;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 99;
`;

const SearchModeToggle = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  justify-content: center;

  @media (min-width: 768px) {
    gap: 15px;
    margin-bottom: 20px;
  }

  @media (min-width: 1920px) {
    gap: 20px;
    margin-bottom: 30px;
  }
`;

const ModeButton = styled.button`
  padding: 8px 16px;
  background: ${(props) =>
    props.$active ? "#ffb36c" : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.$active ? "#000" : "#fff")};
  border: 2px solid
    ${(props) => (props.$active ? "#ffb36c" : "rgba(255, 179, 108, 0.5)")};
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-family: var(--font-family);
  font-size: 12px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: ${(props) =>
      props.$active ? "#ffb36c" : "rgba(255, 179, 108, 0.2)"};
    border-color: #ffb36c;
  }

  @media (min-width: 768px) {
    font-size: 14px;
    padding: 10px 20px;
  }

  @media (min-width: 1920px) {
    font-size: 20px;
    padding: 15px 30px;
  }
`;

const CoordinatesContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 15px;

  @media (min-width: 1920px) {
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const CoordinateInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;

  label {
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    text-align: center;

    @media (min-width: 1920px) {
      font-size: 18px;
    }
  }

  input {
    width: 100px;
    height: 20px;
    padding: 5px 10px;
    font-size: 10px;
    border-radius: 8px;
    border: 1px solid #ffb36c;
    background: #d9d9d9;
    color: #222;
    font-weight: 500;

    @media (min-width: 768px) {
      width: 120px;
      height: 25px;
      font-size: 12px;
    }

    @media (min-width: 1920px) {
      width: 200px;
      height: 50px;
      font-size: 18px;
      padding: 10px 15px;
    }

    &::placeholder {
      color: #888;
    }
  }
`;

const SortButtonsRow = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 179, 108, 0.3);
`;

const SortBtn = styled.button`
  background: ${(props) => (props.$active ? "#ffb36c" : "rgba(255, 179, 108, 0.1)")};
  color: ${(props) => (props.$active ? "#000" : "#fff")};
  border: 1px solid #ffb36c;
  border-radius: 4px;
  padding: 4px 6px;
  font-size: 9px;
  cursor: pointer;
  flex: 1;
  font-weight: bold;
  transition: all 0.2s;
  &:hover {
    background: ${(props) => (props.$active ? "#ffb36c" : "rgba(255, 179, 108, 0.3)")};
  }
`;

const HeroFormater = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const HeroInput = styled.input`
  width: 173px;
  height: 20px;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 9px;
  color: #222;
  padding-left: 30px;
  background: #d9d9d9;
  border-radius: 10px 0 0 10px;
  border: none;
  outline: none;
  @media (min-width: 768px) {
    width: 402px;
    height: 25px;
    font-size: 14px;
  }
  @media (min-width: 1200px) {
    width: 629px;
    height: 42px;
  }
  @media (min-width: 1920px) {
    width: 1000px;
    height: 90px;
    font-size: 32px;
    padding-left: 60px;
    border-radius: 20px 0 0 20px;
  }
`;
const HeroButton = styled.button`
  position: relative;
  border-radius: 0 10px 10px 0;
  width: 20px;
  height: 22px;
  background: ${(props) => (props.disabled ? "#ccc" : "yellow")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: 2px solid black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  line-height: 1;
  font-size: 20px;
  color: black;
  transition: all 0.7s ease-in-out;
  overflow: hidden;
  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "skyblue")};
    color: ${(props) => (props.disabled ? "black" : "transparent")};
  }
  ${(props) =>
    !props.disabled &&
    css`
      &:hover::after {
        content: "+";
        position: absolute;
        color: black;
        font-size: 22px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}

  @media (min-width: 768px) {
    width: 28px;
    height: 26px;
    font-size: 22px;
    &:hover::after {
      font-size: 24px;
    }
  }
  @media (min-width: 1200px) {
    width: 40px;
    height: 43px;
    font-size: 30px;
    &:hover::after {
      font-size: 34px;
    }
  }
  @media (min-width: 1920px) {
    width: 95px;
    height: 94px;
    border-radius: 0 20px 20px 0;
    border-width: 4px;
    font-size: 60px;
    &:hover::after {
      font-size: 70px;
    }
  }
`;
const SuggestionsList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: calc(100% - 2px);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 0 0 15px 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: skyblue;
    border-radius: 10px;
  }
  @media (min-width: 1920px) {
    padding: 20px;
    gap: 15px;
    max-height: 500px;
  }
`;

const SuggestionItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 10px 15px;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  color: #333;
  &:hover {
    background: skyblue;
    color: white;
    transform: translateX(5px);
  }
  @media (min-width: 1920px) {
    font-size: 26px;
    padding: 20px 30px;
    border-radius: 15px;
  }
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${(props) => (props.disabled ? "#eee" : "gold")};
  color: ${(props) => (props.disabled ? "#999" : "black")};
  border: 2px solid ${(props) => (props.disabled ? "#ccc" : "#b8860b")};
  border-radius: 8px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  margin-top: 5px;
  font-size: 13px;
  &:hover {
    background: ${(props) => (props.disabled ? "#eee" : "#ffcc00")};
  }
  @media (min-width: 1920px) {
    font-size: 24px;
    padding: 25px;
    border-width: 4px;
  }
`;

const ChangeBgButton = styled.button`
  position: absolute;
  top: 60px;
  right: 10px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 179, 108, 0.5);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: all 0.3s;
  font-size: 18px;
  backdrop-filter: blur(5px);
  &:hover {
    background: #ffb36c;
    color: black;
    transform: scale(1.1);
  }
  @media (min-width: 720px) {
    width: 42px;
    height: 42px;
    font-size: 20px;
      right: 20px;
    top: 60px;
  }
  @media (min-width: 1920px) {
    width: 85px;
          right: 60px;
    height: 85px;
    font-size: 50px;
    top: 136px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: ${(props) => (props.$isClosing ? fadeOut : fadeIn)} 0.3s ease-out
    forwards;
`;

const ModalContent = styled.div`
  background: #1e1e1e;
  padding: 20px;
  border-radius: 20px;
  width: 95%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid #ffb36c;
  color: white;
  position: relative;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.4s
    cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

  @media (min-width: 768px) {
    padding: 30px;
    width: 90%;
    gap: 20px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 10px;
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  z-index: 10;
  &:hover {
    background: red;
  }
`;

const EditBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 35px;
  background: rgba(255, 179, 108, 0.8);
  color: black;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  z-index: 10;
  &:hover {
    background: #ffb36c;
  }
`;

const NameOverlay = styled.div`
  position: absolute;
  bottom: ${(props) => (props.$hasSlots ? "25px" : "0")};
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 10px;
  padding: 4px;
  text-align: center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 8;
`;
const ConfigRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 12px;
  label {
    font-size: 14px;
    font-weight: bold;
    color: #ffb36c;
  }
`;

const ModalConfigGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  align-items: end;
  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FocusButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const BgGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 15px;
  }
`;

const BgItem = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid ${(props) => (props.$active ? "#ffb36c" : "transparent")};
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
    ${NameOverlay} {
      opacity: 1;
    }
  }
`;

const BgSquare = styled.img`
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  cursor: pointer;
`;

const RatingOverlay = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  display: flex;
  gap: 4px;
  z-index: 5;
`;

const HeartIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  color: ${(props) => props.$color || "white"};
  text-shadow: 0 0 3px black;
`;

const SlotButtons = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  background: rgba(0, 0, 0, 0.6);
`;

const SlotBtn = styled.button`
  flex: 1;
  background: ${(props) => (props.$active ? "#ffb36c" : "transparent")};
  color: ${(props) => (props.$active ? "black" : "white")};
  border: none;
  padding: 4px;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
`;

const DropZone = styled.div`
  border: 2px dashed #ffb36c;
  padding: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  color: #ccc;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

const CloseBtn = styled.button`
  background: #ffb36c;
  border: none;
  padding: 10px 30px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  align-self: center;
`;

const ModalSearchInput = styled.input`
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid #ffb36c;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  width: 100%;
  max-width: 300px;
  font-size: 14px;
  outline: none;
  &::placeholder {
    color: #aaa;
  }
  &:focus {
    background: rgba(255, 255, 255, 0.15);
    border-color: white;
  }
`;

const ModalDivider = styled.hr`
  border: 0;
  border-top: 1px solid rgba(255, 179, 108, 0.3);
  margin: 10px 0;
  width: 100%;
`;

const ModalSectionTitle = styled.h3`
  font-weight: bold;
  color: #ffb36c;
  margin: 15px 0 10px 0;
  text-transform: uppercase;
  font-size: 14px;
  border-left: 3px solid #ffb36c;
  padding-left: 10px;
`;

const TIMEZONES = [
  { label: "UTC (Всесвітній час)", value: "UTC" },
  { label: "GMT (Лондон, Дублін)", value: "Europe/London" },
  { label: "UTC+1 (Берлін, Париж, Рим, Варшава)", value: "Europe/Berlin" },
  { label: "UTC+2 (Київ, Хельсінкі, Каїр, Бухарест)", value: "Europe/Kyiv" },
  { label: "UTC+3 (Стамбул, Ер-Ріяд, Найробі)", value: "Europe/Istanbul" },
  { label: "UTC+4 (Дубай, Баку, Тбілісі)", value: "Asia/Dubai" },
  { label: "UTC+5 (Ісламабад, Ташкент, Мальдіви)", value: "Asia/Karachi" },
  { label: "UTC+6 (Астана, Дакка, Алмати)", value: "Asia/Almaty" },
  { label: "UTC+7 (Бангкок, Джакарта, Ханой)", value: "Asia/Bangkok" },
  { label: "UTC+8 (Пекін, Сінгапур, Перт)", value: "Asia/Shanghai" },
  { label: "UTC+9 (Токіо, Сеул, Іркутськ)", value: "Asia/Tokyo" },
  { label: "UTC+10 (Сідней, Мельбурн, Порт-Морсбі)", value: "Australia/Sydney" },
  { label: "UTC+11 (Номеа, Соломонові Острови)", value: "Pacific/Noumea" },
  { label: "UTC+12 (Окленд, Фіджі)", value: "Pacific/Auckland" },
  { label: "UTC-1 (Азорські острови, Кабо-Верде)", value: "Atlantic/Azores" },
  { label: "UTC-2 (Південна Джорджія)", value: "Atlantic/South_Georgia" },
  { label: "UTC-3 (Буенос-Айрес, Бразиліа, Гренландія)", value: "America/Argentina/Buenos_Aires" },
  { label: "UTC-4 (Сантьяго, Галіфакс, Каракас)", value: "America/Santiago" },
  { label: "UTC-5 (Нью-Йорк, Торонто, Богота)", value: "America/New_York" },
  { label: "UTC-6 (Чикаго, Мехіко, Вінніпег)", value: "America/Chicago" },
  { label: "UTC-7 (Денвер, Едмонтон, Калгарі)", value: "America/Denver" },
  { label: "UTC-8 (Лос-Анджелес, Ванкувер, Сан-Франциско)", value: "America/Los_Angeles" },
  { label: "UTC-9 (Аляска, Анкоридж)", value: "America/Anchorage" },
  { label: "UTC-10 (Гаваї, Гонолулу)", value: "Pacific/Honolulu" },
  { label: "UTC-11 (Паго-Паго, Алофі)", value: "Pacific/Pago_Pago" },
  { label: "UTC-12 (Острів Бейкер, Острів Гоуленд)", value: "Etc/GMT+12" },
  { label: "EST (Північна Америка: Східний час)", value: "America/New_York" },
  { label: "CST (Північна Америка: Центральний час)", value: "America/Chicago" },
  { label: "MST (Північна Америка: Гірський час)", value: "America/Denver" },
  { label: "PST (Північна Америка: Тихоокеанський час)", value: "America/Los_Angeles" },
  { label: "CET (Центральна Європа: Прага, Мадрид)", value: "Europe/Berlin" },
  { label: "EET (Східна Європа: Софія, Таллінн)", value: "Europe/Kyiv" },
  { label: "IST (Індія, Нью-Делі)", value: "Asia/Kolkata" },
  { label: "JST (Японія, Токіо)", value: "Asia/Tokyo" },
  { label: "AEST (Східна Австралія, Брісбен)", value: "Australia/Brisbane" },
  { label: "Інший (ввести вручну)", value: "custom_input" },
];

const Hero = ({
  heroDateString,
  onAddCity,
  startAnimation,
  user,
  checkWeatherDanger,
  heroBg,
  setHeroBg,
  heroBg2,
  setHeroBg2,
  heroBg3,
  setHeroBg3,
  heroBg4,
  setHeroBg4,
  customHeroBgs = [],
  setCustomHeroBgs,
  heroBgMode,
  setHeroBgMode,
  heroOverlayOpacity,
  setHeroOverlayOpacity,
  bgRatings,
  setBgRatings,
  slideshowInterval,
  setSlideshowInterval,
  slideshowTransition,
  setSlideshowTransition,
  filterCategory,
  setFilterCategory,
  heroBgZoom,
  setHeroBgZoom,
  heroBgRotation,
  setHeroBgRotation,
  heroBgBlur,
  setHeroBgBlur,
  heroBgFocal1,
  setHeroBgFocal1,
  heroBgFocal2,
  setHeroBgFocal2,
  heroBgFocal3,
  setHeroBgFocal3,
  heroBgFocal4,
  setHeroBgFocal4,
  heroBgPanEnabled,
  setHeroBgPanEnabled,
  heroBgPanSpeed,
  setHeroBgPanSpeed,
  screenshots = [],
  selectedTimezone,
  setSelectedTimezone,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [limit, setLimit] = useState(5);
  const [showList, setShowList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleBgCount, setVisibleBgCount] = useState(30);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showTimezoneMenu, setShowTimezoneMenu] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchMode, setSearchMode] = useState("city");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [sortType, setSortType] = useState("rating"); 
  const [activeLayer, setActiveLayer] = useState(1);
  const rotationScale = 1; 
  const [tzSortMode, setTzSortMode] = useState("default");
  const [randomBgsList, setRandomBgsList] = useState([]);
  const [showCustomInput, setShowCustomInput] = useState(false); 
  const [customTimezoneInputValue, setCustomTimezoneInputValue] = useState(""); 
  
  // Определяем allBgs до использования в useEffect
  const isCustom = (src) => !DEFAULT_BGS.some((bg) => bg.src === src);
  const allBgs = useMemo(() => [
    ...DEFAULT_BGS,
    ...(customHeroBgs || []),
    ...(screenshots || []).map((s) => ({
      src: s.image,
      name: `Скріншот: ${s.trackName}`,
      category: "Скріншоти",
    })),
  ], [customHeroBgs, screenshots]);
  
  const getTzTimeInfo = useCallback((tzValue) => {
    if (!tzValue || tzValue === "custom_input") return null;
    try {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat("uk", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: tzValue,
      });
      const timeStr = fmt.format(now);
      const hour = parseInt(timeStr.split(":")[0]);
      const isDay = hour >= 6 && hour < 20;
      return { timeStr, isDay };
    } catch (e) {
      return null;
    }
  }, []);

  const getNumericOffset = useCallback((tzValue) => {
    if (tzValue === "UTC") return 0;
    if (tzValue === "custom_input") return 999;
    try {
      const date = new Date();
      const tzString = date.toLocaleString("en-US", { timeZone: tzValue });
      const localDate = new Date(tzString);
      const utcString = date.toLocaleString("en-US", { timeZone: "UTC" });
      const utcDate = new Date(utcString);
      return (localDate - utcDate) / (1000 * 60);
    } catch (e) {
      return 0;
    }
  }, []);

  const sortedTimezones = useMemo(() => {
    let list = [...TIMEZONES];
    if (tzSortMode === "alpha") {
      list.sort((a, b) => a.label.localeCompare(b.label));
    } else if (tzSortMode === "offset") {
      list.sort((a, b) => getNumericOffset(a.value) - getNumericOffset(b.value));
    }
    return list;
  }, [tzSortMode, getNumericOffset]);
  useEffect(() => {
    if (heroBgMode === "slideshow-2" && heroBg && heroBg2) {
      setActiveLayer(1);
      const timer = setInterval(() => {
        setActiveLayer((prev) => (prev === 1 ? 2 : 1));
      }, slideshowInterval * 1000);
      return () => clearInterval(timer);
    } else if (heroBgMode === "slideshow-3" && heroBg && heroBg2 && heroBg3) {
      setActiveLayer(1);
      const timer = setInterval(() => {
        setActiveLayer((prev) => (prev === 3 ? 1 : prev + 1));
      }, slideshowInterval * 1000);
      return () => clearInterval(timer);
    } else if (heroBgMode === "slideshow-4" && heroBg && heroBg2 && heroBg3 && heroBg4) {
      setActiveLayer(1);
      const timer = setInterval(() => {
        setActiveLayer((prev) => (prev === 4 ? 1 : prev + 1));
      }, slideshowInterval * 1000);
      return () => clearInterval(timer);
    } else if (heroBgMode === "random") {
      // Ініціалізуємо рандом список при першому запуску
      if (randomBgsList.length === 0 && allBgs.length > 0) {
        const shuffled = [...allBgs].sort(() => Math.random() - 0.5);
        setRandomBgsList(shuffled);
        if (shuffled[0]) {
          setHeroBg(shuffled[0].src);
        }
        return;
      }
      
      // Чергове циклювання через перемішаний список
      if (randomBgsList.length > 0) {
        let currentIndex = 0;
        const timer = setInterval(() => {
          currentIndex = (currentIndex + 1) % randomBgsList.length;
          setHeroBg(randomBgsList[currentIndex].src);
        }, slideshowInterval * 1000);
        return () => clearInterval(timer);
      }
    }
  }, [heroBgMode, heroBg, heroBg2, allBgs, heroBg3, setHeroBg, heroBg4, slideshowInterval, randomBgsList, customHeroBgs, screenshots]);
  useEffect(() => {
    const isPredefined = TIMEZONES.some(tz => tz.value === selectedTimezone);
    if (!isPredefined) {
      setCustomTimezoneInputValue(selectedTimezone);
      setShowCustomInput(true);
    } else {
      setCustomTimezoneInputValue("");
      setShowCustomInput(false);
    }
  }, [selectedTimezone]);
  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 350);
  };
  const timezoneMenuRef = useRef(null);

  const filteredBgs = (allBgs || []).filter((bg) => {
    const matchesCategory =
      filterCategory === "all" ||
      (filterCategory === "custom"
        ? isCustom(bg.src)
        : bg.category === filterCategory);
    const matchesSearch = (bg.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedBgs = [...filteredBgs].sort((a, b) => {
    if (sortType === "az") return a.name.localeCompare(b.name);
    if (sortType === "za") return b.name.localeCompare(a.name);

    const rA = bgRatings[a.src] || 0;
    const rB = bgRatings[b.src] || 0;
    if (rA !== rB) return rB - rA;
    return a.name.localeCompare(b.name);
  });
  const pagedBgs = sortedBgs.slice(0, visibleBgCount);
  const resetBgSettings = () => {
    setHeroOverlayOpacity(0.3);
    setHeroBgZoom(1);
    setHeroBgRotation(0);
    setHeroBgBlur(0);
    setHeroBgFocal1({ x: 50, y: 50 });
    setHeroBgFocal2({ x: 50, y: 50 });
    setHeroBgPanEnabled(false);
    setHeroBgPanSpeed(6);
  };

  const handleRate = (src) => {
    setBgRatings((prev) => {
      const current = prev[src] || 0;
      const next = (current + 1) % 3; // 0 -> 1 -> 2 -> 0
      return { ...prev, [src]: next };
    });
  };

  const fileInputRef = useRef(null);

  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      // "Штука" для зменшення якості (Canvas resize)
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/jpeg", 0.7);
        setCustomHeroBgs((prev) => [
          { src: compressed, name: file.name },
          ...prev,
        ]);
        setHeroBg(compressed);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const [coordinateSuggestions, setCoordinateSuggestions] = useState([]);
  const [showCoordinateSuggestions, setShowCoordinateSuggestions] =
    useState(false);
  const [cooldown, setCooldown] = useState(() => {
    const saved = localStorage.getItem("hero_cooldown_until");
    if (saved) {
      const until = parseInt(saved, 10);
      const now = Date.now();
      return until > now ? Math.ceil((until - now) / 1000) : 0;
    }
    return 0;
  });
  const searchRef = useRef(null);
  const API_KEY = "5104647d3e574f4a3f23c0aa092eb2b9";

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Не закривати при правому кліку або скролі по скролбару
      if (event.type === "mousedown" && event.button !== 0) return;
      // Якщо клік був по скролбару (event.target === document.body або html), не закривати
      if (
        event.type === "mousedown" &&
        (event.target === document.body ||
          event.target === document.documentElement)
      )
        return;
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (currentLimit, value) => {
    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=${currentLimit}&appid=${API_KEY}`,
      );
      const data = await response.json();
      if (data.length < currentLimit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setSuggestions(data);
      setShowList(true);
    } catch (error) {
      console.error("Помилка API:", error);
    }
  };

  useEffect(() => {
    setLimit(5);
    setHasMore(true);
    const timeoutId = setTimeout(() => {
      if (inputValue) fetchSuggestions(5, inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newLimit = limit + 5;
    setLimit(newLimit);
    fetchSuggestions(newLimit, inputValue);
  };

  useEffect(() => {
    let interval;
    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            localStorage.removeItem("hero_cooldown_until");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleSelectByCoordinates = async () => {
    if (cooldown > 0) return;

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      alert("Будь ласка, введіть правильні координати");
      return;
    }

    if (lat < -90 || lat > 90) {
      alert("Широта має бути від -90 до 90");
      return;
    }

    if (lon < -180 || lon > 180) {
      alert("Довгота має бути від -180 до +180");
      return;
    }

    try {
      // Обернене геокодування - отримуємо назву місця за координатами
      // limit=10 щоб отримати варіанти поруч, якщо точних немає
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=${API_KEY}`,
      );
      const data = await response.json();
      const currentPoint = {
        name: "Обрана точка",
        state: `Широта: ${lat}`,
        country: `Довгота: ${lon}`,
        lat: lat,
        lon: lon,
        isManual: true,
      };
      setCoordinateSuggestions([currentPoint, ...data]);
      setShowCoordinateSuggestions(true);
    } catch (error) {
      console.error("Помилка при пошуку за координатами:", error);
      alert("Помилка при пошуку. Спробуйте ще раз.");
    }
  };

  const handleSelectCoordinateResult = (city) => {
    if (cooldown > 0) return;

    const cityObj = {
      name: city.name,
      fullName: `${city.name}${city.state ? `, ${city.state}` : ""} (${city.country})`,
      lat: city.lat,
      lon: city.lon,
    };
    onAddCity(cityObj);
    setLatitude("");
    setLongitude("");
    setShowCoordinateSuggestions(false);
    setCoordinateSuggestions([]);
    const until = Date.now() + 40000;
    localStorage.setItem("hero_cooldown_until", until.toString());
    setCooldown(40);
  };

  const handleSelect = (city) => {
    if (cooldown > 0) return;

    const cityObj = {
      name: city.name,
      fullName: `${city.name}${city.state ? `, ${city.state}` : ""} (${city.country})`,
      lat: city.lat,
      lon: city.lon,
    };
    onAddCity(cityObj);
    setInputValue("");
    setSuggestions([]);
    setShowList(false);
    const until = Date.now() + 40000;
    localStorage.setItem("hero_cooldown_until", until.toString());
    setCooldown(40);
  };

  return (
    <HeroDiv>
      <BgLayer
        $image={heroBg}
        $active={heroBgMode === "static" || activeLayer === 1}
        $transition={slideshowTransition}
        $zoom={heroBgZoom}
        $rotation={heroBgRotation}
        $rotationScale={rotationScale}
        $blur={heroBgBlur}
        $focalX={heroBgFocal1?.x || 50}
        $focalY={heroBgFocal1?.y || 50}
        $panEnabled={heroBgPanEnabled && heroBgZoom > 1}
        $panSpeed={heroBgPanSpeed}
      />
      <BgLayer
        $image={heroBg2}
        $active={(heroBgMode === "slideshow-2" || heroBgMode === "slideshow-3" || heroBgMode === "slideshow-4") && activeLayer === 2}
        $transition={slideshowTransition}
        $zoom={heroBgZoom}
        $rotation={heroBgRotation}
        $rotationScale={rotationScale}
        $blur={heroBgBlur}
        $focalX={heroBgFocal2?.x || 50}
        $focalY={heroBgFocal2?.y || 50}
        $panEnabled={heroBgPanEnabled && heroBgZoom > 1}
        $panSpeed={heroBgPanSpeed}
      />
      <BgLayer
        $image={heroBg3}
        $active={(heroBgMode === "slideshow-3" || heroBgMode === "slideshow-4") && activeLayer === 3}
        $transition={slideshowTransition}
        $zoom={heroBgZoom}
        $rotation={heroBgRotation}
        $rotationScale={rotationScale}
        $blur={heroBgBlur}
        $focalX={heroBgFocal3?.x || 50}
        $focalY={heroBgFocal3?.y || 50}
        $panEnabled={heroBgPanEnabled && heroBgZoom > 1}
        $panSpeed={heroBgPanSpeed}
      />
      <BgLayer
        $image={heroBg4}
        $active={heroBgMode === "slideshow-4" && activeLayer === 4}
        $transition={slideshowTransition}
        $zoom={heroBgZoom}
        $rotation={heroBgRotation}
        $rotationScale={rotationScale}
        $blur={heroBgBlur}
        $focalX={heroBgFocal4?.x || 50}
        $focalY={heroBgFocal4?.y || 50}
        $panEnabled={heroBgPanEnabled && heroBgZoom > 1}
        $panSpeed={heroBgPanSpeed}
      />
      <Overlay $opacity={heroOverlayOpacity} />

      <ChangeBgButton onClick={() => setIsModalOpen(true)} title="Змінити фон">
        🎨
      </ChangeBgButton>
      <HeroDecors $image={herotext} $start={startAnimation} />
      <DelayedContent $start={startAnimation}>
        <HeroDecor>
          <HeroFix>
            <HeroTextLink
              href="https://www.facebook.com/groups/33984901414490236/?notif_id=1770630384341499&notif_t=group_milestone&ref=notif"
              target="_blank"
            >
              Мій фейсбук канал
            </HeroTextLink>
            <HeroFi>
            <HeroDate ref={timezoneMenuRef}>
              {heroDateString}
              <TimezoneButton
                onClick={() => setShowTimezoneMenu(!showTimezoneMenu)}
                title="Змінити часовий пояс"
              >
                ⚙️
              </TimezoneButton>
              {showTimezoneMenu && (
                <TimezoneMenu>
                  <div style={{ marginBottom: "10px", fontWeight: "bold", color: "#ffb36c", fontSize: "12px" }}>
                    Часовий пояс
                  </div>
                  <SortButtonsRow>
                    <SortBtn $active={tzSortMode === "default"} onClick={() => setTzSortMode("default")}>По ум.</SortBtn>
                    <SortBtn $active={tzSortMode === "alpha"} onClick={() => setTzSortMode("alpha")}>А-Я</SortBtn>
                    <SortBtn $active={tzSortMode === "offset"} onClick={() => setTzSortMode("offset")}>UTC +/-</SortBtn>
                  </SortButtonsRow>
                  {sortedTimezones.map((tz) => {
                    const isSelected = selectedTimezone === tz.value || (tz.value === "custom_input" && showCustomInput);
                    const info = getTzTimeInfo(tz.value);
                    return (
                    <TimezoneOption
                      key={tz.value}
                      $selected={isSelected}
                      onClick={() => {
                        if (tz.value === "custom_input") {
                          setShowCustomInput(true);
                          const isCurrentPredefined = TIMEZONES.some(t => t.value === selectedTimezone);
                          if (!isCurrentPredefined) {
                            setCustomTimezoneInputValue(selectedTimezone);
                          } else {
                            setCustomTimezoneInputValue("");
                          }
                        } else {
                          setShowCustomInput(false);
                          setSelectedTimezone(tz.value); // Update the prop directly
                          localforage.setItem("selected_timezone", tz.value);
                        } // Menu will not close automatically here
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '8px' }}>
                        <span>{tz.label}</span>
                        {info && (
                          <span style={{ fontSize: '10px', opacity: 0.9, whiteSpace: 'nowrap' }}>
                            {info.isDay ? "☀️" : "🌙"} {info.timeStr}
                          </span>
                        )}
                      </div>
                    </TimezoneOption>
                  )})}
                  {showCustomInput && (
                    <div style={{ marginTop: "10px" }}>
                      <input
                        type="text"
                        value={customTimezoneInputValue}
                        onChange={(e) => setCustomTimezoneInputValue(e.target.value)}
                        placeholder="Наприклад: Europe/Warsaw"
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "5px",
                          border: "1px solid #ffb36c",
                          background: "#333",
                          color: "#fff",
                          fontSize: "12px",
                          marginBottom: "5px",
                        }}
                      />
                      <button
                        onClick={() => {
                          if (customTimezoneInputValue.trim()) {
                            try {
                              Intl.DateTimeFormat("en", { timeZone: customTimezoneInputValue.trim() });
                              setSelectedTimezone(customTimezoneInputValue.trim()); // Update the prop
                              localforage.setItem("selected_timezone", customTimezoneInputValue.trim());
                              setShowTimezoneMenu(false);
                            } catch (e) {
                              alert("Невірний формат часового поясу. Спробуйте, наприклад, 'Europe/Kyiv' або 'America/New_York'.");
                            }
                          } else {
                            alert("Будь ласка, введіть часовий пояс.");
                          }
                        }}
                        style={{
                          width: "100%",
                          padding: "8px",
                          background: "#ffb36c",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "12px",
                          color: "#1e1e1e",
                        }}
                      >
                        Застосувати
                      </button>
                    </div>
                  )}
                </TimezoneMenu>
              )}
            </HeroDate>
            </HeroFi>
          </HeroFix>
        </HeroDecor>
        {user && (
          <DownloadAppsContainer>
            <DownloadAppButton
              href="/downloads/stykhiya-pc.exe"
              download="stykhiya-pc.exe"
              title="Завантажити для Windows"
            >
              💻 Скачати для ПК
            </DownloadAppButton>
            <DownloadAppButton
              href="/downloads/stykhiya-mobile.apk"
              download="stykhiya-mobile.apk"
              title="Завантажити для Android"
            >
              📱 Мобільний додаток
            </DownloadAppButton>
          </DownloadAppsContainer>
        )}

        <SearchWrapper ref={searchRef}>
          <SearchModeToggle>
            <ModeButton
              $active={searchMode === "city"}
              onClick={() => {
                setSearchMode("city");
                setLatitude("");
                setLongitude("");
                setSuggestions([]);
                setShowList(false);
              }}
            >
              🏙️ За назвою міста
            </ModeButton>
            <ModeButton
              $active={searchMode === "coordinates"}
              onClick={() => {
                setSearchMode("coordinates");
                setInputValue("");
                setSuggestions([]);
                setShowList(false);
              }}
            >
              📍 За координатами
            </ModeButton>
          </SearchModeToggle>

          {searchMode === "city" ? (
            <HeroFormater>
              <SearchContainer>
                <HeroInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowList(true)}
                  placeholder={
                    cooldown > 0
                      ? `Зачекайте ${cooldown}с`
                      : "Уведіть місто, село."
                  }
                  disabled={cooldown > 0}
                />
                {showList && suggestions.length > 0 && (
                  <SuggestionsList>
                    {suggestions.map((city, index) => (
                      <SuggestionItem
                        key={`${city.lat}-${city.lon}-${index}`}
                        onClick={() => handleSelect(city)}
                      >
                        📍 {city.name}
                        {city.state ? `, ${city.state}` : ""} ({city.country})
                        <br />
                        <span style={{ fontSize: "0.85em", color: "#666" }}>
                          🧭 {city.lat.toFixed(2)}°, {city.lon.toFixed(2)}°
                        </span>
                      </SuggestionItem>
                    ))}

                    {hasMore ? (
                      <LoadMoreButton onClick={handleLoadMore}>
                        ⬇ Завантажити ще варіанти
                      </LoadMoreButton>
                    ) : (
                      <LoadMoreButton disabled>Кінець списку</LoadMoreButton>
                    )}
                  </SuggestionsList>
                )}
                <HeroButton
                  onClick={() => {
                    if (cooldown === 0 && suggestions[0])
                      handleSelect(suggestions[0]);
                  }}
                  disabled={cooldown > 0}
                >
                  {cooldown > 0 ? cooldown : "⌕"}
                </HeroButton>
              </SearchContainer>
            </HeroFormater>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "15px",
                position: "relative",
              }}
            >
              <CoordinatesContainer>
                <CoordinateInput>
                  <label>
                    🧭 Широта (N/S)
                    <br />
                    -90 до +90
                  </label>
                  <input
                    type="number"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="55.75"
                    disabled={cooldown > 0}
                    min="-90"
                    max="90"
                    step="0.01"
                  />
                </CoordinateInput>
                <CoordinateInput>
                  <label>
                    📍 Довгота (E/W)
                    <br />
                    -180 до +180
                  </label>
                  <input
                    type="number"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="37.62"
                    disabled={cooldown > 0}
                    min="-180"
                    max="180"
                    step="0.01"
                  />
                </CoordinateInput>
                <HeroButton
                  onClick={handleSelectByCoordinates}
                  disabled={cooldown > 0}
                  style={{ marginBottom: "15px" }}
                >
                  {cooldown > 0 ? cooldown : "⌕"}
                </HeroButton>
              </CoordinatesContainer>

              {showCoordinateSuggestions && (
                <SuggestionsList
                  style={{
                    width: "auto",
                    minWidth: "300px",
                    marginTop: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div
                    style={{
                      color: "#333",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    📍 Знайдено поруч з координатами:
                  </div>
                  {coordinateSuggestions.map((city, index) => (
                    <SuggestionItem
                      key={`${city.lat}-${city.lon}-${index}`}
                      onClick={() => handleSelectCoordinateResult(city)}
                    >
                      📍 {city.name}
                      {city.state ? `, ${city.state}` : ""} ({city.country})
                      <br />
                      <span style={{ fontSize: "0.85em", color: "#666" }}>
                        🧭 {city.lat.toFixed(2)}°, {city.lon.toFixed(2)}°
                      </span>
                    </SuggestionItem>
                  ))}
                  <button
                    onClick={() => {
                      setShowCoordinateSuggestions(false);
                      setCoordinateSuggestions([]);
                    }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      background: "#f0f0f0",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginTop: "10px",
                      fontSize: "12px",
                    }}
                  >
                    ✕ Закрити
                  </button>
                </SuggestionsList>
              )}
            </div>
          )}
        </SearchWrapper>
      </DelayedContent>

      {isModalOpen && (
        <ModalOverlay $isClosing={isClosing} onClick={handleCloseModal}>
          <ModalContent
            $isClosing={isClosing}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#fff", textAlign: "center", margin: 0 }}>
              Налаштування фону
            </h2>

            <ModalSectionTitle>🎨 Налаштування вигляду</ModalSectionTitle>
            <ModalConfigGrid>
              <ConfigRow>
                <label>Режим фону:</label>
                <select
                  value={heroBgMode}
                  onChange={(e) => {
                    setHeroBgMode(e.target.value);
                    if (e.target.value === "random") {
                      setRandomBgsList([]);
                    }
                    setActiveLayer(1);
                  }}
                  style={{ padding: "8px", borderRadius: "5px" }}
                >
                  <option value="static">Статичний (1 фото)</option>
                  <option value="slideshow-2">Слайд-шоу (2 фото)</option>
                  <option value="slideshow-3">Слайд-шоу (3 фото)</option>
                  <option value="slideshow-4">Слайд-шоу (4 фото)</option>
                  <option value="random">🎲 Рандом (усі фото)</option>
                </select>
              </ConfigRow>
              <ConfigRow>
                <label>
                  Затемнення: {(heroOverlayOpacity * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={heroOverlayOpacity}
                  onChange={(e) =>
                    setHeroOverlayOpacity(parseFloat(e.target.value))
                  }
                />
              </ConfigRow>
              <ConfigRow>
                <label>Наближення: {heroBgZoom.toFixed(2)}x</label>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.01"
                  value={heroBgZoom}
                  onChange={(e) => setHeroBgZoom(parseFloat(e.target.value))}
                />
              </ConfigRow>
              <ConfigRow>
                <label>Розворот: {heroBgRotation}°</label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={heroBgRotation}
                  onChange={(e) => setHeroBgRotation(parseInt(e.target.value))}
                />
              </ConfigRow>
              <ConfigRow>
                <label>Розмиття: {heroBgBlur.toFixed(1)}px</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={heroBgBlur}
                  onChange={(e) => setHeroBgBlur(parseFloat(e.target.value))}
                />
              </ConfigRow>
            </ModalConfigGrid>

            <ModalDivider />
            <ModalSectionTitle>🎯 Фокус та ротація</ModalSectionTitle>
            {heroBgMode === "random" ? (
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => {
                    setRandomBgsList([]);
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#ffb36c",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  🎲 Перетасувати знову
                </button>
              </div>
            ) : heroBgMode === "slideshow-2" ? (
              <FocusButtonsGrid>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#ffb36c",
                      fontWeight: "bold",
                    }}
                  >
                    Слот 1
                  </span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => setHeroBgFocal1({ x: 50, y: 50 })}
                      style={{
                        flex: 1,
                        padding: "8px",
                        background: "#ffb36c",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      🎯 Центр фокусу
                    </button>
                    <button
                      onClick={() => setHeroBgRotation(0)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        background: "#ffb36c",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      ↻ Нулювати поворот
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#ffb36c",
                      fontWeight: "bold",
                    }}
                  >
                    Слот 2
                  </span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => setHeroBgFocal2({ x: 50, y: 50 })}
                      style={{
                        flex: 1,
                        padding: "8px",
                        background: "#ffb36c",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      🎯 Центр фокусу
                    </button>
                    <button
                      onClick={() => setHeroBgRotation(0)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        background: "#ffb36c",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      ↻ Нулювати поворот
                    </button>
                  </div>
                </div>
              </FocusButtonsGrid>
              ) : heroBgMode === "slideshow-3" ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  {[
                    { num: 1, focal: heroBgFocal1, setFocal: setHeroBgFocal1 },
                    { num: 2, focal: heroBgFocal2, setFocal: setHeroBgFocal2 },
                    { num: 3, focal: heroBgFocal3, setFocal: setHeroBgFocal3 },
                  ].map((slot) => (
                    <div
                      key={slot.num}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#ffb36c",
                          fontWeight: "bold",
                        }}
                      >
                        Слот {slot.num}
                      </span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => slot.setFocal({ x: 50, y: 50 })}
                          style={{
                            flex: 1,
                            padding: "8px",
                            background: "#ffb36c",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "12px",
                          }}
                        >
                          🎯 Центр
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
            ) : heroBgMode === "slideshow-4" ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                {[
                  { num: 1, focal: heroBgFocal1, setFocal: setHeroBgFocal1 },
                  { num: 2, focal: heroBgFocal2, setFocal: setHeroBgFocal2 },
                  { num: 3, focal: heroBgFocal3, setFocal: setHeroBgFocal3 },
                  { num: 4, focal: heroBgFocal4, setFocal: setHeroBgFocal4 },
                ].map((slot) => (
                  <div
                    key={slot.num}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#ffb36c",
                        fontWeight: "bold",
                      }}
                    >
                      Слот {slot.num}
                    </span>
                    <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
                      <button
                        onClick={() => slot.setFocal({ x: 50, y: 50 })}
                        style={{
                          flex: 1,
                          padding: "8px",
                          background: "#ffb36c",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        🎯 Центр фокусу
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setHeroBgFocal1({ x: 50, y: 50 })}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#ffb36c",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  🎯 Центр фокусу
                </button>
                <button
                  onClick={() => setHeroBgRotation(0)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#ffb36c",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ↻ Нулювати поворот
                </button>
              </div>
            )}

            <ModalDivider />
            <ModalSectionTitle>
              🎬 Анімація панінгу (при зумі)
            </ModalSectionTitle>
            <ModalConfigGrid>
              <ConfigRow>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="checkbox"
                    checked={heroBgPanEnabled}
                    onChange={(e) => setHeroBgPanEnabled(e.target.checked)}
                  />
                  Вмикач панінгу
                </label>
              </ConfigRow>
              <ConfigRow>
                <label>Швидкість: {heroBgPanSpeed}с</label>
                <input
                  type="range"
                  min="4"
                  max="8"
                  step="1"
                  value={heroBgPanSpeed}
                  onChange={(e) => setHeroBgPanSpeed(parseInt(e.target.value))}
                  disabled={!heroBgPanEnabled}
                />
              </ConfigRow>
            </ModalConfigGrid>

            <ModalDivider />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "15px",
              }}
            >
              <CloseBtn
                onClick={resetBgSettings}
                style={{ marginTop: "10px", width: "100%" }}
              >
                🔄 Скинути всі налаштування
              </CloseBtn>
            </div>

            {(heroBgMode === "slideshow-2" || heroBgMode === "slideshow-3" || heroBgMode === "slideshow-4" || heroBgMode === "random") && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <ModalDivider />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px",
                  }}
                >
                  <ConfigRow>
                    <label>Інтервал: {slideshowInterval}с</label>
                    <input
                      type="range"
                      min="4"
                      max="8"
                      step="1"
                      value={slideshowInterval}
                      onChange={(e) =>
                        setSlideshowInterval(parseInt(e.target.value))
                      }
                    />
                  </ConfigRow>
                  <ConfigRow>
                    <label>Перехід: {slideshowTransition}с</label>
                    <input
                      type="range"
                      min="0.5"
                      max="1"
                      step="0.1"
                      value={slideshowTransition}
                      onChange={(e) =>
                        setSlideshowTransition(parseFloat(e.target.value))
                      }
                    />
                  </ConfigRow>
                </div>
              </div>
            )}

            <ModalDivider />
            <ModalSectionTitle>🖼️ Бібліотека зображень</ModalSectionTitle>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <ModalSearchInput
                placeholder="Пошук картин за назвою..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleBgCount(30);
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <label style={{ fontSize: "12px" }}>Категорія:</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{
                      background: "#333",
                      color: "#fff",
                      border: "1px solid #555",
                      borderRadius: "4px",
                      padding: "2px 5px",
                    }}
                  >
                    <option value="all">Усі</option>
                    <option value="Динофроз">Динофроз</option>
                    <option value="Тварини">Тварини</option>
                    <option value="Стихія">Стихія</option>
                    <option value="Локації">Локації</option>
                    <option value="Фентезі">Фентезі</option>
                    <option value="Хоррор">Хоррор</option>
                    <option value="Аркада">Аркада</option>
                    <option value="Скріншоти">Скріншоти</option>
                    <option value="custom">Ваші завантажені</option>
                  </select>
                </div>
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <label style={{ fontSize: "12px" }}>Сортувати:</label>
                  <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    style={{
                      background: "#333",
                      color: "#fff",
                      border: "1px solid #555",
                      borderRadius: "4px",
                      padding: "2px 5px",
                    }}
                  >
                    <option value="rating">За рейтингом</option>
                    <option value="az">Назва А-Я</option>
                    <option value="za">Назва Я-А</option>
                  </select>
                </div>
              </div>
            </div>

            <BgGrid>
              {pagedBgs.map((bg, idx) => {
                const rating = bgRatings[bg.src] || 0;
                return (
                  <BgItem
                    key={idx}
                    $active={heroBg === bg.src || heroBg2 === bg.src}
                  >
                    <RatingOverlay>
                      <HeartIcon
                        $color={
                          rating === 2 ? "gold" : rating === 1 ? "red" : "white"
                        }
                        onClick={() => handleRate(bg.src)}
                      >
                        {rating === 2 ? "💛" : rating === 1 ? "❤️" : "🤍"}
                      </HeartIcon>
                    </RatingOverlay>
                    {isCustom(bg.src) && (
                      <>
                        <EditBtn
                          onClick={(e) => {
                            e.stopPropagation();
                            const newName = window.prompt(
                              "Введіть нову назву для цих шпалер:",
                              bg.name,
                            );
                            if (newName) {
                              setCustomHeroBgs((prev) =>
                                prev.map((b) =>
                                  b.src === bg.src
                                    ? { ...b, name: newName }
                                    : b,
                                ),
                              );
                            }
                          }}
                          title="Редагувати назву"
                        >
                          ✎
                        </EditBtn>
                        <DeleteBtn
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(`Видалити шпалери "${bg.name}"?`)
                            ) {
                              setCustomHeroBgs((prev) =>
                                prev.filter((b) => b.src !== bg.src),
                              );
                              // Видаляємо з рейтингів
                              setBgRatings((prev) => {
                                const newRatings = { ...prev };
                                delete newRatings[bg.src];
                                return newRatings;
                              });
                              if (heroBg === bg.src) setHeroBg(hills);
                              if (heroBg2 === bg.src) setHeroBg2(hills);
                            }
                          }}
                          title="Видалити"
                        >
                          ✕
                        </DeleteBtn>
                      </>
                    )}
                <NameOverlay $hasSlots={heroBgMode === "slideshow-2" || heroBgMode === "slideshow-3" || heroBgMode === "slideshow-4"}>
                      {bg.name}
                    </NameOverlay>
                    <BgSquare
                      src={bg.src}
                      loading="lazy"
                      onClick={() => setHeroBg(bg.src)}
                      title={bg.name}
                    />
                    {heroBgMode === "slideshow-2" && (
                      <SlotButtons>
                        <SlotBtn
                          $active={heroBg === bg.src}
                          onClick={() => setHeroBg(bg.src)}
                        >
                          Слот 1
                        </SlotBtn>
                        <SlotBtn
                          $active={heroBg2 === bg.src}
                          onClick={() => setHeroBg2(bg.src)}
                        >
                          Слот 2
                        </SlotBtn>
                      </SlotButtons>
                    )}
                    {heroBgMode === "slideshow-3" && (
                      <SlotButtons>
                        <SlotBtn
                          $active={heroBg === bg.src}
                          onClick={() => setHeroBg(bg.src)}
                        >
                          Слот 1
                        </SlotBtn>
                        <SlotBtn
                          $active={heroBg2 === bg.src}
                          onClick={() => setHeroBg2(bg.src)}
                        >
                          Слот 2
                        </SlotBtn>
                        <SlotBtn
                          $active={heroBg3 === bg.src}
                          onClick={() => setHeroBg3(bg.src)}
                        >
                          Слот 3
                        </SlotBtn>
                      </SlotButtons>
                    )}
                    {heroBgMode === "slideshow-4" && (
                      <SlotButtons>
                        <SlotBtn
                          $active={heroBg === bg.src}
                          onClick={() => setHeroBg(bg.src)}
                        >
                          Слот 1
                        </SlotBtn>
                        <SlotBtn
                          $active={heroBg2 === bg.src}
                          onClick={() => setHeroBg2(bg.src)}
                        >
                          Слот 2
                        </SlotBtn>
                        <SlotBtn
                          $active={heroBg3 === bg.src}
                          onClick={() => setHeroBg3(bg.src)}
                        >
                          Слот 3
                        </SlotBtn>
                        <SlotBtn
                          $active={heroBg4 === bg.src}
                          onClick={() => setHeroBg4(bg.src)}
                        >
                          Слот 4
                        </SlotBtn>
                      </SlotButtons>
                    )}
                  </BgItem>
                );
              })}
            </BgGrid>

            {sortedBgs.length > visibleBgCount && (
              <LoadMoreButton
                onClick={() => setVisibleBgCount((prev) => prev + 30)}
              >
                Завантажити ще
              </LoadMoreButton>
            )}

            <ModalDivider />
            <DropZone
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              📁 Перетягніть сюди картинку або натисніть для вибору
              <input
                type="file"
                ref={fileInputRef}
                hidden
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
            </DropZone>

            <CloseBtn onClick={handleCloseModal}>Закрити</CloseBtn>
          </ModalContent>
        </ModalOverlay>
      )}
    </HeroDiv>
  );
};
export default Hero;