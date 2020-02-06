import React, { Component } from 'react';
import envirionment from '../../../common/utils/envirionment';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import passvalue from '../../../common/utils/passvalue';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';



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

const formControlSpinner = {
    minWidth: 220,
};

const stylesBotton = {
    marginTop: 20
};

const styles1 = {
    textAlign: 'center',
    paddingTop: '2',
};

const textfieldHeight = {
    width: 220,
    height: 50,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 5,
    resize: 'none',
};

const textfieldHeightRejectNote = {
    width: 520,
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

const formControl = {
    minWidth: 150,
};



class EditRequisition extends Component {

    constructor() {
        super();
        this.state = {
            getAllRequisition: [],
            getAllItem: [],
            itemName: [],
            itemId: [],
            dispStatus: false,
            lineItems: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            comboItems: [{ name: "", id: "" }],
            rejectreason: '',
            labelWidth: 85,
        }
    }

    fetchAllRequisition() {
        let id = localStorage.getItem('id');
        console.log("requisitor_id --- " + id);
        fetch(envirionment.BASE_URL + 'requisition-list', {
            method: 'post',
            headers: {
                'x-access-db': localStorage.getItem('dbname'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ requisitor_id: id })
        }).then(res => res.json())
            .then(res => {
                console.log("Data Comming --- " + JSON.stringify(res))
                this.setState({
                    getAllRequisition: res.RequisitionList[passvalue.requisitionIndex].children
                });
                console.log("res.RequisitionList[passvalue.requisitionIndex] --- " + JSON.stringify(res.RequisitionList[passvalue.requisitionIndex]))
                for (let i = 0; i < res.RequisitionList[passvalue.requisitionIndex].children.length; i++) {
                    console.log("Value Comming --- " + JSON.stringify(res.RequisitionList[passvalue.requisitionIndex].children) + " --- " + JSON.stringify(res.RequisitionList[passvalue.requisitionIndex].children[i].item_name.name))
                    this.state.lineItems.push({ item_id: res.RequisitionList[passvalue.requisitionIndex].children[i].item_name._id, item_name: res.RequisitionList[passvalue.requisitionIndex].children[i].item_name.name, item_description: res.RequisitionList[passvalue.requisitionIndex].children[i].item_description, purpose: res.RequisitionList[passvalue.requisitionIndex].children[i].purpose, no_of_items: res.RequisitionList[passvalue.requisitionIndex].children[i].no_of_items })
                }
                this.state.rejectreason = res.RequisitionList[passvalue.requisitionIndex].comment
                this.state.dispStatus = true
                //this.forceUpdate();
                console.log("Requisition List --- " + JSON.stringify(this.state.lineItems) + " --- " + passvalue.requisitionIndex)
            })
            .catch(error => {
                console.log("ERROR --- " + error)
            });
    }

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllRequisition();
        this.fetchAllItem();
    }

    fetchAllItem() {
        console.log('hhh' + JSON.stringify(localStorage.getItem('subscription')))
        let subscription = localStorage.getItem('subscription');
        fetch(envirionment.BASE_URL + 'stock-list', {
            method: "GET",
            headers: {
                'x-access-db': localStorage.getItem('dbname')
            }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllItem: res.Stock
                });

                console.log('All Item --- ' + JSON.stringify(res.Stock))

                for (let i = 0; i < res.Stock.length; i++) {
                    this.state.itemName.push(res.Stock[i].name)
                    this.state.itemId.push(res.Stock[i]._id)
                    this.state.comboItems.push({ name: res.Stock[i].name, id: res.Stock[i]._id })
                }
                const newList = this.state.comboItems.splice(0, 1);
                console.log("Name Id List --- " + JSON.stringify(this.state.comboItems))
            })
            .catch(error => console.log(error));
    }

    addItem() {
        this.setState(prevState => ({
            lineItems: [...prevState.lineItems, { item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "" }]
        }))
    }

    removeItem(i) {
        let values = [...this.state.lineItems];
        values.splice(i, 1);
        this.setState({ lineItems: values });
        this.props.handlerfordata(this.state.lineItems);
    }

    handleInputChangeValue(i, e) {
        let id;
        let nam = e ? e.target.name : e;
        let val = e ? e.target.value : e;
        console.log(nam, "::", val);
        this.setState({ [nam]: val });

        const { name, value } = e.target;
        let lineItems = [...this.state.lineItems];

        if (nam === "item_name") {
            console.log("OK")
            for (let j = 0; j < this.state.itemName.length; j++) {
                if (val === this.state.itemName[j]) {
                    id = this.state.itemId[j]
                    console.log("ID --- " + id)
                    const nameid = "item_id";
                    const valueid = id;

                    lineItems[i] = { ...lineItems[i], [nameid]: valueid };
                    lineItems[i] = { ...lineItems[i], [name]: value };
                    this.setState({ lineItems });

                    console.log("lineItems --- " + JSON.stringify(lineItems))
                    break;
                }
            }
        }
        else {
            lineItems[i] = { ...lineItems[i], [name]: value };
            this.setState({ lineItems });
            console.log("lineItems --- " + JSON.stringify(lineItems))
        }
    }

    handleInputChangeNumber(i, e) {

        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            const { name, value } = e.target;
            console.log("Testing ---" + name + ":" + value)
            let lineItems = [...this.state.lineItems];
            lineItems[i] = { ...lineItems[i], [name]: value };
            this.setState({ lineItems });
        }
    }

    handleAddValue(event) {
        this.props.handlerfordata(this.state.lineItems);
    }

    resetField = () => {
        this.setState({ lineItems: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "" }] });
        this.state.rejectreason = '';
    }

    createUI() {
        //if(this.state.lineItems.length>1){    
        return this.state.lineItems.map((item, i) => (
            <div key={i} >
                {this.state.dispStatus && i > 0 ?
                    <div style={stylesForm}>
                        <FormControl variant="outlined" margin="dense" style={formControlSpinner}>
                            <InputLabel htmlFor="item_name">Item Name</InputLabel>
                            <Select style={{ height: "40px", minHeight: "40px", marginLeft: 4, marginRight: 4 }}
                                value={item.item_name}
                                labelWidth={this.state.labelWidth}
                                onChange={this.handleInputChangeValue.bind(this, i)}
                                //onBlur={(ev) => this.handleAddValue(ev)}
                                inputProps={{
                                    name: 'item_name',
                                    id: 'item_name',
                                }}>
                                {this.state.getAllItem.length > 0 && this.state.getAllItem.map(item => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                name="item_name"
                                label="item_name"
                                value={item.item_name}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </div> */}

                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                label="Item Description"
                                required
                                multiline={true}
                                rows={1}
                                rowsMax={1}
                                id="item_description"
                                name="item_description"
                                value={item.item_description}
                                onChange={this.handleInputChangeValue.bind(this, i)}
                                onBlur={(ev) => this.handleAddValue(ev)}
                            />
                        </div>
                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                label="Purpose"
                                required
                                multiline={true}
                                rows={1}
                                rowsMax={1}
                                id="purpose"
                                name="purpose"
                                value={item.purpose}
                                onChange={this.handleInputChangeValue.bind(this, i)}
                                onBlur={(ev) => this.handleAddValue(ev)}
                            />
                        </div>
                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                autoFocus
                                margin="dense"
                                required
                                type="tel"
                                name="no_of_items"
                                label="No. Of Items"
                                value={item.no_of_items}
                                onChange={this.handleInputChangeNumber.bind(this, i)}
                                onBlur={(ev) => this.handleAddValue(ev)}
                            />
                        </div>
                        {/* <div id='5'>
                    <Fab color="primary" size="small" aria-label="add" onClick={this.addItem.bind(this)} >
                        <AddIcon />
                    </Fab>
                </div> */}

                        <IconButton aria-label="delete" color="secondary" onClick={this.removeItem.bind(this, i)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    :
                    ''
                }
            </div>
        ))
        //}
    }

    render() {

        return (
            <div>
                <form className="reg" noValidate style={{ styles1 }} >
                    <Typography variant="h5" gutterBottom paragraph>
                        Edit Requisition &nbsp;
                    <Fab color="primary" size="small" aria-label="add" onClick={this.addItem.bind(this)} >
                            <AddIcon />
                        </Fab>
                    </Typography>

                    <div>
                        <TextField style={textfieldHeightRejectNote}
                            variant="outlined"
                            margin="dense"
                            label="Reason of Rejection"
                            required
                            multiline={true}
                            rows={3}
                            rowsMax={3}
                            id="rejectreason"
                            name="rejectreason"
                            value={this.state.rejectreason}
                            InputProps={{
                                disabled: true,
                            }}
                        />
                    </div>

                    <br /><br />

                    {this.createUI()}

                </form>

            </div>
        );
    }
}


export default (EditRequisition)
