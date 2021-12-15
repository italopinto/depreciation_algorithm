import React, { useState } from "react";

import DateInput from "./date";
import Dropdown from "./dropdown";


export default function FirstForm(props) {
  const [data, setData] = useState(null);
  const [vida, setVida] = useState(null);
  const [taxa, setTaxa] = useState(null);
  const [bem, setBem] = useState(null);
  const [custo, setCusto] = useState(null);
  const [dep, setDep] = useState(false);


  function handleSubmit(event){
    event.preventDefault();
    console.log(data, vida, taxa, bem, custo);
    if (!data || !vida || !taxa || !bem || !custo || typeof custo != "number") {

    } else {
      setDep(true);
      props.callbackParent(data.getFullYear(), vida, taxa, bem, custo);
    }
  }

  function getInputDate(date){
    setData(date);
  }

  function dropData(vida_util, taxa_depreciacao, bens) {
    setVida(vida_util);
    setTaxa(taxa_depreciacao);
    setBem(bens);
  }

  function changeCusto(event) {
    setCusto(parseFloat(event.target.value));
  }

  function depreciation(dataUser, vidaUtil, custoBem, taxaDep) {
    const result = custoBem / vidaUtil;
    // const info = verificaVidaUtil(vidaUtil, dataUser);
    return (
      <>
        <h3 className="is-size-3 has-text-centered has-text-weight-normal">Método da Receita Federal</h3>
        <table className="table is-bordered is-fullwidth my-4">
          <thead>
            <tr>
              <th>Tipo do bem ({props.bem})*</th>
              <th>Vida útil*</th>
              <th>Taxa de depreciação<a href="https://www.gov.br/receitafederal/pt-br" target="_blank"> SRFB*</a></th>
              <th>Valor da depreciação anual (R$)</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td>*Dados tabelados do Anexo I da <a href="http://normas.receita.fazenda.gov.br/sijut2consulta/anexoOutros.action?idArquivoBinario=36085" target="_blank">Receita Federal do Brasil</a></td>
            </tr>
          </tfoot>
          <tbody>
            <td>{bem}</td>
            <td>{vidaUtil}</td>
            <td>{taxaDep}</td>
            <td>{result}</td>
          </tbody>
        </table>
        {/* <div className="notification is-warning">
          <strong>
            {
            typeof (info) === "object" ?
            `Faltam ${(Math.floor(info.ano))} anos e ${info.mes} meses para o fim da vida útil, cerca de R$ ${(Math.floor(info.ano) * result) + (Math.round((result / 12) * info.mes))} de depreciação!`
              :
              info
            }
          </strong>
        </div> */}
      </>
      );
  }

  /**
   function verificaVidaUtil(vida_util_srfb, vida_util_user) {
     const limite = vida_util_srfb * 12;
     const vidaCalculada = vida_util_user.getFullYear();
     const anoAtual = new Date().getFullYear();
     const result = ((anoAtual - vidaCalculada) * 12) + (vida_util_user.getMonth() + 1);

     if (result == 0) {
       return "Começo da vida útil do bem!";
     } else if (result < limite) {
       const boundary = (limite / 12);
       const lifeCalculated = (result / 12);
       const anoCalculado = Math.floor(boundary) - Math.floor(lifeCalculated);
       const ano = anoCalculado == vida_util_srfb ? vida_util_srfb - 1 : anoCalculado;
       const mes = (limite - result) % 12;
       return { ano: ano, mes: mes };
     } else if (result == limite) {
       return "Último ano da vida útil do bem!";
     } else if (result > limite) {
       return "Vida útil do bem esgotada!";
     }
   }

   */

  return (
    <>
      {!dep && (
        <form onSubmit={handleSubmit}>
          <section className="section">
            <h3 className="subtitle is-3 has-text-centered">Cálculo da deprecição, pelo método da Receita Federal</h3>
          </section>
          <div className="field">
            <label className="label">Qual o bem?</label>
            <Dropdown data={props.dados} callbackParent={dropData}/>
          </div>
          <div className="field">
            <label className="label">Qual a data de aquisição?</label>
            <DateInput callbackParent={getInputDate}/>
          </div>
          <div className="field">
            <label className="label">Custo do bem:</label>
            <input type="text" onChange={changeCusto}/>
          </div>
          <div className="field mb-6">
            <div className="control">
              <button type="submit" className="button is-primary has-text-weight-bold">Calcular</button>
            </div>
          </div>
        </form>
      )}
      {dep && (
        <>
          <div className="content">
            {depreciation(data, vida, custo, taxa)}
          </div>
        </>
      )}
    </>
  );
}
