import React from 'react';
import { connect } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions'





class _FilterCmp extends React.Component {
    state = {
        txt: '',
        ctg: '',
        inStock: '',
    }

    handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({ ...prevState, [name]: value }), () => {
            this.props.loadToys(this.state)
        })
    }

    render() {
        return (
            <section className="filter-container container flex align-center space-between wrap">
                <div className="Stock flex">
                    <label htmlFor="inStock">Stock:</label>
                    <select name="inStock" id="inStock" onChange={this.handleChange}>
                        <option value=""></option>
                        <option value="true">inStock</option>
                    </select>
                </div>
                <div className="search flex">
                    <input type="text" name="txt" placeholder="Search" onChange={this.handleChange} />
                </div>
                <div className="ctg flex">
                    <label htmlFor="ctg">Category:</label>
                    <select name="ctg" id="ctg" onChange={this.handleChange}>
                        <option value=""></option>
                        <option value="Toddles">Toddles</option>
                        <option value="Funny">Funny</option>
                        <option value="Educational">Educational</option>
                        <option value="Adult">Adult</option>
                    </select>
                </div>

            </section>
        )
    }
}


const mapDispatchToProps = {
    loadToys
}


export const FilterCmp = connect(null, mapDispatchToProps)(_FilterCmp)
