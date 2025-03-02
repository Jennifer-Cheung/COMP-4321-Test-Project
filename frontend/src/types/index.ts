import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Entry = {
  title: string;
  url: string;
  content: string;
};
