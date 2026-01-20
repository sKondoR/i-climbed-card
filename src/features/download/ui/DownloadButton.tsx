import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { downloadImage } from '..';
import type { RefObject } from 'react';

type DownloadButtonProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

export const DownloadButton = ({
    canvasRef,
}: DownloadButtonProps ) => {
    const handleDownloadImage = () => {
        if (!canvasRef?.current) return;
        downloadImage(canvasRef.current);
    };

    return (
        <FontAwesomeIcon
            icon={faDownload}
            className="text-2xl cursor-pointer text-cyan-700 hover:text-pink-700 h-5 w-5 mr-5" 
            onClick={handleDownloadImage}
            aria-label={`скачать изображение`}
        />
    );
}
