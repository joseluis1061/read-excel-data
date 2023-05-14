import React from 'react';
import { Row, Col, Label } from 'reactstrap';
import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

export const ExcelImportTools = (props) => {

  //const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileRef = useRef();
  //const [sheetNames, setSheetNames] = useState([]);
  //const [sheetData, setSheetData] = useState({});
  const acceptableFileName = ["xlsx","xls"];

  //Verificar versión del archivo
  const checkFileName = (name)=>{
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  }

  // Lectura de excel
  const handleFile = async (e) =>{
    const myFile = e.target.files[0];
    if(!myFile) return;
    
    if(!checkFileName(myFile.name)){
      alert("Archivo invalido")
    }

    // Leer los metadatos del archivo excel
    const data = await myFile.arrayBuffer();
    const mySheetData = await readDataFromExcel(data);
    // Leer los datos desde el archivo
    await readDataFromExcel(data);

    // await setFile(myFile);
    await setFileName(myFile.name);

    await props.onFileUpload(mySheetData);
  }

  // Leer datos desde el archivo
  const readDataFromExcel = (data) =>{
    // Extraer los datos del excel
    const wb = XLSX.read(data);
    // Nombres de las hojas del libro excel
    //setSheetNames(wb.SheetNames);       
    // Para guardar los datos de cada hoja del libro
    const mySheetData = {};
    // Extraer los datos de cada hoja
    for(let i=0; i< wb.SheetNames.length; i++){
      let sheetName = wb.SheetNames[i];                         // Nombre de la hoja
      const workSheet = wb.Sheets[sheetName];                   // Elección de acuerdo al nombre de la hoja
      const jsonData = XLSX.utils.sheet_to_json(workSheet,{     // Guarda cada dataJson en un objeto
        blankrows: "",
        header: 1
      });     // Transforma a JSON los datos
      mySheetData[sheetName] = jsonData;                        
    }
    //setSheetData(mySheetData);
    //return sheetData;
    return mySheetData;
  };

  // Eliminar de la memoria el archivo excel
  const handleRemoveFile = async () =>{
    setFileName(null);
    setFileName("");
    fileRef.current.value = "";
    await props.onFileUpload(null);
  }

  return (
    <div>
      <Row>
        <Col>
          <div className='mb-2'>
            {fileName && <Label>{fileName}</Label>}
            {!fileName && <Label>Seleccione Archivo T3</Label>}
          </div>
          <div className=''>
            <input 
              type="file" 
              accept='xlsx, xls'
              multiple= {false}
              onChange={(e)=>handleFile(e)}
              ref = {fileRef}
            />
            {
              fileName && (
                <i className="fa-solid fa-trash" onClick={() =>handleRemoveFile}></i>
              )
            }
          </div>
        
        </Col>
      </Row>
    </div>
  )
}
