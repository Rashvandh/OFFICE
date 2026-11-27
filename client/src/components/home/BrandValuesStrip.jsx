import { Leaf, Sprout, Award, Heart } from 'lucide-react';

const VALUES = [
  {
    icon: Leaf,
    title: 'Traditional Formulations',
    subtitle: 'Rooted in Siddha & Ayurveda',
  },
  {
    icon: Sprout,
    title: 'Natural Botanicals',
    subtitle: 'Herbal ingredients with care',
  },
  {
    icon: Award,
    title: 'Thoughtful Quality',
    subtitle: 'Consistent and reliable standards',
  },
  {
    icon: Heart,
    title: 'Everyday Wellness',
    subtitle: 'For modern, balanced living',
  },
];

export default function BrandValuesStrip() {
  return (
    <section className="border-b border-[#E8DFC5] bg-[#FEFBEA] py-6">
      <div className="container-gramiyam grid grid-cols-1 divide-y divide-[#E8DFC5] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {VALUES.map(({ icon: Icon, title, subtitle }) => (
          <div
            key={title}
            className="flex items-center gap-3.5 px-4 py-3 first:pl-0 last:pr-0"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8DFC5] bg-[#F7F1D8]/60 text-[#C02B0B]">
              <Icon className="h-4 w-4 stroke-[1.6]" />
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-[#000000]">
                {title}
              </p>
              <p className="text-[11px] text-[#4A453B]">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
