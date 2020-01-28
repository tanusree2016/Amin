import React, { Component } from 'react';
import { Segment, Dropdown, Button ,Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import envirionment from '../../common/utils/envirionment'
import {deleteBoard} from './taskandboard/BoardApi'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

 class BoardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            project: '',
            privacy: '',
            boardList: [],
            id:''
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleBoardData() {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'board/board-list', {

            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded ' }
        }).then(res => res.json())
            .then(res2 => {
                console.log("Size --- " + res2.boardlist.length);
                //let allList = JSON.stringify(res2.list)
                // console.log("All List --- " + allList);
                this.setState({
                    boardList: res2.boardlist
                });

                console.log("Project Names --- " + JSON.stringify(this.state.boardList));




            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }

    handleData() {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'project/list', {

            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded ' }
        }).then(res => res.json())
            .then(res2 => {
                console.log("Size --- " + res2.list.length);
                //let allList = JSON.stringify(res2.list)
                // console.log("All List --- " + allList);
                this.setState({
                    data: res2.list
                });
                let i = 0;
                let x = "";



              
                this.setState({
                    projectList: res2.list,
                    
                })

                console.log("Project Names --- " + this.state.projectList);
                console.log("Project Names --- " + this.state.start_date);
            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }




    componentDidMount = () => {
        this.handleBoardData();

    }

    handleClose = () => {
        this.setState({
          
            open1: false,

        });
    };

    handleClickDelete(e, index) {
        this.setState({
            open1: true,
            id: e,
            delIndex: index,
        });
    }


    handleDelete(e) {
        e.preventDefault();
        const deleteBoard = {
            id: this.state.id
        }

        this.setState((prevState) => ({
            boardList: prevState.boardList.filter((_, i) => i !== this.state.delIndex)
        }));

        this.props.deleteBoard(deleteBoard, this.props.history);
        this.handleClose();
    }




    render() {
        const options = [
            { key: 'copy', text: 'Copy', value: 'copy' },
            { key: 'delete', text: 'Dlete', value: 'delete' },

        ]
        const { open1 } = this.state;

        return (
            <div>

                {/* <Segment padded='very'>
                    <Link to="/board">  <text>fgfgdfgdfg</text></Link>


                    <Button.Group style={{ float: "right" }}>

                        <Dropdown
                            className='button icon'
                            icon="angle down"
                            options={options}
                            trigger={<React.Fragment />}
                            style={{ background: "white", }}

                        />
                    </Button.Group><br /><br />


                </Segment> */}


                <Dialog
                    open={open1}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">{"Are sure , want to delete subscription?"}</DialogTitle>
                    <DialogContent>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleDelete} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>


                {this.state.boardList && this.state.boardList.map((board, i) =>

                    <Segment padded='very'>

                        <text>{board.name}</text><br /><br />
                        <text style={{ fontSize: "12px" }}><b>Project : {board.project}</b></text><br />
                        <text style={{ fontSize: "12px" }}><b>Privacy : {board.privacy}</b></text>

                        {/* <Button.Group style={{ float: "right" }}>

                            <Dropdown
                                className='button icon'
                                icon="angle down"
                                options={options}
                                trigger={<React.Fragment />}
                                style={{ background: "white", }}

                            />
                        </Button.Group><br /><br /> */}
                        <Icon name = "trash" style={{float:"right"}} onClick={(e) => this.handleClickDelete(board.id, i)}/>


                    </Segment>



                )}

            </div>
        )
    }
}


BoardList.propTypes = {
    
    deleteBoard: PropTypes.func.isRequired,
    
};



export default connect(null, { deleteBoard })(BoardList);

