import React, { useState, useEffect } from 'react'
import Subvencion from '../../../services/ServiceSubvencion'

const SubvencionComponent = ({accountId}) => {

    const [subvenciones, setSubvenciones] = useState([])

    useEffect(() => {

        Subvencion.get()
        .then((subvenciones) => {

            const filteredById = subvenciones.filter((subvencion) => subvencion.account_id === accountId)
            setSubvenciones(filteredById)
        })
        .catch((error) => {
            console.error(error)
        })

    }, [])

    return (
        <div>
            <h1>Subvenciones</h1>
            <ul>
                {subvenciones.map((subvencion, i) => (
                    <>
                        <li key={i}>
                            {subvencion.account_id}
                        </li>

                        <li key={i}>
                            {subvencion.opportunity_id}
                        </li>
                    
                    </>
                ))}
            </ul>
        </div>
    )
}

export default SubvencionComponent;