import "./style.css";

import customHooks from "../utils/customHooks";
import FormContent from "./FormContent";
import MyButton from "./MyButton";
import MyDatePicker from "./MyDatePicker";
import MyRangePicker from "./MyRangePicker";
import SearchInput from "./SearchInput";
import SearchTop from "./SearchTop";
import StaticSelect from "./StaticSelect";
import StaticTabs from "./StaticTabs";
import ImageUpload from "./ImageUpload";
import MyInputNumber from "./MyInputNumber";
import ComImg from "./ComImg";
import theme from "../theme";
import RadioButtons from "./RadioButtons";
import SwitchGroup from "./SwitchGroup";
import loadingPage from "./loadingPage";
import SpuInfo from "./SpuInfo";
import BasicTable from "./BasicTable";
import BasicModal from "./BasicModal";

import AppState from "../utils/appState";
import initEnv from "../utils/initEnv";
import cookie from "../utils/cookie";
import localStorage from "../utils/localStorage";
import * as utils from "../utils/utils";

const appState = new AppState();
console.log(buildEnv, "buildEnv");
export {
  loadingPage,
  MyButton,
  FormContent,
  ImageUpload,
  MyInputNumber,
  MyDatePicker,
  MyRangePicker,
  SearchInput,
  SearchTop,
  StaticSelect,
  StaticTabs,
  ComImg,
  RadioButtons,
  SwitchGroup,
  SpuInfo,
  BasicTable,
  BasicModal,
  appState,
  initEnv,
  cookie,
  localStorage,
  theme,
  customHooks,
  utils,
};
