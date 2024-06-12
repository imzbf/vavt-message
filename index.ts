interface MessageOptions {
  class?: string;
  single?: boolean;
  offsetTop?: number;
  duration?: number;
  closeable?: boolean;
  darkSelector?: string;
  zIndex?: number;
}

type StrikeMessageOptions = Omit<MessageOptions, 'darkSelector'>;

interface MessageObj {
  top: number;
  ele: HTMLElement;
  offsetTop: number;
}

export type MessageTypes = 'info' | 'warning' | 'success' | 'error';

const PREFIX = 'vavt';

const CSS_TEXT = `@keyframes ${PREFIX}FadeInDown{0%{opacity:0;transform:translate3d(-50%,-100%,0)}to{opacity:1;transform:translate3d(-50%,0,0)}}@keyframes ${PREFIX}FadeOutUp{0%{opacity:1}to{opacity:0;transform:translate3d(-50%,-100%,0)}}.${PREFIX}-fid{animation-name:${PREFIX}FadeInDown;animation-duration:.3s;animation-fill-mode:both}.${PREFIX}-fou{animation-name:${PREFIX}FadeOutUp;animation-duration:.3s;animation-fill-mode:both}.${PREFIX}-message{position:fixed;left:50%;transform:translate(-50%);padding:10px 16px;border-radius:4px;color:#fff;font-size:14px;line-height:normal;transition:top .5s ease}.${PREFIX}-message.${PREFIX}-closeable{padding:10px 40px 10px 16px}.${PREFIX}-icon{width:18px;height:18px;margin-right:8px;vertical-align:sub}.${PREFIX}-icon-close{width:16px;height:16px;margin-right:0;cursor:pointer;position:absolute;right:16px;top:50%;transform:translateY(-50%)}.${PREFIX}-message-info{color:#333;background-color:#e3e3e3}.${PREFIX}-message-warning{color:#ff9104;background-color:#ffe9cc}.${PREFIX}-message-success{color:#00c852;background-color:#c1f1d5}.${PREFIX}-message-error{color:#d32f2f;background-color:#ffd8d8}:root[data-theme=dark] .${PREFIX}-message-info{color:#999;background-color:#212121}:root[data-theme=dark] .${PREFIX}-message-warning{color:#ed8500;background-color:#3c2200}:root[data-theme=dark] .${PREFIX}-message-success{color:#00c551;background-color:#003014}:root[data-theme=dark] .${PREFIX}-message-error{color:#ef1d1d;background-color:#3b0000}`;
const CSS_ID = `${PREFIX}-message-css`;

const ICONS: { [key in MessageTypes]: string } = {
  info: `<svg class="${PREFIX}-icon" viewBox="0 0 1024 1024"><path d="M53.312 512a458.688 458.688 0 1 0 917.376 0A458.688 458.688 0 0 0 53.312 512z m445.12-41.472a63.488 63.488 0 0 1 37.504 17.536 63.488 63.488 0 0 1 17.6 37.504c1.152 8.768 1.152 18.88 1.152 27.392v172.352a42.688 42.688 0 1 1-85.376 0V554.688a42.688 42.688 0 1 1 0-85.376h1.728c8.512 0 18.688 0 27.392 1.216z m13.376-171.84h0.384c23.488 0 42.496 19.072 42.496 42.624A42.56 42.56 0 0 1 512.192 384h-0.384a42.56 42.56 0 0 1-42.496-42.688c0-23.552 19.008-42.624 42.496-42.624z" fill="currentColor"></path></svg>`,
  warning: `<svg class="${PREFIX}-icon" viewBox="0 0 1024 1024"><path d="M512 62a450 450 0 1 0 450 450 450 450 0 0 0-450-450z m0 705.9375a47.8125 47.8125 0 0 1-47.8125-47.8125 47.8125 47.8125 0 1 1 95.625 0 47.8125 47.8125 0 0 1-47.8125 47.8125z m47.8125-240.1875a47.8125 47.8125 0 1 1-95.625 0v-225a47.8125 47.8125 0 0 1 95.625 0z" fill="currentColor"></path></svg>`,
  success: `<svg class="${PREFIX}-icon" viewBox="0 0 1024 1024"><path d="M830.26919551 193.71282208A448.95978018 448.95978018 0 0 0 511.99736328 62.00182813a448.163492 448.163492 0 0 0-318.26919551 131.71099394c-175.62110362 175.49981455-175.62110362 461.0579124 1e-8 636.55684804a448.21534747 448.21534747 0 0 0 318.2691955 131.71099395A447.25118818 447.25118818 0 0 0 830.26919551 830.26967012c175.63780283-175.49981455 175.63780283-461.0579124-1e-8-636.55684804zM778.25821484 394.41173135L475.96400263 716.0225249a13.49998594 13.49998594 0 0 1-5.17499472 3.59999648c-1.53984199 1.0379874-2.56113018 2.07685372-4.63798301 2.56113018a30.32223398 30.32223398 0 0 1-11.83885488 2.56200909 40.03237969 40.03237969 0 0 1-11.33612051-2.02499825l-3.59999649-2.07773173a39.80737969 39.80737969 0 0 1-6.16112578-3.59999649l-173.0590954-170.32306289a29.99440195 29.99440195 0 0 1-9.27772471-22.13698799c0-8.23885839 3.14999648-16.47683789 8.77499121-22.13698887a32.01852129 32.01852129 0 0 1 44.27309795 0l149.3998418 147.14984531L732.94800927 352.23306523a32.57223135 32.57223135 0 0 1 44.27221905-1.52314277 29.57340674 29.57340674 0 0 1 9.81385665 22.13698799 31.24069013 31.24069013 0 0 1-8.77499122 21.59997715v-0.03515625z m0 0" fill="currentColor"></path></svg>`,
  error: `<svg class="${PREFIX}-icon" viewBox="0 0 1024 1024"><path d="M544.55882363 512l146.06470548-146.11764727a23.18823545 23.18823545 0 0 0 0-32.50588184 23.18823545 23.18823545 0 0 0-32.55882364 0L512 479.49411729l-146.11764727-146.1176464a23.18823545 23.18823545 0 0 0-32.50588184 0 23.18823545 23.18823545 0 0 0 0 32.55882364L479.49411729 512l-146.1176464 146.11764727a23.18823545 23.18823545 0 0 0 0 32.50588184 23.18823545 23.18823545 0 0 0 32.55882364 0L512 544.50588271l146.11764727 146.1176464a23.18823545 23.18823545 0 0 0 32.50588184 0 23.18823545 23.18823545 0 0 0 0-32.55882364L544.50588271 512zM512 962a450 450 0 1 1 0-900 450 450 0 0 1 0 900z" fill="currentColor"></path></svg>`,
};

const CLOSE_ICON = `<svg class="${PREFIX}-icon ${PREFIX}-icon-close" viewBox="0 0 1024 1024"><path d="M777.55733333 174.08L512 439.63733333 246.44266667 174.08a51.2 51.2 0 0 0-72.36266667 72.36266667L439.63733333 512l-265.55733333 265.55733333A51.2 51.2 0 0 0 246.44266667 853.33333333L512 584.36266667 777.55733333 853.33333333A51.2 51.2 0 0 0 853.33333333 777.55733333L584.36266667 512 853.33333333 246.44266667a51.2 51.2 0 0 0-72.36266666-72.36266667z" fill="currentColor"></path></svg>`;

const FADE_OUT_UP = `${PREFIX}-fou`;
const FADE_IN_DOWN = `${PREFIX}-fid`;

const DEFAULT_SELECTOR = ':root[data-theme=dark]';

export const Message = class {
  #options: Required<MessageOptions> = {
    class: '',
    single: false,
    offsetTop: 20,
    duration: 3000,
    closeable: false,
    darkSelector: DEFAULT_SELECTOR,
    zIndex: 9999,
  };
  #list: Set<MessageObj> = new Set();

  #nextTop = 0;

  #appendCss() {
    let styleEle = document.querySelector<HTMLStyleElement>(`#${CSS_ID}`);
    if (!styleEle) {
      styleEle = document.createElement('style');
      styleEle.innerHTML = CSS_TEXT.replace(
        DEFAULT_SELECTOR,
        this.#options.darkSelector
      );
      styleEle.id = CSS_ID;
      document.head.appendChild(styleEle);
    }
  }

  /**
   * 关闭一个message
   *
   * @param _message
   */
  #handleClose(_message: MessageObj) {
    // 用户可能把关闭方法保存下来，然后重复点击
    if (!this.#list.has(_message)) {
      return false;
    }

    const { ele, top } = _message;
    ele.classList.add(FADE_OUT_UP);

    // 清除占用的top
    const spaceHeight = _message.offsetTop + _message.ele.offsetHeight;
    this.#nextTop -= spaceHeight;
    this.#list.delete(_message);

    // 遍历已存在的且top大于当前关闭的message，将他们往上移动top的值
    this.#list.forEach((messageItem) => {
      if (messageItem.top > top) {
        messageItem.top -= spaceHeight;
        messageItem.ele.style.top = `${messageItem.top}px`;
      }
    });

    ele.addEventListener('animationend', () => {
      ele.remove();
    });
  }

  #showMessage(
    type: MessageTypes,
    message: string,
    options: MessageOptions = {}
  ) {
    this.#appendCss();

    const _options = { ...this.#options, ...options };

    if (_options.single) {
      this.closeAll();
    }

    // 获取距离顶部状态
    const currTop = (this.#nextTop += _options.offsetTop);
    const ele = document.createElement('div');

    // 代理一下当前实例，在别的实例移除时，会重新设置其他实例的top
    const thisObj: MessageObj = {
      ele,
      top: currTop,
      offsetTop: _options.offsetTop,
    };

    this.#list.add(thisObj);

    // 内容
    ele.innerHTML = `${ICONS[type]}${message}`;

    if (_options.closeable) {
      const closeIconDom = new DOMParser().parseFromString(
        CLOSE_ICON,
        'text/html'
      ).body.firstElementChild as HTMLElement;
      closeIconDom.addEventListener('click', () => {
        this.#handleClose(thisObj);
      });
      ele.classList.add(`${PREFIX}-closeable`);
      ele.appendChild(closeIconDom);
    }

    // 属性
    ele.classList.add(
      `${PREFIX}-message`,
      `${PREFIX}-message-${type}`,
      FADE_IN_DOWN
    );
    _options.class && ele.classList.add(_options.class);
    ele.style.top = `${currTop}px`;
    ele.style.zIndex = `${_options.zIndex}`;

    document.body.appendChild(ele);

    // 把当前高度累计上去
    this.#nextTop += ele.offsetHeight;

    ele.addEventListener('animationend', () => {
      ele.classList.remove(FADE_IN_DOWN);
    });

    // 添加关闭事件
    // 鼠标hover时，不会关闭
    if (_options.duration > 0) {
      let timer = -1;
      const setCloseEvent = () => {
        timer = window.setTimeout(() => {
          this.#handleClose(thisObj);
        }, _options.duration);
      };

      setCloseEvent();

      ele.addEventListener('mouseenter', () => {
        clearTimeout(timer);
      });
      ele.addEventListener('mouseleave', setCloseEvent);
    }

    return thisObj;
  }

  info(message: string, options?: StrikeMessageOptions) {
    const messageObj = this.#showMessage('info', message, options);

    return {
      close: () => {
        this.#handleClose(messageObj);
      },
      update: (newMessages: string) => {
        messageObj.ele.innerHTML = `${ICONS.info}${newMessages}`;
      },
    };
  }

  warning(message: string, options?: StrikeMessageOptions) {
    const messageObj = this.#showMessage('warning', message, options);

    return {
      close: () => {
        this.#handleClose(messageObj);
      },
      update: (newMessages: string) => {
        messageObj.ele.innerHTML = `${ICONS.warning}${newMessages}`;
      },
    };
  }

  success(message: string, options?: StrikeMessageOptions) {
    const messageObj = this.#showMessage('success', message, options);

    return {
      close: () => {
        this.#handleClose(messageObj);
      },
      update: (newMessages: string) => {
        messageObj.ele.innerHTML = `${ICONS.success}${newMessages}`;
      },
    };
  }

  error(message: string, options?: StrikeMessageOptions) {
    const messageObj = this.#showMessage('error', message, options);

    return {
      close: () => {
        this.#handleClose(messageObj);
      },
      update: (newMessages: string) => {
        messageObj.ele.innerHTML = `${ICONS.error}${newMessages}`;
      },
    };
  }

  closeAll() {
    this.#nextTop = 0;

    this.#list.forEach(({ ele }) => {
      ele.classList.add(FADE_OUT_UP);
      ele.addEventListener('animationend', () => {
        ele.remove();
      });
    });

    this.#list.clear();
  }

  config(options: MessageOptions = {}) {
    this.#options = {
      ...this.#options,
      ...options,
    };
  }
};

export const message = new Message();
