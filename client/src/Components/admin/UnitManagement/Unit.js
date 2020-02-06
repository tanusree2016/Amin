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
import UnitList from './UnitList';

mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}


class Unit extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            shortname: '',
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

    resetField = () => {
        this.setState({ name: '' });
        this.setState({ shortname: '' });
       
    }



    handleInputChangeValue(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.name == '' || this.state.shortname == '') {
            showAlert('Please Fill required feilds')
        }

        else {

            const unitAdd = {
                name: this.state.name,
                shortname: this.state.shortname,
                dbname: localStorage.getItem('dbname'),
            }
            console.log("DATA send --- "+JSON.stringify(unitAdd))
            // this.props.designationAdd(designationAdd, this.props.history);
            base_url.post('unit', unitAdd, {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'x-access-db': localStorage.getItem('dbname'),
                }
            })
                .then(res => {
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if (res.data.value == 1)
                        showAlert("Unit is added successfully");
                    else
                        showAlert(res.data.message);
                    this.reloadChild();
                })
                .catch(e => console.log(e))
        }
        this.resetField();
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
        };

        const formControl = {
            minWidth: 150,
            marginLeft: 15,
        };
        return (
            <div style={styles1}>
                <form className="reg" onSubmit={this.handleSubmit} >
                 <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px'}}>
                 <div id='2'>
                        <TextField style={textfieldHeight}
                            variant="outlined"
                            margin="dense"
                            required
                            id="name"
                            label="Unit Name"
                            name="name"
                            value={this.state.name}
                            onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                        />

                    </div>

                    <div id='3'>
                        <TextField style={textfieldHeight}
                            variant="outlined"
                            margin="dense"
                            required
                            id="shortname"
                            label="Short Name"
                            name="shortname"
                            value={this.state.shortname}
                            onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                        />
                    </div>

                    <Button style={stylesBotton}
                        type="submit"
                        variant="contained"
                        color="primary"
                    //className={classes.submit}
                    //onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                    <br /><br />
                    {this.state.showChild ?
          <UnitList reloadChild={this.reloadChild} /> : null
        }
                 </div>

                </form>

            </div>
        )

    }
}

Unit.propTypes = {
    classes: PropTypes.object.isRequired,
    unitAdd: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps)(Unit)