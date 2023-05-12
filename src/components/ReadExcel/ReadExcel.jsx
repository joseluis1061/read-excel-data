import React, { useState } from 'react';
import { Input, Label, Card, CardHeader, CardBody, Row, Col, Table } from "reactstrap";
import { ExcelImportTools } from './ExcelImportTools';

export const ReadExcel = () => {

  const [sheetData, setSheetData] = useState(null);
  const [sheet, setSheet] = useState(null);

  const handleFileUpload = (e) =>{
    if(e){
      setSheet(Object.keys(e)[0]);
    }
    console.log("e")
    console.log(e);
    setSheetData(e);
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
          <Row>
            <Label>{sheet}</Label>
            <Col md={12}>
              <Table>
                <thead></thead>
                <tbody></tbody>
              </Table>
            
            </Col>
          </Row>
        )}
      </div>
    </>
  )
}
