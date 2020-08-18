import React,{ useState , useEffect} from 'react'
import {fetchDailyData} from '../../api'
import {Line,Bar} from 'react-chartjs-2';

import styles from './Chart.module.css'

const Chart = ({data,country}) => {
    const [dailyData,setDailyData] = useState([]);

    useEffect(( ) => {
        const fetchAPI = async () =>{
            setDailyData(await fetchDailyData())
        }
        //  console.log(dailyData + "s")

        fetchAPI();
    },[setDailyData]);


    const lineChart =() =>(
        dailyData.length?
        <Line
          data={{
              labels: dailyData.map(({date}) => date),
              datasets:[{
                data:dailyData.map(({confirmed}) => confirmed),
                label:'Infected',
                borderColor: '#3333ff',
                fill:true
              },{
                data:dailyData.map(({deaths}) => deaths),
                label:'Infected',
                borderColor: '#red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                fill:true
              }],
            options:{
                responsive:true,
                maintainAspectRatio: false,
            }   
          }
        }

        />:null  
    )
    // console.log(data)
    const barChart = () =>(
        data.confirmed?
        <Bar
        data = {{
            labels:['Infected','Recovered','Deaths'],
            datasets:[{
                label:'People',
                backgroundColor:['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)'],
                data:[data.confirmed.value,data.recovered.value,data.deaths.value]
            }]
        }}
        
        options = {{
            legend:{display:false},
            title:{display:true,text:`${country}`}
        }}
        />
        :null
    )

    return(
        <div className={styles.container} >
            {!country?lineChart():country!=="global"?barChart():lineChart()}
        </div>
    )
}

export default Chart;