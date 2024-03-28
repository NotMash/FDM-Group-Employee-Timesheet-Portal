import React, { Component } from 'react';
import axios from 'axios';

class FinanceTeamMember extends Component {
    state = {
        consultantId: '',
        hourlyRate: '',
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { consultantId, hourlyRate } = this.state;
        
        // Replace 'http://localhost:5000' with your Flask app's URL
        axios.post('http://localhost:3000/finance-team-view', { 
            consultant_id: consultantId, 
            hourly_rate: hourlyRate 
        })
        .then(response => {
            alert('Hourly rate updated successfully!');
        })
        .catch(error => {
            alert('An error occurred: ' + error.message);
        });
    };

    render() {
        return (
            <div>
                <h1>Set Consultant Hourly Rate</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Consultant ID:
                            <input
                                type="text"
                                name="consultantId"
                                value={this.state.consultantId}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            New Hourly Rate:
                            <input
                                type="text"
                                name="hourlyRate"
                                value={this.state.hourlyRate}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default FinanceTeamMember;