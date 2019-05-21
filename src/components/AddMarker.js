import React from 'react';

export default class AddMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            ...this.state,
            input: e.target.value
        })
    }

    render() {
        return(
            <div>
                <input onChange={(e) => this.handleInputChange(e)}></input>
                <button onClick={() => {
                    this.props.getMarker(this.state.input)
                    this.setState({
                        ...this.state,
                        input: "",
                    })
                }}>Agregar Marcador</button>
            </div>
        )
    }

}