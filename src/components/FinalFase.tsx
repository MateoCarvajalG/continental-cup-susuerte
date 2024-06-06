import { useContext, useEffect, useState } from "react";
import 'antd/dist/antd.css'
import SquareMatch from "./SquareMatch";
import Cup from '../assets/copa-america-1.webp'

function FinalFase(props:any) {
  const [matchesQuarters,setMatchesQuarters]= useState<any>([])
  const [matchesSemiFinals,setMatchesSemiFinals]= useState([])
  const [matchFinal,setMatchFinal]= useState([])
  const [thirdPlaceMatch,setThirdPlaceMatch]=useState([])

  
  useEffect(()=>{
    setMatchesQuarters(props.matches.filter((match:any)=>match.group === 'Quarter finals'))
    setMatchesSemiFinals(props.matches.filter((match:any)=>match.group === 'Semi finals'))
    setThirdPlaceMatch(props.matches.filter((match:any)=>match.group === 'Third place'))
    setMatchFinal(props.matches.filter((match:any)=>match.group === 'Final'))
  },[])
  return (
    <>
      <div className="Square">
        <div className="fase">
          {
            matchesQuarters.map((match:any)=>{
              return(
                <SquareMatch key={match._id} service={props.service} match={match}/>
              )
            })
          }
        </div>
        <div className="fase">
          {
            matchesSemiFinals.map((match:any)=>{
              return(
                <SquareMatch key={match._id} service={props.service} match={match}/>
                )
              })
            }
        </div>
        <div className="fase final">
          {
            thirdPlaceMatch.map((match:any)=>{
              return(
                <SquareMatch key={match._id} service={props.service} match={match}/>
                )
              })
            }
        </div>
        <div className="fase final">
          <img src={Cup} className="img-worldcup" />
          {
            matchFinal.map((match:any)=>{
              return(
                <SquareMatch key={match._id} service={props.service} match={match}/>
                )
              })
            }
        </div>
      </div>
    </>
  );
}
export default FinalFase;
