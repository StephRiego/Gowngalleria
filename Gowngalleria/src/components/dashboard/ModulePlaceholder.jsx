import ModulePage from './ModulePage';

const MODULE_COPY = {
  'System Settings': {
    icon: 'settings',
    description:
      'Control system configuration, rules, and platform-wide policies for all shops and users.',
  },
  Reports: {
    icon: 'chart',
    description:
      'View overall system reports — sales, usage, and performance across every shop.',
  },
  'Audit Trail': {
    icon: 'shield',
    description:
      'Track all activities in the system for security, compliance, and monitoring.',
  },
  'Shop Management': {
    icon: 'shop',
    description: 'Manage your shop profile, business details, and storefront information.',
  },
  Inventory: {
    icon: 'inventory',
    description: 'Add, update, and monitor available gowns and products in your shop.',
  },
  Reservations: {
    icon: 'calendar',
    description: 'Handle customer bookings and reservation schedules.',
  },
  Chat: {
    icon: 'chat',
    description: 'Communicate with customers for inquiries, fittings, and support.',
  },
  'Customer Reports': {
    icon: 'chart',
    description: 'View customer-related activity, feedback, and engagement for your shop.',
  },
  Returns: {
    icon: 'returns',
    description: 'Manage product returns, refunds, and issue resolution.',
  },
  Profile: {
    icon: 'profile',
    description: 'Manage your personal account information and preferences.',
  },
};

export default function ModulePlaceholder({ title }) {
  const copy = MODULE_COPY[title] || {
    icon: 'sparkle',
    description: 'This module is coming soon.',
  };

  return (
    <ModulePage title={title} icon={copy.icon} description={copy.description}>
      <div className="glass-card p-8 text-center text-gg-gray text-sm">
        Module UI will connect to the API in the next development phase.
      </div>
    </ModulePage>
  );
}
