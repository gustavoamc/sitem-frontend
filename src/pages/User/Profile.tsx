// Profile.tsx
import { useAuth } from '../../hooks/useAuth';
import api from '../../utils/api';
import styles from './Profile.module.css';
import { useState } from 'react';

function Profile() {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [passwords, setPasswords] = useState({currentPassword: '', newPassword: '', confirmPassword: ''});

  const handlePasswordsChange = (e: any) => {
    const { name, value } = e.target;
    setPasswords(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    api.put('user/change-password', {
      currentPassword,
      newPassword,
    }).then(response => {
      alert(response.data.message || 'Senha alterada com sucesso');
      setShowModal(false);
    }).catch(error => {
      alert(error.response.data.message || 'Erro ao alterar senha');
      return;
    })
  };

  return (
    <div className={styles.wrapper}>
      {/* Coluna esquerda */}
      <div className={styles.leftColumn}>
        <h1>Bem-vindo, {user?.nickname}!</h1>
        <p> Aqui você poderá acompanhar todos os seus envios, estatísticas e atividades futuras na plataforma. </p>
      </div>

      {/* Coluna direita */}
      <div className={styles.rightColumn}>
        <h2>Informações Pessoais</h2>
        <div className={styles.infoBox}>
          <p><strong>Nickname:</strong> {user?.nickname}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        <button className={styles.button} onClick={() => setShowModal(true)}>Trocar Senha</button>
        <br /><br />
        <button className={styles.button} onClick={logout}>Sair</button>
      </div>

      {/* Modal de troca de senha */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Trocar Senha</h2>
            <form onSubmit={handleSubmit}>
              <label>Senha atual</label>
              <input type="password" required name='currentPassword' onChange={handlePasswordsChange}/>

              <label>Nova senha</label>
              <input type="password" required name='newPassword' onChange={handlePasswordsChange}/>

              <label>Confirmar nova senha</label>
              <input type="password" required name='confirmPassword' onChange={handlePasswordsChange}/>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={() => setShowModal(false)}>Cancelar</button>
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
