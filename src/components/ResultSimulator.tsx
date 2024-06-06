import { InputNumber } from 'antd';
import 'antd/dist/antd.css'
import { useState } from 'react';
import { getPointsMatchDiscriminated } from '../utils/pointsDiscriminated'

function ResultSimulator() {
  const [localScoreReal,setLocalScoreReal] = useState<number|null>(null)
  const [visitorScoreReal,setVisitorScoreReal] = useState<number|null>(null)
  const [localScore,setLocalScore] = useState<number|null>(null)
  const [visitorScore,setVisitorScore] = useState<number|null>(null)
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
                    getPointsMatchDiscriminated(
                      {
                        local_team: {result: localScore as number},
                        visiting_team: {result: visitorScore as number}
                      },
                      localScoreReal as number,
                      visitorScoreReal as number,
                      'matchPoints'
                    )
                  }
                </span>
            </li>
            <li>
              Puntos por acertar el marcador local: <span className="point">
                {
                  getPointsMatchDiscriminated(
                    {
                      local_team: {result: localScore as number},
                      visiting_team: {result: visitorScore as number}
                    },
                    localScoreReal as number,
                    visitorScoreReal as number,
                    'localScorePoints'
                  )
                }
              </span>
            </li>
            <li>
              Puntos por acertar el marcador visitante: <span className="point">
                {
                  getPointsMatchDiscriminated(
                    {
                      local_team: {result: localScore as number},
                      visiting_team: {result: visitorScore as number}
                    },
                    localScoreReal as number,
                    visitorScoreReal as number,
                    'visitorScorePoints'
                  )
                }
              </span>
            </li>
            <li>
              Puntos por acertar el resultado exacto: <span className="point">
                {
                  getPointsMatchDiscriminated(
                    {
                      local_team: {result: localScore as number},
                      visiting_team: {result: visitorScore as number}
                    },
                    localScoreReal as number,
                    visitorScoreReal as number,
                    'exactScore'
                  )
                }
              </span>
            </li>
            <li>
              Puntos bonificación en caso de empate no exacto: <span className="point">
                {
                  getPointsMatchDiscriminated(
                    {
                      local_team: {result: localScore as number},
                      visiting_team: {result: visitorScore as number}
                    },
                    localScoreReal as number,
                    visitorScoreReal as number,
                    'addPoints'
                  )
                }
              </span>
            </li>
          </ul>
        </>
      }
      
    </div>
  )
}

export default ResultSimulator 
