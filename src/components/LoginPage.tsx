import { useContext, useState } from "react";
import 'antd/dist/antd.css'
import { AuthContext } from "../context/AuthContext";
import {  Button, Form, Input, Modal, notification  } from 'antd';
import ModalUserRegister from "./ModalUserRegister";
import ModalForgotPassword from "./ModalForgotPassword";
import { showError } from "../alerts";
import logo from '../assets/logo.png'
import betplayImg from '../assets/Logo-Betplay.webp'
import susuerteImg from '../assets/logo-susuerte.png'

function LoginPage() {
  const { signin } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recoverPassword,setRecoverPassword] = useState(false)
  const [showInvalidAccount,setShowInvalidAccount] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false);
    setRecoverPassword(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setRecoverPassword(false);
  };

  const onFinish = (values:any) => { 
    signin(values).then((res:any)=>{
    }).catch((err:any)=>{
      if(err.response.data.error.code=== 40004){
        setShowInvalidAccount(true)
      }else{
        notification.error({
          message: 'Error',
          description:
            showError(err.response),
        });
      }

    })
  };
  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className="form-login">
        <h1>Desafio Futbolero Susuerte | BetPlay</h1>
        <div className="container-logos-login">
          <img src={betplayImg} className="img-logo-login" alt="" />
          <img src={susuerteImg} className="img-logo-login" alt="" />
        </div>
        <h2>Ingresa con tu documento de identidad</h2>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Usuario"
            name="document"
            rules={[
              {
                required: true,
                message: 'Introduzca un usuario',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: 'Introduzca una contraseña',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item >
            <div className="btns-login">
              <Button type="primary" htmlType="submit">
                Ingresar
              </Button>
              <Button disabled={new Date > new Date('jun 20 2024 12:00')} type='primary' onClick={()=>setIsModalOpen(true)}>
                Registrarse
              </Button>
            </div>
          </Form.Item>
        </Form>
        <Button style={{color:"white"}} type="link" onClick={()=>setRecoverPassword(true)}>
          ¿Has olvidado la contraseña? Recupérala aquí
        </Button>
      </div>
      <Modal footer={[]} className='modal-registered' open={isModalOpen || recoverPassword} onOk={handleOk} onCancel={handleCancel}>
        {isModalOpen && <ModalUserRegister setIsModalOpen={setIsModalOpen}/>}
        {recoverPassword && <ModalForgotPassword setRecoverPassword={setRecoverPassword} />}
      </Modal>
      <Modal 
        open={showInvalidAccount}
        onOk={()=>setShowInvalidAccount(false)}
        onCancel={()=>setShowInvalidAccount(false)}
        footer={
          [
            <Button key="back" onClick={()=>setShowInvalidAccount(false)}>
             Cerrar
            </Button>,
          ]
        }
      >
        <h1>¡Hola!</h1>
        <h3>Para empezar tu experiencia, asegúrate de realizar una <a href="https://servicios.susuerte.com/betplay">recarga en BetPlay</a> desde nuestra página web susuerte.com con un valor mínimo de 10,000 pesos. Si ya has realizado tu recarga, nos pondremos en contacto contigo para informarte que ya puedes hacer tus pronósticos.</h3>
        
      </Modal>
    </div>
  );
}
export default LoginPage;
