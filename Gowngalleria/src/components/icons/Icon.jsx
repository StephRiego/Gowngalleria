const STROKE = 1.5;

function iconToneClass(active, tone) {
  if (tone === 'stat') return 'text-gg-gold';
  if (tone === 'success') return 'text-emerald-600';
  if (tone === 'muted') return 'text-gg-gray';
  if (active) return 'text-gg-gold icon-glow-active';
  return 'text-gg-gray group-hover:text-gg-lavender group-hover:icon-glow-hover';
}

export function Icon({
  children,
  active = false,
  tone = 'nav',
  className = '',
  size = 20,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 transition-all duration-200 ${iconToneClass(active, tone)} ${className}`}
    >
      {children}
    </svg>
  );
}

export function IconBox({ children, className = '' }) {
  return (
    <span
      className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-gg-gold/15 to-gg-lavender/25 flex items-center justify-center shrink-0 ${className}`}
    >
      {children}
    </span>
  );
}

export function DashboardIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 19v-8.5Z" />
      <path d="M9.5 20.5v-6h5v6" />
    </Icon>
  );
}

export function UsersIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19.5c.6-3 3.2-5 5.5-5s4.9 2 5.5 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M14 19.5c.4-2.2 2-3.5 3.5-3.5 1.2 0 2.4.8 3 3.5" />
    </Icon>
  );
}

export function ShopIcon(props) {
  return (
    <Icon {...props}>
      <path d="M5 9.5 12 4l7 5.5" />
      <path d="M6 9.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.5" />
      <path d="M10 19.5v-5h4v5" />
      <path d="M5 9.5h14" />
    </Icon>
  );
}

export function CalendarIcon(props) {
  return (
    <Icon {...props}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3.5v3M16 3.5v3M4 10h16" />
      <path d="M9 14.5h2M13 14.5h2M9 17h2" />
    </Icon>
  );
}

export function ChartIcon(props) {
  return (
    <Icon {...props}>
      <path d="M5 19.5V10M10 19.5V6M15 19.5v-5M20 19.5V8" />
      <path d="M4 19.5h17" />
    </Icon>
  );
}

export function ShieldIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 4.5 18 7v5.5c0 4-2.8 6.8-6 8-3.2-1.2-6-4-6-8V7l6-2.5Z" />
      <path d="M9.5 12.5 11 14l3.5-4" />
    </Icon>
  );
}

export function SettingsIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2M6.8 6.8l1.4 1.4M15.8 15.8l1.4 1.4M6.8 17.2l1.4-1.4M15.8 8.2l1.4-1.4" />
    </Icon>
  );
}

export function LogoutIcon(props) {
  return (
    <Icon {...props}>
      <path d="M10 5.5H6.5A1.5 1.5 0 0 0 5 7v10a1.5 1.5 0 0 0 1.5 1.5H10" />
      <path d="M13 12h6M17.5 8.5 20 12l-2.5 3.5" />
    </Icon>
  );
}

export function InventoryIcon(props) {
  return (
    <Icon {...props}>
      <path d="M6 8.5 12 5l6 3.5v8L12 20l-6-3.5v-8Z" />
      <path d="M12 5v15M6 8.5l6 3.5 6-3.5" />
    </Icon>
  );
}

export function ChatIcon(props) {
  return (
    <Icon {...props}>
      <path d="M6 6.5h12a2 2 0 0 1 2 2v5.5a2 2 0 0 1-2 2H10l-4 3.5V8.5a2 2 0 0 1 2-2Z" />
      <path d="M9 11h6M9 13.5h3.5" />
    </Icon>
  );
}

export function ReturnsIcon(props) {
  return (
    <Icon {...props}>
      <path d="M6 8.5 4 12l2 3.5" />
      <path d="M4 12h11a4 4 0 1 1 0 8H9" />
    </Icon>
  );
}

export function GownIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 4.5c1.8 0 3 1.2 3 2.8S13.2 10 12 10s-3-1-3-2.7 2.2-2.8 3-2.8Z" />
      <path d="M8.5 10 6 19.5h12l-2.5-9.5" />
      <path d="M9.5 14.5h5" />
    </Icon>
  );
}

export function HeartIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 19.5S5.5 15 5.5 10a3.5 3.5 0 0 1 6.2-2.2L12 9.5l.3-.7A3.5 3.5 0 0 1 18.5 10C18.5 15 12 19.5 12 19.5Z" />
    </Icon>
  );
}

export function BellIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 5.5a4 4 0 0 0-4 4v3.5l-1.5 2.5h11L16 13V9.5a4 4 0 0 0-4-4Z" />
      <path d="M10 18.5a2 2 0 0 0 4 0" />
    </Icon>
  );
}

export function ProfileIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8.5" r="3" />
      <path d="M6 19.5c.8-3 2.8-4.5 6-4.5s5.2 1.5 6 4.5" />
    </Icon>
  );
}

export function SearchIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="5.5" />
      <path d="M15.5 15.5 19 19" />
    </Icon>
  );
}

export function MenuIcon(props) {
  return (
    <Icon {...props}>
      <path d="M5 8h14M5 12h14M5 16h14" />
    </Icon>
  );
}

export function CheckIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </Icon>
  );
}

export function ClipboardIcon(props) {
  return (
    <Icon {...props}>
      <rect x="7" y="4.5" width="10" height="14" rx="1.5" />
      <path d="M9.5 4.5h5a1.5 1.5 0 0 1 1.5 1.5V7H8V6a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path d="M10 11.5h4M10 14.5h4" />
    </Icon>
  );
}

export function BagIcon(props) {
  return (
    <Icon {...props}>
      <path d="M8 9V7.5a4 4 0 1 1 8 0V9" />
      <path d="M6.5 9h11l-1 10.5H7.5L6.5 9Z" />
    </Icon>
  );
}

export function SparkleIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3" />
      <path d="m7.2 7.2 2.1 2.1M14.7 14.7l2.1 2.1M7.2 16.8l2.1-2.1M14.7 9.3l2.1-2.1" />
    </Icon>
  );
}

export function StarIcon(props) {
  return (
    <Icon {...props}>
      <path d="m12 5.5 1.6 3.5 3.8.6-2.7 2.6.6 3.8-3.4-1.8-3.4 1.8.6-3.8-2.7-2.6 3.8-.6L12 5.5Z" />
    </Icon>
  );
}

export function TrendUpIcon(props) {
  return (
    <Icon {...props}>
      <path d="M5 15.5 10 10l3.5 3.5L19 8" />
      <path d="M14 8h5v5" />
    </Icon>
  );
}

export function TrendDownIcon(props) {
  return (
    <Icon {...props}>
      <path d="M5 8.5 10 14l3.5-3.5L19 16" />
      <path d="M14 16h5v-5" />
    </Icon>
  );
}

const ICON_MAP = {
  dashboard: DashboardIcon,
  users: UsersIcon,
  shop: ShopIcon,
  calendar: CalendarIcon,
  chart: ChartIcon,
  shield: ShieldIcon,
  settings: SettingsIcon,
  logout: LogoutIcon,
  inventory: InventoryIcon,
  chat: ChatIcon,
  returns: ReturnsIcon,
  gown: GownIcon,
  heart: HeartIcon,
  bell: BellIcon,
  profile: ProfileIcon,
  search: SearchIcon,
  menu: MenuIcon,
  check: CheckIcon,
  clipboard: ClipboardIcon,
  bag: BagIcon,
  sparkle: SparkleIcon,
  star: StarIcon,
};

export function NavIcon({ name, active, tone, size = 20, className }) {
  const Component = ICON_MAP[name];
  if (!Component) return null;
  return <Component active={active} tone={tone} size={size} className={className} />;
}

export default ICON_MAP;
