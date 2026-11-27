import { useState } from 'react';

const PRIMARY_LIFESTYLE_ASSET = '/images/gramiyam/lifestyle-hero.png';
const FALLBACK_PRODUCT_ASSET = '/images/gramiyam/ashwagandha-plus.jpg';

export default function LifestyleImage() {
  const [imgSrc, setImgSrc] = useState(PRIMARY_LIFESTYLE_ASSET);

  return (
    <div className="relative mx-auto flex w-full max-w-xl items-end justify-center lg:max-w-none">
      <img
        src={imgSrc}
        onError={() => {
          if (imgSrc !== FALLBACK_PRODUCT_ASSET) {
            setImgSrc(FALLBACK_PRODUCT_ASSET);
          }
        }}
        alt="Smiling woman holding GRAMIYAM Ashwagandha Plus herbal wellness bottle"
        className="mx-auto block h-[380px] w-auto max-w-full object-contain object-bottom sm:h-[460px] lg:h-[580px] xl:h-[620px]"
      />
    </div>
  );
}
