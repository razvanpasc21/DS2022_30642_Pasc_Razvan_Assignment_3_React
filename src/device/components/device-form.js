import React from 'react';
import validate from "./validators/device-validators";
import Button from "react-bootstrap/Button";
import * as API_DEVICES from "../api/device-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import * as API_USERS from "../../user/api/user-api";



class DeviceForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.device = this.props.device;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: this.device != null,

            formControls: {
                description: {
                    value: this.device != null ? this.device.description : '',
                    placeholder: 'Description...',
                    valid: this.device != null,
                    touched: this.device != null,
                    validationRules: {
                        minLength: 2,
                        isRequired: true
                    }
                },
                address: {
                    value: this.device != null ? this.device.address : '',
                    placeholder: 'Address...',
                    valid: this.device != null,
                    touched: this.device != null,
                    validationRules: {
                        minLength: 5
                    }
                },
                maxEnergyConsumption: {
                    value: this.device != null ? this.device.maxEnergyConsumption : '',
                    placeholder: 'MaxEnergyConsumption...',
                    valid: this.device != null,
                    touched: this.device != null,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerDevice() {
        let device = {
            description: this.state.formControls.description.value,
            address: this.state.formControls.address.value,
            maxEnergyConsumption: this.state.formControls.maxEnergyConsumption.value
        };
        return API_DEVICES.postDevice(device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted device with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    updateDevice() {
        let device = {
            description: this.state.formControls.description.value,
            address: this.state.formControls.address.value,
            maxEnergyConsumption: this.state.formControls.maxEnergyConsumption.value,
            id: this.device.id
        };
        return API_DEVICES.updateDevice(device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated device with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {

        if (this.device === null) {
            this.registerDevice();
        }
        else {
            this.updateDevice();
        }
    }

    render() {
        return (
            <div>

                <FormGroup id='description'>
                    <Label for='descriptionField'> Description: </Label>
                    <Input name='description' id='descriptionField' placeholder={this.state.formControls.description.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.description.value}
                           touched={this.state.formControls.description.touched? 1 : 0}
                           valid={this.state.formControls.description.valid}
                           required
                    />
                    {this.state.formControls.description.touched && !this.state.formControls.description.valid &&
                    <div className={"error-message row"}> * Description must have at least 5 characters</div>}
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='maxEnergyConsumption'>
                    <Label for='maxEnergyConsumptionField'> Max Energy Consumption: </Label>
                    <Input name='maxEnergyConsumption' id='maxEnergyConsumptionField' placeholder={this.state.formControls.maxEnergyConsumption.placeholder}
                           min={0} max={1000} type="number"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.maxEnergyConsumption.value}
                           touched={this.state.formControls.maxEnergyConsumption.touched? 1 : 0}
                           valid={this.state.formControls.maxEnergyConsumption.valid}
                           required
                    />
                </FormGroup>

                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                        </Col>
                    </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default DeviceForm;
