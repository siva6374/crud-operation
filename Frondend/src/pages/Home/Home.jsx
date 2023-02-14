import React from "react";
import { useState ,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {RiDeleteBinLine} from 'react-icons/ri';
import {FaUserEdit} from 'react-icons/fa';
import "./Home.css";

const Home = () => {
  const [data,setData] = useState([]);
  let [currentid,setCurrentid]=useState(null);
  
  const loadData=async()=>{
    const response=await axios.get("http://localhost:3000/api/get");
    setData(response.data);
      };

  useEffect(()=>{
    loadData(); 
  },[]);
  

 const navigate=useNavigate();
  const showAction=(currentData)=>{
    setShow(true);
    setCurrentid(currentData)
  }
  
  const [show,setShow]=useState(false);
  const[SearchValue,setSearchValue]=useState('');
   
  const deleteId=(id)=>{
    
  

    axios.delete(`http://localhost:3000/api/remove/${id}`);
    
    setTimeout( ()=> loadData(id), 600);
    navigate("/")
    
   setShow(false);
   
  }


  return (
    <div className="container">
     
      <p className="Title">Student management system</p>

      
      
      <div className="headerContainer">
         <div>
          <form className="d-flex" role="search">
            <input 
              className="form-control searchField"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e)=>{
                setSearchValue(e.target.value);
              }}
                     
            />
            
          </form>
        </div> 
        
        <Link to={`http://localhost:3001/AddForm/`}>
        <button className="btn addMore" type="button">
          Add
          
        </button>
        </Link>
      </div>

      <div className="table-responsive tablecontainer">
        <table className="table content">
          <thead className="thead">
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Location </th>
              <th>Email</th>
              <th>DOB</th>
              <th>Education</th>
               <th>Action</th> 
              <th>Delete</th>
              
            </tr>
          </thead>
          <tbody className="tbody" >
            
             
             {data.filter((item)=>{
              if(setSearchValue===""){
                return item
              }else if(item.fname.toLowerCase().includes(SearchValue.toLowerCase()) || item.lname.toLowerCase().includes(SearchValue.toLowerCase())){
              return item
              }
              
              }).map((item, index)=>{
              return(
                <tr key={item.id}>
                  <th scope="row">{index+1}</th>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.location}</td>
                  <td>{item.email}</td>
                  <td>{item.dob}</td>
                  <td>{item.education}</td>
                  
                  <td>
                    <Link to={`/update/${item.id}`}>
                    <button className="edit-btn" onClick={() =>setShow(true)}><FaUserEdit className="d-ic"/>Edit</button>
                    </Link>  
                  </td>
                    
                  <td><button  className="delete-btn" onClick={() =>showAction(item.id)}><RiDeleteBinLine  className="d-ic"/>Delete</button>
              </td>


              {show && (
        <div className="modalBody">
         <div className="modalContent">
                  <RiDeleteBinLine className="deleteIcon"/>
            <p className="deleteText">Are you sure you want to delete</p>
          <div className="btn-group">
             
                 <button className="cancel btn-modal" onClick={() => setShow(false)}>Cancel</button>


                      <button className="delete btn-modal"  onClick={()=>deleteId(currentid)}>Yes</button>               
             </div>
           </div>
      </div>
       )}   

             
                </tr>
              )
             })
            }
             
             
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
