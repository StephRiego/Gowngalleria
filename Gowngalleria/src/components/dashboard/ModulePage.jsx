import { NavIcon, IconBox } from '../icons/Icon';

export default function ModulePage({
  title,
  description,
  icon = 'sparkle',
  children,
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <IconBox className="w-14 h-14">
          <NavIcon name={icon} tone="stat" size={26} />
        </IconBox>
        <div>
          <h2 className="font-display text-3xl text-gg-charcoal">{title}</h2>
          <p className="text-sm text-gg-gray mt-2 max-w-2xl">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
