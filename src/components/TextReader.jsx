import React, { useState } from "react";
import TextDisplay from "./TextDisplay.jsx";

const Test = () => {
  // Definição dos estados
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState("");

  // Função para lidar com o upload do arquivo
  const selectedFile = (e) => {
    // Reseta os estados
    setFileName("");
    setFileContent("");
    setError("");

    const file = e.target.files[0]; // Pega o primeiro arquivo
    if (!file) {
      // Se nenhum arquivo for selecionado, retorna
      return;
    } else if (file.type !== "text/plain") {
      // Verifica se o arquivo selecionado é um .txt
      setError("Selecione um arquivo de texto (.txt)");
      return;
    }
    // Cria um FileReader para ler o arquivo
    const reader = new FileReader();
    reader.readAsText(file); // Lê o arquivo como texto

    // Quando a leitura for concluída (onload), atualiza os estados
    reader.onload = () => {
      setFileName(file.name);
      setFileContent(reader.result);
      setError(""); // Reseta o erro
    };

    // Se ocorrer um erro na leitura, atualiza o estado de erro
    reader.onerror = () => {
      setError("Erro ao ler o arquivo");
    };
  };

  return (
    <>
      <input type="file" onChange={selectedFile} />

      {/* Exibe o erro caso exista >>> talvez seja melhor fazer uma div para isso e depois estiliza-la */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Exibe o nome do arquivo se houver */}
      {fileName && (
        <p>
          <strong>Arquivo:</strong> {fileName}
        </p>
      )}

      {/* Exibe o conteudo do arquivo */}
      <TextDisplay fileContent={fileContent} />
      {/* <Hyphen fileContent={fileContent} /> */}
    </>
  );
};

export default Test;
