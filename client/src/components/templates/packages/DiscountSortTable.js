import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Icon, Button, Divider, Popup, Input,Modal, Form ,Dropdown} from 'semantic-ui-react'



import { connect } from 'react-redux';
import { editDiscount, deleteDiscount } from './DiscountApi'

import envirionment from '../../../common/utils/envirionment'
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
] 

class DiscountSorTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      discount_name: '',
      discount_type: '',
      value: '',
      discount_code: '',
      category: '',
      max_noof_users: 0,
      expiration_date: '',
      discountList: [],
      editIndex: -1,
      open : false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  // show = (size) => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  handleSort = (clickedColumn) => () => {
    const { column, discountList, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        discountList: _.sortBy(discountList, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      discountList: discountList.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }



  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }



  show = (size, discount_name, discount_type, value, discount_code, category, max_noof_users, expiration_date, did, index) =>()=> {
    this.setState({
      size: size,
      discount_name: discount_name,
      discount_type: discount_type,
      value: value,
      discount_code: discount_code,
      category: category,
      max_noof_users: max_noof_users,
      expiration_date: expiration_date,

      id: did,
      editIndex: index,
      open: true 
    })
  }

  handleDiscountData() {
    console.log("Calling --- ");
    fetch(envirionment.BASE_URL + 'discounts/discount-list', {

      method: "POST",

    }).then(res => res.json())
      .then(res2 => {

        this.setState({
          discountList: res2.discountlist
        });

        console.log("Project Names --- " + JSON.stringify(this.state.discountList));




      })
    console.log("Calling --- End ---  ");
    this.forceUpdate();

  }


  componentDidMount = () => {
    this.handleDiscountData();

  }


  handleSubmit(e) {
    e.preventDefault();

    const editDiscount = {


      discount_name: this.state.discount_name,
      discount_type: this.state.discount_type,
      value: this.state.value,
      discount_code: this.state.discount_code,
      category: this.state.category,
      max_noof_users: parseInt(this.state.max_noof_users),
      expiration_date: this.state.expiration_date,
      id: this.state.id
    }

    // this.state.sourceList[this.state.editIndex].source_name = this.state.source_name


    this.props.editDiscount(editDiscount, this.props.history);


    //this.resetField();
    this.close();
  }


  // // handleClick(name, sid, index) {
  // //   console.log("Value Details --- " + name + " " + sid + " " + " " + index)
  // //   this.setState({
  // //     open: true,
  // //     source_name: name,
  // //     id: sid,
  // //     editIndex: index,
  // //   });
  // // }

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
    const deleteDiscount = {
      id: this.state.id
    }

    this.setState((prevState) => ({
      discountList: prevState.discountList.filter((_, i) => i !== this.state.delIndex)
    }));

    this.props.deleteDiscount(deleteDiscount, this.props.history);
    this.handleClose();
  }


    handleDiscountChange = (e, { value }) => this.setState((prevState, props) => {
    let newState = { ...prevState }
    newState.discount_type = value;
    return { ...newState };
});

handleCategoryChange = (e, { value }) => this.setState((prevState, props) => {
  let newState = { ...prevState }
  newState.category = value;
  return { ...newState };
});


  render() {
    const { column, discountList, direction, open1,open,size } = this.state;




    return (
      <div>

        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'discount_name' ? direction : null}
                onClick={this.handleSort('discount_name')}
              >
                Name
            </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'discount_type' ? direction : null}
                onClick={this.handleSort('discount_type')}
              >
                Type
            </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'value' ? direction : null}
                onClick={this.handleSort('value')}
              >
                Value
            </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'discount_code' ? direction : null}
                onClick={this.handleSort('discount_code')}
              >
                Code
            </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={this.handleSort('name')}
              >
                Max Usage
            </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'max_noof_users' ? direction : null}
                onClick={this.handleSort('max_noof_users')}
              >
                Expiration Date
            </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'expiration_date' ? direction : null}
                onClick={this.handleSort('expiration_date')}
              >
                Total Used
            </Table.HeaderCell>
              <Table.HeaderCell

              >
                Action
            </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(discountList, ({ discount_name, discount_type, value, discount_code, category, max_noof_users, expiration_date, id, i }) => {

              return <>

                <Table.Row key={discount_name}>
                  <Table.Cell> {discount_name}</Table.Cell>
                  <Table.Cell>{discount_type}</Table.Cell>

                  <Table.Cell> {value}</Table.Cell>
                  <Table.Cell>{discount_code}</Table.Cell>
                  <Table.Cell>{max_noof_users}</Table.Cell>
                  <Table.Cell>{expiration_date} </Table.Cell>
                  <Table.Cell> </Table.Cell>

                  <Table.Cell><Button style={{ background: "white" }} onClick={this.show("small", discount_name, discount_type, value, discount_code, category, max_noof_users, expiration_date, id, i)}  ><Icon name='cog' /></Button><Button style={{ background: "white" }} onClick={(e) => this.handleClickDelete(id, i)}><Icon name='trash' /></Button> </Table.Cell>





                  {/* <div style={{ width: "80px", height: "15px" }} onClick={() => this.handleShow(true)}><text><Icon name='cog' />Edit</text></div> */}

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

                  <Modal size={size} open={open} onClose={this.close}>
                         <Modal.Header> Add Discount</Modal.Header>
                         <Modal.Content>
                     

                         <Form onSubmit={this.handleSubmit} >

                      
                           <Form.Field>
                                         <label>Discount name*</label>
                                        <Input  placeholder="Enter a discount name "
                              name="discount_name"
                              value={this.state.discount_name}
                              onChange={this.handleChange}
                                        />
                                    </Form.Field>

                          
                                        <Form.Field >
                                                    <label>Discount type*</label>
                                                    <Dropdown
                                                        fluid
                                                        selection
                                                        multiple={false}
                                                        search={true}
                                                        options={genderOptions}
                                                        value={this.state.discount_type}
                                                        placeholder='Select your project status'
                                                        onChange={this.handleDiscountChange}
                                                    
                                                        disabled={false}
                                                        loading={false}
                                                    />
                                                </Form.Field>

                                                <Form.Field>
                                        <label>Value*</label>
                                        <Input placeholder="Enter a discount name "
                              name="value"
                              value={this.state.value}
                              onChange={this.handleChange}
                                        />
                                    </Form.Field>
                   

                     
                                    <Form.Field>
                                        <label>Discount code</label>
                                        <Input placeholder="Enter a discount name "
                              name="discount_code"
                              value={this.state.discount_code}
                              onChange={this.handleChange}
                                        />
                                    </Form.Field>

                     

                            
                          <Form.Field >
                                                    <label>Discount type*</label>
                                                    <Dropdown
                                                        fluid
                                                        selection
                                                        multiple={false}
                                                        search={true}
                                                        options={genderOptions}
                                                        value={this.state.category}
                                                        placeholder='Select your category'
                                                        onChange={this.handleCategoryChange}
                                                    
                                                        disabled={false}
                                                        loading={false}
                                                    />
                                                </Form.Field>
            

                                                <Form.Field>
                                        <label>Max. number of uses</label>
                                        <Input type="number" placeholder="Enter a discount name "
                              name="max_noof_users"
                              value={this.state.max_noof_users}
                              onChange={this.handleChange}
                                        />
                                    </Form.Field>

                      
                                    <Form.Field>
                                        <label>Expiration date</label>
                                        <Input type="date" placeholder="Enter a discount name "
                              name="expiration_date"
                              value={this.state.expiration_date}
                              onChange={this.handleChange}
                                        />
                                    </Form.Field>

                        


                          <Button primary type="submit" style={{ float: "right" }}>
                            Save
                            </Button>

                        </Form>
                        <Button secondary onClick={this.close} style={{ float: "right" }}>
                          Cancel
                            </Button>&nbsp;<br/><br/>
                           
                            </Modal.Content>
                  </Modal>


                </Table.Row>

              </>
            })}


          </Table.Body>
        </Table>

      </div>
    )
  }
}



DiscountSorTable.propTypes = {

  editDiscount: PropTypes.func.isRequired,
  deleteDiscount: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  discount: state.discount,
  errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { editDiscount, deleteDiscount })(DiscountSorTable);
