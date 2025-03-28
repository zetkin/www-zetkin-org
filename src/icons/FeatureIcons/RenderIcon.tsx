import { IconApple, IconBanana, IconBean } from '.';

export const icons = {
  banana: IconBanana,
  bean: IconBean,
  apple: IconApple,
};

export const FeatureIcon = ({
  icon,
  width,
  height,
  color,
  iconClasses,
}: {
  icon: keyof typeof icons;
  width: string;
  height: string;
  color?: string;
  iconClasses?: string;
}) => {
  if (!icon) {
    return null;
  }

  const IconToRender = icons[icon];

  if (!IconToRender) {
    return null;
  }

  return (
    <IconToRender
      color={color}
      height={height}
      iconClasses={iconClasses}
      width={width}
    />
  );
};
