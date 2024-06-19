import { Table } from 'antd'
import 'antd/dist/antd.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

function UsersRank(props:any) {
  const {auth} = useContext(AuthContext);
  const [data,setData]= useState()
  const columns = [
      {
        title : 'Nombre',
        key: 'names',
        render: (text:any,_record:any,index:any) =>{
          let emoji = ''
          let color = 'white'
          if(index === 0){
            emoji = '🥇'
            color = 'gold'
          }else if(index === 1){
            emoji = '🥈'
            color = '#b1b1b1'
          }else if(index === 2){
            emoji = '🥉'
            color = '#CD7F32'
          }
          return <h3 style={{color:color}}><span style={{fontSize:'30px'}}>{emoji}</span>{text.names+' '+ text.surnames}</h3>
        }
      },
      { 
        title:"Puntaje",
        dataIndex: 'score',
        key: 'score',
        render: (text:any) => <a>{text}</a>
      },
    ];

  const getRankUser= async()=>{
    const data = await props.service.getRankUsers(auth.token)
    setData(data.sort((a:any,b:any)=> b.score - a.score))
  }
  useEffect(() => {
    getRankUser()
  }, [])
  
  return (
    <div className='container-fifa-rank'>
      <Table columns={columns} dataSource={data}  pagination={false}/>
    </div>
  )
}

export default UsersRank
