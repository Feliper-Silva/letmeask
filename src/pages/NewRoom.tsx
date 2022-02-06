import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button';


import '../styles/Auth.scss';

export const NewRoom = () =>{
  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e resposta." />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tira as dúvidas da sua audiência em tempo-real!</p>
      </aside>
      <main>
        <div className='main-content'>
        <img src={logoImg} alt="Logo Letmeask" />
        <h2>Crie uma nova sala</h2>
        <form >
          <input 
          type="text" 
          placeholder='Nome da sala'
          />
          <Button type='submit'>Criar sala</Button>
        </form>
        <p>
          Quer entrar em uma sala existente? <a href='#'>clique aqui</a>
        </p>
        </div>
      </main>
    </div>
  );
}