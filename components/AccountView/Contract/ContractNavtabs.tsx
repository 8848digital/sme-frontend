import ActiveContractCard from "@/cards/ActiveContractCard";
import InactiveContractCard from "@/cards/InactiveContractCard";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/account.module.css";
import * as React from "react";
import { Nav, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";



const  ContractNavbars = ({filteredContractsActiveUnsigned , filteredContractsInactive}:any) => {
  const transtationDataFromStore = useSelector(translation_text_from_Store)


  return (
    <>
      <div className="container">
        <div className={`row card  ${styles.account_wrapper}`}>
          <div className="">
            <h1 className={`${styles.header_text}`}>{transtationDataFromStore?.data?.contract}</h1>
          </div>
          <div className="mt-5">
            <Tab.Container id="tabs-example" defaultActiveKey="tab1">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="tab1">{transtationDataFromStore?.data?.contract_active}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tab2">{transtationDataFromStore?.data?.contract_history}</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="tab1">
                  
                  <ActiveContractCard filteredContractsActiveUnsigned={filteredContractsActiveUnsigned}/>
                </Tab.Pane>
                <Tab.Pane eventKey="tab2">
                <InactiveContractCard filteredContractsInactive={filteredContractsInactive}/>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    </>
  );
}


  export default ContractNavbars;