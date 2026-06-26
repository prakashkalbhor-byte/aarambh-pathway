// Lucide-style icons, hand-rolled as React components.
// Stroke 1.6 for a refined, professional weight.

const Icon = ({ children, size = 18, className = "", ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...rest}
  >
    {children}
  </svg>
);

const IconClipboardCheck = (p) => (
  <Icon {...p}>
    <rect x="8" y="3" width="8" height="4" rx="1" />
    <path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </Icon>
);
const IconLayoutDashboard = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </Icon>
);
const IconShieldCheck = (p) => (
  <Icon {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);
const IconTruck = (p) => (
  <Icon {...p}>
    <path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2" />
    <path d="M14 8h4l3 4v5a1 1 0 0 1-1 1h-2" />
    <circle cx="7.5" cy="18.5" r="2" />
    <circle cx="17.5" cy="18.5" r="2" />
  </Icon>
);
const IconCheck = (p) => (
  <Icon {...p}>
    <path d="m5 12 5 5L20 7" />
  </Icon>
);
const IconCheckCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5L16 9.5" />
  </Icon>
);
const IconX = (p) => (
  <Icon {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
);
const IconXCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 9 6 6M15 9l-6 6" />
  </Icon>
);
const IconAlertTriangle = (p) => (
  <Icon {...p}>
    <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </Icon>
);
const IconInfo = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </Icon>
);
const IconChevronRight = (p) => (
  <Icon {...p}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);
const IconChevronLeft = (p) => (
  <Icon {...p}>
    <path d="m15 6-6 6 6 6" />
  </Icon>
);
const IconChevronDown = (p) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);
const IconArrowUpRight = (p) => (
  <Icon {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Icon>
);
const IconSearch = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);
const IconBell = (p) => (
  <Icon {...p}>
    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Icon>
);
const IconUpload = (p) => (
  <Icon {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M17 8 12 3 7 8" />
    <path d="M12 3v12" />
  </Icon>
);
const IconFile = (p) => (
  <Icon {...p}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6" />
  </Icon>
);
const IconFileText = (p) => (
  <Icon {...p}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6" />
    <path d="M8 13h8M8 17h6" />
  </Icon>
);
const IconBuilding = (p) => (
  <Icon {...p}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />
  </Icon>
);
const IconBank = (p) => (
  <Icon {...p}>
    <path d="M3 10 12 4l9 6" />
    <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
    <path d="M3 20h18" />
  </Icon>
);
const IconReceipt = (p) => (
  <Icon {...p}>
    <path d="M4 4v17l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1Z" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </Icon>
);
const IconCircleDollar = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15 9h-3.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3H9" />
    <path d="M12 7v2M12 15v2" />
  </Icon>
);
const IconPackage = (p) => (
  <Icon {...p}>
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
    <path d="m21 16-9 5-9-5V8l9-5 9 5Z" />
  </Icon>
);
const IconClock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);
const IconCircleHelp = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
    <path d="M12 17h.01" />
  </Icon>
);
const IconDownload = (p) => (
  <Icon {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
    <path d="M12 15V3" />
  </Icon>
);
const IconEye = (p) => (
  <Icon {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);
const IconFilter = (p) => (
  <Icon {...p}>
    <path d="M3 5h18l-7 8v6l-4-2v-4Z" />
  </Icon>
);
const IconDots = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="6" r="1.2" />
    <circle cx="12" cy="12" r="1.2" />
    <circle cx="12" cy="18" r="1.2" />
  </Icon>
);
const IconLogout = (p) => (
  <Icon {...p}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <path d="M10 17l-5-5 5-5" />
    <path d="M15 12H5" />
  </Icon>
);
const IconSettings = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
  </Icon>
);
const IconShield = (p) => (
  <Icon {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  </Icon>
);
const IconMessageSquare = (p) => (
  <Icon {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  </Icon>
);
const IconRefresh = (p) => (
  <Icon {...p}>
    <path d="M21 12a9 9 0 0 1-15.4 6.4L3 16" />
    <path d="M3 12a9 9 0 0 1 15.4-6.4L21 8" />
    <path d="M21 3v5h-5M3 21v-5h5" />
  </Icon>
);
const IconSparkles = (p) => (
  <Icon {...p}>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    <path d="m6 6 2 2M16 16l2 2M6 18l2-2M16 8l2-2" />
  </Icon>
);
const IconPlus = (p) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
const IconCalendar = (p) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </Icon>
);
const IconUser = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </Icon>
);

Object.assign(window, {
  Icon,
  IconClipboardCheck, IconLayoutDashboard, IconShieldCheck, IconTruck,
  IconCheck, IconCheckCircle, IconX, IconXCircle,
  IconAlertTriangle, IconInfo, IconChevronRight, IconChevronLeft, IconChevronDown,
  IconArrowUpRight, IconSearch, IconBell, IconUpload, IconFile, IconFileText,
  IconBuilding, IconBank, IconReceipt, IconCircleDollar, IconPackage,
  IconClock, IconCircleHelp, IconDownload, IconEye, IconFilter, IconDots,
  IconLogout, IconSettings, IconShield, IconMessageSquare, IconRefresh,
  IconSparkles, IconPlus, IconCalendar, IconUser,
});
