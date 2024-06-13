import axios from "axios";

export interface IRecoverPassword{
  document:string,
  newPassword:string,
}

export class authService {
  Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  })

  constructor() {
  }
  async signIn(credentials:any){
      const data = await this.Api.post('/api/v1/auth/login',credentials)
      return data
  }

  signOut(){

  }
  async signUp(userData:any){
    const data = await this.Api.post('/api/v1/users',userData)
    return data
  }

  async recoverPassword(data:IRecoverPassword){
    return await this.Api.patch('/api/v1/users/reset-password',data)
  }
  
}