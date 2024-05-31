import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const resolvePath = (p: string) => path.resolve(__dirname, p);

!(async () => {
  build({
    base: '/',
    publicDir: false,
    build: {
      emptyOutDir: false,
      cssCodeSplit: true,
      outDir: resolvePath('../lib'),
      lib: {
        entry: {
          index: resolvePath('../index.ts'),
        },
        name: 'VavtMessage',
        formats: ['es', 'umd'],
      },
    },
  });
})();
