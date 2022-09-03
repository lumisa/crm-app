import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { dateFormatter } from '../../../utils/date';
import EditableInput from '../EditableInput';

const TimelineComponent = ({tramites}) => {

    const newTimeline = [
        { name: 'tramite_title', placeholder: 'Título del trámite', type: 'text' },
        { name: 'tramite_description', placeholder: 'Descripción del trámite', type: 'text' },
        { name: 'tramite_date', placeholder: 'Fecha del trámite', type: 'date' },
    ]
    

    return (

        <>
        <h2>Tramites</h2>
            <Timeline position="left">
                 {tramites.map((el, i) => (
                    <TimelineItem key={i}>
                    <TimelineOppositeContent color="text.secondary">
                        <p>
                            <EditableInput
                            value={el.date} 
                            type="date"
                            propertyName="date"
                            editable={true}
                            />
                        </p>
                        <small>{el.done ? 'Done' : ''}</small>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color={el.done ? 'primary' : 'grey'}/>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <h6>{el.tramite_title}</h6>
                        <p>{el.tramite_description}</p>
                        </TimelineContent>
                    </TimelineItem>

                ))}

            </Timeline>

            <form>
                <input type="text" placeholder="Titulo" />
                <input type="text" placeholder="Descripción" />
                <input type="date" placeholder="Fecha" />
                <button type="submit">Añadir</button>


            </form>
        </>
    )
}

export default TimelineComponent