import React, { createContext, useState, useCallback, useContext, useEffect } from "react";
import localforage from "localforage";

export const DecoratorContext = createContext();

export const useDecorator = () => useContext(DecoratorContext);

export const DecoratorProvider = ({ children, isDarkMode }) => {
  const [isDecoratorMode, setIsDecoratorMode] = useState(false);
  const [isPersistent, setIsPersistent] = useState(false);
  const [styleOverrides, setStyleOverrides] = useState({});
  const [changeLog, setChangeLog] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Sync isDarkMode to body class for CSS selection
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("decorator-dark-mode");
    } else {
      document.body.classList.remove("decorator-dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const savedIsPersistent = await localforage.getItem("decorator_persistent");
        if (savedIsPersistent !== null) {
          setIsPersistent(savedIsPersistent);
          if (savedIsPersistent) {
            let savedOverrides = await localforage.getItem("decorator_overrides");
            const savedLog = await localforage.getItem("decorator_changelog");
            
            // Migration for old structure (flat { color: "red" } -> { light_default: { color: "red" } })
            if (savedOverrides) {
              const migrated = {};
              Object.keys(savedOverrides).forEach(elId => {
                migrated[elId] = {};
                const elData = savedOverrides[elId];
                if (elData.light_default || elData.light_hover || elData.dark_default || elData.dark_hover) {
                  migrated[elId] = elData; // Already new format
                } else {
                  migrated[elId].light_default = { ...elData }; // Migrate old
                }
              });
              setStyleOverrides(migrated);
            }
            if (savedLog) setChangeLog(savedLog);
          }
        }
      } catch (err) {
        console.error("Error hydrating decorator state", err);
      } finally {
        setIsHydrated(true);
      }
    };
    hydrate();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (isPersistent) {
      localforage.setItem("decorator_overrides", styleOverrides);
      localforage.setItem("decorator_changelog", changeLog);
    } else {
      localforage.removeItem("decorator_overrides");
      localforage.removeItem("decorator_changelog");
    }
    localforage.setItem("decorator_persistent", isPersistent);
  }, [styleOverrides, changeLog, isPersistent, isHydrated]);

  // Generate and inject global CSS
  useEffect(() => {
    let styleTag = document.getElementById("decorator-styles");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "decorator-styles";
      document.head.appendChild(styleTag);
    }

    let css = "";
    Object.entries(styleOverrides).forEach(([elId, modes]) => {
      // Light Default
      if (modes.light_default && Object.keys(modes.light_default).length > 0) {
        css += `body:not(.decorator-dark-mode) [data-decorator-id="${elId}"] { `;
        Object.entries(modes.light_default).forEach(([prop, val]) => {
          css += `${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val} !important; `;
        });
        css += `}\n`;
      }
      // Light Hover
      if (modes.light_hover && Object.keys(modes.light_hover).length > 0) {
        css += `body:not(.decorator-dark-mode) [data-decorator-id="${elId}"]:hover { `;
        Object.entries(modes.light_hover).forEach(([prop, val]) => {
          css += `${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val} !important; `;
        });
        css += `}\n`;
      }
      // Dark Default
      if (modes.dark_default && Object.keys(modes.dark_default).length > 0) {
        css += `body.decorator-dark-mode [data-decorator-id="${elId}"] { `;
        Object.entries(modes.dark_default).forEach(([prop, val]) => {
          css += `${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val} !important; `;
        });
        css += `}\n`;
      }
      // Dark Hover
      if (modes.dark_hover && Object.keys(modes.dark_hover).length > 0) {
        css += `body.decorator-dark-mode [data-decorator-id="${elId}"]:hover { `;
        Object.entries(modes.dark_hover).forEach(([prop, val]) => {
          css += `${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val} !important; `;
        });
        css += `}\n`;
      }
    });

    styleTag.innerHTML = css;
  }, [styleOverrides]);

  const applyStyle = useCallback((elementId, tagName, property, originalValue, newValue, mode = "light_default") => {
    setStyleOverrides((prev) => {
      const elStyles = prev[elementId] || {};
      const modeStyles = elStyles[mode] || {};
      return {
        ...prev,
        [elementId]: {
          ...elStyles,
          [mode]: {
            ...modeStyles,
            [property]: newValue,
          },
        },
      };
    });

    setChangeLog((prev) => [
      ...prev,
      {
        id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
        elementId,
        tagName,
        property,
        originalValue,
        newValue,
        mode,
        timestamp: new Date().toLocaleTimeString("uk-UA"),
      },
    ]);
  }, []);

  const undoChange = useCallback((changeId) => {
    setChangeLog((prev) => {
      const change = prev.find((c) => c.id === changeId);
      if (!change) return prev;

      setStyleOverrides((prevStyles) => {
        const elStyles = { ...(prevStyles[change.elementId] || {}) };
        const mode = change.mode || "light_default";
        const modeStyles = { ...(elStyles[mode] || {}) };
        
        const earlierChanges = prev.filter(
          (c) => c.elementId === change.elementId && c.property === change.property && (c.mode || "light_default") === mode && c.id !== changeId
        );
        
        if (earlierChanges.length > 0) {
          modeStyles[change.property] = earlierChanges[earlierChanges.length - 1].newValue;
        } else {
          delete modeStyles[change.property];
        }

        elStyles[mode] = modeStyles;

        // Clean up empty modes
        if (Object.keys(modeStyles).length === 0) {
          delete elStyles[mode];
        }

        if (Object.keys(elStyles).length === 0) {
          const newOverrides = { ...prevStyles };
          delete newOverrides[change.elementId];
          return newOverrides;
        }

        return { ...prevStyles, [change.elementId]: elStyles };
      });

      return prev.filter((c) => c.id !== changeId);
    });
  }, []);

  const resetAll = useCallback(() => {
    setStyleOverrides({});
    setChangeLog([]);
    document.querySelectorAll("[data-decorator-id]").forEach((el) => {
      el.removeAttribute("data-decorator-id");
    });
  }, []);

  const getOverridesForElement = useCallback(
    (elementId) => styleOverrides[elementId] || {},
    [styleOverrides]
  );

  return (
    <DecoratorContext.Provider
      value={{
        isDecoratorMode,
        setIsDecoratorMode,
        styleOverrides,
        changeLog,
        applyStyle,
        undoChange,
        resetAll,
        getOverridesForElement,
        isPersistent,
        setIsPersistent,
        isDarkMode
      }}
    >
      {children}
    </DecoratorContext.Provider>
  );
};
