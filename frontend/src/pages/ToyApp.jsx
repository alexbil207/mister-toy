import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadToys, removeToy, saveToy } from '../store/actions/toy.actions.js';
import { ToysList } from '../cmps/ToysList.jsx';
import { FilterCmp } from '../cmps/FilterCmp.jsx';
import { LoadingCmp } from '../cmps/LoadingCmp.jsx';


class _ToyApp extends React.Component {
    componentDidMount() {
        this.props.loadToys();
    }
    render() {
        const { toys, user } = this.props;
        if (!toys) return <LoadingCmp />
        return (
            <>
                <FilterCmp />
                <div className="toys-container container grid gap">
                    <ToysList toys={toys} />
                </div>
                {user && user.isAdmin && <Link to='/toy/new'><button className="add-btn"><AddIcon /></button></Link>}
            </>
        )
    }
}
function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys,
        user: state.userModule.user,

    }
}

const mapDispatchToProps = {
    loadToys,
    removeToy,
    saveToy
}



export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)
