import React, {useState} from "react";
import axios from "axios";
import replaceAllInserter from 'string.prototype.replaceall';

import Button from "../components/button";
import FirstForm from "../components/firstForm";
import SecondForm from "../components/secondForm";

replaceAllInserter.shim();

export default function Menu() {
  const [dadosDosBens, setDadosDosBens] = useState([]);
  const [btn, setBtn] = useState(true);
  const [bem, setBem] = useState(false);
  const [form2, setForm2] = useState(false);

  const [dataUser, setDataUser] = useState(null);
  const [vidaUtil, setVidaUtil] = useState(null);
  const [taxaSrfb, setTaxaSrfb] = useState(null);
  const [tipoBem, setTipoBem] = useState(null);
  const [custoBem, setCustoBem] = useState(null);

  const depInfo = {
    dataAquisicao: dataUser,
    vidaUtil: vidaUtil,
    taxaSrfb: taxaSrfb,
    bem: tipoBem,
    custo: custoBem
  }

  function dataGlobal (data, vida, taxa, bem, custo) {
    setDataUser(data);
    setVidaUtil(vida);
    setTaxaSrfb(taxa);
    setTipoBem(bem);
    setCustoBem(custo);
    setForm2(true);
  }

  const getCollection = async (e) => {
    const dados = await axios.get(`/api/collections/?collName=${e}`);
    setDadosDosBens(dados.data.data);
    setBtn(false);
    setBem(true);
  };

  const assetType = [
    "aeronaves_aparelhos_espaciais", "animais_vivos", "aparelhos_videofonicos",
    "artefatos_texteis", "artigos_divertimento_esporte", "embarcacoes_estruturas_flutuantes",
    "ferramentas", "instrumentos_aparelhos_opticos", "instrumentos_medicina",
    "maquinas_aparelhos_eletricos", "obras_aluminio", "obras_borracha", "obras_couro",
    "obras_ferro_fundido", "obras_madeira", "obras_metais_diversos", "obras_plastico",
    "obras_vidro", "produtos_ceramicos", "reatores_aparelhos_mecanicos", "veiculos",
    "veiculos_materiais_vias_ferreas"
  ];

  const each = assetType.map(
        (item, index) =>
          <div className="column is-narrow">
            <Button
            key={index}
            value={item.replaceAll("_", " ")}
            onClick={() => getCollection(item.replaceAll(" ", "_"))}
            />
          </div>
      )

  return (
    <>
        {btn && (
          <>
            <section className="section">
              <h3 className="subtitle is-3 has-text-centered has-text-weight-medium">Qual o tipo do bem?</h3>
            </section>
            <div className="columns is-mobile is-multiline is-centered">
              {each}
            </div>
          </>
        )}
        {bem && (
          <>
            <div className="card block">
              <div className="card-content">
                <FirstForm dados={dadosDosBens} callbackParent={dataGlobal}/>
              </div>
            </div>
          </>
        )}
        {form2 && (
          <>
            <div className="card block">
              <div className="card-content">
                <SecondForm dados={depInfo}/>
              </div>
            </div>
          </>
        )}
    </>
  );
}
