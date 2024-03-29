import ActiveContractCard from "@/cards/ActiveContractCard";
import InactiveContractCard from "@/cards/InactiveContractCard";
import Loaders from "@/components/Loaders";
import NoDataFound from "@/components/NoDataFound";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/contract.module.css";
import { Nav, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";

const ContractNavbars = ({
  filteredContractsActiveUnsigned,
  filteredContractsInactive,
  loading,
}: any) => {
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <>
      <div className="container">
        {loading ? (
          <Loaders />
        ) : (
          <div className={`row m-0 p-0 `}>
            <div className="p-0 ">
              <p className={`${styles.header_text} fs-32 lh-24 fw-500`}>
                {translationDataFromStore?.data?.all_contract}
              </p>
            </div>
            {filteredContractsActiveUnsigned?.length > 0 ||
            filteredContractsInactive?.length > 0 ? (
              <div className=" p-0">
                <Tab.Container id="tabs-example" defaultActiveKey="tab1">
                  <Nav variant="underline">
                    <Nav.Item className={`${styles.nav_item}`}>
                      <Nav.Link
                        eventKey="tab1"
                        className="fs-16 lh-24 fw-500 nav_link text-center"
                      >
                        {translationDataFromStore?.data?.contract_active}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item
                      className={`${styles.nav_item_end} ${styles.nav_item}`}
                    >
                      <Nav.Link
                        eventKey="tab2"
                        className="fs-16 lh-24 fw-500 nav_link text-center"
                      >
                        {translationDataFromStore?.data?.contract_history}
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content className={styles.tab_content_wrapper}>
                    <Tab.Pane eventKey="tab1">
                      <ActiveContractCard
                        filteredContractsActiveUnsigned={
                          filteredContractsActiveUnsigned
                        }
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tab2">
                      <InactiveContractCard
                        filteredContractsInactive={filteredContractsInactive}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            ) : (
              <NoDataFound />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ContractNavbars;
