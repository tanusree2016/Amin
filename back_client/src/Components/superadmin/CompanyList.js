import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import envirionment from '../../common/utils/envirionment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { changeStatus } from '../superadmin/authentication';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import base_url from '../../common/utils/axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import EditIcon from '@material-ui/icons/Edit';

mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}

class CompanyList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            open1: false,
            companyName: '',
            email: '',
            contact: '',
            payment: '',
            getAllCompany: [],
            getCompanyPlans: [],
            getAllPlan: [],
            getVisiblePlan: [],
            getAllDiscount: [],
            options: [],
            primaryId: [],
            amount: 0,
            discountedamount: 0,
            discount: 0,
            selectedPackage: '',
            packageDiscount: 0,

            plan_duration: 0,
            companyid: '',
            status: '',
            editIndex: -1,
            delIndex: -1,
            loading: false, // will be true when ajax request is running
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectSubId = this.selectSubId.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    handleErrors(response) {
        if (!response.ok) throw Error(response.status);
        return response;
    }

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,

        });
    };

    handleClick(id, subdetail, index) {
        this.setState({
            open: true,
            companyid: id,
            editIndex: index,
        });
        console.log("Sub Details --- " + JSON.stringify(subdetail))
        for (let i = 0; i < subdetail.length; i++) {
            this.state.getVisiblePlan.push(subdetail[i]._id)
        }
        console.log("Visible --- " + JSON.stringify(this.state.getVisiblePlan))
        this.fetchVisiblePlan(this.state.getVisiblePlan);
        //this.fetchAllPlans(index);
        //this.fetchAllDiscount();
    };

    fetchVisiblePlan(allPlan) {
        console.log("All Plan --- " + allPlan)
        fetch(envirionment.BASE_URL + 'subwithoutid', {
            method: 'post',
            headers: {
                'x-access-token': localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sub_id: allPlan })
        }).then(res => res.json())
            .then(res => {
                console.log("Size --- " + JSON.stringify(res))
                this.setState({
                    getAllPlan: res.subscription
                });
                console.log("ALL PLAN --- " + JSON.stringify(this.state.getAllPlan))
                this.fetchAllDiscount();
            })
    }

    handleClickDelete(id, companystatus, index) {
        this.setState({
            open1: true,
            companyid: id,
            status: companystatus,
            delIndex: index,
        });

    }


    fetchAllCompany() {
        console.log("Calling --- Company " + envirionment.BASE_URL + 'company');
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'company', {
                method: "GET",
                headers: { 'x-access-token': localStorage.getItem('token') }
            })
                .then(this.handleErrors)
                .then(res => res.json())
                .then(res => {
                    console.log("Testing ... " + JSON.stringify(res.company[res.company.length - 1].subscriptionDetail[0].planName))
                    this.setState({
                        getAllCompany: res.company,
                        getCompanyPlans: res.company.subscriptionDetail,
                        loading: false,
                    });
                })

                .catch(error => console.log(error));
        })
        console.log("getAllCompany ---  " + JSON.stringify(this.state.getCompanyPlans));
        console.log("Calling --- End ---  ");
    }
    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllCompany();
    }

    // fetchAllPlans(pos) {
    //     fetch(envirionment.BASE_URL + 'subscription', {
    //         data: 'planName',
    //         data: 'price',
    //         data: 'subscriptionId',
    //         method: "GET",
    //         headers: { 'x-access-token': localStorage.getItem('token') }
    //     }).then(res => res.json())
    //         .then(res => {
    //             console.log("Size --- " + res.subscription.length);
    //             this.setState({
    //                 getAllPlan: res.subscription
    //             });
    //             console.log("Modules --- " + JSON.stringify(this.state.getAllCompany[pos].subscriptionDetail[0].planName) + " " + JSON.stringify(this.state.getAllPlan[0].planName))
    //             // for(let i=0;i<this.state.getAllPlan.length;i++)
    //             // {
    //             //     let flag=0;
    //             //     for(let j=0;j<this.state.getAllCompany[pos].subscriptionDetail.length;j++)
    //             //     {
    //             //         if(JSON.stringify(this.state.getAllPlan[i].planName)===JSON.stringify(this.state.getAllCompany[pos].subscriptionDetail[j].planName))
    //             //         {
    //             //             console.log("SAME --- "+JSON.stringify(this.state.getAllCompany[pos].subscriptionDetail[j].planName)+" "+JSON.stringify(this.state.getAllPlan[i].planName))
    //             //             flag=1;
    //             //         }
    //             //         else
    //             //         {
    //             //             console.log("NOT SAME --- "+JSON.stringify(this.state.getAllCompany[pos].subscriptionDetail[j].planName)+" "+JSON.stringify(this.state.getAllPlan[i].planName))
    //             //         }
    //             //     }
    //             //     if(flag==0)
    //             //     {
    //             //         this.state.getVisiblePlan.push(this.state.getAllPlan[i].planName)
    //             //     }
    //             // }
    //             // console.log("Visible Plan : "+JSON.stringify(this.state.getVisiblePlan))
    //         })
    // }

    fetchAllDiscount() {
        fetch(envirionment.BASE_URL + 'plan', {
            data: 'name',
            data: 'discount',
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                console.log("Size ---Discount " + res.plans.length);
                this.setState({
                    getAllDiscount: res.plans
                });
            })

        console.log("Discount --- " + this.state.getAllDiscount)
    }

    handleDelete(e) {
        e.preventDefault();
        let compStatus;
        if (this.state.status === 'active')
            compStatus = 'inactive'
        else
            compStatus = 'active'
        const changeStatus = {
            companyid: this.state.companyid,
            status: compStatus,
        }

        this.setState((prevState) => ({
            getAllCompany: prevState.getAllCompany.filter((_, i) => i !== this.state.delIndex)
        }));
        base_url.post('company-activate', changeStatus, {
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
        this.fetchAllCompany();
    }

    selectPackId(pakname, discount, e) {
        this.state.selectedPackage = pakname;
        this.state.packageDiscount = discount;

        console.log("Length --- " + this.state.selectedPackage.length);
        if (e.target.checked) {
            if (this.state.selectedPackage === "Quarterly") {
                this.setState({ discountedamount: (this.state.amount * 3) - ((parseInt(this.state.amount * 3) * parseInt(discount)) / 100) });
                this.setState({ plan_duration: 90 });
            }
            else if (this.state.selectedPackage === "Yearly") {
                this.setState({ discountedamount: (this.state.amount * 12) - (parseInt(this.state.amount * 12) * parseInt(discount)) / 100 });
                this.setState({ plan_duration: 365 });
            }
            else if (this.state.selectedPackage === "Monthly") {
                this.setState({ discountedamount: this.state.amount - (parseInt(this.state.amount) * parseInt(discount)) / 100 });
                this.setState({ plan_duration: 30 });
            }
            else if (this.state.selectedPackage === "HalfYearly") {
                this.setState({ discountedamount: (this.state.amount * 6) - (parseInt(this.state.amount * 6) * parseInt(discount)) / 100 });
                this.setState({ plan_duration: 180 });
            }

        } else {

            this.setState({ discountedamount: this.state.amount });
        }

        console.log("Selected value : " + this.state.options + " " + this.state.discountedamount);
    }

    selectSubId(subid, price, pid, e) {
        let index, indexid

        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            this.state.options.push(+e.target.value)
            this.state.primaryId.push(pid)
            console.log("Primary ID --- " + this.state.primaryId)
            this.state.amount = parseInt(this.state.amount) + parseInt(price);
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = this.state.options.indexOf(+e.target.value)
            indexid = this.state.primaryId.indexOf(pid)
            this.state.options.splice(index, 1)
            this.state.primaryId.splice(indexid, 1)
            this.state.amount = parseInt(this.state.amount) - parseInt(price);
        }
        // update the state with the new array of options
        this.setState({ options: this.state.options })
        this.setState({ primaryId: this.state.primaryId })

        console.log("Selected value : " + this.state.options + " " + this.state.amount);

        console.log("Selected Package Name : " + this.state.selectedPackage);
        if (this.state.selectedPackage === "Quarterly") {
            this.state.discountedamount = (this.state.amount * 3) - (parseInt(this.state.amount * 3) * parseInt(this.state.packageDiscount)) / 100;
            //this.setState({ discountedamount: (this.state.amount*3)-(parseInt(this.state.amount*3)*parseInt(this.state.packageDiscount))/100 });
            this.setState({ plan_duration: 90 });
        }
        else if (this.state.selectedPackage === "Yearly") {
            this.state.discountedamount = (this.state.amount * 12) - (parseInt(this.state.amount * 12) * parseInt(this.state.packageDiscount)) / 100;
            //this.setState({ discountedamount: (this.state.amount*12)-(parseInt(this.state.amount*12)*parseInt(this.state.packageDiscount))/100 });
            this.setState({ plan_duration: 365 });
        }
        else if (this.state.selectedPackage === "Monthly") {
            this.state.discountedamount = this.state.amount - (parseInt(this.state.amount) * parseInt(this.state.packageDiscount)) / 100;
            //this.setState({ discountedamount: this.state.amount-(parseInt(this.state.amount)*parseInt(this.state.packageDiscount))/100 });       
            this.setState({ plan_duration: 30 });
        }
        else if (this.state.selectedPackage === "HalfYearly") {
            this.state.discountedamount = (this.state.amount * 6) - (parseInt(this.state.amount * 6) * parseInt(this.state.packageDiscount)) / 100;
            //this.setState({ discountedamount: (this.state.amount*3)-(parseInt(this.state.amount*3)*parseInt(this.state.packageDiscount))/100 });
            this.setState({ plan_duration: 180 });
        }
        console.log("this.state.discountedamount : " + this.state.discountedamount);
    }

    handleSubmit(e) {
        e.preventDefault();

        let totpay;
        totpay = (this.state.discountedamount).toFixed();
        let subid;
        let subdet;
        subid = this.state.options
        subdet = this.state.primaryId
        const companyEdit = {

            companyid: this.state.companyid,
            new_subscription: subid,
            new_subscriptionDetail: subdet,
            totpay: totpay,
            plan_duration: this.state.plan_duration,
        }
        console.log("Total Pay --- " + totpay)
        //this.props.companyReg(companyReg, this.props.history);

        base_url.post('company-edit', companyEdit, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    //swal("Plan is added successfully");
                    let success = "Module upgrade is successful."
                    showAlert(success);
                }
                else
                    //swal(res.data.message);
                    showAlert(res.data.message);

                this.fetchAllCompany();
            })
            .catch(e => console.log(e))
        this.handleClose();
    }


    render() {

        const { loading } = this.state;

        const { open, open1 } = this.state;

        const likePointer = { cursor: 'pointer', color: 'blue' };
        const delPointer = { cursor: 'pointer', color: 'red' };

        const tableHeadStyle = { fontWeight: 'bold', fontSize: '15px', color: 'black' }
        const tableBodyStyle = { fontSize: '12px' }

        const stylesMargin = {
            marginTop: 3
        };

        const textfieldAmount = {
            width: 100,
            height: 40,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 2,
            marginBottom: 15,
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
                <div>

                    <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <DialogContentText>
                                Upgrade Plan
                        </DialogContentText>
                            <form>
                                <div>
                                    {this.state.getAllPlan && this.state.getAllPlan.map((plan, i) =>
                                        <FormControlLabel style={stylesMargin}
                                            control={
                                                <Checkbox
                                                    value={plan.subscriptionId}
                                                    color="primary"
                                                    onChange={(e) => this.selectSubId(plan.subscriptionId, plan.price, plan._id, e)}
                                                />
                                            }
                                            label={plan.planName + "(Monthly : \u20B9" + plan.price + " )"}
                                        />
                                    )}

                                </div>

                                <div>
                                    <FormControl component="fieldset" style={stylesMargin}>
                                        <RadioGroup aria-label="plan" name="plan" row>
                                            {this.state.getAllDiscount.map((plan, i) =>
                                                <FormControlLabel
                                                    control={
                                                        <Radio color="primary"
                                                            value={plan.name}
                                                            onChange={(e) => this.selectPackId(plan.name, plan.discount, e)}
                                                        />
                                                    }
                                                    label={plan.name + " ( " + plan.discount + "% Discount)"} />
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div>
                                    <TextField style={textfieldAmount}
                                        label="Amount:"
                                        value={"\u20B9" + (this.state.discountedamount)}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary">
                                Cancel
                        </Button>
                            <Button style={{ fontWeight: 'bold' }} onClick={this.handleSubmit} color="primary">
                                Upgrade
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={open1}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description" >
                        <DialogTitle id="alert-dialog-title">{"Are you sure to change the status?"}</DialogTitle>
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
                    {this.state.getAllCompany.length > 0 ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableHeadStyle}>Company name</TableCell>
                                    <TableCell style={tableHeadStyle}>Email</TableCell>
                                    <TableCell style={tableHeadStyle}>Contact</TableCell>
                                    <TableCell style={tableHeadStyle}>Modules</TableCell>
                                    <TableCell style={tableHeadStyle}>Payment( {"\u20B9"} )</TableCell>
                                    <TableCell style={tableHeadStyle}>Upgrade Module</TableCell>
                                    <TableCell style={tableHeadStyle}>Status</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.getAllCompany && this.state.getAllCompany.map((company, i) =>


                                    <TableRow>
                                        <TableCell style={tableBodyStyle}>{company.companyName}</TableCell>
                                        <TableCell style={tableBodyStyle}>{company.email}</TableCell>
                                        <TableCell style={tableBodyStyle}>{company.contact}</TableCell>
                                        <TableCell style={tableBodyStyle}>
                                            {this.state.getAllCompany[i].subscriptionDetail && this.state.getAllCompany[i].subscriptionDetail.map((plan, i) =>
                                                <p> {plan.planName} </p>
                                            )}
                                        </TableCell>
                                        <TableCell style={tableBodyStyle}>{company.payment}</TableCell>
                                        <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(company._id, this.state.getAllCompany[i].subscriptionDetail, i)} /></TableCell>
                                        <TableCell style={tableBodyStyle} onClick={(e) => this.handleClickDelete(company._id, company.status, i)} ><a href="#">{company.status}</a></TableCell>
                                    </TableRow>

                                )}
                            </TableBody></Table>
                        :
                        ''
                    }
                </div>
            )
        }
    }
}
CompanyList.propTypes = {
    auth: PropTypes.object.isRequired,
    changeStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { changeStatus })(CompanyList)