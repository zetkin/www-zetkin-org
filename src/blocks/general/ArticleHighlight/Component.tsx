import { ImageMedia } from '@/components/Media/ImageMedia';
import { ArticleHighlightBlock as ArticleHighlightBlockProps } from '@/payload-types';
import { CMSLink as Link } from '@/components/Link';
import LinkText from './LinkText';

export const ArticleHighlightBlock: React.FC<ArticleHighlightBlockProps> = ({
  articles,
}) => {
  function removeSurroundingQuotes(text: string) {
    return text.replace(/^(["'“”‘’])|(["'“”‘’])$/g, '');
  }

  return (
    <div className="flex px-5 w-full justify-center">
      <div className={`flex flex-col md:flex-row md:max-w-250`}>
        {articles?.map((article, i) => (
          <div
            key={i}
            className="flex flex-col w-full gap-5 first:pb-13 first:border-b last:pt-13 md:first:pb-0 md:first:border-b-0 md:last:pt-0 md:first:pr-10 md:first:border-r md:last:pl-10"
          >
            <div className="flex gap-8 items-center">
              <div className="relative block w-25 h-25 rounded-full overflow-clip">
                <ImageMedia fill resource={article.image} />
              </div>
              <div className="flex-1 flex">
                <h5 className="md:text-2xl leading-[1.7]">&ldquo;</h5>
                <h5 className="md:text-2xl leading-[1.7]">
                  {removeSurroundingQuotes(article.quote)}
                  <span>&rdquo;</span>
                </h5>
              </div>
            </div>
            <p className="leading-[1.7] text-lg">{article.description}</p>
            {!article.hideLink && article.link?.url && (
              <Link url={article.link.url}>
                <LinkText>{article.linkText}</LinkText>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
