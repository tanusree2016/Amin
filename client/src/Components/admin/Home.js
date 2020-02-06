import React, { Component } from 'react';
import envirionment from '../../common/utils/envirionment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



class Home extends Component {

    constructor() {
        super();
        this.state = {
            getAllModule: [],
            values: '',
            loading: false, // will be true when ajax request is running
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    fetchmodule() {

        console.log('hhh' + JSON.stringify(localStorage.getItem('subscription')))
        let subscription = localStorage.getItem('subscription');
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'subscriptionbyId/' + subscription, {
                data: 'planName',
                data: 'price',
                data: 'subscriptionId',
                method: "GET",
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'x-access-db': localStorage.getItem('dbname')
                }
            }).then(res => res.json())
                .then(res => {
                    console.log("Size --- " + res.subscription.length);
                    this.setState({
                        loading: false,
                        getAllModule: res.subscription
                    });
                })
        });
    }


    fetchcompdet() {

        console.log('hhh' + JSON.stringify(localStorage.getItem('subscription')))
        let subscription = localStorage.getItem('subscription');
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'compwithsub'+{
                data: 'planName',
                data: 'price',
                data: 'subscriptionId',
                method: "POST",
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'x-access-db': localStorage.getItem('dbname')
                }
            }).then(res => res.json())
                .then(res => {
                    console.log("Size --- " + res.subscription.length);
                    this.setState({
                        loading: false,
                        getAllModule: res.subscription
                    });
                })
        });
    }

    componentDidMount() {
        console.log("Child calling ------ "+envirionment.BASE_URL);
        this.fetchmodule();
    }

    selectModule(planName) {
        this.setState({
            open: true,
        });
        alert("Plan name --- " + planName)
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        alert("Processing...")
    }

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }


    render() {

        const { open } = this.state;
        const { loading } = this.state;

        const card = {
            minWidth: 130,
            float: "left",
            marginRight: 20, // or sth.
            backgroundColor: '#808080',
        };

        const media = {
            height: 0,
            paddingTop: '75%', // 16:9,
            marginTop: '30',
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
    

    if(this.state.loading) {
        return (
            <div style={centerLoad}>
                <i className="fa fa-cog fa-spin" />
            </div>
        );
    }
          else{

    return (
        <div>
            <div>
                {this.state.getAllModule.map(module => (

                    <Card style={card} onClick={(e) => this.selectModule(module.planName)}>
                        <CardMedia
                            style={media}
                            image={envirionment.BASE_URL+'uploads/subscription/'+module.filename}
                            title={module.planName}
                        />
                        <CardContent>
                            <Typography variant="h9" component="h9">
                                {module.planName}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
    }
}

export default Home;