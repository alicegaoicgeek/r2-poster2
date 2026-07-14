#!/bin/bash
# 工作流：任意图 → 1920×1080 白边补齐（自动取原图角部颜色做底色，无缝）
# 用法: pad169.sh <图1> [图2 ...]   产出到 ~/Desktop/r2-swiss/<原名>_169.png
for f in "$@"; do
  bg=$(magick "$f" -format '%[pixel:p{3,3}]' info:)
  stem=$(basename "$f"); stem="${stem%.*}"; stem="${stem// /_}"
  magick "$f" -resize 1920x1080 -background "$bg" -gravity center -extent 1920x1080 \
    ~/Desktop/r2-swiss/"${stem}_169.png"
  echo "✓ ~/Desktop/r2-swiss/${stem}_169.png (底色 $bg)"
done
