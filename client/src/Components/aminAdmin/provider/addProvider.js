import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { resetWarningCache } from 'prop-types';
import envirionment from '../../../common/utils/envirionment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import base_url from '../../../common/utils/axios';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ProviderList from './providerlist';

//import ListConsumer from './listConsumer';

mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}
var formData = null;
var desigNameArray = [];
var desigIdArray = [];

var stateNameArray = [];
var stateIdArray = [];
class AddProvider extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            country: '',
            city: '',
            state: '',
            postal_code: '',
            address: '',
            info:'',
            service: '',
            sub_category: '',
            subcategory:'',
            final_category: '',
            childsubcategory: '',
            salary_hr: '',
            profile_headline:'',
            getallcountry: [],
            getallstate: [],
            getAllCategory: [],
            getallsubcategory:[],
            getallchildsubcategory:[],
            getallcity:[],
            statename:'',
            birth_date: new Date(),
            min_birth_date: new Date(),
            max_birth_date: new Date(),
            showChild: true,
        }

        this.state.min_birth_date.setFullYear(this.state.birth_date.getFullYear() - 100);
        this.state.max_birth_date.setFullYear(this.state.birth_date.getFullYear() - 13);
        this.state.birth_date.setFullYear(this.state.birth_date.getFullYear() - 14);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBirthDateChange = this.handleBirthDateChange.bind(this);

    }

    componentDidMount() {
        this.fetchCountry();
        this.fetchcategory();
    }

    handleBirthDateChange(date) {
        this.setState({ birth_date: date })
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
        console.log('name---'+nam);
        this.fetchCity(val);
    }


    handleInputChangeValueCity(event,id){
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

    fetchSubcategory(category_id){
        
    fetch(envirionment.BASE_URL + 'admin/masters-subcategory/'+ category_id, {
        method: "POST",
        headers: {
            // 'x-access-token': localStorage.getItem('token'),
            // 'x-access-db': localStorage.getItem('dbname')
        }
    }).then(res => res.json())
        .then(res => {
            console.log('state++'+JSON.stringify(res));
            this.setState({
                getallsubcategory: res.subcategories
            });
        })
        .catch(error => console.log(error));
        
    }

    fetchChildSubcategory(sub_category_id){

        fetch(envirionment.BASE_URL + 'admin/masters-childsubcategory/'+ sub_category_id, {
            method: "POST",
            headers: {
                // 'x-access-token': localStorage.getItem('token'),
                // 'x-access-db': localStorage.getItem('dbname')
            }
        }).then(res => res.json())
            .then(res => {
                console.log('state++'+JSON.stringify(res));
                this.setState({
                    getallchildsubcategory: res.childsubcategories
                });
            })
            .catch(error => console.log(error));
    }

    fetchCountry(){
      
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


fetchState(country_id){
  
    fetch(envirionment.BASE_URL + 'admin/masters-state-list/'+ country_id, {
        method: "POST",
        headers: {
            // 'x-access-token': localStorage.getItem('token'),
            // 'x-access-db': localStorage.getItem('dbname')
        }
    }).then(res => res.json())
        .then(res => {
            console.log('state'+JSON.stringify(res))
            this.setState({
                getallstate: res.data
            });
        })
        .catch(error => console.log(error));
    
}

fetchCity(state_id){
   // console.log('states-----'+state_id);
    //console.log('states-----'+this.state.name);
    var country_id = this.state.name;
    fetch(envirionment.BASE_URL + 'admin/masters-city-list/'+ state_id +'/'+country_id, {
        method: "POST",
        headers: {
            // 'x-access-token': localStorage.getItem('token'),
            // 'x-access-db': localStorage.getItem('dbname')
        }
    }).then(res => res.json())
        .then(res => {
            console.log('city'+JSON.stringify(res))
            this.setState({
                getallcity: res.data
            });
        })
        .catch(error => console.log(error));
      
}


    reloadChild = () => {
        this.setState({
            showChild: false
        })

        setTimeout(() => {
            this.setState({
                showChild: true
            })
        }, 100);

        console.log("Reload Child Invoked")
    }

    checkEmail(event) {
        const validEmail = {
            email: this.state.email,
        }
        base_url.post('service/is_exits', validEmail, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    //swal("Plan is added successfully");
                    // let success = "Plan is added successfully"
                    // this.showAlert(success);
                }
                else {
                    showAlert(res.data.message);
                    this.setState({ email: '' });
                }
            })
            .catch(e => console.log(e))
    }

    handleInputChangeValue(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

    }

    handleSubmit(e) {
        e.preventDefault();

        const providerAdd = {
            name: this.state.fullname,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            address: this.state.address,
            country: this.state.name,
            state: this.state.statename,
            city: this.state.city,
            postal_code: this.state.postal_code,
            category: this.state.category,
            subcategory: this.state.subcategory,
            childsubcategory: this.state.childsubcategory,
            dob: this.state.birth_date,
            salary: this.state.salary,
            experience: this.state.experience

        }

        console.log('----Provider'+JSON.stringify(providerAdd));
        base_url.post('admin/add-provider', providerAdd, {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        }).then(res => {

            if (res.data.value == 1)
                showAlert("Provider is added successfully");
            else
                showAlert(res.data.message);
            this.reloadChild();
        })
            .catch(e => console.log(e))

        this.resetField();

    }

    resetField = () => {
        this.setState({ fullname: '' });
        this.setState({ email: '' });
        this.setState({ phone: '' });
        this.setState({ password: '' });
        this.setState({ address: '' });
        this.setState({ country: '' });
        this.setState({ statename: '' });
        this.setState({ city: '' });
        this.setState({ postal_code: '' });
        this.setState({ category: '' });
        this.setState({ subcategory: '' });
        this.setState({ salary: '' });
        this.setState({ childsubcategory: '' });
        this.setState({ experience: '' });

        this.state.birth_date = new Date();
        this.state.min_birth_date.setFullYear(this.state.birth_date.getFullYear() - 100);
        this.state.max_birth_date.setFullYear(this.state.birth_date.getFullYear() - 13);
        this.state.birth_date.setFullYear(this.state.birth_date.getFullYear() - 14);

    }

    checkMobile(event) {
        if (this.state.phone.length != 10) {
            showAlert('Please enter valid mobile number with 10 digit.');
        }
    }
    render() {

        const { open } = this.state;

        const stylesForm = {
            display: 'flex',
            flexWrap: 'wrap',
        };

        const stylesBotton = {
            marginTop: 20
        };

        const styles1 = {
            textAlign: 'center',
            paddingTop: '2',
        };

        const textfieldHeight = {
            width: 280,
            height: 50,
            marginLeft: 4,
            marginRight: 4,
            marginTop: 5,

            number:{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    "-webkit-appearance": "none",
                    margin: 0
                  }
            }   
            
        };

        const formControl = {
            minWidth: 150,
            marginLeft: 15,
        };

        

        const datefieldHeight = {
            width: 200,
            height: 50,
            marginTop: 1,
            marginLeft: 4,
            marginRight: 4,
            resize: 'none',
        };

        return (
            <div style={styles1}>
                <form className="reg" encType="multipart/form-data" onSubmit={this.handleSubmit} >
                    <div id='1' style={stylesForm}>
                        <div id='2'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="name"
                                label="Full Name"
                                name="fullname"
                                value={this.state.fullname}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />

                        </div>

                        <div id='3'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="email"
                                label="Email id"
                                type="email"
                                name="email"
                                onBlur={(ev) => this.checkEmail(ev)}
                                value={this.state.email}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />
                        </div>

                        <div id='4'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="phone"
                                label="Phone"
                                name="phone"
                                type="number"
                                value={this.state.phone}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                                onBlur={(ev) => this.checkMobile(ev)}
                            />
                        </div>

                        <div id='5'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                type="password"
                                id="password"
                                label="Password"
                                name="password"
                                value={this.state.password}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />
                        </div>

                        <div id='6' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
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

                        <div id='8'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="address"
                                label="Address"
                                name="address"
                                value={this.state.address}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />
                        </div>

                        <div id='9'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="postal_code"
                                label="postal_code"
                                name="postal_code"
                                type="number"
                                value={this.state.postal_code}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
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

                        
                        <div id='6'>
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

                        <div id='2'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="salary"
                                label="Salary"
                                name="salary"
                                type="number"
                                value={this.state.salary}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />

                        </div>

                        <div id='2'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="experience"
                                label="Experience"
                                name="experience"
                                type="number"
                                value={this.state.experience}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />

                        </div>
                        <br /><br />



                        <Button style={stylesBotton}
                            type="submit"
                            variant="contained"
                            color="primary"

                        >
                            Submit
                    </Button>
                        <br /><br />



                    </div>

                </form>
                {this.state.showChild ?
                    <ProviderList reloadChild={this.reloadChild} /> : null
                }

            </div>
        )

    }


}


AddProvider.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps)(AddProvider)