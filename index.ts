import { message } from '@vavt/message';

import './index.less';

(() => {
  document.getElementById('changeTheme')!.onclick = () => {
    const theme = document.documentElement.dataset.theme || 'light';
    document.documentElement.dataset.theme = theme === 'dark' ? '' : 'dark';
  };

  document.getElementById('info')!.onclick = () => {
    message.info('message.info(msg);');
  };

  document.getElementById('warning')!.onclick = () => {
    message.warning('message.warning(msg);');
  };
  document.getElementById('success')!.onclick = () => {
    message.success('message.success(msg);');
  };

  document.getElementById('success-c')!.onclick = () => {
    message.success(`message.success(msg, { closeable: true });`, {
      closeable: true,
    });
  };

  document.getElementById('error')!.onclick = () => {
    message.error('message.error(msg);');
  };

  document.getElementById('error-6')!.onclick = () => {
    message.error(`message.error(msg, { duration: 6000 });`, {
      duration: 6000,
    });
  };

  document.getElementById('duration0')!.onclick = () => {
    message.info('message.info(msg, { duration: 0 });', { duration: 0 });
  };

  document.getElementById('single')!.onclick = () => {
    message.info('message.info(msg, { single: true });', { single: true });
  };

  document.getElementById('closeAll')!.onclick = () => {
    message.closeAll();
  };
})();
