import React from 'react';
import validate from "./validators/user-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/user-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class UserForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.user = this.props.user;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: this.user != null,

            formControls: {
                name: {
                    value: this.user != null ? this.user.name : '',
                    placeholder: 'Name...',
                    valid: this.user != null,
                    touched: this.user != null,
                    validationRules: {
                        minLength: 2,
                        isRequired: true
                    }
                },
                email: {
                    value: this.user != null ? this.user.email : '',
                    placeholder: 'Email...',
                    valid: this.user != null,
                    touched: this.user != null,
                    validationRules: {
                        emailValidator: true
                    }
                },
                password: {
                    value: this.user != null ? this.user.password : '',
                    placeholder: 'Password...',
                    valid: this.user != null,
                    touched: this.user != null,
                    validationRules: {
                        minLength: 6,
                        isRequired: true
                    }
                },
                age: {
                    value: this.user != null ? this.user.age : '',
                    placeholder: 'Age...',
                    valid: this.user != null,
                    touched: this.user != null,
                },
                address: {
                    value: this.user != null ? this.user.address : '',
                    placeholder: 'Address..',
                    valid: this.user != null,
                    touched: this.user != null,
                },
                isAdmin: {
                    value: this.user != null ? this.user.isAdmin : '',
                    placeholder: 'isAdmin...',
                    valid: this.user != null,
                    touched: this.user != null,
                    validationRules: {
                        isAdminValidator: true
                    },
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

    registerPerson() {
        let user = {
            name: this.state.formControls.name.value,
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            address: this.state.formControls.address.value,
            age: this.state.formControls.age.value,
            isAdmin: this.state.formControls.isAdmin.value
        };
        return API_USERS.postUser(user, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted user with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    updatePerson() {
        let user = {
            name: this.state.formControls.name.value,
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            address: this.state.formControls.address.value,
            age: this.state.formControls.age.value,
            isAdmin: this.state.formControls.isAdmin.value,
            id: this.user.id
        };
        return API_USERS.updateUser(user, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated user with id: " + result);
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

        if (this.user === null) {
            this.registerPerson();
        }
        else {
            this.updatePerson();
        }
    }

    render() {
        return (
            <div>

                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 2 characters</div>}
                </FormGroup>

                <FormGroup id='email'>
                    <Label for='emailField'> Email: </Label>
                    <Input name='email' id='emailField' placeholder={this.state.formControls.email.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.email.value}
                           touched={this.state.formControls.email.touched? 1 : 0}
                           valid={this.state.formControls.email.valid}
                           required
                    />
                    {this.state.formControls.email.touched && !this.state.formControls.email.valid &&
                    <div className={"error-message"}> * Email must have a valid format</div>}
                </FormGroup>

                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                        <div className={"error-message"}> * Password must have at least 6 characters</div>}
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

                <FormGroup id='age'>
                    <Label for='ageField'> Age: </Label>
                    <Input name='age' id='ageField' placeholder={this.state.formControls.age.placeholder}
                           min={0} max={100} type="number"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.age.value}
                           touched={this.state.formControls.age.touched? 1 : 0}
                           valid={this.state.formControls.age.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='isAdmin'>
                    <Label for='isAdminField'> isAdmin: </Label>
                    <Input name='isAdmin' id='isAdminField' placeholder={this.state.formControls.isAdmin.placeholder}
                           min={0} max={1} type="number"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.isAdmin.value}
                           touched={this.state.formControls.isAdmin.touched? 1 : 0}
                           valid={this.state.formControls.isAdmin.valid }
                           required
                    />
                    {this.state.formControls.isAdmin.touched && !this.state.formControls.isAdmin.valid &&
                        <div className={"error-message row"}> * isAdmin has to be 0 or 1 </div>}
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

export default UserForm;
