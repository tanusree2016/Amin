import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { resetWarningCache } from 'prop-types';
import envirionment from '../../../common/utils/envirionment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import base_url from '../../../common/utils/axios';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import ListCtegories from './listCategories';


mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}
var formData = null;
class AddCategories extends Component {
    constructor(){
        super();
        this.state ={
            category: '',
            file:'',
            color_code: '',
            ext: '',
            showChild: true,
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

    resetField = () => {
        this.setState({ category: '' });
        this.setState({ color_code: '' });
       
    }

    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
        let extension;
        extension = e.target.files[0].name.slice((e.target.files[0].name.lastIndexOf(".") - 1 >>> 0) + 2);
        this.setState({
          ext: extension,
        })
    
        reader.onloadend = (e) => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
    
          console.log("Files --- " + e.target.result)
          //formData = { file: e.target.result }
          formData={file:e.target.result.split(',').pop()}
        }
    
        reader.readAsDataURL(file)
    
      }

    handleSubmit(e) {
        e.preventDefault();
      

            const data = new FormData()
            data.append('file', this.state.file)

            const categoryAdd = {
                category: this.state.category,
                color_code: this.state.color_code,
                category_image: formData,
                extension: this.state.ext,
            }
            console.log("DATA send --- "+JSON.stringify(categoryAdd))
            // this.props.designationAdd(designationAdd, this.props.history);
            base_url.post('admin/add-category', categoryAdd, {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    
                }
            })
                .then(res => {
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if (res.data.value == 1)
                        showAlert("Category is added successfully");
                    else
                        showAlert(res.data.message);
                    this.reloadChild();
                })
                .catch(e => console.log(e))
        
        this.resetField();
    }



    handleInputChangeValue(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

    }


    render() {
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
        return (
            <div style={styles1}>
                <form className="reg" encType="multipart/form-data" onSubmit={this.handleSubmit} >
                 <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px'}}>
                 <div id='2'>
                        <TextField style={textfieldHeight}
                            variant="outlined"
                            margin="dense"
                            required
                            id="category"
                            label="Category Name"
                            name="category"
                            value={this.state.category}
                            onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                        />

                    </div>

                    <div id='3'>
                        <TextField style={textfieldHeight}
                            variant="outlined"
                            margin="dense"
                            required
                            id="color_code"
                            label="Color Code"
                            name="color_code"
                            value={this.state.color_code}
                            onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                        />
                    </div>

                    <input className="fileInput"
                        type="file"
                        onChange={(e) => this._handleImageChange(e)} style={{ width: "200px" }} />

                    <Button style={stylesBotton}
                        type="submit"
                        variant="contained"
                        color="primary"
                    //className={classes.submit}
                    //onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                    <br /><br />
                    {this.state.showChild ?
          <ListCtegories reloadChild={this.reloadChild} /> : null
        }
                 </div>

                </form>

            </div>
        )

    }

}

AddCategories.propTypes = {
    classes: PropTypes.object.isRequired,
    categoryAdd: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps)(AddCategories)