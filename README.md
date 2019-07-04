Titan
===

![](https://img.shields.io/github/issues/futurismo-org/titan.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![Open Source Love](https://badges.frapsoft.com/os/v3/open-source.svg?v=103)](https://github.com/futurismo-org/titan)
[![CircleCI](https://circleci.com/gh/futurismo-org/titan/tree/master.svg?style=svg)](https://circleci.com/gh/futurismo-org/titan/tree/master)

https://titan-fire.netlify.com
https://titan-fire.com


## 概要

自己変革の火をつけるWebサービス a.k.a. 地獄から天国へ

具体的には、インターネットポルノ依存症の克服(以下、オナ禁)をIT技術で支援するWebサービスの立ち上げ。オナ禁ユーザの、禁欲が継続できない、性欲に負けた自己嫌悪感、ネット上の禁欲情報の不足、を解決する。禁欲チャレンジ大会を定期開催する。一言でいうと、オナ禁をテーマにしたKaggleをつくる。

エロ禁で終わりではない。この市場で成功したら、自分を変えるというキーワードで、隣接市場を次々と攻略していく。たとえば、ネット依存症、ゲーム依存症、禁煙禁酒など。依存症市場の次は、うつ、不安障害などのメンタルヘルス市場を攻める。依存症とメンタルヘルスの２つの領域で市場を制したら、ようやく悪い習慣や良い習慣、そして目標達成、自己実現といったようなポジティブな市場に進んでいく。

ゴールは、世界制覇。Facebookの次にくるSNSをつくること。世界中の人々の希望を支配すること。

[紹介用スライド](https://speakerdeck.com/titan/titanshao-jie-yong-suraito)

## 開発スタートガイド

### Environment

開発用サーバはNetlify, 本番用はFirebase Hostingにデプロイします。

* (開発用) https://titan-dev-1234.netlify.com/
* (開発用2) https://titan-dev-1234.firebaseapp.com/
* (本番用) https://titan-fire.com
* (本番用2) https://titan-241022.firebaseapp.com

### Development Info

* 掲示板 http://forum-titan-development-6349.nodechef.com/
* 課題管理 https://github.com/futurismo-org/titan/issues
* 進捗管理 https://trello.com/b/N5zxzOpB/service
* リーンキャンバス https://titan-lean-canvas.netlify.com
* ビジネスモデル https://datastudio.google.com/open/1kR6d35D48xB9ZeMxn2xis-FzaycGJosI
* Blog https://note.mu/titan_dev
* Twitter https://twitter.com/titan_dev_1234

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

注意: node.jsのバージョンは、8(Firebaseにあわせている）

#### Firebaseへの登録

tsu-neraから招待メールをもらう。

```
$ npm install -g firebase-tools
$ firebase login
```

鍵？生成

```
$ curl https://sdk.cloud.google.com | bash
$ gcloud auth application-default login
```

### ライセンス

このプロジェクトは MIT ライセンスの元にライセンスされています。 
詳細は[LICENSE](https://github.com/futurismo-org/titan/blob/master/LICENSE)をご覧ください。

## その他

### 背景

Titanの名前の由来は、マーラー作曲の交響曲第1番の第4楽章。この副題は、地獄から天国へ、です。嵐のように激しい激情の描写からはじまり、最後には天まで届く圧倒的な勝利のファンファーレで終わります。

みなさん、Titanは、Webサービスでこの世界感を目指します。

[![Titan(巨人)](http://img.youtube.com/vi/L_fdk2Z7M2I/0.jpg)](https://youtu.be/L_fdk2Z7M2I)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/tsu-nera"><img src="https://avatars1.githubusercontent.com/u/760627?v=4" width="100px;" alt="Tsunemichi Harada"/><br /><sub><b>tsu-nera</b></sub></a><br /><a href="https://github.com/futurismo-org/titan/commits?author=tsu-nera" title="Code">💻</a></td><td align="center"><a href="https://github.com/Goi666"><img src="https://avatars2.githubusercontent.com/u/40140038?v=4" width="100px;" alt="Goi"/><br /><sub><b>Goi</b></sub></a><br /><a href="https://github.com/futurismo-org/titan/commits?author=Goi666" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
