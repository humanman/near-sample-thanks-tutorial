import { Context} from "near-sdk-core"
import { VMContext } from "near-sdk-as"
import { Contract } from "../assembly/index"
import { AccountId } from "../../utils"

// use `logging.log()` to log to terminal
// use `log()` to log in testing blocks
// "near call \$CONTRACT init '{\"owner\":\"'\$OWNER'\"}' --accountId \$CONTRACT"
const contractAccount: AccountId = 'dev-1622755101091-2932922'
// const contractAccount: AccountId = process.env.CONTRACT_NAME
const owner = 'ben'

let contract: Contract;
beforeEach(() => {
  VMContext.setCurrent_account_id(contractAccount)
  contract = new Contract(owner);
})

describe('Send Message', () => {

  it('Throws AssertionError if string is empty', () => {
    expect(() => {
      // log(Context.predecessor)
      // log(Context.sender)
      // log(Context.contractName)
      contract.say("");
    }).toThrow();
  });

  it('Throws if message is too long', () => {
    const longMessage: string = "This is a really long message that should throw an error for being longer than 100 characters as is set by the max_length property on the Message class.";
    expect(() => {
      contract.say(longMessage);
    }).toThrow();
  });

});
 
// describe('List Messages', () => {
//   // seed messages for list() method

//   it('Lists the last 10 messages', () => {
//     VMContext.setSigner_account_id(owner)
//     contract.say("first message")
//     contract.say("second message")
//     contract.say("third message")
//     contract.say("fourth message")
//     contract.say("fifth message")
//     contract.say("sixth message")
//     contract.say("seventh message")
//     contract.say("eigth message")
//     contract.say("nineth message")
//     contract.say("tenth message")
//     contract.say("eleventh message")
//     const last10 = contract.list()
//     log(last10)
//     expect(last10.length).toBe(10);
//   });

// });