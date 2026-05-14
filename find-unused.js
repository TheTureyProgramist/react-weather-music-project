const fs = require("fs");
const path = require("path");
const possibleDirs = ["src/photos/vip-modal"];
// node find-unused.js
let imagesDir = "";
for (const dir of possibleDirs) {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    imagesDir = fullPath;
    console.log(`✅ Знайдено папку з картинками: ${dir}`);
    break;
  }
}
if (!imagesDir) {
  console.error(
    "❌ Не вдалося знайти папку з зображеннями. Перевір назву папок у проекті!",
  );
  process.exit(1);
}
const srcDir = path.join(__dirname, "src");
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}
try {
  const images = fs
    .readdirSync(imagesDir)
    .filter((file) => /\.(jpg|jpeg|png|gif|svg|webp)$/.test(file));
  const srcFiles = getAllFiles(srcDir);
  console.log(
    `🔎 Перевіряю ${images.length} зображень на використання у папці src...`,
  );
  const unused = images.filter((image) => {
    let isUsed = false;
    for (const file of srcFiles) {
      if (/\.(js|jsx|ts|tsx|css|scss|html)$/.test(file)) {
        const content = fs.readFileSync(file, "utf8");
        if (content.includes(image)) {
          isUsed = true;
          break;
        }
      }
    }
    return !isUsed;
  });
  if (unused.length > 0) {
    console.log("\n❌ НЕВИКОРИСТОВУВАНІ ЗОБРАЖЕННЯ:");
    console.log("---------------------------------");
    unused.forEach((img) => console.log(`- ${img}`));
    console.log("---------------------------------");
    console.log(`Разом: ${unused.length} файлів можна видалити.`);
  } else {
    console.log("\n✅ Всі зображення використовуються у коді!");
  }
} catch (err) {
  console.error("Помилка під час виконання:", err.message);
}