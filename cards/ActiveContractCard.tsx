import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ContractDescription from "@/components/AccountView/Contract/ContractDescription";
const ActiveContractCard = ({ filteredContractsActiveUnsigned }: any) => {
  console.log("job contract active in card", filteredContractsActiveUnsigned);
  const [tabs, setTabs] = useState<any>("table");
  const router = useRouter();
  const [descriptionData, setDescriptionData] = useState<any>([]);
  const openDescription = (e: any, tabs: string) => {
    setDescriptionData(e);
    setTabs(tabs);
  };
  return (
    <div className="row">
      {tabs === "table" && (
        <div className="col-12" style={{overflowX:"scroll"}}>
          <table className="table table-bordered">
            <thead className="p-2">
              <tr className="">
                <th>Project Name</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredContractsActiveUnsigned &&
                filteredContractsActiveUnsigned.length > 0 && (
                  <>
                    {filteredContractsActiveUnsigned.map(
                      (data: any, index: any) => {
                        return (
                      
                            <tr key={index}>
                              <td>
                                <h2>{data?.custom_project_name}</h2>
                              </td>
                              <td className="text-center">
                                <h2>{data?.status}</h2>
                              </td>
                              <td className="text-center">
                                <button
                                  className="btn btn-later"
                                  style={{ width: "auto",padding:"10px",margin:"0px" }}
                                  onClick={() =>
                                    openDescription(data, "description")
                                  }
                                >
                                  View Full
                                </button>
                                {/* <Link className='color' href={data?.contract_pdf_url} target='_blank'> </Link> */}
                              </td>
                            </tr>
                          
                        );
                      }
                    )}
                  </>
                )}
            </tbody>
          </table>
          {filteredContractsActiveUnsigned &&
          filteredContractsActiveUnsigned.length >0 ? (
            <></>
          ) : (
            <div className="text-center">
              <p>No Data Available</p>
            </div>
          )}
        </div>
      )}
      {tabs === "description" && (
        <div>
          <ContractDescription
            openDescription={setTabs}
            data={descriptionData}
          />
        </div>
      )}
    </div>
  );
};
export default ActiveContractCard;