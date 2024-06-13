import { InputNumber } from 'antd';
import 'antd/dist/antd.css'
import { useEffect, useState } from 'react';
import { discriminatedPoints, getPointsMatchDiscriminated } from '../utils/pointsDiscriminated'

function ResultSimulator() {
  const [localScoreReal,setLocalScoreReal] = useState<number>(0)
  const [visitorScoreReal,setVisitorScoreReal] = useState<number>(0)
  const [localScore,setLocalScore] = useState<number>(0)
  const [visitorScore,setVisitorScore] = useState<number>(0)
  const [pointsPerMatch,setPointsPerMatch] = useState<discriminatedPoints>({
    matchPoints: 0,
    localScorePoints: 0,
    visitorScorePoints: 0,
    exactScore: 0,
    addPoints: 0
  })
  const [result,setResult]=useState(0)


  const onChangeLocalReal = (value:any) => {
    setLocalScoreReal(value)
  };
  const onChangeVisitorReal = (value: any) => {
    setVisitorScoreReal(value)
  };
  const onChangeLocal= (value:any) => {
    setLocalScore(value)
  };
  const onChangeVisitor= (value: any) => {
    setVisitorScore(value)
  };

  useEffect(()=>{
    const resultspoints = getPointsMatchDiscriminated(
      {
        local_team: {result: localScoreReal as number},
        visiting_team: {result: visitorScoreReal as number}
      },
      localScore as number,
      visitorScore as number,
    )
    setPointsPerMatch(resultspoints)
    const totalPoints = Object.values(resultspoints).reduce((accumulator,currentValue)=>{
      return accumulator + currentValue
    },0)
    setResult(totalPoints)
  },[localScore,visitorScore,visitorScore,visitorScoreReal])
  return (
    <div className='container-simulator'>
      <h2>Resultado Real</h2>
      <div className='inputs-simulator'>
        <InputNumber min={1} max={10}  onChange={onChangeLocalReal} />
        VS
        <InputNumber min={1} max={10}  onChange={onChangeVisitorReal} />
      </div>
      <h2>Resultado Predicho </h2>
      <div className='inputs-simulator'>
        <InputNumber min={1} max={10}  onChange={onChangeLocal} />
        VS
        <InputNumber min={1} max={10}  onChange={onChangeVisitor} />
      </div>
      <br/>
      <br/>
      {
        (localScore && visitorScore && localScoreReal && visitorScoreReal) &&
        <>
          <h2>Puntos Obtenidos</h2>
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
          <h2>{result}</h2>
        </>
      }
    </div>
  )
}

export default ResultSimulator 
