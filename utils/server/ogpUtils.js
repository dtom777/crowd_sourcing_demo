import { createCanvas, registerFont, loadImage } from 'canvas';
import path from 'path';
import fs from 'fs';
import { prisma } from '@/libs/prisma';

const createTextLine = (canvas, text) => {
  const context = canvas.getContext('2d');
  const MAX_WIDTH = 1000;

  for (let i = 0; i < text.length; i += 1) {
    const line = text.substring(0, i + 1);

    if (context.measureText(line).width > MAX_WIDTH) {
      return {
        line,
        remaining: text.substring(i + 1),
      };
    }
  }

  return {
    line: text,
    remaining: '',
  };
};

const createTextLines = (canvas, text) => {
  const lines = [];
  let currentText = text;

  while (currentText !== '') {
    const separatedText = createTextLine(canvas, currentText);
    lines.push(separatedText.line);
    currentText = separatedText.remaining;
  }

  return lines;
};

const createOgp = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  // console.log(post);

  const WIDTH = 1200;
  const HEIGHT = 630;
  const DX = 0;
  const DY = 0;
  registerFont(path.resolve('./fonts/GenShinGothic-Bold.ttf'), {
    family: 'GenShinGothic-Bold',
  });
  // registerFont(path.resolve('./fonts/GenShinGothic-Medium.ttf'), {
  //   family: 'GenShinGothic-Medium',
  // });
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  //背景関連
  ctx.fillStyle = 'rgb(252, 211, 77)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  const bgImage = await loadImage(path.resolve('./public/bg.png'));
  ctx.drawImage(bgImage, DX, DY, WIDTH, HEIGHT);

  // 文字関連
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  const title = post.title;
  const content = post.content;

  const lines = createTextLines(canvas, { title, content });
  lines.forEach((line, index) => {
    // const y = 314 + 80 * (index - (lines.length - 1) / 2);
    ctx.font = '60px GenShinGothic-Bold';
    ctx.textAlign = 'center';
    ctx.fillText(line.title, 600, 210);

    // ctx.font = '20px GenShinGothic-Medium';
    ctx.font = '20px GenShinGothic-Bold';
    ctx.textAlign = 'start';
    ctx.fillText(line.content, 100, 350);
  });

  const buffer = canvas.toBuffer();
  try {
    console.log('GENERATING AN OGP IMAGE');
    fs.writeFileSync(path.resolve(`./public/ogp/${id}.png`), buffer);
  } catch (err) {
    console.error(err);
  }
};

export default createOgp;
