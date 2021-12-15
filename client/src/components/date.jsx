import React, { useState } from "react";
import DatePicker, { registerLocale,setDefaultLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";

registerLocale('pt-BR', ptBR);
setDefaultLocale('pt-BR');

export default function DateInput (props) {
  const [startDate, setStartDate] = useState(new Date());
  props.callbackParent(startDate);
  return (
    <DatePicker
      selected={startDate}
      dateFormat='dd/MM/yyyy'
      isClearable
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      onChange={(date) => setStartDate(date)}
    />
  );
};
