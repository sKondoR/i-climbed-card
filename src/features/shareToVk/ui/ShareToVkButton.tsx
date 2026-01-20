import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shareToVK } from '..';
import type { RefObject } from 'react';

type ShareToVKButtonProps = {
    canvasRef: RefObject<HTMLCanvasElement | null>;
};

export const ShareToVKButton = ({
    canvasRef,
}: ShareToVKButtonProps )=> {
    const handleShareToVK = () => {
        if (!canvasRef?.current) return;
        shareToVK(canvasRef.current);
    };

    return (
        <FontAwesomeIcon
            icon={faShareAlt}
            className="text-2xl cursor-pointer text-cyan-700 hover:text-pink-700 h-5 w-5"
            onClick={handleShareToVK}
            aria-label="поделиться в ВКонтакте"
        />
    );
}
