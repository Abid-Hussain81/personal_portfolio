import { courtyardPhoto, type ExperienceScene } from "./ExperienceDisplayConfig";

export type ScreenAssets = { sans: string; courtyard: HTMLImageElement };

export async function loadScreenAssets(): Promise<ScreenAssets> {
  const sans = getComputedStyle(document.body).getPropertyValue("--font-geist-sans").trim() || "Arial, sans-serif";
  const courtyard = new Image();
  courtyard.src = courtyardPhoto;
  await Promise.all([document.fonts.ready, document.fonts.load(`600 32px ${sans}`), courtyard.decode()]);
  return { sans, courtyard };
}

function painter(ctx: CanvasRenderingContext2D, sans: string) {
  function shape(x: number, y: number, w: number, h: number, fill: string, radius = 0, stroke?: string) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  function text(value: string, x: number, y: number, size: number, color: string, weight = 500, family = sans) {
    ctx.font = `${weight} ${size}px ${family}`;
    ctx.fillStyle = color;
    ctx.fillText(value, x, y);
  }

  function rule(x: number, y: number, w: number, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, 1.5);
  }

  function dot(x: number, y: number, radius: number, fill: string) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function image(source: HTMLImageElement, x: number, y: number, w: number, h: number) {
    const scale = Math.max(w / source.naturalWidth, h / source.naturalHeight);
    const cropWidth = w / scale;
    const cropHeight = h / scale;
    ctx.drawImage(source, (source.naturalWidth - cropWidth) / 2, (source.naturalHeight - cropHeight) * .53, cropWidth, cropHeight, x, y, w, h);
  }

  return { shape, text, rule, dot, image };
}

type Painter = ReturnType<typeof painter>;
type ScreenSize = { width: number; height: number; phone: boolean };

const rooms = [
  { name: "Courtyard queen", details: "2 guests · Breakfast included", price: "€128", status: "3 available" },
  { name: "Terrace king", details: "2 guests · Private terrace", price: "€164", status: "2 available" },
  { name: "Garden suite", details: "3 guests · Garden view", price: "€186", status: "3 available" },
] as const;

function booking(p: Painter, { width, height, phone }: ScreenSize) {
  const ink = "#163336";
  const subtle = "#3f6265";
  const teal = "#17655c";
  const edge = "#d7e4df";
  const paper = "#f4f8f5";
  p.shape(0, 0, width, height, paper);

  if (phone) {
    p.shape(0, 0, width, 122, "#ffffff");
    p.text("STAYDESK", 29, 55, 29, teal, 750);
    p.text("Stays", 293, 59, 21, subtle, 650);
    p.rule(0, 122, width, edge);
    p.text("Lisbon, Portugal", 29, 155, 26, teal, 650);
    p.text("Find a stay", 27, 195, 56, ink, 700);
    p.shape(28, 280, 336, 135, "#ffffff", 16, edge);
    p.text("Dates", 48, 301, 23, subtle);
    p.text("Apr 18–21", 48, 340, 29, ink, 700);
    p.text("Guests", 232, 301, 23, subtle);
    p.text("2 adults", 232, 340, 26, ink, 700);
    p.shape(28, 442, 336, 180, "#e6f0ea", 18, edge);
    p.text("Pátio House", 48, 468, 36, ink, 700);
    p.text("Old Town · Lisbon", 48, 519, 23, subtle);
    p.text("From €128 / night", 48, 567, 25, teal, 650);
    p.shape(28, 656, 336, 64, teal, 12);
    p.text("See available rooms", 59, 672, 27, "#ffffff", 700);
    p.rule(0, height - 80, width, edge);
    p.text("Search", 40, height - 58, 22, teal, 700);
    p.text("Bookings", 218, height - 58, 22, subtle, 600);
    return;
  }

  p.shape(0, 0, 178, height, "#183c3c");
  p.shape(21, 26, 34, 34, "#c3e6d9", 8);
  p.text("S", 30, 29, 24, "#1e524b", 750);
  p.text("Staydesk", 65, 32, 22, "#f7fcf9", 700);
  p.text("WORKSPACE", 23, 104, 15, "#a9ccca", 700);
  p.shape(14, 142, 150, 40, "#2c5550", 7);
  p.text("Availability", 25, 148, 20, "#f7fcf9", 700);
  p.text("Reservations", 25, 200, 19, "#c3dcd6");
  p.text("Properties", 25, 245, 19, "#c3dcd6");
  p.text("Pátio House", 24, height - 59, 18, "#d5e8df", 650);

  const x = 207;
  p.shape(178, 0, width - 178, 64, "#ffffff");
  p.rule(178, 63, width - 178, edge);
  p.text("Reservations  /  Availability", x, 20, 19, subtle, 600);
  p.shape(890, 15, 34, 34, "#d5eae3", 17);
  p.text("AM", 897, 23, 14, teal, 750);
  p.text("Room availability", x, 89, 43, ink, 720);
  p.text("Pátio House · Old Town, Lisbon", x, 151, 22, subtle, 550);

  p.shape(x, 204, 725, 76, "#ffffff", 11, edge);
  p.text("Check-in", x + 18, 214, 16, subtle, 650);
  p.text("Apr 18, 2027", x + 18, 238, 22, ink, 700);
  p.text("Check-out", x + 221, 214, 16, subtle, 650);
  p.text("Apr 21, 2027", x + 221, 238, 22, ink, 700);
  p.text("Guests", x + 425, 214, 16, subtle, 650);
  p.text("2 adults", x + 425, 238, 22, ink, 700);
  p.shape(x + 578, 220, 129, 44, teal, 7);
  p.text("Check rooms", x + 589, 230, 17, "#ffffff", 700);

  p.text("Available rooms", x, 304, 26, ink, 700);
  p.text("3 nights · 8 rooms left", x + 507, 311, 18, subtle, 600);
  rooms.forEach((room, i) => {
    const y = 352 + i * 66;
    p.shape(x, y, 725, 58, "#ffffff", 8, edge);
    p.text(room.name, x + 16, y + 5, 21, ink, 700);
    p.text(room.details, x + 16, y + 31, 16, subtle);
    p.text(room.price, x + 421, y + 13, 23, ink, 700);
    p.text("/ night", x + 478, y + 20, 16, subtle);
    p.shape(x + 569, y + 13, 138, 30, "#e6f2eb", 6);
    p.text(room.status, x + 585, y + 17, 17, teal, 650);
  });
}

const milestones = [
  ["Design review", "Apr 18", true],
  ["Development", "Apr 24", false],
  ["Launch checklist", "May 02", false],
] as const;

function portal(p: Painter, { width, height, phone }: ScreenSize) {
  const ink = "#302741";
  const subtle = "#605371";
  const purple = "#5b4275";
  const line = "#e4ddec";
  const x = phone ? 29 : 212;
  const w = phone ? width - 58 : width - x - 28;
  p.shape(0, 0, width, height, "#fcfaff");

  if (phone) {
    p.shape(0, 0, width, 118, "#f6f0fa");
    p.text("Gaply", x, 52, 35, purple, 750);
    p.shape(width - 67, 50, 37, 37, "#e6d9ef", 19);
    p.text("AM", width - 59, 61, 15, purple, 750);
    p.rule(0, 118, width, line);
  } else {
    p.shape(0, 0, 184, height, "#f0eaf6");
    p.shape(24, 25, 34, 34, purple, 8);
    p.text("G", 32, 27, 24, "#ffffff", 750);
    p.text("Gaply", 68, 26, 29, ink, 750);
    p.text("Overview", 28, 121, 20, subtle, 550);
    p.shape(16, 155, 151, 43, "#e1d5ec", 8);
    p.text("Projects", 28, 163, 21, purple, 720);
    p.text("Activity", 28, 215, 20, subtle, 550);
    p.text("Client workspace", 24, height - 54, 17, purple, 650);
    p.text("Workspace  /  Projects", x, 21, 19, subtle, 650);
    p.shape(width - 61, 15, 33, 33, "#e6d9ef", 17);
    p.text("AM", width - 54, 22, 14, purple, 750);
    p.rule(184, 63, width - 184, line);
  }

  p.text(phone ? "Projects" : "Project overview", x, phone ? 149 : 86, phone ? 52 : 43, ink, 750);
  const top = phone ? 226 : 160;
  p.shape(x, top, w, phone ? 169 : 134, "#eee7f5", 13, line);
  p.text("Active project", x + 20, top + 15, phone ? 22 : 17, subtle, 650);
  p.text("Website refresh", x + 20, top + (phone ? 50 : 41), phone ? 31 : 30, ink, 720);
  const progressY = top + (phone ? 109 : 93);
  const progressWidth = w - 104;
  p.shape(x + 20, progressY, progressWidth, 9, "#ddd1e7", 4);
  p.shape(x + 20, progressY, progressWidth * .68, 9, "#81629d", 4);
  p.text("68%", x + w - 67, progressY - 9, phone ? 23 : 20, purple, 700);
  if (phone) p.text("Launch target · May 02", x + 20, top + 134, 21, subtle, 550);

  const list = phone ? 441 : 323;
  p.text("Milestones", x, list, phone ? 29 : 26, ink, 720);
  milestones.forEach(([label, date, done], i) => {
    const y = list + (phone ? 51 : 46) + i * (phone ? 65 : 50);
    p.rule(x, y, w, line);
    p.dot(x + 12, y + (phone ? 29 : 23), 10, done ? "#dbead9" : "#e9e0f1");
    if (done) p.text("✓", x + 5, y + (phone ? 18 : 12), 15, "#366142", 700);
    p.text(label, x + 31, y + (phone ? 17 : 10), phone ? 22 : 21, ink, 650);
    p.text(date, x + w - (phone ? 73 : 74), y + (phone ? 18 : 11), phone ? 21 : 20, subtle);
  });

  p.rule(phone ? 0 : x, height - (phone ? 81 : 59), phone ? width : w, line);
  if (phone) {
    p.text("Overview", 26, height - 56, 18, subtle);
    p.text("Projects", 157, height - 56, 19, purple, 750);
    p.text("Activity", 290, height - 56, 18, subtle);
  } else {
    p.text("Recent activity", x, height - 42, 17, purple, 720);
    p.text("Mia completed Design review", x + 157, height - 42, 18, subtle, 550);
  }
}

function website(p: Painter, { width, height, phone }: ScreenSize, { courtyard }: ScreenAssets) {
  const cream = "#fbf6eb";
  const olive = "#3d4b37";
  const clay = "#744837";
  const serif = "Georgia, serif";
  const line = "#dfd0be";
  p.shape(0, 0, width, height, cream);

  if (phone) {
    p.text("FORM & FIELD", 30, 56, 25, olive, 740);
    p.text("Menu", 304, 59, 22, olive, 600);
    p.rule(27, 112, 338, line);
    p.text("Architecture & interiors", 29, 146, 21, clay, 650);
    p.text("Spaces to", 27, 184, 55, clay, 400, serif);
    p.text("slow down in.", 27, 241, 54, clay, 400, serif);
    p.image(courtyard, 29, 328, 334, 307);
    p.shape(29, 662, 254, 55, olive, 3);
    p.text("Explore services   →", 48, 674, 24, "#fffaf1", 650);
    p.rule(29, height - 82, 334, line);
    p.text("Architecture  ·  Interiors", 31, height - 57, 22, olive, 550);
    return;
  }

  p.text("FORM & FIELD", 34, 24, 29, olive, 740);
  p.text("Studio     Services     Contact", 628, 32, 20, olive, 600);
  p.rule(34, 76, width - 68, line);
  p.image(courtyard, 489, 103, 437, height - 186);
  p.text("Architecture & interiors", 36, 134, 22, clay, 650);
  p.text("Spaces to", 32, 175, 74, clay, 400, serif);
  p.text("slow down in.", 32, 245, 72, clay, 400, serif);
  p.text("Considered spaces for everyday life.", 36, 350, 22, olive);
  p.shape(36, 408, 213, 46, olive, 3);
  p.text("Explore services   →", 50, 419, 20, "#fffaf1", 650);
  p.rule(34, height - 63, width - 68, line);
  p.text("Architecture", 36, height - 43, 21, olive, 600);
  p.text("Interiors", 433, height - 43, 21, olive, 600);
  p.text("Consultation", 795, height - 43, 21, olive, 600);
}

const renderers = { "mind-gauge": booking, gaply: portal, independent: website };

export function paintExperienceScreen(scene: ExperienceScene, phone: boolean, aspect: number, assets: ScreenAssets) {
  const width = phone ? 392 : 960;
  const height = width / aspect;
  const canvas = document.createElement("canvas");
  canvas.width = phone ? 832 : 1920;
  canvas.height = Math.round(canvas.width / aspect);
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("Could not allocate the experience screen.");
  context.scale(canvas.width / width, canvas.height / height);
  context.textBaseline = "top";
  context.imageSmoothingQuality = "high";
  renderers[scene](painter(context, assets.sans), { width, height, phone }, assets);
  return canvas;
}
