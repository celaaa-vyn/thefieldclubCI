from PIL import Image
import pathlib

SRC = pathlib.Path("public/assets")
MAX_W = 900
QUALITY = 75

results = []

for img_path in SRC.rglob("*"):
    if img_path.suffix.lower() not in (".png", ".jpg", ".jpeg"):
        continue

    webp_path = img_path.with_suffix(".webp")

    try:
        original_size = img_path.stat().st_size
        with Image.open(img_path) as im:
            im = im.convert("RGB")
            w, h = im.size
            if w > MAX_W:
                ratio = MAX_W / w
                im = im.resize((MAX_W, int(h * ratio)), Image.LANCZOS)
            im.save(webp_path, "WEBP", quality=QUALITY, method=6)

        new_size = webp_path.stat().st_size
        pct = (1 - new_size / original_size) * 100
        results.append((img_path.name, original_size, new_size, pct))
        print(f"OK  {img_path.name}")
        print(f"    {original_size//1024}KB -> {new_size//1024}KB ({pct:.0f}% smaller)")

    except Exception as e:
        print(f"ERR {img_path.name}: {e}")

total_before = sum(r[1] for r in results)
total_after  = sum(r[2] for r in results)
print(f"\nTotal: {total_before//1024}KB -> {total_after//1024}KB ({(1-total_after/total_before)*100:.0f}% smaller)")
