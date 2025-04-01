// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import sharp from 'sharp'; // sharp-import
import path from 'path';
import { buildConfig, PayloadRequest } from 'payload';
import { fileURLToPath } from 'url';

import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Users } from './collections/Users';
import { plugins } from './plugins';
import { defaultLexical } from '@/fields/defaultLexical';
import { getServerSideURL } from './utilities/getURL';
import { MainNav } from './MainNav/config';
import { People } from './collections/People';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    components: {},
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Pages, Media, Users, People],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [MainNav],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) {
          return true;
        }

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization');
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [],
  },
});
