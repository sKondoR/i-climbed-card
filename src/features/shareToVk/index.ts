export async function shareToVK(
  canvas: HTMLCanvasElement,
  title: string = 'Я пролез!',
): Promise<void> {
  if (!canvas) return;

  canvas.toBlob(async (blob) => {
    if (!blob) {
      console.error('Не удалось создать изображение');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', blob, 'i-climbed.jpg');

      // Загружаем на imgbb
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!result.data?.url) {
        console.error('Ошибка загрузки изображения:', result);
        return;
      }

      const imageUrl = result.data.url; 
      const params = new URLSearchParams({
        url: `${process.env.NEXT_PUBLIC_ICLIMBED_URL}`,
        title,
        image: imageUrl,
        noparse: 'true'
      });
      const vkShareUrl = `https://vk.com/share.php?${params.toString()}`;
      window.open(vkShareUrl, 'vk_share', 'width=600,height=400,resizable=yes,scrollbars=yes');
    } catch (error) {
      console.error('Ошибка при загрузке на imgbb:', error);
    }
  }, 'image/jpeg');
}