import ActiveContractCard from "@/cards/ActiveContractCard";
import InactiveContractCard from "@/cards/InactiveContractCard";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import styles from "@/styles/account.module.css";
import * as React from "react";
import { Nav, Tab } from "react-bootstrap";



const  ContractNavbars = ({filteredContractsActiveUnsigned , filteredContractsInactive}:any) => {
  const { translationData, translationLoading } = useTranslationText();

  return (
    <>
      <div className="container">
        <div className={`row card  ${styles.account_wrapper}`}>
          <div className="">
            <h1 className={`${styles.header_text}`}>{translationData?.contract}</h1>
          </div>
          <div className="mt-5">
            <Tab.Container id="tabs-example" defaultActiveKey="tab1">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="tab1">{translationData?.contract_active}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tab2">{translationData?.contract_history}</Nav.Link>
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