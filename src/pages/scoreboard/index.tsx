import { memo, useEffect, useState } from 'react'
import './scoreboard.css'
import Result, { IResult } from '../../components/result'
import Fronttemp from '../../api/fronttemp'
import Loader from '../../components/loader'

const Scoreboard: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [matchesStatus, setMatchesStatus] = useState<IResult[]>([])

    useEffect(() => {
        updateData()
    }, [])

    const updateData = async () => {
        try {
            setIsLoading(true)
            const mathData = await Fronttemp.getMatchesStatistics().then(data => data?.data)

            if (!mathData.ok) {
                setIsError(true)
                throw new Error('При загрузки данных произошла ошибка')
            }

            setMatchesStatus(mathData.data.matches)

        } catch (error) {
            console.log(error)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='scoreboard_container'>
            <div className='scoreboard_header'>
                <h1 className='scoreboard_header_title'>Match Tracker</h1>
                <div className='scoreboard_header_controller center'>
                    { 
                        isError && <div className='scoreboard_header_controller_warning bg-dark c-white center'>
                            <img className='scoreboard_header_controller_warning_img' src="/danger.png" alt="Внимание" />
                            <p>Ошибка: Не удалось загрузить информацию</p>
                        </div>
                    }
                    <button onClick={() => updateData()} className='scoreboard_header_controller_button-update c-white center'>
                        Обновить
                        <img className='scoreboard_header_controller_button-update_img' src="/updating.png" alt="Обновления"/>
                    </button>
                </div>
            </div>
            <div className='scoreboard_main'>
                {   
                    isLoading 
                    ? <Loader/>
                    : matchesStatus.map((match, index) => <Result key={index} {...match}/>)
                }
            </div>
        </div>
    )
}

export default memo(Scoreboard)