// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class depositEtherEvent extends ethereum.Event {
  get params(): depositEtherEvent__Params {
    return new depositEtherEvent__Params(this);
  }
}

export class depositEtherEvent__Params {
  _event: depositEtherEvent;

  constructor(event: depositEtherEvent) {
    this._event = event;
  }

  get senderAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get totalStaked(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get locktime(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class depositTokenEvent extends ethereum.Event {
  get params(): depositTokenEvent__Params {
    return new depositTokenEvent__Params(this);
  }
}

export class depositTokenEvent__Params {
  _event: depositTokenEvent;

  constructor(event: depositTokenEvent) {
    this._event = event;
  }

  get tokenContract(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get senderAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get totalStaked(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get locktime(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class withdrawEtherEvent extends ethereum.Event {
  get params(): withdrawEtherEvent__Params {
    return new withdrawEtherEvent__Params(this);
  }
}

export class withdrawEtherEvent__Params {
  _event: withdrawEtherEvent;

  constructor(event: withdrawEtherEvent) {
    this._event = event;
  }

  get senderAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get totalStaked(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class withdrawTokenEvent extends ethereum.Event {
  get params(): withdrawTokenEvent__Params {
    return new withdrawTokenEvent__Params(this);
  }
}

export class withdrawTokenEvent__Params {
  _event: withdrawTokenEvent;

  constructor(event: withdrawTokenEvent) {
    this._event = event;
  }

  get tokenContract(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get senderAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get totalStaked(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class TimelockWallet extends ethereum.SmartContract {
  static bind(address: Address): TimelockWallet {
    return new TimelockWallet("TimelockWallet", address);
  }

  getTrustedForwarder(): Address {
    let result = super.call(
      "getTrustedForwarder",
      "getTrustedForwarder():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getTrustedForwarder(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getTrustedForwarder",
      "getTrustedForwarder():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isTrustedForwarder(forwarder: Address): boolean {
    let result = super.call(
      "isTrustedForwarder",
      "isTrustedForwarder(address):(bool)",
      [ethereum.Value.fromAddress(forwarder)]
    );

    return result[0].toBoolean();
  }

  try_isTrustedForwarder(forwarder: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isTrustedForwarder",
      "isTrustedForwarder(address):(bool)",
      [ethereum.Value.fromAddress(forwarder)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  versionRecipient(): string {
    let result = super.call(
      "versionRecipient",
      "versionRecipient():(string)",
      []
    );

    return result[0].toString();
  }

  try_versionRecipient(): ethereum.CallResult<string> {
    let result = super.tryCall(
      "versionRecipient",
      "versionRecipient():(string)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get trustedForwarder(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _baseLockTime(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DepositEtherCall extends ethereum.Call {
  get inputs(): DepositEtherCall__Inputs {
    return new DepositEtherCall__Inputs(this);
  }

  get outputs(): DepositEtherCall__Outputs {
    return new DepositEtherCall__Outputs(this);
  }
}

export class DepositEtherCall__Inputs {
  _call: DepositEtherCall;

  constructor(call: DepositEtherCall) {
    this._call = call;
  }
}

export class DepositEtherCall__Outputs {
  _call: DepositEtherCall;

  constructor(call: DepositEtherCall) {
    this._call = call;
  }
}

export class DepsitTokenCall extends ethereum.Call {
  get inputs(): DepsitTokenCall__Inputs {
    return new DepsitTokenCall__Inputs(this);
  }

  get outputs(): DepsitTokenCall__Outputs {
    return new DepsitTokenCall__Outputs(this);
  }
}

export class DepsitTokenCall__Inputs {
  _call: DepsitTokenCall;

  constructor(call: DepsitTokenCall) {
    this._call = call;
  }

  get _tokenContract(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DepsitTokenCall__Outputs {
  _call: DepsitTokenCall;

  constructor(call: DepsitTokenCall) {
    this._call = call;
  }
}

export class WithdrawEtherCall extends ethereum.Call {
  get inputs(): WithdrawEtherCall__Inputs {
    return new WithdrawEtherCall__Inputs(this);
  }

  get outputs(): WithdrawEtherCall__Outputs {
    return new WithdrawEtherCall__Outputs(this);
  }
}

export class WithdrawEtherCall__Inputs {
  _call: WithdrawEtherCall;

  constructor(call: WithdrawEtherCall) {
    this._call = call;
  }

  get _withdrawAmount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawEtherCall__Outputs {
  _call: WithdrawEtherCall;

  constructor(call: WithdrawEtherCall) {
    this._call = call;
  }
}

export class WithdrawTokenCall extends ethereum.Call {
  get inputs(): WithdrawTokenCall__Inputs {
    return new WithdrawTokenCall__Inputs(this);
  }

  get outputs(): WithdrawTokenCall__Outputs {
    return new WithdrawTokenCall__Outputs(this);
  }
}

export class WithdrawTokenCall__Inputs {
  _call: WithdrawTokenCall;

  constructor(call: WithdrawTokenCall) {
    this._call = call;
  }

  get _tokenContract(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _withdrawAmount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawTokenCall__Outputs {
  _call: WithdrawTokenCall;

  constructor(call: WithdrawTokenCall) {
    this._call = call;
  }
}
