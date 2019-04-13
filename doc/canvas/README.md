Lean Canvas
===

## What's this

MarkdownでLean Canvasが作成できるツールを使います。

* https://github.com/tanksuzuki/easel

### Install

for OSX

```
brew tap tanksuzuki/easel
brew install easel
```

for Linux

* https://github.com/tanksuzuki/easel/releases

## How to use

書き出し

```bash
$ easel write index.md > index.html
```

git pushすると、 Netlifyに公開される

* https://titan-lean-canvas.netlify.com/

以下で、ローカルサーバ起動

```bash
$ easel watch
```
nnnn