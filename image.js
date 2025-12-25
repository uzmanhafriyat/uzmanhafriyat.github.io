import sharp from "sharp";
import fg from "fast-glob";
import fs from "fs";
import path from "path";

const MAPPINGS = [
  {
    src: "src/assets/images",
    out: "src/assets/images"
  }
];

async function run() {
  console.log("Görsel işleme başlatıldı...");

  for (const mapping of MAPPINGS) {
    const { src, out } = mapping;

    if (!fs.existsSync(src)) {
      console.warn(`⚠️ Kaynak klasör bulunamadı: ${src}`);
      continue;
    }

    const files = await fg(`${src}/**/*.{jpg,jpeg,JPG,JPEG,png,PNG}`);
    console.log(`\n İşleniyor: ${src} -> ${out}`);

    await Promise.all(
      files.map(async (file) => {
        try {
          const relPath = path.relative(src, file);
          const outPath = path
            .join(out, relPath)
            .replace(/\.(jpe?g|png)$/i, ".webp");

          fs.mkdirSync(path.dirname(outPath), { recursive: true });

          await sharp(file)
            .rotate()
            .webp({
              quality: 95,
              effort: 6,
            })
            .toFile(outPath);

          console.log(`  ✔ ${relPath} -> .webp`);
          fs.unlinkSync(file);
        } catch (err) {
          console.error(`  ✘ Hata (${file}):`, err.message);
        }
      })
    );
  }
  console.log("\n Tüm işlemler tamamlandı!");
}

run();