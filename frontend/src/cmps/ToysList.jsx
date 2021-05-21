import React from 'react'
import { ToyPreview } from './ToyPreview.jsx'


export function ToysList({ toys }) {
    return (
        <React.Fragment>
            {toys.map(toy => <ToyPreview key={toy._id} toy={toy} />)}
        </React.Fragment>
    )
}