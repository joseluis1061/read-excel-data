import React, { useState } from 'react';
import { Input, Label, Card, CardHeader, CardBody, Row, Col, Table } from "reactstrap";
import { ExcelImportTools } from './ExcelImportTools';

export const ReadExcel = () => {

  const [sheetData, setSheetData] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [sheetNames, setSheetNames] = useState(null);

  const handleFileUpload = (e) =>{
    if(e){
      // Nombre de la primera hoja
      setSheetNames(Object.keys(e))
      setSheet(Object.keys(e)[0]);
    }else{
      setSheetNames(null);
    }
    console.log("e")
    console.log(e);
    setSheetData(e);
  }

  const handleSheetChange = (e) =>{
    setSheet(e.target.value);
  }
  return (
    <>
      <div className='content'>
        <Row>
          <Card>
            <Col>
              <CardHeader>
                <h5 className='title'>Leer Libros de Excel</h5>
                <p className='category'></p>
              </CardHeader>
              <CardBody>
                <ExcelImportTools onFileUpload={(e) => handleFileUpload(e)}/>
              </CardBody>
            </Col>
          </Card>
        </Row>

        {sheetData && (
          <>
            <Row>
              <Col>
                {sheetNames.map((s, index) =>
                  <div key={index}>
                    <Input 
                      type="radio" 
                      name="SheetName"
                      checked={s === sheet}
                      value={s}
                      key={index}
                      onChange={(e)=> handleSheetChange(e)}
                    />
                    <label>{s}</label>
                  </div>
                )}
              </Col>
            </Row>
          
            <Row>
              <Label>{sheet}</Label>
              <Col md={12}>
                <Table>
                  <thead className='text-primary'>
                    {sheetData[sheet][0].map((head,index)=>
                      <th keys={index}>
                        {head}
                      </th>
                    )}
                  </thead>
                  <tbody>
                    {sheetData[sheet].slice(1).map((row,index)=>
                      <tr keys={index}>
                        {row.map((cel, index) => <td key={index}>{cel}</td>)}
                      </tr>
                    )}
                  </tbody>
                </Table>
              
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  )
}
