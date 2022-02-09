import toast, { Toaster } from 'react-hot-toast';

import copyImg from '../assets/images/copy.svg'

import '../styles/Room-code.scss'

type RoomCodeProps = {
  code: string;
}

export const RoomCode = (props: RoomCodeProps) => {

  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(props.code)
    toast.success('Copied Sucess!');
  }

  return (
    <>
      <button className='room-code' onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}