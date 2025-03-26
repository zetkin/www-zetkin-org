import { Button } from '@/components/ui/button';
import type { ButtonBlock as ButtonBlockProps } from '@/payload-types';

export const ButtonBlock: React.FC<ButtonBlockProps> = ({ buttons }) => {
  return (
    <div className="flex flex-col gap-4 items-start">
      {buttons.map((button, i) => (
        <Button key={i} variant={button.variant}>
          {button.label}
        </Button>
      ))}
    </div>
  );
};
