import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import envirionment from '../../../common/utils/envirionment';
import { MenuDelete } from '../authentication';
import AddSubMenu2 from './AddSubMenu2'
import { menuEdit } from '../authentication';
import passvalue from '../../../common/utils/passvalue';
import base_url from '../../../common/utils/axios';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';

var planArray = [];
var menuIndex = '';

mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,
    });
}


class MenuList extends Component {

    constructor(props) {

        super(props);
        this.state = {
            getAllPlan: [],
            delIndex: -1,
            editIndex: -1,
            menuId: '',
            _id: '',
            menuName: '',
            subMenu: '',
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log("this.state.subMenu --- " + this.state.subMenu.length)
        if (this.state.subMenu.length > 0) {
            const newList = this.state.subMenu.splice(0, 1);
        }
        const menuEdit = {
            menuName: this.state.menuName,
            menuId: this.state.menuId,
            _id: this.state._id,
            subMenu: this.state.subMenu,
        }
        console.log("subMenu --- " + JSON.stringify(this.state.subMenu))
        // this.state.getAllPlan[this.state.editIndex].menuName = this.state.menuName
        // this.props.menuEdit(menuEdit, this.props.history);
        base_url.post('menus', menuEdit, {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    showAlert(res.data.message);
                    this.fetchAllMenu();
                }
                else
                    showAlert(res.data.message);
            })
            .catch(e => console.log(e))
        this.handleClose();
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

    handleClick(name, aid, mid, index) {
        console.log("Value Details --- " + name + " " + aid + " " + mid + " " + index)
        this.setState({
            open: true,
            menuName: name,
            _id: aid,
            menuId: mid,
            editIndex: index,
        });
        passvalue.menuIndex = index;
    };

    handleClickDelete(e, index) {

        console.log('handle delete---' + e);
        this.setState({
            open1: true,
            menuid: e,
            delIndex: index,
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,

        });
    };

    handleDelete(e) {
        e.preventDefault();
        const MenuDelete = {
            menuId: this.state.menuid
        }

        this.setState((prevState) => ({
            getAllPlan: prevState.getAllPlan.filter((_, i) => i !== this.state.delIndex)
        }));

        this.props.MenuDelete(MenuDelete, this.props.history);
        this.handleClose();
    }


    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllMenu();
    }

    fetchAllMenu() {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'menu-list', {
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                console.log("Size --- " + res.MenuList.length);
                this.setState({
                    getAllPlan: res.MenuList
                });
                console.log("All Menus --- " + JSON.stringify(res.MenuList))
                for (let i = 0; i < res.MenuList.length; i++) {
                    planArray.push(res.MenuList[i].menuName);
                    this.setState({ id: res.MenuList[i].menuId })
                    this.setState({ menuName: res.MenuList[i].menuName })
                }
                console.log('array' + planArray);
                this.setState({ plans: planArray })

                console.log("Plan Names --- " + this.state.getAllPlan);
            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    handlerfordata = (data) => {
        console.log('Inside handlerfordata data is');
        this.state.subMenu = data
        console.log("My Data --- " + this.state.subMenu);
    }

    render() {

        const { open, open1 } = this.state;

        const likePointer = { cursor: 'pointer', color: 'blue' };
        const delPointer = { cursor: 'pointer', color: 'red' };

        const tableHeadStyle = { fontWeight: 'bold', fontSize: '15px', color: 'black' }
        const tableBodyStyle = { fontSize: '12px' }

        const { name, onChange } = this.props;
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

        return (
            <div>

                <Dialog
                    open={open1}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">{"Are sure , want to delete subscription?"}</DialogTitle>
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

                <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogContentText>
                            Edit Menu
                        </DialogContentText>
                        <form>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="menuName"
                                label="Menu Name"
                                name="menuName"
                                value={this.state.menuName}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />

                            <div>
                                <AddSubMenu2 handlerfordata={this.handlerfordata} />
                            </div><br /><br />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button style={{ fontWeight: 'bold' }} onClick={this.handleSubmit} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHeadStyle}>Menu name</TableCell>
                            <TableCell style={tableHeadStyle}>Edit</TableCell>
                            <TableCell style={tableHeadStyle}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllPlan && this.state.getAllPlan.map((plan, i) =>

                            <TableRow>
                                <TableCell style={tableBodyStyle}>{plan.label}</TableCell>
                                <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(plan.label, plan._id, plan.menuId, i)} /></TableCell>
                                <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(plan._id, i)} /></TableCell>
                            </TableRow>

                        )}
                    </TableBody></Table>

            </div>
        )
    }
}


MenuList.propTypes = {
    auth: PropTypes.object.isRequired,
    MenuDelete: PropTypes.func.isRequired,
    menuEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { menuEdit, MenuDelete })(MenuList);