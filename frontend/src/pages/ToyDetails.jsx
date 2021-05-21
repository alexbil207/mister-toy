import React from 'react';
import { connect } from 'react-redux';
import { loadToys, removeToy, saveToy } from '../store/actions/toy.actions'
import { toyService } from '../services/toy.service.js'
import { LoadingCmp } from '../cmps/LoadingCmp.jsx';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';


class _ToyDetails extends React.Component {
    state = {
        toy: null,
    }
    componentDidMount() {
        const { toyId } = this.props.match.params;
        toyService.getById(toyId)
            .then(toy => this.setState({ toy }))
    }

    onRemove = () => {
        const { toyId } = this.props.match.params;
        const { removeToy } = this.props;
        removeToy(toyId)
        this.props.history.push('/');
    }
    render() {
        const { toy } = this.state;
        if (!toy) return <LoadingCmp />
        return (

            <section className="toy-details-container container flex align-center justify-center wrap gap">
                <div className="toy-image">
                    <img src={`https://robohash.org/${toy.name}`} alt={toy.name} />
                </div>
                <div className="details flex column align-center space-between">
                    <h3>Name: {toy.name}</h3>
                    <h4>Type: {toy.type}</h4>
                    <h5 className={`${toy.inStock ? 'on-sale' : 'out-of-stock'}`}>
                        {`${toy.inStock ? 'OnSale' : 'Out Of Stock!'}`}</h5>
                    <h4 className="price">${toy.price}</h4>
                    <div className="toy-details-container-btns btn flex align-center space-between">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ArrowLeftIcon />}
                            onClick={() => this.props.history.push('/')}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </section>
        )
    }
}





const mapDispatchToProps = {
    loadToys,
    removeToy,
    saveToy
}

export const ToyDetails = connect(null, mapDispatchToProps)(_ToyDetails)
