// Profile.tsx
import { useAuth } from '../../hooks/useAuth';
import api from '../../utils/api';
import styles from './Profile.module.css';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function Profile() { //TODO: move modals to a modal component
  const { user, login, logout } = useAuth(); //using login here because it only updates the user state (context and localstorage).
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({currentPassword: '', newPassword: '', confirmPassword: ''});
  const [showDataModal, setShowDataModal] = useState(false);
  const [data, setData] = useState({username: '', email: ''});
  const [dataVisible, setDataVisible] = useState(false);

  const handlePasswordsChange = (e: any) => {
    const { name, value } = e.target;
    setPasswords(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDataChange = (e: any) => {
    const { name, value } = e.target;
    setData(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    api.patch('user/change-password', {
      currentPassword,
      newPassword,
    }).then(response => {
      alert(response.data.message || 'Senha alterada com sucesso');
      setShowPasswordModal(false);
      setPasswords({currentPassword: '', newPassword: '', confirmPassword: ''});
      //TODO disable old tokens
    }).catch(error => {
      alert(error.response.data.message || 'Erro ao alterar senha');
      return;
    })
  };

  const handleDataSubmit = (e: any) => {
    e.preventDefault();
    const { username, email } = data;

    api.patch('user/edit', {
      username,
      email,
    }).then((response) => {
      alert(response.data.message || 'Dados alterados com sucesso');
      setShowDataModal(false);
      setData({username: '', email: ''});

      //update user state
      user!.username = username;
      user!.email = email;
      login(localStorage.getItem('token') || '', user!);
    }).catch((error) => {
      alert(error.response.data.message || 'Erro ao alterar dados');
      return;
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftColumn}>
        <h1>Bem-vindo, {user?.username}!</h1>
        <p> Aqui você poderá acompanhar todos os seus envios, estatísticas e atividades futuras na plataforma. </p>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.rightColumnHeader}>          
          <h2>Informações Pessoais</h2>
          <button
            className={styles.iconButtonDiv}
            onClick={() => setDataVisible(!dataVisible)}
            aria-label="data-visibility-button"
          >
            {dataVisible ? <IoMdEyeOff /> : <IoMdEye />}
          </button>
        </div>
        <div className={styles.infoBox}>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {dataVisible ? user?.email : '**************'}</p>
        </div>

        <button className={styles.button} onClick={() => setShowDataModal(true)}>Editar informações</button>
        <button className={styles.button} onClick={() => setShowPasswordModal(true)}>Trocar Senha</button>
        <br /><br />
        <button className={`${styles.button} ${styles.logoutButton}`} onClick={logout}>Sair</button>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Trocar Senha</h2>
            <form onSubmit={handlePasswordSubmit}>
              <label>Senha atual</label>
              <input type="password" required name='currentPassword' onChange={handlePasswordsChange}/>

              <label>Nova senha</label>
              <input type="password" required name='newPassword' onChange={handlePasswordsChange}/>

              <label>Confirmar nova senha</label>
              <input type="password" required name='confirmPassword' onChange={handlePasswordsChange}/>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={() => setShowPasswordModal(false)}>Cancelar</button>
                <button type="submit" className={styles.button}>Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Data Modal */}
      {showDataModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Editar informações</h2>
            <form onSubmit={handleDataSubmit}>
              <label>Username</label>
              <input type="text" required name='username' onChange={handleDataChange}/>

              <label>Email</label>
              <input type="text" required name='email' onChange={handleDataChange}/>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={() => setShowDataModal(false)}>Cancelar</button>
                <button type="submit" className={styles.button}>Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
