import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import base_url from '../../../common/utils/axios';
import VendorList from './VendorList';
import envirionment from '../../../common/utils/envirionment';

mobiscroll.settings = {
    theme: 'ios',
}
var unitArray = [];
class AddVendor extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            name: '',
            address: '',
            phone: '',
            email: '',
            showChild: true,
            
           
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }



    showAlert(text) {
        mobiscroll.alert({
            message: text,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.name == '') {
            this.showAlert('Please fill name')
        }
        else {
            const vendorCreateApi = {
                name: this.state.name,
                address: this.state.address,
                phone: this.state.phone,
                email: this.state.email
            }
            this.forceUpdate();

            base_url.post('vendor', vendorCreateApi, {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'x-access-db': localStorage.getItem('dbname')
                }
            })
                .then(res => {
                    this.resetField();
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if (res.data.value == 1) {
                        //swal("Plan is added successfully");
                        let success = "Vendor is added successfully"
                        this.showAlert(success);
                    }
                    else
                        //swal(res.data.message);
                        this.showAlert(res.data.message);

                    this.resetField();
                    this.reloadChild();
                })
                .catch(e => console.log(e))
        }
    }

    handleInputChangeValueUnit(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, "::", val);
        this.setState({ [nam]: val });
        // for (let i = 0; i < this.state.getAllunit.length; i++) {
        //     console.log("JSON.stringify(unitArray.pop(i) --- " + i + " " + JSON.stringify(unitArray.pop(i)) + " " + val)
        //     if (JSON.stringify(unitArray.pop(i)) == val) {
        //         console.log("entered");
        //         this.state.id = val;
        //     }
        // }
    }


   

    resetField = () => {
        this.setState({ name: '' });
        this.setState({ address: '' });
        this.setState({ phone: '' });
        this.setState({ email: '' });
    }
    render() {
        const { open } = this.state;

        const styles1 = {
            textAlign: 'center',
            paddingTop: '2',
        };

        const textfieldHeight = {
            width: 300,
            height: 50,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 2,
        };

        const formControl = {
            minWidth: 300,
        };
        return (


            <div style={styles1}>

                <Typography variant="h5" gutterBottom paragraph>
                    Add Vendor
                </Typography>

                <form className="reg" onSubmit={this.handleSubmit}>
                    <div>
                        <TextField style={textfieldHeight}
                            variant="outlined"
                            margin="dense"
                            required="true"
                            inputProps={{ "padding-top": '0', "padding-bottom": '0' }}
                            id="name"
                            label="Vendor Name"
                            name="name"
                            value={this.state.name}
                            onChange={(ev) => this.handleInputChangeValue(ev)}
                        />
                    </div>
                    <div>
                        <TextField style={textfieldHeight}
                            variant="outlined"
                            margin="dense"
                            required="true"
                            inputProps={{ "padding-top": '0', "padding-bottom": '0' }}
                            id="address"
                            label="Address"
                            name="address"
                            multiline={true}
                            rows={1}
                            rowsMax={1}
                           value={this.state.address}
                            onChange={(ev) => this.handleInputChangeValue(ev)}
                        />
                    </div>
                    <div>
                        <TextField style={textfieldHeight}
                            variant="outlined"
                            margin="dense"
                            required="true"
                            inputProps={{ "padding-top": '0', "padding-bottom": '0' }}
                            id="phone"
                            label="Phone"
                            name="phone"
                            type = "tel"
                           value={this.state.phone}
                            onChange={(ev) => this.handleInputChangeValue(ev)}
                        />
                    </div>
                    <div>
                        <TextField style={textfieldHeight}
                            variant="outlined"
                            margin="dense"
                            required="true"
                            inputProps={{ "padding-top": '0', "padding-bottom": '0' }}
                            id="email"
                            label="Email Id"
                            name="email"
                            type="email"
                           value={this.state.email}
                            onChange={(ev) => this.handleInputChangeValue(ev)}
                        />
                    </div>
                   
                    <br />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    //className={classes.submit}
                    // onClick={this.handleSubmit}
                    >
                        Submit
              </Button>
                </form>
                < br/> < br/>
                {this.state.showChild ?
          <VendorList reloadChild={this.reloadChild} /> : null
        }

            </div>


        )

    }

}

AddVendor.propTypes = {
    classes: PropTypes.object.isRequired,
    //planCreateApis: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(AddVendor)