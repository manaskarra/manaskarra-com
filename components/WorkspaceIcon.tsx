import type { SVGProps } from "react";

const paths = {
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-8H9v8H4a1 1 0 0 1-1-1Z" /></>,
  folder: <path d="M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V4h8v3M3 12a22 22 0 0 0 18 0M12 11v4" /></>,
  note: <><path d="M14 3H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9Z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></>,
  music: <><path d="M4 10v4M8 6v12M12 3v18M16 8v8M20 5v14" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  code: <><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></>,
  arrow: <><path d="M6 18 18 6M6 6h12v12" /></>,
  chevron: <path d="m9 5 7 7-7 7" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  panel: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></>,
} as const;

export type WorkspaceIconName = keyof typeof paths;

export function WorkspaceIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: WorkspaceIconName }) {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
