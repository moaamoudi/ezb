import React from "react";
import { Paragraph } from 'react-bootstrap-icons'
import './ClientsPage.css'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {Card,Button} from "react-bootstrap";





export default function ClientsPage() {
   

   
    
    const columns = [{

        dataField: 'name',
        text: 'Client Name'
        
        
      }, {
        dataField: 'Email',
        text: 'Email'
      }];

      const data = [{
        name : "ana anan",
        Email : "asdasd",
      
        }, 
        {
          name: "saden mg",
          Email: "Test@outlook.com",
          
        }
      
      ];


        const col = [{

            dataField: 'name',
            text: 'Employee Name'
          }, {
            dataField: 'Email',
            text: 'Email'
          }];

          const selectRow = { 
            mode: 'checkbox',
            clickToSelect: true,
            style: { backgroundColor: '#f5a494' }
          };

            
          const data2 = [{
            name : "ana anan",
            Email : "asdasd",
            }, 
            {
              name: "saden mg",
              Email: "Test@outlook.com",
            }
          
          ];
    
    return (
      <div>
        <div className="main"
        
        > 
        <div className="empButton">
            <Button className ="mr-5">delete</Button> 
               <Button>delete</Button> 
               

               
               </div>
        
        
          <div className="test" style={{height:"fit-content"}}>
         
            <Card className="main-shadow"
     
            >
              
              <Card.Body>

                <BootstrapTable
                  keyField="Email"
                  data={data2}
                  columns={col}
                  pagination={paginationFactory()}
                  selectRow={selectRow}
                />
              </Card.Body>
            </Card>
          </div>
          <div className="space"> </div>
          <div className="test" style={{height:"fit-content"}} >
            <Card className="main-shadow">
              <Card.Body>
                <BootstrapTable
                  keyField="Email"
                  data={data}
                  columns={columns}
                  pagination={paginationFactory()}
                  selectRow={selectRow}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );


    

    
}
