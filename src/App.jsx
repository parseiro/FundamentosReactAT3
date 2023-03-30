import './App.css';
import {Button, Card, Footer, Label, TextInput} from "flowbite-react";
import {useEffect, useState} from "react";

export default function App() {
  const [estado, setEstado] = useState({
    consumo: '100',
    pessoas: '4',
    gorjetaPorcento: '10'
  });
  const [resultado, setResultado] = useState({
    estado: 'aguardando',
    totalFinal: '0',
    gorjetaReais: '0',
    porPessoa: '0',
    erro: null
  });

  const handleChange = ({target: {id, value}}) => {
    setEstado({...estado, [id]: value});
  };

  const {consumo, pessoas, gorjetaPorcento} = estado;

  useEffect(() => {
    if (consumo === '' || pessoas === '' || gorjetaPorcento === '') return setResultado({estado: 'aguardando'});

    const consumoNum = parseFloat(consumo);
    const pessoasNum = parseInt(pessoas);
    const gorjetaPorcentoNum = parseInt(gorjetaPorcento);
    if (isNaN(consumoNum) || isNaN(pessoasNum) || isNaN(gorjetaPorcentoNum)) return setResultado({
      estado: 'erro',
      erro: 'Valores inválidos'
    });

    const gorjetaReais = consumoNum * (gorjetaPorcento / 100);
    const totalFinal = consumoNum + gorjetaReais;
    const porPessoa = totalFinal / pessoas;

    setResultado({
      estado: 'pronto',
      totalFinal,
      gorjetaReais,
      porPessoa,
    });
  }, [estado]);

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-4">
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="consumo"
              value="Soma do consumo da mesa"
            />
          </div>
          <TextInput
            id="consumo"
            type="number"
            placeholder="100"
            value={consumo}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="pessoas"
              value="Dividir em quantas pessoas"
            />
          </div>
          <TextInput
            id="pessoas"
            type="number"
            placeholder="4"
            value={pessoas}
            required={true}
            onChange={handleChange}
          />
        </div>

        <Label
          htmlFor="gorjetaPorcento"
          value={`Gorjeta (${gorjetaPorcento}%)`}
        />
        <input id="gorjetaPorcento"
               type="range"
               value={gorjetaPorcento}
               onChange={handleChange}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 my-4"/>

        {resultado.estado === 'pronto' && (
          <Card>
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Resultado
            </h2>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-right">
              Consumo: R$ {parseFloat(consumo).toFixed(2).replace('.', ',')}
              <br/>
              Gorjeta: R$ {resultado.gorjetaReais.toFixed(2).replace('.', ',')}
              <br/>
              Total com gorjeta: R$ {resultado.totalFinal.toFixed(2).replace('.', ',')}
              <br/>
              Total por pessoa: R$ {resultado.porPessoa.toFixed(2).replace('.', ',')}
            </p>
          </Card>
        )}
        {resultado.estado === 'erro' && (
          <Card href="#">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {resultado.erro}
            </h2>
          </Card>
        )}
      </main>
      <Footer container={true}>
        <Footer.Copyright
          href="https://parseiro.github.io"
          by="Leonardo Vilela Pinheiro"
          year={2023}
        />
      </Footer>
    </>
  );
}
