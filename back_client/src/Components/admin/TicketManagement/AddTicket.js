import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { resetWarningCache } from 'prop-types';
import envirionment from '../../../common/utils/envirionment';
import { ticketAdd } from '../authentication';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ticket from './Ticket';
import Ticket from './Ticket';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { TextareaAutosize } from '@material-ui/core';


var formData=null;
class AddTicket extends Component {

        constructor(props){
            super(props);
            this.state = {
                issue: '',
                details: '',
                childComponent : true,
                selectedFile: null,
                ext: '',
            }
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        loadChild = () => {
            this.setState({
                childComponent : false
            })
          
            setTimeout(() => {
              this.setState({
                childComponent : true
              })
            },100);
        
            console.log("Reload Child Invoked")
        }

        handleInputChangeValue(event, id) {
            let nam = event ? event.target.name : event;
            let val = event ? event.target.value : event;
            console.log(nam, ":", val);
            this.setState({ [nam]: val });
    
        }

        onChangeHandler = event => {

            let files=event.target.files;
            let extension;
            extension=event.target.files[0].name.slice((event.target.files[0].name.lastIndexOf(".") - 1 >>> 0) + 2);
            this.setState({
                ext: extension,
            })
            console.log("File Name : "+event.target.files[0].name+" "+extension)
            let reader=new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload=(e)=>{
                console.log("Files --- "+e.target.result.split(',').pop())
                formData={file:e.target.result.split(',').pop()}
            }

            this.setState({
                selectedFile: event.target.files[0],
                loaded: 0,
              })
        }

        handleSubmit(e) {
            e.preventDefault();
            const data = new FormData() 
            data.append('file', this.state.selectedFile)
            const ticketAdd = {
                issue: this.state.issue,
                details: this.state.details,
                dbname: localStorage.getItem('dbname'),
                customer_id: localStorage.getItem('companyid'),
                file: formData,
                extension: this.state.ext,
            }
            console.log("Data --- "+data);
            this.forceUpdate();
            this.props.ticketAdd(ticketAdd, this.props.history);
            this.resetField();
            this.loadChild();
        }

        resetField = () => {
            this.setState({ issue: '' });
            this.state.details='';
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

        const textfieldHeightArea = {
            width: 300,
            height: 150,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 2,
            resize: 'none',
          };

        const formControl = {
            minWidth: 150,
        };

            return(

                <div style={styles1}>
                     <form className="reg" onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div id='2'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="issue"
                                label="issue"
                                name="issue"
                                value={this.state.issue}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />
                        </div>
                        <div>
                        <textarea style={textfieldHeightArea}
                                variant="outlined"
                                margin="normal"
                                required
                                id="details"
                                placeholder="Details"
                                multiline
                                name="details"
                                value={this.state.details}
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                        </div>
                        <div id='2'>
                        
                        <input type="file" name="file" onChange= {this.onChangeHandler} />
                        
                            
                                              </div>
                        <Button style={stylesBotton}
                        type="submit"
                        variant="contained"
                        color="primary"
                        //className={classes.submit}
                        // onClick={this.handleSubmit}
                        >
                        Submit
                    </Button>
                    </form>
                    <br /><br />
                    {this.state.childComponent?
          <Ticket loadChild={this.loadChild}/> : null
        }
                </div>

            )
        }
}

AddTicket.propTypes = {
    classes: PropTypes.object.isRequired,
    ticketAdd: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
   
  //export default withStyles(styles)(Company);
  export default connect(mapStateToProps, { ticketAdd })(AddTicket)
  