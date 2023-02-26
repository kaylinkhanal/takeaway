import '../../App.css'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Modal, Button } from "antd";
import { useSelector } from 'react-redux';
import Card from '../../components/card';
import ReusableForm from '../../components/reusableForm'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Items = () => {
  const [query, setQuery] = useState("")
  const { role } = useSelector(state => state.user)

  const [validItems, setValidItems] = useState([])
  const fetchAvailableItems = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/items/?qSearch=${query}`).then((response) => {
      setValidItems(response.data.validItemOptions)
    });
  }

  useEffect(() => {
    fetchAvailableItems()
  }, [query])
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {role === "admin" ? <Button onClick={() => showModal()} className="addItems">Add Items</Button> : ""}

      <div className='search'>
        <input type="search" className='search_box' placeholder='Search'
          onChange={(e) => setQuery(e.target.value)}
        />
        <FontAwesomeIcon icon={faSearch} className='search_icon' />
      </div>
      <div className='home' id={role === "admin" ? "adminThemeBackground" : "userThemeBackground"}>
        <Modal
          title="Add Items"
          footer={null}
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <ReusableForm handleCancel={handleCancel} fetchAvailableItems={fetchAvailableItems} />
        </Modal>

        <div class="flex-container">
          {validItems.map((item) => {
            return (
              <Card item={item} role={role} fetchAvailableItems={fetchAvailableItems} />
            )
          })}
        </div>
      </div>
    </>
  )
}
export default Items