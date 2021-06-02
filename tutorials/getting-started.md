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


## General Development Setup

Before diving right in, take a few moments to install a few global dependencies, so you don't have to worry about them later. 

We will be developing in NodeJS, and using VSCode as our IDE

NEAR CLI: _Deploys Smart Contracts to the NEAR networks_

NodeJS^v12.x: _Backend JS framework allowing NEAR programs to run (note that we require >=v12)_

Typescript: _Allows us to write AssemblyScript code_

AssemblyScript: _Allows us to write WebAssembly code (what NEAR can use to run our smart contracts) in Typescript so we don't have to learn a new language_

Rust: _Alternate language to AssemblyScript for smart contracts, but is required to write any and all simulation tests_

Vue: _This will be the front end framework we will be using to build our smart contracts a snazzy UI_

In order to deploy your smart contract, it will need to live in a repo like Github where NEAR has read/write access to it. When you use the cli command `$ near deploy...`, NEAR uses that git repo access you've configured ahead of time to push your project to it, and then publishes your project to NEAR Testnet where it can be available to interact with by you and other NEAR testnet accounts.
