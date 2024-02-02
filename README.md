# RELEASE AUTO BLOGGER

A github action to auto publish a blog to your hashnode publication each time you make a change to your repo.

## Installation

To use this github action just include it in the uses field of your github action. Here is an example.

```bash
name: "Hashnode Publisher"

on:
  push:
    branches:
      - "testing-hashnode-blog"

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v3

      - name: release-auto-blogger
        uses: amosmachora/release-auto-blogger@v0.1.25
        with:
          project-name: "React Daraja"
          subtitle: "Release Blog" ##optional
          hashnode-host: amosmachora.hashnode.dev
          cover-image: https://github.com/amosmachora/react-daraja/raw/main/public/full-logo.png ##optional
          files: "fileA.md,fileB.md" ## optional
          tags: "taga,tagb" ## at least one required
        env:
          HASHNODE_TOKEN: ${{ secrets.HASHNODE_PERSONAL_ACCESS_TOKEN }}
```

You can then use it however you see fit. When someone creates a pull request, deletes a branch , creates an issue etc.

## Pre Requisites

You need your **HASHNODE_PERSONAL_ACCESS_TOKEN** that you can find by going to https://hashnode.com/settings/developer. set it in your github repo.

Make sure you reference it in your github action like in the example above.

## GUIDE

The action works best if you include a file `BLOG.md` in a folder at the root of your repo called `.hashnode`. This way you can write your blog right from vscode and have it published on git commit.

However if you don't want to bother yourself you can live it at that.
The action will automatically pick up your `README.md` , your `CHANGELOG.md` and your `RELEASE-NOTES.md`.

If you want to opt out of that functionality set the `blog-only` field to true. This will only publish your `BLOG.md` file.

If you want to explicitly define the files to be included, include them in a comma separated field called `files` and they will be used to construct your blog. **no spaces**

example

```
  files: "fileA.md,fileB.md"
```

There are only 3 required fields. 1. `project-name` 2. `hashnode-host` 3. `tags` the rest are for customization to make look things better and granular.

For tags. Supply at-least one tag in a comma separated string. A valid tag will be used to publish your blog. If no tag is found your blog won`t be published.

```
  tags: "taga,tagb"
```

## Support

This project is a hackathon submission for the hashnode api hackathon. If you would wish to support me you can star this repo and try generate as much noise as possible around this project.

If you are reading this on hashnode the github url is https://github.com/amosmachora/release-auto-blogger

## Tech Stack

**Client:** GITHUB

**Server:** Blood, Sweat and Tears.
