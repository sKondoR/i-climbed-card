
import type { Position } from './EditImage';
import FontSizeControl from './FontSizeControl';

type TextControlsProps = {
  text: string;
  onTextChange: (value: string) => void;
  textColor: string;
  onColorChange: (value: string) => void;
  fontSize: number;
  onFontSizeChange: (value: number) => void;
  fontSizeRegion: number;
  onFontSizeRegionChange: (value: number) => void;
  position: Position;
  onPositionChange: (top: boolean, right: boolean) => void;
};

export function TextControls({
  text,
  onTextChange,
  textColor,
  onColorChange,
  fontSize,
  onFontSizeChange,
  fontSizeRegion,
  onFontSizeRegionChange,
  position,
  onPositionChange,
}: TextControlsProps) {
  return (
    <>
      {/* Поле ввода текста */}
      <div className="mr-5">
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Введите текст"
          className="px-3 py-1 w-[200px] rounded-md border-2 border-cyan-700 focus:border-pink-700 focus:outline-none"
          aria-label="Текст на изображении"
        />
      </div>

      {/* Контроль позиции текста (2x2 сетка) */}
      <div
        className="flex flex-wrap w-8 h-8 border-2 border-cyan-700 rounded-md overflow-hidden transition-shadow mr-5"
        role="radiogroup"
        aria-label="Позиция текста"
      >
        {[
          { top: true, right: false, label: 'Слева сверху' },
          { top: true, right: true, label: 'Справа сверху' },
          { top: false, right: false, label: 'Слева снизу' },
          { top: false, right: true, label: 'Справа снизу' },
        ].map(({ top, right, label }) => (
          <div
            key={label}
            className={`w-1/2 h-1/2 cursor-pointer transition-colors ${
              position.isTop === top && position.isRight === right
                ? 'bg-pink-700'
                : 'hover:bg-cyan-700'
            }`}
            onClick={() => onPositionChange(top, right)}
            role="radio"
            aria-checked={position.isTop === top && position.isRight === right}
            title={label}
          />
        ))}
      </div>

      {/* Размер основного текста */}
      <div className="mr-5">
        <FontSizeControl
          value={fontSize}
          defaultValue={30}
          onChange={onFontSizeChange}
        />
      </div>

      {/* Размер текста региона */}
      <div className="mr-5">
        <FontSizeControl
          value={fontSizeRegion}
          defaultValue={20}
          onChange={onFontSizeRegionChange}
        />
      </div>

      {/* Выбор цвета текста */}
      <div className="mr-5">
        <input
          type="color"
          value={textColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-8 h-8 cursor-pointer rounded-md border-2 border-cyan-700 focus:border-pink-700 focus:outline-none"
          title="Выберите цвет текста"
          aria-label="Цвет текста"
        />
      </div>
    </>
  );
}