---
title: Getting started
slug: getting-started
---

## What is NEAR

<a target="_blank" href="https://near.org">NEAR</a> is an open source platform that accelerates the development of decentralized applications.

## What are Smart Contracts

Smart Contracts are the back-end of your application that runs code and stores data on the blockchain. All smart contracts on NEAR must be compiled to <a target="_blank" href="https://webassembly.org">_WebAssembly_</a> or simply _WASM_. Currently, NEAR supports two languages <a target="_blank" href="https://www.assemblyscript.org">_AssemblyScript_</a> and <a target="_blank" href="https://www.rust.org">_Rust_</a> with custom software development kits (SDKs) to assist in their creation.

Another aspect of Smart Contracts is that there are two types: Call Functions, and View Functions.

Call Functions mutate state. They change something in your storage regarding the contract. They basically add or remove data.

View Functions simply read the data. You may have a method that returns a list of recent transactions. That's a view function.

If you are familiar with the terms "setter" and "getter", or http GET and POST requests, or read/write access, you may assume that view/call functions share this same relationship. It's important to be aware what your functions are doing so you can use the correct syntax when writing and calling them.

<blockquote style="border-radius: 5px;padding: .75rem;color: #222;border-left: 8px solid #ebe750;background-color: #f9f8d0;">When in doubt of whether your contract method is
a call or view function, check whether gas is used when 
you call it. View functions are free, while call 
functions cost gas. <a target="_blank" href="https://docs.near.org/docs/concepts/gas">Learn more about NEAR gas fees</a>.</blockquote> 


## General Development Setup

Before diving right in, take a few moments to install a few global dependencies, so you don't have to worry about them later. 

We will be developing in _NodeJS_, and using _VSCode_ as our IDE.

NEAR CLI: _Deploys Smart Contracts to the NEAR networks_

NodeJS^v12.x: _Backend JS framework allowing NEAR programs to run (note that we require >=v12)_

Typescript: _Allows us to write AssemblyScript code_

AssemblyScript: _Allows us to write WebAssembly code (what NEAR can use to run our smart contracts) in Typescript so we don't have to learn a new language_

Rust: _Alternate language to AssemblyScript for smart contracts, but is required to write any and all simulation tests_

Vue: _This will be the front end framework we will be using to build our smart contracts a snazzy UI_

In order to deploy your smart contract, it will need to live in a repo like Github where NEAR has read/write access to it. When you use the cli command `$ near deploy...`, NEAR uses that git repo access you've configured ahead of time to push your project to it, and then publishes your project to NEAR Testnet where it can be available to interact with by you and other NEAR Testnet accounts.

Your IDE may freak out at some of the syntax so make sure you have all the plugins and extensions installed and activated so you can properly leverage it. _VSCode_ has loads of stuff to help with development in _AssemblyScript_. [Learn more about _AssemblyScript_ for _VSCode_](https://marketplace.visualstudio.com/items?itemName=saulecabrera.asls).


<blockquote class="tip" style="margin-top: 1rem;">

  <strong>When you're ready to switch over from a dev contract account to a permanent one, here's how:</strong><br/>
  <hr/>
  <br/><strong>Step 1: Create an account for the contract</strong><br/>
  Visit <a href="https://wallet.nearprotocol.com" target="_blank">NEAR Wallet</a> and make a new account. You'll be deploying these smart contracts to this new account.
  Now authorize NEAR CLI for this new account, and follow the instructions it gives you:
    near login
  <br/><br/><strong>Step 2: set contract name in code</strong><br/>
  Modify the line in <span class="code-emphasis inline-block">src/config.js</span> that sets the account name of the contract. Set it to the account id you used above.
    const CONTRACT_NAME = process.env.CONTRACT_NAME || 'your-account-here!'
  <br/><br/><strong>Step 3: change remote URL if you cloned this repo </strong><br/>
  Unless you forked this repository you will need to change the remote URL to a repo that you have commit access to. This will allow auto deployment to Github Pages from the command line.
  <ol style="margin-left: 1rem;">
    <li>go to GitHub and create a new repository for this project</li>
    <li>open your terminal and in the root of this project enter the following:</li>
  </ol>
    <span class="code-emphasis inline-block" style="font-size: smaller;">$ git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git</span>
  <br/><br/><strong>Step 4: deploy!</strong><br/>
  One command: <span class="code-emphasis inline-block">yarn deploy</span>.
  >
  As you can see in <span class="code-emphasis inline-block">package.json</span>, this does two things:
  <ol style="margin-left: 1rem;">
    <li>builds & deploys smart contracts to NEAR TestNet.</li>
    <li>builds & deploys frontend code to GitHub using <a href="https://github.com/tschaub/gh-pages" target="_blank">gh-pages</a>. This will only work if the project already has a repository set up on GitHub. Feel free to modify the <span class="code-emphasis inline-block">deploy</span> script in <span class="code-emphasis inline-block">package.json</span> to deploy elsewhere.</li>
  </ol>
  <br/>
  <em>courtesy of <a href="https://learn.figment.io/network-documentation/near/tutorials" target="_blank">figment.io</a>.</em>
</blockquote>
