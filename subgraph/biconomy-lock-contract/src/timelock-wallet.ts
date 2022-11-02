import { BigInt } from "@graphprotocol/graph-ts"
import {
  TimelockWallet,
  depositEtherEvent,
  depositTokenEvent,
  withdrawEtherEvent,
  withdrawTokenEvent
} from "../generated/TimelockWallet/TimelockWallet"
import { Token, User, Wallet } from "../generated/schema"

export function handledepositEtherEvent(event: depositEtherEvent): void {

  let tokenEntity = Token.load("-")
  if(!tokenEntity) {
    tokenEntity = new Token("-")
    tokenEntity.save()
  }

  let userEntity = User.load(event.params.senderAddress.toHex())
  if(!userEntity) {
    userEntity = new User(event.params.senderAddress.toHex())
    userEntity.user = event.params.senderAddress
    userEntity.save()
  }

  let walletEntity = Wallet.load(event.params.senderAddress.toHex() + "-")
  if(!walletEntity) {
    walletEntity = new Wallet(event.params.senderAddress.toHex() + "-")
    walletEntity.user = userEntity.id
    walletEntity.token = tokenEntity.id
    walletEntity.balance = event.params.totalStaked
    walletEntity.locktime = event.params.locktime
    walletEntity.save()
  } else {
    walletEntity.balance = event.params.totalStaked
    walletEntity.locktime = event.params.locktime
    walletEntity.save()
  }
}

export function handledepositTokenEvent(event: depositTokenEvent): void {

  let tokenEntity = Token.load(event.params.tokenContract.toHex())
  if(!tokenEntity) {
    tokenEntity = new Token(event.params.tokenContract.toHex())
    tokenEntity.contract = event.params.tokenContract
    tokenEntity.save()
  }

  let userEntity = User.load(event.params.senderAddress.toHex())
  if(!userEntity) {
    userEntity = new User(event.params.senderAddress.toHex())
    userEntity.user = event.params.senderAddress
    userEntity.save()
  }

  let walletEntity = Wallet.load(event.params.senderAddress.toHex() + "-" + event.params.tokenContract.toHex())
  if(!walletEntity) {
    walletEntity = new Wallet(event.params.senderAddress.toHex() + "-" + event.params.tokenContract.toHex())
    walletEntity.user = userEntity.id
    walletEntity.token = tokenEntity.id
    walletEntity.balance = event.params.totalStaked
    walletEntity.locktime = event.params.locktime
    walletEntity.save()
  } else {
    walletEntity.balance = event.params.totalStaked
    walletEntity.locktime = event.params.locktime
    walletEntity.save()
  }
}

export function handlewithdrawEtherEvent(event: withdrawEtherEvent): void {

  let walletEntity = Wallet.load(event.params.senderAddress.toHex() + "-")
  if(walletEntity){
    walletEntity.balance = event.params.totalStaked
    walletEntity.save()
  }
}

export function handlewithdrawTokenEvent(event: withdrawTokenEvent): void {

  let walletEntity = Wallet.load(event.params.senderAddress.toHex() + "-" + event.params.tokenContract.toHex())
  if(walletEntity) {
    walletEntity.balance = event.params.totalStaked
    walletEntity.save()
  }
}
