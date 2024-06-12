# @vavt/message

原生 js 编写的消息提示组件。包括消息、警告、成功和错误提示。

![](https://imzbf.github.io/vavt-message/vavt-message.gif)

## 安装

```bash
yarn add @vavt/message
```

## 使用

```js
import { message } from '@vavt/message';

// error, success, info, warning
const { close, update } = message.info('这是一条普通信息');

// 更新内容
update('这是更新后的内容');

// 手动关闭
close();

// 关闭全部
message.closeAll();
```

## 属性

| 类型名称     | 默认值                   | 描述                                                   |
| ------------ | ------------------------ | ------------------------------------------------------ |
| class        | ''                       |                                                        |
| single       | false                    | 是否只显示一个提示                                     |
| offsetTop    | 20                       | 单个提示距离上一个提示的距离                           |
| duration     | 3000                     | 该时间后自动关闭，<=0 时不会自动关闭                   |
| closeable    | false                    | 是否显示关闭按钮                                       |
| darkSelector | `:root[data-theme=dark]` | 暗夜模式的选择器，只能通过`config`配置，不能调用时设置 |
| zIndex       | 9999                     |                                                        |

### 配置方式

配置全局属性

```js
message.config({ duration: 5000 });
```

在调用时配置

```js
message.warning('这条消息不会自动关闭', { duration: 0 });
```
