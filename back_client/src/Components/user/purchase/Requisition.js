import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { resetWarningCache } from 'prop-types';
import envirionment from '../../../common/utils/envirionment';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
// import { userAdd } from '../authentication';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import base_url from '../../../common/utils/axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import RequisitionList from './RequisitionList';
import OutlinedInput from "@material-ui/core/OutlinedInput";



mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}


const stylesForm = {
    display: 'flex',
    flexWrap: 'wrap',
};

const styles1 = {
    textAlign: 'center',
    paddingTop: '2',
};

const textfieldHeight = {
    width: 220,
    height: 50,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 7,
    resize: 'none',
};

const datefieldHeight = {
    width: 135,
    height: 50,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 5,
    resize: 'none',
};

const formControlSpinner = {
    minWidth: 220,
};


class Requisition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "Something",
            showChild: true,
            lineItems: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            getAllItem: [],
            needed_by_date: new Date(),
            min_needed_by_date: new Date(),
            labelWidth: 85,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNeededbydateChange = this.handleNeededbydateChange.bind(this);
        this.state.min_needed_by_date.setFullYear(this.state.needed_by_date.getFullYear());

    }

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllItem();
    }

    fetchAllItem() {
        console.log('hhh' + JSON.stringify(localStorage.getItem('subscription')))
        let subscription = localStorage.getItem('subscription');
        fetch(envirionment.BASE_URL + 'stock-list', {
            method: "GET",
            headers: {
                'x-access-db': localStorage.getItem('dbname')
            }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllItem: res.Stock
                });

                console.log('All Item --- ' + JSON.stringify(res.Stock))
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

    addItem() {
        this.setState(prevState => ({
            lineItems: [...prevState.lineItems, { item_name: "", item_description: "", purpose: "", no_of_items: "" }]
        }))
    }

    removeItem(i) {
        let values = [...this.state.lineItems];
        values.splice(i, 1);
        this.setState({ lineItems: values });
        //this.props.handlerfordata(this.state.lineItems);
    }

    handleInputChangeValue(i, e) {
        let nam = e ? e.target.name : e;
        let val = e ? e.target.value : e;
        console.log(nam, "::", val);
        this.setState({ [nam]: val });
        const { name, value } = e.target;
        let lineItems = [...this.state.lineItems];
        lineItems[i] = { ...lineItems[i], [name]: value };
        this.setState({ lineItems });
        console.log("Value to send --- " + JSON.stringify(this.state.lineItems))
    }

    handleInputChangeNumber(i, e) {

        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            const { name, value } = e.target;
            console.log("Testing ---" + name + ":" + value)
            let lineItems = [...this.state.lineItems];
            lineItems[i] = { ...lineItems[i], [name]: value };
            this.setState({ lineItems });
            console.log("Value to send --- " + JSON.stringify(this.state.lineItems))
        }
    }

    handleNeededbydateChange(date) {
        this.setState({ needed_by_date: date })
    }

    handleSubmit(id, e) {
        e.preventDefault();
        let c = 0;
        console.log("Clicked --- button --- " + id)
        let itemStatus;
        if (id === "201")
            itemStatus = "pending"
        if (id === "202")
            itemStatus = "submitted"
        const addRequisition = {
            requisitor: localStorage.getItem('id'),
            employee_id: localStorage.getItem('emp_id'),
            status: itemStatus,
            requisition: this.state.lineItems,
            needed_by_date: this.state.needed_by_date,
        }
        console.log("Line Items --- " + JSON.stringify(addRequisition) + " --- " + JSON.stringify(this.state.lineItems) + " --- " + JSON.stringify(this.state.lineItems.length));
        for (let i = 0; i < this.state.lineItems.length; i++) {
            if (this.state.lineItems[i].item_name.length == 0 || this.state.lineItems[i].item_description.length == 0 || this.state.lineItems[i].purpose.length == 0 || this.state.lineItems[i].no_of_items.length == 0) {
                c = 1;
                showAlert("All fields are mandatory");
                break;
            }
        }
        if (c == 0) {
            //this.props.addRequisition(addRequisition, this.props.history);
            base_url.post('purchase-requisition', addRequisition, {
                headers: {
                    'x-access-db': localStorage.getItem('dbname')
                }
            })
                .then(res => {
                    //this.resetField();
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if (res.data.value == 1) {
                        let success = "Requisition is added successfully"
                        showAlert(success);
                    }
                    else {
                        //swal(res.data.message);
                        showAlert(res.data.message);
                    }
                    this.reloadChild();
                })
                .catch(e => console.log(e))
        }
        this.resetField();
        // this.reloadChild();
    }

    resetField = () => {
        this.setState({ lineItems: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }] });
        this.setState({
            needed_by_date: new Date()
        })
        this.state.min_needed_by_date.setFullYear(this.state.needed_by_date.getFullYear());
    }

    handlerfordata = (data) => {
        console.log('Inside handlerfordata data is from grand parent');
        this.state.lineItems = data
        console.log("My Data --- " + JSON.stringify(this.state.lineItems));
        //this.props.handlerfordata(this.state.lineItems);
        this.reloadChild();
        this.resetField();
        this.forceUpdate();
    }

    createUI() {

        if (this.state.lineItems.length > 0) {
            return this.state.lineItems.map((el, i) => (
                <div key={i} >
                    <div style={{ paddingLeft: '35px' }, stylesForm}>
                        <div>
                            <FormControl variant="outlined" margin="dense" style={formControlSpinner}>
                                <InputLabel htmlFor="item_name">Item Name</InputLabel>
                                <Select style={{ height: "40px", minHeight: "40px", marginLeft: 4, marginRight: 4 }}

                                    labelId="demo-simple-select-outlined-label"
                                    value={el.item_name}
                                    onChange={this.handleInputChangeValue.bind(this, i)}
                                    labelWidth={this.state.labelWidth}
                                    inputProps={{
                                        name: 'item_name',
                                        id: 'item_name',
                                    }}
                                >
                                    {this.state.getAllItem.length > 0 && this.state.getAllItem.map(item => (
                                        <MenuItem value={item._id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div id='11'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                label="Item Description"
                                required
                                multiline={true}
                                rows={1}
                                rowsMax={1}
                                id="item_description"
                                name="item_description"
                                value={el.item_description}
                                onChange={this.handleInputChangeValue.bind(this, i)}
                            />
                        </div>
                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                label="Purpose"
                                required
                                multiline={true}
                                rows={1}
                                rowsMax={1}
                                id="purpose"
                                name="purpose"
                                value={el.purpose}
                                onChange={this.handleInputChangeValue.bind(this, i)}
                            />
                        </div>
                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                type="tel"
                                name="no_of_items"
                                label="No. Of Items"
                                id="no_of_items"
                                value={el.no_of_items}
                                onChange={this.handleInputChangeNumber.bind(this, i)}
                            // onBlur={(ev) => this.checkMobile(ev)}
                            />
                        </div>

                        <IconButton aria-label="delete" color="secondary" onClick={this.removeItem.bind(this, i)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            ))
        }
    }

    render() {

        return (
            <div>
                <form className="reg" noValidate style={{ styles1 }}>
                    <Typography variant="h5" gutterBottom paragraph>
                        Requisition Form &nbsp;
                    <Fab color="primary" size="small" aria-label="add" onClick={this.addItem.bind(this)} >
                            <AddIcon />
                        </Fab>
                    </Typography>
                    <br /><br />
                    {this.createUI()}

                    <br /><br /><br /><br />
                    <div>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker style={datefieldHeight}
                                margin="normal"
                                id="needed_by_date"
                                label="Needed by date"
                                name="needed_by_date"
                                format="dd/MM/yyyy"
                                minDate={this.state.min_needed_by_date}
                                value={this.state.needed_by_date}
                                onChange={this.handleNeededbydateChange}
                                KeyboardButtonProps={{ 'aria-label': 'change date', }}
                            />
                        </MuiPickersUtilsProvider>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <Button style={{ marginTop: 20 }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={e => this.handleSubmit("201", e)}>
                            Save and Exit
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button style={{ marginTop: 20 }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={e => this.handleSubmit("202", e)}>
                            Submit
                        </Button>


                    </div>
                </form>
                <br /> <br />
                {this.state.showChild ?
                    <RequisitionList reloadChild={this.reloadChild} handlerfordata={this.handlerfordata} /> : null
                    // : 
                    // <RequisitionList parentStateChange={this.parentStateChange} />
                }
            </div>
        );
    }
}

// AddUser.propTypes = {
//     classes: PropTypes.object.isRequired,
//     userAdd: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     auth: state.auth,
//     errors: state.errors
// });

//export default withStyles(styles)(Company);
// export default connect(mapStateToProps, { userAdd })(AddUser)
export default (Requisition)
