import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { loadToys, removeToy, saveToy } from '../store/actions/toy.actions'




class _ToyPreview extends React.Component {

    render() {
        const { toy, removeToy, user } = this.props;
        return (
            <>
                <div className="toy-card flex column space-between align-center">
                    <Link to={`/toy/${toy._id}`}>
                        <h3>{toy.name}</h3>
                        {toy.img && <img src={toy.img} alt={toy.name} />}
                        {!toy.img && <img src={`https://robohash.org/${toy.name}`} alt={toy.name} />}
                        <div className="toy-info flex align-center column">
                            <h4>{toy.type}</h4>
                            <h5 className={`${toy.inStock ? 'on-sale' : 'out-of-stock'}`}>
                                {`${toy.inStock ? 'OnSale' : 'Out Of Stock!'}`}</h5>
                            <h4 className="price">${toy.price}</h4>
                        </div>
                    </Link>
                    {user && user.isAdmin &&
                        <div className="toy-card-btns flex space-between align-center">
                            <Link to={`/toy/edit/${toy._id}`}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<CreateIcon />}
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={() => {
                                    removeToy(toy._id);
                                }}
                            >
                                Delete
                            </Button>
                        </div>}
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}

const mapDispatchToProps = {
    loadToys,
    removeToy,
    saveToy
}

export const ToyPreview = connect(mapStateToProps, mapDispatchToProps)(_ToyPreview)
