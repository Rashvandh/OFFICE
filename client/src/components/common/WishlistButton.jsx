import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function WishlistButton({ product, className = '', size = 'md' }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const active = isWishlisted(product._id || product.slug);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      active
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`,
      'info'
    );
  };

  const dim = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      className={`inline-flex items-center justify-center rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B] ${dim} ${
        active
          ? 'border-[#C02B0B] bg-[#C02B0B] text-white shadow-xs'
          : 'border-[#C02B0B]/35 bg-[#FEFBEA]/95 text-[#C02B0B] shadow-xs hover:border-[#C02B0B] hover:bg-white'
      } ${className}`}
    >
      <Heart className={`h-4 w-4 ${active ? 'fill-current' : ''}`} />
    </button>
  );
}
