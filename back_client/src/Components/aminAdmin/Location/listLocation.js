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

mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}
var locationArray = [];
var desigNameArray = [];
var desigIdArray = [];
class ListLocation extends Component {

    constructor(props) {
        super();
        this.state = {
            getAllLocation: [],
            city: '',
            country: '',
            state: '',
            locationid: '',
            statename: '',
            name: '',
            getallcountry: [],
            getallstate: [],
            delIndex: -1,
            editIndex: -1,


        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(e, f, g, h, index) {
        this.setState({
            open: true,
            city: e,
            name: f, //country
            statename: g,
            locationid: h,
            editIndex: index,
        });

        console.log('setstate'+this.state.locationid);
    };
    handleClose = () => {
        this.setState({
            open: false,
            open1: false,

        });
    };

    handleSubmit(e) {
        e.preventDefault();
       
        const unitEdit = {

            country_id: this.state.name,
            state_id: this.state.statename,
            city: this.state.city,
            locationid: this.state.locationid
        }

        this.state.getAllLocation[this.state.editIndex].country_id= this.state.country_id
        this.state.getAllLocation[this.state.editIndex].state_id= this.state.state_id
        this.state.getAllLocation[this.state.editIndex].city= this.state.city

        base_url.post('admin/edit-location', unitEdit, {
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
                    let success = "Location is updates successfully"
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


    handleInputChangeValueCountry(event,id){
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        this.setState({ [nam]: val });
        for (let i = 0; i < this.state.getallcountry.length; i++) {
            if (JSON.stringify(desigIdArray.pop(i)) == val) {
                console.log("entered");
                this.state.id = val;
            }
        }

        console.log('name---'+nam);
        this.fetchState(val);
    }

    handleInputChangeValue(event){
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

        console.log('----------'+this.state.city);
    }

    handleInputChangeValueState(event,id){
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        this.setState({ statename: val });
        for (let i = 0; i < this.state.getallstate.length; i++) {
            if (JSON.stringify(desigIdArray.pop(i)) == val) {
                console.log("entered");
                this.state.id = val;
            }
        }
        

    }

    fetchCountry(){
      
            fetch(envirionment.BASE_URL + 'admin/country-list/', {
                method: "POST",
                headers: {
                    //'x-access-token': localStorage.getItem('token'),
                    
                }
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        getallcountry: res.data,
                        loading: false,
                    });

                    for (let i = 0; i < res.data.length; i++) {
                        desigNameArray.push(res.data[i].name);
                        desigIdArray.push(res.data[i].id);
                       
                    }
                })
       
    }


    fetchState(country_id){
      
        fetch(envirionment.BASE_URL + 'admin/state-list/'+ country_id, {
            method: "POST",
            headers: {
                // 'x-access-token': localStorage.getItem('token'),
                // 'x-access-db': localStorage.getItem('dbname')
            }
        }).then(res => res.json())
            .then(res => {
                console.log('state'+res)
                this.setState({
                    getallstate: res.data
                });
            })
            .catch(error => console.log(error));
        
    }


    handleClickDelete(e, index) {
        this.setState({
            open1: true,
            locationid: e,
            delIndex: index,
        });
    }


    handleDelete(e) {
        e.preventDefault();
        // console.log("this.state.unitid --- " + this.state.unitid)

        this.setState((prevState) => ({
            getAllLocation: prevState.getAllLocation.filter((_, i) => i !== this.state.delIndex)
        }));

        const changeStatus = {
            locationid: this.state.locationid,

        }

        base_url.post('admin/delete-location', changeStatus, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },

        }).then(res => {
            if (res.data.value == 1) {
                let success = "Location is Deleted successfully"
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

    componentDidMount() {
        this.fetchLocation();
        this.fetchState();
        this.fetchCountry();

    }

    fetchLocation() {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'admin/location-list', {
            method: "POST",
            // headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllLocation: res.data
                });

                console.log(JSON.stringify(res.data));
                for (let i = 0; i < res.data.length; i++) {
                    locationArray.push(res.data[i].city);
                    // this.setState({ country: res.data[i].name })
                    // this.setState({ subcategory: res.data[i].name })
                    //this.setState({ subcategoryid: res.data[i].id })
                    // this.setState({ color_code: res.Service[i].color_code })                    
                }
                console.log('array' + locationArray);
                this.setState({ location: locationArray })

            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

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
        return (
            <div>

                <Dialog
                    open={open1}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">{"Are sure , to delete the location ?"}</DialogTitle>
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
                            Edit Subcategory
                        </DialogContentText>
                        <form>

                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <FormControl style={formControl}>
                                    <InputLabel htmlFor="Country">Country</InputLabel>
                                    <Select
                                        value={this.state.name}
                                        onChange={(ev) => this.handleInputChangeValueCountry(ev)}
                                        inputProps={{
                                            name: 'name',
                                            id: 'name',
                                        }}
                                    >
                                        {this.state.getallcountry.map(module => (
                                            <MenuItem value={module.id}>{module.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>

                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <FormControl style={formControl}>
                                    <InputLabel htmlFor="State">State</InputLabel>
                                    <Select
                                        value={this.state.statename}
                                        onChange={(ev) => this.handleInputChangeValueState(ev)}
                                        inputProps={{
                                            name: 'statename',
                                            id: 'statename',
                                        }}
                                    >
                                        {this.state.getallstate.map(module => (
                                            <MenuItem value={module.id}>{module.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="city"
                                label="City"
                                name="city"
                                value={this.state.city}
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

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHeadStyle}>Country</TableCell>
                            <TableCell style={tableHeadStyle}>State</TableCell>
                            <TableCell style={tableHeadStyle}>City</TableCell>
                            <TableCell style={tableHeadStyle}>Edit</TableCell>
                            <TableCell style={tableHeadStyle}>Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllLocation && this.state.getAllLocation.map((location, i) =>


                            <TableRow>
                                <TableCell style={tableBodyStyle}>{location.country.name}</TableCell>
                                <TableCell style={tableBodyStyle}>{location.state.name}</TableCell>
                                <TableCell style={tableBodyStyle}>{location.city}</TableCell>
                                <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(location.city, location.country.id, location.state.id, location.id, i)} /></TableCell>
                                <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(location.id, i)} /></TableCell>
                            </TableRow>

                        )}
                    </TableBody></Table>
            </div>
        )
    }

}

ListLocation.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(ListLocation)