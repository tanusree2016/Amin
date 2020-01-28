import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Icon } from 'semantic-ui-react'
import swal from 'sweetalert'

export default class AddressbookSortTable extends Component {

    handleDelete = () => {
        swal({
            title: "Danger, Will Robinson",
            text: "Are you sure you'd like to remove this form?",
            textAlign: "center",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Item has been deleted!", {
                        icon: "success",
                    });
                }
            });
    }

    render() {
        const data = {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Last Name',
                    field: 'lastname',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Company Name',
                    field: 'companyname',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Phone',
                    field: 'phone',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'Actions',
                    sort: 'asc',
                    width: 100
                }
            ],
            rows: [
                {
                    name: 'Ashton Cox',
                    lastname: 'Junior Technical Author',
                    compantname: 'San Francisco',
                    email: '66',
                    phone: '2009/01/12',
                    action: <Icon name="trash" onClick={this.handleDelete} />
                },
                {
                    name: 'Ashton Cox',
                    lastname: 'Junior Technical Author',
                    compantname: 'San Francisco',
                    email: '66',
                    phone: '2009/01/12',
                    action: <Icon name="trash" onClick={this.handleDelete} />
                },
                {
                    name: 'Ashton Cox',
                    lastname: 'Junior Technical Author',
                    compantname: 'San Francisco',
                    email: '66',
                    phone: '2009/01/12',
                    action: <Icon name="trash" onClick={this.handleDelete} />
                },
        
            ]
        };
        
        return (
            <div>
                <MDBDataTable
                    striped
                    bordered
                    small
                    data={data}
                />

            </div>
        )
    }
}

