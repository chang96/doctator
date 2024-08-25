import Btn from "../button";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { openModal } from "../../slices/modalSlices";
import { CONFIG_SELECTED, PATH_SELECTED } from "../../actions/actions";

const projects = {
  defaultProject: {
    config: {},
    paths: {},
    set: false
  }
}

if (!window.localStorage.getItem('projects')) window.localStorage.setItem('projects', JSON.stringify(projects));

const btns = [
  {
    name: "Config",
    styles: { height: "30px", width: "80%" },
    func: (d: AppDispatch, f: any) => {
        d(f({type: CONFIG_SELECTED}))
    },
  },
  {
    name: "Paths",
    styles: { height: "30px", width: "80%", marginTop: "5%" },
    func: (d: AppDispatch, f: any) => {
      d(f({type: PATH_SELECTED}))
    },
  },
];

function Configurations() {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div style={{ width: "100%" }}>
      {btns.map((btn, i) => (
        <div
          key={i}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Btn
            key={i}
            styles={btn.styles}
            name={btn.name}
            func={ () => btn.func(dispatch, openModal) }
          />
        </div>
      ))}
    </div>
  );
}
export default function SideBarBody(): JSX.Element {
  return (
    <div className={styles.f}>
      <Configurations />
    </div>
  );
}
