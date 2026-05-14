# Додавання озвучки до пісень

## Структура

Кожна пісня може мати встроєну озвучку (narration) для читання текстів пісень.

## Як додати озвучку до пісні

### 1. Підготуйте MP3 файли

Створіть три MP3 файли для озвучки:

- `src/mp3/{song-name}-narration-voice1.mp3` - Голос 1
- `src/mp3/{song-name}-narration-voice2.mp3` - Голос 2
- `src/mp3/{song-name}-narration-voice3.mp3` - Голос 3

Де `{song-name}` - це назва пісні (наприклад: `dinofroz`, `turkeys`, `monody`)

### 2. Імпортуйте файли

Додайте імпорт на початку компонента `MusicPhoto.jsx`:

```javascript
import dinofroz1Audio from "../../mp3/dinofroz-narration-voice1.mp3";
import dinofroz2Audio from "../../mp3/dinofroz-narration-voice2.mp3";
import dinofroz3Audio from "../../mp3/dinofroz-narration-voice3.mp3";
```

### 3. Додайте до об'єкту пісні

У визначенні пісні розкомментуйте та активуйте `voiceNarrations`:

```javascript
{
  id: 1,
  image: dinofrozone,
  audio: dinofrozAudio,
  // ... інші властивості ...
  lyrics: [ /* ... */ ],
  voiceNarrations: {
    voice1: dinofroz1Audio,
    voice2: dinofroz2Audio,
    voice3: dinofroz3Audio,
  },
},
```

## Поточна поддержка

Озвучка встроєна для:

- Динофроз (Dinofroz)
- Індики (Turkeys)
- Monody

## Використання

У плеєрі (повноекранний режим) відкрийте налаштування (⚙️) і виберіть озвучку з випадаючого меню "Озвучка":

- **Без озвучки** - озвучка вимкнена
- **Голос 1** - перша версія озвучки
- **Голос 2** - друга версія озвучки
- **Голос 3** - третя версія озвучки

## Примітки

- Озвучка автоматично синхронізується з текстом пісні
- Озвучка доступна тільки для пісень з текстами (lyrics)
- Для найкращого результату озвучка повинна збігатися за часом з текстом
