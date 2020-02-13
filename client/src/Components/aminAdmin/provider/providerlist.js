import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import axios from '../../../common/utils/axios';
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
import VisibilityIcon from '@material-ui/icons/Visibility';


mobiscroll.settings = {
    theme: 'ios',
  }
  
  function showAlert (text) {
    mobiscroll.alert({
        message: text,
        
    });
  }

  var providerArray = [];

  class ProviderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getAllprovider: [],
            providers: [],
            delIndex: -1,
            rejIndex: -1,
            viewIndex: -1,
      
        };

        this.handleAccept = this.handleAccept.bind(this);
        this.handleReject = this.handleReject.bind(this);
      
    }

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,
            open2: false,
         });
    };

    

    handleClickAccept(e,index) {
        this.setState({
            open1: true,
            providerid: e,
            delIndex: index,
        });
    }

    handleClickReject(e, index) {
        this.setState({
            open2: true,
            providerid: e,
            rejIndex: index,
        })
    }

    handleClickView(a,b,c,d,e,f,g,h,i,j,k,index) {
        this.setState({
            open: true,
            providerid: a,
            name:b,
            email:c,
            phone:d,
            dob:e,
            city:f,
            state:g,
            postalcode:h,
            address:i,
            experience:j,
            salary_hr:k,
            viewIndex: index,
        });
    }

    handleAccept(e) {
        e.preventDefault();
        
        const changeStatus = {
            providerid: this.state.providerid,

        }

        this.setState((prevState) => ({
            getAllprovider: prevState.getAllprovider.filter((_, i) => i !== this.state.delIndex)
        }));
        base_url.post('service/accept-provider', changeStatus, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    //swal("Company registraion is successfull");
                    //let success="Company registraion is successfull"
                    showAlert(res.data.message);
                }
                else
                    showAlert(res.data.message);
            })
            .catch(e => console.log(e))
        //this.props.changeStatus(changeStatus, this.props.history);
        this.handleClose();
      // this.forceUpdate();
        //this.fetchProviders();
    }


    handleReject(e){
        e.preventDefault();
        console.log('--id'+this.state.providerid)
        const changeStatus = {
            providerid: this.state.providerid,

        }

        this.setState((prevState) => ({
            getAllprovider: prevState.getAllprovider.filter((_, i) => i !== this.state.rejIndex)
        }));
        base_url.post('service/reject-provider', changeStatus, {
            headers: {
               // 'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    showAlert(res.data.message);
                }
                else
                    showAlert(res.data.message);
            })
            .catch(e => console.log(e))
      
        this.handleClose();
     //  this.forceUpdate();
    // this.fetchProviders();
    
    }

    


    fetchProviders () {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'service/provider-list', {
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllprovider: res.Providers
                });
                for (let i = 0; i < res.Providers.length; i++) {
                    providerArray.push(res.Providers[i].name);
                   // this.setState({ category: res.Service[i].category })
                   // this.setState({ color_code: res.Service[i].color_code })                    
                }
                console.log('array' + providerArray);
                this.setState({ category: providerArray })

               
            })
            console.log("Calling --- End ---  ");
        this.forceUpdate();

    }

  


    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchProviders();
    }

    render() {
        const { open, open1, open2 } = this.state;
        
        const likePointer = { cursor: 'pointer' , color: 'blue' };
        const delPointer = { cursor: 'pointer' , color: 'red' };

        const tableHeadStyle= { fontWeight: 'bold' , fontSize: '15px' , color: 'black' }
        const tableBodyStyle= { fontSize: '12px' }

        return (
            <div>
                <Dialog
                    open={open1}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">{"Are sure , Want to accept this service provider?"}</DialogTitle>
                    <DialogContent>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button style={{fontWeight: 'bold'}} onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleAccept}  color="secondary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog
                    open={open2}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">{"Are sure , Want to reject this service provider?"}</DialogTitle>
                    <DialogContent>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button style={{fontWeight: 'bold'}} onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleReject}  color="secondary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <DialogContentText>
                                View details
                        </DialogContentText>
                            <form>
                            
                                <div>
                                    <TextField
                                        label="Name:"
                                        value={(this.state.name)}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Email:"
                                        value={(this.state.email)}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Phone:"
                                        value={(this.state.phone)}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="DOB:"
                                        value={(this.state.dob)}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="City:"
                                        value={(this.state.city)}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="State:"
                                        value={(this.state.state)}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Postal Code:"
                                        value={(this.state.postalcode)}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Address:"
                                        value={(this.state.address)}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Experience:"
                                        value={(this.state.experience)}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Salary:"
                                        value={(this.state.salary_hr)}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                
                            </form>
                        </DialogContent>
                       
                    </Dialog>


                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={ tableHeadStyle }>Provider Name</TableCell>
                            <TableCell style={ tableHeadStyle }>Provider Email</TableCell>
                            <TableCell style={ tableHeadStyle }>Phone</TableCell>
                            <TableCell style={ tableHeadStyle }>Status</TableCell>
                            <TableCell style={ tableHeadStyle }>Accept</TableCell>
                            <TableCell style={ tableHeadStyle }>View</TableCell>
                            

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllprovider && this.state.getAllprovider.map((unit, i) =>


                            <TableRow>
                                <TableCell style={ tableBodyStyle }>{unit.name}</TableCell>
                                <TableCell style={ tableBodyStyle }>{unit.email}</TableCell>
                                <TableCell style={ tableBodyStyle }>{unit.phone}</TableCell>
                                {unit.is_verified === "unverified" ?
                                <TableCell style={ tableBodyStyle }>Pending</TableCell>
                                : (unit.is_verified === "verified" ?
                                <TableCell style={ tableBodyStyle }>Approved</TableCell>
                                :
                                <TableCell style={ tableBodyStyle }>Rejected</TableCell>
                                )}
                                 {unit.is_verified === "unverified" ?
                                <TableCell style={tableBodyStyle} ><a href="#" onClick={(e) => this.handleClickAccept(unit.id, i)}>Accept</a><br/><a href="#" onClick={(e) => this.handleClickReject(unit.id, i)}>Reject</a></TableCell>
                                :
                                <TableCell style={tableBodyStyle} >------</TableCell>
                                }
                                <TableCell><VisibilityIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickView(unit.id,unit.name,unit.email,unit.phone,unit.dob,unit.city,unit.state,unit.postalcode,unit.address,unit.experience,unit.salary_hr, i)}></VisibilityIcon></TableCell>
                                
                            </TableRow>

                        )}
                    </TableBody></Table>
            </div>
        )
    }
  }

  ProviderList.propTypes = {
    auth: PropTypes.object.isRequired,
   // editDesignation: PropTypes.func.isRequired,
    // designationDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(ProviderList)