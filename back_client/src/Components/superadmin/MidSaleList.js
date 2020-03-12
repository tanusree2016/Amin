import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import envirionment from '../../common/utils/envirionment';



var planArray = [];
class MidSaleList extends Component {

    constructor(props) {
        super(props);
        this.state = {

            planName: '',
            price: '',
            duedate: '',
            subscriptions: [],
            getAllPlan: [],
            plans: [],
            price: [],
            customer:'',
            description:'',
        };

       
    }

    fetchAllPlans() {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'midsale-list', {
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                console.log("Size --- " + res.midsale.length);
                this.setState({
                    getAllPlan: res.midsale
                });
                for (let i = 0; i < res.midsale.length; i++) {
                    planArray.push(res.midsale[i].description);
                    //this.setState({ plans: res.subscription[i].planName })
                    this.setState({ id: res.midsale[i].midsaleId })
                    this.setState({ price: res.midsale[i].description })
                }
                console.log('array' + planArray);
                this.setState({ plans: planArray })

                console.log("Plan Names --- " + this.state.getAllPlan);
            })
            console.log("Calling --- End ---  ");
    }
    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllPlans();
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.auth.isAuthenticated) {
    //         this.props.history.push('/')
    //     }
    //     if (nextProps.errors) {
    //         this.setState({
    //             errors: nextProps.errors
    //         });
    //     }
    // }

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    
    render() {
        const { open, open1 } = this.state;
        
        const likePointer = { cursor: 'pointer' , color: 'blue' };
        const delPointer = { cursor: 'pointer' , color: 'red' };

        const tableHeadStyle= { fontWeight: 'bold' , fontSize: '15px' , color: 'black' }
        const tableBodyStyle= { fontSize: '12px' }

        const textfieldHeight = {
            width: 600,
            height: 150,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 2,
            resize: 'none',
        };
        
        return (
            <div>


                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={ tableHeadStyle }>Sl no</TableCell>
                            <TableCell style={ tableHeadStyle }>Customer</TableCell>
                            <TableCell style={ tableHeadStyle }>Description</TableCell>
                           

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllPlan && this.state.getAllPlan.map((plan, i) =>


                            <TableRow>
                                <TableCell style={ tableBodyStyle }>{++i}</TableCell>
                                <TableCell style={ tableBodyStyle }>{plan.customer.companyName}</TableCell>
                                <TableCell style={ tableBodyStyle }>
                                <textarea style={textfieldHeight}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        readOnly
                                        id="description"
                                        placeholder="Discription"
                                        multiline
                                        name="description"
                                        value={plan.description} />
                                </TableCell>
                               

                            </TableRow>

                        )}
                    </TableBody></Table>

            </div>

        )
    }
}
MidSaleList.propTypes = {
    auth: PropTypes.object.isRequired,
   
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(MidSaleList)