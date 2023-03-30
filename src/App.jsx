import './App.css';
import {Button, Card, Footer, Label} from "flowbite-react";
import {useState} from "react";

function sortear(quantos) {
  const numeros = [];
  while (quantos > 0) {
    const novo = Math.floor(Math.random() * 60 + 1);
    if (numeros.includes(novo)) continue;
    numeros.push(novo);
    quantos -= 1;
  }
  numeros.sort((a, b) => (a > b ? +1 : -1));
  return numeros;
}
export default function App() {
  const [quantos, setQuantos] = useState(6);
  const [range, setRange] = useState(6);
  const rangeConvertido = Math.floor(60 * range / 100);
  const [numeros, setNumeros] = useState([]);

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-4xl">Mega Sena</h1>
        <Label
          htmlFor="quantos"
          value={`Números para sortear entre 0 e 60: ${rangeConvertido}`}
        />
        <input id="quantos"
               type="range"
               value={range}
               onChange={({target: {value}}) => {
                 setRange(parseInt(value));
               }}
               className="max-w-xl h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 my-4"
        />
        <Button
          type="button"
          onClick={() => {
            setQuantos(rangeConvertido);
            setNumeros(sortear(rangeConvertido));
          }}>Sortear</Button>

        {numeros.length > 0 && (
          <Card className="max-w-2xl">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Resultado
            </h2>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-right">
              {numeros.join(', ')}
            </p>
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
