import 'antd/dist/antd.css'
import {Collapse } from 'antd'; 

const {Panel} = Collapse
function Rules() {

  return (
    <>
      <ul>
        <li><b>3 puntos por acertar el ganador del partido o predecir un empate:</b></li>
        <p>Ejemplo: Si predices que el equipo A ganará y el equipo A efectivamente gana, obtienes 3 puntos.</p> 
        <p>Ejemplo: Si predices que el partido terminará en empate y el partido efectivamente termina en empate (sin importar el marcador exacto), obtienes 3 puntos.</p>
        <li><b>2 puntos por acertar los goles del equipo local:</b></li>
        <p>Ejemplo: Si predices que el equipo local (equipo A) anotará 2 goles y efectivamente anota 2 goles, obtienes 2 puntos adicionales.</p>
        <li><b>2 puntos por acertar los goles del equipo visitante:</b></li>
        <p>Ejemplo: Si predices que el equipo visitante (equipo B) anotará 1 gol y efectivamente anota 1 gol, obtienes 2 puntos adicionales.</p>
        <li><b>5 puntos adicionales por acertar el marcador exacto:</b></li>
        <p>Ejemplo: Si predices que el partido terminará 2-1 a favor del equipo local y el resultado es exactamente 2-1, obtienes 5 puntos adicionales además de los puntos anteriores.</p>
        <li><b>2 puntos de bonificación en caso de empate no exacto:</b></li>
        <p>Ejemplo: Si predices que el partido terminará 1-1, pero el resultado final es 2-2 (es decir, un empate pero no el marcador exacto), obtienes una bonificación de 2 puntos.</p>
      </ul>
      <Collapse>
        <Panel header="Ejemplo 1 (Marcador Exacto)" key="1">
          <ul>
            <li><b>Predicción:</b>Equipo A gana 2-1</li>
            <li><b>Resultado real:</b> Equipo A gana 2-1</li>
            <li><b>Puntaje total:</b></li>
            <ul>
              <li>3 puntos por acertar el ganador (Equipo A).</li>
              <li>2 puntos por acertar los goles del equipo local (2 goles).</li>
              <li>2 puntos por acertar los goles del equipo visitante (1 gol).</li>
              <li>5 puntos adicionales por acertar el marcador exacto (2-1).</li>
            </ul>
            <li><b>Total:</b> 12 Puntos</li>
          </ul>
        </Panel>
        <Panel header="Ejemplo 2 (Empate NO exacto)" key="2">
          <ul>
            <li><b>Predicción:</b>Empate 1-1</li>
            <li><b>Resultado real:</b>Empate 2-2</li>
            <li><b>Puntaje total:</b></li>
            <ul>
              <li>3 puntos por acertar que el partido terminaría en empate.</li>
              <li>2 puntos de bonificación por acertar el empate (aunque no sea el marcador exacto).</li>
            </ul>
            <li><b>Total:</b> 5 Puntos</li>
          </ul>
        </Panel>
      </Collapse>
    </>
  )
}

export default Rules
