import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { resetWarningCache } from 'prop-types';
import envirionment from '../../../common/utils/envirionment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import base_url from '../../../common/utils/axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import ListLocation from './listLocation';


mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}

var desigNameArray = [];
var desigIdArray = [];
class AddLocation extends Component {

    constructor() {
        super();
        this.state = {
            country_id: '',
            state_id: '',
            city:'',
            name:'',
            statename:'',
            getallcountry: [],
            getallstate: [],
            showchild: true,
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchCountry();
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

   

    handleSubmit(e) {
        e.preventDefault();
        console.log('aaaa'+this.state.city)
        const locationAdd = {
            country_id: this.state.name,
            state_id: this.state.statename,
            city: this.state.city,
        }

        base_url.post('admin/master-location', locationAdd, {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
            .then(res => {
              
                if (res.data.value == 1)
                    showAlert("Location is added successfully");
                else
                    showAlert(res.data.message);
                this.reloadChild();
            })
            .catch(e => console.log(e))
    
    this.resetField();

        console.log('-----states'+JSON.stringify(locationAdd));
    }

    
        
    resetField = () => {
        this.setState({ name: '' });
        this.setState({ statename: '' });
        this.setState({ city: '' });
       
    }

    render() {
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
        };

        const formControl = {
            minWidth: 150,
            marginLeft: 15,
        };

        const centerLoad = {
            margin: 'auto',
            width: '50%',
            maxWidth: 400,
            minWidth: 150,
            position: 'absolute',
            top: '50%',
            left: '50%',
            fontsize: 100,
        }

        if (this.state.loading) {
            return (
                <div style={centerLoad}>
                    <i className="fa fa-cog fa-spin" />
                </div>
            );
        }
        else {
            return (
                <div style={styles1}>
                    <form className="reg" onSubmit={this.handleSubmit} >
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
                        <br />
                        <div id='2' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                            <FormControl style={formControl}>
                                <InputLabel htmlFor="State">State</InputLabel>
                                <Select
                                    value={this.state.statename}
                                    onChange={(ev) => this.handleInputChangeValueState(ev)}
                                    inputProps={{
                                        name: 'name',
                                        id: 'name',
                                    }}
                                >
                                    {this.state.getallstate.map(module => (
                                        <MenuItem value={module.id}>{module.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </div>
                        <br />
                        <div id='3'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="city"
                                label="City"
                                name="city"
                                value={this.state.city}
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />

                        </div>

                        <Button style={stylesBotton}
                            type="submit"
                            variant="contained"
                            color="primary">
                            Submit
                    </Button>
                    </form>

                    <br /><br />
                    <ListLocation reloadChild={this.reloadChild} />
                   {/* {this.state.showChild ?
                       <ListLocation reloadChild={this.reloadChild} /> : null
                   } */}
                </div>

            )

        }

    }



}

AddLocation.propTypes = {
    classes: PropTypes.object.isRequired,
    //designationAdd: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps)(AddLocation)