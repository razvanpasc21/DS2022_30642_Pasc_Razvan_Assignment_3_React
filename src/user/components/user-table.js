import React from "react";
import Table from "../../commons/tables/table";
import * as API_DEVICES from "../../device/api/device-api";
import * as API_USERS from "../api/user-api";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import UserForm from "./user-form";

class UserTable extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);

        this.state = {
            tableData: this.props.tableData,
            user: null,
            formSelected: false,
            selected: false,
            collapseForm: false,
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    };

    columnss = [
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Password',
            accessor: 'password',
        },
        {
            Header: 'Address',
            accessor: 'address',
        },
        {
            Header: 'Age',
            accessor: 'age',
        },
        {
            Header: 'isAdmin',
            accessor: 'isAdmin',
        },
        {
            Header: 'Actions',
            Cell: row => (
                <div>
                    <button onClick={() => this.handleEdit(row.original)}>Edit</button>
                    <button onClick={() => this.handleDelete(row.original)}>Delete</button>
                </div>
            )
        }

    ];

    handleDelete(row) {
        API_USERS.deleteUser(row.id, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully deleted user!" + result);
                this.reloadPage();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    reloadPage() {
        window.location.reload();
    }

    handleEdit(row) {
        this.state.user = row;
        this.toggleForm();
    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
    }

    toggleForm() {
        this.setState({formSelected: !this.state.formSelected});
    }

    render() {
        return (
            <div>
            <Table
                data={this.state.tableData}
                columns={this.columnss}
                pageSize={5}
            />

                <Modal isOpen={this.state.formSelected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Edit User: </ModalHeader>
                    <ModalBody>
                        <UserForm
                            reloadHandler={this.reloadPage}
                            user = {this.state.user}
                        />
                    </ModalBody>
                </Modal>
            </div>


        )
    }
}

export default UserTable;