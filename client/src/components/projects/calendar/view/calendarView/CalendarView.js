import React from 'react'
import { Grid } from 'semantic-ui-react'
import WeekDayItem from './WeekDayItem'
import DateItem from './DateItem'
import Utils from '../../../utils/Utils'
import moment from 'moment'

const CalendarView = (props) => {
    let defaultWeekDayColor = "red";
    let defaultWeekDaySize = "small";
    
    let dateValues = Utils.generateCalendarData(props.date.toDate());
    console.log('here');
    return (

        <Grid columns={16} centered  >
            <Grid.Row style={{ paddingBottom: '0px' }}>
                {Utils.WeekDayValues.map((item, index) => {
                    return (
                        <Grid.Column key={index}>
                            <WeekDayItem color={defaultWeekDayColor} size={defaultWeekDaySize} value={item} />
                        </Grid.Column>
                    )
                })
                }
            </Grid.Row >
            {dateValues.map((item, index) => {
             
                return (
                    <Grid.Row key={index} style={{ paddingTop: '2px', paddingBottom: '0px' }}>
                        {
                            item.map((value, index) => {

                                let color = "grey";
                                let disabled = false;

                                let date=moment([props.date.get('year'),props.date.get('month'),parseInt(value,10)]);
                                if(date.isValid() && moment().isSame(date,'day')){
                                  
                                    color='blue';
                                }
                                return (
                                    <Grid.Column key={value + "-" + index}>
                                        {(value !== "") ? <DateItem {...props} disabled={disabled} color={color} value={value} /> : ""}
                                    </Grid.Column>
                                );
                            })
                        }
                    </Grid.Row>
                );
            })
            }
        </Grid>
    )
}

export default CalendarView;