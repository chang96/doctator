import styles from "./styles.module.css";

import ReferenceDetails from "../../components/referenceDetails";
import EndpointDetails from "../../components/endpointDetails";
import ResponseDetails from "../../components/responseDetails";
export default function Preview(): JSX.Element {
  return (
    <div>
      <div>
        <h1>API Documentation Preview</h1>
      </div>
      <div className={styles.f}>
        <ReferenceDetails />
        <EndpointDetails />
        <ResponseDetails />
      </div>
    </div>
  );
}
