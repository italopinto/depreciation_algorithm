import React, { useState } from "react";

export default function Dropdown(props) {
  const [drop, setDrop] = useState(true);
  const [vida, setVida] = useState(null);
  const [taxa, setTaxa] = useState(null);
  const [selection, setSelection] = useState(null);

  function itemSelected(vidaUtil, taxaDepreciacao, bem) {
    setDrop(false);
    setSelection(bem);
    setVida(vidaUtil);
    setTaxa(taxaDepreciacao);
  }

  props.callbackParent(vida, taxa, selection);

  return (
    <>
      <div className="dropdown is-hoverable">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
            { drop ? <span>Selecione</span> : <span>{selection}</span> }
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu4" role="menu">
          <div className="dropdown-content">
            {
              props.data.map(
                (item, index) =>
                  <a
                  href="#"
                  className="dropdown-item"
                  key={index}
                  onClick={() => itemSelected(item.vida_util, item.taxa_depreciacao, item.bens)}>
                    <p>{item.bens}</p>
                    <hr className="dropdown-divider"></hr>
                  </a>
              )
            }
          </div>
        </div>
      </div>
      {/* {!drop &&
        <div className="content mx-2 my-4">
          {selection}
        </div>
      } */}
    </>
  )
}

