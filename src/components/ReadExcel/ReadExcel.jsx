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
                <Table 
                  striped 
                  hover 
                  bordered 
                  responsive
                >
                  <thead className='text-primary'>
                    <tr>
                      {sheetData[sheet][0].map((head,index)=>
                        <th key={index}>
                          {head}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {sheetData[sheet].slice(1).map((row,index)=>
                      <tr key={index}>
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
