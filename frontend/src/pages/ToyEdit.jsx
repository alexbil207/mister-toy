import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { saveToy } from '../store/actions/toy.actions';
import { toyService } from '../services/toy.service';
import CreateIcon from '@material-ui/icons/Create';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

class _ToyEdit extends React.Component {
    state = {
        name: '',
        price: '',
        type: '',
        img: '',
        inStock: '',

    }

    componentDidMount() {
        const { toyId } = this.props.match.params;
        if (toyId) {
            toyService.getById(toyId)
                .then(toy => this.setState({ ...toy }))
        }
    }


    handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({ ...prevState, [name]: value }))

    }

    onSave = () => {
        const { saveToy } = this.props;
        saveToy(this.state)
            .then(() => this.props.history.push('/'))
    }

    render() {
        const { img, name, price, type, inStock, _id } = this.state;
        return (
            <section className="edit-container flex column justify-center align-center gap">
                <h2>{`${_id ? 'Edit Toy' : 'New Toy'}`}</h2>
                <label htmlFor="img">Image</label>
                <input type="file" id='img' name="img" onChange={this.handleChange} defaultValue={img} />
                <label htmlFor="name">Name</label>
                <input type="text" id="name" defaultValue={name} name="name" onChange={this.handleChange} />
                <label htmlFor="price">Price</label>
                <input type="number" id="price" defaultValue={price} name="price" onChange={this.handleChange} />
                <label htmlFor="ctg">Type</label>
                <select name="type" id="type" value={type} onChange={this.handleChange}>
                    <option value=""></option>
                    <option value="Toddles">Toddles</option>
                    <option value="Funny">Funny</option>
                    <option value="Educational">Educational</option>
                    <option value="Adult">Adult</option>
                </select>
                <label htmlFor="inStock">Stock</label>
                <select name="inStock" id="inStock"
                    value={`${inStock ? 'in Stock' : 'Not in Stock'}`} onChange={this.handleChange} >
                    <option value="false">Not in Stock</option>
                    <option value="true">in Stock</option>
                </select>
                <div className="toy-card-btns flex">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ArrowLeftIcon />}
                        onClick={() => this.props.history.push('/')}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<CreateIcon />}
                        onClick={this.onSave}
                    >
                        Save
                    </Button>
                </div>
            </section>


        )

    }
}


const mapDispatchToProps = {
    saveToy,
}

export const ToyEdit = connect(null, mapDispatchToProps)(_ToyEdit)
