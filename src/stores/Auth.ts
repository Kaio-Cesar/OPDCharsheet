import { ref } from "vue"
import { defineStore } from "pinia"
import { supabase } from "../supabase"
import Axios from "axios";

// interface UserData {

// }

export const useAuthStore = defineStore('users', () =>{

  const userData = ref<object>()
  const errorMessage = ref<string | null>(null)
  const isLoading = ref<boolean>()



  const SignIn = async () => {
    const { session }:any = await getUserSession()
    
    if (session === null) {
      await DiscordSignIn()
    }
    await SignUp(session.provider_token)
  }

  const SignUp = async (token:object) => {

    const user:any = await getUser()
    const {data} = await supabase
      .from('Users')
      .select()
      .eq('id', user?.id)

    if (data ?.length === 0) {

      try {
        const response:any = await Axios.get<object>(
          'https://discordapp.com/api/users/@me',
          {headers: {Authorization: `Bearer ${token}`}}
        )

        await supabase
          .from('Users')
          .insert([{
            id: user?.id,
            username: response.username,
            discord_avatar: `https://cdn.discordapp.com/avatars/${response.data.id}/${response.avatar}`
          }])

      } catch (error:any) {
        errorMessage.value = error
      }
    }

  }

  const DiscordSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord'
    })
    if (error) {
      console.log(error.message)
      return errorMessage.value = error.message
    }
    return data
  }

  const SignOut = async () => {
    const { error } = await supabase.auth.signOut()
    userData.value = {}
    errorMessage.value = ''
  }

  const getUser = async () => {
    const {data, error} = await supabase.auth.getUser()
    if (error) {
      console.log(error.message)
      return errorMessage.value = error.message
    }
    return data.user
  }

  const getUserSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.log(error.message)
      return errorMessage.value = error.message
    }
    return data
  }

  return {
    userData,
    errorMessage,
    getUserSession,
    getUser,
    SignIn,
    SignOut
  }
})