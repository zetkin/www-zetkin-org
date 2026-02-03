import { ImageMedia } from '@/components/Media/ImageMedia';
import { PageHighlightBlock as PageHighlightBlockProps } from '@/payload-types';
import { CMSLink as Link } from '@/components/Link';
import LinkText from '../ArticleHighlight/LinkText';

export const PageHighlightBlock: React.FC<PageHighlightBlockProps> = ({
  pages,
}) => {
  return (
    <div className="flex px-5 w-full justify-center">
      <div className="flex flex-col md:flex-row md:max-w-250 gap-15 md:gap-7 lg:gap-15">
        {pages?.map((page, i) => (
          <div key={i} className="flex flex-col w-full gap-5">
            <div className="relative w-full aspect-[2/1] overflow-clip">
              <ImageMedia
                fill
                imgClassName="object-cover"
                resource={page.image}
              />
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-2xl font-semibold leading-[1.7]">
                {page.heading}
              </h4>
              <p className="leading-[1.7] text-lg">{page.description}</p>
              {!page.hideLink && page.link?.url && (
                <Link url={page.link.url}>
                  <LinkText>{page.linkText}</LinkText>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
