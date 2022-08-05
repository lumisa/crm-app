import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';


const TimelineComponent = () => {
    
    const TimelineObj = [
        {content: 'Estudio Solar/Presupuesto', date: '01/08/2022', description: '', timeDotColor: 'primary', estado: 'hecho'},
        {content: 'Pago reserva', date: '02/08/2022', description: '50%', timeDotColor: 'primary', estado: 'hecho'},
        {content: 'Memoria técnica', date: '22/08/2022', description: 'Jordi', timeDotColor: 'primary', estado: 'hecho'},
        {content: 'Comunicación Obra', date: '22/08/2022', description: 'Esparraguerra', timeDotColor: 'primary', estado: 'hecho'},
        {content: 'Compra de material', date: '22/08/2022', description: 'Baywa', timeDotColor: 'primary', estado: 'hecho'},
        {content: 'Instalación', date: '22/08/2022', description: 'Installor', timeDotColor: 'primary', estado: 'hecho'},
        {content: 'Subvención', date: '', description: '', timeDotColor: 'grey', estado: 'pendiente'},
        {content: 'Bonificación IBI', date: '', description: '', timeDotColor: 'grey', estado: 'pendiente'},
    ]
    return (

        <>
        <h2>Tramites</h2>
            <Timeline position="left">
                {TimelineObj.map((el) => (
                    <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        <p>{el.date}</p>
                        <small>{el.estado}</small>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color={el.timeDotColor}/>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <h6>{el.content}</h6>
                        <p>{el.description}</p>
                        </TimelineContent>
                    </TimelineItem>

                ))}

            </Timeline>
        </>
    )
}

export default TimelineComponent