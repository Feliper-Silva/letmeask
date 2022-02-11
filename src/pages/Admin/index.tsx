import { useHistory, useParams } from 'react-router-dom'

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode'
import { Question } from '../../components/Question';

import { database } from '../../services/firebase';
import { useRoom } from '../../hooks/UseRoom';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'

import '../Room/styles.scss'



type RoomParams = {
  id: string
}

export const AdminRoom = () => {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  const handleHighLightQuestion = async (questionId: string) => {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
    }
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className='content'>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>


        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type='button'
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida. " />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleHighLightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Responder pergunta feita." />
                    </button>
                  </>
                )}
                <button
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta." />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}