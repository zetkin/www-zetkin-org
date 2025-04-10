import { IconArrowRight } from "@/icons/UIIcons";
import { useAccentColorContext } from "@/providers/AccentColorProvider";

export default function ArrowRight() {

  const { accentColor } = useAccentColorContext();

    return (
        <IconArrowRight
            height="24px"
            iconClasses={`stroke-z-${accentColor}`}
            width="24px"
        />
    )
}