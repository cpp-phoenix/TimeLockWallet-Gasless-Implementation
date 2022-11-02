import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  depositEtherEvent,
  depositTokenEvent,
  withdrawEtherEvent,
  withdrawTokenEvent
} from "../generated/TimelockWallet/TimelockWallet"

export function createdepositEtherEventEvent(
  senderAddress: Address,
  amount: BigInt,
  totalStaked: BigInt,
  locktime: BigInt
): depositEtherEvent {
  let depositEtherEventEvent = changetype<depositEtherEvent>(newMockEvent())

  depositEtherEventEvent.parameters = new Array()

  depositEtherEventEvent.parameters.push(
    new ethereum.EventParam(
      "senderAddress",
      ethereum.Value.fromAddress(senderAddress)
    )
  )
  depositEtherEventEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  depositEtherEventEvent.parameters.push(
    new ethereum.EventParam(
      "totalStaked",
      ethereum.Value.fromUnsignedBigInt(totalStaked)
    )
  )
  depositEtherEventEvent.parameters.push(
    new ethereum.EventParam(
      "locktime",
      ethereum.Value.fromUnsignedBigInt(locktime)
    )
  )

  return depositEtherEventEvent
}

export function createdepositTokenEventEvent(
  tokenContract: Address,
  senderAddress: Address,
  amount: BigInt,
  totalStaked: BigInt,
  locktime: BigInt
): depositTokenEvent {
  let depositTokenEventEvent = changetype<depositTokenEvent>(newMockEvent())

  depositTokenEventEvent.parameters = new Array()

  depositTokenEventEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContract",
      ethereum.Value.fromAddress(tokenContract)
    )
  )
  depositTokenEventEvent.parameters.push(
    new ethereum.EventParam(
      "senderAddress",
      ethereum.Value.fromAddress(senderAddress)
    )
  )
  depositTokenEventEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  depositTokenEventEvent.parameters.push(
    new ethereum.EventParam(
      "totalStaked",
      ethereum.Value.fromUnsignedBigInt(totalStaked)
    )
  )
  depositTokenEventEvent.parameters.push(
    new ethereum.EventParam(
      "locktime",
      ethereum.Value.fromUnsignedBigInt(locktime)
    )
  )

  return depositTokenEventEvent
}

export function createwithdrawEtherEventEvent(
  senderAddress: Address,
  amount: BigInt,
  totalStaked: BigInt
): withdrawEtherEvent {
  let withdrawEtherEventEvent = changetype<withdrawEtherEvent>(newMockEvent())

  withdrawEtherEventEvent.parameters = new Array()

  withdrawEtherEventEvent.parameters.push(
    new ethereum.EventParam(
      "senderAddress",
      ethereum.Value.fromAddress(senderAddress)
    )
  )
  withdrawEtherEventEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  withdrawEtherEventEvent.parameters.push(
    new ethereum.EventParam(
      "totalStaked",
      ethereum.Value.fromUnsignedBigInt(totalStaked)
    )
  )

  return withdrawEtherEventEvent
}

export function createwithdrawTokenEventEvent(
  tokenContract: Address,
  senderAddress: Address,
  amount: BigInt,
  totalStaked: BigInt
): withdrawTokenEvent {
  let withdrawTokenEventEvent = changetype<withdrawTokenEvent>(newMockEvent())

  withdrawTokenEventEvent.parameters = new Array()

  withdrawTokenEventEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContract",
      ethereum.Value.fromAddress(tokenContract)
    )
  )
  withdrawTokenEventEvent.parameters.push(
    new ethereum.EventParam(
      "senderAddress",
      ethereum.Value.fromAddress(senderAddress)
    )
  )
  withdrawTokenEventEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  withdrawTokenEventEvent.parameters.push(
    new ethereum.EventParam(
      "totalStaked",
      ethereum.Value.fromUnsignedBigInt(totalStaked)
    )
  )

  return withdrawTokenEventEvent
}
