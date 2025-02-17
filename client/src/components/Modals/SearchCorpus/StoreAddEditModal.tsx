//@ts-nocheck
import { useState } from 'react'
import Modal from '../../Modal/Modal'
import css from '../modalForms.module.css'
import axios from 'axios'

const StoreAddEditModal = ({ closeModal, store, getDocumentsStores, opType }) => { 
  const [name, setName] = useState(store ? store.name : '')
  const [error, setError] = useState('')
  const performOperation = async () => {
    switch(opType) {
      case 'add': {
        let body = { name }
        if(!name){
          setError('Store Can not be Empty')
        }else{
          setError('')
          await axios.post(
            `${process.env.REACT_APP_SEARCH_SERVER_URL}/document-store`,
            body
          )
          closeModal()
        }
        break
      }
      case 'edit': {
        let body = {
          id: store.id,
          name
        }
        if(!name){
          setError('Store Can not be Empty')
        }else{
          setError('')
          await axios.put(
            `${process.env.REACT_APP_SEARCH_SERVER_URL}/document-store`,
            body
          )
          closeModal()
        }
        break
      }
      default: break
    }
    await getDocumentsStores()
  }
  const operation = opType === 'add' ? 'Add' : 'Update'
  const title = `${operation} Store`
  const options = [
    {
      className: `${css['loginButton']} secondary`,
      label: operation,
      onClick: performOperation,
    },
  ]

  const onChange = (e) =>{
    setName(e.target.value)
    if(name){
      setError('')
    }
  }

  return (
    <Modal title={title} icon='add' options={options}>
      <form>
        <div className="form-item">
          <span className="form-item-label">Store Name:</span>
          <input
            type="text"
            className="form-text-area"
            onChange={e => onChange(e)}
            defaultValue={name}
          ></input>
          <p style={{color:'red'}}>{error}</p>
        </div>
      </form>
    </Modal>
  );
}

export default StoreAddEditModal;