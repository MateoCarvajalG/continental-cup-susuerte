import 'antd/dist/antd.css'
import {Collapse } from 'antd'; 

const {Panel} = Collapse
function Rules() {

  return (
    <>
      <Collapse>
      <Panel header='Términos y condiciones.' key='1'>
        <ol>
          <li>Debe ser colaborador activo de Susuerte</li>
          <li>Aplica solo para mayores de Edad.</li>
          <li>Debe de haber recargo mínimo 10.000 a BetPlay a través de su cuenta en la pagina web de susuerte.com.</li>
          <li>Una vez iniciado el partido, no se aceptan modificaciones en el marcador.</li>
          <li>Solo se permite registrarse hasta el 20 de junio antes de las 12 del mediodía.</li>
          <li>Una vez registrada la cuenta, se le notificará que ha cumplido con las condiciones y ya puede participar de nuestro desafío futbolero.</li>
          <li>Recuerde registrar el podio con sus equipos favoritos para los tres primeros lugares de la competición antes del 20 de junio a las 7:00 pm. Después de esta fecha y hora, no podrá realizar cambios en el podio. Si no registra su podio a tiempo, perderá la oportunidad de ganar puntos adicionales para el ranking final.</li>
        </ol>
      </Panel>
      <Panel header='Premiación.' key='2'>
        <h1 style={{color:'gold'}}> 🥇 Primer Puesto</h1>
        <ul>
          <li>Bono consumo Koaj $200.000</li>
          <li>1 Buso original selección Colombia</li>
          <li>1 Gorra Selección Colombia</li>
          <li>1 Balón Colecionable</li>
        </ul>
        <h1 style={{color:'gray'}}> 🥈 Segundo Puesto</h1>
        <ul>
          <li>Bono consumo pagina web susuerte.com $100.000</li>
          <li>1 Camiseta original selección Colombia</li>
          <li>1 Balón Colecionable</li>
        </ul>
        <h1 style={{color:'#CD7F32'}}> 🥉 Tercer Puesto</h1>
        <ul>
          <li>Bono consumo pagina web susuerte.com $50.000</li>
          <li>1 Gorra Selección Colombia</li>
          <li>1 Balón Colecionable</li>
        </ul>
      </Panel>
      <Panel header="Reglas de juego." key="3">
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
          <Panel header="Puntos adicionales por acertar las posiciones finales predichas" key="1">
              <ul>
                <li><b>18 puntos por acertar el primer lugar predicho</b></li>
                <li><b>12 puntos por acertar el segundo lugar predicho</b></li>
                <li><b>6 puntos por acertar el tercer lugar predicho</b></li>
              </ul>
          </Panel>
          <Panel header="Ejemplo 1 (Marcador Exacto)" key="2">
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
            <Panel header="Ejemplo 2 (Empate NO exacto)" key="3">
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
      </Panel>
      </Collapse>
    </>
  )
}

export default Rules
