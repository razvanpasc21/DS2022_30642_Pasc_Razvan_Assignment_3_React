import React from "react";
import Table from "../../commons/tables/table";
import * as API_USERS from "../../user/api/user-api";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import UserForm from "../../user/components/user-form";
import DeviceForm from "./device-form";
import * as API_DEVICES from "../api/device-api";


class DeviceTable extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            tableData: this.props.tableData,
            selected: false,
            collapseForm: false,
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    columnss = [
        {
            Header: 'Description',
            accessor: 'description',
        },
        {
            Header: 'Address',
            accessor: 'address',
        },
        {
            Header: 'MaxEnergyConsumption',
            accessor: 'maxEnergyConsumption',
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
        API_DEVICES.deleteDevice(row.id, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully deleted device!" + result);
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
        this.state.device = row;
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
                    <ModalHeader toggle={this.toggleForm}> Edit Device: </ModalHeader>
                    <ModalBody>
                        <DeviceForm
                            reloadHandler={this.reloadPage}
                            device = {this.state.device}
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default DeviceTable;