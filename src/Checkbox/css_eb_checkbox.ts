import {CONST as C} from "../css_const";
import {ICSSProperties} from "../css_types";

const LiBase: ICSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "row",
  alignItems: "center",
  fontFamily: "HelveticaNeue, Helvetica Neue, HelveticaNeueRoman, HelveticaNeue-Roman, Helvetica Neue Roman, TeXGyreHerosRegular, Helvetica, Tahoma, Geneva, Arial",
  border: 0,
  height: "20px",
  padding: "2px 2px",
  outline: "none",
  userSelect: "none",
  listStyle: "none",
  fontSize: 12,
  color: C.TextColor,
  boxSizing: 'border-box'
};

const LiDisabled: ICSSProperties = {
  backgroundColor: "#989898",
};

const Base: ICSSProperties = {
  display: "flex",
  float: "left",
  flexDirection: "row",
  margin: "10px",
};

const Input: ICSSProperties = {
  margin: "0 5px 0 0",
  cursor: "pointer",
};

const InputDisabled: ICSSProperties = {
  ":checked": {
    color: "#393939",
  },
};

const InputActive: ICSSProperties = {
};

const Text: ICSSProperties = {
  margin: "0 0 5px 0",
  cursor: "pointer",
};

const Title: ICSSProperties = {
  margin: "0 0 8px 2px",
  cursor: "pointer",
};

export {LiBase, LiDisabled, Base, Text, Input, InputDisabled, InputActive, Title};
