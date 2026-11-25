import { Leaf } from 'lucide-react';
import { PrimaryButton } from './Buttons.jsx';

export default function EmptyState({
  icon: Icon = Leaf,
  title = 'Nothing found here yet',
  description = 'Try adjusting your filters or explore our full herbal collection.',
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-softgrey bg-white px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cream text-forest">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-serif text-2xl font-medium text-forest">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal/70">
        {description}
      </p>
      {actionLabel && (actionTo || onAction) && (
        <div className="mt-6">
          <PrimaryButton to={actionTo} onClick={onAction}>
            {actionLabel}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
