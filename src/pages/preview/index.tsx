import styles from "./styles.module.css";

import ReferenceDetails from "../../components/referenceDetails";
import EndpointDetails from "../../components/endpointDetails";
import ResponseDetails from "../../components/responseDetails";
export default function Preview(): JSX.Element {
  return (
    <div style={{height: "100vh"}}>
        <div style={{height: "10vh", backgroundColor:"rgb(21, 21, 21"}}>
        <div className={styles.t}>API Documentation Preview</div>
        </div>
      <div className={styles.f}>
        <ReferenceDetails />
        <EndpointDetails />
        <ResponseDetails />
      </div>
    </div>
  );
}
