# glone 🌈
[![Downloads](https://img.shields.io/npm/dt/glone.svg)](https://www.npmjs.com/package/glone)

Simple utility to run `post-clone` jobs after `git clone`.

Built-in features:
  - 🏃‍♀️Run script after cloning is completed.
  - 🔗 Auto install git hooks.

## Usage

#### Create `.glone` file in your repository.

```
{
  "install": "install.sh",
  "hooks": {
    "pre-commit" : "./pre-commit.js"
  }
}
```

#### Just use `npx glone` instead of `git clone` when you're going to clone a repo.

    npx glone <repository>

#### Try it with this repo:

    npx glone git@github.com:ramesaliyev/glone.git

## API Reference

#### .glone file

Path | Explanation
--- | ---
install | script that should run after git-clone is completed
hooks | config for [git hooks](https://githooks.com/), glone will copy all of them without any check.

#### CLI Arguments

    npx glone <repository> [directory] -- [other git clone arguments]

#### Scripts

Your scripts can be any kind of file as long as have correct [shebang](https://www.wikiwand.com/en/Shebang_(Unix)) in it. Check `examples` folder for example scripts.
