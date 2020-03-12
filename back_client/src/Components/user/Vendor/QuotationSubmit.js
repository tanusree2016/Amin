import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import envirionment from '../../../common/utils/envirionment';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import base_url from '../../../common/utils/axios';



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

const textfieldHeight = {
    width: 220,
    height: 50,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 5,
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

const textareafieldHeight = {
    width: 220,
    height: 80,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    resize: 'none',
};


class QuotationSubmit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lineItemsRFQView: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            getAllRequisition: [],
            amount: 0,
            unit_price: 0,
            RFQhead: '',
            description: '',
            venderName: '',
            venderEmail: '',
            venderAddress: '',
            location: '',
            shipByDate: new Date(),
            needByDate: new Date(),
            minshipByDate: new Date(),
            minneedByDate: new Date(),
            total: 0,
            total_amount: 0,
            discount: 0,
            cgst_tax: 0,
            sgst_tax: 0,
            igst_tax: 0,
            vendor_list: '',
            vendor_name: [],
            vendor_id: [],
            selected_vendor: [],
            value: ['coconut'],
            message: '',
            lastSegment: '',
            getAllRequisitionValue: [],
            getAllVendorDetails: [],
            needByDate: '',
            req_id: '',
            pur_id: '',
            ven_id: '',
            val_amount: [],
            loading: false, // will be true when ajax request is running
            submitted: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNeededbydateChange = this.handleNeededbydateChange.bind(this);
        this.handleShipdbydateChange = this.handleShipdbydateChange.bind(this);
        this.state.minshipByDate.setFullYear(this.state.shipByDate.getFullYear());
        this.state.minneedByDate.setFullYear(this.state.shipByDate.getFullYear());
    }

    handleChange(event) {
        //this.setState({value: event.option});
        this.setState({ value: Array.from(event.target.selectedOptions, (item) => item.value) });
    }

    handleClose = () => {
        this.setState({
            lineItemsRFQView: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            selected_vendor: [],
            total: 0,
            total_amount: 0,
            discount: 0,
            cgst_tax: 0,
            sgst_tax: 0,
            igst_tax: 0,
            unit_price:0
        });
    };

    fetchRFQDetails() {
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'rfq-vendor', {
                method: 'post',
                headers: {
                    'x-access-db': localStorage.getItem('dbname'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ encrypt: this.state.lastSegment })
            }).then(res => res.json())
                .then(res => {
                    console.log("DATA --- " + JSON.stringify(res) + " --- " + JSON.stringify(res.value));

                    if (res.value == 1) {
                        this.setState({
                            message: res.message,
                            getAllRequisition: res.requisition_value,
                            getAllRequisitionValue: res.requisition_value,
                            getAllVendorDetails: res.vendor_details,
                            loading: false,
                        });
                        console.log("res.message --- " + JSON.stringify(res.message) + " --- " + res.message.length)
                        console.log("res.requisition_value.rfq_head --- " + JSON.stringify(res.requisition_value.rfq_head))
                        this.state.req_id = res.requisition_value.requisition_id._id;
                        this.state.pur_id = res.requisition_value._id;
                        this.state.ven_id = res.vendor_details._id;
                        this.state.RFQhead = res.requisition_value.rfq_head;
                        this.state.description = res.requisition_value.rfq_description;
                        this.state.venderName = res.vendor_details.name;
                        this.state.venderEmail = res.vendor_details.email;
                        this.state.venderAddress = res.vendor_details.address;
                        this.state.location = res.requisition_value.ship_to_location;

                        Moment.locale('en');

                        this.state.needByDate = Moment(res.requisition_value.need_by_date).format("DD/MM/YYYY")
                        //this.state.needByDate=new Date(res.requisition_value.need_by_date).toLocaleDateString([],"dd//yyyy");
                        for (let i = 0; i < this.state.getAllRequisition.children.length; i++) {
                            console.log("Value Comming --- " + JSON.stringify(this.state.getAllRequisition.children) + " --- " + JSON.stringify(this.state.getAllRequisition.children[i].item_name.name))
                            this.state.lineItemsRFQView.push({ item_id: this.state.getAllRequisition.children[i].item_name._id, item_name: this.state.getAllRequisition.children[i].item_name.name, item_description: this.state.getAllRequisition.children[i].item_description, purpose: this.state.getAllRequisition.children[i].purpose, no_of_items: this.state.getAllRequisition.children[i].no_of_items })
                            //this.state.lineItemsRFQView.push({ item_id: this.state.getAllRequisition.children[i]._id, item_name: this.state.getAllRequisition.children[i].item_name, item_description: this.state.getAllRequisition.children[i].item_description, purpose: this.state.getAllRequisition.children[i].purpose, no_of_items: parseInt(this.state.getAllRequisition.children[i].no_of_items)})
                        }
                        const newList = this.state.lineItemsRFQView.splice(0, 1);
                        this.forceUpdate();
                    }
                    else
                        showAlert("Something went wrong.");
                })
                .catch(err => {
                });
        });
    }


    componentDidMount() {
        var parts = window.location.href.split('/');
        this.state.lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash
        console.log("lastSegment --- " + this.state.lastSegment);
        console.log("Child calling ------ ");
        this.fetchRFQDetails();
    }

    handleInputChangeValue(i, e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let nam = e ? e.target.name : e;
            let val = e ? e.target.value : e;
            console.log(nam, ":", val);
            this.setState({ [nam]: val });

            const { name, value } = e.target;
            let lineItemsRFQView = [...this.state.lineItemsRFQView];
            lineItemsRFQView[i] = { ...lineItemsRFQView[i], [name]: value };

            this.state.amount = parseFloat(lineItemsRFQView[i].no_of_items) * parseFloat(val)
            console.log("Test Val --- " + this.state.amount)
            lineItemsRFQView[i] = { ...lineItemsRFQView[i], ["amount"]: this.state.amount };

            this.setState({ lineItemsRFQView });


            let val_amount = [...this.state.val_amount];
            val_amount[i] = { ...val_amount[i], ["amount"]: this.state.amount };
            this.setState({ val_amount });

            let val_amt = 0;

            for (let i = 0; i < val_amount.length; i++) {
                console.log("Price --- " + JSON.stringify(val_amount[i]))
                val_amt += parseFloat(val_amount[i].amount)
                console.log("Price Amount --- " + val_amt)
            }
            
            this.state.total_amount=parseFloat(val_amt)
            let total_amt= this.state.total_amount

            if(!isNaN(total_amt)){
                total_amt = total_amt - total_amt*parseFloat(this.state.discount/100)
                console.log("total_amt ---after discount ---- "+total_amt)
                total_amt = total_amt + total_amt*parseFloat(this.state.cgst_tax/100)
                console.log("total_amt ---after cgst ---- "+total_amt)
                total_amt = total_amt + total_amt*parseFloat(this.state.sgst_tax/100)
                console.log("total_amt ---after sgst ---- "+total_amt)
                total_amt = total_amt + total_amt*parseFloat(this.state.igst_tax/100)
                console.log("total_amt ---after igst ---- "+total_amt)
                this.state.total = parseFloat(total_amt)
            }
            else{
                this.state.total = 0
            }
        }
    }

    handleDiscountChangeValue(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let nam = e ? e.target.name : e;
            let val = e ? e.target.value : e;
            console.log(nam, ":", val);
            this.setState({ [nam]: val });
            let total_amt=this.state.total_amount
            if (!isNaN(parseFloat(val))) {
                //this.state.total = parseFloat(this.state.total) - parseFloat(this.state.total)*(parseFloat(val)/100)
                total_amt = total_amt - total_amt*parseFloat(parseFloat(val)/100)
                total_amt = total_amt + total_amt*parseFloat(this.state.cgst_tax/100)
                total_amt = total_amt + total_amt*parseFloat(this.state.sgst_tax/100)
                total_amt = total_amt + total_amt*parseFloat(this.state.igst_tax/100)
                this.state.total = parseFloat(total_amt)
            }
            else{
                val = 0
                total_amt = total_amt - total_amt*parseFloat(parseFloat(val)/100)
                total_amt = total_amt + total_amt*parseFloat(this.state.cgst_tax/100)
                total_amt = total_amt + total_amt*parseFloat(this.state.sgst_tax/100)
                total_amt = total_amt + total_amt*parseFloat(this.state.igst_tax/100)
                this.state.total = parseFloat(total_amt)
            }
        }
    }

    handleInputChangeCGSTTax(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let nam = e ? e.target.name : e;
            let val = e ? e.target.value : e;
            console.log(nam, ":", val);
            this.setState({ [nam]: val });
            
            let total_amt=this.state.total_amount
            if (!isNaN(parseFloat(val))) {
                //this.state.total = parseFloat(this.state.total) - parseFloat(this.state.total)*(parseFloat(val)/100)
                total_amt = total_amt - total_amt*parseFloat(parseFloat(this.state.discount)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(val)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(this.state.sgst_tax)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(this.state.igst_tax)/100)
                this.state.total = parseFloat(total_amt)
            }
            else{
                val = 0
                total_amt = total_amt - total_amt*parseFloat(parseFloat(this.state.discount)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(val)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(this.state.sgst_tax)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(this.state.igst_tax)/100)
                this.state.total = parseFloat(total_amt)
            }
        }
    }

    handleInputChangeSGSTTax(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let nam = e ? e.target.name : e;
            let val = e ? e.target.value : e;
            console.log(nam, ":", val);
            this.setState({ [nam]: val });
            
            let total_amt=this.state.total_amount
            if (!isNaN(parseFloat(val))) {
                //this.state.total = parseFloat(this.state.total) - parseFloat(this.state.total)*(parseFloat(val)/100)
                total_amt = total_amt - total_amt*parseFloat(parseFloat(this.state.discount)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(this.state.cgst_tax)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(val)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(this.state.igst_tax)/100)
                this.state.total = parseFloat(total_amt)
            }
            else{
                val = 0
                total_amt = total_amt - total_amt*parseFloat(parseFloat(this.state.discount)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(this.state.cgst_tax)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(val)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(this.state.igst_tax)/100)
                this.state.total = parseFloat(total_amt)
            }
        }
    }

    handleInputChangeIGSTTax(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let nam = e ? e.target.name : e;
            let val = e ? e.target.value : e;
            console.log(nam, ":", val);
            this.setState({ [nam]: val });
            
            let total_amt=this.state.total_amount
            if (!isNaN(parseFloat(val))) {
                //this.state.total = parseFloat(this.state.total) - parseFloat(this.state.total)*(parseFloat(val)/100)
                total_amt = total_amt - total_amt*parseFloat(parseFloat(this.state.discount)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(this.state.cgst_tax)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(this.state.sgst_tax)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(val)/100)
                this.state.total = parseFloat(total_amt)
            }
            else{
                val = 0
                total_amt = total_amt - total_amt*parseFloat(parseFloat(this.state.discount)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(this.state.cgst_tax)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(this.state.sgst_tax)/100)
                total_amt = total_amt + total_amt*parseFloat(parseFloat(val)/100)
                this.state.total = parseFloat(total_amt)
            }
        }
    }

    handleNeededbydateChange(date) {
        this.setState({ needByDate: date })
    }

    handleShipdbydateChange(date) {
        this.setState({ shipByDate: date })
    }

    createUIRFQ() {
        if (this.state.lineItemsRFQView.length > 0) {
            return this.state.lineItemsRFQView.map((el, i) => (
                <div key={i} >
                    <div style={{ paddingLeft: '35px' }, stylesForm}>

                        <div style={{ border: '2px solid blue', display: 'flex', flexWrap: 'wrap', padding: "20px" }}>
                            <div>
                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    name="item_name"
                                    label="item_name"
                                    value={el.item_name}
                                    InputProps={{
                                        disabled: true,
                                    }}
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
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                            </div>

                            <div>
                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    type="tel"
                                    name="unit_price"
                                    label={"Price Per Unit (\u20B9)"}
                                    id="unit_price"
                                    value={this.state.submitted==false ? el.unit_price: ''}
                                    onChange={this.handleInputChangeValue.bind(this, i)}
                                />

                            </div>

                            <div>
                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    type="tel"
                                    name="amount"
                                    label={"Amount (\u20B9)"}
                                    id="amount"
                                    value={ isNaN(parseFloat(el.unit_price)) ? 0 : parseFloat(el.no_of_items) * parseFloat(el.unit_price) }
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.state.submitted=true
        const submitRFQ = {
            requisition_id: this.state.req_id,
            purchase_id: this.state.pur_id,
            vendor_id: this.state.ven_id,
            total_price: this.state.total,
            tax: this.state.tax,
            discount: this.state.discount,
            cgst_tax:this.state.cgst_tax,
            sgst_tax:this.state.sgst_tax,
            igst_tax:this.state.igst_tax,
            price_valid: this.state.shipByDate,
            children: this.state.lineItemsRFQView,
        }
        console.log("Values Send --- " + JSON.stringify(submitRFQ))
        base_url.post('rfq-vendor-submission', submitRFQ, {
            headers: {
                'x-access-db': localStorage.getItem('dbname')
            }
        })
            .then(res => {
                //this.resetField();
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    let success = "Quotation is submitted successfully"
                    showAlert(success);
                    document.getElementById("btnSub").style.display = 'none'
                }
                else {
                    //swal(res.data.message);
                    showAlert(res.data.message);
                }
            })
            .catch(e => console.log("Test --- "+e))

        this.handleClose();
    }

    render() {

        const { loading } = this.state;

        const { open, open1, open2 } = this.state;

        const likePointer = { cursor: 'pointer', color: 'blue' };

        const formControl = {
            minWidth: 150,
        };

        const btn_left = {
            marginLeft: "150px",
            marginRight: "50px",
        }

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
                <div>
                    {!this.state.message.length > 0 ?
                        (<form autocomplete="off">
                            <div>
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="RFQhead"
                                    label="Head"
                                    id="RFQhead"
                                    fullWidth
                                    value={this.state.RFQhead}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="description"
                                    label="Description"
                                    id="description"
                                    multiline={true}
                                    rows={5}
                                    rowsMax={5}
                                    fullWidth
                                    value={this.state.description}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="venderName"
                                    label="Vender Name"
                                    id="venderName"
                                    fullWidth
                                    value={this.state.venderName}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="venderEmail"
                                    label="Vender Email"
                                    id="venderEmail"
                                    fullWidth
                                    value={this.state.venderEmail}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="venderAddress"
                                    label="Vender Address"
                                    id="venderAddress"
                                    multiline={true}
                                    rows={1}
                                    rowsMax={1}
                                    fullWidth
                                    value={this.state.venderAddress}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                            </div>
                            <br /><br /><br />
                            {this.createUIRFQ()}
                            <br /><br />
                            <div>
                                <TextField style={textareafieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="location"
                                    label="Ship To Location"
                                    id="location"
                                    value={this.state.location}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />

                                <TextField style={textareafieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    type="tel"
                                    name="cgst_tax"
                                    label="CGST (%)"
                                    id="cgst_tax"
                                    value={this.state.cgst_tax}
                                    onChange={this.handleInputChangeCGSTTax.bind(this)}
                                />

                                <TextField style={textareafieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    type="tel"
                                    name="sgst_tax"
                                    label="SGST (%)"
                                    id="sgst_tax"
                                    value={this.state.sgst_tax}
                                    onChange={this.handleInputChangeSGSTTax.bind(this)}
                                />

                                <TextField style={textareafieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    type="tel"
                                    name="igst_tax"
                                    label="IGST (%)"
                                    id="igst_tax"
                                    value={this.state.igst_tax}
                                    onChange={this.handleInputChangeIGSTTax.bind(this)}
                                />

                                <TextField style={textareafieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    type="tel"
                                    name="discount"
                                    label="Discount (%)"
                                    id="discount"
                                    value={this.state.discount}
                                    onChange={this.handleDiscountChangeValue.bind(this)}
                                />

                                <TextField style={textareafieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    type="tel"
                                    name="total"
                                    label={"Total Amount (\u20B9)"}
                                    id="total"
                                    value={this.state.total}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                            </div>

                            <div>
                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="needByDate"
                                    label="Need By Date"
                                    id="needByDate"
                                    value={this.state.needByDate}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker style={datefieldHeight}
                                        margin="dense"
                                        id="shipByDate"
                                        label="Ship By Date"
                                        name="shipByDate"
                                        format="dd/MM/yyyy"
                                        minDate={this.state.minshipByDate}
                                        value={this.state.shipByDate}
                                        onChange={this.handleShipdbydateChange}
                                        KeyboardButtonProps={{ 'aria-label': 'change date', }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <br /><br /><br />
                            <div>
                                <Button style={btn_left}
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.handleClose} >
                                    Cancel
                        </Button>
                                &nbsp;&nbsp;&nbsp;
                        <Button
                                    id="btnSub"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSubmit} >
                                    Send
                        </Button>
                            </div>
                        </form>)
                        :
                        (<h1>{this.state.message}</h1>)
                    }
                </div>
            )
        }
    }

}

QuotationSubmit.propTypes = {
    auth: PropTypes.object.isRequired,
    //editDesignation: PropTypes.func.isRequired,
    //requisitionDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(QuotationSubmit)
