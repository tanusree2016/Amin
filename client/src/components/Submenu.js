import React,{Component} from 'react'
import {Link} from 'react-router-dom'

class Accordion extends React.Component {
  render () {
    return (
      <div {...{ className: 'wrapper' }}>
        <ul {...{ className: 'accordion-list' }}>
         
         
           
                <AccordionItem/>
                
                
              
        </ul>
      </div>
    )
  }
}

class AccordionItem extends React.Component {
  state = {
    opened: false
  }
  
  render () {
    const {
      props: {
        paragraph,
        title
      },
      state: {
        opened
      }
    } = this
    
    return (
        <div>
      <div
        {...{
          className: `accordion-item, ${opened && 'accordion-item--opened'}`,
          onClick: () => { this.setState({ opened: !opened }) }
        }}
      >
        <div {...{ className: 'accordion-item__line' }}>
          <text>
          <i class="fa fa-file-excel-o"></i> Reporting
          </text><br/>
       
       
          <span {...{ className: 'accordion-item__icon' }}/>
        </div>
          <div {...{ className: 'accordion-item__inner' }}>
         
            
             <Link to="/projectssources"> Project Sources</Link>
             
         
           
              <Link to="/projectbreakdown"> Project Breakdown</Link>
              
              
            
               <Link to="/invoices">Invoices</Link>
              

            
               <Link to="/transaction">Transactions</Link>
              

            
               <Link to="/chartofaccounts">Chart of Accounts</Link>
              
        
            
               <Link to="/reports">Reports</Link>
               
           
          </div>
      </div>
      
     </div>
    )
  }
}



class AccordionItem1 extends React.Component {
    state = {
      opened: false
    }
    
    render () {
      const {
        props: {
          paragraph,
          title
        },
        state: {
          opened
        }
      } = this
      
      return (
          <div>
        <div
          {...{
            className: `accordion-item, ${opened && 'accordion-item--opened'}`,
            onClick: () => { this.setState({ opened: !opened }) }
          }}
        >
          <div {...{ className: 'accordion-item__line' }}>
            <text>
              rrtttert
            </text><br/>
         
         
            <span {...{ className: 'accordion-item__icon' }}/>
          </div>
            <div {...{ className: 'accordion-item__inner' }}>
              <div {...{ className: 'accordion-item__content' }}>
              <br/>
                 <text>ffffff</text>
                <br/>         <br/>
              
                 <text>gggggg</text>
              
                 <br/>         <br/>
                 <text>hhhhhh</text>
          
              </div>
            </div>
        </div>
        
       </div>
      )
    }
  }
  

export default Accordion;