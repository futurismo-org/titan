# Titan

![](https://img.shields.io/github/issues/futurismo-org/titan.svg)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![CircleCI](https://circleci.com/gh/futurismo-org/titan/tree/master.svg?style=svg)](https://circleci.com/gh/futurismo-org/titan/tree/master)

- LP: https://titan-fire.netlify.com
- Web: https://titan-fire.com
- Android: http://bit.ly/2LYbJP0
- iOS: https://apple.co/31UPFKp

## 概要

自己変革の火をつけるアプリ、Titanです。

悪い習慣をやめて、よい習慣をみにつけるための様々なチャレンジ大会を開催します。
禁酒、禁煙、ギャンブルなどの依存症の克服から、うつや不安障害などのメンタルヘルスの課題、
日常的な早寝早起き、ダイエット、勉強など、さらには、目標達成、自己実現など、様々なテーマを今後扱って行く予定です。

ユーザは大会に参加することで、みんなと一緒に習慣をみにつけることを目指すことができます。
このアプリは、ライフログのような記録と視覚化のアプリとは違い、
ユーザ同士の交流や情報共有のプラットホームを提供します。

- [紹介用スライド](https://speakerdeck.com/titan/titanshao-jie-yong-suraito)
- [紹介用動画](https://www.youtube.com/watch?v=XE7E-SuJ2Ug)
- [紹介用動画 2](https://www.youtube.com/watch?v=ZROFd9xv-Og)

## 開発スタートガイド

### Environment

開発用サーバは Netlify, 本番用は Firebase Hosting にデプロイします。

- (開発用) https://titan-dev-1234.netlify.com/
- (開発用 2) https://titan-dev-1234.firebaseapp.com/
- (本番用) https://titan-fire.com
- (本番用 2) https://titan-241022.firebaseapp.com

### Development Info

- 課題管理 https://github.com/futurismo-org/titan/issues
- 進捗管理 https://trello.com/b/N5zxzOpB/service
- リーンキャンバス https://titan-lean-canvas.netlify.com
- ビジネスモデル https://datastudio.google.com/open/1kR6d35D48xB9ZeMxn2xis-FzaycGJosI
- Blog https://note.mu/titan_dev
- Twitter:  https://twitter.com/titan_dev_1234
- Twitter2: https://twitter.com/titan_onakin
- Expo: https://expo.io/@tsu-nera/titan-expo

### How to Contribute

環境構築は以下の手順で。

```
$ npm i -g foreman
$ git clone git@github.com:futurismo-org/titan.git
$ cd titan
$ yarn install:all
$ yarn up
```

access to http://localhost:3000

注意: node.js のバージョンは、8(Firebase にあわせている）

#### Firebase への登録

tsu-nera から招待メールをもらう。

```
$ npm install -g firebase-tools
$ firebase login
```

鍵？生成

```
$ curl https://sdk.cloud.google.com | bash
$ gcloud auth application-default login
```

## その他

### 背景

Titan の名前の由来は、マーラー作曲の交響曲第 1 番の第 4 楽章。この副題は、地獄から天国へ、です。嵐のように激しい激情の描写からはじまり、最後には天まで届く圧倒的な勝利のファンファーレで終わります。

みなさん、Titan は、Web サービスでこの世界感を目指します。

[![Titan(巨人)](http://img.youtube.com/vi/L_fdk2Z7M2I/0.jpg)](https://youtu.be/L_fdk2Z7M2I)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/tsu-nera"><img src="https://avatars1.githubusercontent.com/u/760627?v=4" width="100px;" alt="Tsunemichi Harada"/><br /><sub><b>tsu-nera</b></sub></a><br /><a href="https://github.com/futurismo-org/titan/commits?author=tsu-nera" title="Code">💻</a></td><td align="center"><a href="https://github.com/Goi666"><img src="https://avatars2.githubusercontent.com/u/40140038?v=4" width="100px;" alt="Goi"/><br /><sub><b>Goi</b></sub></a><br /><a href="https://github.com/futurismo-org/titan/commits?author=Goi666" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
