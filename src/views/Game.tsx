import 'antd/dist/antd.css'
import '../App.css'
import { useContext, useEffect, useState } from 'react'
import {Tabs,Layout,Button,Drawer} from 'antd';
import Podium from '../components/Podium'
import Match from '../components/Match'
import FifaRank from '../components/FifaRank';
import { teamsService } from '../services/teams.services';
import logo1 from '../assets/logo1.png'
import { AuthContext } from '../context/AuthContext';
import AllMatches from '../components/AllMatches';
import UsersRank from '../components/UsersRank';
import UpdateResultsMatches from './UpdateResults';
import FinalFase from '../components/FinalFase';

const {Header} = Layout
function Game() {

  const {auth} = useContext(AuthContext);

  const [service,setService] = useState(new teamsService())
  const [teams,setTeams] = useState()
  const [teamsSelect,setTeamsSelect] = useState()
  const [matches,setMatches] = useState([])
  const [openDrawerRules, setOpenDrawerRules] = useState(false);
  const [isRules,setIsRules]= useState<boolean>(false)
  const [isSimulator,setIsSimulator] = useState<boolean>(false)

  const showDrawer = (type:string) => {
    const types:{[key:string]:()=> void} = {
      'simulator' : ()=> {
        setIsRules(false)
        setIsSimulator(true)
      },
      'rules': ()=> {
        setIsSimulator(false)
        setIsRules(true)
      }
    }
    types[type]()
    setOpenDrawerRules(true);
  };

  const onClose = () => {
    setOpenDrawerRules(false);
  };

  const getTeams =async ()=>{
    setTeams(await (await service.getTeams(auth.token)).teams)
    setTeamsSelect(await (await service.getTeams(auth.token)).teamsSelect)
  }
  const getMatches = ()=>{
    service.getMatches(auth.token).then(()=>{
      setMatches( service.getMatchesByGroup('A'))
    })
  }
  const onChangeTabGroup = (key:any) => {
    setMatches(service.getMatchesByGroup(key))
  };

  const onChangeRank = (key:any) => {
    console.log(key)
  };
  useEffect( () => {
    getTeams()
    getMatches()
  }, [])
  
  const listMatches = matches.map((match:any,index:any) =>  {
    return <Match forceRender={true} key={index} match={match} service={service}/>
  });

  const items = [
    { label: 'Grupo A', key: 'A', children: <div className='matches'>{listMatches}</div> }, // remember to pass the key prop
    { label: 'Grupo B', key: 'B', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo C', key: 'C', children: <div className='matches'>{listMatches}</div> },
    { label: 'Grupo D', key: 'D', children: <div className='matches'>{listMatches}</div> },
    { label: 'Todos los partidos', key: 'all', children: <div className='matches'><AllMatches  service={service}/></div> },

  ];
  const tabsRank=[
    { label: 'Participantes', key: 'players', children: <UsersRank service={service}/>},
  ]
  const itemsB = [
    ...(auth.document === "1053845913" || auth.document === "1053850398" ?
      [{ label: 'Fase de grupos', key: 'groups', children: <Tabs destroyInactiveTabPane={true} className='tabs-group' onChange={onChangeTabGroup} items={items}/> }, // remember to pass the key prop
      { label: 'Fase Final', key: 'Finals', children: 
      <FinalFase
        matches={service.matches.filter((match:any) => match.group === "Round of 16" || match.group === "Quarter finals" || match.group === "Semi finals"  || match.group === "Third place" || match.group === "Final")}
        service={service}
       /> 
      },
      { label: 'Clasificacion', key: 'clasifieds', children: <Tabs className='tabs-group' onChange={onChangeRank} items={tabsRank}/>},
      { label: 'Actualizacion', key: 'updateResult', children: <div className='matches'> <UpdateResultsMatches service={service}/> </div> }]
      :
      [{ label: 'Fase de grupos', key: 'groups', children: <Tabs destroyInactiveTabPane={true} className='tabs-group' onChange={onChangeTabGroup} items={items}/> }, // remember to pass the key prop
      { label: 'Fase Final', key: 'Finals', children: 
      <FinalFase
        matches={service.matches.filter((match:any) => match.group === "Round of 16" || match.group === "Quarter finals" || match.group === "Semi finals"  || match.group === "Third place" || match.group === "Final")}
        service={service}
      /> 
      },
      { label: 'Clasificacion', key: 'clasifieds', children: <Tabs className='tabs-group' onChange={onChangeRank} items={tabsRank}/>},]
      )  
  ];

  const onChangeB = (key:any) => {
    console.log(key)
  };
  
 
  return (
    <div className="App">
      <Header className='content-header'>
        <h1>{auth.names}</h1>
        <h2>{auth.score} puntos</h2>
      </Header>
      <Drawer 
        title="Reglas de puntuación"
        placement="right"
        onClose={onClose}
        open={openDrawerRules}
      >
        {
          isRules && 
          <ul>
            <li><b>3 puntos por acertar el ganador del partido o predecir un empate:</b></li>
            <p>Ejemplo: Si predices que el equipo A ganará y el equipo A efectivamente gana, obtienes 3 puntos.</p> 
            <p>Ejemplo: Si predices que el partido terminará en empate y el partido efectivamente termina en empate (sin importar el marcador exacto), obtienes 3 puntos.</p>
            <li><b>2 puntos por acertar los goles del equipo local:</b></li>
            <p>Ejemplo: Si predices que el equipo local (equipo A) anotará 2 goles y efectivamente anota 2 goles, obtienes 2 puntos adicionales.</p>
            <li><b>2 puntos por acertar los goles del equipo visitante:</b></li>
            <p>Ejemplo: Si predices que el equipo visitante (equipo B) anotará 1 gol y efectivamente anota 1 gol, obtienes 2 puntos adicionales.</p>
            <li><b>2 puntos adicionales por acertar el marcador exacto:</b></li>
            <p>Ejemplo: Si predices que el partido terminará 2-1 a favor del equipo local y el resultado es exactamente 2-1, obtienes 2 puntos adicionales además de los puntos anteriores.</p>
            <li><b>2 puntos de bonificación en caso de empate no exacto:</b></li>
            <p>Ejemplo: Si predices que el partido terminará 1-1, pero el resultado final es 2-2 (es decir, un empate pero no el marcador exacto), obtienes una bonificación de 2 puntos.</p>
          </ul>
        }
        {
          isSimulator && 
            <h2>Hola</h2>
        }
      </Drawer>
      <img src={logo1} alt="" className='img-logo'/>
      <div className='container-podium-rank'>
        <Button 
          className='btn-rules'
          type="primary"
          onClick={()=>showDrawer('rules')}
        >
          Reglas de puntuación
        </Button>
        <Button 
          className='btn-simulator'
          type="primary"
          onClick={()=>showDrawer('simulator')}
        >
          Simulador de resultados
        </Button>
        <Podium service={service} teamsSelect={teamsSelect}/>
      </div>
      <Tabs className='tabs-group' onChange={onChangeB} items={itemsB} />
    </div>
  )
}

export default Game
