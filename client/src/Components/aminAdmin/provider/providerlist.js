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
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}

var providerArray = [];
var desigNameArray = [];
var desigIdArray = [];
var stateNameArray = [];
var stateIdArray = [];
class ProviderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getAllprovider: [],
            providers: [],
            getallcountry: [],
            getallstate: [],
            getallcity: [],
            searchBy: '',
            getAllProviderList: [],
            getAllProviderListBySearch: [],
            getAllProviderListSearchItem: [],
            delIndex: -1,
            rejIndex: -1,
            viewIndex: -1,
            country: '',
            statename: '',
            city: '',
            min_birth_date: new Date(),
            max_birth_date: new Date(),
            birth_date: new Date(),
            password: '',
            address: '',
            getAllCategory: [],
            getallsubcategory:[],
            getallchildsubcategory:[],
            category: '',
            subcategory:'',
            sub_category: '',
            subcategory:'',
            final_category: '',
            childsubcategory: '',

        };

        this.handleAccept = this.handleAccept.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBirthDateChange = this.handleBirthDateChange.bind(this);

        this.state.min_birth_date.setFullYear(this.state.birth_date.getFullYear() - 100);
        this.state.max_birth_date.setFullYear(this.state.birth_date.getFullYear() - 13);
        this.state.birth_date.setFullYear(this.state.birth_date.getFullYear() - 14);

    }



    handleClose = () => {
        this.setState({
            open: false,
            open1: false,
            open2: false,
            open3: false,
        });
    };

    handleBirthDateChange(date) {
        this.setState({ dob: date })
    }



    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

    }

    handleInputChangeValueCity(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        this.setState({ [nam]: val });
        for (let i = 0; i < this.state.getallstate.length; i++) {
            if (JSON.stringify(desigIdArray.pop(i)) == val) {
                console.log("entered");
                this.state.id = val;
            }
        }
    }

    handleClickDelete(e, index) {
        this.setState({
            open3: true,
            providerid: e,
            delIndex: index,
        });
    }

    handleInputChangeSearchValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

        if (val === "") {
            console.log("Clear")
            this.state.getAllProviderListBySearch = [];
            this.forceUpdate();
        }
    }

    handleInputChangeValueState(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        this.setState({ statename: val });
        for (let i = 0; i < this.state.getallstate.length; i++) {
            if (JSON.stringify(desigIdArray.pop(i)) == val) {
                console.log("entered");
                this.state.id = val;
            }
        }
      //  console.log('name---' + nam);
       // console.log('I a country--'+this.state.country);
        let country_id = this.state.country
        this.fetchCity(val, country_id);
    }


    handleInputChangeValueCategory(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        this.setState({ [nam]: val });
        for (let i = 0; i < this.state.getAllCategory.length; i++) {
            if (JSON.stringify(desigIdArray.pop(i)) == val) {

                this.state.id = val;
            }
        }

        this.fetchSubcategory(val);
    }

    handleInputChangeValueSubCategory(event,id){
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        this.setState({ [nam]: val });
        for (let i = 0; i < this.state.getAllCategory.length; i++) {
            if (JSON.stringify(stateIdArray.pop(i)) == val) {
               
                this.state.id = val;
            }
        }
        console.log('name---'+nam);
        this.fetchChildSubcategory(val);
    }

    handleInputChangeValueChildSubCategory(event,id){

        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        this.setState({ [nam]: val });
        for (let i = 0; i < this.state.getallstate.length; i++) {
            if (JSON.stringify(desigIdArray.pop(i)) == val) {
                console.log("entered");
                this.state.id = val;
            }
        }
    }

    handleInputChangeValueCountry(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        this.setState({ [nam]: val });
        for (let i = 0; i < this.state.getallcountry.length; i++) {
            if (JSON.stringify(desigIdArray.pop(i)) == val) {
                console.log("entered");
                this.state.id = val;
            }
        }

        console.log('name---' + nam);
        this.fetchState(val);
    }


    handleClickAccept(e, index) {
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

    handleClickView(a, b, c, d, e, f, g, h, i, j, k, l, m,n,o, index) {
        this.setState({
            open: true,
            providerid: a,
            name: b,
            email: c,
            phone: d,
            birth_date: e,
            city: f,
            statename: g,
            postalcode: h,
            address: i,
            experience: j,
            salary_hr: k,
            country: l,
            category: m,
            subcategory:n,
            childsubcategory:o,
            viewIndex: index,
        });
        this.fetchSubcategory(m);
        this.fetchChildSubcategory(n);
        this.fetchState(l);
        this.fetchCity(g,l);


    }

    handleSearch(e) {
        e.preventDefault();
        this.searchItemDisplay();
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.searchItemDisplay();
        }
    }

    handleDelete(e) {
        e.preventDefault();

        this.setState((prevState) => ({
            getAllProviderList: prevState.getAllProviderList.filter((_, i) => i !== this.state.delIndex)
        }));

        const changeStatus = {
            providerid: this.state.providerid,

        }

        base_url.post('admin/delete-provider', changeStatus, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },

        }).then(res => {
            if (res.data.value == 1) {
                let success = "Provider is Deleted successfully"
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

    handleAccept(e) {
        e.preventDefault();

        const changeStatus = {
            providerid: this.state.providerid,

        }

        this.setState((prevState) => ({
            getAllProviderList: prevState.getAllProviderList.filter((_, i) => i !== this.state.delIndex)
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


    handleReject(e) {
        e.preventDefault();
        console.log('--id' + this.state.providerid)
        const changeStatus = {
            providerid: this.state.providerid,

        }

        this.setState((prevState) => ({
            getAllProviderList: prevState.getAllProviderList.filter((_, i) => i !== this.state.rejIndex)
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


    searchItemDisplay() {

        this.state.getAllProviderListBySearch = [];
        this.state.getAllProviderListBySearchItem = [];
        let c = 0;

        for (let i = 0; i < this.state.getAllProviderList.length; i++) {
            console.log('within for' + this.state.getAllProviderList[i].name);
            if (this.state.searchBy === this.state.getAllProviderList[i].name) {
                this.state.searchItemIndex = i;
                this.state.getAllProviderListBySearch.push(this.state.getAllProviderList[i])
                this.forceUpdate();
                c = 1;
                //break;
                console.log("Fine")
            }
        }

    }



    handleSubmit(e) {
        e.preventDefault();

        const providerEdit = {
            providerid: this.state.providerid,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            dob: this.state.birth_date,
            country:this.state.country,
            statename: this.state.statename,
            city: this.state.city,
            postalcode: this.state.postalcode,
            password: this.state.password,
            address: this.state.address,
            experience: this.state.experience,
            salary_hr: this.state.salary_hr,
            category:this.state.category,
            subcategory:this.state.subcategory,
            childsubcategory:this.state.childsubcategory
        }

        // this.state.getAllConsumer[this.state.editIndex].name= this.state.name,
        // this.state.getAllConsumer[this.state.editIndex].email= this.state.email,
        // this.state.getAllConsumer[this.state.editIndex].phone= this.state.phone,
        // this.state.getAllConsumer[this.state.editIndex].password= this.state.password,
        // this.state.getAllConsumer[this.state.editIndex].address= this.state.address,
        // this.state.getAllConsumer[this.state.editIndex].landmark= this.state.landmark,


        base_url.post('admin/provider-update', providerEdit, {
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
                    let success = "Provider is updates successfully"
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



    fetchcategory() {

        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'consumer/services/', {
                method: "POST",
                headers: {
                    'x-access-token': localStorage.getItem('token'),

                }
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        getAllCategory: res.Service,
                        loading: false,
                    });

                    for (let i = 0; i < res.Service.length; i++) {
                        desigNameArray.push(res.Service[i].category);
                        desigIdArray.push(res.Service[i].id);

                    }
                })
        })
    }

    fetchSubcategory(category_id) {

        fetch(envirionment.BASE_URL + 'admin/masters-subcategory/' + category_id, {
            method: "POST",
            headers: {
                // 'x-access-token': localStorage.getItem('token'),
                // 'x-access-db': localStorage.getItem('dbname')
            }
        }).then(res => res.json())
            .then(res => {
                console.log('state++' + JSON.stringify(res));
                this.setState({
                    getallsubcategory: res.subcategories
                });
            })
            .catch(error => console.log(error));

    }

    fetchChildSubcategory(sub_category_id) {

        fetch(envirionment.BASE_URL + 'admin/masters-childsubcategory/' + sub_category_id, {
            method: "POST",
            headers: {
                // 'x-access-token': localStorage.getItem('token'),
                // 'x-access-db': localStorage.getItem('dbname')
            }
        }).then(res => res.json())
            .then(res => {
                console.log('state++' + JSON.stringify(res));
                this.setState({
                    getallchildsubcategory: res.childsubcategories
                });
            })
            .catch(error => console.log(error));
    }




    fetchCity(state_id,country) {
        console.log('states-----'+state_id);
        console.log('country-----'+country);
        var country_id = this.state.country;
        fetch(envirionment.BASE_URL + 'admin/masters-city-list/' + state_id + '/' + country, {
            method: "POST",
            headers: {
                // 'x-access-token': localStorage.getItem('token'),
                // 'x-access-db': localStorage.getItem('dbname')
            }
        }).then(res => res.json())
            .then(res => {
                console.log('city' + JSON.stringify(res))
                this.setState({
                    getallcity: res.data
                });
            })
            .catch(error => console.log(error));

    }




    fetchProviders() {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'service/provider-list', {
            method: "POST",
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllProviderList: res.Providers
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

    fetchState(country_id) {

        fetch(envirionment.BASE_URL + 'admin/masters-state-list/' + country_id, {
            method: "POST",
            headers: {
                // 'x-access-token': localStorage.getItem('token'),
                // 'x-access-db': localStorage.getItem('dbname')
            }
        }).then(res => res.json())
            .then(res => {
                console.log('state' + JSON.stringify(res))
                this.setState({
                    getallstate: res.data
                });
            })
            .catch(error => console.log(error));

    }



    fetchCountry() {

        fetch(envirionment.BASE_URL + 'admin/master-country-list/', {
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


    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchProviders();
        this.fetchCountry();
        this.fetchState();
        this.fetchCity();
        this.fetchcategory();
        this.fetchSubcategory();
        this.fetchChildSubcategory();
    }




    render() {
        const { open, open1, open2, open3 } = this.state;

        const likePointer = { cursor: 'pointer', color: 'blue' };
        const delPointer = { cursor: 'pointer', color: 'red' };

        const tableHeadStyle = { fontWeight: 'bold', fontSize: '15px', color: 'black' };
        const tableBodyStyle = { fontSize: '12px' };
        const searchtextfieldHeight = {
            width: 350,
        };

        const formControl = {
            minWidth: 150,
            marginLeft: 15,
        };

        const datefieldHeight = {
            width: 280,
            height: 50,
            marginTop: 1,
            marginLeft: 4,
            marginRight: 4,
            resize: 'none',
        };

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
                        <Button style={{ fontWeight: 'bold' }} onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleAccept} color="secondary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={open3}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">{"Are sure , to delete the Provider ?"}</DialogTitle>
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


                <Dialog
                    open={open2}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">{"Are sure , Want to reject this service provider?"}</DialogTitle>
                    <DialogContent>

                    </DialogContent>
                    <DialogActions>
                        <Button style={{ fontWeight: 'bold' }} onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleReject} color="secondary" autoFocus>
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

                        <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <TextField style={formControl}
                                    label="Name:"
                                    value={(this.state.name)}
                                    margin="normal"
                                    name="name"
                                    onChange={(ev) => this.handleInputChangeValue(ev)}

                                />
                            </div>
                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <TextField style={formControl}
                                    label="Email:"
                                    value={(this.state.email)}
                                    margin="normal"
                                    name="email"
                                    onChange={(ev) => this.handleInputChangeValue(ev)}

                                />
                            </div>

                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <TextField style={formControl}
                                    label="Password:"
                                    value={(this.state.password)}
                                    margin="normal"
                                    name="password"
                                    onChange={(ev) => this.handleInputChangeValue(ev)}

                                />
                            </div>

                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <TextField style={formControl}
                                    label="Phone:"
                                    value={(this.state.phone)}
                                    margin="normal"
                                    name="phone"
                                    onChange={(ev) => this.handleInputChangeValue(ev)}

                                />
                            </div>
                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker style={datefieldHeight}
                                        margin="normal"
                                        id="birth_date"
                                        label="Birth Date"
                                        name="birth_date"
                                        format="dd/MM/yyyy"
                                        minDate={this.state.min_birth_date}
                                        maxDate={this.state.max_birth_date}
                                        value={this.state.birth_date}
                                        onChange={this.handleBirthDateChange}
                                        KeyboardButtonProps={{ 'aria-label': 'change date', }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <div id='6' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <FormControl style={formControl}>
                                    <InputLabel htmlFor="Country">Country</InputLabel>
                                    <Select
                                        value={this.state.country}
                                        onChange={(ev) => this.handleInputChangeValueCountry(ev)}
                                        inputProps={{
                                            name: 'country',
                                            id: 'country',
                                        }}
                                    >
                                        {this.state.getallcountry.map(module => (
                                            <MenuItem value={module.id}>{module.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>


                            <div id='7' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
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

                            
                            <div id='7' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <FormControl style={formControl}>
                                    <InputLabel htmlFor="State">City</InputLabel>
                                    <Select
                                        value={this.state.city}
                                        onChange={(ev) => this.handleInputChangeValueCity(ev)}
                                        inputProps={{
                                            name: 'city',
                                            id: 'city',
                                        }}
                                    >
                                        {this.state.getallcity.map(module => (
                                            <MenuItem value={module.id}>{module.city}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>

                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <TextField style={formControl}
                                    label="Address:"
                                    value={(this.state.address)}
                                    margin="normal"
                                    onChange={(ev) => this.handleInputChangeValue(ev)}

                                />
                            </div>

                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <TextField style={formControl}
                                    label="Postal Code:"
                                    value={(this.state.postalcode)}
                                    margin="normal"
                                    name="postalcode"
                                    onChange={(ev) => this.handleInputChangeValue(ev)}

                                />
                            </div>

                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <TextField style={formControl}
                                    label="Address:"
                                    value={(this.state.address)}
                                    margin="normal"
                                    onChange={(ev) => this.handleInputChangeValue(ev)}

                                />
                            </div>
                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <TextField style={formControl}
                                    label="Experience:"
                                    value={(this.state.experience)}
                                    margin="normal"
                                    name="experience"
                                    onChange={(ev) => this.handleInputChangeValue(ev)}

                                />
                            </div>
                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <TextField style={formControl}
                                    label="Salary:"
                                    value={(this.state.salary_hr)}
                                    margin="normal"
                                    name="salary_hr"
                                    onChange={(ev) => this.handleInputChangeValue(ev)}

                                />
                            </div>

                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <FormControl style={formControl}>
                                    <InputLabel htmlFor="Category">Category</InputLabel>
                                    <Select
                                        value={this.state.category}
                                        onChange={(ev) => this.handleInputChangeValueCategory(ev)}
                                        inputProps={{
                                            name: 'category',
                                            id: 'category',
                                        }}
                                    >
                                        {this.state.getAllCategory.map(module => (
                                            <MenuItem value={module.id}>{module.category}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>

                            <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                            <FormControl style={formControl}>
                                <InputLabel htmlFor="Category">SubCategory</InputLabel>
                                <Select
                                    value={this.state.subcategory}
                                   onChange={(ev) => this.handleInputChangeValueSubCategory(ev)}
                                    inputProps={{
                                        name: 'subcategory',
                                        id: 'subcategory',
                                    }}
                                >
                                    {this.state.getallsubcategory.map(module => (
                                        <MenuItem value={module.id}>{module.subcategory}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                          
                        </div>

                        <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                            <FormControl style={formControl}>
                                <InputLabel htmlFor="Category">Child SubCategory</InputLabel>
                                <Select
                                    value={this.state.childsubcategory}
                                   onChange={(ev) => this.handleInputChangeValueChildSubCategory(ev)}
                                    inputProps={{
                                        name: 'childsubcategory',
                                        id: 'childsubcategory',
                                    }}
                                >
                                    {this.state.getallchildsubcategory.map(module => (
                                        <MenuItem value={module.id}>{module.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                          
                        </div>


                            <DialogActions>
                                <Button onClick={this.handleClose} color="secondary">
                                    Cancel
                        </Button>
                                <Button style={{ fontWeight: 'bold' }} onClick={this.handleSubmit} color="primary">
                                    Edit
                        </Button>
                            </DialogActions>

                        </form>
                    </DialogContent>

                </Dialog>

                <div align="right">
                    <TextField style={searchtextfieldHeight}
                        label="Search"
                        id="searchBy"
                        name="searchBy"
                        value={this.state.searchBy}
                        onChange={this.handleInputChangeSearchValue.bind(this)}
                        onKeyDown={this._handleKeyDown}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon onClick={this.handleSearch.bind(this)} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHeadStyle}>Provider Name</TableCell>
                            <TableCell style={tableHeadStyle}>Provider Email</TableCell>
                            <TableCell style={tableHeadStyle}>Phone</TableCell>
                            <TableCell style={tableHeadStyle}>Status</TableCell>
                            <TableCell style={tableHeadStyle}>Accept</TableCell>
                            <TableCell style={tableHeadStyle}>View</TableCell>
                            <TableCell style={tableHeadStyle}>Delete</TableCell>


                        </TableRow>
                    </TableHead>
                    {this.state.getAllProviderListBySearch.length > 0 ?
                        <TableBody>

                            {this.state.getAllProviderListBySearch.length > 0 && this.state.getAllProviderListBySearch.map((unit, i) =>


                                <TableRow>
                                    <TableCell style={tableBodyStyle}>{unit.name}</TableCell>
                                    <TableCell style={tableBodyStyle}>{unit.email}</TableCell>
                                    <TableCell style={tableBodyStyle}>{unit.phone}</TableCell>
                                    {unit.is_verified === "unverified" ?
                                        <TableCell style={tableBodyStyle}>Pending</TableCell>
                                        : (unit.is_verified === "verified" ?
                                            <TableCell style={tableBodyStyle}>Approved</TableCell>
                                            :
                                            <TableCell style={tableBodyStyle}>Rejected</TableCell>
                                        )}
                                    {unit.is_verified === "unverified" ?
                                        <TableCell style={tableBodyStyle} ><a href="#" onClick={(e) => this.handleClickAccept(unit.id, i)}>Accept</a><br /><a href="#" onClick={(e) => this.handleClickReject(unit.id, i)}>Reject</a></TableCell>
                                        :
                                        <TableCell style={tableBodyStyle} >------</TableCell>
                                    }
                                    <TableCell><VisibilityIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickView(unit.id, unit.name, unit.email, unit.phone, unit.dob, unit.city, unit.state, unit.postal_code, unit.address, unit.experience, unit.salary_hr,unit.country, unit.service,unit.sub_category,unit.final_category, i)}></VisibilityIcon></TableCell>
                                    <TableCell><DeleteIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickDelete(unit.id, i)}></DeleteIcon></TableCell>
                                </TableRow>

                            )}
                        </TableBody>
                        :
                        [(this.state.getAllProviderList.length > 0 ?

                            <TableBody>

                                {this.state.getAllProviderList && this.state.getAllProviderList.map((unit, i) =>


                                    <TableRow>
                                        <TableCell style={tableBodyStyle}>{unit.name}</TableCell>
                                        <TableCell style={tableBodyStyle}>{unit.email}</TableCell>
                                        <TableCell style={tableBodyStyle}>{unit.phone}</TableCell>
                                        {unit.is_verified === "unverified" ?
                                            <TableCell style={tableBodyStyle}>Pending</TableCell>
                                            : (unit.is_verified === "verified" ?
                                                <TableCell style={tableBodyStyle}>Approved</TableCell>
                                                :
                                                <TableCell style={tableBodyStyle}>Rejected</TableCell>
                                            )}
                                        {unit.is_verified === "unverified" ?
                                            <TableCell style={tableBodyStyle} ><a href="#" onClick={(e) => this.handleClickAccept(unit.id, i)}>Accept</a><br /><a href="#" onClick={(e) => this.handleClickReject(unit.id, i)}>Reject</a></TableCell>
                                            :
                                            <TableCell style={tableBodyStyle} >------</TableCell>
                                        }
                                        <TableCell><VisibilityIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickView(unit.id, unit.name, unit.email, unit.phone, unit.dob, unit.city, unit.state, unit.postal_code, unit.address, unit.experience, unit.salary_hr, unit.country, unit.service,unit.sub_category,unit.final_category, i)}></VisibilityIcon></TableCell>
                                        <TableCell><DeleteIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickDelete(unit.id, i)}></DeleteIcon></TableCell>
                                    </TableRow>

                                )}
                            </TableBody> :
                            <h3>No List Found</h3>
                        )]
                    }
                </Table>
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