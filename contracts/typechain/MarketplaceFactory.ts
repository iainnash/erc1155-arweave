/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { Marketplace } from "./Marketplace";

export class MarketplaceFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(nftContract: string, overrides?: Overrides): Promise<Marketplace> {
    return super.deploy(nftContract, overrides || {}) as Promise<Marketplace>;
  }
  getDeployTransaction(
    nftContract: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(nftContract, overrides || {});
  }
  attach(address: string): Marketplace {
    return super.attach(address) as Marketplace;
  }
  connect(signer: Signer): MarketplaceFactory {
    return super.connect(signer) as MarketplaceFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Marketplace {
    return new Contract(address, _abi, signerOrProvider) as Marketplace;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "editions",
        type: "uint16",
      },
    ],
    name: "purchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "collectionId",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161089538038061089583398101604081905261002f916100ac565b60006100396100a8565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600280546001600160a01b0319166001600160a01b03929092169190911790556100da565b3390565b6000602082840312156100bd578081fd5b81516001600160a01b03811681146100d3578182fd5b9392505050565b6107ac806100e96000396000f3fe60806040526004361061004a5760003560e01c8063715018a61461004f5780638da5cb5b14610066578063b217cdab14610091578063bbc2986c146100a4578063f2fde38b146100c4575b600080fd5b34801561005b57600080fd5b506100646100e4565b005b34801561007257600080fd5b5061007b610176565b60405161008891906105dc565b60405180910390f35b61006461009f3660046105aa565b610185565b3480156100b057600080fd5b506100646100bf366004610567565b610403565b3480156100d057600080fd5b506100646100df36600461051d565b610459565b6100ec610519565b6001600160a01b03166100fd610176565b6001600160a01b03161461012c5760405162461bcd60e51b8152600401610123906106d5565b60405180910390fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b600254604051630b43e78560e31b815260009160019183916001600160a01b031690635a1f3c28906101bb90889060040161072f565b60206040518083038186803b1580156101d357600080fd5b505afa1580156101e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061020b919061054b565b61ffff1661ffff1681526020019081526020016000205490506000811180156102be575060025461ffff8316906001600160a01b031662fdd58e61024d610176565b866040518363ffffffff1660e01b815260040161026b92919061062b565b60206040518083038186803b15801561028357600080fd5b505afa158015610297573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102bb9190610592565b10155b6102da5760405162461bcd60e51b81526004016101239061068a565b346102e961ffff841683610738565b146103065760405162461bcd60e51b81526004016101239061070a565b6000610310610176565b6001600160a01b031682604051610326906105d9565b60006040518083038185875af1925050503d8060008114610363576040519150601f19603f3d011682016040523d82523d6000602084013e610368565b606091505b50509050806103895760405162461bcd60e51b8152600401610123906106b0565b6002546001600160a01b031663f242432a6103a2610176565b6103aa610519565b87876040518563ffffffff1660e01b81526004016103cb94939291906105f0565b600060405180830381600087803b1580156103e557600080fd5b505af11580156103f9573d6000803e3d6000fd5b5050505050505050565b61040b610519565b6001600160a01b031661041c610176565b6001600160a01b0316146104425760405162461bcd60e51b8152600401610123906106d5565b61ffff909116600090815260016020526040902055565b610461610519565b6001600160a01b0316610472610176565b6001600160a01b0316146104985760405162461bcd60e51b8152600401610123906106d5565b6001600160a01b0381166104be5760405162461bcd60e51b815260040161012390610644565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b60006020828403121561052e578081fd5b81356001600160a01b0381168114610544578182fd5b9392505050565b60006020828403121561055c578081fd5b815161054481610763565b60008060408385031215610579578081fd5b823561058481610763565b946020939093013593505050565b6000602082840312156105a3578081fd5b5051919050565b600080604083850312156105bc578182fd5b8235915060208301356105ce81610763565b809150509250929050565b90565b6001600160a01b0391909116815260200190565b6001600160a01b039485168152929093166020830152604082015261ffff909116606082015260a06080820181905260009082015260c00190565b6001600160a01b03929092168252602082015260400190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252600c908201526b4e6f7420666f722073616c6560a01b604082015260600190565b6020808252600b908201526a1619995c8819985a5b195960aa1b604082015260600190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6020808252600b908201526a57726f6e6720707269636560a81b604082015260600190565b90815260200190565b600081600019048311821515161561075e57634e487b7160e01b81526011600452602481fd5b500290565b61ffff8116811461077357600080fd5b5056fea2646970667358221220b4868961a7d8e519976f641f8f2bf0d698a20dddb38426411f6d2566c7f8672d64736f6c63430008000033";
