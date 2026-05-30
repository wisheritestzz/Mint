import { useCallback } from 'react';
import html2canvas from 'html2canvas';

export function useScreenshot() {
  const capture = useCallback(async (element: HTMLElement): Promise<string> => {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });
    return canvas.toDataURL('image/png');
  }, []);

  return { capture };
}
