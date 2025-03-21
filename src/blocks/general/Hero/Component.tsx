import { HeroBlock as HeroBlockProps } from '@/payload-types';

export const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  const { layout, title, accentColor, readTime, images = [] } = props;

  return (
    <div className="">
      <p>Hero</p>
    </div>
  );
};
