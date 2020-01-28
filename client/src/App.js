import React from 'react';
//import logo from './logo.svg';
import './App.css';
import SideNavs from './components/SideNavs'
import Calendars from './components/calendar/Calendars';
import { BrowserRouter, Route } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import Layout from './components/projects/Layout'
 import { Provider } from 'react-redux'
import Customize from './components/projects/Customize';
 import store from './store'
import Tasks from './components/tasks/Tasks'
import Dashboard from './components/dashboard/Dashboard'
import ChartOfAccounts from './components/reporting/ChartOfAccounts';
import Invoices from './components/reporting/Invoices';
import ProjectBreakdown from './components/reporting/ProjectBreakdown';
import ProjectSources from './components/reporting/ProjectSources';
import Reports from './components/reporting/Reports';
import Transactions from './components/reporting/Transactions';
import CannedEmails from './components/templates/CannedEmails'
import Forms from './components/templates/Forms'
import Packages from './components/templates/Packages'
import Scheduler from './components/templates/Scheduler'
import Workflow from './components/templates/Workflow'
import AddressBook from './components/utilities/AddressBook'
import FormLists from './components/utilities/FormLists'
import TimeTracker from './components/utilities/TimeTracker'
import Emails from './components/projects/Emails'
import EmailBody from './components/projects/EmailBody'
 import DubsadoHeader from './DubsadoHeader'
import Settings from './components/dashboard/Settings'
import Contacts from './components/templates/forms/Contacts'
import Subarguments from './components/templates/forms/Subarguments'
import Questionnaires from './components/templates/forms/Questionnaires'
import Proposal from './components/templates/forms/Proposal'
import LeadCapture from './components/templates/forms/LeadCapture'
import PaymentSchedule from './components/templates/PaymentSechedule'
import PackageSettings from './components/templates/packages/PackageSettings'
import EditPaymentSchedule from './components/templates/paymentschedule/EditPaymentSchedule'
class App extends React.Component {
  render() {
    return (
     <Provider store={store}>
        <BrowserRouter>

          <DubsadoHeader />
          <div style={{background:"#eee" }}>
            <SideNavs />


          </div>
          <div style={{ marginLeft: "255px",background:"#eee" ,marginTop:"60px",minHeight:"567px"}}>
            <Route exact path="/" component={Dashboard} />
            <Route path="/projects" component={Layout} />
            <Route path="/customize" component={Customize} />
            <Route path="/bigcalendar" component={Calendars} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/projectssources" component={ProjectSources} />
            <Route path="/projectbreakdown" component={ProjectBreakdown} />
            <Route path="/invoices" component={Invoices} />
            <Route path="/transaction" component={Transactions} />
            <Route path="/chartofaccounts" component={ChartOfAccounts} />
            <Route path="/reports" component={Reports} />
            <Route path="/formlists" component={FormLists} />
            <Route path="/addressbook" component={AddressBook} />
            <Route path="/timetracker" component={TimeTracker} />
            <Route path="/scheduler" component={Scheduler} />
            <Route path="/forms" component={Forms} />
            <Route path="/cannedemails" component={CannedEmails} />
            <Route path="/packages" component={Packages} />
            <Route path="/workflow" component={Workflow} />
            <Route path="/emails" component={Emails} />
            <Route path="/emailbody" component={EmailBody} />
            <Route path="/settings" component={Settings} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/subarguments" component={Subarguments} />
            <Route path="/questionnaires" component={Questionnaires} />
            <Route path="/Proposal" component={Proposal} />
            <Route path="/leadcapture" component={LeadCapture} />
            <Route path="/paymentschedule" component={PaymentSchedule} />
            <Route path="/packagesettings" component={PackageSettings} />
            <Route path="/editpaymentschedule" component={EditPaymentSchedule} />


          </div>

        </BrowserRouter>
        </Provider>
    
    );
  }
}
export default App;
