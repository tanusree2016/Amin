import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { resetWarningCache } from 'prop-types';
import envirionment from '../../../common/utils/envirionment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import base_url from '../../../common/utils/axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import ListSubCategories from './listSubcategory';


mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}

var desigNameArray = [];
var desigIdArray = [];

class AddSubcategory extends Component {

    constructor() {
        super();
        this.state = {
            subcategory: '',
            category_id: '',
            getAllCategory: [],
            showChild: true,
            loading: false, // will be true when ajax request is running
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

    fetchcategory() {

        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'consumer/services/', {
                method: "POST",
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    
                }
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        getAllCategory: res.Service,
                        loading: false,
                    });

                    for (let i = 0; i < res.Service.length; i++) {
                        desigNameArray.push(res.Service[i].category);
                        desigIdArray.push(res.Service[i].id);
                       
                    }
                })
        })
    }

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchcategory();
    }


    handleInputChangeValue(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

    }

    handleInputChangeValueCategory(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        this.setState({ [nam]: val });
        for (let i = 0; i < this.state.getAllCategory.length; i++) {
            if (JSON.stringify(desigIdArray.pop(i)) == val) {
                console.log("entered");
                this.state.id = val;
            }
        }
    }


    handleSubmit(e) {
        e.preventDefault();
  
            const subcategoryAdd = {
                subcategory: this.state.subcategory,
                category_id: this.state.category,
            }
           
            base_url.post('admin/add-subcategory', subcategoryAdd, {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                }
            })
                .then(res => {
                  
                    if (res.data.value == 1)
                        showAlert("Subcategory is added successfully");
                    else
                        showAlert(res.data.message);
                    this.reloadChild();
                })
                .catch(e => console.log(e))
        
        this.resetField();
    }

    resetField = () => {
        this.setState({ subcategory: '' });
        this.setState({ category: '' });
       
    }

    render() {

        const { loading } = this.state;

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

                <div style={styles1}>
                    <form className="reg" onSubmit={this.handleSubmit} >

                        <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                            <FormControl style={formControl}>
                                <InputLabel htmlFor="Category">Category</InputLabel>
                                <Select
                                    value={this.state.category}
                                    onChange={(ev) => this.handleInputChangeValueCategory(ev)}
                                    inputProps={{
                                        name: 'category',
                                        id: 'category',
                                    }}
                                >
                                    {this.state.getAllCategory.map(module => (
                                        <MenuItem value={module.id}>{module.category}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                          
                        </div>
                        <br />

                        <div id='2'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="subcategory"
                                label="Sub Category"
                                name="subcategory"
                                value={this.state.subcategory}
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

                    </form>
                    <br /><br />
                   
                    {this.state.showChild ?
          <ListSubCategories reloadChild={this.reloadChild} /> : null
        }
                </div>
            )
        }
    }

}


AddSubcategory.propTypes = {
    classes: PropTypes.object.isRequired,
    //designationAdd: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps)(AddSubcategory)