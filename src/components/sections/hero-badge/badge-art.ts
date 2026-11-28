import { CanvasTexture, SRGBColorSpace } from "three";
import type { BadgeProfile } from "./HeroBadge";

const width = 440;
const height = 620;
const inset = 28;
const ink = "#303b2d";
const muted = "#52644b";

export const resumeArea = { left: inset, top: 552, width: width - inset * 2, height: 44 };
export const faceSize = [2.16, 3.06] as const;

function canvasFace(compact: boolean, draw: (context: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  const scale = compact ? 1 : 2;
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Badge artwork requires Canvas 2D");
  ctx.scale(scale, scale);
  ctx.textBaseline = "top";
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, 21);
  ctx.clip();
  draw(ctx);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = compact ? 1 : 4;
  return texture;
}

function fillRounded(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radius: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.fill();
}

function text(ctx: CanvasRenderingContext2D, message: string, x: number, y: number, font: string, color = ink) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(message, x, y, width - x - inset);
}

function pills(ctx: CanvasRenderingContext2D, items: string[], top: number) {
  let x = inset;
  let y = top;
  for (const item of items) {
    const font = "500 21px Arial, sans-serif";
    ctx.font = font;
    const w = Math.ceil(ctx.measureText(item).width) + 28;
    if (x + w > width - inset) {
      x = inset;
      y += 42;
    }
    fillRounded(ctx, x, y, w, 35, 17, "#e6ebdd");
    text(ctx, item, x + 14, y + 7, font, muted);
    x += w + 8;
  }
}

function faceBackground(ctx: CanvasRenderingContext2D, top: string, bottom: string) {
  const color = ctx.createLinearGradient(0, 0, width, height);
  color.addColorStop(0, top);
  color.addColorStop(1, bottom);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  fillRounded(ctx, 191, 16, 58, 8, 4, "#9da18b");
}

export function frontArtwork(photo: HTMLImageElement, profile: BadgeProfile, compact: boolean) {
  return canvasFace(compact, ctx => {
    faceBackground(ctx, "#fffcf3", "#f0f0e5");
    const portrait = { x: inset, y: 42, w: width - inset * 2, h: 365 };
    const scale = Math.max(portrait.w / photo.naturalWidth, portrait.h / photo.naturalHeight);
    const pixelWidth = photo.naturalWidth * scale;
    const pixelHeight = photo.naturalHeight * scale;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(portrait.x, portrait.y, portrait.w, portrait.h, 15);
    ctx.clip();
    ctx.drawImage(photo, portrait.x - (pixelWidth - portrait.w) / 2, portrait.y - (pixelHeight - portrait.h) * 0.28, pixelWidth, pixelHeight);
    ctx.restore();

    text(ctx, profile.name, inset, 441, "600 49px Arial, sans-serif");

    const { left, top, width: buttonWidth, height: buttonHeight } = resumeArea;
    fillRounded(ctx, left, top, buttonWidth, buttonHeight, 10, "#d9e5d2");
    text(ctx, "Download resume", left + 16, top + 10, "600 22px Arial, sans-serif");
    text(ctx, "↗", width - inset - 38, top + 9, "24px Arial, sans-serif");
  });
}

export function backArtwork(profile: BadgeProfile, touch: boolean, compact: boolean) {
  return canvasFace(compact, ctx => {
    faceBackground(ctx, "#fffbf1", "#dce7d5");
    text(ctx, profile.name, inset, 76, "italic 53px Georgia, serif");
    text(ctx, profile.location, inset, 141, "500 23px Arial, sans-serif", muted);
    ctx.fillStyle = "#a9b49c";
    ctx.fillRect(inset, 190, width - inset * 2, 1);
    text(ctx, "Core focus", inset, 237, "600 23px Arial, sans-serif");
    pills(ctx, profile.specialties, 285);
    text(ctx, touch ? "Tap to flip" : "Click or drag to flip", inset, 558, "500 23px Arial, sans-serif", muted);
  });
}

export const resumeHitbox = {
  y: (0.5 - (resumeArea.top + resumeArea.height / 2) / height) * faceSize[1],
  width: resumeArea.width / width * faceSize[0],
  height: resumeArea.height / height * faceSize[1],
};
