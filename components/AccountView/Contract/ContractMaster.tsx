
import React from "react";
import AccountSidebar from "../AccountSidebar";
import ContractNavbars from "./ContractNavtabs";
import useContract from "@/hooks/contract_hooks/contract_hooks";
import useContractList from "@/hooks/contract_hooks/contract_hooks";

const ContractMaster = () => {
  const {contractData , loading} = useContractList();

  console.log('job contract list',contractData)
  const filteredContracts = contractData?.filter((contract:any) => {
    return contract.status === "Active" || contract.status === "Unsigned";
  });

  console.log('Filtered job contracts:', filteredContracts);
  const filteredContractsInactive= contractData?.filter((contract:any) => {
    return contract.status === "Inactive";
  });
  console.log('Filtered job contracts:inactive', filteredContractsInactive);
  return (
    <>
      <ContractNavbars filteredContractsActiveUnsigned={filteredContracts} filteredContractsInactive={filteredContractsInactive}/>
    </>
  );
};

export default ContractMaster;
