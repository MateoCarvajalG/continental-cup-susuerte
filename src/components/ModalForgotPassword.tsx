import { useContext, useState } from "react";
import 'antd/dist/antd.css'
import { AuthContext } from "../context/AuthContext";
import {  Button, Form, Input, notification, Spin  } from 'antd';
import { showError } from "../alerts";


function ModalForgotPassword(props:any) {
  const { recoverPassword } = useContext(AuthContext);
  const [isLoad,setIsLoad] = useState(false)
  const onFinish = (values:any) => {
    setIsLoad(true)
    recoverPassword(values).then((res:any)=>{
      props.setRecoverPassword(false)
      setIsLoad(false)
      notification.success({
        message: 'Contraseña restablecida exitosamente.',
        description:"",
      });
    }).catch((err:any)=>{
      setIsLoad(false)
      notification.error({
        message: 'Error',
        description:
          showError(err.response),
      });
    })
  };
  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="">
      <Spin tip="Estamos tratando de recuperar tu contraseña..." spinning={isLoad}>
        
        <Form
          name="basic"
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          className="form-registered"
        >
          <Form.Item
            label="Documento"
            name="document"
            rules={[
              {
              required: true,
              message: 'Introduzca su documento de identificacion',
              },
              { type: 'string', min: 3,message:"Debe tener como minimo 3 caracteres numericos"}, 
              { type: 'string', max: 10,message:"Debe tener como maximo 10 caracteres numericos"}, 
              { pattern:/^[1-9]{1}[0-9]{5,9}$/,message:"Debe estar compuesto solo de caracteres numericos"}

          ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="newPassword"
            rules={[
              {
              required: true,
              message: 'Introduzca una contraseña segura',
              },
              { type: 'string', min: 8,message:" La contraseña debe tener como minimo 8 caracteres"}, 
              { type: 'string', max: 30,message:"La contraseña debe tener como maximo 30 caracteres "}, 
              { pattern:/^[a-zA-ZÀ-ÿ \\u00f1 \\u00d1 \\s 0-9]+$/,message:"La contraseña no puede tener caracteres especiales"}

          ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Recuperar contraseña
            </Button>
          </Form.Item>
        </Form>
      </Spin>
      </div>
  );
}
export default ModalForgotPassword;
