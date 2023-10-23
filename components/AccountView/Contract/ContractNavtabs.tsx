import styles from "@/styles/account.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ContractNavbars() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="container">
        <div className={`row card  ${styles.account_minwrapper}`}>
          <div className="">
            <h1 className={`${styles.header_text}`}>Contract</h1>
          </div>
          <div className="mt-5">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={`${styles.contract_tabs}`}
                >
                  <Tab
                    className={
                      value !== 0 ? "btn btn-later mt-0 " : "btn btn-signup"
                    }
                    style={{ width: "fit-content" }}
                    label="Active"
                    {...a11yProps(0)}
                  />
                  <Tab
                    style={{ width: "fit-content" }}
                    className={
                      value !== 1 ? "btn btn-later mt-0" : "btn btn-signup"
                    }
                    label="History"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className="col-12">
                  <table className="table table-bordered">
                    <thead className="p-2">
                      <tr className="">
                        <th>Project Name</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h2>SME-Frontend</h2>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-later px-2 mt-0 py-1 ">
                            View Full
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className="col-12">
                  <table className="table table-bordered">
                    <thead className="p-2">
                      <tr className="">
                        <th>History</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h2>SME-Frontend</h2>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-later px-2 mt-0 py-1 ">
                            View Full
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
