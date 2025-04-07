import { LayoutProps } from './LayoutProps';

export default function PreambleOnly({ preamble, width }: LayoutProps) {
  return (
    <div
      className={`w-full
    ${width === 'full' ? 'md:max-w-250' : 'md:max-w-[550px] md:mr-20'}
    `}
    >
      {preamble && <h6 className="md:mr-20">{preamble}</h6>}
    </div>
  );
}
