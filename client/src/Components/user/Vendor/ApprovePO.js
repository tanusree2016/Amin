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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';


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

const rejectfieldHeight = {
    width: 420,
    height: 80,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
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


class ApprovePO extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lineItemsRFQView: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "", unit_price: "", amount: "" }],
            getAllRequisition: [],
            rfq_details: [],
            amount: 0,
            unit_price: 0,
            RFQhead: '',
            description: '',
            venderName: '',
            venderEmail: '',
            venderAddress: '',
            location: '',
            shipByDate: new Date(),
            //needByDate: new Date(),
            minshipByDate: new Date(),
            minneedByDate: new Date(),
            total: 0,
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
            shipByDate: '',
            req_id: '',
            pur_id: '',
            ven_id: '',
            val_amount: [],
            open: false,
            reject_note_vendor: '',
            loading: false, // will be true when ajax request is running

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.proceedReject = this.proceedReject.bind(this);
    }

    handleInputChangeValueReject(e) {
        let nam = e ? e.target.name : e;
        let val = e ? e.target.value : e;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
        console.log("Change Calling --- ")
    }
    handleClose = () => {
        this.setState({
            lineItemsRFQView: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "", unit_price: "", amount: "" }],
            selected_vendor: [],
            open: false,
        });
    };

    fetchRFQDetails() {
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'rfq-vendor-po', {
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
                            getAllRequisition: res.rfq,
                            getAllRequisitionValue: res.requisition_value,
                            getAllVendorDetails: res.vendor_details,
                            rfq_details: res.rfq,
                            loading: false,
                        });
                        console.log("res.message --- " + JSON.stringify(res.message) + " --- " + res.message.length)
                        console.log("res.requisition_value.rfq_head --- " + JSON.stringify(res.requisition_value.rfq_head))
                        this.state.req_id = res.rfqs_id;
                        this.state.pur_id = res.requisition_value._id;
                        this.state.ven_id = res.vendor_details._id;
                        this.state.RFQhead = res.requisition_value.rfq_head;
                        this.state.description = res.requisition_value.rfq_description;
                        this.state.venderName = res.vendor_details.name;
                        this.state.venderEmail = res.vendor_details.email;
                        this.state.venderAddress = res.vendor_details.address;
                        this.state.location = res.requisition_value.ship_to_location;
                        this.state.cgst_tax = res.rfq.cgst_tax;
                        this.state.sgst_tax = res.rfq.sgst_tax;
                        this.state.igst_tax = res.rfq.igst_tax;
                        this.state.discount = res.rfq.Discount;
                        this.state.total = res.rfq.total_price;

                        Moment.locale('en');

                        this.state.needByDate = Moment(res.requisition_value.requisition_id.needed_by_date).format("DD/MM/YYYY")
                        this.state.shipByDate = Moment(res.rfq.price_valid).format("DD/MM/YYYY")

                        for (let i = 0; i < this.state.getAllRequisition.po_children.length; i++) {
                            console.log("Value Comming --- " + JSON.stringify(this.state.getAllRequisition.po_children) + " --- " + JSON.stringify(this.state.getAllRequisition.po_children[i].item_name.name))
                            this.state.lineItemsRFQView.push({ item_id: this.state.getAllRequisition.po_children[i].item_name._id, item_name: this.state.getAllRequisition.po_children[i].item_name.name, item_description: this.state.getAllRequisition.po_children[i].item_description, purpose: this.state.getAllRequisition.po_children[i].purpose, no_of_items: this.state.getAllRequisition.po_children[i].no_of_items, unit_price: this.state.getAllRequisition.po_children[i].unit_price, amount: this.state.getAllRequisition.po_children[i].amount })
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
                                    value={el.unit_price}
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
                                    name="amount"
                                    label={"Amount (\u20B9)"}
                                    id="amount"
                                    value={parseFloat(el.no_of_items) * parseFloat(el.unit_price)}
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

        const orderAccept = {
            rfq_id: this.state.req_id,
        }
        console.log("Values Send --- " + JSON.stringify(orderAccept))
        base_url.post('accept-order', orderAccept, {
            headers: {
                'x-access-db': localStorage.getItem('dbname')
            }
        })
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    showAlert(res.data.message);
                    document.getElementById("btnSub").style.display = 'none'
                    document.getElementById("btnRej").style.display = 'none'
                }
                else {
                    showAlert(res.data.message);
                }
            })
            .catch(e => console.log(e))

        this.handleClose();
    }

    proceedReject(e) {
        console.log("Clicked");
        this.setState({
            open: true,
        })
        this.state.open = true;
    }

    handleReject(e) {
        e.preventDefault();

        const orderReject = {
            rfq_id: this.state.req_id,
            reject_note_vendor: this.state.reject_note_vendor,
        }
        console.log("Values Send --- " + JSON.stringify(orderReject))
        base_url.post('reject-order', orderReject, {
            headers: {
                'x-access-db': localStorage.getItem('dbname')
            }
        })
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    showAlert(res.data.message);
                    document.getElementById("btnSub").style.display = 'none'
                    document.getElementById("btnRej").style.display = 'none'
                }
                else {
                    showAlert(res.data.message);
                }
            })
            .catch(e => console.log(e))

        this.handleClose();
    }

    render() {

        const { loading } = this.state;

        const { open } = this.state;

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
                    <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title-text">
                        <DialogTitle id="form-dialog-title-text">Note </DialogTitle>
                        <DialogContent>
                            <div>
                                <TextField style={rejectfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    label="Reject Note"
                                    multiline={true}
                                    rows={3}
                                    rowsMax={3}
                                    name="reject_note_vendor"
                                    value={this.state.reject_note_vendor}
                                    onChange={this.handleInputChangeValueReject.bind(this)}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button style={{ fontWeight: 'bold' }} onClick={e => this.handleReject(e)} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {!this.state.message.length > 0 ?
                        (<form>
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
                                    InputProps={{
                                        disabled: true,
                                    }}
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
                                    InputProps={{
                                        disabled: true,
                                    }}
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
                                    InputProps={{
                                        disabled: true,
                                    }}
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
                                    InputProps={{
                                        disabled: true,
                                    }}
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

                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="shipByDate"
                                    label="Ship By Date"
                                    id="shipByDate"
                                    value={this.state.shipByDate}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                            </div>
                            <br /><br /><br />
                            <div>
                                <Button style={btn_left}
                                    id="btnSub"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSubmit} >
                                    Accept
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    id="btnRej"
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.proceedReject} >
                                    Reject
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

ApprovePO.propTypes = {
    auth: PropTypes.object.isRequired,
    //editDesignation: PropTypes.func.isRequired,
    //requisitionDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(ApprovePO)
