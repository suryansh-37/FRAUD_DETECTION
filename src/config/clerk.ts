import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import { basePath } from '../services/blockchain';

export const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  ? publishableKeyFromHost(window.location.hostname, import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)
  : null;

export const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

export const appearance = {
  theme: shadcn,
  cssLayerName: 'clerk',
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: '#37463c',
    colorForeground: '#27332d',
    colorMutedForeground: '#68736c',
    colorBackground: '#f7f2eb',
    colorInput: '#eeeae3',
    colorInputForeground: '#27332d',
    colorDanger: '#a34e47',
    colorNeutral: '#d8d2c7',
    fontFamily: 'DM Sans, sans-serif',
    borderRadius: '8px',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'bg-[#f7f2eb] rounded-2xl w-[440px] max-w-full overflow-hidden',
    card: '!shadow-none !border-0 !bg-transparent',
    footer: '!shadow-none !border-0 !bg-transparent',
    headerTitle: 'text-[#27332d]',
    headerSubtitle: 'text-[#68736c]',
    socialButtonsBlockButtonText: 'text-[#27332d]',
    formFieldLabel: 'text-[#27332d]',
    footerActionLink: 'text-[#526647]',
    footerActionText: 'text-[#68736c]',
    dividerText: 'text-[#68736c]',
    logoBox: 'mb-4',
    logoImage: 'max-h-8',
    socialButtonsBlockButton: 'border-[#d8d2c7] bg-[#eeeae3]',
    formButtonPrimary: 'bg-[#37463c] hover:bg-[#27332d]',
    formFieldInput: 'border-[#d8d2c7] bg-[#eeeae3] text-[#27332d]',
    footerAction: 'text-[#68736c]',
    dividerLine: 'bg-[#d8d2c7]',
    alert: 'bg-[#f2dfd8]',
    otpCodeFieldInput: 'border-[#d8d2c7]',
    formFieldRow: 'gap-1',
    main: 'gap-4',
  },
};
