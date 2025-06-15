import { useAuth } from '../../hooks/useAuth'

function Profile() {
    const { user, logout } = useAuth()
  return (
    <div>
        <h1>Essa é a página de Perfil</h1>
        <br />
        <h2>Nome: {user?.nickname}</h2>
        <h2>Email: {user?.email}</h2>
        <h2>Nickname: {user?.nickname}</h2>
        <br />
        <button onClick={logout}>Sair</button>
    </div>
  )
}

export default Profile