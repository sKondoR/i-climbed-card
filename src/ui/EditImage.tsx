import { useEffect, useRef, useState } from 'react';
import { ShareToVKButton } from 'src/features/shareToVk/ui/ShareToVkButton';
import { DownloadButton } from 'src/features/download/ui/DownloadButton';
import { TextControls } from './TextControls';

export type Position = {
  isTop: boolean;
  isRight: boolean;
};

type EditImageProps = {
    imgSrc: string,
    name: string,
    region?: string,
    grade: string,
};
export default function EditImage ({
    imgSrc = '', // ожидается в формате data:image/png;base64,...
    name = '',
    region = '',
    grade = '',
}: EditImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(30);
  const [fontSizeRegion, setFontSizeRegion] = useState(20);
  const [position, setPosition] = useState<Position>({
    isTop: false,
    isRight: false,
  });

  useEffect(() => {
    if (!imgSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();

    img.onload = () => {
      // Устанавливаем размеры canvas под изображение
      canvas.width = img.width;
      canvas.height = img.height;

      // Очищаем и рисуем фон
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Настройки стиля текста
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = textColor;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 7;
      ctx.lineJoin = 'round';

      // Параметры позиционирования
      const lineHeight = fontSize + 10;
      const regionLineHeight = fontSizeRegion + 10;  
      const startY = position.isTop ? ((text ? 2 : 1) * lineHeight + regionLineHeight) : (canvas.height - regionLineHeight) + 10;
      const startX = position.isRight ? canvas.width - 30 : 30;
      ctx.textAlign = position.isRight ? 'right' : 'left';

      // Формируем строки
      const routeText = `${grade} ${name}`;

      // Отрисовка текста с эффектом обводки
      const renderText = (txt: string, y: number, txtSize: number) => {
        ctx.font = `bold ${txtSize}px Arial`;
        if (!txt.trim()) return;
        ctx.strokeText(txt, startX, y);
        ctx.fillText(txt, startX, y);
      };

      renderText(text, startY - lineHeight - regionLineHeight, fontSize);
      renderText(routeText, startY - regionLineHeight, fontSize);
      renderText(region, startY, fontSizeRegion);
    };

    img.src = imgSrc; // Уже base64 — можно использовать напрямую
  }, [
    imgSrc, text, name, region, grade, position.isRight, position.isTop,
    textColor, fontSize, fontSizeRegion
  ]);

  return (
    <div className="mf-edit-image">
    <div className="flex flex-wrap justify-center mb-3 mt-1 items-center" >
        <TextControls
          text={text}
          onTextChange={setText}
          textColor={textColor}
          onColorChange={setTextColor}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
          fontSizeRegion={fontSizeRegion}
          onFontSizeRegionChange={setFontSizeRegion}
          position={position}
          onPositionChange={(top, right) => setPosition({ isTop: top, isRight: right })}
        />
        <DownloadButton canvasRef={canvasRef} />
        <ShareToVKButton canvasRef={canvasRef} />
      </div>
      <div className="flex justify-center overflow-auto">
        <canvas
            ref={canvasRef}
            style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  );
};

