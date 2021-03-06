import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { database } from '../../services/firebase';

import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/UseAuth';

import toast, { Toaster } from 'react-hot-toast';
import './styles.scss';

export const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');


  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (roomCode.trimEnd() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error('Room does not exists.')

      return
    }
    if (roomRef.val().endedAt) {
      toast.error('Room already closed.')
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">

      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e resposta."
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tira as dúvidas da sua audiência em tempo-real!</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input type="text" placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode} />
            <Button type="submit">Entrar na sala</Button>
          </form>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </div>
      </main>
    </div>
  );
};
