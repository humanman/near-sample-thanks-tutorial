---
title: Thanks
slug: thanks
---

<blockquote class="lesson">
<strong>Build the Thanks Smart Contract</span></strong><br><br>

- time to complete: **80 mins**
- level of difficulty: **moderate**
- prerequisites
  - basic Javascript
  - basic Bash
  - basic Git
  - NEAR.testnet account

</blockquote>

## Overview

No. Seriously. Thanks! 

Actually,&nbsp; that's the name of the Smart Contract we will be building today,&nbsp; [Thanks](https://github.com/Learn-NEAR/sample--thanks),&nbsp; which allows users to say "thanks" to other users by calling _their_ instance of this contract. (I would think "Thank You Note" might be a bit more semantic,&nbsp; but we aren't hear to judge; just to code. At the very least,&nbsp; it's a conversation starter.)

You can optionally attach tokens to your message,&nbsp; or even leave an anonymous tip.

Of course keep in mind that your signing account will be visible on the blockchain via NEAR Explorer even if you send an anonymous message.

This is a simple demonstration of how smart contracts work,&nbsp; and how to call them.

We are going to use a mixture of functions and classes,&nbsp; then we will refactor everything into classes. Initially,&nbsp; the classes you will see basically allow us to organize data as if it was wrapped in an object literal. _TypeScript_ and _AssemblyScript_ are soooo hyper aware of how you organize your data structures,&nbsp; and they start to turn rabid if you want to simply assign an object to a variable:

```typescript
const myObject: object = {prop: "val"}
```

That looks simple,&nbsp; right? We declared a variable,&nbsp; signed a type `object` to it,&nbsp; and assigned an object literal as its value. NOOOO! Instead,&nbsp; you have to do this number:

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

Furthermore,&nbsp; you will have to continue to reference that class if you have an array that you intend to push it to. So,&nbsp; maybe use shorter names not born out of frustration.

Instead you must create a named class and assign it as the type you are using when declaring a variable. 

Throughout this tutorial,&nbsp; you will have the opportunity to engage with this contract as we build it together. 

At first,&nbsp; our calls to the contract will be through a command line interface like _Bash_ or _Terminal_.

Once our contracts have been tested and deployed,&nbsp; we will move away from the command line,&nbsp; and add a UI layer on top of our program to provide a richer user experience.

By the end of this tutorial,&nbsp; you will have a deeper understanding of how NEAR smart contracts are built,&nbsp; tested,&nbsp; deployed,&nbsp; and used. With that knowledge,&nbsp; you will be able to build your own decentralized applications,&nbsp; which you can share with the NEAR community.


## Local Setup


There is a repo of this project with several branches. The first branch,&nbsp; _getting-started_,&nbsp; is the bare bones project. It will have all of the files we need,&nbsp; but most of them will be empty.

As we progress through this build together,&nbsp; we will move on to other branches that reflect our progress. However,&nbsp; if you have blockchain fever,&nbsp; and simply can't wait to send a "Thank you" to one of your NEAR heros then,&nbsp; by all means,&nbsp; go ahead and start with the final branch this project cleverly called _final-setup_ that will have all our tests,&nbsp; contract code,&nbsp; etc. 
 
```bash
$ git clone git clone git@github.com:humanman/sample--thanks.git project-name
$ cd project-name
# switch to final-setup branch
$ yarn 
$ gridsome develop
```

Alternatively,&nbsp; you can build everything from scratch using the terminal command:

<pre class="language-bash">
$ <span class="token function">near</span> create-near-app your-awesome-project
</pre>

and just use the following file tree for reference.

Otherwise,&nbsp; let's get started!

<h3>Clone The Repo</h3>

Clone the repository below or run this command:

```bash
$ git clone git@github.com:humanman/sample--thanks.git
```

>  <div class="tip"> <fa-icon class="mr-2" style="opacity: .7;" icon="lightbulb" size="sm"></fa-icon>If you're like me, and need a visual for what this Contract might look like with a UI, scroll down to the <a href="#what-next">What Next?</a> section to see a demo of Thanks with a simple UI layer.</div>
<br/>

Now switch to the `getting-started` branch.


<h3>File Structure</h3>


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

This is pretty much what your folder structure will look like if you used the
 <nobr><span class="code-emphasis inline-block">create-near-app</span></nobr> command.

The main folders we will be using are:

`/thanks/__tests__/`

`/thanks/assembly/`

This is where we will be writing all our contract code and tests. If you are in the <nobr><span class="code-emphasis inline-block">getting-started</span></nobr> branch,&nbsp; you should see that a few of the `.ts` files are empty. Don't worry. We will be filling these files back up with code in no time.

Furthermore,&nbsp; we will be using a few constants we will set up in `src/utils.ts`.

That's pretty much it for a bird's eye view. Many of the files you see in the tree above like `asconfig.json` are used to declare how _AssemblyScript_ will be used,&nbsp; how _TypeScript_ will use _AssemblyScript_,&nbsp; and how _As-pect_ will fit into it all for testing. These config files will allow you to run simple commands like `$ asp` to run all our unit tests without having to tell it where to look.

## Let's Start Coding!

Open your `src/assembly/index.ts` file,&nbsp; and paste the following at the top of the page:


```typescript
// assembly/index.ts
import { Context,&nbsp; ContractPromiseBatch,&nbsp; logging,&nbsp; u128,&nbsp; PersistentVector } from "near-sdk-core"
```


Let's review what we are importing from `near-sdk-core`:

Context: _Provides context for contract execution,&nbsp; including information about transaction sender&nbsp;, etc._

ContractPromiseBatch: _Batches ContractPromise,&nbsp; which make asynchronous calls to other contracts and receives callbacks._

logging: _Logs a string message._

u128: _unsigned 128-bit integer type_ 

Next,&nbsp; let's add some constants and type declarations to `index.ts`:



```typescript
/**
 * == TYPES ====================================================================
 */

/**
 * Account IDs in NEAR are just strings.
 */
type AccountId = string;

/**
 * Gas is u64
 */
type Gas = u64;

/**
 * Amounts,&nbsp; Balances,&nbsp; and Money in NEAR is are u128.
 */

type Amount = u128;

type Balance = Amount;

type Money = Amount;

/**
 * Timestamp in NEAR is a number.
 */
type Timestamp = u64;

/**
 * == CONSTANTS ================================================================
 *
 * ONE_NEAR = unit of NEAR token in yocto Ⓝ (1e24)
 * XCC_GAS = gas for cross-contract calls,&nbsp; ~5 Tgas (teragas = 1e12) per "hop"
 * MIN_ACCOUNT_BALANCE = 3 NEAR min to keep account alive via storage staking
 */

const ONE_NEAR = u128.from("1000000000000000000000000");
const XCC_GAS: Gas = 20_000_000_000_000;
const MIN_ACCOUNT_BALANCE: u128 = u128.mul(ONE_NEAR,&nbsp; u128.from(3));
// import { Message,&nbsp; ContributionTracker,&nbsp; Vector } from "./models"

// max 5 NEAR accepted to this contract before it forces a transfer to the owner
const CONTRIBUTION_SAFETY_LIMIT: u128 = u128.mul(ONE_NEAR,&nbsp; u128.from(5));
const owner = AccountId
const contributions: ContributionTracker = new ContributionTracker()
const messages: Vector<Message> = new Vector<Message>("m")

@nearBindgen
export class ContributionTracker {
  public count: u32 = 0;
  public total: u128 = u128.Zero;
  public average: f64;
  public received: u128 = u128.Zero
  public transferred: u128 = u128.Zero

  update(value: u128): void {
    // track money received separately
    this.received = u128.add(this.received,&nbsp; value);

    // update tracking data
    this.count += 1;
    this.total = u128.add(this.total,&nbsp; value);
    this.average = u128.div(this.total,&nbsp; u128.from(this.count)).toF64();
  }

  record_transfer(): void {
    this.transferred = u128.add(this.transferred,&nbsp; this.received)
    this.received = u128.Zero
  }
}

/**
 * A message left by someone saying thanks
 */
@nearBindgen
export class Message {
  public static max_length(): i32 { return 100 as i32 };

  public sender: AccountId

  constructor(
    public text: string,
    anonymous: bool = false,
    public contribution: u128 = u128.Zero
  ) {
    this.sender = anonymous ? '' : Context.sender
  }
}

/**
 * setup a generic subclass instead of duplicating the get_last method
 */
@nearBindgen
export class Vector<T> extends PersistentVector<T> {
  /**
   * this method isn't normally available on a PersistentVector
   * so we add it here to make our lives easier when returning the
   * last `n` items for comments,&nbsp; votes and donations
   * @param count
   */
  get_last(count: i32): Array<T> {
    const n = min(count,&nbsp; this.length);
    const startIndex = this.length - n;
    const result = new Array<T>();
    for (let i = startIndex; i < this.length; i++) {
      const entry = this[i];
      result.push(entry);
    }
    return result;
  }
}
```

Hopefully,&nbsp; the comments in the code above will give you some clues as to what each variable and type does. Basically,&nbsp; we are declaring that `AccountId` will always be a string. `Gas` will be type _u64_. `Amount` will be type _u128_,&nbsp; and so on. 

As for our constants,&nbsp; we mostly define budgetary restrictions,&nbsp; e.g,`CONTRIBUTION_SAFETY_LIMIT` sets the max value accepted to 5 NEAR.

You'll also notice several classes defined as well: `ContributionTracker`,&nbsp; `Message`,&nbsp; and `Vector`. These classes basically give some of our variables turbo power. We will dive deeper into some of them,&nbsp; but the important part to note for now is that each class you write in _AssemblyScript_ intended for NEAR to understand will require a decorator. That's what `@nearBindgen` (pronounced Near `Bind Gen) is. It marks the class as serializable. Serializable is a marker interface used to “mark” classes so that the objects of these classes may get a certain capability.

Let's put this code to work. Paste the following code into `index.ts`:


```typescript
// assembly/index.ts
function _assert_financial_safety_limits(deposit: u128): void {
  const new_total = u128.add(deposit,&nbsp; this.contributions.received)
  assert(u128.le(deposit,&nbsp; CONTRIBUTION_SAFETY_LIMIT),&nbsp; "You are trying to attach too many NEAR Tokens to this call.  There is a safe limit while in beta of 5 NEAR")
  assert(u128.le(new_total,&nbsp; CONTRIBUTION_SAFETY_LIMIT),&nbsp; "Maximum contributions reached.  Please call transfer() to continue receiving funds.")
}

export function say(message: string,&nbsp; anonymous: bool = false): bool {
  // guard against too much money being deposited to this account in beta
  const deposit = Context.attachedDeposit
  _assert_financial_safety_limits(deposit)

  // guard against invalid message size
  assert(message.length > 0,&nbsp; "Message length cannot be 0")
  assert(message.length < Message.max_length(),&nbsp; "Message length is too long,&nbsp; must be less than " + Message.max_length().toString() + " characters.")

  if (!anonymous) {
    assert(!anonymous,&nbsp; "Anonymous messages are not allowed by this contract")
  }

  if (deposit > u128.Zero) {
    contributions.update(deposit)
  }

  messages.pushBack(new Message(message,&nbsp; anonymous,&nbsp; deposit))
  return true
}
```

Ok! So we have a helper function,&nbsp; `_assert_financial_safety_limits`(love the name!),&nbsp; and immediately use it in our main contract function,&nbsp; `say`. Can you guess whether `say` is a _view_ or _call_ functions? 

Starting with the arguments,&nbsp; it looks like we are expecting a `message` (makes sense),&nbsp; and a boolean value for `anonymous`,&nbsp; which defaults to `false`. Cool,&nbsp; so this method allows you to `say` something anonymously if you want. This is most likely a _call_ function since _view_ functions don't typically require a string argument,&nbsp; but let's dive deeper to make sure.

Let's look at some of the property methods in there. `Context` is being used,&nbsp; and pretty much anytime you need to dig into `Context`,&nbsp; you're going to use gas. It may not be obvious at first&nbsp;, but the fact that it needs gas to run makes it a _call_ function. 

Next,&nbsp; we see property methods like `update` and `pushBack`. With `update`,&nbsp; we definitely know we are mutating state somehow,&nbsp; which means it's a _call_ function. The same goes with `pushBack`&nbsp;, which is a method on `Vector`,&nbsp; which in turn extends the class,&nbsp; `PersistentVector`,&nbsp; a _storage_ collection you will often find being used in NEAR contracts to persist data. You can read all about data storage collections in the [NEAR docs](https://docs.near.org/docs/concepts/data-storage).

## Calling Function

Notice we are exporting `say`. If we don't export our contract functions then NEAR will throw a `MethodNotFound` error when we try to call them. 

For now,&nbsp; let's fire this contract up and call our one and only method. 

Open terminal,&nbsp; navigate to your project directory,&nbsp; and run the following command: 

```bash
$ yarn build:release
```

If you see and error,&nbsp; run `$ yarn` to make sure the project's dependencies have been installed locally.

Otherwise,&nbsp; you should see a new folder in your root directory called `build`. This contains a `wasm` file called `thanks.wasm`,&nbsp; which is how _AssemblyScript_ compiles all your code into a _WebAssembly_ binary format that is run in web browsers. It's unreadable,&nbsp; but you can create a readable `wat` file if you want to nerd out.  Learn more about [_WebAssembly_](https://webassembly.org/) and _AssemblyScript_'s [ asbuild](https://github.com/AssemblyScript/asbuild) CLI.

Now that we have our code compiled,&nbsp; we can use the NEAR CLI to deploy it. 

<pre class="language-bash">
  $ <span class="token function">near</span> dev-deploy ./build/release/thanks.wasm
</pre>

You should see another newly generated folder called `neardev`. This is a really cool feature of NEAR,&nbsp; where you can quickly create and use a _testnet_ account for your contract.  

<pre class="language-text">
  sample--thanks $ <span class="token function">near</span> dev-deploy ./build/release/thanks.wasm
  Starting deployment. <span class="code-emphasis">Account id: dev-1622755101091-2932922</span>,&nbsp; 
  node: https://rpc.testnet.near.org,&nbsp; helper: https://helper.testnet.near.org,
  file: ./build/release/thanks.wasm
  Transaction Id EXRwdkcY8iNE1xyowRvc1xvvYYR4YbXNZTCchSFxryrN
  To see the transaction in the transaction explorer,&nbsp; please open this url in your browser
  https://explorer.testnet.near.org/transactions/EXRwdkcY8iNE1xyowRvc1xvvYYR4YbXNZTCchSFxryrN
  Done deploying to dev-1622755101091-2932922
</pre>

The account for the contract above,&nbsp; `dev-1622755101091-2932922`. It's a bit confusing at first&nbsp;, but your contract is seen by NEAR as just another account; no different than your own _testnet_ account,&nbsp; except that this account has methods you can call on it. So let's call it! 

<pre class="language-bash">
  $ <span class="token function">near</span> call dev-1622755101091-2932922 say '{"message":"Hello "}' --accountId YOUR_OWN_TESTNET_ACCOUNT.testnet
</pre>

<blockquote class="tip">

  <fa-icon class="mr-2" style="opacity: .7;" icon="lightbulb" size="sm"></fa-icon><strong>Do you have a testnet account yet?</strong>

  <hr/>

  If you haven't created a NEAR testnet account of your own,&nbsp; navigate to https://wallet.testnet.near.org and click on "Create Account".

  If you _do_,&nbsp; but NEAR CLI doesn't believe you,&nbsp; try typing <span class="code-emphasis inline-block">$ near login</span> in your terminal. It should open a browser window,&nbsp; which will allow you to connect your NEAR _testnet_ account to your local version of NEAR CLI. [Learn more about NEAR CLI](https://docs.near.org/docs/tools/near-cli).
</blockquote>

You should see something like this in your terminal:

<pre class="language-bash">
  Scheduling a call: dev-1622755101091-2932922.say({"message":"Hello"})
  Transaction Id 2ZJcMeNb9rkeJuXojAdWFU9wQFkUhy3EU7DLz4sis292
  To see the transaction in the transaction explorer,&nbsp; 
  please open this url in your browser
  https://explorer.testnet.near.org/transactions/2ZJcMeNb9rkeJuXojAdWFU9wQFkUhy3EU7DLz4sis292
  <span class="token function">true</span> 
</pre>

Our call function,&nbsp; `say`,&nbsp; returns true just like it's supposed to. You can follow the link your terminal generates to view the transaction in the _testnet_ explorer. However,&nbsp; we pretty much just called our own contract,&nbsp; and sent a message to ourselves. This might work for daily affirmations&nbsp;, but the point of this contract is to call _other_ contracts. We'll get to that soon,&nbsp; but it won't look that different. 

If you ran the call command from earlier as it is (with your own testnet account as `accountId`) then I would get a lovely "Hello" message,&nbsp; and the contract would be working as intended. Does that make sense? Contracts have their own accountIds. People have their own accountIds. People can call other people's contracts. _Contracts_ can call other people's contracts too! As far as NEAR is concerned,&nbsp; an `accountId` is and `accountId` is an `accountId`. Hopefully,&nbsp; that helps demystify the idea of cross-contract calls.

The next thing we want to do is add the rest of our methods. We have a `list` method,&nbsp; which allows the owner of the contract to list the messages they received. So,&nbsp; that lovely "Hello" message will be available to see by running a nifty view function. However,&nbsp; I need to make sure that I,&nbsp; and I alone,&nbsp; the _owner_ of the contract,&nbsp; am allowed to view my messages. That means we will need an owner check.  

Remember,&nbsp; any function we export in `assembly/index.ts` will be interpreted as a contract function when compiled to a `wasm`,&nbsp; and we can call it just like we did with `say`. It is perfectly fine to write your contracts this way,&nbsp; but did you see how clean some of those helper classes were? The simplicity and elegance of `Message` is quite inspired. Wouldn't if be cool to have a class for our contract so we can be hip to the singleton style all the kids are doing these days?  The answer is,&nbsp; Yes. Yes it would.

## Refactoring


Refactoring contract functions into a singleton pattern isn't that hard,&nbsp; but there are a few things to keep in mind. AssemblyScript requires the `@nearBindgen` decorator on every class you write. Furthermore,&nbsp; every _call_ function requires its own decorator,&nbsp; `@mutateState()` on the line above it. 

One last thing to remember,&nbsp; is that unlike the function pattern,&nbsp; the singleton style requires you to initialize the contract when you _first_ deploy or call it with a simple flag,&nbsp; `--initFunction new --initArgs '{}'` where `{}` contains the arguments your Class' constructor requires to instantiate if any. Just remember to remove the flag from subsequent deployments or you will get an error complaining that you already initialized it. 

Switch to the `classes/step-02` branch,&nbsp; and take a few minutes to review the code. It should be complete with all necessary contract methods nicely put together in easy-to-read classes. Your constants have been moved to `utils.ts`. Your helper classes have been moved to `model.ts`,&nbsp; and other helper methods have been converted to private class methods. Pretty nifty,&nbsp; huh?

If you want to refactor what we've done so far yourself then go nuts! You can even start fresh with the branch `functions/step-01`,&nbsp; which will help if you were having issues running your code thus far.


Our smart contracts are singleton and ready to mingleton!

Let's take a closer look at the refactored code:

```typescript
// index.ts
  //...
@nearBindgen
export class Contract {
  private owner: AccountId
  private allow_anonymous: bool
  // private messages: Vector<Message> = new Vector<Message>("m")
  private contributions: ContributionTracker = new ContributionTracker()

  constructor(owner: AccountId,&nbsp; allow_anonymous: bool = true) {
    this.owner = owner
    this.allow_anonymous = allow_anonymous
  }

  @mutateState()
  say(message: string,&nbsp; anonymous: bool = false): bool {
    // guard against too much money being deposited to this account in beta
    const deposit = Context.attachedDeposit
    this.assert_financial_safety_limits(deposit)

    // guard against invalid message size
    assert(message.length > 0,&nbsp; "Message length cannot be 0")
    assert(message.length < Message.max_length(),&nbsp; "Message length is too long,&nbsp; must be less than " + Message.max_length().toString() + " characters.")

    if (!this.allow_anonymous) {
      assert(!anonymous,&nbsp; "Anonymous messages are not allowed by this contract")
    }

    if (deposit > u128.Zero) {
      this.contributions.update(deposit)
    }

    messages.pushBack(new Message(message,&nbsp; anonymous,&nbsp; deposit))
    return true
  }

  //...
```
This is the first section of our `Contract` class. Our main call function,&nbsp; `say`,&nbsp; is now housed in the `Contract` class,&nbsp; and has its `@mutateState` decorator signifying what type of function it is.

The constructor method on `Contract` takes two arguments in its constructor; `owner` and `allow_anonymous`. The `owner` argument allows you and only you,&nbsp; the person who deployed the contract to call your _view_ methods. The `allow_anonymous` argument sets permission on whether people sending you a message can do so anonymously.

One more interesting bit of code to look at is: 

```typescript
assert(message.length > 0,&nbsp; "Message length cannot be 0")
```

I love `assert`. It's so intuitive,&nbsp; and simply allows you to place guards with error messages wherever you want. It saves your lines of `if/else` statements to do the same job,&nbsp; and it seamlessly ties in to your unit tests. If you're not already using it,&nbsp; start today!

## Testing

Speaking of unit tests,&nbsp; let's write a few,&nbsp; and I encourage you to write some more. Use the `assert` methods as clues for what to write.

Navigate to `thanks/__tests__/index.unit.spec.ts` and paste the following in there:

```typescript
import { Context} from "near-sdk-core"
import { VMContext } from "near-sdk-as"
import { Contract } from "../assembly/index"
import { AccountId } from "../../utils"

const contractAccount: AccountId = 'THE DEV ACCOUNT NEAR GENERATED FOR YOU IN NEARDEV/'
const owner = 'you'

let contract: Contract;
beforeEach(() => {
  contract = new Contract(owner);
})

describe('Send Message',&nbsp; () => {

  it('Throws AssertionError if string is empty',&nbsp; () => {
    expect(() => {
      contract.say("");
    }).toThrow();
  });

  it('Throws if message is too long',&nbsp; () => {
    const longMessage: string = "This is a really long message that should throw an error for being longer than 100 characters as is set by the max_length property on the Message class.";
    expect(() => {
      contract.say(longMessage);
    }).toThrow();
  });

});

describe('List Messages', () => {
  // seed messages for list() method

  it('Lists the last 10 messages', () => {
    contract.say("first message")
    contract.say("second message")
    contract.say("third message")
    contract.say("fourth message")
    contract.say("fifth message")
    contract.say("sixth message")
    contract.say("seventh message")
    contract.say("eighth message")
    contract.say("ninth message")
    contract.say("tenth message")
    contract.say("eleventh message")
    // from https://github.com/near/near-sdk-as/blob/master/near-mock-vm/assembly/context.ts
    VMContext.setPredecessor_account_id(owner)
    const last10 = contract.list()
    log(last10)
    expect(last10.length).toBe(10);
  });

});
 
```

These are really simple tests that deal solely with the `say` call function. They are informed by its `assert` methods. Now run:

<pre class="language-bash">
  $ <span class="token function">yarn</span> test:unit
</pre>

If all goes well,&nbsp; you should see something like this:

<pre class="language-bash">
   [Describe]: Send Message
  <br/>
   <span style="color: green;">[Success]</span>: ✔ Throws AssertionError if string is empty
   <span style="color: green;">[Success]</span>: ✔ Throws if message is too long
  <br/>
  [File]: src/thanks/__tests__/index.unit.spec.ts
  [Groups]: <span style="color: green;">2 pass</span>,&nbsp; 2 total
  [Result]: <span style="color: green;">✔ PASS</span>
  [Snapshot]: 0 total,&nbsp; 0 added,&nbsp; 0 removed,&nbsp; 0 different
  [Summary]: <span style="color: green;">2 pass</span>,&nbsp;  0 fail,&nbsp; 2 total
  [Time]: 7.091ms
  <br/>
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  <br/>
  [Result]: <span style="color: green;">✔ PASS</span>
  [Files]: 1 total
  [Groups]: 2 count,&nbsp; 2 pass
  [Tests]: 2 pass,&nbsp; 0 fail,&nbsp; 2 total
  [Time]: 12537.468ms
  ✨  Done in 13.02s.
</pre>

Unit Tests can be extremely simple, but they can come with a lot of frustration and confusion as you work with them. 

There are a few things to note about testing your contracts:

1. Unit Tests do not require a build or `wasm` in order to run. Nor do you need to be connected to the NEAR testnet while testing.
<br/>

2. Unit Tests have no concern with the dev account generated by the NEAR CLI <nobr><span class="code-emphasis inline-block">dev deploy</span></nobr> command, so ignore the `neardev/` folder while testing.
<br/>

3. Unit Tests ignore logging unless importing and using `log()`
<br/>

Caveats aside Unit Tests will save you loads of debugging time,&nbsp; and help you handle edge cases,&nbsp; so make sure you take some time to review the other contract methods,&nbsp; and write a few unit tests for them. 

Unit Tests are handled by the `near-sdk-as` package, which has a powerful module, _VMContext_, to leverage info about your Smart Contract while testing. You can see it in use in the code above. You don't always need to use _VMContext_ , but if you have checks, like _Thanks_ does, on your functions, which check the owner of the contract, then _VMContext_ will be a real help. It has a bunch of methods allowing you to get the most out of your tests. <a href="https://github.com/near/near-sdk-as/blob/master/near-mock-vm/assembly/context.ts" target="_blank">Learn more about <em>VMContext</em></a>.


You may also run into some weird issues in the terminal. Make sure you haven't added any unnecessary dependencies. Also,&nbsp; you may have been tempted to run `npm audit fix` at some point during installation. Despite all the bright red,&nbsp; urgent warnings your terminal may have thrown at you&nbsp;, "fixing" the dependencies may prevent you from properly compiling your code,&nbsp; which will in turn prevent pretty much anything else you want to do with your program. Bleeding edge technology like blockchain development is a bit of a double edge sword. It's exciting,&nbsp; and there's lots of opportunity to contribute,&nbsp; but the source code is constantly updating and improving. What was stable last week,&nbsp; may be outdated this week.

## Adding Scripts

Let's make our lives a bit easier and gather our CLI commands.

Switch to the `scripts/step-03` branch,&nbsp; and review the contents of the `scripts` directory. Scripts like these are great organizational tools to help you with your CLI commands,&nbsp; and others interact with your code. 

Take a few minutes to read through `scripts/README.md`. It will lay out a cool demonstration of the contract at work using the terminal. Here is a video of that demonstration:


<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/13269fbf5c8c463d9955bc5ef0051387" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Summary

Amazing work! Hopefully,&nbsp; you know a little bit more about Smart Contracts like:

<ul>
  <li>The difference between a _call_ function and a _view_ function</li>
  <li>Dependencies and libraries specific to NEAR and _AssemblyScript_</li>
  <li>Setting up an account Id for your contract</li>
  <li>Calling a contract method from the command line</li>
  <li>Writing Smart Contracts as functions and as Classes</li>
  <li>Unit testing your Smart Contract</li>
  <li>Using scripts to run code</li>
</ul>
<br/>
You also have some new packages installed globally that you can use like NEAR CLI. Now you can write your own Smart Contracts,&nbsp; deploy them,&nbsp; and call them; all from the command line. 

## What Next?

<strong class="mt-8 mb-4 d-block">Simulation Testing</strong>

If you want to dive deeper into testing,&nbsp; head over to the [Near Docs](https://docs.near.org/docs/develop/contracts/rust/testing-rust-contracts#simulation-tests),&nbsp; and look into Simulation Tests. Although,&nbsp; we wrote our contract code in _AssemblyScript_,&nbsp; all Simulation Tests are written in _Rust_,&nbsp; which can be a very challenging language to learn,&nbsp; but well worth it if you continue developing Smart Contracts. 

<strong class="mt-8 mb-4 d-block">Adding a Front End</strong>

We've built and tested a remarkable backend. If we were building an API,&nbsp; the smart contracts would be our methods to make requests to our api. More specifically,&nbsp; smart contracts operate like an ORM,&nbsp; but instead of communicating directly with a database (ORM),&nbsp; smart contracts communicate directly with the blockchain or,&nbsp; rather,&nbsp; the blockchain's own api called RPC.

If that's confusing,&nbsp; then let's back up a bit - we're done building our backend.

But can Grandma open up her terminal and use it? No. Grandma thinks Bash is some sort of breakfast side dish. In order for her to send us a message (and maybe a NEAR token or two),&nbsp; we need to spin up a front end that calls the contract the same way we've been doing in the terminal.  

Take a moment to think about what this contract would look like. What would _any_ "thank you message" application _look_ like? We know that `say` requires a _message_ and a _accountId_&nbsp;, right? Maybe a form of some kind?

Before using the form below, please make sure you have a _testnet_ account. You will be redirected to NEAR explorer for authorization.

<contract-form></contract-form>

Switch to the `frontend/bonus` to see the code for the above form. Running `yarn dev` will now open a web page with the form. Dive into the code to see how it's all wired up. Have fun! 






