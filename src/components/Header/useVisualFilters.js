import { useState, useEffect, useCallback } from "react";
import localforage from "localforage";

export const FILTERS = [
  { id: "none", label: "Вимкнено" },
  { id: "grayscale", label: "Дальтонізм" },
  { id: "sepia", label: "Сепія" },
  { id: "invert", label: "Негатив" },
  { id: "matrix", label: "Матриця" },
  { id: "uv", label: "УФ-Лампа" },
  { id: "contrast", label: "Контраст" },
  { id: "saturate", label: "Насиченість" },
  { id: "blur", label: "Розмиття" },
  { id: "hue", label: "Веселка" },
  { id: "chaos", label: "Хаос 🎲" },
  { id: "ultrachaos", label: "Ультрахаос 🌌" },
];

export const PRESETS = [
  { id: "cinema", label: "🎬 Кіно", config: { darkIntensity: 15, filterType: "sepia", filterIntensity: 20 } },
  { id: "night", label: "🌙 Ніч", config: { darkIntensity: 70, filterType: "none", filterIntensity: 50 } },
  { id: "retro", label: "📻 Ретро", config: { darkIntensity: 5, filterType: "grayscale", filterIntensity: 80 } },
  { id: "acid", label: "🌈 Кислота", config: { darkIntensity: 0, filterType: "hue", filterIntensity: 60 } },
];

const DEFAULT_CONFIG = {
  darkIntensity: 0,
  filterType: "none",
  filterIntensity: 50,
};

// Впровадження CSS анімацій для спеціальних ефектів
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.id = "visual-filters-animations";
  style.innerHTML = `
    @keyframes ultrachaos-anim {
      0% { filter: brightness(var(--v-bright)) contrast(130%) saturate(180%) hue-rotate(0deg); }
      50% { filter: brightness(var(--v-bright)) contrast(200%) saturate(350%) hue-rotate(180deg) blur(1px); }
      100% { filter: brightness(var(--v-bright)) contrast(130%) saturate(180%) hue-rotate(360deg); }
    }
  `;
  if (!document.getElementById(style.id)) {
    document.head.appendChild(style);
  }
}

export const applyFilterEffect = (config) => {
  if (!config) return;
  document.documentElement.style.transition = "filter 0.4s ease-in-out";
  const brightness = 100 - (config.darkIntensity || 0) * 0.6;
  let filters = `brightness(${brightness}%)`;
  const { filterType, filterIntensity = 50 } = config;

  // Обробка спеціальних анімованих фільтрів
  if (filterType === "ultrachaos") {
    document.documentElement.style.setProperty("--v-bright", `${brightness}%`);
    document.documentElement.style.animation = "ultrachaos-anim 4s infinite linear";
    return;
  }

  document.documentElement.style.animation = "none";

  if (filterType === "grayscale") {
    filters += ` grayscale(${filterIntensity}%)`;
  } else if (filterType === "sepia") {
    filters += ` sepia(${filterIntensity}%)`;
  } else if (filterType === "invert") {
    const offset = filterIntensity - 50;
    if (offset > 0) {
      filters += ` invert(${offset * 2}%)`;
    } else if (offset < 0) {
      const boost = 1 + Math.abs(offset) / 50;
      filters += ` contrast(${boost * 100}%) saturate(${boost * 100}%)`;
    }
  } else if (filterType === "matrix") {
    filters += ` hue-rotate(180deg) grayscale(${filterIntensity}%)`;
  } else if (filterType === "uv") {
    filters += ` hue-rotate(280deg) saturate(${100 + filterIntensity}%)`;
  } else if (filterType === "contrast") {
    filters += ` contrast(${filterIntensity * 2}%)`;
  } else if (filterType === "saturate") {
    filters += ` saturate(${filterIntensity * 2}%)`;
  } else if (filterType === "blur") {
    filters += ` blur(${filterIntensity / 10}px)`;
  } else if (filterType === "hue") {
    filters += ` hue-rotate(${filterIntensity * 3.6}deg)`;
  }

  document.documentElement.style.filter = filters;
};

export const useVisualFilters = (user) => {
  const [visualConfig, setVisualConfigState] = useState(DEFAULT_CONFIG);
  const [customPresets, setCustomPresets] = useState([]);

  const storageKey = user?.account ? `visualConfig_${user.account}` : "visualConfig_guest";
  const presetsKey = user?.account ? `customPresets_${user.account}` : "customPresets_guest";

  useEffect(() => {
    localforage.getItem(storageKey).then((saved) => {
      if (saved) setVisualConfigState(saved);
    });

    localforage.getItem(presetsKey).then((saved) => {
      if (saved) setCustomPresets(saved);
      else setCustomPresets([]);
    });
  }, [storageKey, presetsKey]);

  useEffect(() => {
    let interval;
    if (visualConfig.filterType === "chaos") {
      const triggerChaos = () => {
        const pool = FILTERS.filter(f => !["none", "chaos", "ultrachaos"].includes(f.id));
        const randomFilter = pool[Math.floor(Math.random() * pool.length)];
        const randomIntensity = Math.floor(Math.random() * 80) + 20;
        applyFilterEffect({ ...visualConfig, filterType: randomFilter.id, filterIntensity: randomIntensity });
      };
      triggerChaos();
      // Встановлюємо випадковий інтервал від 1с до 3с
      interval = setInterval(triggerChaos, Math.floor(Math.random() * 2000) + 1000);
    } else {
      applyFilterEffect(visualConfig);
    }
    return () => clearInterval(interval);
  }, [visualConfig]);

  const setVisualConfig = useCallback((updater) => {
    setVisualConfigState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localforage.setItem(storageKey, next);
      return next;
    });
  }, [storageKey]);

  const resetFilters = useCallback(() => {
    setVisualConfig(DEFAULT_CONFIG);
    localforage.setItem(storageKey, DEFAULT_CONFIG);
  }, [storageKey, setVisualConfig]);

  const saveCustomPreset = useCallback((name) => {
    if (!name.trim()) return;
    const newPreset = {
      id: `custom_${Date.now()}`,
      label: `✨ ${name}`,
      config: { ...visualConfig },
    };
    setCustomPresets((prev) => {
      const next = [...prev, newPreset];
      localforage.setItem(presetsKey, next);
      return next;
    });
  }, [presetsKey, visualConfig]);

  const deleteCustomPreset = useCallback((id) => {
    setCustomPresets((prev) => {
      const next = prev.filter((p) => p.id !== id);
      localforage.setItem(presetsKey, next);
      return next;
    });
  }, [presetsKey]);

  const updateCustomPresetName = useCallback((id, newName) => {
    if (!newName.trim()) return;
    setCustomPresets((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, label: `✨ ${newName}` } : p
      );
      localforage.setItem(presetsKey, next);
      return next;
    });
  }, [presetsKey]);

  const reorderCustomPresets = useCallback((newPresets) => {
    setCustomPresets(newPresets);
    localforage.setItem(presetsKey, newPresets);
  }, [presetsKey]);

  return {
    visualConfig,
    setVisualConfig,
    resetFilters,
    FILTERS,
    PRESETS,
    customPresets,
    saveCustomPreset,
    deleteCustomPreset,
    updateCustomPresetName,
    reorderCustomPresets,
  };
};