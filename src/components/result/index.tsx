import './result.css'

export interface IResult {
    awayScore: number
    awayTeam: {
        name: string
    }
    homeScore: number
    homeTeam: {
        name: string
    }
    status: string
}

const Result = (props: IResult) => {
    return (
        <div className='result_container bg-dark c-white'>
            <div className='result_team center'>
                <img className='result_team_logo' src="/logoTeam.png" alt="Логотип команды" />
                <p className='result_team_name'>{props.awayTeam.name}</p>
            </div>
            <div className='result_scope center'>
                <p>{props.awayScore} : {props.homeScore}</p>
                <div className={`result_scope_status center bg-${props.status}`}>
                    {props.status}
                </div>
            </div>
            <div className='result_team center'>
                <p className='result_team_name'>{props.homeTeam.name}</p>
                <img className='result_team_logo' src="/logoTeam.png" alt="Логотип команды" />
            </div>
        </div>
    )
}

export default Result