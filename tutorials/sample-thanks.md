---
title: Sample Thanks
slug: sample-thanks
---

## Overview

Today we will build a smart contract called <a target="_blank" href="https://github.com/Learn-NEAR/sample--thanks">Sample Thanks</a>, which allows users to say "thanks" to other users by calling _their_ instance of this contract. (I would think "Thank You Note" might be a bit more semantic, but we aren't hear to judge; just to code. At the very least, it's a conversation starter.)

You can optionally attach tokens to your message, or even leave an anonymous tip.

Of course keep in mind that your signing account will be visible on the blockchain via NEAR Explorer even if you send an anonymous message.

This is a simple demonstration of how smart contracts work, and how they can be used to call other smart contracts.

We are going to use a mixture of functions and classes, then we will refactor everything into classes. Initially, the classes you will see basically allow us to organize data as if it was wrapped in an object literal. _TypeScript_ and _AssemblyScript_ are soooo hyper aware of how you organize your data structures, and they start to turn rabid if you want to simply assign an object to a variable:

```typescript
const myObject: object = {prop: "val"}
```

That looks simple, right? We declared a variable, signed a type `object` to it, and assigned an object literal as its value. NOOOO! Instead, you have to do this number:

```typescript
@nearBindgen
export class LongWindedWayOfCreatingASimpleObject {
  prop: string
  constructor(quest: string) {
    this.prop = val
  }
}
```

Then you can _finally_ use it similarly as before:

```typescript
const myObject = new LongWindedWayOfCreatingASimpleObject({val: "Geesh! All this for an object?!"});
```

Furthermore, you will have to continue to reference that class if you have an array that you intend to push it to. So, maybe use shorter names not born out of frustration.

Instead you must create a named class and assign it as the type you are using when declaring a variable. 

Throughout this tutorial, you will have the opportunity to engage with this contract as we build it together. 

At first, our calls to the contract will be through a command line interface like _Bash_ or _Terminal_.

Once our contracts have been tested and deployed, we will move away from the command line, and add a UI layer on top of our program to provide a richer user experience.

By the end of this tutorial, you will have a deeper understanding of how NEAR smart contracts are built, tested, deployed, and used. With that knowledge, you will be able to build your own decentralized applications, which you can share with the NEAR community.

## Local Setup

There is a repo of this project with several branches. The first branch, _getting-started_, is the bare bones project. It will have all of the files we need, but most of them will be empty.

As we progress through this build together, we will move on to other branches that reflect our progress. However, if you have blockchain fever, and simply can't wait to send a "Thank you" to one of your NEAR heros then, by all means, go ahead and start with the final branch this project cleverly called _final-setup_ that will have all our tests, contract code, etc. 
 
```bash
$ git clone git clone git@github.com:humanman/sample--thanks.git project-name
$ cd project-name
# switch to final-setup branch
$ yarn 
$ gridsome develop
```

Alternatively, you can build everything from scratch using the terminal command `npx create-near-app your-awesome-project`, and just use the following file tree for reference

Otherwise, let's get started!

Clone the repository below or run this command:

```bash
$ git clone git@github.com:humanman/sample--thanks.git
```

Now switch to the `getting-started` branch.

>  <div style="background: #d4ecda; padding: .5rem; border-radius; 5px;"> We are going to do something I think is pretty cool. After you clone the repo we will be using, open it in Gitpod, and save the url. We will be setting it up in an iframe to we can run our code without ever leaving this page... ever.</div>


## File Structure

```
sample--thanks/
┣ src/
┃ ┣ thanks/
┃ ┃ ┣ __tests__/
┃ ┃ ┃ ┣ README.md
┃ ┃ ┃ ┗ index.unit.spec.ts
┃ ┃ ┣ assembly/
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ models.ts
┃ ┃ ┗ asconfig.json
┃ ┣ as-pect.d.ts
┃ ┣ as_types.d.ts
┃ ┣ tsconfig.json
┃ ┗ utils.ts
┣ .gitignore
┣ README.md
┣ as-pect.config.js
┣ asconfig.json
┣ package.json
┗ yarn.lock
```

This is pretty much what your folder structure will look like if you used the `create-near-app` command.

The main folders we will be using are:

`/thanks/__tests__/`

`/thanks/assembly/`

This is where we will be writing all our contract code and tests. If you are in the `getting-started` branch, you should see that a few of the `.ts` files are empty. Don't worry. We will be filling these files back up with code in no time.

Furthermore, we will be using a few constants we will set up in `src/utils.ts`.

That's pretty much it for a bird's eye view. Many of the files you see in the tree above like `asconfig.json` are used to declare how _AssemblyScript_ will be used, how _TypeScript_ will use _AssemblyScript_, and how _As-pect_ will fit into it all for testing. These config files will allow you to run simple commands like `$ asp` to run all our unit tests without having to tell it where to look.

## Let's Start Coding!

Open your `src/assembly/index.ts` file, and paste the following at the top of the page:

```typescript
import { Context, ContractPromiseBatch, logging, u128 } from "near-sdk-core"
```
Let's review what we are importing from `near-sdk-core`:

Context:

ContractPromiseBatch:

logging:

u128:



## Unit Testing Our Smart Contracts


## Refactoring into Classes






