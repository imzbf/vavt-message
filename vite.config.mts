import { ConfigEnv, UserConfigExport } from 'vite';
import { homepage } from './package.json';

export default ({ mode }: ConfigEnv): UserConfigExport => {
  return {
    base: mode === 'preview' ? homepage : '/',
    build: {
      outDir: mode === 'preview' ? 'docs' : 'dist',
    },
  };
};
