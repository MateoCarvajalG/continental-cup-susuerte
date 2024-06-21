import 'antd/dist/antd.css'
import { useContext, useEffect, useState } from 'react'
import {InputNumber,Modal, notification, Table,Popover,Button } from 'antd';
import { AuthContext } from '../context/AuthContext';
import { showError } from '../alerts';
import { Navigate } from 'react-router-dom';
import { discriminatedPoints, getPointsMatchDiscriminated } from '../utils/pointsDiscriminated';

function Match(props:any) {
  const {auth,authDispatch} = useContext(AuthContext);

  const [localScore, setLocalStore] = useState<number>()
  const [visitorScore, setVisitorScore] = useState<number>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultMatch, setResultMatch] = useState<any>({});
  const [usersResults,setUsersResults] = useState()
  const [pointsPerMatch,setPointsPerMatch] = useState<discriminatedPoints>({
    matchPoints: 0,
    localScorePoints: 0,
    visitorScorePoints: 0,
    exactScore: 0,
    addPoints: 0
  })
  const [openPopover, setOpenPopover] = useState(false);
  const columns = [
    {
      dataIndex: '',
      key: 'names',
      render: (text:any) => <h4>{text.user.names +' '+ text.user.surnames}</h4>
    },
    { 
      dataIndex: 'local_score',
      key: 'score',
      title:()=>
        <>
          <img src={props.match.local_team.image} />
        </>
      ,
      render: (text:any) => 
      <>
        <h2>{text}</h2>
      </>
    },
    { 
      dataIndex: '',
      key: '',
      title:()=>
      <h1>
        VS
      </h1>,
      render:()=>
        <h1>-</h1>
    },
    { 
      dataIndex: 'visitor_score',
      key: 'score',
      title:()=>
        <>
          <img src={props.match.visiting_team.image} />
       </>
      ,
      render: (text:any) => 
      <>
        <h2>{text}</h2>
      </>
    },
  ];
  const showModal = async () => {
    setIsModalOpen(true);
    const data = await props.service.getUsersResultsByMatchId(auth.token,props.match._id )
    setUsersResults(data)
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const calculateScore= () =>{
    return Object.values(pointsPerMatch).reduce((accumulator,currentValue)=>{
      return accumulator + currentValue
    },0)
  }
  
  const handleOpenChange = (newOpen: boolean) => {
    setOpenPopover(newOpen);
  };

  const contentPopover = (
  <ul>
    <li>
        Puntos por acertar el encuentro: <span className="point">
          {
            pointsPerMatch?.matchPoints
          }
        </span>
    </li>
    <li>
      Puntos por acertar el marcador local: <span className="point">
        {
          pointsPerMatch?.localScorePoints
        }
      </span>
    </li>
    <li>
      Puntos por acertar el marcador visitante: <span className="point">
        {
          pointsPerMatch?.visitorScorePoints
        }
      </span>
    </li>
    <li>
      Puntos por acertar el resultado exacto: <span className="point">
        {
          pointsPerMatch?.exactScore
        }
      </span>
    </li>
    <li>
      Puntos bonificación en caso de empate no exacto: <span className="point">
        {
          pointsPerMatch?.addPoints
        }
      </span>
    </li>
  </ul>
  )

  useEffect( () => {
      setResultMatch(auth.matchesResults.find((match:any)=> match._id === props.match._id ))
    },[])
    
  useEffect(()=>{
    if(isModalOpen){
      const resultspoints = getPointsMatchDiscriminated(
        {
          local_team: {result: props.match.local_team.result as number},
          visiting_team: {result: props.match.visiting_team.result as number}
        },
        localScore as number,
        visitorScore as number,
      )
      setPointsPerMatch(resultspoints)
    }
  },[isModalOpen])
  
  useEffect( () => {
    setLocalStore(resultMatch?.local_score)
    setVisitorScore(resultMatch?.visitor_score)
  },[resultMatch])
  return (
    <>
      <div className='container-match'>
        <div className='content-match'>
          <h3>{new Date(props.match.date).toLocaleString()}</h3>
          <div className='teams'>
            <div className=''>
                <img src={props.match.local_team.image} alt="" />
                {props.match.local_team.name}{props.match.has_played && <h4>({props.match.local_team.result})</h4>}
                <InputNumber 
                  size="middle"
                  min={0} 
                  max={100000} 
                  value={localScore}
                  disabled={new Date > new Date(props.match.date)}
                  status = {localScore !== undefined ? '' : 'error'}
                  onChange={(ev:any)=>{
                    setLocalStore(ev)
                    const payload={
                      _id: props.match._id,
                      local_score: ev,
                      visitor_score:visitorScore
                    }
                    props.service.updateMatch(auth.token,auth.document,props.match._id,payload).then((res:any)=>{
                      authDispatch({
                        type:"UPDATE_MATCH",
                        payload
                        
                      })
                    }).catch((err:any)=>{
                      if(err.response.data.error.code===40102){
                        <Navigate to="/auth/login" />
                        authDispatch({
                          type:"LOGOUT"
                        })
                      }
                      notification.error({
                        message: 'Error',
                        description:
                          showError(err.response),
                      });
                    })
                  }} 
                />
            </div>
            <h1>
              VS
            </h1>
            <div className=''>
                <img src={props.match.visiting_team.image} alt="" />
                {props.match.visiting_team.name}{props.match.has_played && <h4>({props.match.visiting_team.result})</h4>}
                <InputNumber 
                size="middle" 
                min={0} 
                max={100000} 
                value={visitorScore} 
                status = {visitorScore !== undefined ? '' : 'error'}
                disabled={new Date > new Date(props.match.date)}
                onChange={(ev:any)=>{
                  setVisitorScore(ev)
                  const payload={
                    _id: props.match._id,
                    local_score: localScore,
                    visitor_score:ev
                  }
                  props.service.updateMatch(auth.token,auth.document,props.match._id,payload).then((res:any)=>{
                    authDispatch({
                      type:"UPDATE_MATCH",
                      payload
                    })
                  }).catch((err:any)=>{
                    if(err.response.data.error.code===40102){
                      <Navigate to="/auth/login" />                      
                      console.log('entro')
                      authDispatch({
                        type:"LOGOUT"
                      })
                    }
                    notification.error({
                      message: 'Error',
                      description:
                        showError(err.response),
                    });
                  })
                }}  
                />
              
            </div>
          </div>
          <a  onClick={showModal} >Ver Detalles...</a>
        </div>
      </div>
      {
        isModalOpen && 
        <Modal  className='modal-detail-match' title="Detalle del partido" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <h1>Mi predicción</h1>
          <div className='modal-my-result' >
            <img src={props.match.local_team.image} alt="" />
            <h2>{props.match.local_team.name}</h2>
            <h1>{localScore !== undefined ? localScore : -1}</h1>
          </div>
          <div  className='modal-my-result'>
            <img src={props.match.visiting_team.image} alt="" />
            <h2> {props.match.visiting_team.name} </h2>
            <h1>{visitorScore !== undefined ? visitorScore : -1}</h1>  
          </div>
          {
            props.match.local_team.result >= 0 && props.match.visiting_team.result >= 0 &&
            <div className='my-points'>
            <h3>En este partido sume : {calculateScore()} Puntos</h3>
            <Popover
              content={contentPopover}
              title='Detalle de mis puntos'
              trigger="click"
              open={openPopover}
              onOpenChange={handleOpenChange}
            >
              <Button type="primary">Detalle de mis puntos</Button>
            </Popover>
            </div>
          }
          <h1>Predicción de los participantes</h1>
          <Table columns={columns} dataSource={usersResults}  pagination={false}/>
        </Modal>
      }
    </>
  )
}

export default Match
