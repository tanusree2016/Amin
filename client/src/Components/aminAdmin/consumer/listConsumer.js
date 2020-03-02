import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import envirionment from '../../../common/utils/envirionment';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import base_url from '../../../common/utils/axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MUIDataTable from "mui-datatables";

mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}
var consumerArray = [];
var desigNameArray = [];
var desigIdArray = [];

class ListConsumer extends Component {
    constructor(props) {
        super();
        this.state = {
            getAllConsumer: [],
            name: '',
            email: '',
            phone: '',
            password: '',
            address: '',
            landmark: '',
            consumerid: '',
            delIndex: -1,
            editIndex: -1,


        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(e, f,index) {

     //  console.log('--'+JSON.stringify(index));
       console.log('----'+JSON.stringify(f));
        this.setState({
            open: true,
            consumerid: e,
            name: f.rowData[0],//f, //country
            email: f.rowData[1],//g,
            phone: f.rowData[2],//h,
            //  password: i,
            address: f.rowData[3],//j,
            landmark: f.rowData[4],//k,
            editIndex: index,
        });

       // console.log('setstate'+this.state.phone);

    };

    handleClickDelete(e, index) {
        this.setState({
            open1: true,
            consumerid: e,
            delIndex: index,
        });
    }

    componentDidMount() {
        this.fetchConsumer();


    }



    fetchConsumer() {
        fetch(envirionment.BASE_URL + 'admin/list-consumer', {
            method: "POST",
            // headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllConsumer: res.data
                });

                console.log(JSON.stringify(res.data));
                for (let i = 0; i < res.data.length; i++) {
                    consumerArray.push(res.data[i].data);
                    // this.setState({ country: res.data[i].name })
                    // this.setState({ subcategory: res.data[i].name })
                    //this.setState({ subcategoryid: res.data[i].id })
                    // this.setState({ color_code: res.Service[i].color_code })                    
                }
                console.log('array' + consumerArray);
                this.setState({ consumer: consumerArray })

            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }
    handleClose = () => {
        this.setState({
            open: false,
            open1: false,

        });
    };

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

    }

    handleDelete(e) {
        e.preventDefault();
        // console.log("this.state.unitid --- " + this.state.unitid)

        this.setState((prevState) => ({
            getAllConsumer: prevState.getAllConsumer.filter((_, i) => i !== this.state.delIndex)
        }));

        const changeStatus = {
            consumerid: this.state.consumerid,

        }

        base_url.post('admin/delete-consumer', changeStatus, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },

        }).then(res => {
            if (res.data.value == 1) {
                let success = "Consumer is Deleted successfully"
                showAlert(success);
            }
            else {
                showAlert(res.data.message);
            }
        })
            .catch(err => {
            });

        this.handleClose();
    }

    handleSubmit(e) {
        e.preventDefault();

        const consumerEdit = {

            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            address: this.state.address,
            landmark: this.state.landmark,
            consumerid: this.state.consumerid
        }

        // this.state.getAllConsumer[this.state.editIndex].name= this.state.name,
        // this.state.getAllConsumer[this.state.editIndex].email= this.state.email,
        // this.state.getAllConsumer[this.state.editIndex].phone= this.state.phone,
        // this.state.getAllConsumer[this.state.editIndex].password= this.state.password,
        // this.state.getAllConsumer[this.state.editIndex].address= this.state.address,
        // this.state.getAllConsumer[this.state.editIndex].landmark= this.state.landmark,


        base_url.post('admin/edit-consumer', consumerEdit, {
            headers: {
                // 'x-access-token': localStorage.getItem('token'),
                //'x-access-db': localStorage.getItem('dbname')
            }
        })
            .then(res => {
                //this.resetField();
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    //swal("Plan is added successfully");
                    let success = "Consumer is updates successfully"
                    showAlert(success);
                }
                else
                    //swal(res.data.message);
                    showAlert(res.data.message);

                //this.resetField();
                // this.reloadChild();
            })
            .catch(e => console.log(e))
        this.handleClose();

    }

    render() {

        const { open, open1 } = this.state;

        const likePointer = { cursor: 'pointer', color: 'blue' };
        const delPointer = { cursor: 'pointer', color: 'red' };
        const tableHeadStyle = { fontWeight: 'bold', fontSize: '15px', color: 'black' };
        const tableBodyStyle = { fontSize: '12px' };
        const formControl = {
            minWidth: 150,
            marginLeft: 15,
        };

        const columns = [
            {
                name: "Name",
                options: {
                //filter: true,
                }
            },

            {
                name: "Email",
                options: {
                //filter: true,
                }
            },

            {
                name: "Phone",
                options: {
                //filter: true,
                }
            },
            {
                name: "Edit",
                options: {
                 // filter: true,
                  sort: false,
                  empty: false,
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <button onClick={() => this.handleClick(value,tableMeta,tableMeta.rowIndex)}>
                        Edit
                      </button>
                    );
                  }
                }
              },
              {
                name: "Delete",
                options: {
                  filter: true,
                  sort: false,
                 // empty: true,
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <button onClick={() => this.handleClickDelete(value,tableMeta.rowIndex)}>
                        Delete
                      </button>
                    );
                  }
                }
              },
        ]
        //"Sub Category", "Parent Sub Category", "Edit", "Delete"];



       const options = {
        selectableRows: false,
        textLabels: {
            body: {
              noMatch: "Please Wait until data is loading",
              toolTip: "Sort",
              columnHeaderTooltip: column => `Sort for ${column.label}`
            },
        }
        //filterType: 'checkbox',
      };



        return (
            <div>

                <Dialog
                    open={open1}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">{"Are sure , to delete the Consumer ?"}</DialogTitle>
                    <DialogContent>

                    </DialogContent>
                    <DialogActions>
                        <Button style={{ fontWeight: 'bold' }} onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleDelete} color="secondary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit Consumer
                        </DialogContentText>
                        <form>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Full Name"
                                name="name"
                                value={this.state.name}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                value={this.state.email}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                // value={this.state.phone}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                type="number"
                                value={this.state.phone}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />



                            <TextField
                                autoFocus
                                margin="dense"
                                id="address"
                                label="Address"
                                name="address"
                                value={this.state.address}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />


                            <TextField
                                autoFocus
                                margin="dense"
                                id="landmark"
                                label="LandMark"
                                name="landmark"
                                value={this.state.landmark}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button style={{ fontWeight: 'bold' }} onClick={this.handleSubmit} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHeadStyle}>Name</TableCell>
                            <TableCell style={tableHeadStyle}>Email</TableCell>
                            <TableCell style={tableHeadStyle}>Phone</TableCell>
                            <TableCell style={tableHeadStyle}>Edit</TableCell>
                            <TableCell style={tableHeadStyle}>Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllConsumer && this.state.getAllConsumer.map((consumer, i) =>


                            <TableRow>
                                <TableCell style={tableBodyStyle}>{consumer.name}</TableCell>
                                <TableCell style={tableBodyStyle}>{consumer.email}</TableCell>
                                <TableCell style={tableBodyStyle}>{consumer.phone}</TableCell>
                                <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(consumer.id, consumer.name, consumer.email, consumer.phone, consumer.password, consumer.address, consumer.landmark)} /></TableCell>
                                <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(consumer.id, i)} /></TableCell>
                            </TableRow>

                        )}
                    </TableBody></Table> */}
                    
                    <MUIDataTable
                    title={"Consumer"}
                    data={this.state.getAllConsumer.map(item =>{
                         return[
                            item.name,
                            item.email,
                            item.phone,
                           // item.id,
                            item.address,
                            item.landmark
                         ]
                    })}
                    columns={columns}
                    options={options}
                    />
                    
                    
                    </div>
        )
    }
}

ListConsumer.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(ListConsumer)