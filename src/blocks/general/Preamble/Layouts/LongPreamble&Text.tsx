import RichText from "@/components/RichText";
import { LayoutProps } from "./LayoutProps";

export default function LongPreambleNText({
    preamble,
    mainText,
}: LayoutProps) {

    return (
        <div className="w-full flex flex-col gap-5 sm:max-w-250 md:grid md:grid-cols-2 md:gap-15">
            {preamble &&
                <h6>
                    {preamble}
                </h6>
            }
            {mainText &&
                <RichText data={mainText} enableGutter={false} />
            }
        </div>
    )
}