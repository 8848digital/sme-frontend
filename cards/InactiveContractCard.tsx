import ContractDescription from "@/components/AccountView/Contract/ContractDescription";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import Link from "next/link";
import { useRouter } from "next/router";
import React ,{useState} from "react";
import { useSelector } from "react-redux";
const InactiveContractCard = ({ filteredContractsInactive }: any) => {
  console.log("job contract inactive in card", filteredContractsInactive);
  console.log("job contract active in card", filteredContractsInactive);
  const [tabs, setTabs] = useState<any>("table");
  const router = useRouter();
  const [descriptionData, setDescriptionData] = useState<any>([]);
  const transtationDataFromStore = useSelector(translation_text_from_Store)

  const openDescription = (e: any, tabs: string) => {
    setDescriptionData(e);
    setTabs(tabs);
  };
  return (
    <>
     <div className="row">
      {tabs === "table" && (
        <div className="col-12">
          <table className="table table-bordered">
            <thead className="p-2">
              <tr className="">
                <th>{transtationDataFromStore?.data?.project_name}</th>
                <th className="text-center">{transtationDataFromStore?.data?.status}</th>
                <th className="text-center">{transtationDataFromStore?.data?.action}</th>
              </tr>
            </thead>
            <tbody>
              {filteredContractsInactive &&
                filteredContractsInactive.length > 0 && (
                  <>
                    {filteredContractsInactive.map(
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
                                  style={{ width: "auto" }}
                                  onClick={() =>
                                    openDescription(data, "description")
                                  }
                                >
                                 {transtationDataFromStore?.data?.view_full_btn}
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
          {filteredContractsInactive &&
          filteredContractsInactive.length >0 ? (
            <></>
          ) : (
            <div className="text-center">
              <p>{transtationDataFromStore?.data?.no_data_available}</p>
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
    </>
  );
};
export default InactiveContractCard;