import {SubstrateEvent} from "@subql/types";
import {Account} from "../types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    //Create a new Acc entity using block hash
    let record = new 
    Account(event.extrinsic.block.block.header.hash.toString());
    //Assign Polkadot add to the acc field
    record.account = account.toString();
    //Assign bal to bal field "type cast as Balance"
    record.balance = (balance as Balance).toBigInt();
    await record.save();
}
