import React from "react";
import CheckBox from "./CheckBox";

export default function ScrollableBlock() {
  return (
    <div className="vkToolsScrollable">
      <CheckBox type={"checkBox"} label={`Режим "не беспокоить"`} description={"Данная функция отключает входящие звонки. Звонящий не будет знать, что вы отключили звонки"} />
    </div>
  );
}
