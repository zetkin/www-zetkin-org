import { LayoutProps } from './LayoutProps';

export default function Simple({ eyebrowHeading, subtitle }: LayoutProps) {
  return (
    <div className="flex flex-col w-full md:max-w-250 gap-2">
      {eyebrowHeading && <p className="">{eyebrowHeading}</p>}
      <h3>{subtitle}</h3>
    </div>
  );
}
