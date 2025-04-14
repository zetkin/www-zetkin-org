/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    pages: Page;
    media: Media;
    users: User;
    people: Person;
    tags: Tag;
    events: Event;
    jobs: Job;
    redirects: Redirect;
    'payload-jobs': PayloadJob;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    pages: PagesSelect<false> | PagesSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    people: PeopleSelect<false> | PeopleSelect<true>;
    tags: TagsSelect<false> | TagsSelect<true>;
    events: EventsSelect<false> | EventsSelect<true>;
    jobs: JobsSelect<false> | JobsSelect<true>;
    redirects: RedirectsSelect<false> | RedirectsSelect<true>;
    'payload-jobs': PayloadJobsSelect<false> | PayloadJobsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    mainNav: MainNav;
  };
  globalsSelect: {
    mainNav: MainNavSelect<false> | MainNavSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: {
      schedulePublish: TaskSchedulePublish;
      inline: {
        input: unknown;
        output: unknown;
      };
    };
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  title: string;
  hero?: {
    layout?:
      | ('none' | 'twoImgLeft' | 'twoImgCenter' | 'oneImgLeft' | 'oneImgCenter' | 'featureLeft' | 'featureCenter')
      | null;
    width?: ('full' | 'article') | null;
    eyebrowHeading?: string | null;
    title?: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    } | null;
    subtitle?: string | null;
    readTime?: number | null;
    images?:
      | {
          image: string | Media;
          id?: string | null;
        }[]
      | null;
  };
  layout?:
    | (
        | LandingBlock
        | GradientBlock
        | WhiteBg
        | PreambleBlock
        | PeopleHighlightBlock
        | ArticleBlock
        | FeatureListBlock
        | PeopleListBlock
        | EventListBlock
        | JobsListBlock
      )[]
    | null;
  meta?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (string | null) | Media;
    description?: string | null;
  };
  publishedAt?: string | null;
  slug?: string | null;
  slugLock?: boolean | null;
  parent?: (string | null) | Page;
  breadcrumbs?:
    | {
        doc?: (string | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt?: string | null;
  caption?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    square?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    small?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    medium?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    large?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    xlarge?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    og?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LandingBlock".
 */
export interface LandingBlock {
  leftTitle: string;
  rightTitle: string;
  subtitle: string;
  buttons?:
    | {
        label: string;
        variant?: ('primary' | 'outline') | null;
        link?: {
          type?: ('reference' | 'custom') | null;
          reference?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          url?: string;
          newTab?: boolean | null;
        };
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'landing';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "GradientBlock".
 */
export interface GradientBlock {
  layout: 'rightAligned1' | 'leftAligned1' | 'leftAligned2' | 'singleImageLeftOverlap' | 'singleImageLeftBottomOverlap';
  title: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  subtitle: string;
  buttons?:
    | {
        label: string;
        link?: {
          type?: ('reference' | 'custom') | null;
          reference?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          url?: string;
          newTab?: boolean | null;
        };
        id?: string | null;
      }[]
    | null;
  backgroundImageDesktop: string | Media;
  backgroundImageMobile: string | Media;
  images: {
    image: string | Media;
    id?: string | null;
  }[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'gradient';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "WhiteBg".
 */
export interface WhiteBg {
  layout?: ('uiCenter' | 'uiLeft' | 'imagesCenter' | 'imagesLeft' | 'imagesRight' | 'illustration') | null;
  accentColor?: ('purple' | 'green' | 'red') | null;
  title: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  subtitle: string;
  buttons?:
    | {
        label: string;
        variant: 'primary' | 'outline';
        link?: {
          type?: ('reference' | 'custom') | null;
          reference?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          url?: string;
          newTab?: boolean | null;
        };
        id?: string | null;
      }[]
    | null;
  images: {
    image: string | Media;
    id?: string | null;
  }[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'whiteBg';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PreambleBlock".
 */
export interface PreambleBlock {
  /**
   * If the page is an article only use the "Preamble only" layout.
   */
  layout: 'longHeaderNText' | 'longPreambleNText' | 'preambleOnly' | 'preambleHeaderTextNImage' | 'preambleNImage';
  width?: ('full' | 'article') | null;
  preamble?: string | null;
  header?: string | null;
  mainText?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  image?: (string | null) | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'preamble';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PeopleHighlightBlock".
 */
export interface PeopleHighlightBlock {
  borderTop?: boolean | null;
  linkColor?: ('purple' | 'red' | 'green') | null;
  people?:
    | {
        image: string | Media;
        quote: string;
        description: string;
        link?: {
          type?: ('reference' | 'custom') | null;
          reference?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          url?: string;
          newTab?: boolean | null;
        };
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'peopleHighlight';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ArticleBlock".
 */
export interface ArticleBlock {
  author?: (string | null) | Person;
  socialLink?: ('email' | 'github' | 'linkedIn' | 'instagram' | 'otherLink')[] | null;
  richText?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'article';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "people".
 */
export interface Person {
  id: string;
  name: string;
  pronouns?: string | null;
  photo: string | Media;
  role: string;
  tags?: (string | Tag)[] | null;
  email?: string | null;
  linkedIn?: string | null;
  github?: string | null;
  instagram?: string | null;
  otherLink?: string | null;
  /**
   * If the person has a dedicated profile piece written about them, add the link here.
   */
  profilePiece?: (string | null) | Page;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: string;
  name: string;
  type: ('people' | 'events' | 'jobs')[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "featureListBlock".
 */
export interface FeatureListBlock {
  header?: string | null;
  subHeader?: string | null;
  features: {
    featureName?: string | null;
    icon?: ('banana' | 'bean' | 'apple') | null;
    header?: string | null;
    description?: string | null;
    illustration?: (string | null) | Media;
    /**
     * Negative value for image to go to left, positive to right. Default for odd items is -20px and for even items 20px.
     */
    offset?: number | null;
    link?: (string | null) | Page;
    id?: string | null;
  }[];
  buttons: {
    label?: string | null;
    variant?: ('primary' | 'outline') | null;
    id?: string | null;
  }[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'featureList';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "peopleListBlock".
 */
export interface PeopleListBlock {
  /**
   * If "Wrap in accordion" is not selected, please only add one list here.
   */
  lists?:
    | {
        title: string;
        peopleTag: string | Tag;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'peopleList';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "eventListBlock".
 */
export interface EventListBlock {
  listHeader?: string | null;
  tag: string | Tag;
  id?: string | null;
  blockName?: string | null;
  blockType: 'eventList';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "jobsListBlock".
 */
export interface JobsListBlock {
  title: string;
  jobsTag: string | Tag;
  id?: string | null;
  blockName?: string | null;
  blockType: 'jobsList';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: string;
  title: string;
  tags?: (string | Tag)[] | null;
  image: string | Media;
  startDate: string;
  endDate?: string | null;
  online?: boolean | null;
  city?: string | null;
  address?: string | null;
  /**
   * @minItems 2
   * @maxItems 2
   */
  geotag?: [number, number] | null;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "jobs".
 */
export interface Job {
  id: string;
  title: string;
  tags: (string | Tag)[];
  location: string;
  mailAddress: string;
  employmentType?: string | null;
  description: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: string;
  /**
   * You will need to rebuild the website when changing this field.
   */
  from: string;
  to?: {
    type?: ('reference' | 'custom') | null;
    reference?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
    url?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-jobs".
 */
export interface PayloadJob {
  id: string;
  /**
   * Input data provided to the job
   */
  input?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  taskStatus?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  completedAt?: string | null;
  totalTried?: number | null;
  /**
   * If hasError is true this job will not be retried
   */
  hasError?: boolean | null;
  /**
   * If hasError is true, this is the error that caused it
   */
  error?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  /**
   * Task execution log
   */
  log?:
    | {
        executedAt: string;
        completedAt: string;
        taskSlug: 'inline' | 'schedulePublish';
        taskID: string;
        input?:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        output?:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        state: 'failed' | 'succeeded';
        error?:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        id?: string | null;
      }[]
    | null;
  taskSlug?: ('inline' | 'schedulePublish') | null;
  queue?: string | null;
  waitUntil?: string | null;
  processing?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'pages';
        value: string | Page;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'people';
        value: string | Person;
      } | null)
    | ({
        relationTo: 'tags';
        value: string | Tag;
      } | null)
    | ({
        relationTo: 'events';
        value: string | Event;
      } | null)
    | ({
        relationTo: 'jobs';
        value: string | Job;
      } | null)
    | ({
        relationTo: 'redirects';
        value: string | Redirect;
      } | null)
    | ({
        relationTo: 'payload-jobs';
        value: string | PayloadJob;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  hero?:
    | T
    | {
        layout?: T;
        width?: T;
        eyebrowHeading?: T;
        title?: T;
        subtitle?: T;
        readTime?: T;
        images?:
          | T
          | {
              image?: T;
              id?: T;
            };
      };
  layout?:
    | T
    | {
        landing?: T | LandingBlockSelect<T>;
        gradient?: T | GradientBlockSelect<T>;
        whiteBg?: T | WhiteBgSelect<T>;
        preamble?: T | PreambleBlockSelect<T>;
        peopleHighlight?: T | PeopleHighlightBlockSelect<T>;
        article?: T | ArticleBlockSelect<T>;
        featureList?: T | FeatureListBlockSelect<T>;
        peopleList?: T | PeopleListBlockSelect<T>;
        eventList?: T | EventListBlockSelect<T>;
        jobsList?: T | JobsListBlockSelect<T>;
      };
  meta?:
    | T
    | {
        title?: T;
        image?: T;
        description?: T;
      };
  publishedAt?: T;
  slug?: T;
  slugLock?: T;
  parent?: T;
  breadcrumbs?:
    | T
    | {
        doc?: T;
        url?: T;
        label?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LandingBlock_select".
 */
export interface LandingBlockSelect<T extends boolean = true> {
  leftTitle?: T;
  rightTitle?: T;
  subtitle?: T;
  buttons?:
    | T
    | {
        label?: T;
        variant?: T;
        link?:
          | T
          | {
              type?: T;
              reference?: T;
              url?: T;
              newTab?: T;
            };
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "GradientBlock_select".
 */
export interface GradientBlockSelect<T extends boolean = true> {
  layout?: T;
  title?: T;
  subtitle?: T;
  buttons?:
    | T
    | {
        label?: T;
        link?:
          | T
          | {
              type?: T;
              reference?: T;
              url?: T;
              newTab?: T;
            };
        id?: T;
      };
  backgroundImageDesktop?: T;
  backgroundImageMobile?: T;
  images?:
    | T
    | {
        image?: T;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "WhiteBg_select".
 */
export interface WhiteBgSelect<T extends boolean = true> {
  layout?: T;
  accentColor?: T;
  title?: T;
  subtitle?: T;
  buttons?:
    | T
    | {
        label?: T;
        variant?: T;
        link?:
          | T
          | {
              type?: T;
              reference?: T;
              url?: T;
              newTab?: T;
            };
        id?: T;
      };
  images?:
    | T
    | {
        image?: T;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PreambleBlock_select".
 */
export interface PreambleBlockSelect<T extends boolean = true> {
  layout?: T;
  width?: T;
  preamble?: T;
  header?: T;
  mainText?: T;
  image?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PeopleHighlightBlock_select".
 */
export interface PeopleHighlightBlockSelect<T extends boolean = true> {
  borderTop?: T;
  linkColor?: T;
  people?:
    | T
    | {
        image?: T;
        quote?: T;
        description?: T;
        link?:
          | T
          | {
              type?: T;
              reference?: T;
              url?: T;
              newTab?: T;
            };
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ArticleBlock_select".
 */
export interface ArticleBlockSelect<T extends boolean = true> {
  author?: T;
  socialLink?: T;
  richText?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "featureListBlock_select".
 */
export interface FeatureListBlockSelect<T extends boolean = true> {
  header?: T;
  subHeader?: T;
  features?:
    | T
    | {
        featureName?: T;
        icon?: T;
        header?: T;
        description?: T;
        illustration?: T;
        offset?: T;
        link?: T;
        id?: T;
      };
  buttons?:
    | T
    | {
        label?: T;
        variant?: T;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "peopleListBlock_select".
 */
export interface PeopleListBlockSelect<T extends boolean = true> {
  lists?:
    | T
    | {
        title?: T;
        peopleTag?: T;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "eventListBlock_select".
 */
export interface EventListBlockSelect<T extends boolean = true> {
  listHeader?: T;
  tag?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "jobsListBlock_select".
 */
export interface JobsListBlockSelect<T extends boolean = true> {
  title?: T;
  jobsTag?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  caption?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        square?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        small?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        medium?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        large?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        xlarge?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        og?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "people_select".
 */
export interface PeopleSelect<T extends boolean = true> {
  name?: T;
  pronouns?: T;
  photo?: T;
  role?: T;
  tags?: T;
  email?: T;
  linkedIn?: T;
  github?: T;
  instagram?: T;
  otherLink?: T;
  profilePiece?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags_select".
 */
export interface TagsSelect<T extends boolean = true> {
  name?: T;
  type?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events_select".
 */
export interface EventsSelect<T extends boolean = true> {
  title?: T;
  tags?: T;
  image?: T;
  startDate?: T;
  endDate?: T;
  online?: T;
  city?: T;
  address?: T;
  geotag?: T;
  description?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "jobs_select".
 */
export interface JobsSelect<T extends boolean = true> {
  title?: T;
  tags?: T;
  location?: T;
  mailAddress?: T;
  employmentType?: T;
  description?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects_select".
 */
export interface RedirectsSelect<T extends boolean = true> {
  from?: T;
  to?:
    | T
    | {
        type?: T;
        reference?: T;
        url?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-jobs_select".
 */
export interface PayloadJobsSelect<T extends boolean = true> {
  input?: T;
  taskStatus?: T;
  completedAt?: T;
  totalTried?: T;
  hasError?: T;
  error?: T;
  log?:
    | T
    | {
        executedAt?: T;
        completedAt?: T;
        taskSlug?: T;
        taskID?: T;
        input?: T;
        output?: T;
        state?: T;
        error?: T;
        id?: T;
      };
  taskSlug?: T;
  queue?: T;
  waitUntil?: T;
  processing?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "mainNav".
 */
export interface MainNav {
  id: string;
  topItems?:
    | {
        label?: string | null;
        longLabel?: string | null;
        color?: ('purple' | 'red' | 'green') | null;
        showInFooter?: boolean | null;
        link?: {
          type?: ('reference' | 'custom') | null;
          reference?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          url?: string;
          newTab?: boolean | null;
        };
        midItems?:
          | {
              icon?: (string | null) | Media;
              label?: string | null;
              description?: string | null;
              showInFooter?: boolean | null;
              link?: {
                type?: ('reference' | 'custom') | null;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string;
                newTab?: boolean | null;
              };
              bottomItems?:
                | {
                    label?: string | null;
                    link?: {
                      type?: ('reference' | 'custom') | null;
                      reference?: {
                        relationTo: 'pages';
                        value: string | Page;
                      } | null;
                      url?: string;
                      newTab?: boolean | null;
                    };
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  socialLinks?:
    | {
        platform: 'instagram' | 'facebook' | 'github';
        link: string;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "mainNav_select".
 */
export interface MainNavSelect<T extends boolean = true> {
  topItems?:
    | T
    | {
        label?: T;
        longLabel?: T;
        color?: T;
        showInFooter?: T;
        link?:
          | T
          | {
              type?: T;
              reference?: T;
              url?: T;
              newTab?: T;
            };
        midItems?:
          | T
          | {
              icon?: T;
              label?: T;
              description?: T;
              showInFooter?: T;
              link?:
                | T
                | {
                    type?: T;
                    reference?: T;
                    url?: T;
                    newTab?: T;
                  };
              bottomItems?:
                | T
                | {
                    label?: T;
                    link?:
                      | T
                      | {
                          type?: T;
                          reference?: T;
                          url?: T;
                          newTab?: T;
                        };
                    id?: T;
                  };
              id?: T;
            };
        id?: T;
      };
  socialLinks?:
    | T
    | {
        platform?: T;
        link?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TaskSchedulePublish".
 */
export interface TaskSchedulePublish {
  input: {
    type?: ('publish' | 'unpublish') | null;
    locale?: string | null;
    doc?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
    global?: string | null;
    user?: (string | null) | User;
  };
  output?: unknown;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TextWithQuoteBlock".
 */
export interface TextWithQuoteBlock {
  richText: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  quote: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'textWithQuote';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "twoImageBlock".
 */
export interface TwoImageBlock {
  layout?: ('oneImg' | 'twoImg') | null;
  images: {
    image?: (string | null) | Media;
    description?: string | null;
    id?: string | null;
  }[];
  mobileOverflow?: ('left' | 'right') | null;
  desktopOverflow?: boolean | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'twoImage';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "oneImageBlock".
 */
export interface OneImageBlock {
  images: {
    image?: (string | null) | Media;
    description?: string | null;
    id?: string | null;
  }[];
  mobileOverflow?: ('left' | 'right') | null;
  desktopOverflow?: boolean | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'oneImage';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "buttonBlock".
 */
export interface ButtonBlock {
  buttons: {
    label?: string | null;
    variant?: ('primary' | 'outline') | null;
    link?: {
      type?: ('reference' | 'custom') | null;
      reference?: {
        relationTo: 'pages';
        value: string | Page;
      } | null;
      url?: string;
      newTab?: boolean | null;
    };
    id?: string | null;
  }[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'button';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "infoBoxBlock".
 */
export interface InfoBoxBlock {
  richText: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'infoBox';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}