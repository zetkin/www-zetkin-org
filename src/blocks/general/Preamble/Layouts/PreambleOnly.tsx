import { LayoutProps } from './LayoutProps';

export default function PreambleOnly({ preamble }: LayoutProps) {
  return (
    <div className="w-full sm:max-w-250">
      {preamble && <h6 className="md:mr-20">{preamble}</h6>}
    </div>
  );
}
