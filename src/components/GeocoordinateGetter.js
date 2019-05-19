import React from 'react';

export default class GeocoordinateGetter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: ''
        }
        
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeInput2 = this.handleChangeInput2.bind(this);

    }

    handleChangeInput(e) {
        this.setState({
            ...this.state,
            start: e.target.value
        })
    }

    handleChangeInput2(e) {
        this.setState({
            ...this.state,
            end: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input onChange={(e) => this.handleChangeInput(e)} value={this.state.start} placeholder="inicio recorrido"></input>
                <input onChange={(e) => this.handleChangeInput2(e)} value={this.state.end} placeholder="final recorrido"></input>
                <button onClick={() => this.props.getCoordinates(this.state.start, this.state.end)}>Planificar</button>
            </div>
        )
    }
}