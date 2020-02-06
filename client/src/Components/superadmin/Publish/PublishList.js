import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import axios from '../../../common/utils/axios';
import envirionment from '../../../common/utils/envirionment';


var planArray = [];
class PublishList extends Component {

    constructor(props) {
        super(props);
        this.state = {

            description: '',
            planName: '',
            price: '',
            duedate: '',
            subscriptions: [],
            getAllPlan: [],
            plans: [],
            price: [],
            delIndex: -1,
            editIndex: -1,
        };


    }



    fetchAllPlans() {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'publish-list', {
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                console.log("Size --- " + res.publish.length);
                this.setState({
                    getAllPlan: res.publish
                });
                for (let i = 0; i < res.publish.length; i++) {
                    planArray.push(res.publish[i].description);
                    //this.setState({ plans: res.subscription[i].planName })
                    this.setState({ id: res.publish[i].publishId })
                    this.setState({ description: res.publish[i].description })
                }
                console.log('array' + planArray);
                this.setState({ plans: planArray })

                console.log("Plan Names --- " + this.state.getAllPlan);
            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }
    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllPlans();
    }

    render() {
        const { open, open1 } = this.state;
        const likePointer = { cursor: 'pointer' };

        const tableHeadStyle= { fontWeight: 'bold' , fontSize: '15px' , color: 'black' }

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
                            <TableCell style={ tableHeadStyle }>Description</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllPlan && this.state.getAllPlan.map((plan, i) =>


                            <TableRow>
                                <TableCell>{++i}</TableCell>
                                <TableCell>
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
PublishList.propTypes = {
    auth: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(PublishList)