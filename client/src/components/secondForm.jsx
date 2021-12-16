import React, { useState } from "react";
import { PieChart } from "./pieChart";


export default function SecondForm(props) {
  // lógica booleana
  const [manut, setManut] = useState(false);
  const [newDep, setNewDep] = useState(false);
  const [dadosChart, setDadosChart] = useState({})

  // variaveis depreciacao
  let valueObs;
  let valueCons;
  let valueManut;
  let valueInte;


  // novos valores calculados
  const [newValues, setNewValues] = useState({});

  function variavesDepreciacao(values) {
    const firstObs = parseFloat(values.firstObs.value);
    const secObs = parseFloat(values.secondObs.value);
    const thiObs = parseFloat(values.thirdObs.value);
    const fouObs = parseFloat(values.fourthObs.value);
    const obsolescencia = firstObs + secObs + thiObs + fouObs;

    const firstCons = parseFloat(values.firstEst.value);
    const secCons = parseFloat(values.secondEst.value);
    const thitCons = parseFloat(values.thirdEst.value);
    const fouCons = parseFloat(values.fourthEst.value);
    const conservacao = firstCons + secCons + thitCons + fouCons;

    const firstManu = !manut ? 0 : parseFloat(values.firstManut.value);
    const secManu = !manut ? 0 : parseFloat(values.secondManut.value);
    const thiManu = !manut ? 0 : parseFloat(values.thirdManut.value);
    const fouManu = !manut ? 0 : parseFloat(values.fourthManut.value);
    const manutencao = firstManu + secManu + thiManu + fouManu;

    const firstInte = parseFloat(values.firstInt.value);
    const secInte = parseFloat(values.secondInt.value);
    const thiInte = parseFloat(values.thirdInt.value);
    const fouInte = parseFloat(values.fourthInt.value);
    const intensidade = firstInte + secInte + thiInte + fouInte;

    return {
      obs: obsolescencia,
      cons: conservacao,
      manu: manutencao,
      ints: intensidade
    }
  }

  function handleManut(event){
    if (event.target.value == "1") setManut(true);
  }

  function handleSubmit(event){
    event.preventDefault();
    const values = variavesDepreciacao(event.target);
    valueObs = values.obs;
    valueCons = values.cons;
    valueManut = values.manu;
    valueInte = values.ints;
    console.log(valueObs, valueCons, valueManut, valueInte);

    // dados para o chart
    setDadosChart({
      obs: valueObs,
      cons: valueCons,
      manut: valueManut,
      inte: valueInte
    })

    setNewValues(newTax());
    setNewDep(true);
  }
  // dados vindos do menu.js
  const data = props.dados;

  const custo = data.custo;
  const vidaUtil = data.vidaUtil;
  const dep = custo / vidaUtil;
  const bem = data.bem;

  // calculo da nova taxa de depreciacao
  function newTax(){
    const depreciation = dep + ((dep*valueObs) + (dep*valueCons) + (dep*valueManut) + (dep*valueInte));
    const taxa = (depreciation / custo)*100;
    const usefulLife = Math.floor(custo / depreciation);

    return {
      novaTaxa: taxa.toFixed(2),
      novaDep: depreciation.toFixed(2),
      novaVidaUtil: usefulLife
    };
  }

  return (
    <>
      {/* Input de dados para o calculo */}
      {!newDep && (
        <form onSubmit={handleSubmit}>
          <section className="section">
            <h3 className="subtitle is-3 has-text-centered">Cálculo da depreciação, pelo método de estudo</h3>
          </section>

          {/* Obsolescência */}
          <div className="py-4">
            <h4 className="title is-4">Obsolescência</h4>
            <div className="field">
              <label className="label">Existem versões mais eficientes?</label>
              <div className="control">
                <div className="select">
                  <select name="firstObs">
                    <option value="0.125">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Existem versões mais novas?</label>
              <div className="control">
                <div className="select">
                  <select name="secondObs">
                    <option value="0.125">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">O bem já perdeu eficiência desde de sua aquisição?</label>
              <div className="control">
                <div className="select">
                  <select name="thirdObs">
                    <option value="0.125">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Esse modelo de ativo já perdeu demanda no mercado?</label>
              <div className="control">
                <div className="select">
                  <select name="fourthObs">
                    <option value="0.125">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="divider"/>

          {/* Estado de conservação */}
          <div className="py-4">
            <h4 className="title is-4">Estado de conservação</h4>
            <div className="field">
              <label className="label">Ativo sem avarias?</label>
              <div className="control">
                <div className="select">
                  <select name="firstEst">
                    <option value="-0.125">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Possui configuração/disposição dos componentes de forma original? (sem adaptações)</label>
              <div className="control">
                <div className="select">
                  <select name="secondEst">
                    <option value="-0.125">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">É utilizado em ambiente adequado de acordo com as instruções do fabricante?</label>
              <div className="control">
                <div className="select">
                  <select name="thirdEst">
                    <option value="-0.125">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Apresenta limpeza adequada?</label>
              <div className="control">
                <div className="select">
                  <select name="fourthEst">
                    <option value="-0.125">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="divider"/>

          {/* Manutenção */}
          <div className="py-4">
            <h4 className="title is-4">Manutenção</h4>
            <div className="field">
              <label className="label">O bem precisa de manutenção?</label>
              <div className="control">
                <div className="select">
                  <select name="manut" onChange={handleManut}>
                    <option value="0">Não</option>
                    <option value="1">Sim</option>
                  </select>
                </div>
              </div>
            </div>
            {manut && (
            <>
              <div className="field">
                <label className="label">É realizado manutenção de forma preventiva?</label>
                <div className="control">
                  <div className="select">
                    <select name="firstManut">
                      <option value="-0.125">Sim</option>
                      <option value="0">Não</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">A manutenção é realizada nos prazos recomendados pelos fabricantes?</label>
                <div className="control">
                  <div className="select">
                    <select name="secondManut">
                      <option value="-0.125">Sim</option>
                      <option value="0">Não</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">A manutenção é realizada por profissionais qualificados?</label>
                <div className="control">
                  <div className="select">
                    <select name="thirdManut">
                      <option value="-0.125">Sim</option>
                      <option value="0">Não</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">São utilizados componentes/peças de qualidade nas manutenções?</label>
                <div className="control">
                  <div className="select">
                    <select name="fourthManut">
                      <option value="-0.125">Sim</option>
                      <option value="0">Não</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
            )}
          </div>
          <div className="divider"/>

          {/* Intensidade de uso */}
          <div className="py-4">
            <h4 className="title is-4">Intensidade de uso</h4>
            <div className="field">
              <label className="label">É utilizado em sua capacidade máxima ou próximo dela? (força, potencia, processamento, etc)</label>
              <div className="control">
                <div className="select">
                  <select name="firstInt">
                    <option value="0.125">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Esse bem é usado frequentemente?</label>
              <div className="control">
                <div className="select">
                  <select name="secondInt">
                    <option value="0.125">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">É utilizado em atividades para qual não foi projetado?</label>
              <div className="control">
                <div className="select">
                  <select name="thirdInt">
                    <option value="0.125">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">É utilizado sem supervisão/controle?</label>
              <div className="control">
                <div className="select">
                  <select name="fourthInt">
                    <option value="0.125">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="divider"/>

          <div className="field mb-6">
            <div className="control">
              <button type="submit" className="button is-primary has-text-weight-bold">Calcular</button>
            </div>
          </div>
        </form>
      )}

      {/* Resultado do calculo pela formula do estudo */}
      {newDep && (
        <>
          <h3 className="is-size-3 has-text-centered has-text-weight-normal">Método de Estudo</h3>
          <table className="table is-bordered is-fullwidth my-4">
            <thead>
              <tr>
                <th>Tipo do bem ({data.tipoAsset})</th>
                <th>Vida útil</th>
                <th>Taxa de depreciação</th>
                <th>Valor da depreciação anual (R$)</th>
              </tr>
            </thead>
            <tfoot>
              {/* <tr>
                <td></td>
              </tr> */}
            </tfoot>
            <tbody>
              <td>{bem}</td>
              <td>{newValues.novaVidaUtil}</td>
              <td>{newValues.novaTaxa}</td>
              <td>{newValues.novaDep}</td>
            </tbody>
          </table>
          <div className="divider block"/>
            <h4 className="is-size-4 has-text-centered has-text-weight-bold my-4">Influência de cada variável</h4>
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <PieChart dados={dadosChart}/>
            </div>
          </div>
          <div className="content">
            <ul>
              <li><strong>Obsolescência:</strong> Aumenta a taxa de depreciação.</li>
              <li><strong>Conservação:</strong> Diminui a taxa de depreciação.</li>
              <li><strong>Manutenção:</strong> Diminui a taxa de depreciação.</li>
              <li><strong>Intensidade de uso:</strong> Aumenta a taxa de depreciação.</li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
