import React, { useContext, useRef, useState } from 'react';
import { Button,Header,Icon,Label, Modal, Table } from 'semantic-ui-react';
import { Context } from './DataContext';
import {  useDispatch,useSelector } from 'react-redux';
import { IProduct } from './models/IProduct';
import { StateType } from './ReduxStore';
import { IProAction } from './reducers/ProductReducer';
import { ProductType } from './types/ProductType';

function App() {
 
//ref using
const refTitle = useRef<HTMLInputElement>(null);


//use context
const context = useContext(Context);
 
 //redux using
  const productReducer = useSelector((state:StateType)=> state.ProductReducer)
  //console.log(productReducer)
  const dispatch = useDispatch()

  //modal delete state
  const [modalStatus, setModalStatus] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleteId, setDeleteId] = useState(0);


//product states

const [title, setTitle] = useState("");
const [price, setPrice] = useState(0);

const productAdd = () => {

  const pro : IProduct ={
    id: parseInt(""+ Math.random() * 1000),
    title: title,
    price: price
  }
  const item : IProAction = {
    type:ProductType.PRODUCT_ADD,
    payload : pro
  }

  dispatch(item)

  setTitle("")
  setPrice(0)

  refTitle.current?.focus()

}

const deleteModalShow = (index:number)=>{

  const pro = productReducer[index]
  setDeleteTitle(pro.title)
  setDeleteId(pro.id)
  setModalStatus(true)
}


const productDelete = () => {

  const deletePro:IProduct={
    id:deleteId,
    title:'',
    price:0
  }

  const item:IProAction = {
    type:ProductType.PRODUCT_DELETE,
    payload:deletePro

  }

  dispatch(item)
  setDeleteTitle('')
  setDeleteId(0)
  setModalStatus(false)
}

 
  return (

<>
<h1>Welcome - by {context.name} </h1>  
    <Header>    
      Welcome Product Management 
      <Header.Subheader>
        Please enter new Product 
      </Header.Subheader>
    </Header>
   
    <div className="ui input"><input type="text" ref={refTitle} onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Title"/></div>
    <div className="ui input"><input type="number" onChange={(e)=> setPrice(parseFloat(e.target.value))} value={price} placeholder="Price"/></div>
    <div className="ui input"><Button onClick={(e) => productAdd()} placeholder="Price">ADD</Button></div>
     
    <h2>Product List</h2>
    <Table>

      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Delete</Table.HeaderCell>
         
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {productReducer.map( (item, index) => 
          <Table.Row key={index}>
            <Table.Cell>
              <Label ribbon>{ item.id }</Label>
            </Table.Cell>
            <Table.Cell>{ item.title }</Table.Cell>
            <Table.Cell>{ item.price }₺</Table.Cell>
            <Table.Cell><Button color='red' size='small' onClick={(e) => deleteModalShow(index)} icon> <Icon name='trash alternate outline'/>Delete</Button></Table.Cell>

          </Table.Row>
        )}
    </Table.Body>
    </Table>

    <Modal
        size='mini'
        open={modalStatus}
        onClose={() => setModalStatus(false) }
      >
        <Modal.Header>Delete Product</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete, {deleteTitle}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() =>  setModalStatus(false) }>
            Cancel
          </Button>
          <Button positive onClick={() => productDelete() }>
            Yes / Delete
          </Button>
        </Modal.Actions>
      </Modal>


</>
  );
}

export default App;


