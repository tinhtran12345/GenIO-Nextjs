import { NavItem, NavSectionItems } from '@/components/nav-section';
import { env } from '@/config/envConfig';
import * as m from '@/paraglide/messages';
export const siteConfig = {
  title: m.meta_title,
  description: m.meta_description,
  test_message: m.test_message,
  keywords: () => [
    m.meta_keyword_nextjs(),
    m.meta_keyword_react(),
    m.meta_keyword_nextjs_starter(),
    m.meta_keyword_nextjs_boilerplate(),
    m.meta_keyword_starter_template(),
    m.meta_keyword_tailwindcss(),
    m.meta_keyword_typescript(),
    m.meta_keyword_shadcn_ui(),
    m.meta_keyword_next_auth(),
    m.meta_keyword_prisma(),
  ],
  url: () => env.APP_URL,
  googleSiteVerificationId: () => env.GOOGLE_SITE_VERIFICATION_ID || '',
};

export const pipelines: NavSectionItems = {
  label: 'Pipelines',
  icon: 'layers',
  items: [
    {
      label: 'Text Recognition',
      href: '/text-recognition',
      icon: 'textSelect',
    },
    {
      label: 'Data Extraction',
      href: '/data-extraction',
      icon: 'braces',
    },
    {
      label: 'Verification',
      href: '/verification',
      icon: 'checkCircle',
    },
  ],
};

export const organizedData: NavSectionItems = {
  label: 'Category Data',
  icon: 'grid',
  items: [
    {
      label: 'Receipts',
      href: '/receipts',
      icon: 'receipt',
    },
    {
      label: 'Invoices',
      href: '/invoices',
      icon: 'invoice',
    },
    {
      label: 'Card Statements',
      href: '/card-statements',
      icon: 'creditCard',
    },
  ],
};

export const generateImage: NavSectionItems = {
  label: 'Image',
  icon: 'image',
  items: [
    {
      label: 'Generate Image',
      href: '/generate',
      icon: 'generate',
    },
    {
      label: 'Resize image',
      href: '/resize-image',
      icon: 'resize',
    },
    {
      label: 'Remove Background',
      href: '/remove-background',
      icon: 'remove',
    },
  ],
};

export const settingItems: NavSectionItems = {
  label: 'Setting',
  icon: 'setting',
  items: [
    {
      label: 'Help',
      href: '/help',
      icon: 'help',
    },
    {
      label: 'Contact',
      href: '/contact',
      icon: 'contact',
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: 'settings',
    },
  ],
};
