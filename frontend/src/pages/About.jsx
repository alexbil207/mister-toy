import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Component } from 'react';
import Button from '@material-ui/core/Button';

class _About extends Component {

    state = {
        name: 'Karmiel Store',
        lat: 32.915993,
        lng: 35.297160
    }

    render() {
        const style = {
            margin: '50px auto',
            width: '80vw',
            height: '70vh'
        }
        return (
            <section className="map-container flex column align-center">
                <h1>Come Visit Us</h1>
                <Map
                    style={style}
                    google={this.props.google}
                    zoom={15}
                    initialCenter={{
                        lat: 32.915993,
                        lng: 35.297160
                    }}
                    center={this.state}
                >
                    <Marker
                        position={this.state}
                        name={'Current location'} />

                    <InfoWindow
                        visible={true}
                        position={this.state}
                    >
                        <div>
                            <h1>{this.state.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
                <div className="map-btns container flex space-between">
                    <Button className="btn" variant="contained" color="primary"
                        name="karmiel" onClick={() => {
                            this.setState({ name: 'Karmiel Store', lat: 32.915993, lng: 35.297160 })
                        }}>Karmiel</Button>
                    <Button className="btn" variant="contained" color="primary"
                        name="haifa" onClick={() => {
                            this.setState({ name: 'Haifa Store', lat: 32.795275, lng: 34.984252 })
                        }}>Haifa</Button>
                    <Button className="btn" variant="contained" color="primary"
                        name="tlv" onClick={() => {
                            this.setState({ name: 'Tel Aviv Store', lat: 32.078352, lng: 34.774758 })
                        }}>Tel Aviv</Button>
                </div>
            </section>
        );
    }
}

export const About = GoogleApiWrapper({
    apiKey: ('API_KEY')
})(_About)




